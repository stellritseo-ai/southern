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
  installed?: string;
  rating: number;
  featured: boolean;
  verified?: boolean;
  replyText?: string;
  reply?: string;
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
  address?: string;
  projectType?: string;
  timeframe?: string;
  status?: "new" | "contacted" | "converted" | "archived";
  notes?: string;
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
  name?: string;
  role: "admin" | "dispatcher" | "sales" | "manager" | "field" | string;
  createdAt?: string;
  lastLogin?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title?: string;
  category?: string;
  location?: string;
  tag?: string;
  featured?: boolean;
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
    description: "Wanting an on-site estimate to install a precision engineered in-ground storm shelter. Yard has moderate clay soil.",
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
    address: "Nashville, TN",
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
    author: "Michael R.",
    location: "Franklin, TN",
    installed: "Granger ISS In-Ground Shelter",
    title: "Finally, a company that actually knows how to install a shelter.",
    text: "We got quotes from three different companies. Two of them were just dealers who subcontracted the work. Southern Storm Shelters was different—they showed up with their own equipment, evaluated our soil, and explained exactly what they were doing. The installation took less than four hours, and the site was left spotless. You can tell they're construction professionals, not just salespeople.",
    rating: 5,
    featured: true,
    verified: true,
    createdAt: "2026-05-10T14:30:00Z"
  },
  {
    id: "review-2",
    author: "Sarah & David T.",
    location: "Murfreesboro, TN",
    installed: "Granger ISS In-Ground Shelter",
    title: "Peace of mind for our family of six.",
    text: "With three kids and aging parents living with us, we needed a shelter that was easy to access for everyone. The articulating handrails and molded-in seating were game-changers. Even my father, who has mobility issues, can get in and out without difficulty. The team at Southern Storm Shelters was patient, professional, and answered every question we had. We finally feel prepared.",
    rating: 5,
    featured: true,
    verified: true,
    createdAt: "2026-05-12T09:15:00Z"
  },
  {
    id: "review-3",
    author: "James K.",
    location: "Nashville, TN",
    installed: "Granger ISS Custom Color Door",
    title: "The installation was flawless.",
    text: "I'm a contractor myself, so I'm particular about workmanship. Southern Storm Shelters exceeded my expectations. They understood drainage, soil conditions, and proper backfill. The reverse taper design meant no concrete anchoring was needed, which saved us money. The door color matches our landscaping perfectly. Highly recommend.",
    rating: 5,
    featured: true,
    verified: true,
    createdAt: "2026-05-14T11:45:00Z"
  },
  {
    id: "review-4",
    author: "Emily W.",
    location: "Brentwood, TN",
    installed: "Granger ISS During New Construction",
    title: "They handled everything from start to finish.",
    text: "We were building a new home and wanted the shelter installed during construction. Southern Storm Shelters coordinated with our builder, scheduled the excavation perfectly, and integrated the shelter seamlessly into our plans. No hassle, no delays. The LED light inside is a nice touch, too.",
    rating: 5,
    featured: true,
    verified: true,
    createdAt: "2026-05-16T16:20:00Z"
  },
  {
    id: "review-5",
    author: "Robert & Linda M.",
    location: "Spring Hill, TN",
    installed: "Granger ISS In-Ground Shelter",
    title: "Worth every penny for the peace of mind.",
    text: "After the tornado warnings we had last spring, we decided we couldn't wait any longer. Southern Storm Shelters responded to our inquiry within 24 hours and scheduled a site evaluation that same week. The quote was transparent with no hidden fees. The installation was quick, and the lifetime warranty sealed the deal. We sleep better at night now.",
    rating: 5,
    featured: true,
    verified: true,
    createdAt: "2026-05-18T10:00:00Z"
  },
  {
    id: "review-6",
    author: "Angela P.",
    location: "Columbia, TN",
    installed: "Granger ISS In-Ground Shelter",
    title: "Professional, punctual, and knowledgeable.",
    text: "From the first phone call to the final walkthrough, the team at Southern Storm Shelters was professional and courteous. They explained the FEMA 320 and FEMA 361 testing, showed us the triple locking system, and made sure we understood how to operate everything. The gas-assisted shocks make opening the heavy door easy. We couldn't be happier.",
    rating: 5,
    featured: true,
    verified: true,
    createdAt: "2026-05-20T13:10:00Z"
  },
  {
    id: "review-7",
    author: "Thomas H.",
    location: "Hendersonville, TN",
    installed: "Granger ISS In-Ground Shelter",
    title: "They truly care about their customers.",
    text: "What impressed me most was the follow-up. A few weeks after installation, they called to make sure everything was working properly and that we had no questions. That level of customer service is rare these days. I've already recommended them to two neighbors.",
    rating: 5,
    featured: true,
    verified: true,
    createdAt: "2026-05-22T15:40:00Z"
  },
  {
    id: "review-8",
    author: "Karen & Steve B.",
    location: "Gallatin, TN",
    installed: "Granger ISS In-Ground Shelter",
    title: "The best investment we've made for our home.",
    text: "We considered an above-ground safe room, but after talking with Southern Storm Shelters, we realized an underground shelter was the better option for our property. The double-wall foam-filled construction keeps it dry and comfortable. The molded-in seating means we can wait out a storm in relative comfort. Installation was fast, and the team was fantastic.",
    rating: 5,
    featured: true,
    verified: true,
    createdAt: "2026-05-25T11:00:00Z"
  },
  {
    id: "review-9",
    author: "Daniel F.",
    location: "Mount Juliet, TN",
    installed: "Granger ISS In-Ground Shelter",
    title: "Impressed with their construction expertise.",
    text: "I watched the entire installation. These guys know what they're doing. They checked for buried utilities, assessed drainage, and made sure the shelter was perfectly level before backfilling. The reverse taper design is brilliant—no concrete needed, no risk of floating. This is how it should be done.",
    rating: 5,
    featured: true,
    verified: true,
    createdAt: "2026-05-28T08:50:00Z"
  },
  {
    id: "review-10",
    author: "Patricia L.",
    location: "Nolensville, TN",
    installed: "Granger ISS Custom Green Door",
    title: "From quote to installation in under two weeks.",
    text: "We were on a tight timeline before storm season. Southern Storm Shelters moved quickly without cutting corners. The estimate was detailed and fair, the scheduling was easy, and the installation was completed in a single morning. The custom green door blends right into our lawn. You can barely tell it's there—until you need it.",
    rating: 5,
    featured: true,
    verified: true,
    createdAt: "2026-06-01T14:15:00Z"
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
  let stored = localStorage.getItem(key);
  if (!stored && key.startsWith("shelter-")) {
    const legacy = localStorage.getItem(key.replace("shelter-", "electrical-"));
    if (legacy) stored = legacy;
  }
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
    const token = localStorage.getItem("shelter-session-token") || localStorage.getItem("electrical-session-token");
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
    setStorageItem("shelter-reviews", reviews);
    return reviews;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage reviews:", err);
    return getStorageItem<Review[]>("shelter-reviews", INITIAL_REVIEWS);
  }
};

