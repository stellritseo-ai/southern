import { MongoClient, ObjectId } from "mongodb";
import { hashPassword } from "./crypto.server.js";

// Native Node env loader fallback if run without --env-file
if (typeof process !== "undefined" && typeof (process as any).loadEnvFile === "function") {
  try {
    (process as any).loadEnvFile();
  } catch {
    // env already loaded or file missing
  }
}

const DB_NAME = process.env.MONGODB_DB_NAME || "southern";

let client: MongoClient | null = null;
let migrationChecked = false;

async function ensureDbMigrated(connectedClient: MongoClient, targetDbName: string) {
  if (migrationChecked || targetDbName === "electrical") return;
  migrationChecked = true;
  try {
    const targetDb = connectedClient.db(targetDbName);
    const targetLeadsCount = await targetDb.collection("leads").countDocuments().catch(() => 0);
    if (targetLeadsCount === 0) {
      const oldDb = connectedClient.db("electrical");
      const oldLeadsCount = await oldDb.collection("leads").countDocuments().catch(() => 0);
      if (oldLeadsCount > 0) {
        console.log(`Migrating collections from legacy "electrical" to "${targetDbName}"...`);
        const collections = ["leads", "reviews", "web_emails", "chat_sessions", "gallery_photos", "settings", "portal_users", "notifications"];
        for (const col of collections) {
          const docs = await oldDb.collection(col).find({}).toArray().catch(() => []);
          if (docs.length > 0) {
            await targetDb.collection(col).insertMany(docs).catch(() => { });
          }
        }
        console.log(`Migration to "${targetDbName}" completed.`);
      }
    }
  } catch (err) {
    console.warn("Migration check skipped:", err);
  }
}

async function getClient(): Promise<MongoClient> {
  if (!client) {
    if (typeof process !== "undefined" && typeof (process as any).loadEnvFile === "function") {
      try {
        (process as any).loadEnvFile();
      } catch { }
    }
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI environment variable is missing!");
    }
    const newClient = new MongoClient(uri, {
      // Faster cold-start: don't wait forever for a sleeping Atlas cluster
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 20000,
      // Connection pool: keep alive so subsequent requests are instant
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 60000,
      // Heartbeat every 10s to detect dropped connections early
      heartbeatFrequencyMS: 10000,
      // Retry on first network hiccup
      retryWrites: true,
      retryReads: true,
      // Faster DNS: avoid re-resolving SRV on every operation
      family: 4,
    });
    await newClient.connect();
    client = newClient;

    // Pre-warm the connection pool with a lightweight ping
    // so the very first real API request doesn't pay the handshake cost
    newClient.db("admin").command({ ping: 1 }).catch(() => { });
  }
  return client;
}

export async function getDb() {
  const connectedClient = await getClient();
  // Run migration in the background — never blocks the first request
  if (!migrationChecked) {
    setImmediate(() => ensureDbMigrated(connectedClient, DB_NAME));
  }
  return connectedClient.db(DB_NAME);
}

// Helper to safely map MongoDB documents (_id) to application types (id)
function mapDoc<T>(doc: any): T {
  if (!doc) return null as any;
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: rest.id || String(_id),
  } as T;
}

// ── LEADS ──
export async function dbGetLeads(initialSeeds: any[]): Promise<any[]> {
  const db = await getDb();
  const leadsCol = db.collection("leads");
  const count = await leadsCol.countDocuments();
  if (count === 0 && initialSeeds.length > 0) {
    await leadsCol.insertMany(initialSeeds);
    return initialSeeds;
  }

  // Remove localhost photo URLs in a single batched operation (not N+1 loops)
  await leadsCol.updateMany(
    { photos: { $elemMatch: { $regex: "localhost" } } },
    [{ $set: { photos: { $filter: { input: "$photos", as: "p", cond: { $not: { $regexMatch: { input: "$$p", regex: "localhost" } } } } } } }]
  );

  const docs = await leadsCol.find({}).toArray();
  return docs.map(mapDoc);
}

export async function dbAddLead(lead: any): Promise<any> {
  const db = await getDb();
  const leadsCol = db.collection("leads");
  const result = await leadsCol.insertOne(lead);
  return { ...lead, id: lead.id || String(result.insertedId) };
}

export async function dbUpdateLead(id: string, updates: any): Promise<any[] | null> {
  const db = await getDb();
  const leadsCol = db.collection("leads");

  let res = await leadsCol.updateOne({ id }, { $set: updates });
  if (res.matchedCount === 0) {
    if (ObjectId.isValid(id)) {
      await leadsCol.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    }
  }

  const docs = await leadsCol.find({}).toArray();
  return docs.map(mapDoc);
}

