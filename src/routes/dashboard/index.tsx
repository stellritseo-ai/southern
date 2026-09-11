import { useState, useEffect, useMemo, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { io } from "socket.io-client";
import {
  TrendingUp,
  Briefcase,
  Users,
  DollarSign,
  MapPin,
  Star,
  CheckCircle,
  AlertTriangle,
  Clock,
  Trash2,
  Edit2,
  Plus,
  Phone,
  Mail,
  Home,
  FileText,
  Settings,
  LogOut,
  MessageSquare,
  Calendar,
  ChevronRight,
  Filter,
  Search,
  MessageCircle,
  User,
  ThumbsUp,
  Sliders,
  Bell,
  ArrowUpRight,
  ShieldAlert,
  Info,
  Image as ImageIcon,
  Eye,
  X,
  Send,
  Upload,
  ChevronDown,
  Globe,
  Layers,
  Play,
  CheckSquare,
  Check
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";
import {
  getLeads,
  getReviews,
  getWebEmails,
  getChatSessions,
  getGalleryPhotos,
  getPortalUsers,
  getAnalyticsData,
  updateLeadStatus,
  updateLeadDetails,
  deleteLead,
  addCustomLead,
  uploadLeadPhoto,
  removeLeadPhoto,
  toggleReviewFeatured,
  replyToReview,
  addReview,
  deleteReview,
  sendChatMessage,
  markChatAsRead,
  deleteChatSession,
  deleteWebEmail,
  uploadGalleryPhoto,
  removeGalleryPhoto,
  updateUserCredentials,
  createPortalUser,
  deletePortalUser,
  verifyAdminToken,
  getSiteSettings,
  saveSiteSettings,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  clearAllNotifications,
  Lead,
  Review,
  WebEmail,
  ChatSession,
  GalleryPhoto,
  PortalUser,
  DashboardNotification
} from "@/lib/leads-store";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const formatChatTime = (timestamp: string) => {
  if (!timestamp) return "";
  try {
    const d = new Date(timestamp);
    if (!isNaN(d.getTime())) {
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return timestamp;
  } catch {
    return timestamp;
  }
};

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Admin Portal Dashboard | Southern Storm Shelters LLC" },
      { name: "description", content: "Business operations management portal." },
      { name: "robots", content: "noindex, nofollow" }
    ],
  }),
  component: DashboardPage,
});