export const addReview = async (reviewData: Omit<Review, "id" | "createdAt"> & { newReviewPhoto?: string; featured?: boolean }): Promise<Review> => {
  try {
    return await apiCall<Review>("/api/reviews", "POST", reviewData);
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const reviews = await getReviews();
    const photos: string[] = reviewData.photos ? [...reviewData.photos] : [];
    if (reviewData.newReviewPhoto) {
      photos.push(reviewData.newReviewPhoto);
    }
    const newReview: Review = {
      ...reviewData,
      id: "review-" + Math.random().toString(36).substr(2, 9),
      featured: reviewData.featured !== undefined ? reviewData.featured : true,
      createdAt: new Date().toISOString(),
      photos
    };
    reviews.unshift(newReview);
    setStorageItem("shelter-reviews", reviews);
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
    setStorageItem("shelter-reviews", updated);
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
    setStorageItem("shelter-reviews", updated);
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
    setStorageItem("shelter-reviews", updated);
    return updated;
  }
};

// ── CHATS ──
export const getChatSessions = async (): Promise<ChatSession[]> => {
  try {
    const chats = await apiCall<ChatSession[]>("/api/chats?t=" + Date.now(), "GET");
    const sorted = (chats || []).sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
    setStorageItem("shelter-chats", sorted);
    return sorted;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage chats:", err);
    const chats = getStorageItem<ChatSession[]>("shelter-chats", getStorageItem<ChatSession[]>("electrical-chats", INITIAL_CHATS));
    return chats.sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
  }
};

export const getChatSessionById = async (sessionId: string): Promise<ChatSession | null> => {
  const chats = await getChatSessions();
  return chats.find(c => c.id === sessionId) || null;
};

