export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  projectType: string;
  description: string;
  contactTime: string;
  status: "new" | "contacted" | "consultation_scheduled" | "proposal_sent" | "won" | "lost";
  estimatedValue: number;
  notes?: string;
  createdAt: string;
  photos?: string[];
}

export interface Review {
  id: string;
  title: string;
  text: string;
  author: string;
  location: string;
  rating: number;
  featured: boolean;
  replyText?: string;
  createdAt: string;
  photos?: string[];
}

export interface WebEmail {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "client" | "admin";
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  clientName: string;
  clientCity: string;
  clientEmail?: string;
  clientPhone?: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  messages: ChatMessage[];
}

export interface PortalUser {
  id: string;
  username: string;
  role: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  category?: string;
  uploadedAt: string;
}

// ── INITIAL PRE-SEEDS CUSTOMIZED FOR NASHVILLE / SOUTHERN STORM SHELTERS LLC ──
export const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Marcus & Sarah Vance",
    email: "marcus.vance@gmail.com",
    phone: "(615) 555-0192",
    address: "1824 Hillsboro Rd, Franklin, TN 37069",
    projectType: "residential",
    description: "Looking to install an underground storm shelter in our backyard before severe weather season. Needs site evaluation for yard slope and crane access.",
    contactTime: "morning",
    status: "new",
    estimatedValue: 11500,
    createdAt: "2026-06-15T09:30:00Z"
  },
  {
    id: "lead-2",
    name: "David Jenkins",
    email: "david.jenkins.tn@yahoo.com",
    phone: "(615) 555-8831",
    address: "704 Medical Center Pkwy, Murfreesboro, TN 37129",
    projectType: "underground",
    description: "Interested in a subterranean reinforced steel storm vault with hydraulic hatch for family of 6. Easy crane access from driveway.",
    contactTime: "afternoon",
    status: "contacted",
    estimatedValue: 9800,
    createdAt: "2026-06-14T14:15:00Z"
  },
  {
    id: "lead-3",
    name: "Elena Alvarez",
    email: "elena_alvarez@outlook.com",
    phone: "(615) 555-4421",
    address: "9405 Concord Rd, Brentwood, TN 37027",
    projectType: "residential",
    description: "Wanting an on-site estimate to install a FEMA P-320 compliant underground shelter. Yard has moderate clay soil.",
    contactTime: "evening",
    status: "proposal_sent",
    estimatedValue: 12500,
    createdAt: "2026-06-12T11:00:00Z"
  },
  {
    id: "lead-4",
    name: "Brian Croft",
    email: "brian.croft@gmail.com",
    phone: "(615) 555-7729",
    address: "3102 Saundersville Rd, Hendersonville, TN 37075",
    projectType: "installation",
    description: "Turnkey crane placement and ground excavation. Need professional anchoring and laser leveling flush to lawn grade.",
    contactTime: "afternoon",
    status: "consultation_scheduled",
    estimatedValue: 14000,
    createdAt: "2026-06-11T16:40:00Z"
  },
  {
    id: "lead-5",
    name: "Amanda Carter",
    email: "amanda.carter@comcast.net",
    phone: "(615) 555-1284",
    address: "1282 Craighead St, Nashville, TN 37204",
    projectType: "commercial",
    description: "Commercial facility tornado shelter build-out. Need engineered safe room for 25 employees with dual emergency exit latches.",
    contactTime: "morning",
    status: "won",
    notes: "Contract signed. Engineering specs approved. Installation commencing next Tuesday.",
    estimatedValue: 38000,
    createdAt: "2026-06-08T10:10:00Z"
  },
  {
    id: "lead-6",
    name: "Jonathan Riggs",
    email: "jriggs_tn@gmail.com",
    phone: "(615) 555-9012",
    address: "4202 Trotwood Ave, Columbia, TN 38401",
    projectType: "upgrades",
    description: "Existing shelter hatch replacement with heavy hydraulic gas struts and secondary escape air venting.",
    contactTime: "evening",
    status: "proposal_sent",
    notes: "Followed up with site photo assessment.",
    estimatedValue: 4200,
    createdAt: "2026-06-05T15:20:00Z"
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "review-1",
    title: "Complete Peace of Mind During Tornado Season!",
    text: "Southern Storm Shelters installed our underground storm vault in Franklin, TN. From excavation to crane placement and backfilling, the entire job was completed in one day. Outstanding craftsmanship and FEMA P-320 certification.",
    author: "Marcus H.",
    location: "Franklin, TN",
    rating: 5,
    featured: true,
    createdAt: "2026-05-01T12:00:00Z"
  },
  {
    id: "review-2",
    title: "Heavy-Duty Hydraulic Hatch & Airtight Seal",
    text: "Fast, honest, and competitive quote for our Murfreesboro backyard shelter. The gas-strut hatch is effortless to lift, the interior is clean and secure, and our family feels completely protected. Highly recommend!",
    author: "David K.",
    location: "Murfreesboro, TN",
    rating: 5,
    featured: true,
    createdAt: "2026-05-02T12:00:00Z"
  },
  {
    id: "review-3",
    title: "Commercial Safe Room Done Right",
    text: "Outstanding service. The team engineered and installed our commercial storm shelter seamlessly. They took care of everything from permitting to heavy crane logistics. Exceptional project management.",
    author: "Brian T.",
    location: "Nashville, TN",
    rating: 5,
    featured: true,
    createdAt: "2026-05-03T12:00:00Z"
  },
  {
    id: "review-4",
    title: "Laser-Guided Excavation With Zero Lawn Mess",
    text: "We were quoted for an 8-person underground vault and they stuck to the quote exactly. No hidden charges. The crew was professional, courteous, and cleaned up every square foot before leaving.",
    author: "Elena R.",
    location: "Hendersonville, TN",
    rating: 5,
    featured: true,
    createdAt: "2026-05-04T12:00:00Z"
  }
];