// Custom Tooltip styled exactly like the Connexio mockup
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-lg animate-in fade-in duration-100 text-xs">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: p.stroke || p.fill || "#D69873" }} />
            {p.name}: <span className="font-bold text-slate-900">{typeof p.value === "number" ? `$${p.value.toLocaleString()}` : p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function DashboardPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "reviews" | "settings" | "chat" | "gallery" | "emails" | "security">("overview");

  // Database / state stores
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [webEmails, setWebEmails] = useState<WebEmail[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<DashboardNotification[]>([]);
  const [showNotificationsPopover, setShowNotificationsPopover] = useState(false);
  const [adminReplyText, setAdminReplyText] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // Gallery Upload Workflow States
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState<string>("residential");
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [selectedGalleryIds, setSelectedGalleryIds] = useState<Set<string>>(new Set());
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);

  // Portal Security States
  const [portalUsers, setPortalUsers] = useState<PortalUser[]>([]);
  const [updateUsername, setUpdateUsername] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addRole, setAddRole] = useState<"admin" | "editor" | "viewer">("viewer");

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Modals & Forms
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditingLead, setIsEditingLead] = useState(false);
  const [editEstimatedValue, setEditEstimatedValue] = useState(0);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState<Lead["status"]>("new");

  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadAddress, setNewLeadAddress] = useState("");
  const [newLeadType, setNewLeadType] = useState("residential");
  const [newLeadDesc, setNewLeadDesc] = useState("");
  const [newLeadVal, setNewLeadVal] = useState(2500);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviewReplyText, setReviewReplyText] = useState("");

  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewLocation, setNewReviewLocation] = useState("");
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewPhoto, setNewReviewPhoto] = useState("");

  const [selectedEmail, setSelectedEmail] = useState<WebEmail | null>(null);
  const [isViewingEmail, setIsViewingEmail] = useState(false);

  // Portal & Site Config States
  const [alertEmail, setAlertEmail] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("electrical_settings_alertEmail") : null) || "admin@nashvillesiteworks.com");
  const [officePhone, setOfficePhone] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("electrical_settings_officePhone") : null) || "615-991-2361");
  const [smsTemplate, setSmsTemplate] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("electrical_settings_smsTemplate") : null) || "Hi {Name}, thank you for contacting Southern Storm Shelters LLC! A storm shelter specialist will contact you to discuss your {Type} project.");
  const [emailAlert, setEmailAlert] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("electrical_settings_emailAlert") !== "false" : true));
  const [smsAlert, setSmsAlert] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("electrical_settings_smsAlert") !== "false" : true));
  const [maintenanceMode, setMaintenanceMode] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("electrical_settings_maintenanceMode") === "true" : false));
  const [weekdays, setWeekdays] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("electrical_settings_weekdays") : null) || "Open 24/7 (Emergency Dispatch Available)");
  const [saturdays, setSaturdays] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("electrical_settings_saturdays") : null) || "Open 24/7 (Emergency Dispatch Available)");
  const [sundays, setSundays] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("electrical_settings_sundays") : null) || "Open 24/7 (Emergency Dispatch Available)");

  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    message: string;
    confirmText?: string;
    onConfirm: () => void;
  } | null>(null);

  const triggerConfirm = (config: {
    title: string;
    message: string;
    confirmText?: string;
    onConfirm: () => void;
  }) => {
    setConfirmConfig(config);
  };

  // Check auth
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("electrical-session-token");
      if (!token) {
        setIsAuthenticated(false);
        navigate({ to: "/dashboard/login" });
        return;
      }
      try {
        const res = await verifyAdminToken(token);
        if (res.valid) {
          setIsAuthenticated(true);
          const activeUser = {
            id: res.id || "",
            username: res.username || "",
            role: res.role || "admin"
          };
          setCurrentUser(activeUser);
          setUpdateUsername(activeUser.username);
        } else {
          localStorage.removeItem("electrical-session-token");
          setIsAuthenticated(false);
          navigate({ to: "/dashboard/login" });
        }
      } catch (e) {
        console.error("Token verification failed:", e);
        setIsAuthenticated(false);
        navigate({ to: "/dashboard/login" });
      }
    };
    checkAuth();
  }, [navigate]);

   // Load active tab data
  useEffect(() => {
    if (isAuthenticated) {
      getLeads().then(setLeads);
      getReviews().then(setReviews);
      getWebEmails().then(setWebEmails);
      getChatSessions().then(setChatSessions);
      getGalleryPhotos().then(setGalleryPhotos);
      getNotifications().then(setNotifications);
      getSiteSettings().then(settings => {
        if (settings) {
          setAlertEmail(settings.alertEmail || "");
          setOfficePhone(settings.officePhone || "");
          setSmsTemplate(settings.smsTemplate || "");
          setEmailAlert(settings.emailAlert);
          setSmsAlert(settings.smsAlert);
          setMaintenanceMode(settings.maintenanceMode);
          setWeekdays(settings.weekdays || "");
          setSaturdays(settings.saturdays || "");
          setSundays(settings.sundays || "");
        }
      });
      if (currentUser?.role === "admin") {
        getPortalUsers().then(setPortalUsers);
      }
    }
  }, [isAuthenticated, activeTab, currentUser]);

  const socketRef = useRef<any>(null);

  // Connect socket.io client when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = io({
      transports: ["websocket", "polling"],
      autoConnect: true
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("⚡ [Socket.io] Admin connected to server");
      if (activeSessionId) {
        socket.emit("join-session", activeSessionId);
      }
    });

    socket.on("session-created", (data: { sessionId: string; clientName: string }) => {
      getChatSessions().then(setChatSessions);
      getNotifications().then(setNotifications);
      toast.info(`New chat session started by ${data.clientName}`);
    });

    socket.on("new-chat-message", (msg: { sessionId: string; id: string; sender: "client" | "admin"; text: string; timestamp: string }) => {
      setChatSessions((prev) => {
        const updated = prev.map((session) => {
          if (session.id === msg.sessionId) {
            const exists = session.messages.some((m) => m.id === msg.id);
            const messages = exists ? session.messages : [...session.messages, {
              id: msg.id,
              sender: msg.sender,
              text: msg.text,
              timestamp: msg.timestamp
            }];

            return {
              ...session,
              messages,
              lastMessage: msg.text,
              lastMessageTime: msg.timestamp,
              unread: msg.sessionId === activeSessionId ? false : (msg.sender === "client" ? true : session.unread)
            };
          }
          return session;
        });
        return [...updated].sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
      });

      if (msg.sender === "client" && (msg.sessionId !== activeSessionId || activeTab !== "chat")) {
        toast.message("New Client Message", {
          description: `"${msg.text}"`,
        });
      }
    });

    socket.on("new-notification", (notification: DashboardNotification) => {
      setNotifications((prev) => {
        if (prev.some((n) => n.id === notification.id)) return prev;
        return [notification, ...prev];
      });

      // Show toast alert based on notification type
      if (notification.type === "form_submission") {
        toast.message(notification.title, {
          description: notification.message,
          action: {
            label: "View Email",
            onClick: () => {
              setActiveTab("emails");
            }
          }
        });
      } else if (notification.type === "chat_start") {
        toast.info(notification.title, {
          description: notification.message,
          action: {
            label: "Open Chat",
            onClick: () => {
              setActiveTab("chat");
            }
          }
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, activeSessionId, activeTab]);

  // Real-time chat polling fallback for dashboard admin (slower fallback for production/serverless)
  useEffect(() => {
    if (!isAuthenticated || activeTab !== "chat") return;

    const interval = setInterval(() => {
      getChatSessions().then((sessions) => {
        if (Array.isArray(sessions)) {
          setChatSessions(sessions);
        }
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [isAuthenticated, activeTab]);

  // Fallback notifications polling for production/serverless
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      getNotifications().then((notifs) => {
        if (Array.isArray(notifs)) {
          setNotifications(notifs);
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const activeChatSession = useMemo(() => {
    return chatSessions.find((s) => s.id === activeSessionId) || null;
  }, [chatSessions, activeSessionId]);

  // Auto scroll chat
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatSession?.messages]);

  // Calculate analytics
  const analytics = useMemo(() => {
    return getAnalyticsData(leads, reviews);
  }, [leads, reviews]);

  const serviceSplit = useMemo(() => {
    const total = leads.length;
    const underground = leads.filter((l) => l.projectType === "underground" || l.projectType === "vault").length;
    const residential = leads.filter((l) => l.projectType === "residential").length;
    const commercial = leads.filter((l) => l.projectType === "commercial").length;
    const installation = leads.filter((l) => l.projectType === "installation" || l.projectType === "upgrades").length;

    const underPct = total > 0 ? Math.round((underground / total) * 100) : 45;
    const resPct = total > 0 ? Math.round((residential / total) * 100) : 35;
    const commPct = total > 0 ? Math.round((commercial / total) * 100) : 10;
    const instPct = total > 0 ? Math.round((installation / total) * 100) : 10;

    return [
      { label: "Underground Vault", val: `${underPct}%`, pct: underPct, color: "bg-[#dc2626]" },
      { label: "Residential Shelter", val: `${resPct}%`, pct: resPct, color: "bg-[#dc2626]/80" },
      { label: "Commercial Safe Room", val: `${commPct}%`, pct: commPct, color: "bg-[#dc2626]/60" },
      { label: "Crane Installation", val: `${instPct}%`, pct: instPct, color: "bg-[#dc2626]/40" }
    ];
  }, [leads]);

  const handleLogout = () => {
    localStorage.removeItem("electrical-session-token");
    setIsAuthenticated(false);
    navigate({ to: "/dashboard/login" });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      const res = await updateUserCredentials(currentUser.id, updateUsername, updatePassword);
      if (res.success) {
        toast.success("Credentials updated successfully!");
        setCurrentUser((prev) => prev ? { ...prev, username: res.username } : null);
        setUpdatePassword("");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveSiteSettings({
        alertEmail,
        officePhone,
        smsTemplate,
        emailAlert,
        smsAlert,
        maintenanceMode,
        weekdays,
        saturdays,
        sundays
      });
      toast.success("Configurations saved successfully!");
    } catch {
      toast.error("Failed to save configurations.");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addUsername.trim() || !addPassword.trim()) {
      toast.error("Username and password are required.");
      return;
    }
    try {
      const res = await createPortalUser(addUsername, addPassword, addRole);
      if (res.success) {
        toast.success(`User '${res.username}' added.`);
        setAddUsername("");
        setAddPassword("");
        setAddRole("viewer");
        getPortalUsers().then(setPortalUsers);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create portal user.");
    }
  };

  const handleDeleteUser = (userId: string, username: string) => {
    if (username === "admin") {
      toast.error("The primary administrator account 'admin' cannot be deleted.");
      return;
    }
    if (currentUser && userId === currentUser.id) {
      toast.error("You cannot delete the account you are currently logged in with.");
      return;
    }
    triggerConfirm({
      title: "Delete Account",
      message: `Are you sure you want to delete user '${username}'?`,
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          const res = await deletePortalUser(userId);
          if (res.success) {
            toast.success("Portal account deleted.");
            getPortalUsers().then(setPortalUsers);
          }
        } catch (err: any) {
          toast.error("Failed to delete user.");
        }
      }
    });
  };

  // Lead Handlers
  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditEstimatedValue(lead.estimatedValue);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setIsEditingLead(true);
  };

  const handleSaveLeadDetails = async () => {
    if (!selectedLead) return;
    try {
      const updated = await updateLeadDetails(selectedLead.id, {
        estimatedValue: editEstimatedValue,
        status: editStatus,
        notes: editNotes
      });
      if (updated) {
        setLeads(updated);
        toast.success("Lead details updated.");
        setIsEditingLead(false);
        setSelectedLead(null);
      }
    } catch {
      toast.error("Failed to update lead details.");
    }
  };

  const handleDeleteLead = (id: string, name: string) => {
    triggerConfirm({
      title: "Delete Lead",
      message: `Are you sure you want to delete the lead for ${name}?`,
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          const updated = await deleteLead(id);
          setLeads(updated);
          toast.success("Lead deleted successfully.");
          setIsEditingLead(false);
          setSelectedLead(null);
        } catch {
          toast.error("Failed to delete lead.");
        }
      }
    });
  };

  const handleAddCustomLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;
    try {
      await addCustomLead({
        name: newLeadName,
        email: newLeadEmail,
        phone: newLeadPhone,
        address: newLeadAddress,
        projectType: newLeadType,
        description: newLeadDesc,
        status: "new",
        estimatedValue: newLeadVal,
        contactTime: "anytime"
      });
      toast.success("Lead created successfully.");
      setIsAddingLead(false);
      setNewLeadName("");
      setNewLeadEmail("");
      setNewLeadPhone("");
      setNewLeadAddress("");
      setNewLeadDesc("");
      setNewLeadVal(2500);
      getLeads().then(setLeads);
    } catch {
      toast.error("Failed to create lead.");
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>, leadId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      try {
        const updated = await uploadLeadPhoto(leadId, base64);
        setLeads(updated);
        const current = updated.find(l => l.id === leadId);
        if (current) setSelectedLead(current);
        toast.success("Photo added successfully.");
      } catch {
        toast.error("Failed to upload photo.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = async (leadId: string, index: number) => {
    try {
      const updated = await removeLeadPhoto(leadId, index);
      setLeads(updated);
      const current = updated.find(l => l.id === leadId);
      if (current) setSelectedLead(current);
      toast.success("Photo removed.");
    } catch {
      toast.error("Failed to remove photo.");
    }
  };

  // Review Handlers
  const handleToggleReviewFeatured = async (id: string) => {
    try {
      const updated = await toggleReviewFeatured(id);
      setReviews(updated);
      toast.success("Review visibility toggled.");
    } catch {
      toast.error("Failed to toggle review.");
    }
  };

  const handleDeleteReview = (id: string, title: string) => {
    triggerConfirm({
      title: "Delete Review",
      message: `Are you sure you want to delete the review "${title}"? This will also remove it from the public website.`,
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          const updated = await deleteReview(id);
          setReviews(updated);
          toast.success("Review deleted.");
        } catch {
          toast.error("Failed to delete review.");
        }
      }
    });
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    try {
      await addReview({
        author: newReviewAuthor,
        location: newReviewLocation,
        title: newReviewTitle,
        text: newReviewText,
        rating: newReviewRating,
        newReviewPhoto: newReviewPhoto || undefined,
      });
      toast.success("Review added successfully!");
      setIsAddingReview(false);
      setNewReviewAuthor("");
      setNewReviewLocation("");
      setNewReviewTitle("");
      setNewReviewText("");
      setNewReviewRating(5);
      setNewReviewPhoto("");
      getReviews().then(setReviews);
    } catch {
      toast.error("Failed to add review.");
    }
  };

  const handleSaveReviewReply = async () => {
    if (!selectedReview) return;
    try {
      const updated = await replyToReview(selectedReview.id, reviewReplyText);
      setReviews(updated);
      toast.success("Admin reply saved.");
      setSelectedReview(null);
      setReviewReplyText("");
    } catch {
      toast.error("Failed to save reply.");
    }
  };

  // Email Handlers
  const handleDeleteEmail = (id: string) => {
    triggerConfirm({
      title: "Delete Email Message",
      message: "Are you sure you want to delete this contact submission?",
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          const updated = await deleteWebEmail(id);
          setWebEmails(updated);
          toast.success("Inquiry deleted.");
        } catch {
          toast.error("Failed to delete inquiry.");
        }
      }
    });
  };

  // Chat Handlers
  const handleSelectChat = async (id: string) => {
    setActiveSessionId(id);
    const updated = await markChatAsRead(id);
    setChatSessions(updated);
    if (socketRef.current) {
      socketRef.current.emit("join-session", id);
    }
  };

  const handleSendChatReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSessionId || !adminReplyText.trim()) return;
    try {
      const updated = await sendChatMessage(activeSessionId, "admin", adminReplyText);
      if (updated) {
        setChatSessions(prev => [...prev.map(s => s.id === activeSessionId ? updated : s)].sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()));
        setAdminReplyText("");
        
        const lastMsg = updated.messages[updated.messages.length - 1];
        if (socketRef.current) {
          socketRef.current.emit("send-message", {
            ...lastMsg,
            sessionId: activeSessionId
          });
        }
      }
    } catch {
      toast.error("Failed to send reply.");
    }
  };

  const handleDeleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerConfirm({
      title: "Delete Chat Session?",
      message: "Are you sure you want to delete this chat session? This action is permanent and cannot be undone.",
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          const updated = await deleteChatSession(id);
          setChatSessions(updated);
          if (activeSessionId === id) {
            setActiveSessionId(null);
          }
          toast.success("Chat deleted successfully!");
        } catch {
          toast.error("Failed to delete chat.");
        }
      }
    });
  };

  // Gallery Handlers
  const handleUploadGallery = async () => {
    if (selectedGalleryFiles.length === 0) {
      toast.error("Please select one or more files first.");
      return;
    }

    setIsUploadingGallery(true);
    setGalleryUploadProgress(0);

    const filesCount = selectedGalleryFiles.length;
    let currentPhotosList = [...galleryPhotos];

    try {
      for (let i = 0; i < filesCount; i++) {
        const file = selectedGalleryFiles[i];

        // Track segment progress for this file
        const segmentStart = (i / filesCount) * 100;
        const segmentEnd = ((i + 1) / filesCount) * 100;
        setGalleryUploadProgress(Math.floor(segmentStart));

        // Upload File directly
        const updated = await uploadGalleryPhoto(file, uploadCategory);
        currentPhotosList = updated;

        setGalleryUploadProgress(Math.floor(segmentEnd));
      }

      setGalleryPhotos(currentPhotosList);
      setIsUploadingGallery(false);
      setGalleryUploadProgress(0);
      setSelectedGalleryFiles([]);
      toast.success(`Successfully uploaded ${filesCount} photos.`);
    } catch (err) {
      setIsUploadingGallery(false);
      setGalleryUploadProgress(0);
      toast.error("Failed to upload all photos. Please try again.");
    }
  };

  const handleDeleteGallery = (id: string) => {
    triggerConfirm({
      title: "Delete Gallery Photo",
      message: "Are you sure you want to remove this photo from the gallery page?",
      confirmText: "Remove",
      onConfirm: async () => {
        try {
          const updated = await removeGalleryPhoto(id);
          setGalleryPhotos(updated);
          toast.success("Photo removed.");
        } catch {
          toast.error("Failed to remove photo.");
        }
      }
    });
  };

  const handleBulkDeleteGallery = () => {
    if (selectedGalleryIds.size === 0) return;
    triggerConfirm({
      title: `Delete ${selectedGalleryIds.size} Photo${selectedGalleryIds.size > 1 ? "s" : ""}`,
      message: `Are you sure you want to permanently delete ${selectedGalleryIds.size} selected photo${selectedGalleryIds.size > 1 ? "s" : ""}? This cannot be undone.`,
      confirmText: "Delete All",
      onConfirm: async () => {
        try {
          const ids = Array.from(selectedGalleryIds);
          let updatedPhotos = galleryPhotos;
          for (const id of ids) {
            updatedPhotos = await removeGalleryPhoto(id);
          }
          setGalleryPhotos(updatedPhotos);
          setSelectedGalleryIds(new Set());
          setIsBulkDeleteMode(false);
          toast.success(`${ids.length} photo${ids.length > 1 ? "s" : ""} deleted successfully.`);
        } catch {
          toast.error("Failed to delete some photos. Please try again.");
        }
      }
    });
  };

  // Filtering leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm);
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesType = typeFilter === "all" || lead.projectType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [leads, searchTerm, statusFilter, typeFilter]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] text-slate-800 font-inter">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-copper border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-inter text-[#1a1f36] antialiased selection:bg-copper selection:text-white">

      {/* Left Sidebar Navigation */}
      <aside className="w-64 sm:w-72 bg-white border-r border-[#e3e6f0] flex flex-col justify-between p-5 sticky top-0 h-screen z-40">
        <div className="space-y-6 overflow-y-auto pr-1 scrollbar-none">

          {/* Header branding */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Southern Storm Shelters LLC" className="h-10 w-auto object-contain" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-black uppercase tracking-tight text-slate-900 leading-tight">Southern</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#dc2626] leading-tight">Storm Shelters</span>
              </div>
            </div>
          </div>

          {/* Main Menu Links */}
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-1.5">Main Menu</p>
            {[
              { id: "overview", label: "Overview & Stats", icon: TrendingUp },
              { id: "leads", label: "Leads Manager", icon: Briefcase },
              { id: "reviews", label: "Reviews Moderator", icon: Star },
              { id: "gallery", label: "Update Gallery", icon: ImageIcon },
              { id: "chat", label: "Live Chat", icon: MessageCircle, badge: chatSessions.some(s => s.unread) },
              { id: "emails", label: "Web Emails", icon: Mail },
              { id: "settings", label: "Portal Settings", icon: Settings },
              { id: "security", label: "Security Settings", icon: Sliders }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 flex items-center justify-between relative group ${isActive
                    ? "bg-[#faf7f5] text-[#1a1f36]"
                    : "text-slate-500 hover:bg-[#faf7f5]/45 hover:text-slate-800"
                    }`}
                >
                  <span className="flex items-center gap-3 relative z-10">
                    <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-copper" : "text-slate-400 group-hover:text-copper"}`} />
                    {tab.label}
                  </span>
                  {tab.badge && (
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0 animate-pulse relative z-10" />
                  )}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-copper rounded-r-md" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sync status card */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-copper">
              <Info className="w-4 h-4 shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-wider">Sync Active</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Real-time synchronization active with South Florida permit indices.
            </p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                <span>Synchronized Leads</span>
                <span>15/30 Limit</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-copper rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>
            <button className="w-full bg-[#1a1f36] hover:bg-[#1a1f36]/90 text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition">
              Upgrade Subscription
            </button>
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition flex items-center gap-3 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Column */}
      <div className="flex-1 min-h-screen overflow-y-auto flex flex-col">

        {/* Top Header Bar */}
        <header className="bg-white border-b border-[#e3e6f0] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-bold text-xl text-slate-800 leading-none capitalize">
              {activeTab === "overview" ? "Dashboard" : activeTab.replace("-", " ")}
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">
              {activeTab === "overview" && "Monitor and control your business leads and pipeline"}
              {activeTab === "leads" && "Manage customer pipelines and project estimations"}
              {activeTab === "reviews" && "Review client testimonials and manage website display"}
              {activeTab === "emails" && "View details of incoming contact form submissions"}
              {activeTab === "chat" && "Respond to active website visitor chat messages"}
              {activeTab === "gallery" && "Manage images showcased on the public website"}
              {activeTab === "settings" && "Modify administrator login credentials"}
              {activeTab === "security" && "Create and manage system user accounts"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search Anything"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper w-48 transition"
              />
            </div>

            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <MessageSquare className="w-4 h-4" />
              {chatSessions.some(s => s.unread) && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowNotificationsPopover(!showNotificationsPopover)}
                className="p-2 text-slate-400 hover:text-slate-600 relative rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                )}
              </button>

              {/* Notification Popover */}
              {showNotificationsPopover && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotificationsPopover(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#e3e6f0] rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Popover Header */}
                    <div className="px-4 py-3 bg-[#faf7f5] border-b border-[#e3e6f0] flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Notifications ({notifications.filter(n => !n.read).length})
                      </span>
                      <div className="flex gap-2">
                        {notifications.length > 0 && (
                          <>
                            <button
                              onClick={async () => {
                                const updated = await markAllNotificationsRead();
                                setNotifications(updated);
                              }}
                              className="text-[10px] text-copper hover:underline font-bold cursor-pointer"
                            >
                              Mark all read
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              onClick={async () => {
                                const updated = await clearAllNotifications();
                                setNotifications(updated);
                              }}
                              className="text-[10px] text-slate-400 hover:text-rose-500 font-bold transition cursor-pointer"
                            >
                              Clear all
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Popover Content */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-slate-400 text-xs font-medium">
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.map((n) => {
                          const isChat = n.type === "chat_start";
                          const Icon = isChat ? MessageCircle : Mail;
                          return (
                            <div
                              key={n.id}
                              className={`p-4 flex gap-3 transition-colors duration-150 hover:bg-slate-50 relative group ${!n.read ? "bg-amber-50/20" : ""}`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isChat ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-[#faf7f5] text-copper border border-[#faf7f5]"}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0 text-left">
                                <div className="flex items-start justify-between gap-1">
                                  <p className={`text-xs font-bold ${!n.read ? "text-slate-800" : "text-slate-600"}`}>
                                    {n.title}
                                  </p>
                                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider shrink-0 mt-0.5">
                                    {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-1 leading-normal font-medium truncate">
                                  {n.message}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                  <button
                                    onClick={() => {
                                      setShowNotificationsPopover(false);
                                      setActiveTab(isChat ? "chat" : "emails");
                                    }}
                                    className="text-[10px] text-copper hover:underline font-bold cursor-pointer"
                                  >
                                    View details
                                  </button>
                                  {!n.read && (
                                    <button
                                      onClick={async () => {
                                        const updated = await markNotificationRead(n.id);
                                        setNotifications(updated);
                                      }}
                                      className="text-[10px] text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                                    >
                                      Mark read
                                    </button>
                                  )}
                                </div>
                              </div>
                              {!n.read && (
                                <span className="absolute right-3 bottom-3 w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Workspace Area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-200">

              {/* Overview Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                {/* Card 1: Total Leads */}
                <div className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-all duration-200 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Total Leads
                    </span>
                    <div className="w-8 h-8 rounded-full bg-copper/5 border border-copper/10 text-copper flex items-center justify-center shadow-sm">
                      <Briefcase className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-3xl font-black text-slate-800 tracking-tight">{leads.length}</div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold flex items-center gap-0.5">
                        <ArrowUpRight className="w-2.5 h-2.5" /> +12%
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">from last month</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Active Projects */}
                <div className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-all duration-200 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Active Projects
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                      <Home className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-3xl font-black text-slate-800 tracking-tight">
                      {leads.filter(l => ["contacted", "consultation_scheduled", "proposal_sent"].includes(l.status)).length}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="bg-blue-50 text-blue-600 border border-blue-100 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold">
                        94.5%
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">On Schedule</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Contract Value */}
                <div className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-all duration-200 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Contract Value
                    </span>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-3xl font-black text-slate-800 tracking-tight">
                      ${(analytics.totalValue / 1000).toFixed(0)}k
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold">
                        78%
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">of quarterly goal</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Pending Reviews */}
                <div className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-all duration-200 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Pending Reviews
                    </span>
                    <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center shadow-sm">
                      <Star className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-3xl font-black text-slate-800 tracking-tight">
                      {reviews.filter(r => !r.featured).length}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="bg-rose-50 text-rose-600 border border-rose-100 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold flex items-center gap-0.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> {reviews.filter(r => !r.featured).length > 0 ? `${reviews.filter(r => !r.featured).length} Alert` : "No Alert"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">requiring attention</span>
                    </div>
                  </div>
                </div>

                {/* Card 5: Website Visitors */}
                <div className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-all duration-200 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Website Visitors
                    </span>
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-3xl font-black text-slate-800 tracking-tight">8,429</div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold flex items-center gap-0.5">
                        <ArrowUpRight className="w-2.5 h-2.5" /> +18.4%
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">vs last week</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Charts grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">

                {/* Chart 1: Lead Acquisition Analytics */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Lead Acquisition Analytics</h3>
                    <div className="flex gap-2">
                      <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold px-2 py-1 focus:outline-none">
                        <option>Last 1 Year</option>
                        <option>Last 6 Months</option>
                      </select>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.timelineChart}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#a0aec0" fontSize={10} tickLine={false} />
                        <YAxis stroke="#a0aec0" fontSize={10} tickLine={false} />
                        <RechartsTooltip content={<CustomChartTooltip />} />
                        <Bar dataKey="revenue" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Lead volume">
                          {analytics.timelineChart.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 5 ? "#FF6B00" : "#e2e8f0"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Project Progress Timeline */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Project Progress Timeline</h3>
                    <div className="flex gap-2">
                      <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold px-2 py-1 focus:outline-none">
                        <option>Last 24 Hours</option>
                      </select>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { name: "04.00", value: 21 },
                        { name: "08.00", value: 23 },
                        { name: "12.00", value: 20 },
                        { name: "16.00", value: 26 },
                        { name: "20.00", value: 24 },
                        { name: "23.00", value: 28 }
                      ]}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#a0aec0" fontSize={10} tickLine={false} />
                        <YAxis stroke="#a0aec0" fontSize={10} tickLine={false} />
                        <RechartsTooltip content={<CustomChartTooltip />} />
                        <Area type="monotone" dataKey="value" stroke="#FF6B00" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" name="Progress rate (%)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 3: Revenue vs Cost Breakdown */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Revenue vs Cost Breakdown</h3>
                    <div className="flex gap-2">
                      <select className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold px-2 py-1 focus:outline-none">
                        <option>Last 24 Hours</option>
                      </select>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { name: "12.00", revenue: 5000, cost: 3500 },
                        { name: "16.00", revenue: 7500, cost: 4200 },
                        { name: "20.00", revenue: 6500, cost: 3800 },
                        { name: "23.00", revenue: 9000, cost: 4800 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#a0aec0" fontSize={10} tickLine={false} />
                        <YAxis stroke="#a0aec0" fontSize={10} tickLine={false} />
                        <RechartsTooltip content={<CustomChartTooltip />} />
                        <Line type="monotone" dataKey="revenue" stroke="#FF6B00" strokeWidth={2} dot={{ r: 4 }} name="Contract Value" />
                        <Line type="monotone" dataKey="cost" stroke="#4f566b" strokeWidth={2} dot={{ r: 4 }} name="Operational Cost" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 4: Service Distribution */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Service Distribution</h3>
                  </div>
                  <div className="h-64 flex flex-col justify-between">
                    <div>
                      <div className="text-2xl font-extrabold text-slate-800 leading-none">100%</div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1.5">Project Split</span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-center mt-2">
                      {serviceSplit.map((bar, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-end gap-2">
                          <div className="h-28 flex items-end justify-center w-full">
                            <div 
                              className={`w-3.5 rounded-t-md ${bar.color} transition-all duration-500`} 
                              style={{ height: `${Math.max(bar.pct, 5)}%` }}
                            />
                          </div>
                          <div className="leading-tight">
                            <span className="text-xs font-black text-slate-800 block">{bar.val}</span>
                            <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-wider truncate max-w-[55px]">{bar.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Section: Renovations & Leads Status */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden text-left">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">Storm Shelter Leads &amp; Installations</h3>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search Leads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 bg-slate-50 focus:bg-white focus:outline-none w-full sm:w-48 transition"
                      />
                    </div>
                    <button
                      onClick={() => setIsAddingLead(true)}
                      className="bg-copper hover:bg-copper-deep text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-copper/10 transition shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Lead
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-black uppercase tracking-wider text-slate-400">
                        <th className="p-4 pl-6">Client Name</th>
                        <th className="p-4">Service Category</th>
                        <th className="p-4">Pipeline Status</th>
                        <th className="p-4">Property Location</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      {filteredLeads.slice(0, 5).map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/30 transition">
                          <td className="p-4 pl-6 font-bold text-slate-800">{lead.name}</td>
                          <td className="p-4 text-slate-500 font-medium capitalize">{lead.projectType.replace("-", " ")}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block ${lead.status === "won" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                              lead.status === "lost" ? "bg-rose-50 text-rose-700 border border-rose-100" :
                                "bg-amber-50 text-amber-700 border border-amber-100"
                              }`}>
                              {lead.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-4 text-slate-650 font-medium">{lead.address?.split(",")?.[0] || "Miami"}</td>
                          <td className="p-4 pr-6 text-right space-x-1.5">
                            <button
                              onClick={() => handleEditLead(lead)}
                              className="p-1.5 bg-slate-50 hover:bg-copper/10 hover:text-copper border border-slate-200 rounded-lg text-slate-500 transition inline-flex items-center"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.name)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-600 transition inline-flex items-center"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LEADS */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-in fade-in duration-200 text-left">
              {/* Table search toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search leads by name, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-copper focus:border-copper focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none w-1/2 sm:w-auto font-semibold"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="consultation_scheduled">Consultation Scheduled</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none w-1/2 sm:w-auto font-semibold"
                  >
                    <option value="all">All Services</option>
                    <option value="panel-upgrades">Panel Upgrades</option>
                    <option value="ev-charger">EV Charger Installation</option>
                    <option value="generator">Standby Generator</option>
                    <option value="commercial">Commercial Services</option>
                    <option value="residential">Residential Services</option>
                    <option value="industrial">Industrial Services</option>
                    <option value="emergency">Emergency Services</option>
                    <option value="wiring-rewiring">Wiring & Rewiring</option>
                    <option value="security-systems">Security Systems</option>
                  </select>
                  <button
                    onClick={() => setIsAddingLead(true)}
                    className="bg-copper hover:bg-copper-deep text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-md shadow-copper/10 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Lead
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-xs font-black uppercase tracking-wider text-slate-400">
                        <th className="p-4 pl-6">Client Name</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">City</th>
                        <th className="p-4">Service</th>
                        <th className="p-4">Estimated Value</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-sm">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/50 transition">
                          <td className="p-4 pl-6 font-bold text-slate-800">{lead.name}</td>
                          <td className="p-4 text-slate-500 font-medium">
                            <div>{lead.phone}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{lead.email}</div>
                          </td>
                          <td className="p-4 text-slate-650 font-medium">
                            {lead.address?.split(",")?.slice(-3, -2)?.[0]?.trim() || "Miami"}
                          </td>
                          <td className="p-4 font-semibold text-slate-850">
                            <span className="capitalize">{lead.projectType.replace("-", " ")}</span>
                          </td>
                          <td className="p-4 font-bold text-slate-900">
                            ${lead.estimatedValue.toLocaleString()}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block border ${lead.status === "won" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                lead.status === "lost" ? "bg-rose-50 text-rose-700 border-rose-100" :
                                  "bg-amber-50 text-amber-700 border-amber-100"
                                }`}
                            >
                              {lead.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => handleEditLead(lead)}
                              className="p-1.5 bg-slate-50 hover:bg-copper/10 hover:text-copper border border-slate-200 rounded-lg text-slate-500 transition inline-flex items-center"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.name)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-600 transition inline-flex items-center"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6 animate-in fade-in duration-200 text-left">
              {/* Toolbar */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 leading-none">Reviews Moderator</h3>
                  <p className="text-xs text-slate-505 font-medium mt-1">{reviews.filter(r => r.featured).length} featured · {reviews.length} total</p>
                </div>
                <button
                  onClick={() => setIsAddingReview(true)}
                  className="bg-copper hover:bg-copper-deep text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1.5 shrink-0 shadow transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Review
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-slate-800 leading-tight">{rev.title}</h4>
                          <p className="text-xs text-slate-450 font-semibold mt-0.5">{rev.author} · {rev.location}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <div className="flex items-center gap-0.5 text-copper">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <button
                            onClick={() => handleDeleteReview(rev.id, rev.title)}
                            className="p-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-600 transition ml-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed font-medium mt-3 italic">
                        "{rev.text}"
                      </p>

                      {rev.replyText && (
                        <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-sm leading-relaxed text-slate-700">
                          <span className="font-black text-xs uppercase tracking-wider text-[#dc2626] block mb-0.5">Southern Storm Shelters Response</span>
                          "{rev.replyText}"
                        </div>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleReviewFeatured(rev.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${rev.featured
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        {rev.featured ? "⭐ Featured on Site" : "Hidden from Site"}
                      </button>

                      <button
                        onClick={() => {
                          setSelectedReview(rev);
                          setReviewReplyText(rev.replyText || "");
                        }}
                        className="px-3 py-1.5 bg-[#1a1f36] hover:bg-[#1a1f36]/90 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EMAILS */}
          {activeTab === "emails" && (
            <div className="space-y-6 animate-in fade-in duration-200 text-left">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-xs font-black uppercase tracking-wider text-slate-400">
                        <th className="p-4 pl-6">Sender Details</th>
                        <th className="p-4">Requested Service</th>
                        <th className="p-4">Message Body</th>
                        <th className="p-4">Sent At</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-sm">
                      {[...webEmails].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((email) => (
                        <tr
                          key={email.id}
                          className="hover:bg-slate-50/70 transition cursor-pointer"
                          onClick={(e) => {
                            if ((e.target as HTMLElement).closest('button')) return;
                            setSelectedEmail(email);
                            setIsViewingEmail(true);
                          }}
                        >
                          <td className="p-4 pl-6">
                            <div className="font-bold text-slate-800">{email.name}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{email.email} · {email.phone}</div>
                          </td>
                          <td className="p-4 font-semibold text-slate-800 truncate max-w-[120px]">
                            {email.service || "General Inquiry"}
                          </td>
                          <td className="p-4 text-slate-600 font-medium leading-relaxed max-w-sm truncate">
                            {email.message}
                          </td>
                          <td className="p-4 text-slate-400 font-medium whitespace-nowrap">
                            {new Date(email.createdAt).toLocaleString()}
                          </td>
                          <td className="p-4 pr-6 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedEmail(email);
                                setIsViewingEmail(true);
                              }}
                              className="p-1.5 bg-slate-50 hover:bg-copper/10 border border-slate-200 rounded-lg text-slate-500 transition inline-flex items-center"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEmail(email.id)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-600 transition inline-flex items-center"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CHAT */}
          {activeTab === "chat" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px] items-stretch animate-in fade-in duration-200 text-left">
              {/* Sidebar */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Active Sessions</h4>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                  {[...chatSessions].sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()).map((session) => (
                    <button
                      key={session.id}
                      onClick={() => handleSelectChat(session.id)}
                      className={`w-full text-left p-4 flex items-center justify-between transition group/chat ${activeSessionId === session.id ? "bg-slate-50 border-l-4 border-copper" : "hover:bg-slate-50/50"
                        }`}
                    >
                      <div className="truncate pr-2">
                        <div className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                          {session.clientName}
                          {session.unread && (
                            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 truncate">{session.lastMessage}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-slate-400 font-medium">
                          {formatChatTime(session.lastMessageTime)}
                        </span>
                        <button
                          onClick={(e) => handleDeleteChat(session.id, e)}
                          className="opacity-0 group-hover/chat:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-opacity duration-200"
                          title="Delete Chat"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat View */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                {activeChatSession ? (
                  <>
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 leading-none">{activeChatSession.clientName}</h4>
                        <p className="text-xs text-slate-400 font-medium leading-none mt-1.5 flex flex-wrap gap-2 items-center">
                          <span className="bg-copper/10 text-copper px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{activeChatSession.clientCity}</span>
                          <span>· Visitor Session</span>
                          {activeChatSession.clientPhone && (
                            <>
                              <span>·</span>
                              <span className="font-semibold text-slate-600">Phone: {activeChatSession.clientPhone}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
                      {activeChatSession.messages && activeChatSession.messages.map((msg) => {
                        const isAdmin = msg.sender === "admin";
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${isAdmin
                                ? "bg-copper text-white rounded-tr-none"
                                : "bg-white text-slate-800 rounded-tl-none border border-slate-200"
                                }`}
                            >
                              <p className="leading-relaxed">{msg.text}</p>
                              <span className={`text-[9px] font-medium block mt-1.5 text-right ${isAdmin ? "text-white/60" : "text-slate-400"
                                }`}>
                                {formatChatTime(msg.timestamp)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSendChatReply} className="p-3 border-t border-slate-100 flex gap-2 bg-white">
                      <input
                        type="text"
                        placeholder="Type admin response message..."
                        value={adminReplyText}
                        onChange={(e) => setAdminReplyText(e.target.value)}
                        className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper"
                      />
                      <button
                        type="submit"
                        disabled={!adminReplyText.trim()}
                        className="bg-copper hover:bg-copper-deep text-white px-4 py-2.5 rounded-xl transition shadow flex items-center justify-center shrink-0 disabled:opacity-50 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs gap-2">
                    <MessageCircle className="w-8 h-8 text-slate-200 animate-pulse" />
                    Select a chat session from the list to respond in real-time.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-6 animate-in fade-in duration-200 text-left">
              {/* Gallery Header */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Photo Gallery Manager</h3>
                  <p className="text-xs text-slate-505 font-medium mt-1">Manage files showing on public Gallery sections by category</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Bulk Select Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsBulkDeleteMode(prev => !prev);
                      setSelectedGalleryIds(new Set());
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border flex items-center gap-1.5 ${isBulkDeleteMode
                      ? "bg-rose-50 border-rose-300 text-rose-700"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"}`}
                  >
                    {isBulkDeleteMode ? <X className="w-3.5 h-3.5" /> : <CheckSquare className="w-3.5 h-3.5" />}
                    {isBulkDeleteMode ? "Cancel Selection" : "Select Multiple"}
                  </button>
                  <span className="text-xs font-semibold text-slate-400">Filter:</span>
                  <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    {["All", "Residential", "Commercial", "Industrial"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setGalleryFilter(cat.toLowerCase())}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${galleryFilter === cat.toLowerCase() || (cat === "All" && galleryFilter === "all")
                          ? "bg-slate-800 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bulk Delete Action Bar */}
              {isBulkDeleteMode && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl px-5 py-3 flex items-center justify-between gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const filtered = galleryPhotos.filter(p =>
                          galleryFilter === "all" || !galleryFilter
                            ? true
                            : p.category?.toLowerCase() === galleryFilter.toLowerCase()
                        );
                        if (selectedGalleryIds.size === filtered.length) {
                          setSelectedGalleryIds(new Set());
                        } else {
                          setSelectedGalleryIds(new Set(filtered.map(p => p.id)));
                        }
                      }}
                      className="px-3 py-1.5 bg-white border border-rose-200 text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-50 transition"
                    >
                      {selectedGalleryIds.size > 0 &&
                        selectedGalleryIds.size === galleryPhotos.filter(p =>
                          galleryFilter === "all" || !galleryFilter ? true : p.category?.toLowerCase() === galleryFilter.toLowerCase()
                        ).length
                        ? "Deselect All"
                        : "Select All"}
                    </button>
                    <span className="text-sm font-semibold text-rose-700">
                      {selectedGalleryIds.size} photo{selectedGalleryIds.size !== 1 ? "s" : ""} selected
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleBulkDeleteGallery}
                    disabled={selectedGalleryIds.size === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-100 disabled:text-slate-400 text-white text-xs font-bold rounded-xl transition shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete {selectedGalleryIds.size > 0 ? `${selectedGalleryIds.size} Selected` : "Selected"}
                  </button>
                </div>
              )}

              {/* Upload Controls Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-copper" /> Upload New Project Media
                </h4>

                {/* 1. Category Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">1. Select Service Category</label>
                  <div className="flex flex-wrap gap-2">
                    {["Residential", "Commercial", "Industrial"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setUploadCategory(cat.toLowerCase())}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${uploadCategory === cat.toLowerCase()
                          ? "bg-copper/5 border-copper text-copper"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Browse & Upload actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">2. Click Browse and choose the images</label>
                    <div className="flex gap-2">
                      <label className="flex-1 bg-slate-50 border border-slate-200 border-dashed hover:border-slate-300 rounded-xl py-3 px-4 flex items-center justify-center gap-2 cursor-pointer transition">
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 truncate">
                          {selectedGalleryFiles.length > 0
                            ? `${selectedGalleryFiles.length} file(s) selected`
                            : "Choose files..."}
                        </span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            if (files.length > 0) {
                              setSelectedGalleryFiles(prev => [...prev, ...files]);
                            }
                          }}
                          className="hidden"
                          disabled={isUploadingGallery}
                        />
                      </label>
                      {selectedGalleryFiles.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedGalleryFiles([])}
                          className="p-3 border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition"
                          disabled={isUploadingGallery}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">3. Upload the images/videos</label>
                    <button
                      type="button"
                      onClick={handleUploadGallery}
                      disabled={selectedGalleryFiles.length === 0 || isUploadingGallery}
                      className="w-full bg-copper hover:bg-copper-deep disabled:bg-slate-100 disabled:text-slate-400 text-white py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow"
                    >
                      <Upload className="w-4 h-4" />
                      {isUploadingGallery
                        ? "Uploading..."
                        : `Upload ${selectedGalleryFiles.length} Item${selectedGalleryFiles.length !== 1 ? "s" : ""} to ${uploadCategory.toUpperCase()}`}
                    </button>
                  </div>
                </div>

                {/* 3. Upload Progress Indicator */}
                {isUploadingGallery && (
                  <div className="pt-2 space-y-1.5 animate-in fade-in duration-200">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                      <span>Uploading media to Cloudinary storage...</span>
                      <span>{galleryUploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                      <div
                        className="bg-copper h-full transition-all duration-150 rounded-full"
                        style={{ width: `${galleryUploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Multiple Thumbnail Preview Grid */}
                {selectedGalleryFiles.length > 0 && !isUploadingGallery && (
                  <div className="pt-2 animate-in fade-in duration-200 space-y-2">
                    <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">Selected Files Preview</label>
                    <div className="flex flex-wrap gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl max-h-[180px] overflow-y-auto">
                      {selectedGalleryFiles.map((file, idx) => {
                        const isVideo = file.type.startsWith("video/") || file.name.endsWith(".mp4") || file.name.endsWith(".mov");
                        return (
                          <div key={idx} className="relative group w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 shadow-sm">
                            {isVideo ? (
                              <div className="w-full h-full bg-slate-900 relative">
                                <video
                                  src={URL.createObjectURL(file)}
                                  className="w-full h-full object-cover opacity-80"
                                  muted
                                  playsInline
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <Play className="w-3.5 h-3.5 text-white fill-white opacity-90" />
                                </div>
                              </div>
                            ) : (
                              <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="w-full h-full object-cover"
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => setSelectedGalleryFiles(prev => prev.filter((_, i) => i !== idx))}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryPhotos
                  .filter((p) => {
                    if (galleryFilter === "all" || !galleryFilter) return true;
                    return p.category?.toLowerCase() === galleryFilter.toLowerCase();
                  })
                  .map((photo) => {
                    const isSelected = selectedGalleryIds.has(photo.id);
                    return (
                      <div
                        key={photo.id}
                        className={`relative group aspect-square rounded-2xl overflow-hidden border-2 shadow bg-white transition-all duration-150 cursor-pointer ${
                          isBulkDeleteMode
                            ? isSelected
                              ? "border-rose-500 ring-2 ring-rose-300"
                              : "border-slate-200 hover:border-rose-300"
                            : "border-slate-200"
                        }`}
                        onClick={() => {
                          if (isBulkDeleteMode) {
                            setSelectedGalleryIds(prev => {
                              const next = new Set(prev);
                              if (next.has(photo.id)) next.delete(photo.id);
                              else next.add(photo.id);
                              return next;
                              });
                          }
                        }}
                      >
                        {photo.url.endsWith(".mp4") || photo.url.endsWith(".mov") || photo.url.includes("/video/upload/") ? (
                          <div
                            className="relative w-full h-full"
                            onClick={(e) => { if (!isBulkDeleteMode) { e.stopPropagation(); setLightboxPhoto(photo.url); } }}
                          >
                            <video src={photo.url} className="w-full h-full object-cover" muted loop playsInline autoPlay />
                            {!isBulkDeleteMode && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition z-10">
                                <div className="p-2 bg-white/90 text-slate-800 rounded-full shadow">
                                  <Play className="w-3 h-3 fill-current" />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <img
                            src={photo.url}
                            alt="Gallery item"
                            className="w-full h-full object-cover"
                            onClick={(e) => { if (!isBulkDeleteMode) { e.stopPropagation(); setLightboxPhoto(photo.url); } }}
                          />
                        )}

                        {/* Category badge */}
                        {photo.category && (
                          <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/15 select-none pointer-events-none z-10">
                            <span className="text-[9px] text-white font-bold uppercase tracking-wider">{photo.category}</span>
                          </div>
                        )}

                        {/* Checkbox overlay in bulk mode */}
                        {isBulkDeleteMode && (
                          <div className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center z-20 transition-all ${
                            isSelected ? "bg-rose-600 border-rose-600" : "bg-white/80 border-slate-300"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                          </div>
                        )}

                        {/* Selected overlay */}
                        {isBulkDeleteMode && isSelected && (
                          <div className="absolute inset-0 bg-rose-600/20 z-10 pointer-events-none" />
                        )}

                        {/* Single delete button */}
                        {!isBulkDeleteMode && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleDeleteGallery(photo.id); }}
                            className="absolute top-2 right-2 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition duration-200 z-20 border border-white/10 opacity-0 group-hover:opacity-100"
                            title="Delete Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none z-10">
                          <span className="text-[10px] text-white/80 font-medium">
                            Uploaded {new Date(photo.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Empty State */}
              {galleryPhotos.filter((p) => {
                if (galleryFilter === "all" || !galleryFilter) return true;
                return p.category?.toLowerCase() === galleryFilter.toLowerCase();
              }).length === 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl py-12 flex flex-col items-center justify-center text-slate-400 gap-3">
                  <ImageIcon className="w-10 h-10 opacity-30" />
                  <p className="text-sm font-semibold">No media in this category</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200 text-left bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Portal & Site Configurations</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">Set contact alerts, office calendar variables, and SMS automation triggers.</p>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-6 pt-4">
                {/* Row 1: Alert Email & Contact Line */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Inquiry Alert Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={alertEmail}
                        onChange={(e) => setAlertEmail(e.target.value)}
                        className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper text-sm font-semibold text-slate-800"
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Primary Office Contact Line</label>
                    <input
                      type="text"
                      required
                      value={officePhone}
                      onChange={(e) => setOfficePhone(e.target.value)}
                      className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper text-sm font-semibold text-slate-800"
                    />
                  </div>
                </div>

                {/* Row 2: Customer Template */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Automated Customer Text/SMS Template</label>
                  <textarea
                    rows={3}
                    required
                    value={smsTemplate}
                    onChange={(e) => setSmsTemplate(e.target.value)}
                    className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper text-sm font-medium text-slate-800 resize-none leading-relaxed"
                  />
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">Variables auto-populated: {'{Name}'}, {'{Time}'}, {'{Type}'}</span>
                </div>

                <hr className="border-slate-100" />

                {/* Row 3: Three alert cards with toggles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Toggle Card 1 */}
                  <div className="bg-[#fdfdfd] border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <div className="font-bold text-slate-800 text-xs">Automated Email Alert</div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">Send receipt copies to dispatcher</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEmailAlert(!emailAlert)}
                      className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none shrink-0 ${emailAlert ? "bg-[#3f5c49]" : "bg-slate-200"
                        }`}
                    >
                      <span
                        className={`w-4.5 h-4.5 bg-white rounded-full absolute top-[3px] transition-all ${emailAlert ? "right-[3px]" : "left-[3px]"
                          }`}
                      />
                    </button>
                  </div>

                  {/* Toggle Card 2 */}
                  <div className="bg-[#fdfdfd] border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <div className="font-bold text-slate-800 text-xs">Immediate SMS Alert</div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">Send welcome message to client phone</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSmsAlert(!smsAlert)}
                      className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none shrink-0 ${smsAlert ? "bg-[#3f5c49]" : "bg-slate-200"
                        }`}
                    >
                      <span
                        className={`w-4.5 h-4.5 bg-white rounded-full absolute top-[3px] transition-all ${smsAlert ? "right-[3px]" : "left-[3px]"
                          }`}
                      />
                    </button>
                  </div>

                  {/* Toggle Card 3 */}
                  <div className="bg-[#fdfdfd] border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-sm border-red-50/50">
                    <div>
                      <div className="font-bold text-red-700 text-xs">Maintenance Mode</div>
                      <div className="text-[10px] text-red-400/90 font-medium mt-0.5">Put frontend offline (admin remains live)</div>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        const newVal = !maintenanceMode;
                        setMaintenanceMode(newVal);
                        localStorage.setItem("electrical_settings_maintenanceMode", String(newVal));
                        try {
                          await saveSiteSettings({ maintenanceMode: newVal });
                        } catch {
                          // Ignore
                        }
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none shrink-0 ${maintenanceMode ? "bg-[#3f5c49]" : "bg-slate-200"
                        }`}
                    >
                      <span
                        className={`w-4.5 h-4.5 bg-white rounded-full absolute top-[3px] transition-all ${maintenanceMode ? "right-[3px]" : "left-[3px]"
                          }`}
                      />
                    </button>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Row 4: Business Calendar Schedule */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">Business Calendar Schedule</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">Weekdays</label>
                      <input
                        type="text"
                        required
                        value={weekdays}
                        onChange={(e) => setWeekdays(e.target.value)}
                        className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">Saturdays</label>
                      <input
                        type="text"
                        required
                        value={saturdays}
                        onChange={(e) => setSaturdays(e.target.value)}
                        className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">Sundays</label>
                      <input
                        type="text"
                        required
                        value={sundays}
                        onChange={(e) => setSundays(e.target.value)}
                        className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper text-xs font-semibold text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button Row */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-[#120f0e] hover:bg-[#201d1c] text-white font-bold py-3.5 px-8 rounded-full text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
                  >
                    Save Configurations
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 8: SECURITY */}
          {activeTab === "security" && (
            currentUser?.role === "admin" ? (
              <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200 text-left">
                {/* Header Title block */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Security & User Management</h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Manage portal access credentials, update security permissions, and log new administrative users.</p>
                </div>

                {/* Top Grid: Forms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                  {/* Left Column: Update profile credentials */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Update Profile Credentials</h3>
                      <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">Modify your own account username or security password.</p>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs text-left">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Account Username</label>
                        <input
                          type="text"
                          required
                          value={updateUsername}
                          onChange={(e) => setUpdateUsername(e.target.value)}
                          className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper font-semibold text-slate-800 text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Current Password</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Required to change password"
                          className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">New Password</label>
                        <input
                          type="password"
                          value={updatePassword}
                          onChange={(e) => setUpdatePassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#5f7d58] hover:bg-[#4a6344] text-white font-bold py-3 px-6 rounded-xl transition shadow uppercase tracking-wider text-[10px] cursor-pointer"
                      >
                        Update Credentials
                      </button>
                    </form>
                  </div>

                  {/* Right Column: Register new portal user */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Register New Portal User</h3>
                      <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">Configure access accounts for editors or read-only viewers.</p>
                    </div>

                    <form onSubmit={handleCreateUser} className="space-y-4 text-xs text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">New Username</label>
                          <input
                            type="text"
                            required
                            value={addUsername}
                            onChange={(e) => setAddUsername(e.target.value)}
                            placeholder="e.g. shelter-installer"
                            className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper font-medium"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Access Password</label>
                          <input
                            type="password"
                            required
                            value={addPassword}
                            onChange={(e) => setAddPassword(e.target.value)}
                            placeholder="Enter secure password"
                            className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">User Authorization Role</label>
                        <select
                          value={addRole}
                          onChange={(e) => setAddRole(e.target.value as any)}
                          className="w-full bg-[#fdfdfd] border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-copper text-xs font-medium text-slate-800"
                        >
                          <option value="viewer">Viewer (Read-Only Portal Access)</option>
                          <option value="editor">Editor (CRUD/Write Access)</option>
                          <option value="admin">Administrator (Full Access)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="bg-[#120f0e] hover:bg-[#221e1d] text-white font-bold py-3 px-6 rounded-full transition shadow uppercase tracking-wider text-[10px] cursor-pointer"
                      >
                        Create Portal User
                      </button>
                    </form>
                  </div>

                </div>

                {/* Bottom Section: Active Portal Accounts */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="text-left">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Active Portal Accounts</h3>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">Database log of authenticated users authorized to access this dashboard.</p>
                    </div>
                    <span className="bg-[#e6ece7] text-[#4d664e] font-bold text-[10px] tracking-wider py-1 px-3 rounded-full uppercase">
                      {portalUsers.length} Accounts
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="p-4 pl-6">Registered User</th>
                          <th className="p-4">Authorization Role</th>
                          <th className="p-4">Database ID</th>
                          <th className="p-4 pr-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {portalUsers.map((user) => {
                          const isSelf = currentUser && user.username === currentUser.username;
                          return (
                            <tr key={user.id} className="hover:bg-slate-50/20 transition">
                              <td className="p-4 pl-6">
                                <div className="flex items-center gap-2">
                                  <User className="w-3.5 h-3.5 text-slate-400" />
                                  <span className="font-bold text-slate-800 capitalize">{user.username}</span>
                                  {isSelf && (
                                    <span className="bg-[#e6ece7] text-[#4d664e] font-black text-[8px] tracking-wider py-0.5 px-1.5 rounded uppercase">
                                      Current User
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full ${user.role === "admin"
                                  ? "bg-[#ffebeb] text-[#d64545]"
                                  : user.role === "editor"
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-slate-100 text-slate-650"
                                  }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="p-4 font-mono text-slate-400 text-[10px]">
                                {user.id.repeat(3).substring(0, 24)}
                              </td>
                              <td className="p-4 pr-6 text-right">
                                {user.username === "admin" ? (
                                  <span className="text-[10px] text-slate-400 italic">System Account</span>
                                ) : (
                                  <button
                                    onClick={() => handleDeleteUser(user.id, user.username)}
                                    className="p-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-600 transition inline-flex items-center"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Admin Permission Required</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Access to system user accounts, privilege management, and portal credentials list is restricted to the primary Administrator account.
                  </p>
                </div>
              </div>
            )
          )}
        </main>
      </div>

      {/* Email Details Dialog */}
      {isViewingEmail && selectedEmail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-250 text-xs text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{selectedEmail.name}</h3>
                  <p className="text-[10px] text-copper font-bold uppercase tracking-wider mt-0.5">Web Email Inquiry</p>
                </div>
                <button
                  onClick={() => { setIsViewingEmail(false); setSelectedEmail(null); }}
                  className="p-1.5 rounded-full hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Email Address</span>
                  <a href={`mailto:${selectedEmail.email}`} className="font-semibold text-copper hover:underline mt-0.5 block text-sm">{selectedEmail.email}</a>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Phone Number</span>
                  <a href={`tel:${selectedEmail.phone}`} className="font-semibold text-copper hover:underline mt-0.5 block text-sm">{selectedEmail.phone || "N/A"}</a>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Service Requested</span>
                  <p className="font-semibold text-slate-800 mt-0.5 text-sm">{selectedEmail.service || "General Inquiry"}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Submission Channel</span>
                  <p className="font-semibold text-slate-850 mt-0.5">{selectedEmail.source || "Website Contact Form"}</p>
                </div>
                <div className="col-span-2 bg-slate-50 border border-slate-105 p-3.5 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Inquiry Message Scope</span>
                  <p className="text-slate-700 font-medium leading-relaxed mt-1.5 text-sm whitespace-pre-wrap">{selectedEmail.message || "No message content."}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 flex gap-3">
              <button
                onClick={() => { setIsViewingEmail(false); setSelectedEmail(null); }}
                className="w-full border border-slate-200 rounded-xl py-3 font-bold hover:bg-slate-50 transition cursor-pointer"
              >
                Close Inquiry Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Details Dialog */}
      {isEditingLead && selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-250 text-xs text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{selectedLead.name}</h3>
                  <p className="text-[10px] text-copper font-bold uppercase tracking-wider mt-0.5">Lead Details Profile</p>
                </div>
                <button
                  onClick={() => { setIsEditingLead(false); setSelectedLead(null); }}
                  className="p-1.5 rounded-full hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-semibold text-copper hover:underline mt-0.5 block">{selectedLead.email}</a>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Phone Number</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-semibold text-copper hover:underline mt-0.5 block">{selectedLead.phone}</a>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Property Address</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedLead.address}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Project Category</span>
                  <p className="font-semibold text-slate-800 capitalize mt-0.5">{selectedLead.projectType.replace("-", " ")}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Created At</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2 bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Project Scope Description</span>
                  <p className="text-slate-600 font-medium leading-relaxed mt-1">{selectedLead.description}</p>
                </div>
              </div>

              {/* Edit inputs */}
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">Management Controls</h4>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Pipeline Stage</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as Lead["status"])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-1 focus:ring-copper focus:border-copper focus:outline-none font-semibold text-slate-800"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="consultation_scheduled">Consultation Scheduled</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="won">Won (Contract Signed)</option>
                    <option value="lost">Lost (Archived)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Estimated Contract Value ($)</label>
                  <input
                    type="number"
                    value={editEstimatedValue}
                    onChange={(e) => setEditEstimatedValue(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-1 focus:ring-copper focus:border-copper focus:outline-none font-semibold text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Internal Project Notes</label>
                  <textarea
                    rows={3}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Add details about estimates, phone calls, or scheduled on-site inspections..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-1 focus:ring-copper focus:border-copper focus:outline-none font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Photos */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">Project Site Photos</h4>
                  <label className="bg-slate-50 hover:bg-copper/10 hover:text-copper border border-slate-200 hover:border-copper/25 px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 cursor-pointer transition">
                    <Upload className="w-3.5 h-3.5" /> Upload File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadPhoto(e, selectedLead.id)}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {selectedLead.photos && selectedLead.photos.map((photo, pIdx) => (
                    <div key={pIdx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-150 shadow-sm bg-slate-50">
                      <img
                        src={photo}
                        alt={`Lead Site ${pIdx + 1}`}
                        className="w-full h-full object-cover cursor-zoom-in"
                        onClick={() => setLightboxPhoto(photo)}
                      />
                      <button
                        onClick={() => handleRemovePhoto(selectedLead.id, pIdx)}
                        className="absolute top-1 right-1 p-1 bg-red-600/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition shadow"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {(!selectedLead.photos || selectedLead.photos.length === 0) && (
                    <div className="col-span-3 text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 font-medium">
                      No site photos uploaded yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 flex gap-3 bg-white">
              <button
                onClick={() => { setIsEditingLead(false); setSelectedLead(null); }}
                className="w-1/2 border border-slate-200 rounded-xl py-3 font-bold hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLeadDetails}
                className="w-1/2 bg-copper hover:bg-copper-deep text-white rounded-xl py-3 font-bold shadow-lg shadow-copper/10 transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Lead Dialog */}
      {isAddingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 text-xs text-left">
            <div className="bg-gradient-to-r from-copper to-[#975033] p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm leading-tight">Create New Business Lead</h3>
              <button
                onClick={() => setIsAddingLead(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomLead} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Client Name</label>
                  <input
                    type="text"
                    required
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Value ($)</label>
                  <input
                    type="number"
                    value={newLeadVal}
                    onChange={(e) => setNewLeadVal(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="(786) 307-5933"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Address</label>
                  <input
                    type="text"
                    required
                    value={newLeadAddress}
                    onChange={(e) => setNewLeadAddress(e.target.value)}
                    placeholder="e.g. 104 Oak Dr, Miami, FL 33149"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Project Type</label>
                  <select
                    value={newLeadType}
                    onChange={(e) => setNewLeadType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper font-semibold text-slate-800"
                  >
                    <option value="panel-upgrades">Panel Upgrade</option>
                    <option value="ev-charger">EV Charger</option>
                    <option value="generator">Generator</option>
                    <option value="commercial">Commercial Service</option>
                    <option value="residential">Residential Service</option>
                    <option value="industrial">Industrial Service</option>
                    <option value="emergency">Emergency Service</option>
                    <option value="wiring-rewiring">Wiring & Rewiring</option>
                    <option value="security-systems">Security Systems</option>
                  </select>
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Project Scope Description</label>
                  <textarea
                    rows={3}
                    value={newLeadDesc}
                    onChange={(e) => setNewLeadDesc(e.target.value)}
                    placeholder="Describe the requested work details..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingLead(false)}
                  className="w-1/2 border border-slate-200 rounded-xl py-3 font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-copper hover:bg-copper-deep text-white rounded-xl py-3 font-bold shadow-lg shadow-copper/10 transition cursor-pointer"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Reply dialog */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 text-xs text-left">
            <div className="bg-gradient-to-r from-copper to-[#975033] p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm leading-tight">Reply to Review</h3>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-white/80 hover:text-white p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 italic">
                "{selectedReview.text}"
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Response Message</label>
                <textarea
                  rows={4}
                  value={reviewReplyText}
                  onChange={(e) => setReviewReplyText(e.target.value)}
                  placeholder="Write a response showing appreciation or addressing project highlights..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  className="w-1/2 border border-slate-200 rounded-xl py-3 font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveReviewReply}
                  className="w-1/2 bg-copper hover:bg-copper-deep text-white rounded-xl py-3 font-bold shadow-lg shadow-copper/10 transition cursor-pointer"
                >
                  Submit Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Review Dialog */}
      {isAddingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 text-xs text-left">
            <div className="bg-gradient-to-r from-copper to-[#975033] p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm leading-tight">Add New Review</h3>
              <button onClick={() => setIsAddingReview(false)} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddReview} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Client Name</label>
                  <input type="text" required value={newReviewAuthor} onChange={(e) => setNewReviewAuthor(e.target.value)} placeholder="e.g. John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Location</label>
                  <input type="text" value={newReviewLocation} onChange={(e) => setNewReviewLocation(e.target.value)} placeholder="e.g. Miami, FL" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper" />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Review Title</label>
                  <input type="text" value={newReviewTitle} onChange={(e) => setNewReviewTitle(e.target.value)} placeholder="e.g. Amazing EV Charger Install" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper" />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Review Text</label>
                  <textarea rows={3} required value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} placeholder="Client review content..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper resize-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Star Rating</label>
                  <select value={newReviewRating} onChange={(e) => setNewReviewRating(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-copper font-semibold text-slate-800">
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsAddingReview(false)} className="w-1/2 border border-slate-200 rounded-xl py-3 font-bold hover:bg-slate-50 transition cursor-pointer">Cancel</button>
                <button type="submit" className="w-1/2 bg-copper hover:bg-copper-deep text-white rounded-xl py-3 font-bold shadow-lg shadow-copper/10 transition cursor-pointer">Add Review</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmConfig && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 mx-auto">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-slate-800 text-sm">{confirmConfig.title}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{confirmConfig.message}</p>
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3 bg-white">
              <button
                onClick={() => setConfirmConfig(null)}
                className="w-1/2 border border-slate-200 rounded-xl py-3 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmConfig.onConfirm();
                  setConfirmConfig(null);
                }}
                className="w-1/2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl py-3 text-xs font-bold shadow-lg transition cursor-pointer"
              >
                {confirmConfig.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Photo Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition"
            onClick={() => setLightboxPhoto(null)}
          >
            <X className="w-8 h-8" />
          </button>
          {lightboxPhoto.endsWith(".mp4") || lightboxPhoto.endsWith(".mov") || lightboxPhoto.includes("/video/upload/") ? (
            <video
              src={lightboxPhoto}
              className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={lightboxPhoto}
              alt="Enlarged view"
              className="max-w-full max-h-full rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}

    </div>
  );
}