export const createChatSession = async (
  clientName: string,
  clientCity: string = "Nashville",
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
    setStorageItem("shelter-chats", chats);
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
    setStorageItem("shelter-chats", updatedChats);
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
    setStorageItem("shelter-chats", updated);
    return updated;
  }
};

export const deleteChatSession = async (id: string): Promise<ChatSession[]> => {
  try {
    const chats = await apiCall<ChatSession[]>("/api/chats?id=" + id, "DELETE");
    setStorageItem("shelter-chats", chats);
    return chats;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const chats = await getChatSessions();
    const filtered = chats.filter(c => c.id !== id);
    setStorageItem("shelter-chats", filtered);
    return filtered;
  }
};

// ── EMAILS ──
export const getWebEmails = async (): Promise<WebEmail[]> => {
  try {
    const emails = await apiCall<WebEmail[]>("/api/emails", "GET");
    const normalized = (emails || []).map((e) => ({
      ...e,
      status: e.status || "new",
    }));
    const sorted = normalized.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setStorageItem("shelter-web-emails", sorted);
    return sorted;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage emails:", err);
    const emails = getStorageItem<WebEmail[]>("shelter-web-emails", INITIAL_EMAILS);
    const normalized = (emails || []).map((e) => ({
      ...e,
      status: e.status || "new",
    }));
    return normalized.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
};

export const addWebEmail = async (emailData: Omit<WebEmail, "id" | "createdAt">): Promise<WebEmail> => {
  try {
    const payload = {
      ...emailData,
      status: emailData.status || "new",
    };
    return await apiCall<WebEmail>("/api/emails", "POST", { emailData: payload });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const emails = await getWebEmails();
    const newEmail: WebEmail = {
      ...emailData,
      id: "email-" + Math.random().toString(36).substr(2, 9),
      status: emailData.status || "new",
      createdAt: new Date().toISOString()
    };
    emails.unshift(newEmail);
    setStorageItem("shelter-web-emails", emails);
    return newEmail;
  }
};

export const updateWebEmail = async (id: string, updates: Partial<WebEmail>): Promise<WebEmail[]> => {
  try {
    const list = await apiCall<WebEmail[]>("/api/emails", "PATCH", { id, updates });
    const normalized = (list || []).map((e) => ({
      ...e,
      status: e.status || "new",
    }));
    setStorageItem("shelter-web-emails", normalized);
    return normalized;
  } catch (err) {
    console.warn("MongoDB offline, updating email in local storage:", err);
    const emails = await getWebEmails();
    const updated = emails.map(e => (e.id === id ? { ...e, ...updates } : e));
    setStorageItem("shelter-web-emails", updated);
    return updated;
  }
};

export const deleteWebEmail = async (id: string): Promise<WebEmail[]> => {
  try {
    const list = await apiCall<WebEmail[]>("/api/emails", "DELETE", { id });
    setStorageItem("shelter-web-emails", list);
    return list;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const emails = await getWebEmails();
    const filtered = emails.filter(e => e.id !== id);
    setStorageItem("shelter-web-emails", filtered);
    return filtered;
  }
};

export const convertInquiryToLead = async (inquiry: WebEmail): Promise<{ lead: Lead; emails: WebEmail[] }> => {
  // Determine commercial vs residential
  const isComm =
    inquiry.service?.toLowerCase().includes("commercial") ||
    inquiry.projectType?.toLowerCase().includes("commercial") ||
    inquiry.message?.toLowerCase().includes("commercial") ||
    inquiry.message?.toLowerCase().includes("business");

  const newLead = await addLead({
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || "",
    address: inquiry.address || "Nashville, TN",
    projectType: (isComm ? "commercial" : "residential") as any,
    description: inquiry.message || `Website inquiry for ${inquiry.service || "Storm Shelter Installation"}`,
    contactTime: "morning",
    notes: `Converted from Web Inquiry (${inquiry.source || "Website Form"}).\nOriginal Timestamp: ${new Date(inquiry.createdAt).toLocaleString()}${inquiry.notes ? "\nInquiry Internal Notes: " + inquiry.notes : ""}`
  });

  const updatedEmails = await updateWebEmail(inquiry.id, {
    status: "converted",
    notes: `${inquiry.notes ? inquiry.notes + "\n" : ""}Converted to CRM Lead on ${new Date().toLocaleDateString()}.`
  });

  return { lead: newLead, emails: updatedEmails };
};

// ── GALLERY PHOTOS ──
export const getGalleryPhotos = async (): Promise<GalleryPhoto[]> => {
  try {
    const photos = await apiCall<GalleryPhoto[]>("/api/gallery", "GET");
    const cleanPhotos = (photos || []).filter(
      (p) => p.url && !p.url.includes("unsplash.com") && !p.url.includes("localhost")
    );
    setStorageItem("shelter-gallery-photos", cleanPhotos);
    return cleanPhotos;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage gallery:", err);
    const cached = getStorageItem<GalleryPhoto[]>("shelter-gallery-photos", []);
    return (cached || []).filter(
      (p) => p.url && !p.url.includes("unsplash.com") && !p.url.includes("localhost")
    );
  }
};

export const uploadGalleryPhoto = async (
  fileOrBase64: string | File,
  category?: string,
  meta?: { title?: string; location?: string; tag?: string; featured?: boolean }
): Promise<GalleryPhoto[]> => {
  try {
    const folder = "shelters/gallery";

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
    const updatedPhotos = await apiCall<GalleryPhoto[]>("/api/gallery", "POST", {
      url: secureUrl,
      category: category || "general",
      title: meta?.title,
      location: meta?.location,
      tag: meta?.tag,
      featured: meta?.featured ?? true,
    });
    const cleanUpdated = (updatedPhotos || []).filter(
      (p) => p.url && !p.url.includes("unsplash.com") && !p.url.includes("localhost")
    );
    setStorageItem("shelter-gallery-photos", cleanUpdated);
    return cleanUpdated;
  } catch (err) {
    console.warn("Gallery upload failed, falling back to local storage:", err);
    const photos = await getGalleryPhotos();
    const newPhoto: GalleryPhoto = {
      id: "photo-" + Math.random().toString(36).substr(2, 9),
      url: typeof fileOrBase64 === "string" ? fileOrBase64 : URL.createObjectURL(fileOrBase64),
      category: category || "general",
      title: meta?.title,
      location: meta?.location,
      tag: meta?.tag,
      featured: meta?.featured ?? true,
      uploadedAt: new Date().toISOString()
    };
    photos.unshift(newPhoto);
    setStorageItem("shelter-gallery-photos", photos);
    return photos;
  }
};

export const removeGalleryPhoto = async (id: string): Promise<GalleryPhoto[]> => {
  try {
    const updated = await apiCall<GalleryPhoto[]>(`/api/gallery?id=${id}`, "DELETE");
    const cleanUpdated = (updated || []).filter(
      (p) => p.url && !p.url.includes("unsplash.com") && !p.url.includes("localhost")
    );
    setStorageItem("shelter-gallery-photos", cleanUpdated);
    return cleanUpdated;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const photos = await getGalleryPhotos();
    const filtered = photos.filter((p) => p.id !== id);
    setStorageItem("shelter-gallery-photos", filtered);
    return filtered;
  }
};

// ── PORTAL SECURITY & AUTH ──
export const loginAdmin = async (username: string, password: string): Promise<{ success: boolean; token: string }> => {
  try {
    const res = await apiCall<{ success: boolean; user: any }>("/api/users", "POST", { action: "login", username, password });
    if (res.success && typeof window !== "undefined") {
      const token = "token-" + res.user.id + "-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("shelter-session-token", token);
      localStorage.setItem("shelter-session-user", JSON.stringify(res.user));
      localStorage.setItem("electrical-session-token", token);
      localStorage.setItem("electrical-session-user", JSON.stringify(res.user));
      return { success: true, token };
    }
    throw new Error("Invalid credentials");
  } catch (err) {
    console.warn("MongoDB offline, checking local storage accounts:", err);
    const accounts = getStorageItem<any[]>("shelter-admin-accounts", [DEFAULT_ADMIN]);
    const user = accounts.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password === password);
    if (user) {
      const token = "token-" + user.id + "-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("shelter-session-token", token);
      localStorage.setItem("shelter-session-user", JSON.stringify({ id: user.id, username: user.username, role: user.role }));
      localStorage.setItem("electrical-session-token", token);
      localStorage.setItem("electrical-session-user", JSON.stringify({ id: user.id, username: user.username, role: user.role }));
      return { success: true, token };
    }
    throw new Error("Invalid username or password.");
  }
};

