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
  dbClearAllNotifications
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
          
          // Send notification email via Zoho SMTP
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

          return jsonResponse(saved);
        } else {
          let estimatedValue = 2500;
          switch (body.leadData.projectType) {
            case "panel-upgrades": estimatedValue = 3500; break;
            case "ev-charger": estimatedValue = 1200; break;
            case "generator": estimatedValue = 14500; break;
            case "commercial": estimatedValue = 32000; break;
            case "residential": estimatedValue = 2500; break;
            case "industrial": estimatedValue = 54000; break;
            case "emergency": estimatedValue = 450; break;
            case "wiring-rewiring": estimatedValue = 8500; break;
            case "security-systems": estimatedValue = 6500; break;
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

          // Send notification email via Zoho SMTP
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

          return jsonResponse(saved);
        }
      }
      if (method === "PUT") {
        const body = await request.json();
        const updated = await dbUpdateLead(body.id, body.updates);
        return jsonResponse(updated);
      }
      if (method === "DELETE") {
        const body = await request.json();
        const updated = await dbDeleteLead(body.id);
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
          const url = await uploadToCloudinary(body.newReviewPhoto, "electrical/reviews");
          photos.push(url);
        }
        const newReview = {
          title: body.title,
          text: body.text,
          author: body.author,
          location: body.location,
          rating: body.rating,
          id: "review-" + Math.random().toString(36).substr(2, 9),
          featured: true,
          createdAt: new Date().toISOString(),
          photos
        };
        const saved = await dbAddReview(newReview);
        return jsonResponse(saved);
      }
      if (method === "PUT") {
        const body = await request.json();
        if (body.action === "reply") {
          const updated = await dbUpdateReview(body.id, { replyText: body.replyText });
          return jsonResponse(updated);
        } else if (body.action === "featured") {
          const db = await getDb();
          const review = await db.collection("reviews").findOne({ id: body.id });
          const featured = review ? !review.featured : false;
          const updated = await dbUpdateReview(body.id, { featured });
          return jsonResponse(updated);
        }
      }
      if (method === "DELETE") {
        const body = await request.json();
        const updated = await dbDeleteReview(body.id);
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
          createdAt: new Date().toISOString()
        };
        const saved = await dbAddWebEmail(newEmail);

        // Send email notification to eva@stellrit.com via Zoho SMTP (awaited to prevent early termination)
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

        // Add a dashboard notification for the new form submission
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

          // Broadcast the notification via Socket.io
          const io = (global as any).io;
          if (io) {
            io.emit("new-notification", notification);
          }
        } catch (err) {
          console.error("Failed to create form submission notification:", err);
        }

        return jsonResponse(saved);
      }
      if (method === "DELETE") {
        const body = await request.json();
        const updated = await dbDeleteWebEmail(body.id);
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
            const io = (global as any).io;
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

          // If this is the first client message, send an email notification to eva@stellrit.com via Zoho SMTP
          if (isFirstMessage && body.sender === "client") {
            try {
              console.log("📨 Sending chat notification via Zoho SMTP to eva@stellrit.com...");
              const chatRes = await sendZohoNotification({
                name: session.clientName || "Chat Visitor",
                email: session.clientEmail,
                phone: session.clientPhone,
                service: `Live Chat (${session.clientCity || "Horn Lake"})`,
                message: body.text,
                source: "Website Live Chat Widget",
                details: {
                  "Session ID": session.id,
                  "Client City": session.clientCity || "Horn Lake",
                  "Sent At": newMsg.timestamp
                }
              });
              console.log("📨 Chat notification status:", chatRes);
            } catch (err) {
              console.error("❌ Failed to send chat notification via Zoho SMTP:", err);
            }
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
        const photos = await dbGetGalleryPhotos([
          {
            id: "photo-1",
            url: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7",
            category: "residential",
            title: "Under-Garage Reinforced Storm Vault",
            location: "Franklin, TN",
            tag: "In-Ground Shelter",
            uploadedAt: new Date().toISOString()
          },
          {
            id: "photo-2",
            url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f",
            category: "commercial",
            title: "Commercial Steel Safe Room (FEMA P-361)",
            location: "Nashville, TN",
            tag: "FEMA Rated",
            uploadedAt: new Date().toISOString()
          },
          {
            id: "photo-3",
            url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
            category: "residential",
            title: "Precast Concrete Backyard Vault",
            location: "Murfreesboro, TN",
            tag: "Concrete Vault",
            uploadedAt: new Date().toISOString()
          },
          {
            id: "photo-4",
            url: "https://images.unsplash.com/photo-1513694203232-719a280e022f",
            category: "residential",
            title: "Above-Ground Impact Panic Room",
            location: "Brentwood, TN",
            tag: "Above Ground",
            uploadedAt: new Date().toISOString()
          },
          {
            id: "photo-5",
            url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758",
            category: "commercial",
            title: "Industrial Facility Personnel Shelter",
            location: "Lebanon, TN",
            tag: "Commercial Vault",
            uploadedAt: new Date().toISOString()
          },
          {
            id: "photo-6",
            url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
            category: "residential",
            title: "Heavy Crane Shelter Placement",
            location: "Hendersonville, TN",
            tag: "Crane Placement",
            uploadedAt: new Date().toISOString()
          }
        ]);
        return jsonResponse(photos);
      }
      if (method === "POST") {
        const body = await request.json();
        let url = body.url;
        if (!url && body.base64Photo) {
          url = await uploadToCloudinary(body.base64Photo, "shelters/gallery");
        }
        if (!url) {
          return jsonResponse({ error: "Missing image content or URL" }, 400);
        }
        const newPhoto = {
          id: "photo-" + Math.random().toString(36).substr(2, 9),
          url,
          category: body.category || "residential",
          uploadedAt: new Date().toISOString()
        };
        const updated = await dbAddGalleryPhoto(newPhoto);
        return jsonResponse(updated);
      }
      if (method === "DELETE") {
        let id = url.searchParams.get("id");
        if (!id) {
          try {
            const body = await request.json();
            id = body.id;
          } catch {}
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
        return jsonResponse(updated);
      }
    }

    // ── /api/users ──
    if (pathname === "/api/users") {
      if (method === "GET") {
        const users = await dbGetPortalUsers(DEFAULT_ADMIN);
        const mapped = users.map(u => ({ id: u.id, username: u.username, role: u.role }));
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
              return jsonResponse({ success: true, user: { id: user.id, username: user.username, role: user.role } });
            }
          }
          return jsonResponse({ error: "Invalid username or password" }, 401);
        }
        if (body.action === "create") {
          const accounts = await dbGetPortalUsers(DEFAULT_ADMIN);
          if (accounts.some(a => a.username.toLowerCase() === body.username.toLowerCase())) {
            return jsonResponse({ error: "Username already exists" }, 400);
          }
          const hashedPassword = await hashPassword(body.password);
          const newUser = {
            id: "admin-" + Math.random().toString(36).substr(2, 9),
            username: body.username,
            password: hashedPassword,
            role: body.role
          };
          await dbAddPortalUser(newUser);
          return jsonResponse({ success: true, id: newUser.id, username: newUser.username, role: newUser.role });
        }
        if (body.action === "delete") {
          await dbDeletePortalUser(body.userId);
          return jsonResponse({ success: true });
        }
        if (body.action === "update") {
          const updates: any = {};
          if (body.username) updates.username = body.username;
          if (body.password) {
            updates.password = await hashPassword(body.password);
          }
          const users = await dbUpdatePortalUser(body.userId, updates);
          const updatedUser = users.find(u => u.id === body.userId);
          return jsonResponse({ success: true, username: updatedUser ? updatedUser.username : (body.username || "") });
        }
      }
    }

    // ── /api/settings ──
    if (pathname === "/api/settings") {
      const defaultSettings = {
        alertEmail: "admin@nashvillesiteworks.com",
        officePhone: "615-991-2361",
        smsTemplate: "Hi {Name}, thank you for contacting Southern Storm Shelters LLC! A storm shelter specialist will contact you during the {Time} to discuss your {Type} installation.",
        emailAlert: true,
        smsAlert: true,
        maintenanceMode: false,
        weekdays: "Open 24/7",
        saturdays: "Open 24/7",
        sundays: "Open 24/7 (Emergency Response)"
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
        webHeaders.set(key, val);
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