export async function dbDeleteLead(id: string): Promise<any[]> {
  const db = await getDb();
  const leadsCol = db.collection("leads");

  let res = await leadsCol.deleteOne({ id });
  if (res.deletedCount === 0) {
    if (ObjectId.isValid(id)) {
      await leadsCol.deleteOne({ _id: new ObjectId(id) });
    }
  }

  const docs = await leadsCol.find({}).toArray();
  return docs.map(mapDoc);
}

// ── REVIEWS ──
export async function dbGetReviews(initialSeeds: any[]): Promise<any[]> {
  const db = await getDb();
  const reviewsCol = db.collection("reviews");

  // Purge legacy dummy reviews from electrical/old template
  await reviewsCol.deleteMany({
    $or: [
      { author: { $in: ["Marcus H.", "David K.", "Brian T.", "Elena R."] } },
      {
        title: {
          $in: [
            "Complete Peace of Mind During Tornado Season!",
            "Heavy-Duty Hydraulic Hatch & Airtight Seal",
            "Commercial Safe Room Done Right",
            "Laser-Guided Excavation With Zero Lawn Mess"
          ]
        }
      }
    ]
  });

  if (initialSeeds && initialSeeds.length > 0) {
    for (const seed of initialSeeds) {
      const exists = await reviewsCol.findOne({
        $or: [
          { id: seed.id },
          { author: seed.author, title: seed.title }
        ]
      });
      if (!exists) {
        await reviewsCol.insertOne(seed);
      }
    }
  }

  // Remove localhost photo URLs in a single batched operation
  await reviewsCol.updateMany(
    { photos: { $elemMatch: { $regex: "localhost" } } },
    [{ $set: { photos: { $filter: { input: "$photos", as: "p", cond: { $not: { $regexMatch: { input: "$$p", regex: "localhost" } } } } } } }]
  );

  const docs = await reviewsCol.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbAddReview(review: any): Promise<any> {
  const db = await getDb();
  const reviewsCol = db.collection("reviews");
  const result = await reviewsCol.insertOne(review);
  return { ...review, id: review.id || String(result.insertedId) };
}

export async function dbUpdateReview(id: string, updates: any): Promise<any[]> {
  const db = await getDb();
  const reviewsCol = db.collection("reviews");

  let res = await reviewsCol.updateOne({ id }, { $set: updates });
  if (res.matchedCount === 0) {
    if (ObjectId.isValid(id)) {
      await reviewsCol.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    }
  }

  const docs = await reviewsCol.find({}).toArray();
  return docs.map(mapDoc);
}

export async function dbDeleteReview(id: string): Promise<any[]> {
  const db = await getDb();
  const reviewsCol = db.collection("reviews");
  let res = await reviewsCol.deleteOne({ id });
  if (res.deletedCount === 0) {
    if (ObjectId.isValid(id)) {
      await reviewsCol.deleteOne({ _id: new ObjectId(id) });
    }
  }
  const docs = await reviewsCol.find({}).toArray();
  return docs.map(mapDoc);
}

// ── WEB EMAILS ──
export async function dbGetWebEmails(initialSeeds: any[]): Promise<any[]> {
  const db = await getDb();
  const emailsCol = db.collection("web_emails");
  const count = await emailsCol.countDocuments();
  if (count === 0 && initialSeeds.length > 0) {
    await emailsCol.insertMany(initialSeeds);
    return initialSeeds;
  }
  const docs = await emailsCol.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbAddWebEmail(email: any): Promise<any> {
  const db = await getDb();
  const emailsCol = db.collection("web_emails");
  const result = await emailsCol.insertOne(email);
  return { ...email, id: email.id || String(result.insertedId) };
}

export async function dbDeleteWebEmail(id: string): Promise<any[]> {
  const db = await getDb();
  const emailsCol = db.collection("web_emails");

  let res = await emailsCol.deleteOne({ id });
  if (res.deletedCount === 0) {
    if (ObjectId.isValid(id)) {
      await emailsCol.deleteOne({ _id: new ObjectId(id) });
    }
  }

  const docs = await emailsCol.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbUpdateWebEmail(id: string, updates: any): Promise<any[]> {
  const db = await getDb();
  const emailsCol = db.collection("web_emails");

  const cleanUpdates = { ...updates };
  delete cleanUpdates._id;
  delete cleanUpdates.id;

  let res = await emailsCol.updateOne({ id }, { $set: cleanUpdates });
  if (res.matchedCount === 0 && ObjectId.isValid(id)) {
    await emailsCol.updateOne({ _id: new ObjectId(id) }, { $set: cleanUpdates });
  }

  const docs = await emailsCol.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(mapDoc);
}

// ── CHATS ──
export async function dbGetChatSessions(initialSeeds: any[]): Promise<any[]> {
  const db = await getDb();
  const chatsCol = db.collection("chat_sessions");
  const count = await chatsCol.countDocuments();
  if (count === 0 && initialSeeds.length > 0) {
    await chatsCol.insertMany(initialSeeds);
    return initialSeeds;
  }
  const docs = await chatsCol.find({}).sort({ lastMessageTime: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbSaveChatSession(session: any): Promise<void> {
  const db = await getDb();
  const chatsCol = db.collection("chat_sessions");
  await chatsCol.updateOne({ id: session.id }, { $set: session }, { upsert: true });
}

// ── GALLERY PHOTOS ──
export async function dbGetGalleryPhotos(initialSeeds: any[] = []): Promise<any[]> {
  const db = await getDb();
  const galleryCol = db.collection("gallery_photos");

  // Clean up any legacy unsplash or localhost photos from gallery
  await galleryCol.deleteMany({
    $or: [
      { url: { $regex: "unsplash\\.com" } },
      { url: { $regex: "localhost" } },
      { url: { $regex: "127\\.0\\.0\\.1" } }
    ]
  });

  const docs = await galleryCol.find({}).toArray();
  return docs.map(mapDoc);
}

export async function dbAddGalleryPhoto(photo: any): Promise<any[]> {
  const db = await getDb();
  const galleryCol = db.collection("gallery_photos");
  await galleryCol.insertOne(photo);
  const docs = await galleryCol.find({}).toArray();
  return docs.map(mapDoc);
}

export async function dbRemoveGalleryPhoto(id: string): Promise<any[]> {
  const db = await getDb();
  const galleryCol = db.collection("gallery_photos");

  let res = await galleryCol.deleteOne({ id });
  if (res.deletedCount === 0) {
    if (ObjectId.isValid(id)) {
      await galleryCol.deleteOne({ _id: new ObjectId(id) });
    }
  }

  const docs = await galleryCol.find({}).toArray();
  return docs.map(mapDoc);
}

// ── PORTAL SECURITY & AUTH ACCOUNTS ──
export async function dbGetPortalUsers(defaultAdmin: any): Promise<any[]> {
  const db = await getDb();
  const accountsCol = db.collection("portal_users");
  const count = await accountsCol.countDocuments();
  if (count === 0) {
    const hashedPassword = await hashPassword(defaultAdmin.password);
    const seededAdmin = { ...defaultAdmin, password: hashedPassword };
    await accountsCol.insertOne(seededAdmin);
    return [seededAdmin];
  }

  // Ensure default admin exists and has the correct password hashed
  const existingDefaultAdmin = await accountsCol.findOne({ username: defaultAdmin.username });
  if (!existingDefaultAdmin) {
    const hashedPassword = await hashPassword(defaultAdmin.password);
    const seededAdmin = { ...defaultAdmin, password: hashedPassword };
    await accountsCol.insertOne(seededAdmin);
  } else {
    const isPlaintext = !existingDefaultAdmin.password.includes(":");
    if (isPlaintext) {
      const hashedPassword = await hashPassword(defaultAdmin.password);
      await accountsCol.updateOne({ id: existingDefaultAdmin.id }, { $set: { password: hashedPassword } });
    }
  }

  const docs = await accountsCol.find({}).toArray();
  return docs.map(mapDoc);
}

export async function dbAddPortalUser(user: any): Promise<void> {
  const db = await getDb();
  const accountsCol = db.collection("portal_users");
  await accountsCol.insertOne(user);
}

export async function dbDeletePortalUser(userId: string): Promise<void> {
  const db = await getDb();
  const accountsCol = db.collection("portal_users");

  let res = await accountsCol.deleteOne({ id: userId });
  if (res.deletedCount === 0) {
    if (ObjectId.isValid(userId)) {
      await accountsCol.deleteOne({ _id: new ObjectId(userId) });
    }
  }
}

export async function dbUpdatePortalUser(userId: string, updates: any): Promise<any[]> {
  const db = await getDb();
  const accountsCol = db.collection("portal_users");

  let res = await accountsCol.updateOne({ id: userId }, { $set: updates });
  if (res.matchedCount === 0) {
    if (ObjectId.isValid(userId)) {
      await accountsCol.updateOne({ _id: new ObjectId(userId) }, { $set: updates });
    }
  }

  const docs = await accountsCol.find({}).toArray();
  return docs.map(mapDoc);
}

// ── SETTINGS ──
export async function dbGetSettings(defaultSettings: any): Promise<any> {
  const db = await getDb();
  const settingsCol = db.collection("settings");
  let doc = await settingsCol.findOne({ id: "site_config" });
  if (!doc) {
    const seeded = { ...defaultSettings, id: "site_config" };
    await settingsCol.insertOne(seeded);
    return seeded;
  }

  // Auto-correct legacy database values if present
  let needsUpdate = false;
  const updates: any = {};
  if (doc.alertEmail === "revitalizerealestate@gmail.com" || doc.alertEmail === "eva@stellrit.com") {
    doc.alertEmail = defaultSettings.alertEmail;
    updates.alertEmail = defaultSettings.alertEmail;
    needsUpdate = true;
  }
  if (doc.officePhone === "(813) 323-0291" || doc.officePhone === "(786) 307-5933") {
    doc.officePhone = defaultSettings.officePhone;
    updates.officePhone = defaultSettings.officePhone;
    needsUpdate = true;
  }
  if (!doc.smsTemplate || doc.smsTemplate.includes("Electrical") || doc.smsTemplate.includes("electrician")) {
    doc.smsTemplate = defaultSettings.smsTemplate;
    updates.smsTemplate = defaultSettings.smsTemplate;
    needsUpdate = true;
  }
  if (doc.sundays && doc.sundays.includes("Emergency 24/7")) {
    doc.sundays = defaultSettings.sundays;
    updates.sundays = defaultSettings.sundays;
    needsUpdate = true;
  }
  if (doc.officeAddress && doc.officeAddress.includes("Craighead")) {
    doc.officeAddress = defaultSettings.officeAddress;
    updates.officeAddress = defaultSettings.officeAddress;
    needsUpdate = true;
  }

  // Populate any missing fields from defaultSettings
  for (const [key, value] of Object.entries(defaultSettings)) {
    if (doc[key] === undefined || doc[key] === null) {
      doc[key] = value;
      updates[key] = value;
      needsUpdate = true;
    }
  }

  if (needsUpdate) {
    await settingsCol.updateOne({ id: "site_config" }, { $set: updates });
  }

  return mapDoc({ ...defaultSettings, ...doc, ...updates });
}

export async function dbSaveSettings(settings: any): Promise<any> {
  const db = await getDb();
  const settingsCol = db.collection("settings");
  const cleanSettings = { ...settings, id: "site_config" };
  delete cleanSettings._id;
  await settingsCol.updateOne({ id: "site_config" }, { $set: cleanSettings }, { upsert: true });
  const doc = await settingsCol.findOne({ id: "site_config" });
  return mapDoc(doc);
}

// ── NOTIFICATIONS ──
export async function dbGetNotifications(): Promise<any[]> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  const docs = await notificationsCol.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(mapDoc);
}

export async function dbAddNotification(notification: any): Promise<any> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  const doc = {
    ...notification,
    id: notification.id || "notif-" + Math.random().toString(36).substr(2, 9),
    read: false,
    createdAt: notification.createdAt || new Date().toISOString()
  };
  const result = await notificationsCol.insertOne(doc);
  return { ...doc, id: doc.id || String(result.insertedId) };
}

export async function dbMarkNotificationRead(id: string, read: boolean = true): Promise<any[]> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  await notificationsCol.updateOne({ id }, { $set: { read } });
  return await dbGetNotifications();
}

export async function dbMarkAllNotificationsRead(): Promise<any[]> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  await notificationsCol.updateMany({}, { $set: { read: true } });
  return await dbGetNotifications();
}

export async function dbDeleteNotification(id: string): Promise<any[]> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  await notificationsCol.deleteOne({ id });
  return await dbGetNotifications();
}

export async function dbClearAllNotifications(): Promise<any[]> {
  const db = await getDb();
  const notificationsCol = db.collection("notifications");
  await notificationsCol.deleteMany({});
  return [];
}

// ── DATABASE HEALTH CHECK ──
export async function dbCheckHealth(): Promise<{ status: "connected" | "error"; dbName: string; collections: Record<string, number>; pingMs: number }> {
  const start = Date.now();
  try {
    const db = await getDb();
    // Run ping and all collection counts in parallel for fastest response
    const [, leadsCount, reviewsCount, emailsCount, chatsCount, galleryCount] = await Promise.all([
      db.command({ ping: 1 }),
      db.collection("leads").countDocuments().catch(() => 0),
      db.collection("reviews").countDocuments().catch(() => 0),
      db.collection("web_emails").countDocuments().catch(() => 0),
      db.collection("chat_sessions").countDocuments().catch(() => 0),
      db.collection("gallery_photos").countDocuments().catch(() => 0),
    ]);
    const pingMs = Date.now() - start;
    return {
      status: "connected",
      dbName: db.databaseName,
      collections: {
        leads: leadsCount,
        reviews: reviewsCount,
        webEmails: emailsCount,
        chats: chatsCount,
        gallery: galleryCount
      },
      pingMs
    };
  } catch (err: any) {
    return {
      status: "error",
      dbName: DB_NAME,
      collections: {},
      pingMs: Date.now() - start
    };
  }
}