export const verifyAdminToken = async (token: string): Promise<{ valid: boolean; id?: string; username?: string; role?: string }> => {
  if (typeof window === "undefined") return { valid: false };
  const activeToken = localStorage.getItem("shelter-session-token") || localStorage.getItem("electrical-session-token");
  const storedUser = localStorage.getItem("shelter-session-user") || localStorage.getItem("electrical-session-user");
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
    const accounts = getStorageItem<any[]>("shelter-admin-accounts", [DEFAULT_ADMIN]);
    return accounts.map(a => ({
      id: a.id,
      username: a.username,
      name: a.name || a.username,
      role: a.role,
      createdAt: a.createdAt || "2026-01-01T00:00:00.000Z"
    }));
  }
};

export const createPortalUser = async (username: string, password: string, role: string, name?: string): Promise<{ success: boolean; id: string; username: string; name?: string; role: string; createdAt?: string }> => {
  try {
    return await apiCall<{ success: boolean; id: string; username: string; name?: string; role: string; createdAt?: string }>("/api/users", "POST", { action: "create", username, password, role, name });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const accounts = getStorageItem<any[]>("shelter-admin-accounts", [DEFAULT_ADMIN]);
    if (accounts.some(a => a.username.toLowerCase() === username.toLowerCase())) {
      throw new Error("Username already exists.");
    }
    const newUser = {
      id: "staff-" + Math.random().toString(36).substr(2, 9),
      username,
      name: name || username,
      password,
      role,
      createdAt: new Date().toISOString()
    };
    accounts.push(newUser);
    setStorageItem("shelter-admin-accounts", accounts);
    return { success: true, id: newUser.id, username: newUser.username, name: newUser.name, role: newUser.role, createdAt: newUser.createdAt };
  }
};

