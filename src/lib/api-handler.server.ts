import {
  dbGetLeads,
  dbAddLead,
  dbUpdateLead,
  dbDeleteLead,
  dbGetReviews,
  dbAddReview,
  dbUpdateReview,
  dbDeleteReview,
  dbGetWebEmails,
  dbAddWebEmail,
  dbUpdateWebEmail,
  dbDeleteWebEmail,
  dbGetChatSessions,
  dbSaveChatSession,
  dbGetGalleryPhotos,
  dbAddGalleryPhoto,
  dbRemoveGalleryPhoto,
  dbGetPortalUsers,
  dbAddPortalUser,
  dbDeletePortalUser,
  dbUpdatePortalUser,
  dbGetSettings,
  dbSaveSettings,
  getDb,
  dbGetNotifications,
  dbAddNotification,
  dbMarkNotificationRead,
  dbMarkAllNotificationsRead,
  dbClearAllNotifications,
  dbCheckHealth
} from "./db.server.js";

import {
  INITIAL_LEADS,
  INITIAL_REVIEWS,
  INITIAL_CHATS,
  INITIAL_EMAILS
} from "./leads-store.js";

import { uploadToCloudinary, deleteFromCloudinary } from "./cloudinary.server.js";
import { hashPassword, verifyPassword } from "./crypto.server.js";
import { sendZohoNotification } from "./email.server.js";

const DEFAULT_ADMIN = {
  id: "admin-1",
  username: process.env.DEFAULT_ADMIN_USERNAME || "admin",
  role: "admin",
  password: process.env.DEFAULT_ADMIN_PASSWORD || "admin123"
};

// Helper to construct JSON responses
function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}