export const INITIAL_CHATS: ChatSession[] = [];

export const INITIAL_EMAILS: WebEmail[] = [
  {
    id: "email-1",
    name: "Charlotte Horn",
    email: "charlotte.horn@gmail.com",
    phone: "(615) 555-8291",
    service: "Residential Underground Storm Shelter",
    message: "Hi, we are building a new home in Franklin, TN and need an itemized quote for an underground 8-person storm shelter installed in our backyard before spring storm season. Thanks!",
    source: "Contact Page",
    createdAt: "2026-06-16T18:22:00Z"
  }
];

const DEFAULT_ADMIN = { id: "admin-1", username: "admin", role: "admin", password: "admin123" };

// ── LOCAL STORAGE FALLBACK HELPERS ──
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored) as T;
  } catch {
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// ── GENERIC API FETCH HELPER ──
async function apiCall<T>(url: string, method: string, body?: any): Promise<T> {
  const options: RequestInit = { method };
  const headers: Record<string, string> = {};

  if (body !== undefined) {
    headers["content-type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  // Attach session token if logged in
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("electrical-session-token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  options.headers = headers;

  const res = await fetch(url, options);
  if (!res.ok) {
    let errorMsg = `HTTP error ${res.status}`;
    try {
      const text = await res.text();
      try {
        const parsed = JSON.parse(text);
        if (parsed.error) {
          errorMsg = parsed.error;
        }
      } catch {
        if (text) {
          const cleanText = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
          errorMsg = cleanText.length > 200 ? cleanText.substring(0, 200) + "..." : cleanText;
        }
      }
    } catch {
      // Ignore
    }
    throw new Error(errorMsg);
  }
  return res.json() as Promise<T>;
}

// ── LEADS ──
export const getLeads = async (): Promise<Lead[]> => {
  try {
    const leads = await apiCall<Lead[]>("/api/leads", "GET");
    setStorageItem("electrical-leads", leads);
    return leads;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage leads:", err);
    return getStorageItem<Lead[]>("electrical-leads", INITIAL_LEADS);
  }
};

export const addLead = async (leadData: Omit<Lead, "id" | "status" | "estimatedValue" | "createdAt">): Promise<Lead> => {
  try {
    return await apiCall<Lead>("/api/leads", "POST", { leadData });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const leads = await getLeads();
    let estimatedValue = 2500;
    switch (leadData.projectType) {
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
    const newLead: Lead = {
      ...leadData,
      id: "lead-" + Math.random().toString(36).substr(2, 9),
      status: "new",
      estimatedValue,
      createdAt: new Date().toISOString(),
      photos: []
    };
    leads.push(newLead);
    setStorageItem("electrical-leads", leads);
    return newLead;
  }
};

export const addCustomLead = async (lead: Omit<Lead, "id" | "createdAt">): Promise<Lead> => {
  try {
    return await apiCall<Lead>("/api/leads", "POST", { custom: true, lead });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const leads = await getLeads();
    const newLead: Lead = {
      ...lead,
      id: "lead-" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    leads.push(newLead);
    setStorageItem("electrical-leads", leads);
    return newLead;
  }
};

export const updateLeadStatus = async (id: string, status: Lead["status"]): Promise<Lead[] | null> => {
  try {
    return await apiCall<Lead[]>("/api/leads", "PUT", { id, updates: { status } });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const leads = await getLeads();
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    setStorageItem("electrical-leads", updated);
    return updated;
  }
};

export const updateLeadDetails = async (id: string, updates: Partial<Pick<Lead, "estimatedValue" | "notes" | "status">>): Promise<Lead[] | null> => {
  try {
    return await apiCall<Lead[]>("/api/leads", "PUT", { id, updates });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const leads = await getLeads();
    const updated = leads.map(l => l.id === id ? { ...l, ...updates } : l);
    setStorageItem("electrical-leads", updated);
    return updated;
  }
};

export const deleteLead = async (id: string): Promise<Lead[]> => {
  try {
    return await apiCall<Lead[]>("/api/leads", "DELETE", { id });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const leads = await getLeads();
    const filtered = leads.filter(l => l.id !== id);
    setStorageItem("electrical-leads", filtered);
    return filtered;
  }
};

export const uploadLeadPhoto = async (leadId: string, base64Photo: string): Promise<Lead[]> => {
  try {
    return await apiCall<Lead[]>("/api/leads/photos", "POST", { leadId, base64Photo });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const leads = await getLeads();
    const updated = leads.map(l => {
      if (l.id === leadId) {
        const photos = l.photos || [];
        return { ...l, photos: [...photos, base64Photo] };
      }
      return l;
    });
    setStorageItem("electrical-leads", updated);
    return updated;
  }
};

export const removeLeadPhoto = async (leadId: string, photoIndex: number): Promise<Lead[]> => {
  try {
    return await apiCall<Lead[]>("/api/leads/photos", "DELETE", { leadId, photoIndex });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const leads = await getLeads();
    const updated = leads.map(l => {
      if (l.id === leadId && l.photos) {
        const photos = [...l.photos];
        photos.splice(photoIndex, 1);
        return { ...l, photos };
      }
      return l;
    });
    setStorageItem("electrical-leads", updated);
    return updated;
  }
};

// ── REVIEWS ──
export const getReviews = async (): Promise<Review[]> => {
  try {
    const reviews = await apiCall<Review[]>("/api/reviews", "GET");
    setStorageItem("electrical-reviews", reviews);
    return reviews;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage reviews:", err);
    return getStorageItem<Review[]>("electrical-reviews", INITIAL_REVIEWS);
  }
};

export const addReview = async (reviewData: Omit<Review, "id" | "featured" | "createdAt"> & { newReviewPhoto?: string }): Promise<Review> => {
  try {
    return await apiCall<Review>("/api/reviews", "POST", reviewData);
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const reviews = await getReviews();
    const photos: string[] = [];
    if (reviewData.newReviewPhoto) {
      photos.push(reviewData.newReviewPhoto);
    }
    const newReview: Review = {
      ...reviewData,
      id: "review-" + Math.random().toString(36).substr(2, 9),
      featured: true,
      createdAt: new Date().toISOString(),
      photos
    };
    reviews.unshift(newReview);
    setStorageItem("electrical-reviews", reviews);
    return newReview;
  }
};

export const toggleReviewFeatured = async (id: string): Promise<Review[]> => {
  try {
    return await apiCall<Review[]>("/api/reviews", "PUT", { id, action: "featured" });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const reviews = await getReviews();
    const updated = reviews.map(r => r.id === id ? { ...r, featured: !r.featured } : r);
    setStorageItem("electrical-reviews", updated);
    return updated;
  }
};

export const replyToReview = async (id: string, replyText: string): Promise<Review[]> => {
  try {
    return await apiCall<Review[]>("/api/reviews", "PUT", { id, replyText, action: "reply" });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const reviews = await getReviews();
    const updated = reviews.map(r => r.id === id ? { ...r, replyText } : r);
    setStorageItem("electrical-reviews", updated);
    return updated;
  }
};

export const deleteReview = async (id: string): Promise<Review[]> => {
  try {
    return await apiCall<Review[]>("/api/reviews", "DELETE", { id });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const reviews = await getReviews();
    const updated = reviews.filter(r => r.id !== id);
    setStorageItem("electrical-reviews", updated);
    return updated;
  }
};

// ── CHATS ──
export const getChatSessions = async (): Promise<ChatSession[]> => {
  try {
    const chats = await apiCall<ChatSession[]>("/api/chats?t=" + Date.now(), "GET");
    const sorted = chats.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
    setStorageItem("electrical-chats", sorted);
    return sorted;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage chats:", err);
    const chats = getStorageItem<ChatSession[]>("electrical-chats", INITIAL_CHATS);
    return chats.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
  }
};

export const getChatSessionById = async (sessionId: string): Promise<ChatSession | null> => {
  const chats = await getChatSessions();
  return chats.find(c => c.id === sessionId) || null;
};

export const createChatSession = async (
  clientName: string,
  clientCity: string = "Miami",
  clientEmail?: string,
  clientPhone?: string
): Promise<ChatSession> => {
  try {
    return await apiCall<ChatSession>("/api/chats", "POST", { action: "create", clientName, clientCity, clientEmail, clientPhone });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const chats = await getChatSessions();
    const newSession: ChatSession = {
      id: "session-" + Math.random().toString(36).substr(2, 9),
      clientName,
      clientCity,
      clientEmail,
      clientPhone,
      lastMessage: "Chat session initialized",
      lastMessageTime: new Date().toISOString(),
      unread: true,
      messages: []
    };
    chats.push(newSession);
    setStorageItem("electrical-chats", chats);
    return newSession;
  }
};

export const sendChatMessage = async (sessionId: string, sender: "client" | "admin", text: string): Promise<ChatSession | null> => {
  try {
    return await apiCall<ChatSession | null>("/api/chats", "POST", { action: "message", sessionId, sender, text });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const chats = await getChatSessions();
    let updatedSession: ChatSession | null = null;
    const updatedChats = chats.map(c => {
      if (c.id === sessionId) {
        const newMsg: ChatMessage = {
          id: "msg-" + Math.random().toString(36).substr(2, 9),
          sender,
          text,
          timestamp: new Date().toISOString()
        };
        updatedSession = {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: text,
          lastMessageTime: newMsg.timestamp,
          unread: sender === "client"
        };
        return updatedSession;
      }
      return c;
    });
    setStorageItem("electrical-chats", updatedChats);
    return updatedSession;
  }
};

export const markChatAsRead = async (sessionId: string): Promise<ChatSession[]> => {
  try {
    return await apiCall<ChatSession[]>("/api/chats", "POST", { action: "read", sessionId });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const chats = await getChatSessions();
    const updated = chats.map(c => c.id === sessionId ? { ...c, unread: false } : c);
    setStorageItem("electrical-chats", updated);
    return updated;
  }
};

export const deleteChatSession = async (id: string): Promise<ChatSession[]> => {
  try {
    const chats = await apiCall<ChatSession[]>("/api/chats?id=" + id, "DELETE");
    setStorageItem("electrical-chats", chats);
    return chats;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const chats = await getChatSessions();
    const filtered = chats.filter(c => c.id !== id);
    setStorageItem("electrical-chats", filtered);
    return filtered;
  }
};

// ── EMAILS ──
export const getWebEmails = async (): Promise<WebEmail[]> => {
  try {
    const emails = await apiCall<WebEmail[]>("/api/emails", "GET");
    const sorted = emails.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setStorageItem("electrical-emails", sorted);
    return sorted;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage emails:", err);
    const emails = getStorageItem<WebEmail[]>("electrical-emails", INITIAL_EMAILS);
    return emails.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
};

export const addWebEmail = async (emailData: Omit<WebEmail, "id" | "createdAt">): Promise<WebEmail> => {
  try {
    return await apiCall<WebEmail>("/api/emails", "POST", { emailData });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const emails = await getWebEmails();
    const newEmail: WebEmail = {
      ...emailData,
      id: "email-" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    emails.unshift(newEmail);
    setStorageItem("electrical-emails", emails);
    return newEmail;
  }
};

export const deleteWebEmail = async (id: string): Promise<WebEmail[]> => {
  try {
    return await apiCall<WebEmail[]>("/api/emails", "DELETE", { id });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const emails = await getWebEmails();
    const filtered = emails.filter(e => e.id !== id);
    setStorageItem("electrical-emails", filtered);
    return filtered;
  }
};

// ── GALLERY PHOTOS ──
export const getGalleryPhotos = async (): Promise<GalleryPhoto[]> => {
  try {
    const photos = await apiCall<GalleryPhoto[]>("/api/gallery", "GET");
    setStorageItem("electrical-gallery-photos", photos);
    return photos;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage gallery:", err);
    return getStorageItem<GalleryPhoto[]>("electrical-gallery-photos", [
      { id: "photo-1", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e", uploadedAt: new Date().toISOString() }
    ]);
  }
};

export const uploadGalleryPhoto = async (fileOrBase64: string | File, category?: string): Promise<GalleryPhoto[]> => {
  try {
    const folder = `electrical/${category && category !== "all" ? category : "gallery"}`;

    // Step 1: Get a signed upload token from the server
    const signRes = await apiCall<{ signature: string; timestamp: number; apiKey: string; cloudName: string; folder: string }>(
      "/api/sign-upload", "POST", { folder }
    );

    // Step 2: Build FormData for direct Cloudinary upload (supports any size)
    const formData = new FormData();
    formData.append("api_key", signRes.apiKey);
    formData.append("signature", signRes.signature);
    formData.append("timestamp", String(signRes.timestamp));
    formData.append("folder", signRes.folder);

    // Accept either a File object (from input) or a base64 string
    if (fileOrBase64 instanceof File) {
      formData.append("file", fileOrBase64);
    } else {
      formData.append("file", fileOrBase64);
    }

    // Step 3: Upload directly to Cloudinary
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${signRes.cloudName}/auto/upload`,
      { method: "POST", body: formData }
    );
    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      throw new Error(`Cloudinary upload failed: ${err}`);
    }
    const uploadData = await uploadRes.json();
    const secureUrl: string = uploadData.secure_url;

    // Step 4: Save the URL to our database
    return await apiCall<GalleryPhoto[]>("/api/gallery", "POST", { url: secureUrl, category });
  } catch (err) {
    console.warn("Gallery upload failed, falling back to local storage:", err);
    const photos = await getGalleryPhotos();
    const newPhoto: GalleryPhoto = {
      id: "photo-" + Math.random().toString(36).substr(2, 9),
      url: typeof fileOrBase64 === "string" ? fileOrBase64 : URL.createObjectURL(fileOrBase64),
      category: category || "residential",
      uploadedAt: new Date().toISOString()
    };
    photos.unshift(newPhoto);
    setStorageItem("electrical-gallery-photos", photos);
    return photos;
  }
};

export const removeGalleryPhoto = async (id: string): Promise<GalleryPhoto[]> => {
  try {
    return await apiCall<GalleryPhoto[]>(`/api/gallery?id=${id}`, "DELETE");
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const photos = await getGalleryPhotos();
    const filtered = photos.filter(p => p.id !== id);
    setStorageItem("electrical-gallery-photos", filtered);
    return filtered;
  }
};

// ── PORTAL SECURITY & AUTH ──
export const loginAdmin = async (username: string, password: string): Promise<{ success: boolean; token: string }> => {
  try {
    const res = await apiCall<{ success: boolean; user: any }>("/api/users", "POST", { action: "login", username, password });
    if (res.success && typeof window !== "undefined") {
      const token = "token-" + res.user.id + "-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("electrical-session-token", token);
      localStorage.setItem("electrical-session-user", JSON.stringify(res.user));
      return { success: true, token };
    }
    throw new Error("Invalid credentials");
  } catch (err) {
    console.warn("MongoDB offline, checking local storage accounts:", err);
    const accounts = getStorageItem<any[]>("electrical-admin-accounts", [DEFAULT_ADMIN]);
    const user = accounts.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password === password);
    if (user) {
      const token = "token-" + user.id + "-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("electrical-session-token", token);
      localStorage.setItem("electrical-session-user", JSON.stringify({ id: user.id, username: user.username, role: user.role }));
      return { success: true, token };
    }
    throw new Error("Invalid username or password.");
  }
};

export const verifyAdminToken = async (token: string): Promise<{ valid: boolean; id?: string; username?: string; role?: string }> => {
  if (typeof window === "undefined") return { valid: false };
  const activeToken = localStorage.getItem("electrical-session-token");
  const storedUser = localStorage.getItem("electrical-session-user");
  if (activeToken === token && storedUser) {
    const u = JSON.parse(storedUser);
    return { valid: true, id: u.id, username: u.username, role: u.role };
  }
  return { valid: false };
};

export const getPortalUsers = async (): Promise<PortalUser[]> => {
  try {
    return await apiCall<PortalUser[]>("/api/users", "GET");
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const accounts = getStorageItem<any[]>("electrical-admin-accounts", [DEFAULT_ADMIN]);
    return accounts.map(a => ({ id: a.id, username: a.username, role: a.role }));
  }
};

export const createPortalUser = async (username: string, password: string, role: string): Promise<{ success: boolean; id: string; username: string; role: string }> => {
  try {
    return await apiCall<{ success: boolean; id: string; username: string; role: string }>("/api/users", "POST", { action: "create", username, password, role });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const accounts = getStorageItem<any[]>("electrical-admin-accounts", [DEFAULT_ADMIN]);
    if (accounts.some(a => a.username.toLowerCase() === username.toLowerCase())) {
      throw new Error("Username already exists.");
    }
    const newUser = {
      id: "admin-" + Math.random().toString(36).substr(2, 9),
      username,
      password,
      role
    };
    accounts.push(newUser);
    setStorageItem("electrical-admin-accounts", accounts);
    return { success: true, id: newUser.id, username: newUser.username, role: newUser.role };
  }
};

export const deletePortalUser = async (userId: string): Promise<{ success: boolean }> => {
  try {
    return await apiCall<{ success: boolean }>("/api/users", "POST", { action: "delete", userId });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const accounts = getStorageItem<any[]>("electrical-admin-accounts", [DEFAULT_ADMIN]);
    const filtered = accounts.filter(a => a.id !== userId);
    setStorageItem("electrical-admin-accounts", filtered);
    return { success: true };
  }
};

export const updateUserCredentials = async (userId: string, username?: string, password?: string): Promise<{ success: boolean; username: string }> => {
  try {
    const res = await apiCall<{ success: boolean; username: string }>("/api/users", "POST", { action: "update", userId, username, password });
    if (res.success && typeof window !== "undefined") {
      const storedUser = localStorage.getItem("electrical-session-user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.id === userId) {
          u.username = res.username;
          localStorage.setItem("electrical-session-user", JSON.stringify(u));
        }
      }
    }
    return res;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const accounts = getStorageItem<any[]>("electrical-admin-accounts", [DEFAULT_ADMIN]);
    let updatedUsername = "";
    const updated = accounts.map(a => {
      if (a.id === userId) {
        updatedUsername = username || a.username;
        return {
          ...a,
          username: username || a.username,
          password: password || a.password
        };
      }
      return a;
    });
    setStorageItem("electrical-admin-accounts", updated);

    const storedUser = localStorage.getItem("electrical-session-user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      if (u.id === userId) {
        u.username = updatedUsername;
        localStorage.setItem("electrical-session-user", JSON.stringify(u));
      }
    }
    return { success: true, username: updatedUsername };
  }
};

// Analytics calculator helper
export const getAnalyticsData = (leads: Lead[], reviews: Review[]) => {
  const totalValue = leads.reduce((acc, curr) => curr.status !== "lost" ? acc + curr.estimatedValue : acc, 0);
  const activeCount = leads.filter(l => ["contacted", "consultation_scheduled", "proposal_sent"].includes(l.status)).length;
  
  const wonLeads = leads.filter(l => l.status === "won");
  const lostLeads = leads.filter(l => l.status === "lost");
  const wonValue = wonLeads.reduce((acc, curr) => acc + curr.estimatedValue, 0);
  const totalClosed = wonLeads.length + lostLeads.length;
  const winRate = totalClosed > 0 ? Math.round((wonLeads.length / totalClosed) * 100) : 0;
  
  const averageValue = leads.length > 0 ? Math.round(leads.reduce((acc, curr) => acc + curr.estimatedValue, 0) / leads.length) : 0;

  // 1. Project type distribution
  const typeCounts: Record<string, { count: number; value: number }> = {};
  leads.forEach(l => {
    if (!typeCounts[l.projectType]) {
      typeCounts[l.projectType] = { count: 0, value: 0 };
    }
    typeCounts[l.projectType].count += 1;
    typeCounts[l.projectType].value += l.estimatedValue;
  });

  const projectTypesChart = Object.entries(typeCounts).map(([name, data]) => ({
    name: name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    value: data.count,
    amount: data.value
  }));

  // 2. Status distribution
  const statusLabels: Record<Lead["status"], string> = {
    new: "New Lead",
    contacted: "Contacted",
    consultation_scheduled: "Consultation Scheduled",
    proposal_sent: "Proposal Sent",
    won: "Contract Won",
    lost: "Lost / Closed"
  };

  const statusCounts: Record<string, number> = {
    "New Lead": 0,
    "Contacted": 0,
    "Consultation Scheduled": 0,
    "Proposal Sent": 0,
    "Contract Won": 0,
    "Lost / Closed": 0
  };

  leads.forEach(l => {
    const label = statusLabels[l.status];
    statusCounts[label] = (statusCounts[label] || 0) + 1;
  });

  const statusChart = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  // 3. Regional distribution (cities)
  const cityCounts: Record<string, number> = {};
  leads.forEach(l => {
    const addressStr = l.address || "";
    const parts = addressStr.split(",");
    let city = "Miami";
    if (parts.length >= 2) {
      const cityPart = parts[parts.length - 2].trim();
      city = cityPart || "Miami";
    }
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  const regionChart = Object.entries(cityCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // 4. Growth monthly timeline
  const monthlyData: Record<string, { count: number; value: number }> = {
    "Jan": { count: 3, value: 12000 },
    "Feb": { count: 5, value: 24500 },
    "Mar": { count: 7, value: 45000 },
    "Apr": { count: 9, value: 78000 },
    "May": { count: 12, value: 112000 },
    "Jun": { count: 0, value: 0 }
  };

  leads.forEach(l => {
    if (!l.createdAt) return;
    const date = new Date(l.createdAt);
    if (isNaN(date.getTime())) return;
    const month = date.toLocaleString("en-US", { month: "short" });
    if (monthlyData[month]) {
      monthlyData[month].count += 1;
      monthlyData[month].value += l.estimatedValue;
    } else {
      monthlyData[month] = { count: 1, value: l.estimatedValue };
    }
  });

  const timelineChart = Object.entries(monthlyData).map(([month, data]) => ({
    name: month,
    leads: data.count,
    revenue: data.value
  }));

  return {
    totalValue,
    activeCount,
    winRate,
    wonValue,
    averageValue,
    totalLeads: leads.length,
    projectTypesChart,
    statusChart,
    regionChart,
    timelineChart
  };
};

export interface SiteSettings {
  alertEmail: string;
  officePhone: string;
  smsTemplate: string;
  emailAlert: boolean;
  smsAlert: boolean;
  maintenanceMode: boolean;
  weekdays: string;
  saturdays: string;
  sundays: string;
}

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    return await apiCall<SiteSettings>("/api/settings?t=" + Date.now(), "GET");
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage settings:", err);
    let email = getStorageItem("shelter_settings_alertEmail", "admin@nashvillesiteworks.com");
    let phone = getStorageItem("shelter_settings_officePhone", "615-991-2361");
    return {
      alertEmail: email,
      officePhone: phone,
      smsTemplate: getStorageItem("shelter_settings_smsTemplate", "Hi {Name}, thank you for contacting Southern Storm Shelters LLC! A storm shelter specialist will contact you during the {Time} to discuss your {Type} installation."),
      emailAlert: getStorageItem("shelter_settings_emailAlert", "true") === "true",
      smsAlert: getStorageItem("shelter_settings_smsAlert", "true") === "true",
      maintenanceMode: getStorageItem("shelter_settings_maintenanceMode", "false") === "true",
      weekdays: getStorageItem("shelter_settings_weekdays", "Open 24/7"),
      saturdays: getStorageItem("shelter_settings_saturdays", "Open 24/7"),
      sundays: getStorageItem("shelter_settings_sundays", "Open 24/7 (Emergency Response)")
    };
  }
};

export const saveSiteSettings = async (settings: Partial<SiteSettings>): Promise<SiteSettings> => {
  try {
    return await apiCall<SiteSettings>("/api/settings", "POST", settings);
  } catch (err) {
    console.warn("MongoDB offline, saving to local storage settings:", err);
    Object.entries(settings).forEach(([key, val]) => {
      setStorageItem("electrical_settings_" + key, String(val));
    });
    return getSiteSettings();
  }
};

// ── NOTIFICATIONS ──
export interface DashboardNotification {
  id: string;
  type: "chat_start" | "chat_message" | "form_submission";
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
  metadata?: any;
}

export const getNotifications = async (): Promise<DashboardNotification[]> => {
  try {
    return await apiCall<DashboardNotification[]>("/api/notifications", "GET");
  } catch (err) {
    console.warn("Error getting notifications:", err);
    return [];
  }
};

export const markNotificationRead = async (id: string): Promise<DashboardNotification[]> => {
  try {
    return await apiCall<DashboardNotification[]>("/api/notifications", "POST", { action: "read", id });
  } catch (err) {
    console.warn("Error marking notification read:", err);
    return [];
  }
};

export const markAllNotificationsRead = async (): Promise<DashboardNotification[]> => {
  try {
    return await apiCall<DashboardNotification[]>("/api/notifications", "POST", { action: "read-all" });
  } catch (err) {
    console.warn("Error marking all read:", err);
    return [];
  }
};

export const clearAllNotifications = async (): Promise<DashboardNotification[]> => {
  try {
    return await apiCall<DashboardNotification[]>("/api/notifications", "POST", { action: "clear-all" });
  } catch (err) {
    console.warn("Error clearing notifications:", err);
    return [];
  }
};