export const deletePortalUser = async (userId: string): Promise<{ success: boolean }> => {
  try {
    return await apiCall<{ success: boolean }>("/api/users", "POST", { action: "delete", userId });
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const accounts = getStorageItem<any[]>("shelter-admin-accounts", [DEFAULT_ADMIN]);
    const filtered = accounts.filter(a => a.id !== userId);
    setStorageItem("shelter-admin-accounts", filtered);
    return { success: true };
  }
};

export const updateUserCredentials = async (userId: string, username?: string, password?: string, role?: string, name?: string): Promise<{ success: boolean; username: string }> => {
  try {
    const res = await apiCall<{ success: boolean; username: string; user?: any }>("/api/users", "POST", { action: "update", userId, username, password, role, name });
    if (res.success && typeof window !== "undefined") {
      const storedUser = localStorage.getItem("shelter-session-user") || localStorage.getItem("electrical-session-user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.id === userId) {
          if (username) u.username = username;
          if (name) u.name = name;
          if (role) u.role = role;
          localStorage.setItem("shelter-session-user", JSON.stringify(u));
          localStorage.setItem("electrical-session-user", JSON.stringify(u));
        }
      }
    }
    return res;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage:", err);
    const accounts = getStorageItem<any[]>("shelter-admin-accounts", [DEFAULT_ADMIN]);
    let updatedUsername = "";
    const updated = accounts.map(a => {
      if (a.id === userId) {
        updatedUsername = username || a.username;
        return {
          ...a,
          username: username || a.username,
          name: name || a.name || a.username,
          role: role || a.role,
          password: password || a.password
        };
      }
      return a;
    });
    setStorageItem("shelter-admin-accounts", updated);

    const storedUser = localStorage.getItem("shelter-session-user") || localStorage.getItem("electrical-session-user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      if (u.id === userId) {
        if (username) u.username = updatedUsername;
        if (name) u.name = name;
        if (role) u.role = role;
        localStorage.setItem("shelter-session-user", JSON.stringify(u));
        localStorage.setItem("electrical-session-user", JSON.stringify(u));
      }
    }
    return { success: true, username: updatedUsername };
  }
};