// ── UNIFIED API REQUEST DISPATCHER (Web Standards) ──
export async function handleApiRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  if (!pathname.startsWith("/api/")) return null;

  const method = request.method;

  try {
    // ── /api/health ──
    if (pathname === "/api/health") {
      const health = await dbCheckHealth();
      return jsonResponse(health);
    }
    // ── /api/leads ──
    if (pathname === "/api/leads") {
      if (method === "GET") {
        const leads = await dbGetLeads(INITIAL_LEADS);
        return jsonResponse(leads);
      }
      if (method === "POST") {
        const body = await request.json();
        if (body.custom) {
          const newLead = {
            ...body.lead,
            id: "lead-" + Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
          };
          const saved = await dbAddLead(newLead);

          // Asynchronously dispatch notification email via Zoho SMTP in background
          queueMicrotask(async () => {
            try {
              await sendZohoNotification({
                name: newLead.name,
                email: newLead.email,
                phone: newLead.phone,
                service: newLead.projectType || "Custom Lead",
                message: `Address: ${newLead.address || "Not provided"}\n\nDescription: ${newLead.description || "No description"}`,
                source: "Admin Custom Lead",
                details: newLead
              });
            } catch (err) {
              console.error("Lead email dispatch error:", err);
            }
          });

          const io = (global as any).io;
          if (io) {
            io.emit("new-lead", saved);
            dbGetLeads(INITIAL_LEADS).then((allLeads) => io.emit("leads-updated", allLeads)).catch(() => {});
          }

          return jsonResponse(saved);
        } else {
          let estimatedValue = 8500;
          switch (body.leadData.projectType) {
            case "underground": estimatedValue = 10500; break;
            case "garage-unit": estimatedValue = 9200; break;
            case "backyard": estimatedValue = 9800; break;
            case "commercial": estimatedValue = 34000; break;
            case "above-ground": estimatedValue = 8500; break;
            case "safe-room": estimatedValue = 12500; break;
            case "community": estimatedValue = 48000; break;
          }
          const newLead = {
            ...body.leadData,
            id: "lead-" + Math.random().toString(36).substr(2, 9),
            status: "new",
            estimatedValue,
            createdAt: new Date().toISOString(),
            photos: []
          };
          const saved = await dbAddLead(newLead);

          const io = (global as any).io;
          if (io) {
            io.emit("new-lead", saved);
            dbGetLeads(INITIAL_LEADS).then((allLeads) => io.emit("leads-updated", allLeads)).catch(() => {});
          }

          // Asynchronously dispatch notification email via Zoho SMTP in background
          queueMicrotask(async () => {
            try {
              await sendZohoNotification({
                name: newLead.name,
                email: newLead.email,
                phone: newLead.phone,
                service: newLead.projectType,
                message: `Address: ${newLead.address || "Not provided"}\nPreferred Contact Time: ${newLead.contactTime || "Anytime"}\n\nDescription: ${newLead.description || "No description"}`,
                source: "Website Lead Form",
                details: newLead
              });
            } catch (err) {
              console.error("Lead email dispatch error:", err);
            }
          });

          return jsonResponse(saved);
        }
      }
      if (method === "PUT") {
        const body = await request.json();
        const updated = await dbUpdateLead(body.id, body.updates);
        const io = (global as any).io;
        if (io) {
          io.emit("leads-updated", updated);
        }
        return jsonResponse(updated);
      }
      if (method === "DELETE") {
        const body = await request.json();
        const updated = await dbDeleteLead(body.id);
        const io = (global as any).io;
        if (io) {
          io.emit("leads-updated", updated);
          io.emit("lead-deleted", body.id);
        }
        return jsonResponse(updated);
      }
    }

    // ── /api/leads/photos ──
    if (pathname === "/api/leads/photos") {
      const body = await request.json();
      const db = await getDb();
      const leadsCol = db.collection("leads");

      if (method === "POST") {
        const url = await uploadToCloudinary(body.base64Photo, "electrical/leads");
        await leadsCol.updateOne({ id: body.leadId }, { $push: { photos: url } } as any);
      } else if (method === "DELETE") {
        const lead = await leadsCol.findOne({ id: body.leadId });
        if (lead && lead.photos) {
          const photos = [...lead.photos];
          const photoUrl = photos[body.photoIndex];
          if (photoUrl && photoUrl.includes("cloudinary.com")) {
            await deleteFromCloudinary(photoUrl);
          }
          photos.splice(body.photoIndex, 1);
          await leadsCol.updateOne({ id: body.leadId }, { $set: { photos } });
        }
      }
      const leads = await dbGetLeads(INITIAL_LEADS);
      return jsonResponse(leads);
    }

    // ── /api/reviews ──
    if (pathname === "/api/reviews") {
      if (method === "GET") {
        const reviews = await dbGetReviews(INITIAL_REVIEWS);
        return jsonResponse(reviews);
      }
      if (method === "POST") {
        const body = await request.json();
        const photos: string[] = [];
        if (body.newReviewPhoto) {
          const url = await uploadToCloudinary(body.newReviewPhoto, "shelters/reviews");
          photos.push(url);
        } else if (body.photos && Array.isArray(body.photos)) {
          photos.push(...body.photos);
        }
        const newReview = {
          id: "review-" + Math.random().toString(36).substr(2, 9),
          title: body.title || "Engineered Storm Shelter Installation",
          text: body.text || "",
          author: body.author || "Satisfied Homeowner",
          location: body.location || "Nashville, TN",
          installed: body.installed || "Granger ISS In-Ground Shelter",
          rating: Number(body.rating) || 5,
          featured: body.featured !== undefined ? body.featured : true,
          verified: body.verified !== undefined ? body.verified : true,
          createdAt: new Date().toISOString(),
          photos
        };
        const saved = await dbAddReview(newReview);
        const allReviews = await dbGetReviews(INITIAL_REVIEWS);

        const io = (global as any).io;
        if (io) {
          io.emit("reviews-updated", allReviews);
          io.emit("new-review", saved);
        }
        return jsonResponse(saved);
      }
      if (method === "PUT") {
        const body = await request.json();
        let updated: any[] = [];
        if (body.action === "reply") {
          updated = await dbUpdateReview(body.id, { replyText: body.replyText, reply: body.replyText });
        } else if (body.action === "featured") {
          const db = await getDb();
          const review = await db.collection("reviews").findOne({ id: body.id });
          const featured = review ? !review.featured : false;
          updated = await dbUpdateReview(body.id, { featured });
        } else if (body.action === "verify") {
          const db = await getDb();
          const review = await db.collection("reviews").findOne({ id: body.id });
          const verified = review ? !review.verified : true;
          updated = await dbUpdateReview(body.id, { verified });
        }
        const io = (global as any).io;
        if (io) {
          io.emit("reviews-updated", updated);
        }
        return jsonResponse(updated);
      }
      if (method === "DELETE") {
        let id = url.searchParams.get("id");
        if (!id) {
          try {
            const body = await request.json();
            id = body.id;
          } catch { }
        }
        if (!id) {
          return jsonResponse({ error: "Missing review ID" }, 400);
        }
        const updated = await dbDeleteReview(id);
        const io = (global as any).io;
        if (io) {
          io.emit("reviews-updated", updated);
          io.emit("review-deleted", id);
        }
        return jsonResponse(updated);
      }
    }

    // ── /api/emails ──
    if (pathname === "/api/emails") {
      if (method === "GET") {
        const emails = await dbGetWebEmails(INITIAL_EMAILS);
        return jsonResponse(emails);
      }
      if (method === "POST") {
        const body = await request.json();
        const newEmail = {
          ...body.emailData,
          id: "email-" + Math.random().toString(36).substr(2, 9),
          status: body.emailData?.status || "new",
          createdAt: new Date().toISOString()
        };
        const saved = await dbAddWebEmail(newEmail);

        const io = (global as any).io;
        // Broadcast the new web email immediately to open dashboards
        if (io) {
          io.emit("new-web-email", saved);
        }

        // Asynchronously dispatch dashboard notification and Zoho email in background (non-blocking)
        queueMicrotask(async () => {
          // 1. Dashboard notification
          try {
            const notification = await dbAddNotification({
              type: "form_submission",
              title: "New Form Submission",
              message: `Submission from ${newEmail.name} for ${newEmail.service || "General Inquiry"}`,
              link: "/dashboard?tab=emails",
              metadata: {
                name: newEmail.name,
                email: newEmail.email,
                phone: newEmail.phone,
                service: newEmail.service,
                message: newEmail.message,
                source: newEmail.source
              }
            });

            if (io) {
              io.emit("new-notification", notification);
            }
          } catch (err) {
            console.error("Failed to create form submission notification:", err);
          }

          // 2. Zoho SMTP email notification
          try {
            const emailResult = await sendZohoNotification({
              name: newEmail.name,
              email: newEmail.email,
              phone: newEmail.phone,
              service: newEmail.service,
              message: newEmail.message,
              source: newEmail.source || "Website Contact Form",
              details: newEmail
            });
            console.log("📨 Zoho SMTP email dispatch status:", emailResult);
          } catch (err) {
            console.error("Failed to send Zoho email notification:", err);
          }
        });

        return jsonResponse(saved);
      }
      if (method === "PATCH" || method === "PUT") {
        const body = await request.json();
        const updated = await dbUpdateWebEmail(body.id, body.updates);
        const io = (global as any).io;
        if (io) {
          io.emit("web-email-updated", { id: body.id, updates: body.updates });
        }
        return jsonResponse(updated);
      }
      if (method === "DELETE") {
        const body = await request.json();
        const updated = await dbDeleteWebEmail(body.id);
        const io = (global as any).io;
        if (io) {
          io.emit("web-email-deleted", body.id);
        }
        return jsonResponse(updated);
      }
    }

    // ── /api/notifications ──
    if (pathname === "/api/notifications") {
      if (method === "GET") {
        const notifications = await dbGetNotifications();
        return jsonResponse(notifications);
      }
      if (method === "POST") {
        const body = await request.json();
        if (body.action === "read") {
          const updated = await dbMarkNotificationRead(body.id);
          return jsonResponse(updated);
        }
        if (body.action === "read-all") {
          const updated = await dbMarkAllNotificationsRead();
          return jsonResponse(updated);
        }
        if (body.action === "clear-all") {
          const updated = await dbClearAllNotifications();
          return jsonResponse(updated);
        }
      }
    }

    // ── /api/chats ──
    if (pathname === "/api/chats") {
      if (method === "GET") {
        const chats = await dbGetChatSessions(INITIAL_CHATS);
        return jsonResponse(chats);
      }
      if (method === "DELETE") {
        const urlObj = new URL(request.url);
        const id = urlObj.searchParams.get("id");
        if (id) {
          const db = await getDb();
          await db.collection("chat_sessions").deleteOne({ id });
          const docs = await db.collection("chat_sessions").find({}).toArray();
          const mapped = docs.map(d => ({ ...d, id: d.id || String(d._id), _id: undefined }));
          const io = (global as any).io;
          if (io) {
            io.emit("chat-session-deleted", id);
          }
          return jsonResponse(mapped);
        }
        return jsonResponse({ error: "Missing ID" }, 400);
      }
      if (method === "POST") {
        const body = await request.json();
        if (body.action === "create") {
          const newSession = {
            id: "session-" + Math.random().toString(36).substr(2, 9),
            clientName: body.clientName,
            clientCity: body.clientCity || "Nashville",
            clientEmail: body.clientEmail,
            clientPhone: body.clientPhone,
            lastMessage: "Chat session initialized",
            lastMessageTime: new Date().toISOString(),
            unread: true,
            messages: []
          };
          await dbSaveChatSession(newSession);

          const io = (global as any).io;
          if (io) {
            io.emit("session-created", newSession);
          }

          // Save a dashboard notification for the new chat session
          try {
            const notification = await dbAddNotification({
              type: "chat_start",
              title: "New Chat Started",
              message: `${body.clientName} started a live chat session.`,
              link: "/dashboard?tab=chat",
              metadata: {
                sessionId: newSession.id,
                clientName: body.clientName,
                clientCity: newSession.clientCity,
                clientPhone: newSession.clientPhone,
                clientEmail: newSession.clientEmail
              }
            });

            // Broadcast the notification via Socket.io
            if (io) {
              io.emit("new-notification", notification);
            }
          } catch (err) {
            console.error("Failed to create chat start notification:", err);
          }

          return jsonResponse(newSession);
        }
        if (body.action === "message") {
          const db = await getDb();
          const session = await db.collection("chat_sessions").findOne({ id: body.sessionId });
          if (!session) return jsonResponse(null, 404);

          const isFirstMessage = !session.messages || session.messages.length === 0;

          const newMsg = {
            id: "msg-" + Math.random().toString(36).substr(2, 9),
            sender: body.sender,
            text: body.text,
            timestamp: new Date().toISOString()
          };
          const updatedSession = {
            ...session,
            messages: [...(session.messages || []), newMsg],
            lastMessage: body.text,
            lastMessageTime: newMsg.timestamp,
            unread: body.sender === "client"
          };
          await dbSaveChatSession(updatedSession);

          // Broadcast real-time message and updated session to all connected sockets and room
          const io = (global as any).io;
          if (io) {
            io.to(body.sessionId).emit("message", newMsg);
            io.emit("new-chat-message", { ...newMsg, sessionId: body.sessionId });
            io.emit("chat-session-updated", updatedSession);
          }

          // If this is the first client message, asynchronously send an email notification via Zoho SMTP in background
          if (isFirstMessage && body.sender === "client") {
            queueMicrotask(async () => {
              try {
                const chatRes = await sendZohoNotification({
                  name: session.clientName || "Chat Visitor",
                  email: session.clientEmail,
                  phone: session.clientPhone,
                  service: `Live Chat (${session.clientCity || "Nashville"})`,
                  message: body.text,
                  source: "Website Live Chat Widget",
                  details: {
                    "Session ID": session.id,
                    "Client City": session.clientCity || "Nashville",
                    "Sent At": newMsg.timestamp
                  }
                });
                console.log("📨 Chat notification status:", chatRes);
              } catch (err) {
                console.error("❌ Failed to send chat notification via Zoho SMTP:", err);
              }
            });
          }

          return jsonResponse(updatedSession);
        }
        if (body.action === "read") {
          const db = await getDb();
          await db.collection("chat_sessions").updateOne({ id: body.sessionId }, { $set: { unread: false } });
          const docs = await db.collection("chat_sessions").find({}).toArray();
          const mapped = docs.map(d => ({ ...d, id: d.id || String(d._id), _id: undefined }));
          return jsonResponse(mapped);
        }
      }
    }

    // ── /api/gallery ──
    if (pathname === "/api/gallery") {
      if (method === "GET") {
        const photos = await dbGetGalleryPhotos([]);
        return jsonResponse(photos);
      }
      if (method === "POST") {
        const body = await request.json();
        let photoUrl = body.url;
        if (!photoUrl && body.base64Photo) {
          photoUrl = await uploadToCloudinary(body.base64Photo, "shelters/gallery");
        }
        if (!photoUrl) {
          return jsonResponse({ error: "Missing image content or URL" }, 400);
        }
        const newPhoto = {
          id: "photo-" + Math.random().toString(36).substr(2, 9),
          url: photoUrl,
          category: body.category || "residential",
          title: body.title || "Engineered Storm Shelter Installation",
          location: body.location || "Nashville, TN",
          tag: body.tag || "In-Ground Vault",
          featured: body.featured !== undefined ? body.featured : true,
          uploadedAt: new Date().toISOString()
        };
        const updated = await dbAddGalleryPhoto(newPhoto);
        const io = (global as any).io;
        if (io) {
          io.emit("gallery-updated", updated);
          io.emit("new-gallery-photo", newPhoto);
        }
        return jsonResponse(updated);
      }
      if (method === "DELETE") {
        let id = url.searchParams.get("id");
        if (!id) {
          try {
            const body = await request.json();
            id = body.id;
          } catch { }
        }
        if (!id) {
          return jsonResponse({ error: "Missing image ID" }, 400);
        }
        const db = await getDb();
        const photo = await db.collection("gallery_photos").findOne({ id });
        if (photo && photo.url && photo.url.includes("cloudinary.com")) {
          try {
            await deleteFromCloudinary(photo.url);
          } catch (cloudinaryErr) {
            console.error("Failed to delete from Cloudinary, proceeding with database removal:", cloudinaryErr);
          }
        }
        const updated = await dbRemoveGalleryPhoto(id);
        const io = (global as any).io;
        if (io) {
          io.emit("gallery-updated", updated);
          io.emit("gallery-photo-deleted", id);
        }
        return jsonResponse(updated);
      }
    }

    // ── /api/users ──
    if (pathname === "/api/users") {
      if (method === "GET") {
        const users = await dbGetPortalUsers(DEFAULT_ADMIN);
        const mapped = users.map(u => ({
          id: u.id,
          username: u.username,
          name: u.name || u.username,
          role: u.role,
          createdAt: u.createdAt || "2026-01-01T00:00:00.000Z"
        }));
        return jsonResponse(mapped);
      }
      if (method === "POST") {
        const body = await request.json();
        if (body.action === "login") {
          const accounts = await dbGetPortalUsers(DEFAULT_ADMIN);
          const user = accounts.find(a => a.username.toLowerCase() === body.username.toLowerCase());
          if (user) {
            const isValid = await verifyPassword(body.password, user.password);
            if (isValid) {
              return jsonResponse({
                success: true,
                user: { id: user.id, username: user.username, name: user.name || user.username, role: user.role }
              });
            }
          }
          return jsonResponse({ error: "Invalid username or password" }, 401);
        }
        if (body.action === "create") {
          const accounts = await dbGetPortalUsers(DEFAULT_ADMIN);
          if (accounts.some(a => a.username.toLowerCase() === body.username.toLowerCase().trim())) {
            return jsonResponse({ error: "Username already exists" }, 400);
          }
          const hashedPassword = await hashPassword(body.password);
          const newUser = {
            id: "staff-" + Math.random().toString(36).substr(2, 9),
            username: body.username.trim(),
            name: body.name ? body.name.trim() : body.username.trim(),
            password: hashedPassword,
            role: body.role || "dispatcher",
            createdAt: new Date().toISOString()
          };
          await dbAddPortalUser(newUser);
          return jsonResponse({
            success: true,
            id: newUser.id,
            username: newUser.username,
            name: newUser.name,
            role: newUser.role,
            createdAt: newUser.createdAt
          });
        }
        if (body.action === "delete") {
          await dbDeletePortalUser(body.userId);
          return jsonResponse({ success: true });
        }
        if (body.action === "update") {
          const updates: any = {};
          if (body.username) updates.username = body.username.trim();
          if (body.name) updates.name = body.name.trim();
          if (body.role) updates.role = body.role;
          if (body.password) {
            updates.password = await hashPassword(body.password);
          }
          const users = await dbUpdatePortalUser(body.userId, updates);
          const updatedUser = users.find(u => u.id === body.userId);
          return jsonResponse({
            success: true,
            username: updatedUser ? updatedUser.username : (body.username || ""),
            user: updatedUser ? {
              id: updatedUser.id,
              username: updatedUser.username,
              name: updatedUser.name,
              role: updatedUser.role,
              createdAt: updatedUser.createdAt
            } : null
          });
        }
      }
    }

    // ── /api/settings ──
    if (pathname === "/api/settings") {
      const defaultSettings = {
        companyName: "Southern Storm Shelters LLC",
        tagline: "Tennessee’s Premier Engineered Underground Storm Shelters & Safe Rooms",
        alertEmail: "info@southernstormshelters.com",
        officePhone: "(615) 991-2361",
        officePhoneRaw: "+16159912361",
        officeAddress: "Nashville, TN",
        serviceRadius: "Nashville, TN & 100-Mile Radius",
        licenseNotice: "Fully Insured Professional Installation Crews • Engineered Storm Protection",
        weekdays: "Monday–Friday: 8:00 AM – 5:00 PM",
        saturdays: "Saturday: By Appointment",
        sundays: "Sunday: Closed",
        shortBadge: "Mon–Sat: 8:00 AM – 5:00 PM",
        smsTemplate: "Hi {Name}, thank you for contacting Southern Storm Shelters LLC! A storm shelter specialist will contact you to discuss your {Type} installation.",
        emailAlert: true,
        smsAlert: true,
        maintenanceMode: false,
        maintenanceTitle: "Scheduled System Maintenance Underway",
        maintenanceMessage: "We are currently performing scheduled maintenance to upgrade our shelter estimating and dispatch systems. Emergency shelter installations and property evaluations remain fully operational."
      };

      if (method === "GET") {
        const settings = await dbGetSettings(defaultSettings);
        return jsonResponse(settings);
      }
      if (method === "POST") {
        const body = await request.json();
        const saved = await dbSaveSettings(body);
        return jsonResponse(saved);
      }
    }

    // ── /api/sign-upload ──
    if (pathname === "/api/sign-upload" && method === "POST") {
      const body = await request.json();
      const folder = body.folder || "shelters/gallery";
      const timestamp = Math.round(Date.now() / 1000);
      const apiSecret = process.env.CLOUDINARY_API_SECRET;
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;

      if (!apiSecret || !cloudName || !apiKey) {
        return jsonResponse({ error: "Missing Cloudinary configuration" }, 500);
      }

      // Build the string to sign
      const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

      const { createHash } = await import("crypto");
      const signature = createHash("sha1").update(paramsToSign + apiSecret).digest("hex");

      return jsonResponse({ signature, timestamp, apiKey, cloudName, folder });
    }

    // ── /api/send-email ──
    if (pathname === "/api/send-email" && method === "POST") {
      const body = await request.json();
      const result = await sendZohoNotification({
        name: body.name || body.fullName || body.from_name,
        email: body.email || body.emailAddress || body._replyto,
        phone: body.phone || body.phoneNumber,
        service: body.service || body["Selected Services"] || body["Service Needed"] || body["Services Interested In"] || body["Position of Interest"],
        subject: body.subject || body._subject,
        message: body.message || body.Message || body.description,
        source: body.source || body.formSource || "Website Form",
        details: body.details || body
      });
      return jsonResponse(result);
    }

  } catch (error: any) {
    console.error("API error:", error);
    return jsonResponse({ error: error.message || "Internal Server Error" }, 500);
  }

  return null;
}

// ── NODE.JS MIDDLEWARE ADAPTER (For Vite configureServer Dev Mode) ──
export async function handleNodeApiRequest(req: any, res: any) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;

  let body: any = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    body = Buffer.concat(buffers);
  }

  const webHeaders = new Headers();
  Object.entries(req.headers).forEach(([key, val]) => {
    if (val !== undefined) {
      if (Array.isArray(val)) {
        val.forEach(v => webHeaders.append(key, v));
      } else {
        webHeaders.set(key, String(val));
      }
    }
  });

  const webReq = new Request(url, {
    method: req.method,
    headers: webHeaders,
    body: body && body.length > 0 ? body : undefined
  });

  const webRes = await handleApiRequest(webReq);
  if (webRes) {
    res.statusCode = webRes.status;
    webRes.headers.forEach((val, key) => {
      res.setHeader(key, val);
    });
    const resBody = await webRes.text();
    res.end(resBody);
    return true;
  }
  return false;
}