export const updatePortalUserRole = async (userId: string, role: string): Promise<{ success: boolean }> => {
  return await updateUserCredentials(userId, undefined, undefined, role);
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
    let city = "Nashville";
    if (parts.length >= 2) {
      const cityPart = parts[parts.length - 2].trim();
      city = cityPart || "Nashville";
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
    month: month,
    leads: data.count,
    revenue: data.value
  }));

  const totalPipelineValue = leads
    .filter(l => ["new", "contacted", "consultation_scheduled", "proposal_sent"].includes(l.status))
    .reduce((acc, curr) => acc + curr.estimatedValue, 0);

  const monthlyRevenue = timelineChart.reduce((acc, curr) => acc + curr.revenue, 0);

  return {
    totalValue,
    totalPipelineValue,
    monthlyRevenue,
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
  companyName: string;
  tagline: string;
  alertEmail: string;
  officePhone: string;
  officePhoneRaw: string;
  officeAddress: string;
  serviceRadius: string;
  licenseNotice: string;
  weekdays: string;
  saturdays: string;
  sundays: string;
  shortBadge: string;
  smsTemplate: string;
  emailAlert: boolean;
  smsAlert: boolean;
  maintenanceMode: boolean;
  maintenanceTitle: string;
  maintenanceMessage: string;
}

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const data = await apiCall<SiteSettings>("/api/settings?t=" + Date.now(), "GET");
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("site_settings_cache", JSON.stringify(data));
      } catch { }
    }
    return data;
  } catch (err) {
    console.warn("MongoDB offline, falling back to local storage settings:", err);
    return {
      companyName: getStorageItem("shelter_settings_companyName", "Southern Storm Shelters LLC"),
      tagline: getStorageItem("shelter_settings_tagline", "Tennessee’s Premier Engineered Underground Storm Shelters & Safe Rooms"),
      alertEmail: getStorageItem("shelter_settings_alertEmail", "info@southernstormshelters.com"),
      officePhone: getStorageItem("shelter_settings_officePhone", "(615) 991-2361"),
      officePhoneRaw: getStorageItem("shelter_settings_officePhoneRaw", "+16159912361"),
      officeAddress: getStorageItem("shelter_settings_officeAddress", "Nashville, TN"),
      serviceRadius: getStorageItem("shelter_settings_serviceRadius", "Nashville, TN & 100-Mile Radius"),
      licenseNotice: getStorageItem("shelter_settings_licenseNotice", "Fully Insured Professional Installation Crews • Engineered Storm Protection"),
      weekdays: getStorageItem("shelter_settings_weekdays", "Monday–Friday: 8:00 AM – 5:00 PM"),
      saturdays: getStorageItem("shelter_settings_saturdays", "Saturday: By Appointment"),
      sundays: getStorageItem("shelter_settings_sundays", "Sunday: Closed"),
      shortBadge: getStorageItem("shelter_settings_shortBadge", "Mon–Sat: 8:00 AM – 5:00 PM"),
      smsTemplate: getStorageItem("shelter_settings_smsTemplate", "Hi {Name}, thank you for contacting Southern Storm Shelters LLC! A storm shelter specialist will contact you to discuss your {Type} installation."),
      emailAlert: String(getStorageItem("shelter_settings_emailAlert", "true")) === "true",
      smsAlert: String(getStorageItem("shelter_settings_smsAlert", "true")) === "true",
      maintenanceMode: String(getStorageItem("shelter_settings_maintenanceMode", "false")) === "true",
      maintenanceTitle: getStorageItem("shelter_settings_maintenanceTitle", "Scheduled System Maintenance Underway"),
      maintenanceMessage: getStorageItem("shelter_settings_maintenanceMessage", "We are currently performing scheduled maintenance to upgrade our shelter estimating and dispatch systems. Emergency shelter installations and property evaluations remain fully operational.")
    };
  }
};

export const saveSiteSettings = async (settings: Partial<SiteSettings>): Promise<SiteSettings> => {
  try {
    const saved = await apiCall<SiteSettings>("/api/settings", "POST", settings);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("site_settings_cache", JSON.stringify(saved));
      } catch { }
    }
    return saved;
  } catch (err) {
    console.warn("MongoDB offline, saving to local storage settings:", err);
    Object.entries(settings).forEach(([key, val]) => {
      setStorageItem("shelter_settings_" + key, String(val));
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

export interface DatabaseHealthInfo {
  status: "connected" | "error";
  dbName: string;
  collections: Record<string, number>;
  pingMs: number;
}

export const checkDatabaseHealth = async (): Promise<DatabaseHealthInfo> => {
  try {
    return await apiCall<DatabaseHealthInfo>("/api/health?t=" + Date.now(), "GET");
  } catch (err: any) {
    return {
      status: "error",
      dbName: "disconnected",
      collections: {},
      pingMs: 0
    };
  }
};


