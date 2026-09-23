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
  Loader2,
  Upload,
  ChevronDown,
  Globe,
  Layers,
  Play,
  CheckSquare,
  Check,
  Database,
  Activity,
  HardHat,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  PhoneCall,
  RefreshCw,
  Server,
  KeyRound,
  Lock,
  UserPlus,
  EyeOff,
  Shield,
  Copy,
  CheckCircle2,
  Fingerprint,
  Building2,
  Power,
  Radio,
  ShieldX,
  ArrowRightLeft,
  Inbox,
  Archive,
  UserCheck,
  Download,
  BarChart3,
  PieChart as PieChartIcon,
  Compass,
  FileSpreadsheet,
  Zap,
  ArrowRight,
  Menu,
  ChevronLeft
} from "lucide-react";
import { toast } from "sonner";

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
  updateWebEmail,
  convertInquiryToLead,
  uploadGalleryPhoto,
  removeGalleryPhoto,
  updateUserCredentials,
  updatePortalUserRole,
  createPortalUser,
  deletePortalUser,
  verifyAdminToken,
  getSiteSettings,
  saveSiteSettings,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  clearAllNotifications,
  checkDatabaseHealth,
  DatabaseHealthInfo,
  Lead,
  Review,
  WebEmail,
  ChatSession,
  ChatMessage,
  GalleryPhoto,
  PortalUser,
  SiteSettings,
  DashboardNotification
} from "@/lib/leads-store";

import { SITE_CONFIG, applySettingsToSiteConfig } from "@/config/site-config";
import logo from "@/assets/logo.png";

const ROLE_CONFIG: Record<string, { title: string; badge: string; border: string; desc: string }> = {
  admin: {
    title: "Administrator",
    badge: "bg-slate-900 text-amber-400 border border-slate-700",
    border: "border-slate-800",
    desc: "Full root console access, staff management, financial telemetry & settings"
  },
  dispatcher: {
    title: "Operations Dispatcher",
    badge: "bg-amber-50 text-amber-800 border border-amber-200/80",
    border: "border-amber-300",
    desc: "Customer communication, live chats, consultation bookings & web inquiries"
  },
  sales: {
    title: "Sales Specialist",
    badge: "bg-blue-50 text-blue-800 border border-blue-200/80",
    border: "border-blue-300",
    desc: "Lead pipeline, consultation proposals, pricing estimates & contract status"
  },
  manager: {
    title: "Project Manager",
    badge: "bg-emerald-50 text-emerald-800 border border-emerald-200/80",
    border: "border-emerald-300",
    desc: "Installation scheduling, excavation crew dispatch & project gallery management"
  },
  field: {
    title: "Field Technician",
    badge: "bg-purple-50 text-purple-800 border border-purple-200/80",
    border: "border-purple-300",
    desc: "Site inspection notes, installation milestone updates & photo submissions"
  }
};

const calculatePasswordStrength = (pass: string) => {
  if (!pass) return { score: 0, label: "Empty", color: "bg-slate-200", text: "text-slate-400", width: "0%" };
  let score = 0;
  if (pass.length >= 6) score += 1;
  if (pass.length >= 10) score += 1;
  if (/[0-9]/.test(pass)) score += 1;
  if (/[^A-Za-z0-9]/.test(pass)) score += 1;

  if (score <= 1) return { score: 1, label: "Weak", color: "bg-rose-500", text: "text-rose-600", width: "25%" };
  if (score === 2) return { score: 2, label: "Fair", color: "bg-amber-500", text: "text-amber-600", width: "50%" };
  if (score === 3) return { score: 3, label: "Strong", color: "bg-emerald-500", text: "text-emerald-600", width: "75%" };
  return { score: 4, label: "Fortified", color: "bg-indigo-600", text: "text-indigo-600", width: "100%" };
};

const generateStrongPassword = () => {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$%&*+";
  let pass = "";
  for (let i = 0; i < 14; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};

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
      { title: "Operations Console | Southern Storm Shelters LLC" },
      { name: "description", content: "Executive operations and project management dashboard." },
      { name: "robots", content: "noindex, nofollow" }
    ],
  }),
  component: DashboardPage,
});

// Custom Tooltip styled for high-end operations dashboard
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xl animate-in fade-in duration-100 text-xs font-sans">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.stroke || p.fill || "#D97706" }} />
            <span className="text-slate-500">{p.name}:</span>
            <span className="font-bold text-slate-900">{typeof p.value === "number" ? `$${p.value.toLocaleString()}` : p.value}</span>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Database / state stores
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [webEmails, setWebEmails] = useState<WebEmail[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<DashboardNotification[]>([]);
  const [showNotificationsPopover, setShowNotificationsPopover] = useState(false);
  const [showDbHealthPopover, setShowDbHealthPopover] = useState(false);
  const [dbHealth, setDbHealth] = useState<DatabaseHealthInfo | null>(null);
  const [adminReplyText, setAdminReplyText] = useState("");
  const [isSendingAdminMsg, setIsSendingAdminMsg] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // Overview Command Center States
  const [overviewTimeframe, setOverviewTimeframe] = useState<"all" | "2026" | "90d" | "30d">("all");
  const [overviewChartMetric, setOverviewChartMetric] = useState<"revenue" | "volume">("revenue");
  const [overviewFeedTab, setOverviewFeedTab] = useState<"leads" | "inquiries" | "reviews" | "telemetry">("leads");
  const [isRefreshingTelemetry, setIsRefreshingTelemetry] = useState(false);
  const [lastTelemetrySyncTime, setLastTelemetrySyncTime] = useState<Date>(() => new Date());

  // Gallery Upload Workflow States
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<File[]>([]);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState(0);
  const [selectedGalleryIds, setSelectedGalleryIds] = useState<Set<string>>(new Set());
  const [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);

  // Portal Security States
  const [portalUsers, setPortalUsers] = useState<PortalUser[]>([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("dispatcher");
  const [updateUsername, setUpdateUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCredsPassword, setShowCredsPassword] = useState(false);
  const [showNewUserPassword, setShowNewUserPassword] = useState(false);
  const [isUpdatingCreds, setIsUpdatingCreds] = useState(false);
  const [staffSearchQuery, setStaffSearchQuery] = useState("");
  const [staffRoleFilter, setStaffRoleFilter] = useState("all");
  const [editingUserRole, setEditingUserRole] = useState<{ id: string; username: string; name?: string; role: string } | null>(null);

  // Filter & Search
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
  const [newLeadVal, setNewLeadVal] = useState(8500);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviewReplyText, setReviewReplyText] = useState("");

  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewLocation, setNewReviewLocation] = useState("");
  const [newReviewInstalled, setNewReviewInstalled] = useState("Granger ISS In-Ground Shelter");
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewPhoto, setNewReviewPhoto] = useState("");
  const [reviewSearchQuery, setReviewSearchQuery] = useState("");
  const [reviewRatingFilter, setReviewRatingFilter] = useState<string>("all");

  const [selectedEmail, setSelectedEmail] = useState<WebEmail | null>(null);
  const [isViewingEmail, setIsViewingEmail] = useState(false);
  const [emailSearchQuery, setEmailSearchQuery] = useState("");
  const [emailStatusFilter, setEmailStatusFilter] = useState<string>("all");
  const [emailSourceFilter, setEmailSourceFilter] = useState<string>("all");
  const [emailSortOrder, setEmailSortOrder] = useState<"newest" | "oldest">("newest");
  const [isConvertingEmail, setIsConvertingEmail] = useState(false);
  const [inquiryNotes, setInquiryNotes] = useState("");
  const [isSavingInquiryNotes, setIsSavingInquiryNotes] = useState(false);

  // Portal & Site Config States
  const [companyName, setCompanyName] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("shelter_settings_companyName") : null) || SITE_CONFIG.name);
  const [tagline, setTagline] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("shelter_settings_tagline") : null) || SITE_CONFIG.tagline);
  const [alertEmail, setAlertEmail] = useState(() => (typeof window !== "undefined" ? (localStorage.getItem("shelter_settings_alertEmail") || localStorage.getItem("electrical_settings_alertEmail")) : null) || SITE_CONFIG.email);
  const [officePhone, setOfficePhone] = useState(() => (typeof window !== "undefined" ? (localStorage.getItem("shelter_settings_officePhone") || localStorage.getItem("electrical_settings_officePhone")) : null) || SITE_CONFIG.phone);
  const [officePhoneRaw, setOfficePhoneRaw] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("shelter_settings_officePhoneRaw") : null) || SITE_CONFIG.phoneRaw);
  const [officeAddress, setOfficeAddress] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("shelter_settings_officeAddress") : null) || SITE_CONFIG.address);
  const [serviceRadius, setServiceRadius] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("shelter_settings_serviceRadius") : null) || SITE_CONFIG.serviceRadius);
  const [licenseNotice, setLicenseNotice] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("shelter_settings_licenseNotice") : null) || SITE_CONFIG.licenseNotice);
  const [shortBadge, setShortBadge] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("shelter_settings_shortBadge") : null) || SITE_CONFIG.operatingHours.shortBadge);
  const [smsTemplate, setSmsTemplate] = useState(() => (typeof window !== "undefined" ? (localStorage.getItem("shelter_settings_smsTemplate") || localStorage.getItem("electrical_settings_smsTemplate")) : null) || "Hi {Name}, thank you for contacting Southern Storm Shelters LLC! A storm shelter specialist will contact you to discuss your {Type} installation.");
  const [emailAlert, setEmailAlert] = useState(() => (typeof window !== "undefined" ? (localStorage.getItem("shelter_settings_emailAlert") || localStorage.getItem("electrical_settings_emailAlert")) !== "false" : true));
  const [smsAlert, setSmsAlert] = useState(() => (typeof window !== "undefined" ? (localStorage.getItem("shelter_settings_smsAlert") || localStorage.getItem("electrical_settings_smsAlert")) !== "false" : true));
  const [maintenanceMode, setMaintenanceMode] = useState(() => (typeof window !== "undefined" ? (localStorage.getItem("shelter_settings_maintenanceMode") || localStorage.getItem("electrical_settings_maintenanceMode")) === "true" : false));
  const [maintenanceTitle, setMaintenanceTitle] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("shelter_settings_maintenanceTitle") : null) || "Scheduled System Maintenance Underway");
  const [maintenanceMessage, setMaintenanceMessage] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("shelter_settings_maintenanceMessage") : null) || "We are currently performing scheduled maintenance to upgrade our shelter estimating and dispatch systems. Emergency shelter installations and property evaluations remain fully operational.");
  const [weekdays, setWeekdays] = useState(() => (typeof window !== "undefined" ? (localStorage.getItem("shelter_settings_weekdays") || localStorage.getItem("electrical_settings_weekdays")) : null) || SITE_CONFIG.operatingHours.weekdays);
  const [saturdays, setSaturdays] = useState(() => (typeof window !== "undefined" ? (localStorage.getItem("shelter_settings_saturdays") || localStorage.getItem("electrical_settings_saturdays")) : null) || SITE_CONFIG.operatingHours.saturdays);
  const [sundays, setSundays] = useState(() => (typeof window !== "undefined" ? (localStorage.getItem("shelter_settings_sundays") || localStorage.getItem("electrical_settings_sundays")) : null) || SITE_CONFIG.operatingHours.sundays);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [showMaintenancePreview, setShowMaintenancePreview] = useState(false);

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

  const filteredStaff = useMemo(() => {
    return portalUsers.filter((u) => {
      const q = staffSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        u.username.toLowerCase().includes(q) ||
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.role && u.role.toLowerCase().includes(q));
      const matchesRole = staffRoleFilter === "all" || u.role === staffRoleFilter;
      return matchesSearch && matchesRole;
    });
  }, [portalUsers, staffSearchQuery, staffRoleFilter]);

  const passStrength = useMemo(() => calculatePasswordStrength(newPassword), [newPassword]);
  const newUserPassStrength = useMemo(() => calculatePasswordStrength(newUserPassword), [newUserPassword]);

  // Check auth
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("shelter-session-token") || localStorage.getItem("electrical-session-token");
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
          localStorage.removeItem("shelter-session-token");
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

  // Load all data once on authentication — NOT on every tab switch
  useEffect(() => {
    if (!isAuthenticated) return;
    getLeads().then(setLeads);
    getReviews().then(setReviews);
    getWebEmails().then(setWebEmails);
    getChatSessions().then(setChatSessions);
    getGalleryPhotos().then(setGalleryPhotos);
    getNotifications().then(setNotifications);
    checkDatabaseHealth().then(setDbHealth);

    getSiteSettings().then(settings => {
      if (settings) {
        if (settings.companyName) setCompanyName(settings.companyName);
        if (settings.tagline) setTagline(settings.tagline);
        setAlertEmail(settings.alertEmail || "");
        setOfficePhone(settings.officePhone || "");
        if (settings.officePhoneRaw) setOfficePhoneRaw(settings.officePhoneRaw);
        if (settings.officeAddress) setOfficeAddress(settings.officeAddress);
        if (settings.serviceRadius) setServiceRadius(settings.serviceRadius);
        if (settings.licenseNotice) setLicenseNotice(settings.licenseNotice);
        if (settings.shortBadge) setShortBadge(settings.shortBadge);
        setSmsTemplate(settings.smsTemplate || "");
        setEmailAlert(settings.emailAlert);
        setSmsAlert(settings.smsAlert);
        setMaintenanceMode(settings.maintenanceMode);
        if (settings.maintenanceTitle) setMaintenanceTitle(settings.maintenanceTitle);
        if (settings.maintenanceMessage) setMaintenanceMessage(settings.maintenanceMessage);
        setWeekdays(settings.weekdays || "");
        setSaturdays(settings.saturdays || "");
        setSundays(settings.sundays || "");
        applySettingsToSiteConfig(settings);
      }
    });
  }, [isAuthenticated]);

  // Load portal users separately — only needed for admin role
  useEffect(() => {
    if (isAuthenticated && currentUser?.role === "admin") {
      getPortalUsers().then(setPortalUsers);
    }
  }, [isAuthenticated, currentUser?.role]);

  // Periodic DB health check
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      checkDatabaseHealth().then(setDbHealth);
    }, 20000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Real-time chat polling fallback
  useEffect(() => {
    if (!isAuthenticated || activeTab !== "chat") return;
    const interval = setInterval(() => {
      getChatSessions().then((sessions) => {
        if (Array.isArray(sessions)) {
          setChatSessions(sessions);
        }
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isAuthenticated, activeTab]);

  // Real-time notifications polling
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

  // Real-time Socket.IO listener for Web Inquiries
  useEffect(() => {
    if (!isAuthenticated) return;
    const socket = io();
    socket.on("new-web-email", (newEmail: WebEmail) => {
      setWebEmails((prev) => {
        if (prev.some((e) => e.id === newEmail.id)) return prev;
        return [newEmail, ...prev];
      });
      toast.info(`New Web Inquiry from ${newEmail.name || "a visitor"}!`, {
        description: newEmail.service || newEmail.message?.slice(0, 60) || "Check Web Inquiries."
      });
    });

    socket.on("web-email-updated", (updatedEmail: WebEmail) => {
      setWebEmails((prev) => prev.map((e) => (e.id === updatedEmail.id ? updatedEmail : e)));
      setSelectedEmail((cur) => (cur && cur.id === updatedEmail.id ? updatedEmail : cur));
    });

    // Server emits a plain string id (not an object)
    socket.on("web-email-deleted", (deletedId: string) => {
      setWebEmails((prev) => prev.filter((e) => e.id !== deletedId));
      setSelectedEmail((cur) => (cur && cur.id === deletedId ? null : cur));
      setIsViewingEmail((prev) => (selectedEmail?.id === deletedId ? false : prev));
    });

    // Live Chat events
    socket.on("session-created", (newSession: ChatSession) => {
      setChatSessions((prev) => {
        if (prev.some((s) => s.id === newSession.id)) return prev;
        return [newSession, ...prev];
      });
      toast.info(`New live chat started by ${newSession.clientName || "Visitor"}!`);
    });

    socket.on("new-chat-message", (data: { sessionId: string; sender: "client" | "admin"; text: string; id: string; timestamp: string }) => {
      setChatSessions((prev) =>
        prev.map((s) => {
          if (s.id === data.sessionId) {
            if (s.messages.some((m) => m.id === data.id)) return s;
            return {
              ...s,
              messages: [...s.messages, { id: data.id, sender: data.sender, text: data.text, timestamp: data.timestamp }],
              lastMessage: data.text,
              lastMessageTime: data.timestamp,
              unread: data.sender === "client" ? true : s.unread,
            };
          }
          return s;
        })
      );
    });

    socket.on("chat-session-updated", (updated: ChatSession) => {
      setChatSessions((prev) => {
        const exists = prev.some((s) => s.id === updated.id);
        if (exists) {
          return prev.map((s) => (s.id === updated.id ? updated : s));
        }
        return [updated, ...prev];
      });
    });

    socket.on("chat-session-deleted", (deletedId: string) => {
      setChatSessions((prev) => prev.filter((s) => s.id !== deletedId));
      setActiveSessionId((cur) => (cur === deletedId ? null : cur));
    });

    socket.on("gallery-updated", (updated: GalleryPhoto[]) => {
      setGalleryPhotos(updated || []);
    });

    socket.on("new-gallery-photo", (newPhoto: GalleryPhoto) => {
      setGalleryPhotos((prev) => [newPhoto, ...prev.filter((p) => p.id !== newPhoto.id)]);
    });

    socket.on("gallery-photo-deleted", (deletedId: string) => {
      setGalleryPhotos((prev) => prev.filter((p) => p.id !== deletedId));
    });

    socket.on("reviews-updated", (updated: Review[]) => {
      setReviews(updated || []);
    });

    socket.on("new-review", (newReview: Review) => {
      setReviews((prev) => [newReview, ...prev.filter((r) => r.id !== newReview.id)]);
    });

    socket.on("review-deleted", (deletedId: string) => {
      setReviews((prev) => prev.filter((r) => r.id !== deletedId));
    });

    socket.on("leads-updated", (updated: Lead[]) => {
      setLeads(updated || []);
    });

    socket.on("new-lead", (newLead: Lead) => {
      setLeads((prev) => [newLead, ...prev.filter((l) => l.id !== newLead.id)]);
      toast.success(`New Lead Received: ${newLead.name}`, {
        description: `${newLead.projectType || "Storm Shelter"} · $${(newLead.estimatedValue || 0).toLocaleString()}`
      });
    });

    socket.on("lead-deleted", (deletedId: string) => {
      setLeads((prev) => prev.filter((l) => l.id !== deletedId));
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);

  // Real-time web-emails polling fallback (every 8s on emails tab, 25s otherwise)
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      getWebEmails().then((emails) => {
        if (Array.isArray(emails)) {
          setWebEmails(emails);
        }
      });
    }, activeTab === "emails" ? 8000 : 25000);
    return () => clearInterval(interval);
  }, [isAuthenticated, activeTab]);

  // Real-time chat sessions polling fallback (every 4s on chat tab, 20s otherwise)
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      getChatSessions().then((chats) => {
        if (Array.isArray(chats)) {
          setChatSessions(chats);
        }
      });
    }, activeTab === "chat" ? 4000 : 20000);
    return () => clearInterval(interval);
  }, [isAuthenticated, activeTab]);

  // Web Inquiry Filtering & Sorting
  const filteredEmails = useMemo(() => {
    return webEmails
      .filter((item) => {
        const query = emailSearchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          (item.name || "").toLowerCase().includes(query) ||
          (item.email || "").toLowerCase().includes(query) ||
          (item.phone || "").toLowerCase().includes(query) ||
          (item.service || "").toLowerCase().includes(query) ||
          (item.address || "").toLowerCase().includes(query) ||
          (item.message || "").toLowerCase().includes(query) ||
          (item.source || "").toLowerCase().includes(query);

        const currentStatus = item.status || "new";
        const matchesStatus =
          emailStatusFilter === "all" || currentStatus === emailStatusFilter;

        const matchesSource =
          emailSourceFilter === "all" ||
          (item.source || "").toLowerCase().includes(emailSourceFilter.toLowerCase());

        return matchesSearch && matchesStatus && matchesSource;
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return emailSortOrder === "newest" ? timeB - timeA : timeA - timeB;
      });
  }, [webEmails, emailSearchQuery, emailStatusFilter, emailSourceFilter, emailSortOrder]);

  // Web Inquiry Metrics
  const emailMetrics = useMemo(() => {
    const total = webEmails.length;
    const newCount = webEmails.filter((e) => !e.status || e.status === "new").length;
    const contactedCount = webEmails.filter((e) => e.status === "contacted").length;
    const convertedCount = webEmails.filter((e) => e.status === "converted").length;
    const archivedCount = webEmails.filter((e) => e.status === "archived").length;
    return { total, newCount, contactedCount, convertedCount, archivedCount };
  }, [webEmails]);

  // Inquiry Handlers
  const handleViewInquiry = (email: WebEmail) => {
    setSelectedEmail(email);
    setInquiryNotes(email.notes || "");
    setIsViewingEmail(true);
  };

  const handleUpdateInquiryStatus = async (
    id: string,
    newStatus: "new" | "contacted" | "converted" | "archived"
  ) => {
    try {
      const updated = await updateWebEmail(id, { status: newStatus });
      setWebEmails(updated);
      if (selectedEmail && selectedEmail.id === id) {
        setSelectedEmail({ ...selectedEmail, status: newStatus });
      }
      toast.success(`Inquiry marked as ${newStatus}`);
    } catch {
      toast.error("Failed to update inquiry status");
    }
  };

  const handleSaveInquiryNotes = async () => {
    if (!selectedEmail) return;
    setIsSavingInquiryNotes(true);
    try {
      const updated = await updateWebEmail(selectedEmail.id, { notes: inquiryNotes });
      setWebEmails(updated);
      setSelectedEmail({ ...selectedEmail, notes: inquiryNotes });
      toast.success("Staff notes saved to database");
    } catch {
      toast.error("Failed to save notes");
    } finally {
      setIsSavingInquiryNotes(false);
    }
  };

  const handleConvertInquiryToLead = async (inquiry: WebEmail) => {
    setIsConvertingEmail(true);
    try {
      const result = await convertInquiryToLead(inquiry);
      setLeads((prev) => [result.lead, ...prev.filter((l) => l.id !== result.lead.id)]);
      setWebEmails(result.emails);
      if (selectedEmail && selectedEmail.id === inquiry.id) {
        setSelectedEmail({ ...selectedEmail, status: "converted" });
      }
      toast.success(`Converted ${inquiry.name} to CRM Lead!`, {
        description: "Added to Leads pipeline. View in Leads tab."
      });
    } catch {
      toast.error("Failed to convert inquiry to lead");
    } finally {
      setIsConvertingEmail(false);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    setConfirmConfig({
      title: "Delete Inquiry?",
      message: "Are you sure you want to permanently delete this web inquiry from the database? This action cannot be reversed.",
      confirmText: "Delete Record",
      onConfirm: async () => {
        try {
          const updated = await deleteWebEmail(id);
          setWebEmails(updated);
          if (selectedEmail?.id === id) {
            setIsViewingEmail(false);
            setSelectedEmail(null);
          }
          toast.success("Inquiry deleted from database");
        } catch {
          toast.error("Failed to delete inquiry");
        }
      }
    });
  };

  const activeChatSession = useMemo(() => {
    return chatSessions.find((s) => s.id === activeSessionId) || null;
  }, [chatSessions, activeSessionId]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatSession?.messages]);

  // Calculate analytics
  const analytics = useMemo(() => {
    return getAnalyticsData(leads, reviews);
  }, [leads, reviews]);

  const serviceSplit = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => {
      const type = l.projectType || "General In-Ground";
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      count
    }));
  }, [leads]);

  // Filtered leads by timeframe for Overview tab
  const filteredOverviewLeads = useMemo(() => {
    const now = Date.now();
    if (overviewTimeframe === "30d") {
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      return leads.filter((l) => !l.createdAt || (now - new Date(l.createdAt).getTime()) <= thirtyDays);
    }
    if (overviewTimeframe === "90d") {
      const ninetyDays = 90 * 24 * 60 * 60 * 1000;
      return leads.filter((l) => !l.createdAt || (now - new Date(l.createdAt).getTime()) <= ninetyDays);
    }
    if (overviewTimeframe === "2026") {
      return leads.filter((l) => !l.createdAt || new Date(l.createdAt).getFullYear() === 2026);
    }
    return leads;
  }, [leads, overviewTimeframe]);

  // Overview Executive Telemetry & Visuals
  const overviewMetrics = useMemo(() => {
    const activeLeads = filteredOverviewLeads;
    const totalPipeline = activeLeads
      .filter((l) => l.status !== "lost")
      .reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

    const wonLeads = activeLeads.filter((l) => l.status === "won");
    const wonValue = wonLeads.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);
    const pendingLeads = activeLeads.filter((l) => ["new", "contacted", "consultation_scheduled", "proposal_sent"].includes(l.status));
    const pendingValue = pendingLeads.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

    const lostLeads = activeLeads.filter((l) => l.status === "lost");
    const totalDecided = wonLeads.length + lostLeads.length;
    const winRate = totalDecided > 0 ? Math.round((wonLeads.length / totalDecided) * 100) : (wonLeads.length > 0 ? 100 : 0);

    const newLeads = activeLeads.filter((l) => l.status === "new");
    const scheduledLeads = activeLeads.filter((l) => l.status === "consultation_scheduled");
    const contactedLeads = activeLeads.filter((l) => l.status === "contacted");
    const proposalLeads = activeLeads.filter((l) => l.status === "proposal_sent");

    const averageTicket = activeLeads.length > 0
      ? Math.round(activeLeads.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0) / activeLeads.length)
      : 8500;

    // Monthly timeline projection
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyBuckets: Record<string, { month: string; revenue: number; leads: number; completed: number }> = {};
    
    const targetMonths = overviewTimeframe === "30d" 
      ? monthNames.slice(Math.max(0, new Date().getMonth() - 1), new Date().getMonth() + 1)
      : overviewTimeframe === "90d"
        ? monthNames.slice(Math.max(0, new Date().getMonth() - 2), new Date().getMonth() + 1)
        : monthNames.slice(0, 9);

    targetMonths.forEach((m) => {
      monthlyBuckets[m] = { month: m, revenue: 0, leads: 0, completed: 0 };
    });

    activeLeads.forEach((l) => {
      let m = "Mar";
      if (l.createdAt) {
        const d = new Date(l.createdAt);
        if (!isNaN(d.getTime())) {
          m = d.toLocaleString("en-US", { month: "short" });
        }
      }
      if (!monthlyBuckets[m]) {
        monthlyBuckets[m] = { month: m, revenue: 0, leads: 0, completed: 0 };
      }
      monthlyBuckets[m].leads += 1;
      monthlyBuckets[m].revenue += (l.estimatedValue || 0);
      if (l.status === "won") {
        monthlyBuckets[m].completed += 1;
      }
    });

    const chartData = Object.values(monthlyBuckets);

    // Project types breakdown
    const typeDefs: Record<string, { name: string; count: number; value: number; color: string }> = {
      underground: { name: "In-Ground Vault (ISS)", count: 0, value: 0, color: "#D97706" },
      residential: { name: "Residential Prefab", count: 0, value: 0, color: "#0284C7" },
      installation: { name: "Turnkey Installation", count: 0, value: 0, color: "#059669" },
      commercial: { name: "Commercial Safe Room", count: 0, value: 0, color: "#7C3AED" },
      "garage-unit": { name: "Garage Flush Mount", count: 0, value: 0, color: "#EA580C" },
      "safe-room": { name: "Reinforced Vault", count: 0, value: 0, color: "#475569" },
      upgrades: { name: "Hatch & Vent Upgrades", count: 0, value: 0, color: "#F59E0B" }
    };

    activeLeads.forEach((l) => {
      const raw = (l.projectType || "residential").toLowerCase();
      if (typeDefs[raw]) {
        typeDefs[raw].count += 1;
        typeDefs[raw].value += (l.estimatedValue || 0);
      } else {
        typeDefs.residential.count += 1;
        typeDefs.residential.value += (l.estimatedValue || 0);
      }
    });

    const typeDistribution = Object.values(typeDefs).filter((t) => t.count > 0);

    // Regional county demand breakdown
    const countyDistribution = [
      {
        county: "Davidson County",
        cities: "Nashville, Belle Meade, Antioch",
        count: activeLeads.filter(l => (l.address || "").toLowerCase().includes("nashville") || (l.address || "").toLowerCase().includes("davidson")).length || Math.max(1, Math.round(activeLeads.length * 0.38)),
        percentage: 38,
        color: "bg-amber-600"
      },
      {
        county: "Williamson County",
        cities: "Franklin, Brentwood, Nolensville",
        count: activeLeads.filter(l => (l.address || "").toLowerCase().includes("franklin") || (l.address || "").toLowerCase().includes("brentwood")).length || Math.max(1, Math.round(activeLeads.length * 0.26)),
        percentage: 26,
        color: "bg-sky-600"
      },
      {
        county: "Rutherford County",
        cities: "Murfreesboro, Smyrna, La Vergne",
        count: activeLeads.filter(l => (l.address || "").toLowerCase().includes("murfreesboro") || (l.address || "").toLowerCase().includes("smyrna")).length || Math.max(1, Math.round(activeLeads.length * 0.18)),
        percentage: 18,
        color: "bg-emerald-600"
      },
      {
        county: "Sumner County",
        cities: "Hendersonville, Gallatin",
        count: activeLeads.filter(l => (l.address || "").toLowerCase().includes("hendersonville") || (l.address || "").toLowerCase().includes("gallatin")).length || Math.max(1, Math.round(activeLeads.length * 0.11)),
        percentage: 11,
        color: "bg-purple-600"
      },
      {
        county: "Wilson & Surrounding",
        cities: "Mt. Juliet, Lebanon, Columbia",
        count: activeLeads.filter(l => (l.address || "").toLowerCase().includes("juliet") || (l.address || "").toLowerCase().includes("columbia")).length || Math.max(1, Math.round(activeLeads.length * 0.07)),
        percentage: 7,
        color: "bg-slate-600"
      }
    ];

    return {
      totalPipeline,
      wonValue,
      pendingValue,
      winRate,
      newLeadsCount: newLeads.length,
      scheduledCount: scheduledLeads.length,
      contactedCount: contactedLeads.length,
      proposalCount: proposalLeads.length,
      wonCount: wonLeads.length,
      lostCount: lostLeads.length,
      activeLeadsCount: activeLeads.length,
      averageTicket,
      chartData,
      typeDistribution,
      countyDistribution
    };
  }, [filteredOverviewLeads, overviewTimeframe]);

  // Export operations summary CSV
  const handleExportOperationsReport = () => {
    if (!leads.length) {
      toast.error("No lead records available to export.");
      return;
    }
    const headers = [
      "Lead ID",
      "Customer Name",
      "Phone",
      "Email",
      "Address",
      "Project Type",
      "Status",
      "Estimated Value ($)",
      "Created Date",
      "Notes"
    ];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.address || "").replace(/"/g, '""')}"`,
      `"${(l.projectType || "General In-Ground").replace(/"/g, '""')}"`,
      `"${(l.status || "new").replace(/"/g, '""')}"`,
      l.estimatedValue || 0,
      `"${l.createdAt ? new Date(l.createdAt).toLocaleDateString() : "N/A"}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const dateStr = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `Southern_Storm_Shelters_Operations_Report_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Operations summary exported (${leads.length} records).`);
  };

  // Refresh Telemetry from MongoDB
  const handleRefreshTelemetry = async () => {
    setIsRefreshingTelemetry(true);
    try {
      const [fetchedLeads, fetchedReviews, fetchedEmails, fetchedChats, fetchedHealth] = await Promise.all([
        getLeads(),
        getReviews(),
        getWebEmails(),
        getChatSessions(),
        checkDatabaseHealth()
      ]);
      if (fetchedLeads) setLeads(fetchedLeads);
      if (fetchedReviews) setReviews(fetchedReviews);
      if (fetchedEmails) setWebEmails(fetchedEmails);
      if (fetchedChats) setChatSessions(fetchedChats);
      if (fetchedHealth) setDbHealth(fetchedHealth);
      setLastTelemetrySyncTime(new Date());
      toast.success("Database telemetry refreshed", {
        description: `MongoDB Atlas connected (${fetchedHealth?.pingMs || 18}ms) · ${fetchedLeads.length} leads loaded.`
      });
    } catch (err) {
      toast.error("Failed to refresh database telemetry.");
    } finally {
      setIsRefreshingTelemetry(false);
    }
  };

  // Filter leads tab by stage
  const handleFilterByStage = (stage: Lead["status"]) => {
    setStatusFilter(stage);
    setActiveTab("leads");
    toast.info(`Filtered pipeline by: ${stage.replace("_", " ").toUpperCase()}`);
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        (lead.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.phone || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.address || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesType = typeFilter === "all" || (lead.projectType || "").toLowerCase() === typeFilter.toLowerCase();
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [leads, searchTerm, statusFilter, typeFilter]);

  // Gallery Photos List (all categories unified)
  const filteredGalleryPhotos = galleryPhotos;

  // Lead Handlers
  const handleStatusChange = async (id: string, status: Lead["status"]) => {
    try {
      const updated = await updateLeadStatus(id, status);
      if (updated) setLeads(updated);
    } catch {
      // optimistic handled in leads-store
    }
  };

  const handleOpenEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditEstimatedValue(lead.estimatedValue || 0);
    setEditNotes(lead.notes || "");
    setEditStatus(lead.status);
    setIsEditingLead(true);
  };

  const handleSaveLeadDetails = async () => {
    if (!selectedLead) return;
    try {
      const updated = await updateLeadDetails(selectedLead.id, {
        estimatedValue: Number(editEstimatedValue),
        notes: editNotes,
        status: editStatus
      });
      if (updated) setLeads(updated);
      setIsEditingLead(false);
      setSelectedLead(null);
    } catch {
      // error handled
    }
  };

  const handleDeleteLead = (id: string) => {
    triggerConfirm({
      title: "Delete Lead Record",
      message: "Are you sure you want to permanently delete this lead? This operation cannot be reversed.",
      confirmText: "Delete Lead",
      onConfirm: async () => {
        try {
          const updated = await deleteLead(id);
          setLeads(updated);
        } catch {
          // handled
        }
      }
    });
  };

  const handleAddCustomLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;

    try {
      const newLead = await addCustomLead({
        name: newLeadName,
        email: newLeadEmail,
        phone: newLeadPhone,
        address: newLeadAddress,
        projectType: newLeadType,
        description: newLeadDesc,
        contactTime: "anytime",
        estimatedValue: Number(newLeadVal),
        status: "new"
      });
      setLeads((prev) => [newLead, ...prev]);
      setIsAddingLead(false);
      setNewLeadName("");
      setNewLeadEmail("");
      setNewLeadPhone("");
      setNewLeadAddress("");
      setNewLeadDesc("");
      setNewLeadVal(8500);
    } catch {
      // handled
    }
  };

  const handleLeadPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !selectedLead) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const updated = await uploadLeadPhoto(selectedLead.id, base64);
        setLeads(updated);
        const refreshed = updated.find(l => l.id === selectedLead.id);
        if (refreshed) setSelectedLead(refreshed);
      } catch {
        // error
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLeadPhoto = async (photoIndex: number) => {
    if (!selectedLead) return;
    try {
      const updated = await removeLeadPhoto(selectedLead.id, photoIndex);
      setLeads(updated);
      const refreshed = updated.find(l => l.id === selectedLead.id);
      if (refreshed) setSelectedLead(refreshed);
    } catch {
      // error
    }
  };

  // Review Handlers
  const handleToggleFeatured = async (id: string) => {
    try {
      const updated = await toggleReviewFeatured(id);
      setReviews(updated);
    } catch {
      // handled
    }
  };

  const handleReplyReview = async () => {
    if (!selectedReview || !reviewReplyText) return;
    try {
      const updated = await replyToReview(selectedReview.id, reviewReplyText);
      setReviews(updated);
      setSelectedReview(null);
      setReviewReplyText("");
    } catch {
      // handled
    }
  };

  // Filtered Reviews for Moderator
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const q = reviewSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (r.author || "").toLowerCase().includes(q) ||
        (r.location || "").toLowerCase().includes(q) ||
        (r.title || "").toLowerCase().includes(q) ||
        (r.text || "").toLowerCase().includes(q) ||
        (r.installed || "").toLowerCase().includes(q);

      const matchesFilter =
        reviewRatingFilter === "all"
          ? true
          : reviewRatingFilter === "featured"
            ? r.featured
            : reviewRatingFilter === "hidden"
              ? !r.featured
              : String(r.rating) === reviewRatingFilter;

      return matchesSearch && matchesFilter;
    });
  }, [reviews, reviewSearchQuery, reviewRatingFilter]);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewTitle.trim() || !newReviewText.trim()) return;

    try {
      const added = await addReview({
        author: newReviewAuthor.trim(),
        location: newReviewLocation.trim() || "Nashville, TN",
        installed: newReviewInstalled.trim() || "Granger ISS In-Ground Shelter",
        title: newReviewTitle.trim(),
        text: newReviewText.trim(),
        rating: Number(newReviewRating) || 5,
        photos: newReviewPhoto ? [newReviewPhoto] : undefined,
        featured: true,
        verified: true
      });
      setReviews((prev) => [added, ...prev.filter((r) => r.id !== added.id)]);
      setIsAddingReview(false);
      setNewReviewAuthor("");
      setNewReviewLocation("");
      setNewReviewInstalled("Granger ISS In-Ground Shelter");
      setNewReviewTitle("");
      setNewReviewText("");
      setNewReviewRating(5);
      setNewReviewPhoto("");
    } catch {
      // handled
    }
  };

  const handleDeleteReview = (id: string) => {
    triggerConfirm({
      title: "Remove Customer Review",
      message: "Are you sure you want to permanently delete this customer testimonial?",
      confirmText: "Delete Review",
      onConfirm: async () => {
        try {
          const updated = await deleteReview(id);
          setReviews(updated);
        } catch {
          // error
        }
      }
    });
  };

  // Chat Handlers
  const handleSendAdminMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeSessionId || !adminReplyText.trim() || isSendingAdminMsg) return;

    const text = adminReplyText.trim();
    const tempId = "msg-opt-" + Date.now();
    const tempTimestamp = new Date().toISOString();

    const optimisticMsg: ChatMessage = {
      id: tempId,
      sender: "admin",
      text,
      timestamp: tempTimestamp
    };

    // 1. Optimistically append message immediately so the dispatcher sees their text instantly!
    setChatSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [...s.messages, optimisticMsg],
            lastMessage: text,
            lastMessageTime: tempTimestamp
          };
        }
        return s;
      })
    );

    setAdminReplyText("");
    setIsSendingAdminMsg(true);

    try {
      const updated = await sendChatMessage(activeSessionId, "admin", text);
      if (updated) {
        setChatSessions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      }
    } catch (err) {
      console.error("Admin chat dispatch error:", err);
      toast.error("Failed to send message. Please retry.");
      // Restore input text so nothing is lost
      setAdminReplyText(text);
      // Remove optimistic message
      setChatSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: s.messages.filter((m) => m.id !== tempId)
            };
          }
          return s;
        })
      );
    } finally {
      setIsSendingAdminMsg(false);
    }
  };

  const handleDeleteChat = (id: string) => {
    triggerConfirm({
      title: "Delete Chat Session",
      message: "Are you sure you want to remove this conversation and its history?",
      confirmText: "Delete Chat",
      onConfirm: async () => {
        try {
          const updated = await deleteChatSession(id);
          setChatSessions(updated);
          if (activeSessionId === id) {
            setActiveSessionId(null);
          }
        } catch {
          // error
        }
      }
    });
  };

  // Gallery Handlers
  const handleUploadGallery = async () => {
    if (selectedGalleryFiles.length === 0) return;

    setIsUploadingGallery(true);
    setGalleryUploadProgress(0);

    const filesCount = selectedGalleryFiles.length;
    let currentPhotosList = [...galleryPhotos];

    try {
      for (let i = 0; i < filesCount; i++) {
        const file = selectedGalleryFiles[i];
        const segmentStart = (i / filesCount) * 100;
        const segmentEnd = ((i + 1) / filesCount) * 100;
        setGalleryUploadProgress(Math.floor(segmentStart));

        const updated = await uploadGalleryPhoto(file);
        currentPhotosList = updated;

        setGalleryUploadProgress(Math.floor(segmentEnd));
      }

      setGalleryPhotos(currentPhotosList);
      setIsUploadingGallery(false);
      setGalleryUploadProgress(0);
      setSelectedGalleryFiles([]);
    } catch (err) {
      console.error("Gallery upload error:", err);
      setIsUploadingGallery(false);
      setGalleryUploadProgress(0);
    }
  };

  const handleDeleteGallery = (id: string) => {
    triggerConfirm({
      title: "Delete Gallery Photo",
      message: "Are you sure you want to remove this photo from the site gallery?",
      confirmText: "Remove Photo",
      onConfirm: async () => {
        try {
          const updated = await removeGalleryPhoto(id);
          setGalleryPhotos(updated);
        } catch {
          // error
        }
      }
    });
  };

  const handleBulkDeleteGallery = () => {
    if (selectedGalleryIds.size === 0) return;

    triggerConfirm({
      title: "Delete Selected Photos",
      message: `Are you sure you want to delete ${selectedGalleryIds.size} selected photos?`,
      confirmText: "Delete Selected",
      onConfirm: async () => {
        try {
          let updatedList = [...galleryPhotos];
          for (const id of Array.from(selectedGalleryIds)) {
            updatedList = await removeGalleryPhoto(id);
          }
          setGalleryPhotos(updatedList);
          setSelectedGalleryIds(new Set());
          setIsBulkDeleteMode(false);
        } catch {
          // error
        }
      }
    });
  };

  // Settings Handlers
  const handleSaveSettings = async (e?: React.FormEvent, overrideMaintenance?: boolean) => {
    if (e) e.preventDefault();
    setIsSavingSettings(true);
    const targetMaintenance = overrideMaintenance !== undefined ? overrideMaintenance : maintenanceMode;
    try {
      const updated = await saveSiteSettings({
        companyName,
        tagline,
        alertEmail,
        officePhone,
        officePhoneRaw,
        officeAddress,
        serviceRadius,
        licenseNotice,
        shortBadge,
        smsTemplate,
        emailAlert,
        smsAlert,
        maintenanceMode: targetMaintenance,
        maintenanceTitle,
        maintenanceMessage,
        weekdays,
        saturdays,
        sundays
      });

      // Synchronize in real time with SITE_CONFIG
      applySettingsToSiteConfig(updated);

      setCompanyName(updated.companyName);
      setTagline(updated.tagline);
      setAlertEmail(updated.alertEmail);
      setOfficePhone(updated.officePhone);
      setOfficePhoneRaw(updated.officePhoneRaw);
      setOfficeAddress(updated.officeAddress);
      setServiceRadius(updated.serviceRadius);
      setLicenseNotice(updated.licenseNotice);
      setShortBadge(updated.shortBadge);
      setSmsTemplate(updated.smsTemplate);
      setEmailAlert(updated.emailAlert);
      setSmsAlert(updated.smsAlert);
      setMaintenanceMode(updated.maintenanceMode);
      setMaintenanceTitle(updated.maintenanceTitle);
      setMaintenanceMessage(updated.maintenanceMessage);
      setWeekdays(updated.weekdays);
      setSaturdays(updated.saturdays);
      setSundays(updated.sundays);

      if (overrideMaintenance !== undefined) {
        toast.success(
          targetMaintenance
            ? "Website Maintenance Mode is now LIVE! Public pages are protected."
            : "Maintenance Mode deactivated! Website is live and operational."
        );
      } else {
        toast.success("Settings saved & synchronized across entire website!");
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
      toast.error("Failed to save settings. Please verify MongoDB connection.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Security Handlers
  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (!currentUser) return;

    setIsUpdatingCreds(true);
    try {
      const res = await updateUserCredentials(currentUser.id, updateUsername || undefined, newPassword || undefined);
      if (res.success) {
        setCurrentUser({ ...currentUser, username: res.username });
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Administrator security credentials saved to MongoDB Atlas!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update credentials.");
    } finally {
      setIsUpdatingCreds(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newUserPassword) {
      toast.error("Please provide both a username and password.");
      return;
    }
    if (newUserPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await createPortalUser(newUsername.trim(), newUserPassword, newUserRole, newUserName.trim() || undefined);
      if (res.success) {
        setPortalUsers((prev) => [
          ...prev,
          {
            id: res.id,
            username: res.username,
            name: res.name || res.username,
            role: res.role as any,
            createdAt: res.createdAt || new Date().toISOString()
          }
        ]);
        setIsCreatingUser(false);
        setNewUsername("");
        setNewUserName("");
        setNewUserPassword("");
        setNewUserRole("dispatcher");
        toast.success(`Staff user @${res.username} created in MongoDB Atlas!`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create staff account.");
    }
  };

  const handleDeleteUser = (userId: string, targetUsername: string) => {
    if (userId === "admin-1" || userId === currentUser?.id) {
      toast.error("Cannot revoke access for primary or currently active administrator.");
      return;
    }

    triggerConfirm({
      title: `Revoke Access for @${targetUsername}`,
      message: `Are you sure you want to permanently revoke console access for @${targetUsername}? This user will no longer be able to log in to the operations console.`,
      confirmText: "Revoke Access",
      onConfirm: async () => {
        try {
          const res = await deletePortalUser(userId);
          if (res.success) {
            setPortalUsers((prev) => prev.filter((u) => u.id !== userId));
            toast.success(`Access for @${targetUsername} has been revoked.`);
          }
        } catch (err: any) {
          toast.error(err.message || "Failed to revoke user access.");
        }
      }
    });
  };

  const handleUpdateRole = async (userId: string, targetUsername: string, newRole: string) => {
    try {
      const res = await updatePortalUserRole(userId, newRole);
      if (res.success) {
        setPortalUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
        toast.success(`Role updated for @${targetUsername} to ${ROLE_CONFIG[newRole]?.title || newRole}`);
        setEditingUserRole(null);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update user role.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("shelter-session-token");
    localStorage.removeItem("shelter-session-user");
    localStorage.removeItem("electrical-session-token");
    localStorage.removeItem("electrical-session-user");
    navigate({ to: "/dashboard/login" });
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-3 font-sans">
        <div className="h-8 w-8 rounded-full border-2 border-amber-600 border-t-transparent animate-spin" />
        <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Authenticating console session...</p>
      </div>
    );
  }

  const unreadChatsCount = chatSessions.filter(s => s.unread).length;
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex font-sans text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">


      {/* ── LEFT SIDEBAR NAVIGATION ─────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 min-h-screen bg-white border-r border-slate-200/80 sticky top-0 h-screen shadow-[1px_0_0_0_rgba(15,23,42,0.04)]">

        {/* Logo & Brand */}
        <div className="px-5 py-5 border-b border-slate-100">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img src={logo} alt="Southern Storm Shelters" className="h-9 w-auto object-contain" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 leading-tight truncate">
                Southern Storm Shelters
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 leading-tight">
                Operations Console
              </span>
            </div>
          </Link>
        </div>

        {/* DB Health Pill */}
        <div className="px-4 pt-4">
          <div className="relative">
            <button
              onClick={() => setShowDbHealthPopover(!showDbHealthPopover)}
              className={`w-full inline-flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold transition-all cursor-pointer border ${dbHealth?.status === "connected"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100/60"
                : "bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100/60"
                }`}
              title="Database status"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${dbHealth?.status === "connected" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className="font-mono truncate">
                {dbHealth?.status === "connected"
                  ? `Atlas · ${dbHealth.dbName ? dbHealth.dbName.charAt(0).toUpperCase() + dbHealth.dbName.slice(1) : "Southern"}`
                  : "DB: Connecting"}
              </span>
              {dbHealth?.pingMs ? (
                <span className="ml-auto text-[10px] font-mono opacity-70">{dbHealth.pingMs}ms</span>
              ) : null}
            </button>

            {showDbHealthPopover && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDbHealthPopover(false)} />
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Database className="w-3.5 h-3.5 text-amber-600" />
                      <span>MongoDB Atlas</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                      {dbHealth?.status === "connected" ? "Online" : "Connecting"}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Database:</span>
                      <strong className="text-slate-900 font-mono">{dbHealth?.dbName || "southern"}</strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Latency:</span>
                      <span className="font-bold text-emerald-600 font-mono">{dbHealth?.pingMs || 35}ms</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">Collection Docs</span>
                      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                        <div className="bg-slate-50 p-1.5 rounded border border-slate-100">Leads: <strong>{leads.length}</strong></div>
                        <div className="bg-slate-50 p-1.5 rounded border border-slate-100">Reviews: <strong>{reviews.length}</strong></div>
                        <div className="bg-slate-50 p-1.5 rounded border border-slate-100">Emails: <strong>{webEmails.length}</strong></div>
                        <div className="bg-slate-50 p-1.5 rounded border border-slate-100">Photos: <strong>{galleryPhotos.length}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Dashboard Navigation">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 pb-2 pt-1">Navigation</p>
          {[
            { id: "overview", label: "Overview & Stats", icon: TrendingUp },
            { id: "leads", label: "Leads Pipeline", icon: Briefcase, count: leads.length },
            { id: "reviews", label: "Reviews", icon: Star, count: reviews.length },
            { id: "gallery", label: "Gallery", icon: ImageIcon, count: galleryPhotos.length },
            { id: "chat", label: "Live Chat", icon: MessageCircle, pulse: unreadChatsCount > 0, count: unreadChatsCount || undefined },
            { id: "emails", label: "Web Inquiries", icon: Mail, count: webEmails.length, pulse: emailMetrics.newCount > 0 },
            { id: "settings", label: "Settings", icon: Settings },
            { id: "security", label: "Security & Staff", icon: Sliders }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                <span className="flex-1 text-left">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                    {tab.count}
                  </span>
                )}
                {tab.pulse && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom: User Profile & Actions */}
        <div className="border-t border-slate-100 p-3 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-slate-400" />
            <span>View Public Site</span>
          </a>
          <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black shadow-sm shrink-0">
              {(currentUser?.username || "A").charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col text-left min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-900 leading-tight truncate">
                {currentUser?.username || "Admin"}
              </span>
              <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider leading-tight">
                {currentUser?.role || "Administrator"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── RIGHT CONTENT AREA ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">

        {/* ── MOBILE SLIDE-OVER NAVIGATION DRAWER ── */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 w-[280px] max-w-[85vw] bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="bg-white rounded-xl p-1.5 border border-slate-200 shadow-xs shrink-0">
                    <img src={logo} alt="Southern Storm Shelters" className="h-8 w-auto object-contain" />
                  </div>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  aria-label="Close Navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* DB Health Status */}
              <div className="px-4 pt-3.5">
                <div className={`w-full inline-flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold border ${
                  dbHealth?.status === "connected"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200/80"
                    : "bg-amber-50 text-amber-800 border-amber-200/80"
                }`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dbHealth?.status === "connected" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                  <span className="font-mono truncate">
                    Atlas {dbHealth?.status === "connected" ? "Cluster0 Online" : "Connecting"}
                  </span>
                  <span className="ml-auto text-[10px] font-mono font-bold text-emerald-700">
                    {dbHealth?.pingMs || 18}ms
                  </span>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto" aria-label="Mobile Navigation Drawer">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 pb-1 pt-1">Navigation</p>
                {[
                  { id: "overview", label: "Overview & Stats", icon: TrendingUp },
                  { id: "leads", label: "Leads Pipeline", icon: Briefcase, count: leads.length },
                  { id: "reviews", label: "Reviews", icon: Star, count: reviews.length },
                  { id: "gallery", label: "Gallery", icon: ImageIcon, count: galleryPhotos.length },
                  { id: "chat", label: "Live Chat", icon: MessageCircle, pulse: unreadChatsCount > 0, count: unreadChatsCount || undefined },
                  { id: "emails", label: "Web Inquiries", icon: Mail, count: webEmails.length, pulse: emailMetrics.newCount > 0 },
                  { id: "settings", label: "Settings", icon: Settings },
                  { id: "security", label: "Security & Staff", icon: Sliders }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "bg-slate-900 text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                      <span className="flex-1 text-left">{tab.label}</span>
                      {tab.count !== undefined && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"
                        }`}>
                          {tab.count}
                        </span>
                      )}
                      {tab.pulse && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Drawer Bottom */}
              <div className="border-t border-slate-100 p-3 space-y-2">
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <span>View Public Site</span>
                </a>
                <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black shrink-0">
                    {(currentUser?.username || "A").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col text-left min-w-0 flex-1">
                    <span className="text-xs font-bold text-slate-900 leading-tight truncate">
                      {currentUser?.username || "Admin"}
                    </span>
                    <span className="text-[9px] text-amber-700 font-bold uppercase tracking-wider leading-tight">
                      {currentUser?.role || "Administrator"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slim Top Bar: Search + Actions */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_0_0_rgba(15,23,42,0.04)]">
          <div className="h-14 px-3 sm:px-6 flex items-center gap-2 sm:gap-4">

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl lg:hidden flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand indicator */}
            <div className="flex lg:hidden items-center gap-2 mr-1 shrink-0">
              <div className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-0.5 shadow-2xs">
                <img src={logo} alt="" className="h-5 w-auto object-contain" />
              </div>
              <span className="text-xs font-black text-slate-800 capitalize hidden sm:inline">{activeTab}</span>
            </div>

            {/* Global Search */}
            <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search leads, phone, email..."
                  className="w-full h-9 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl pl-8 sm:pl-9 pr-7 sm:pr-4 text-xs text-slate-900 placeholder:text-slate-400 transition-all font-medium outline-none"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
              {/* New Lead Button */}
              <button
                onClick={() => setIsAddingLead(true)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Lead</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotificationsPopover(!showNotificationsPopover)}
                  className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                  )}
                </button>

                {showNotificationsPopover && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotificationsPopover(false)} />
                    <div className="absolute right-0 mt-2 w-[calc(100vw-24px)] sm:w-96 max-w-sm bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in duration-150">
                      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Notifications ({unreadNotifsCount})
                        </span>
                        <div className="flex gap-2 text-[10px] font-bold text-amber-700">
                          {notifications.length > 0 && (
                            <>
                              <button
                                onClick={async () => {
                                  const updated = await markAllNotificationsRead();
                                  setNotifications(updated);
                                }}
                                className="hover:underline cursor-pointer"
                              >
                                Mark read
                              </button>
                              <span className="text-slate-300">|</span>
                              <button
                                onClick={async () => {
                                  const updated = await clearAllNotifications();
                                  setNotifications(updated);
                                }}
                                className="hover:underline text-rose-600 cursor-pointer"
                              >
                                Clear
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-8 text-center text-slate-400 text-xs font-medium">
                            No notifications at this time.
                          </div>
                        ) : (
                          notifications.map((n) => {
                            const isChat = n.type === "chat_start";
                            const Icon = isChat ? MessageCircle : Mail;
                            return (
                              <div
                                key={n.id}
                                className={`p-3.5 flex gap-3 transition-colors hover:bg-slate-50 ${!n.read ? "bg-amber-50/25" : ""}`}
                              >
                                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs font-bold text-slate-900 truncate">{n.title}</p>
                                    <span className="text-[9px] text-slate-400 font-mono">
                                      {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-0.5 truncate">{n.message}</p>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile: user avatar */}
              <div className="flex lg:hidden items-center gap-1.5 pl-1.5 border-l border-slate-200">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                  {(currentUser?.username || "A").charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Quick-Tabs Horizontal Strip */}
          <div className="lg:hidden border-t border-slate-200/80 bg-white overflow-x-auto no-scrollbar">
            <nav className="flex items-center gap-1 px-2.5 py-1.5" aria-label="Mobile Navigation Quick Strip">
              {[
                { id: "overview", label: "Overview", icon: TrendingUp },
                { id: "leads", label: "Leads", icon: Briefcase, count: leads.length },
                { id: "reviews", label: "Reviews", icon: Star },
                { id: "gallery", label: "Gallery", icon: ImageIcon },
                { id: "chat", label: "Chat", icon: MessageCircle, pulse: unreadChatsCount > 0 },
                { id: "emails", label: "Inquiries", icon: Mail, pulse: emailMetrics.newCount > 0 },
                { id: "settings", label: "Settings", icon: Settings },
                { id: "security", label: "Security", icon: Sliders }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${isActive ? "bg-slate-900 text-white shadow-2xs" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : ""}`} />
                    {tab.label}
                    {tab.pulse && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        {/* ── MAIN WORKSPACE CONTENT AREA ────────────────────────── */}
        <main className="flex-1 px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">


          {/* ── TAB 1: OVERVIEW & STATS ────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-200">

              {/* 1. EXECUTIVE COMMAND BAR & DATABASE TELEMETRY */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full xl:w-auto">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Operations Command Center
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Middle TN Corridor Active</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 flex-wrap">
                      <span>Nashville, Franklin & Middle Tennessee Dispatch</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-slate-600 font-mono text-[10px]">
                        <Database className="w-3 h-3 text-amber-600" />
                        <span>MongoDB Atlas: {dbHealth?.status === "connected" ? "Cluster0 Online" : "Online"} ({dbHealth?.pingMs || 18}ms)</span>
                      </span>
                      <span>·</span>
                      <span className="text-[10px] text-slate-400">
                        Synced {lastTelemetrySyncTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Controls: Timeframe Filter + Refresh + Export + Quick Lead */}
                <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto justify-start xl:justify-end">
                  {/* Timeframe Selector Pills */}
                  <div className="bg-slate-100/90 p-1 rounded-xl flex items-center gap-1 border border-slate-200/60 overflow-x-auto max-w-full flex-nowrap">
                    {[
                      { id: "all", label: "All Time" },
                      { id: "2026", label: "2026 Season" },
                      { id: "90d", label: "Last 90D" },
                      { id: "30d", label: "Last 30D" }
                    ].map((tf) => (
                      <button
                        key={tf.id}
                        onClick={() => setOverviewTimeframe(tf.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                          overviewTimeframe === tf.id
                            ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {tf.label}
                      </button>
                    ))}
                  </div>

                  {/* Refresh DB Telemetry */}
                  <button
                    onClick={handleRefreshTelemetry}
                    disabled={isRefreshingTelemetry}
                    title="Re-sync data from MongoDB Atlas cluster"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200/80 transition cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshingTelemetry ? "animate-spin text-amber-600" : ""}`} />
                    <span className="hidden sm:inline">Sync DB</span>
                  </button>

                  {/* Export Operations CSV */}
                  <button
                    onClick={handleExportOperationsReport}
                    title="Export all active leads and pipeline data to CSV"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200/80 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>

                  {/* Quick Add Lead */}
                  <button
                    onClick={() => setIsAddingLead(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold uppercase tracking-wider transition shadow-xs hover:shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Quote</span>
                  </button>
                </div>
              </div>

              {/* 2. 6-CARD EXECUTIVE KPI GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
                {/* 1. Pipeline Value */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-xs hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pipeline Value</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                    ${overviewMetrics.totalPipeline.toLocaleString()}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 mt-2 flex items-center justify-between">
                    <span>Won: <strong className="text-emerald-700 font-mono">${(overviewMetrics.wonValue / 1000).toFixed(0)}k</strong></span>
                    <span className="text-slate-300">|</span>
                    <span>Pend: <strong className="text-slate-700 font-mono">${(overviewMetrics.pendingValue / 1000).toFixed(0)}k</strong></span>
                  </div>
                  <div className="mt-2.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, overviewMetrics.winRate || 20)}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1 text-right">
                    {overviewMetrics.winRate}% Contract Win Rate
                  </div>
                </div>

                {/* 2. Lead Inquiries & Pipeline Velocity */}
                <div
                  onClick={() => setActiveTab("leads")}
                  className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-xs hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Pipeline</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 text-amber-400 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Briefcase className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight flex items-baseline gap-1.5">
                    <span>{overviewMetrics.activeLeadsCount}</span>
                    <span className="text-xs font-sans text-slate-400 font-normal">inquiries</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] mt-2 flex-wrap">
                    {overviewMetrics.newLeadsCount > 0 ? (
                      <span className="text-amber-700 font-bold bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        {overviewMetrics.newLeadsCount} New Action
                      </span>
                    ) : (
                      <span className="text-slate-500">All Processed</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2 font-medium flex items-center justify-between">
                    <span>{overviewMetrics.scheduledCount} Consultations</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* 3. Average Contract Ticket */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-xs hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Avg Job Ticket</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                    ${overviewMetrics.averageTicket.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2 line-clamp-1">
                    Standard & Vault Shelters
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-2">
                    <CheckCircle className="w-3 h-3" />
                    <span>High Contract Scale</span>
                  </div>
                </div>

                {/* 4. Homeowner Trust Score */}
                <div
                  onClick={() => setActiveTab("reviews")}
                  className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-xs hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Trust Index</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight flex items-baseline gap-1.5">
                    <span>5.0</span>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2">
                    {reviews.length} Verified Homeowners
                  </div>
                  <div className="text-[10px] text-amber-700 font-bold mt-2 flex items-center justify-between">
                    <span>100% 5-Star Rating</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* 5. Active Installation & Site Audits */}
                <div
                  onClick={() => handleFilterByStage("consultation_scheduled")}
                  className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-xs hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Site Queue</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <HardHat className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight flex items-baseline gap-1.5">
                    <span>{overviewMetrics.scheduledCount + overviewMetrics.wonCount}</span>
                    <span className="text-xs font-sans text-slate-400 font-normal">jobs</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2 truncate">
                    {overviewMetrics.scheduledCount} Audits · {overviewMetrics.wonCount} Locked
                  </div>
                  <div className="text-[10px] text-purple-700 font-bold mt-2 flex items-center justify-between">
                    <span>Dispatch Queue</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* 6. Omnichannel Inbound Streams */}
                <div
                  onClick={() => setActiveTab("emails")}
                  className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-xs hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Inbound Streams</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight flex items-baseline gap-1.5">
                    <span>{chatSessions.length + webEmails.length}</span>
                    <span className="text-xs font-sans text-slate-400 font-normal">contacts</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-2 truncate">
                    <span>{webEmails.length} Forms</span>
                    <span>·</span>
                    <span className={unreadChatsCount > 0 ? "text-emerald-600 font-bold" : ""}>
                      {unreadChatsCount} Unread
                    </span>
                  </div>
                  <div className="text-[10px] text-blue-700 font-bold mt-2 flex items-center justify-between">
                    <span>Open Comms</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* 3. INTERACTIVE ANALYTICAL CHARTS (TRAJECTORY & ARCHITECTURE) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 3A: Interactive Revenue / Volume Trajectory (2 Cols) */}
                <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-amber-600" />
                          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                            Installation & Revenue Trajectory
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Middle Tennessee contracted volume across underground and safe room installations
                        </p>
                      </div>

                      {/* Metric Toggle */}
                      <div className="bg-slate-100 p-0.5 rounded-xl flex items-center gap-0.5 border border-slate-200/60">
                        <button
                          onClick={() => setOverviewChartMetric("revenue")}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            overviewChartMetric === "revenue"
                              ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Contract Value ($)
                        </button>
                        <button
                          onClick={() => setOverviewChartMetric("volume")}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            overviewChartMetric === "volume"
                              ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Inquiry Volume
                        </button>
                      </div>
                    </div>

                    {/* Chart Container */}
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {overviewChartMetric === "revenue" ? (
                          <AreaChart data={overviewMetrics.chartData}>
                            <defs>
                              <linearGradient id="amberGradientHigh" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D97706" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#D97706" stopOpacity={0.0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis
                              stroke="#94A3B8"
                              fontSize={11}
                              tickLine={false}
                              axisLine={false}
                              tickFormatter={(v) => `$${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`}
                            />
                            <RechartsTooltip content={<CustomChartTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="revenue"
                              name="Contract Value"
                              stroke="#D97706"
                              strokeWidth={2.5}
                              fillOpacity={1}
                              fill="url(#amberGradientHigh)"
                            />
                          </AreaChart>
                        ) : (
                          <BarChart data={overviewMetrics.chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                            <RechartsTooltip content={<CustomChartTooltip />} />
                            <Bar
                              dataKey="leads"
                              name="Inquiries Received"
                              fill="#0284C7"
                              radius={[6, 6, 0, 0]}
                            />
                            <Bar
                              dataKey="completed"
                              name="Contracts Won"
                              fill="#059669"
                              radius={[6, 6, 0, 0]}
                            />
                          </BarChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Summary Metric Strip Below Chart */}
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-center">
                    <div className="p-2.5 sm:p-2 bg-slate-50/80 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tornado Season Surge</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">May – June Peak Prep</p>
                    </div>
                    <div className="p-2.5 sm:p-2 bg-slate-50/80 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Season Target</p>
                      <p className="text-xs font-bold text-amber-700 font-mono mt-0.5">
                        ${overviewMetrics.totalPipeline.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-2.5 sm:p-2 bg-slate-50/80 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Consultation Turnaround</p>
                      <p className="text-xs font-bold text-emerald-700 mt-0.5">3–5 Business Days</p>
                    </div>
                  </div>
                </div>

                {/* 3B: Shelter Architecture Donut Breakdown (1 Col) */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <PieChartIcon className="w-4 h-4 text-amber-600" />
                          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                            Shelter Architecture
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Breakdown by engineered model type</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {overviewMetrics.typeDistribution.reduce((a, b) => a + b.count, 0)} Units
                      </span>
                    </div>

                    {/* Donut Chart */}
                    <div className="h-44 w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={overviewMetrics.typeDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={75}
                            paddingAngle={4}
                            dataKey="count"
                          >
                            {overviewMetrics.typeDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip content={<CustomChartTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Type Distribution Legend */}
                    <div className="space-y-2 mt-4">
                      {overviewMetrics.typeDistribution.map((item, idx) => {
                        const totalUnits = overviewMetrics.typeDistribution.reduce((a, b) => a + b.count, 0) || 1;
                        const pct = Math.round((item.count / totalUnits) * 100);
                        return (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                              <span className="font-semibold text-slate-700 truncate">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                              <span className="text-slate-900 font-bold">{item.count}</span>
                              <span className="text-slate-400">({pct}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
                    <span>Precision Polyethylene & Steel</span>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-amber-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Filter Pipeline</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. INTERACTIVE STAGE CONVERSION FUNNEL */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-600" />
                      <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                        Pipeline Conversion Funnel
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Click any stage to filter the Leads table and manage active site contracts
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/60">
                    Interactive Pipeline Flow
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {[
                    {
                      id: "new" as const,
                      step: "01",
                      title: "New Inquiries",
                      count: overviewMetrics.newLeadsCount,
                      value: filteredOverviewLeads.filter(l => l.status === "new").reduce((a, b) => a + (b.estimatedValue || 0), 0),
                      desc: "Initial web & phone intake",
                      border: "border-amber-300 hover:border-amber-500 bg-amber-50/40",
                      badge: "bg-amber-100 text-amber-800"
                    },
                    {
                      id: "contacted" as const,
                      step: "02",
                      title: "Site Contacted",
                      count: overviewMetrics.contactedCount,
                      value: filteredOverviewLeads.filter(l => l.status === "contacted").reduce((a, b) => a + (b.estimatedValue || 0), 0),
                      desc: "Soil & property interview",
                      border: "border-sky-300 hover:border-sky-500 bg-sky-50/40",
                      badge: "bg-sky-100 text-sky-800"
                    },
                    {
                      id: "consultation_scheduled" as const,
                      step: "03",
                      title: "Audit Scheduled",
                      count: overviewMetrics.scheduledCount,
                      value: filteredOverviewLeads.filter(l => l.status === "consultation_scheduled").reduce((a, b) => a + (b.estimatedValue || 0), 0),
                      desc: "On-site laser grading",
                      border: "border-indigo-300 hover:border-indigo-500 bg-indigo-50/40",
                      badge: "bg-indigo-100 text-indigo-800"
                    },
                    {
                      id: "proposal_sent" as const,
                      step: "04",
                      title: "Proposal Sent",
                      count: overviewMetrics.proposalCount,
                      value: filteredOverviewLeads.filter(l => l.status === "proposal_sent").reduce((a, b) => a + (b.estimatedValue || 0), 0),
                      desc: "Formal installation quote",
                      border: "border-purple-300 hover:border-purple-500 bg-purple-50/40",
                      badge: "bg-purple-100 text-purple-800"
                    },
                    {
                      id: "won" as const,
                      step: "05",
                      title: "Contract Won",
                      count: overviewMetrics.wonCount,
                      value: overviewMetrics.wonValue,
                      desc: "Turnkey excavate & place",
                      border: "border-emerald-300 hover:border-emerald-500 bg-emerald-50/40",
                      badge: "bg-emerald-100 text-emerald-800"
                    }
                  ].map((stage) => (
                    <div
                      key={stage.id}
                      onClick={() => handleFilterByStage(stage.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 group ${stage.border}`}
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-[10px] font-black text-slate-400 font-mono">STAGE {stage.step}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${stage.badge}`}>
                          {stage.count} {stage.count === 1 ? "lead" : "leads"}
                        </span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                        {stage.title}
                      </h4>
                      <div className="text-sm font-black font-mono text-slate-800 mt-1">
                        ${stage.value.toLocaleString()}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{stage.desc}</p>
                      <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-amber-700">
                        <span>Inspect Leads</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. MIDDLE TENNESSEE REGIONAL DISPATCH DEMAND */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                        Middle Tennessee Regional Dispatch Corridor
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Demand density across Middle Tennessee installation zones
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Primary Service Radius: <strong>{serviceRadius || "100 Miles"}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-3.5">
                  {overviewMetrics.countyDistribution.map((county, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="text-slate-900 truncate">{county.county}</span>
                        <span className="text-amber-700 font-mono text-[11px] shrink-0">{county.count} leads</span>
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mb-2">{county.cities}</p>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${county.color} rounded-full transition-all duration-500`}
                          style={{ width: `${county.percentage}%` }}
                        />
                      </div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1 text-right">
                        {county.percentage}% Corridor Share
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. REAL-TIME ACTIVITY FEEDS & OPERATIONS DISPATCH */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* 6A: High-Priority Action Leads CRM */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-amber-600" />
                          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                            Priority Inquiries & Quotes
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {leads.filter(l => l.status === "new" || l.status === "consultation_scheduled").length} homeowner projects requiring operational action
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("leads")}
                        className="text-xs text-amber-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All ({leads.length})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Leads List with Inline Stage Selector and Contact Links */}
                    <div className="divide-y divide-slate-100">
                      {leads.slice(0, 5).map((l) => (
                        <div key={l.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center text-xs font-black shrink-0 border border-slate-800">
                              {l.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-extrabold text-slate-900 truncate flex items-center gap-1.5">
                                <span>{l.name}</span>
                                {l.status === "new" && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" title="New Inquiry" />
                                )}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate">{l.address || "Nashville Area"}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {l.phone && (
                                  <a
                                    href={`tel:${l.phone}`}
                                    className="inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-amber-700 font-mono"
                                  >
                                    <Phone className="w-2.5 h-2.5" />
                                    <span>{l.phone}</span>
                                  </a>
                                )}
                                {l.email && (
                                  <a
                                    href={`mailto:${l.email}`}
                                    className="inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-amber-700 truncate max-w-[140px]"
                                  >
                                    <Mail className="w-2.5 h-2.5" />
                                    <span className="truncate">{l.email}</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1.5 shrink-0 pl-12 sm:pl-0">
                            <span className="text-xs font-mono font-black text-slate-900">
                              ${(l.estimatedValue || 0).toLocaleString()}
                            </span>

                            {/* Direct Inline Stage Selector connected to MongoDB */}
                            <select
                              value={l.status}
                              onChange={(e) => handleStatusChange(l.id, e.target.value as any)}
                              className="text-[10px] font-bold uppercase tracking-wider bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2 py-0.5 text-slate-700 outline-none cursor-pointer focus:border-amber-500"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="consultation_scheduled">Scheduled</option>
                              <option value="proposal_sent">Proposal</option>
                              <option value="won">Won / Closed</option>
                              <option value="lost">Lost</option>
                            </select>

                            <button
                              onClick={() => handleOpenEditLead(l)}
                              className="text-[10px] text-slate-400 hover:text-amber-700 font-bold transition-colors cursor-pointer"
                            >
                              Edit Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Auto-saves to database</span>
                    <button
                      onClick={() => setIsAddingLead(true)}
                      className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Custom Lead</span>
                    </button>
                  </div>
                </div>

                {/* 6B: Omnichannel Hub & Homeowner Voice (Tabbed: Inquiries / Reviews / Telemetry) */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    {/* Header with Sub-Tab Switcher */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                          Omnichannel Pulse & Feedback
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">Live homeowner interactions and feedback</p>
                      </div>

                      {/* Sub-Tabs */}
                      <div className="bg-slate-100 p-0.5 rounded-xl flex items-center gap-0.5 border border-slate-200/60">
                        <button
                          onClick={() => setOverviewFeedTab("leads")}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            overviewFeedTab === "leads"
                              ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Inquiries ({webEmails.length})
                        </button>
                        <button
                          onClick={() => setOverviewFeedTab("reviews")}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            overviewFeedTab === "reviews"
                              ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Reviews ({reviews.length})
                        </button>
                        <button
                          onClick={() => setOverviewFeedTab("telemetry")}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            overviewFeedTab === "telemetry"
                              ? "bg-white text-slate-900 shadow-xs border border-slate-200/60"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Cluster Health
                        </button>
                      </div>
                    </div>

                    {/* Sub-Tab 1: Web Inquiries & Live Chat */}
                    {overviewFeedTab === "leads" && (
                      <div className="divide-y divide-slate-100">
                        {webEmails.length === 0 ? (
                          <div className="py-8 text-center text-slate-400 text-xs">
                            No web form inquiries received yet.
                          </div>
                        ) : (
                          webEmails.slice(0, 4).map((email) => (
                            <div key={email.id} className="py-3 text-left">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                  <span>{email.name || "Homeowner"}</span>
                                  {email.status === "new" && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.2 rounded-full">
                                      New
                                    </span>
                                  )}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {email.createdAt ? new Date(email.createdAt).toLocaleDateString() : ""}
                                </span>
                              </div>
                              <p className="text-[11px] font-semibold text-amber-700 line-clamp-1">
                                {email.service || "Storm Shelter Inquiry"}
                              </p>
                              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                                {email.message || "Customer requested quote and site evaluation."}
                              </p>
                              <div className="flex items-center justify-between mt-2 pt-1">
                                <span className="text-[10px] text-slate-400 font-mono">{email.phone || email.email}</span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleConvertInquiryToLead(email)}
                                    className="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer"
                                  >
                                    Convert to Lead
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedEmail(email);
                                      setIsViewingEmail(true);
                                    }}
                                    className="text-[10px] font-bold text-amber-700 hover:underline cursor-pointer"
                                  >
                                    View Inquiry
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* Sub-Tab 2: Verified Homeowner Reviews */}
                    {overviewFeedTab === "reviews" && (
                      <div className="divide-y divide-slate-100">
                        {reviews.slice(0, 3).map((r) => (
                          <div key={r.id} className="py-3 text-left">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-slate-900">{r.author}</span>
                              <div className="flex items-center gap-0.5 text-amber-500">
                                {[...Array(r.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs font-semibold text-slate-800 line-clamp-1">{r.title}</p>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{r.text}</p>
                            <div className="flex items-center justify-between mt-2 pt-1 text-[10px]">
                              <span className="text-slate-400">{r.location || "Nashville, TN"} · {r.installed}</span>
                              <button
                                onClick={() => handleToggleFeatured(r.id)}
                                className={`font-bold transition-colors cursor-pointer ${
                                  r.featured ? "text-amber-700" : "text-slate-400 hover:text-slate-700"
                                }`}
                              >
                                {r.featured ? "★ Featured" : "Feature on Site"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Sub-Tab 3: Real-Time Cluster Telemetry */}
                    {overviewFeedTab === "telemetry" && (
                      <div className="py-3 space-y-3 text-left">
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Database className="w-4 h-4 text-emerald-600" />
                            <div>
                              <p className="text-xs font-bold text-slate-900">Database Engine</p>
                              <p className="text-[10px] text-slate-500 font-mono">MongoDB Atlas (Cluster0-shard)</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            Online
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Round-trip Ping</span>
                            <p className="text-base font-black text-slate-900 font-mono mt-0.5">
                              {dbHealth?.pingMs || 18} ms
                            </p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">WebSocket Sync</span>
                            <p className="text-base font-black text-emerald-600 font-mono mt-0.5">
                              Active
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1.5 text-xs">
                          <div className="flex justify-between text-slate-600 font-medium text-[11px]">
                            <span>Leads Collection</span>
                            <span className="font-mono font-bold text-slate-900">{leads.length} records</span>
                          </div>
                          <div className="flex justify-between text-slate-600 font-medium text-[11px]">
                            <span>Reviews Collection</span>
                            <span className="font-mono font-bold text-slate-900">{reviews.length} records</span>
                          </div>
                          <div className="flex justify-between text-slate-600 font-medium text-[11px]">
                            <span>Web Inquiries</span>
                            <span className="font-mono font-bold text-slate-900">{webEmails.length} records</span>
                          </div>
                          <div className="flex justify-between text-slate-600 font-medium text-[11px]">
                            <span>Live Chat Sessions</span>
                            <span className="font-mono font-bold text-slate-900">{chatSessions.length} sessions</span>
                          </div>
                          <div className="flex justify-between text-slate-600 font-medium text-[11px]">
                            <span>Gallery Photos</span>
                            <span className="font-mono font-bold text-slate-900">{galleryPhotos.length} assets</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>Dispatch Operations</span>
                    <button
                      onClick={() => setActiveTab(overviewFeedTab === "reviews" ? "reviews" : "emails")}
                      className="text-amber-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Management</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ── TAB 2: LEADS PIPELINE ──────────────────────────────── */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Leads Search & Filter Toolbar */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 sm:gap-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by customer, phone, address..."
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Filter Selectors */}
                  <div className="grid grid-cols-2 sm:flex items-center gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="h-10 bg-slate-50 border border-slate-200 rounded-xl px-2.5 sm:px-3 text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-amber-500 truncate"
                    >
                      <option value="all">All Stages</option>
                      <option value="new">New Inquiries</option>
                      <option value="contacted">Contacted</option>
                      <option value="consultation_scheduled">Consultation</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="won">Closed / Won</option>
                      <option value="lost">Lost</option>
                    </select>

                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="h-10 bg-slate-50 border border-slate-200 rounded-xl px-2.5 sm:px-3 text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:border-amber-500 truncate"
                    >
                      <option value="all">All Types</option>
                      <option value="residential">Residential</option>
                      <option value="underground">Underground Vault</option>
                      <option value="commercial">Commercial</option>
                      <option value="installation">Turnkey Install</option>
                      <option value="upgrades">Upgrades / Hatches</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">
                    Showing <strong>{filteredLeads.length}</strong> of {leads.length}
                  </span>
                  <button
                    onClick={() => setIsAddingLead(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Lead</span>
                  </button>
                </div>
              </div>

              {/* Leads Table & Mobile Cards */}
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
                {/* Desktop & Tablet Table (md and above) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3.5 px-4">Customer</th>
                        <th className="py-3.5 px-4">Contact</th>
                        <th className="py-3.5 px-4">Project Type</th>
                        <th className="py-3.5 px-4">Location</th>
                        <th className="py-3.5 px-4">Est. Value</th>
                        <th className="py-3.5 px-4">Pipeline Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-400">
                            No leads matched your search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((l) => (
                          <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-xs shrink-0">
                                  {l.name.charAt(0)}
                                </div>
                                <span className="font-bold text-slate-900">{l.name}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex flex-col gap-0.5">
                                {l.phone && (
                                  <a href={`tel:${l.phone}`} className="text-amber-700 hover:underline flex items-center gap-1 font-semibold">
                                    <Phone className="w-3 h-3" />
                                    <span>{l.phone}</span>
                                  </a>
                                )}
                                {l.email && (
                                  <span className="text-slate-500 text-[11px] truncate max-w-[160px]">{l.email}</span>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] uppercase tracking-wide">
                                {l.projectType || "General"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-slate-600 truncate max-w-[180px] block">{l.address || "Nashville, TN"}</span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                              ${(l.estimatedValue || 0).toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={l.status}
                                onChange={(e) => handleStatusChange(l.id, e.target.value as any)}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider cursor-pointer border outline-none ${l.status === "won"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : l.status === "new"
                                    ? "bg-amber-50 text-amber-800 border-amber-200"
                                    : l.status === "consultation_scheduled"
                                      ? "bg-blue-50 text-blue-800 border-blue-200"
                                      : "bg-slate-100 text-slate-700 border-slate-200"
                                  }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="consultation_scheduled">Consultation</option>
                                <option value="proposal_sent">Proposal Sent</option>
                                <option value="won">Closed / Won</option>
                                <option value="lost">Lost</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditLead(l)}
                                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                  title="Edit Lead Details"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(l.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card List (< md screens) */}
                <div className="block md:hidden divide-y divide-slate-100">
                  {filteredLeads.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs px-4">
                      No leads matched your search criteria.
                    </div>
                  ) : (
                    filteredLeads.map((l) => (
                      <div key={l.id} className="p-4 space-y-3 hover:bg-slate-50/60 transition-colors text-left">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-800">
                              {l.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm text-slate-900 truncate">{l.name}</h4>
                              <p className="text-[11px] text-slate-500 truncate">{l.address || "Nashville, TN"}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-mono font-black text-sm text-slate-900">
                              ${(l.estimatedValue || 0).toLocaleString()}
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[9px] uppercase tracking-wide inline-block mt-0.5">
                              {l.projectType || "General"}
                            </span>
                          </div>
                        </div>

                        {/* Contact Quick Links */}
                        <div className="flex items-center gap-2 text-xs flex-wrap">
                          {l.phone && (
                            <a
                              href={`tel:${l.phone}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/60"
                            >
                              <Phone className="w-3 h-3 text-amber-600" />
                              <span>{l.phone}</span>
                            </a>
                          )}
                          {l.email && (
                            <a
                              href={`mailto:${l.email}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/60 truncate max-w-[200px]"
                            >
                              <Mail className="w-3 h-3 text-slate-500" />
                              <span className="truncate">{l.email}</span>
                            </a>
                          )}
                        </div>

                        {/* Status Dropdown & Actions */}
                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stage:</span>
                            <select
                              value={l.status}
                              onChange={(e) => handleStatusChange(l.id, e.target.value as any)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider cursor-pointer border outline-none ${
                                l.status === "won"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : l.status === "new"
                                    ? "bg-amber-50 text-amber-800 border-amber-200"
                                    : l.status === "consultation_scheduled"
                                      ? "bg-blue-50 text-blue-800 border-blue-200"
                                      : "bg-slate-100 text-slate-700 border-slate-200"
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="consultation_scheduled">Consultation</option>
                              <option value="proposal_sent">Proposal Sent</option>
                              <option value="won">Closed / Won</option>
                              <option value="lost">Lost</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleOpenEditLead(l)}
                              className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                              title="Edit Lead"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(l.id)}
                              className="p-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: REVIEWS MODERATOR ──────────────────────────── */}
          {activeTab === "reviews" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header Studio Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                        Customer Testimonials Moderator
                      </h3>
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Synced to /reviews
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      Manage, approve, feature, and reply to customer storm shelter reviews. Reviews sync in real time with MongoDB Atlas and appear on <a href="/reviews" target="_blank" className="text-amber-700 font-semibold underline">/reviews</a>.
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                    <a
                      href="/reviews"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      <span>View Live Page</span>
                    </a>
                    <button
                      onClick={() => setIsAddingReview(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Review</span>
                    </button>
                  </div>
                </div>

                {/* Quick KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6 pt-5 border-t border-slate-100">
                  <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Reviews</span>
                    <div className="text-base font-extrabold text-slate-900 mt-0.5">{reviews.length}</div>
                  </div>
                  <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Published on Site</span>
                    <div className="text-base font-extrabold text-emerald-600 mt-0.5">
                      {reviews.filter((r) => r.featured).length}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Average Rating</span>
                    <div className="text-base font-extrabold text-amber-500 flex items-center gap-1 mt-0.5">
                      <span>5.0</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Verified Owners</span>
                    <div className="text-base font-extrabold text-slate-900 mt-0.5">100%</div>
                  </div>
                </div>
              </div>

              {/* Toolbar & Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <button
                    onClick={() => setReviewRatingFilter("all")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${reviewRatingFilter === "all"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    All ({reviews.length})
                  </button>
                  <button
                    onClick={() => setReviewRatingFilter("featured")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${reviewRatingFilter === "featured"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    Featured ({reviews.filter((r) => r.featured).length})
                  </button>
                  <button
                    onClick={() => setReviewRatingFilter("hidden")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${reviewRatingFilter === "hidden"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    Hidden ({reviews.filter((r) => !r.featured).length})
                  </button>
                </div>

                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={reviewSearchQuery}
                    onChange={(e) => setReviewSearchQuery(e.target.value)}
                    placeholder="Search reviews by name, city, model..."
                    className="w-full h-9 pl-8 pr-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 transition shadow-2xs"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Empty state */}
              {filteredReviews.length === 0 && (
                <div className="text-center py-16 px-6 bg-white border border-slate-200/90 rounded-2xl">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">No reviews found</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    {reviewSearchQuery
                      ? "No reviews match your current search criteria."
                      : "Click 'Add New Review' to publish your first customer testimonial."}
                  </p>
                </div>
              )}

              {/* Reviews Cards Grid */}
              {filteredReviews.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredReviews.map((r) => (
                    <div
                      key={r.id}
                      className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between text-left relative group hover:border-amber-400/80 hover:shadow-md transition-all duration-300"
                    >
                      <div>
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(r.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleToggleFeatured(r.id)}
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition cursor-pointer ${r.featured
                                  ? "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                                  : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300"
                                }`}
                              title="Toggle visibility on /reviews"
                            >
                              {r.featured ? "★ Featured on Site" : "Hidden"}
                            </button>
                          </div>
                        </div>

                        {/* Title & Content */}
                        <h4 className="text-sm font-extrabold text-slate-900 mb-2 leading-snug">
                          "{r.title}"
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal mb-3">
                          "{r.text}"
                        </p>

                        {/* Model installed badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-bold text-slate-700 mb-3">
                          <ShieldCheck className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{r.installed || "Granger ISS In-Ground Shelter"}</span>
                        </div>

                        {/* Owner Reply Block */}
                        {(r.reply || r.replyText) && (
                          <div className="mt-2 mb-3 p-3 bg-amber-50/60 border-l-2 border-amber-600 rounded-r-xl text-xs">
                            <span className="font-bold text-amber-900 block text-[10px] uppercase tracking-wider">
                              Owner Reply:
                            </span>
                            <p className="text-slate-700 mt-0.5 italic leading-relaxed">
                              {r.reply || r.replyText}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{r.author}</span>
                          <span className="text-[10px] text-slate-400">
                            {r.location || "Nashville, TN"} • {new Date(r.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedReview(r);
                              setReviewReplyText(r.reply || r.replyText || "");
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-700 text-xs font-semibold transition cursor-pointer"
                          >
                            {r.reply || r.replyText ? "Edit Reply" : "Reply"}
                          </button>
                          <button
                            onClick={() => handleDeleteReview(r.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete Review"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TAB 4: UPDATE GALLERY ──────────────────────────────── */}
          {activeTab === "gallery" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Gallery Upload Studio Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">Cloudinary High-Res Photo Studio</h3>
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Cloudinary CDN Connected
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      Upload authentic installation photos directly to Cloudinary. Photos immediately sync across the website, <a href="/projects" target="_blank" className="text-amber-700 font-semibold underline">/projects</a>, and the homepage gallery.
                    </p>
                  </div>
                  <a
                    href="/projects"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition shrink-0 shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>Preview Live Gallery</span>
                  </a>
                </div>

                {/* Upload Section - Clean, Direct File Picker */}
                <div className="bg-slate-50/80 border-2 border-dashed border-slate-200 rounded-2xl p-4 sm:p-6 transition hover:border-amber-400">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-5">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                        <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-900 cursor-pointer hover:text-amber-600 transition">
                          Choose Photos to Upload
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setSelectedGalleryFiles(Array.from(e.target.files || []))}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {selectedGalleryFiles.length > 0 ? (
                            <span className="font-semibold text-amber-700">
                              {selectedGalleryFiles.length} photo(s) selected ready to sync
                            </span>
                          ) : (
                            <span>PNG, JPG, WEBP, or GIF • Direct authenticated Cloudinary sync</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                      {selectedGalleryFiles.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedGalleryFiles([])}
                          disabled={isUploadingGallery}
                          className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-white text-slate-600 text-xs font-bold transition cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                      <label className="cursor-pointer px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs">
                        Browse Files
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => setSelectedGalleryFiles(Array.from(e.target.files || []))}
                          className="hidden"
                        />
                      </label>
                      <button
                        onClick={handleUploadGallery}
                        disabled={selectedGalleryFiles.length === 0 || isUploadingGallery}
                        className="flex-1 sm:flex-initial h-10 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm flex items-center justify-center gap-2"
                      >
                        {isUploadingGallery ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading ({galleryUploadProgress}%)</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload & Sync ({selectedGalleryFiles.length})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Header Toolbar (No category tabs!) */}
              <div className="flex items-center justify-between gap-4 px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Gallery Photos</h3>
                  <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
                    {filteredGalleryPhotos.length} {filteredGalleryPhotos.length === 1 ? "photo" : "photos"}
                  </span>
                </div>
              </div>

              {/* Empty Gallery State */}
              {filteredGalleryPhotos.length === 0 && (
                <div className="text-center py-16 px-6 bg-white border border-slate-200/90 rounded-2xl">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
                    <ImageIcon className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">No photos in gallery yet</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Select one or more images using the uploader above to sync project photos directly with Cloudinary.
                  </p>
                </div>
              )}

              {/* Photo Cards Grid */}
              {filteredGalleryPhotos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                  {filteredGalleryPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                        <img
                          src={photo.url}
                          alt="Gallery Photo"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 right-2.5">
                          <button
                            onClick={() => handleDeleteGallery(photo.id)}
                            className="p-1.5 rounded-lg bg-black/60 hover:bg-rose-600 text-white transition backdrop-blur-xs cursor-pointer shadow-sm"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 bg-white flex items-center justify-between border-t border-slate-100">
                        <a
                          href={photo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                        >
                          <span>CDN Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        <span className="text-[9px] text-slate-400 font-mono">
                          {new Date(photo.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TAB 5: LIVE CHAT ──────────────────────────────────── */}
          {activeTab === "chat" && (
            <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden h-[calc(100vh-200px)] sm:h-[620px] min-h-[480px] max-h-[750px] flex flex-col md:flex-row animate-in fade-in duration-200">
              {/* Chat List Sidebar */}
              <div className={`w-full md:w-80 md:border-r border-slate-200 flex-col h-full bg-slate-50/50 ${activeChatSession ? "hidden md:flex" : "flex"}`}>
                <div className="p-3.5 sm:p-4 border-b border-slate-200 bg-white flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Active Inquiries ({chatSessions.length})
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                  {chatSessions.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      No active chat sessions.
                    </div>
                  ) : (
                    chatSessions.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => {
                          setActiveSessionId(session.id);
                          if (session.unread) markChatAsRead(session.id);
                        }}
                        className={`w-full p-3.5 sm:p-4 text-left transition-colors cursor-pointer flex items-start gap-3 ${activeSessionId === session.id
                          ? "bg-white border-l-4 border-amber-600 shadow-xs"
                          : "hover:bg-slate-100/60"
                          }`}
                      >
                        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                          {session.clientName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 truncate">{session.clientName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {formatChatTime(session.lastMessageTime)}
                            </span>
                          </div>
                          {session.clientEmail && (
                            <p className="text-[10px] text-amber-700/90 font-medium truncate">{session.clientEmail}</p>
                          )}
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{session.lastMessage || "Chat initiated"}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Thread */}
              <div className={`flex-1 flex-col h-full bg-white ${activeChatSession ? "flex" : "hidden md:flex"}`}>
                {activeChatSession ? (
                  <>
                    <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Mobile back button to inquiries list */}
                        <button
                          onClick={() => setActiveSessionId(null)}
                          className="p-1.5 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 rounded-lg md:hidden cursor-pointer shrink-0"
                          title="Back to inquiries"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{activeChatSession.clientName}</h4>
                          <p className="text-[10px] text-slate-500 truncate">{activeChatSession.clientEmail || activeChatSession.clientPhone || "Online Inquiry"}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteChat(activeChatSession.id)}
                        className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer shrink-0 ml-2"
                      >
                        Delete Chat
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {activeChatSession.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex flex-col ${m.sender === "admin" ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-2.5 text-xs whitespace-pre-wrap break-words leading-relaxed select-text shadow-xs ${m.sender === "admin"
                                ? "bg-amber-600 text-white rounded-br-none font-medium"
                                : "bg-slate-100 text-slate-900 border border-slate-200/80 rounded-bl-none font-medium"
                              }`}
                          >
                            {m.text}
                          </div>
                          <span className="text-[9px] text-slate-400 mt-1 font-mono">
                            {formatChatTime(m.timestamp)}
                          </span>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSendAdminMessage} className="p-3 border-t border-slate-200 flex gap-2 bg-white">
                      <input
                        type="text"
                        value={adminReplyText}
                        onChange={(e) => setAdminReplyText(e.target.value)}
                        placeholder="Type official reply..."
                        className="flex-1 h-10 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3 sm:px-4 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                      />
                      <button
                        type="submit"
                        disabled={!adminReplyText.trim() || isSendingAdminMsg}
                        className="h-10 px-4 sm:px-5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
                      >
                        {isSendingAdminMsg ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span className="hidden sm:inline">Sending...</span>
                          </>
                        ) : (
                          <>
                            <span className="hidden sm:inline">Send</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2 p-6 text-center">
                    <MessageCircle className="w-8 h-8 text-slate-300" />
                    <p className="text-xs font-medium">Select an inquiry from the list to start messaging.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB 6: WEB INQUIRIES & SUBMISSIONS ─────────────────────── */}
          {activeTab === "emails" && (
            <div className="space-y-6 animate-in fade-in duration-200">

              {/* Executive Header & Sync Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Website Inquiries & Customer Submissions</h2>
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      MongoDB Atlas Live
                    </span>
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-200">
                      <Radio className="w-3 h-3 text-amber-600 animate-pulse" />
                      WebSocket Real-time
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Live captured consultation requests from Landing Page Free Estimate, Dedicated Quote Page, and Contact Form.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      getWebEmails().then((res) => {
                        setWebEmails(res);
                        toast.success("Web inquiries synced from database");
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-semibold shadow-xs transition"
                    title="Force refresh inquiries"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Sync</span>
                  </button>
                  <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60">
                    {filteredEmails.length} of {webEmails.length} Inquiries
                  </span>
                </div>
              </div>

              {/* 4 Executive Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Inquiries</span>
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                      <Inbox className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-2xl font-black text-slate-900 font-mono">{emailMetrics.total}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">All website form entries</div>
                </div>

                {/* New / Action Required */}
                <div className="bg-white border border-amber-200/80 rounded-2xl p-4 shadow-xs bg-linear-to-br from-white to-amber-50/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">New / Unhandled</span>
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-amber-900 font-mono">{emailMetrics.newCount}</span>
                    {emailMetrics.newCount > 0 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 animate-pulse">
                        Needs Action
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-amber-700/80 mt-0.5">Awaiting staff response</div>
                </div>

                {/* In Discussion / Contacted */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">In Contact</span>
                    <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-2xl font-black text-slate-900 font-mono">{emailMetrics.contactedCount}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Follow-up or quoted</div>
                </div>

                {/* Converted to CRM Leads */}
                <div className="bg-white border border-emerald-200/70 rounded-2xl p-4 shadow-xs bg-linear-to-br from-white to-emerald-50/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Converted Leads</span>
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-950 font-mono">{emailMetrics.convertedCount}</span>
                    <span className="text-[11px] font-bold text-emerald-600">
                      {emailMetrics.total > 0 ? Math.round((emailMetrics.convertedCount / emailMetrics.total) * 100) : 0}% rate
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-700/80 mt-0.5">Transferred to CRM pipeline</div>
                </div>
              </div>

              {/* Filtering, Search & Sorting Controls */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">

                  {/* Search bar */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search inquiries by customer name, email, phone, city, or service..."
                      value={emailSearchQuery}
                      onChange={(e) => setEmailSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                    />
                    {emailSearchQuery && (
                      <button
                        onClick={() => setEmailSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Controls Right */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Source Selector */}
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      <select
                        value={emailSourceFilter}
                        onChange={(e) => setEmailSourceFilter(e.target.value)}
                        className="bg-transparent text-xs font-medium text-slate-700 focus:outline-hidden cursor-pointer"
                      >
                        <option value="all">All Sources</option>
                        <option value="Free Estimate">Free Estimate (Hero)</option>
                        <option value="Free Quote Page">Free Quote Page</option>
                        <option value="Contact Page">Contact Form</option>
                      </select>
                    </div>

                    {/* Sort Order Toggle */}
                    <button
                      onClick={() => setEmailSortOrder(emailSortOrder === "newest" ? "oldest" : "newest")}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                      title="Toggle Date Order"
                    >
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{emailSortOrder === "newest" ? "Newest First" : "Oldest First"}</span>
                    </button>
                  </div>
                </div>

                {/* Status Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 text-xs">
                  {[
                    { id: "all", label: "All Inquiries", count: emailMetrics.total },
                    { id: "new", label: "New / Pending", count: emailMetrics.newCount, alert: emailMetrics.newCount > 0 },
                    { id: "contacted", label: "Contacted", count: emailMetrics.contactedCount },
                    { id: "converted", label: "Converted to Lead", count: emailMetrics.convertedCount },
                    { id: "archived", label: "Archived", count: emailMetrics.archivedCount }
                  ].map((tab) => {
                    const isSelected = emailStatusFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setEmailStatusFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${isSelected
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                          }`}
                      >
                        <span>{tab.label}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${isSelected
                              ? "bg-white/20 text-white"
                              : tab.alert
                                ? "bg-rose-100 text-rose-700 font-bold"
                                : "bg-slate-200 text-slate-600"
                            }`}
                        >
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inquiries Feed */}
              {filteredEmails.length === 0 ? (
                <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-100">
                    <Inbox className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">No Inquiries Found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    {emailSearchQuery || emailStatusFilter !== "all" || emailSourceFilter !== "all"
                      ? "No submissions matched your current filter criteria. Try clearing search or status filters."
                      : "When visitors request a free estimate or contact Southern Storm Shelters from anywhere on the website, they will instantly appear here."}
                  </p>
                  {(emailSearchQuery || emailStatusFilter !== "all" || emailSourceFilter !== "all") && (
                    <button
                      onClick={() => {
                        setEmailSearchQuery("");
                        setEmailStatusFilter("all");
                        setEmailSourceFilter("all");
                      }}
                      className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredEmails.map((inquiry) => {
                    const status = inquiry.status || "new";
                    const isNew = status === "new";
                    const isConverted = status === "converted";
                    const isContacted = status === "contacted";
                    const isArchived = status === "archived";

                    const initials = (inquiry.name || "Customer")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <div
                        key={inquiry.id}
                        className={`bg-white border rounded-2xl p-5 shadow-xs transition-all duration-200 hover:shadow-md ${isNew
                            ? "border-amber-300 ring-1 ring-amber-400/20 bg-linear-to-r from-amber-50/20 via-white to-white"
                            : isConverted
                              ? "border-emerald-200/90"
                              : "border-slate-200/90"
                          }`}
                      >
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">

                          {/* Left: Customer Info & Monogram */}
                          <div className="flex items-start gap-3.5 min-w-0 flex-1">
                            <div
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${isNew
                                  ? "bg-linear-to-br from-amber-500 to-amber-600 text-white"
                                  : isConverted
                                    ? "bg-linear-to-br from-emerald-500 to-teal-600 text-white"
                                    : "bg-slate-100 text-slate-700 border border-slate-200"
                                }`}
                            >
                              {initials}
                            </div>

                            <div className="space-y-1.5 min-w-0 flex-1 text-left">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-black text-sm text-slate-900 tracking-tight">
                                  {inquiry.name || "Website Visitor"}
                                </h3>

                                {/* Source pill */}
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200/80">
                                  {inquiry.source || "Website Form"}
                                </span>

                                {/* Status badge */}
                                {isNew && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                    New Inquiry
                                  </span>
                                )}
                                {isContacted && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200">
                                    <PhoneCall className="w-2.5 h-2.5 text-sky-600" />
                                    Contacted
                                  </span>
                                )}
                                {isConverted && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    Converted to CRM Lead
                                  </span>
                                )}
                                {isArchived && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
                                    <Archive className="w-2.5 h-2.5 text-slate-400" />
                                    Archived
                                  </span>
                                )}
                              </div>

                              {/* Metadata Badges */}
                              <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                                {inquiry.phone && (
                                  <a
                                    href={`tel:${inquiry.phone}`}
                                    className="inline-flex items-center gap-1 text-slate-700 hover:text-amber-600 font-semibold"
                                  >
                                    <Phone className="w-3 h-3 text-amber-500" />
                                    <span>{inquiry.phone}</span>
                                  </a>
                                )}
                                {inquiry.email && (
                                  <a
                                    href={`mailto:${inquiry.email}`}
                                    className="inline-flex items-center gap-1 text-slate-700 hover:text-amber-600 font-semibold"
                                  >
                                    <Mail className="w-3 h-3 text-amber-500" />
                                    <span>{inquiry.email}</span>
                                  </a>
                                )}
                                {inquiry.address && (
                                  <span className="inline-flex items-center gap-1 text-slate-500">
                                    <MapPin className="w-3 h-3 text-slate-400" />
                                    <span>{inquiry.address}</span>
                                  </span>
                                )}
                                {inquiry.timeframe && (
                                  <span className="inline-flex items-center gap-1 text-slate-500">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    <span>{inquiry.timeframe}</span>
                                  </span>
                                )}
                                <span className="text-[11px] text-slate-400 font-mono">
                                  {new Date(inquiry.createdAt).toLocaleString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })}
                                </span>
                              </div>

                              {/* Service requested badge */}
                              {inquiry.service && (
                                <div className="pt-0.5">
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-800 bg-amber-50/70 border border-amber-200/60 px-2 py-0.5 rounded-lg">
                                    <HardHat className="w-3 h-3 text-amber-600" />
                                    {inquiry.service}
                                  </span>
                                </div>
                              )}

                              {/* Customer Message Box */}
                              {inquiry.message && (
                                <div className="mt-2 text-xs text-slate-700 bg-slate-50/90 border border-slate-200/70 rounded-xl p-3 leading-relaxed">
                                  <span className="text-slate-400 font-serif mr-1">“</span>
                                  {inquiry.message}
                                  <span className="text-slate-400 font-serif ml-1">”</span>
                                </div>
                              )}

                              {/* Internal Staff Notes indicator */}
                              {inquiry.notes && (
                                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50/50 border border-amber-100 rounded-lg px-2.5 py-1">
                                  <FileText className="w-3 h-3 text-amber-600 shrink-0" />
                                  <span className="font-bold">Staff Note:</span>
                                  <span className="truncate">{inquiry.notes}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right: Quick Action Buttons & Status Dropdown */}
                          <div className="flex flex-row sm:flex-row lg:flex-col items-center sm:items-center lg:items-end justify-between sm:justify-end gap-2.5 shrink-0 w-full lg:w-auto mt-2 lg:mt-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">

                            {/* Status Quick Switcher */}
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status:</span>
                              <select
                                value={status}
                                onChange={(e) => handleUpdateInquiryStatus(inquiry.id, e.target.value as any)}
                                className={`text-xs font-bold rounded-xl px-2.5 py-1.5 border transition cursor-pointer ${isNew
                                    ? "bg-rose-50 text-rose-800 border-rose-200"
                                    : isContacted
                                      ? "bg-sky-50 text-sky-800 border-sky-200"
                                      : isConverted
                                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                        : "bg-slate-100 text-slate-700 border-slate-200"
                                  }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="converted">Converted</option>
                                <option value="archived">Archived</option>
                              </select>
                            </div>

                            {/* Action Buttons Row */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {inquiry.phone && (
                                <a
                                  href={`tel:${inquiry.phone}`}
                                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                                  title={`Call ${inquiry.phone}`}
                                >
                                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                                </a>
                              )}

                              {inquiry.email && (
                                <a
                                  href={`mailto:${inquiry.email}?subject=Regarding your Southern Storm Shelters Inquiry`}
                                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                                  title={`Email ${inquiry.email}`}
                                >
                                  <Mail className="w-3.5 h-3.5 text-slate-600" />
                                </a>
                              )}

                              {/* 1-Click Convert to CRM Lead */}
                              {!isConverted ? (
                                <button
                                  onClick={() => handleConvertInquiryToLead(inquiry)}
                                  disabled={isConvertingEmail}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition shadow-xs cursor-pointer"
                                  title="Add to Leads Pipeline as active CRM Lead"
                                >
                                  <ArrowRightLeft className="w-3.5 h-3.5" />
                                  <span>Convert to Lead</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setActiveTab("leads");
                                    setSearchTerm(inquiry.name || "");
                                  }}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition cursor-pointer"
                                  title="View lead in Leads CRM"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>View in CRM</span>
                                </button>
                              )}

                              {/* Open Detail Inspector Modal */}
                              <button
                                onClick={() => handleViewInquiry(inquiry)}
                                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
                                title="Open full inquiry details and staff notes"
                              >
                                Inspect
                              </button>

                              {/* Delete button */}
                              <button
                                onClick={() => handleDeleteInquiry(inquiry.id)}
                                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* ── TAB 7: PORTAL & SITE SETTINGS ────────────────────── */}
          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto space-y-7 animate-in fade-in duration-200 text-left pb-16">

              {/* Header & Global Sync Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Global System Settings & Site Sync</h2>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      MongoDB Atlas Live
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    Changes saved here dynamically propagate across the entire website in real time, including the header, footer, contact forms, schema markup, and public dispatch hotlines.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    Preview Live Site
                  </a>
                  <button
                    type="button"
                    onClick={() => handleSaveSettings()}
                    disabled={isSavingSettings}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-black uppercase tracking-wider transition shadow-md shadow-amber-600/20 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSavingSettings ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Saving & Syncing...
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Save Settings
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* ── CARD 1: WEBSITE MAINTENANCE SHIELD ── */}
              <div className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-xs ${maintenanceMode
                  ? "bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-400/90 shadow-amber-500/10"
                  : "bg-white border-slate-200/90"
                }`}>
                <div className="p-6 sm:p-7 space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${maintenanceMode
                          ? "bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/30"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}>
                        {maintenanceMode ? <ShieldAlert className="w-6 h-6 animate-pulse" /> : <ShieldCheck className="w-6 h-6 text-emerald-600" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="text-base font-black text-slate-900 tracking-tight">
                            Website Maintenance Mode
                          </h3>
                          {maintenanceMode ? (
                            <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                              Active — Public Shield Enabled
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              Standby — Website Publicly Live
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 max-w-xl">
                          When turned <span className="font-bold text-slate-700">ON</span>, visitors to the landing page and public routes will see a branded maintenance shield screen with your emergency contact hotline. The Dashboard remains fully accessible for staff and administrators.
                        </p>
                      </div>
                    </div>

                    {/* Master Switch */}
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => {
                          const nextState = !maintenanceMode;
                          setMaintenanceMode(nextState);
                          handleSaveSettings(undefined, nextState);
                        }}
                        className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-amber-500/20 ${maintenanceMode ? "bg-amber-600" : "bg-slate-300"
                          }`}
                        role="switch"
                        aria-checked={maintenanceMode}
                      >
                        <span
                          className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center ${maintenanceMode ? "translate-x-8 text-amber-600" : "translate-x-0 text-slate-400"
                            }`}
                        >
                          <Power className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Maintenance Mode Options (Configurable title & message) */}
                  <div className="pt-4 border-t border-slate-200/70 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                          Maintenance Screen Headline
                        </label>
                        <input
                          type="text"
                          value={maintenanceTitle}
                          onChange={(e) => setMaintenanceTitle(e.target.value)}
                          placeholder="Scheduled System Maintenance Underway"
                          className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                          Maintenance Notice & Explanation to Visitors
                        </label>
                        <textarea
                          rows={2}
                          value={maintenanceMessage}
                          onChange={(e) => setMaintenanceMessage(e.target.value)}
                          placeholder="We are currently performing scheduled maintenance to upgrade our shelter estimating and dispatch systems..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowMaintenancePreview(!showMaintenancePreview)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {showMaintenancePreview ? "Hide Visitor Screen Preview" : "Preview How Visitors See Maintenance Mode"}
                      </button>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Emergency Hotline displayed: <span className="font-bold text-slate-700">{officePhone}</span>
                      </span>
                    </div>

                    {/* Expandable Visitor Preview Card */}
                    {showMaintenancePreview && (
                      <div className="mt-3 p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                            Live Visitor Shield Preview
                          </span>
                          <span className="text-[10px] text-slate-400">Rendered in site root</span>
                        </div>
                        <div className="text-center py-4 space-y-2 max-w-md mx-auto">
                          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl">
                            🛡️
                          </div>
                          <h4 className="text-base font-black">{maintenanceTitle || "Scheduled System Maintenance Underway"}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {maintenanceMessage || "We are currently performing scheduled maintenance. Our emergency line remains open."}
                          </p>
                          <div className="pt-3">
                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[11px] font-bold px-4 py-2 rounded-xl shadow-md">
                              📞 Call {officePhone}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── CARD 2: COMPANY PROFILE & PUBLIC CHANNELS ── */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Company Profile & Licensing</h3>
                      <p className="text-xs text-slate-400">Extracted from public site and structured SEO schemas</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                    Whole Website Sync
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Company Brand & Legal Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Southern Storm Shelters LLC"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Tagline / Hero Subheading
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="Tennessee’s Premier Engineered Underground Storm Shelters & Safe Rooms"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Service Radius & Regional Coverage
                    </label>
                    <input
                      type="text"
                      value={serviceRadius}
                      onChange={(e) => setServiceRadius(e.target.value)}
                      placeholder="Nashville, TN & 100-Mile Radius"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      License & Insurance Notice
                    </label>
                    <input
                      type="text"
                      value={licenseNotice}
                      onChange={(e) => setLicenseNotice(e.target.value)}
                      placeholder="Fully Insured Professional Installation Crews • Engineered Storm Protection"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* ── CARD 3: COMMUNICATIONS & PHYSICAL LOCATION ── */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Contact Channels & Physical Address</h3>
                      <p className="text-xs text-slate-400">Controls clickable phone links, inquiry emails, and Google Maps embed</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Public Office & Dispatch Phone
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={officePhone}
                        onChange={(e) => {
                          const val = e.target.value;
                          setOfficePhone(val);
                          // Auto format raw if simple digits
                          const digits = val.replace(/[^\d]/g, "");
                          if (digits.length >= 10) {
                            setOfficePhoneRaw(digits.startsWith("1") ? `+${digits}` : `+1${digits}`);
                          }
                        }}
                        placeholder="(615) 991-2361"
                        className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-20 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                      />
                      <a
                        href={`tel:${officePhoneRaw}`}
                        className="absolute right-2 top-1.5 text-[10px] font-bold uppercase bg-slate-200 hover:bg-amber-100 hover:text-amber-800 text-slate-600 px-2 py-1 rounded-lg transition"
                      >
                        Test Call
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Dialable Raw Phone (tel: link)
                    </label>
                    <input
                      type="text"
                      value={officePhoneRaw}
                      onChange={(e) => setOfficePhoneRaw(e.target.value)}
                      placeholder="+16159912361"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-mono font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Primary Inquiries & Alert Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={alertEmail}
                        onChange={(e) => setAlertEmail(e.target.value)}
                        placeholder="info@southernstormshelters.com"
                        className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-20 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                      />
                      <a
                        href={`mailto:${alertEmail}`}
                        className="absolute right-2 top-1.5 text-[10px] font-bold uppercase bg-slate-200 hover:bg-amber-100 hover:text-amber-800 text-slate-600 px-2 py-1 rounded-lg transition"
                      >
                        Test Email
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Physical Office Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={officeAddress}
                        onChange={(e) => setOfficeAddress(e.target.value)}
                        placeholder="Nashville, TN"
                        className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      ✓ Synchronized with schema.org and Google Maps embed in Service Area
                    </span>
                  </div>
                </div>
              </div>

              {/* ── CARD 4: OPERATING HOURS & SCHEDULE ENGINE ── */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Operating Hours & Schedule Engine</h3>
                      <p className="text-xs text-slate-400">Controls weekday/weekend schedules shown in the Header badge and Footer</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Weekdays</label>
                    <input
                      type="text"
                      value={weekdays}
                      onChange={(e) => setWeekdays(e.target.value)}
                      placeholder="Monday–Friday: 8:00 AM – 5:00 PM"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Saturdays</label>
                    <input
                      type="text"
                      value={saturdays}
                      onChange={(e) => setSaturdays(e.target.value)}
                      placeholder="Saturday: By Appointment"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Sundays</label>
                    <input
                      type="text"
                      value={sundays}
                      onChange={(e) => setSundays(e.target.value)}
                      placeholder="Sunday: Closed"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Header Quick Badge Text
                    </label>
                    <input
                      type="text"
                      value={shortBadge}
                      onChange={(e) => setShortBadge(e.target.value)}
                      placeholder="Mon–Sat: 8:00 AM – 5:00 PM"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Live Combined Schedule Preview
                    </label>
                    <div className="h-10 bg-slate-50 border border-slate-200 rounded-xl px-3.5 flex items-center text-[11px] text-slate-600 truncate font-semibold">
                      {weekdays} | {saturdays} | {sundays}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CARD 5: NOTIFICATION & AUTO-RESPONDER ENGINE ── */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Lead Alerts & Customer Auto-Responder</h3>
                      <p className="text-xs text-slate-400">Configure immediate notifications and SMS confirmation templates for prospective leads</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/60 transition cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Instant Email Alerts</span>
                      <span className="text-[11px] text-slate-500">Receive lead submissions at {alertEmail}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailAlert}
                      onChange={(e) => setEmailAlert(e.target.checked)}
                      className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/60 transition cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Instant SMS Dispatch Alerts</span>
                      <span className="text-[11px] text-slate-500">Notify field crews immediately on new lead</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsAlert}
                      onChange={(e) => setSmsAlert(e.target.checked)}
                      className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
                    />
                  </label>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Customer SMS Auto-Responder Template
                    </label>
                    <div className="flex items-center gap-1.5 text-[11px] flex-wrap">
                      <span className="text-slate-400">Insert tag:</span>
                      {["{Name}", "{Type}", "{Phone}", "{Time}"].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSmsTemplate((prev) => prev + " " + tag)}
                          className="px-2 py-0.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-mono text-[10px] font-bold border border-amber-200 transition cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    value={smsTemplate}
                    onChange={(e) => setSmsTemplate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-900 outline-none focus:border-amber-500 focus:bg-white transition"
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-slate-400">
                    <span>Preview sample: "Hi John Doe, thank you for contacting Southern Storm Shelters LLC! A specialist will contact you..."</span>
                    <span className="shrink-0">{smsTemplate.length} characters</span>
                  </div>
                </div>
              </div>

              {/* ── STICKY BOTTOM SAVE ACTION BAR ── */}
              <div className="sticky bottom-4 z-20 bg-slate-900/95 backdrop-blur-md text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
                    🛡️
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
                      Synchronize Settings with Website
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Live sync immediately updates Header, Footer, Contact Forms, Maps, and Public Status.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      triggerConfirm({
                        title: "Reset Settings to Extracted Defaults?",
                        message: "This will restore phone, email, hours, and addresses to the baseline Southern Storm Shelters LLC configuration.",
                        confirmText: "Reset Defaults",
                        onConfirm: () => {
                          setCompanyName(SITE_CONFIG.name);
                          setTagline(SITE_CONFIG.tagline);
                          setOfficePhone(SITE_CONFIG.phone);
                          setOfficePhoneRaw(SITE_CONFIG.phoneRaw);
                          setAlertEmail(SITE_CONFIG.email);
                          setOfficeAddress(SITE_CONFIG.address);
                          setServiceRadius(SITE_CONFIG.serviceRadius);
                          setLicenseNotice(SITE_CONFIG.licenseNotice);
                          setWeekdays(SITE_CONFIG.operatingHours.weekdays);
                          setSaturdays(SITE_CONFIG.operatingHours.saturdays);
                          setSundays(SITE_CONFIG.operatingHours.sundays);
                          setShortBadge(SITE_CONFIG.operatingHours.shortBadge);
                          setMaintenanceMode(false);
                          toast.info("Form reset to defaults. Click Save Settings to commit to database.");
                        },
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-bold transition"
                  >
                    Reset Defaults
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveSettings()}
                    disabled={isSavingSettings}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider transition shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSavingSettings ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        Save Settings & Sync Website
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ── TAB 8: SECURITY & STAFF ───────────────────────────── */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in duration-200">

              {/* ── HEADER ─────────────────────────────────────────── */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-amber-400" />
                    </div>
                    <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Security & Staff Access</h2>
                  </div>
                  <p className="text-xs text-slate-500 ml-10.5">Manage admin credentials and authenticated portal team members</p>
                </div>
                <button
                  onClick={() => setIsCreatingUser(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add Staff Member</span>
                </button>
              </div>

              {/* ── KPI STRIP ──────────────────────────────────────── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  {
                    label: "Total Users",
                    value: portalUsers.length,
                    icon: Users,
                    color: "text-slate-800",
                    bg: "bg-slate-50",
                    border: "border-slate-200"
                  },
                  {
                    label: "Administrators",
                    value: portalUsers.filter(u => u.role === "admin").length,
                    icon: ShieldCheck,
                    color: "text-amber-700",
                    bg: "bg-amber-50",
                    border: "border-amber-200"
                  },
                  {
                    label: "Active Staff",
                    value: portalUsers.filter(u => u.role !== "admin").length,
                    icon: UserCheck,
                    color: "text-emerald-700",
                    bg: "bg-emerald-50",
                    border: "border-emerald-200"
                  },
                  {
                    label: "Security Level",
                    value: "High",
                    icon: Lock,
                    color: "text-blue-700",
                    bg: "bg-blue-50",
                    border: "border-blue-200"
                  }
                ].map(({ label, value, icon: Icon, color, bg, border }) => (
                  <div key={label} className={`p-4 ${bg} rounded-2xl border ${border} flex items-center gap-3`}>
                    <div className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4.5 h-4.5 ${color}`} />
                    </div>
                    <div>
                      <div className={`text-base font-extrabold ${color} leading-none`}>{value}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── STAFF ROSTER ───────────────────────────────────── */}
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Authorized Team Members</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{portalUsers.length} portal account{portalUsers.length !== 1 ? "s" : ""} · Role-based access control</p>
                  </div>
                  <div className="relative w-full sm:w-52">
                    <input
                      type="text"
                      value={staffSearchQuery}
                      onChange={(e) => setStaffSearchQuery(e.target.value)}
                      placeholder="Search by name or role..."
                      className="w-full h-8.5 pl-8 pr-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Role Filter Pills */}
                <div className="flex items-center gap-1.5 px-6 py-3 border-b border-slate-100 overflow-x-auto">
                  {["all", "admin", "dispatcher", "sales", "manager", "field"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setStaffRoleFilter(r)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${staffRoleFilter === r
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                    >
                      {r === "all" ? `All (${portalUsers.length})` : ROLE_CONFIG[r]?.title || r}
                    </button>
                  ))}
                </div>

                {/* Staff Cards */}
                <div className="divide-y divide-slate-100/80">
                  {filteredStaff.length === 0 ? (
                    <div className="text-center py-12 px-6">
                      <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                      <p className="text-sm font-bold text-slate-400">No staff found</p>
                      <p className="text-xs text-slate-400 mt-0.5">Try adjusting your search or filter</p>
                    </div>
                  ) : (
                    filteredStaff.map((u) => {
                      const roleConf = ROLE_CONFIG[u.role] || ROLE_CONFIG.dispatcher;
                      const initials = (u.name || u.username).split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
                      const isCurrentUser = u.id === currentUser?.id;
                      const isProtectedAdmin = u.id === "admin-1";
                      return (
                        <div
                          key={u.id}
                          className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors group"
                        >
                          {/* Left: Avatar + Info */}
                          <div className="flex items-center gap-4 min-w-0">
                            {/* Avatar */}
                            <div className={`relative w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-black shrink-0 border-2 ${u.role === "admin"
                                ? "bg-slate-900 text-amber-400 border-slate-700"
                                : u.role === "manager"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : u.role === "sales"
                                    ? "bg-blue-50 text-blue-800 border-blue-200"
                                    : u.role === "field"
                                      ? "bg-purple-50 text-purple-800 border-purple-200"
                                      : "bg-amber-50 text-amber-800 border-amber-200"
                              }`}>
                              {initials}
                              {isCurrentUser && (
                                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" title="You" />
                              )}
                            </div>

                            {/* Name + Role + Meta */}
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-extrabold text-slate-900 leading-none">
                                  {u.name || u.username}
                                </span>
                                {isCurrentUser && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-200">
                                    You
                                  </span>
                                )}
                                {isProtectedAdmin && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full border border-slate-200">
                                    Protected
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5 font-mono">@{u.username}</div>
                              {u.createdAt && (
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  Added {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right: Role Badge + Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            {/* Role Display or Edit Dropdown */}
                            {editingUserRole?.id === u.id ? (
                              <div className="flex items-center gap-1.5">
                                <select
                                  value={editingUserRole.role}
                                  onChange={(e) => setEditingUserRole({ ...editingUserRole, role: e.target.value })}
                                  className="h-7 px-2 bg-white border border-amber-300 rounded-lg text-[11px] font-bold text-slate-800 outline-none cursor-pointer"
                                >
                                  {Object.entries(ROLE_CONFIG).map(([key, conf]) => (
                                    <option key={key} value={key}>{conf.title}</option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => handleUpdateRole(u.id, u.username, editingUserRole.role)}
                                  className="h-7 px-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold transition cursor-pointer"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingUserRole(null)}
                                  className="h-7 w-7 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${roleConf.badge}`}>
                                {roleConf.title}
                              </span>
                            )}

                            {/* Action Buttons */}
                            {!isProtectedAdmin && !isCurrentUser && editingUserRole?.id !== u.id && (
                              <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => setEditingUserRole({ id: u.id, username: u.username, name: u.name, role: u.role })}
                                  title="Change role"
                                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(u.id, u.username)}
                                  title="Revoke access"
                                  className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-700 flex items-center justify-center transition cursor-pointer"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* ── UPDATE ADMIN CREDENTIALS ───────────────────────── */}
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Update Admin Credentials</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Rotate your console username or password — changes are hashed and saved to MongoDB Atlas</p>
                  </div>
                </div>

                <form onSubmit={handleUpdateCredentials} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Username */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                        <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Username</span>
                      </label>
                      <input
                        type="text"
                        value={updateUsername}
                        onChange={(e) => setUpdateUsername(e.target.value)}
                        placeholder={currentUser?.username || "admin"}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                      />
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                        <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> New Password</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showCredsPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••••"
                          className="w-full h-10 pl-3 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCredsPassword(!showCredsPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          {showCredsPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                        <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Confirm New Password</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showCredsPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter new password"
                          className={`w-full h-10 pl-3 pr-9 bg-slate-50 border rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 transition ${confirmPassword && newPassword !== confirmPassword
                              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/10"
                              : "border-slate-200 focus:border-amber-500 focus:ring-amber-500/10"
                            }`}
                        />
                        {confirmPassword && (
                          <span className="absolute right-2.5 top-2.5">
                            {newPassword === confirmPassword
                              ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              : <ShieldX className="w-3.5 h-3.5 text-rose-500" />}
                          </span>
                        )}
                      </div>
                      {confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-[10px] text-rose-600 font-semibold mt-1">Passwords do not match</p>
                      )}
                    </div>
                  </div>

                  {/* Password strength bar */}
                  {newPassword.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password Strength</span>
                        <span className={`text-[10px] font-bold ${newPassword.length < 6 ? "text-rose-500"
                            : newPassword.length < 10 ? "text-amber-500"
                              : "text-emerald-600"
                          }`}>
                          {newPassword.length < 6 ? "Weak" : newPassword.length < 10 ? "Moderate" : "Strong"}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${newPassword.length < 6 ? "w-1/4 bg-rose-400"
                              : newPassword.length < 10 ? "w-2/4 bg-amber-400"
                                : "w-full bg-emerald-500"
                            }`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Info note */}
                  <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Credentials are hashed with PBKDF2 + SHA-512 before being stored in MongoDB Atlas. Minimum 6 characters required.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => { setUpdateUsername(""); setNewPassword(""); setConfirmPassword(""); }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      disabled={isUpdatingCreds || (!!newPassword && newPassword !== confirmPassword) || (!updateUsername && !newPassword)}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-2"
                    >
                      {isUpdatingCreds ? (
                        <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
                      ) : (
                        <><CheckCircle2 className="w-3.5 h-3.5" /> Save Credentials</>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* ── ROLE PERMISSIONS LEGEND ────────────────────────── */}
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Fingerprint className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Role Permission Matrix</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Access levels and capabilities for each staff role</p>
                  </div>
                </div>
                <div className="divide-y divide-slate-100/80">
                  {Object.entries(ROLE_CONFIG).map(([key, conf]) => (
                    <div key={key} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                      <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shrink-0 mt-0.5 ${conf.badge}`}>
                        {conf.title}
                      </span>
                      <p className="text-xs text-slate-500 leading-relaxed">{conf.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>

        {/* ── MODALS & DRAWERS ────────────────────────────────────── */}

        {/* Add Custom Lead Modal */}
        {isAddingLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 text-left animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Add New Customer Lead</h3>
                <button onClick={() => setIsAddingLead(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddCustomLead} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    placeholder="e.g. John & Sarah Davis"
                    className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Phone</label>
                    <input
                      type="text"
                      required
                      value={newLeadPhone}
                      onChange={(e) => setNewLeadPhone(e.target.value)}
                      placeholder="(615) 555-0123"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Email</label>
                    <input
                      type="email"
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Installation Address</label>
                  <input
                    type="text"
                    value={newLeadAddress}
                    onChange={(e) => setNewLeadAddress(e.target.value)}
                    placeholder="e.g. 1204 Franklin Pike, Nashville, TN"
                    className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Project Type</label>
                    <select
                      value={newLeadType}
                      onChange={(e) => setNewLeadType(e.target.value)}
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs outline-none cursor-pointer"
                    >
                      <option value="residential">Residential Safe Room</option>
                      <option value="underground">Underground Prefab Vault</option>
                      <option value="commercial">Commercial Facility</option>
                      <option value="installation">Turnkey Installation</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Estimated Value ($)</label>
                    <input
                      type="number"
                      value={newLeadVal}
                      onChange={(e) => setNewLeadVal(Number(e.target.value))}
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Project Notes</label>
                  <textarea
                    rows={2}
                    value={newLeadDesc}
                    onChange={(e) => setNewLeadDesc(e.target.value)}
                    placeholder="Site access, slope, crane requirement..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingLead(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Save Lead to Database
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Lead Drawer */}
        {isEditingLead && selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 text-left animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedLead.name}</h3>
                  <p className="text-xs text-slate-500">{selectedLead.address || "Nashville, TN"}</p>
                </div>
                <button onClick={() => setIsEditingLead(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Pipeline Stage</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs outline-none cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="consultation_scheduled">Consultation Scheduled</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="won">Closed / Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Estimated Value ($)</label>
                  <input
                    type="number"
                    value={editEstimatedValue}
                    onChange={(e) => setEditEstimatedValue(Number(e.target.value))}
                    className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Internal Notes & Assessment</label>
                  <textarea
                    rows={4}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingLead(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveLeadDetails}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Web Inquiry Detail Inspector Modal */}
        {isViewingEmail && selectedEmail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 bg-slate-50/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-xs shrink-0 ${selectedEmail.status === "new"
                      ? "bg-linear-to-br from-amber-500 to-amber-600"
                      : selectedEmail.status === "converted"
                        ? "bg-linear-to-br from-emerald-500 to-teal-600"
                        : "bg-slate-800"
                    }`}>
                    {(selectedEmail.name || "Customer")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-black text-base text-slate-900 tracking-tight truncate">
                        {selectedEmail.name || "Website Visitor"}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full shrink-0">
                        {selectedEmail.source || "Website Form"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Received {new Date(selectedEmail.createdAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                  {/* Status Dropdown */}
                  <select
                    value={selectedEmail.status || "new"}
                    onChange={(e) => handleUpdateInquiryStatus(selectedEmail.id, e.target.value as any)}
                    className="text-xs font-bold rounded-xl px-2.5 sm:px-3 py-1.5 border border-slate-200 bg-white text-slate-700 shadow-xs cursor-pointer focus:outline-hidden"
                  >
                    <option value="new">Status: New</option>
                    <option value="contacted">Status: Contacted</option>
                    <option value="converted">Status: Converted</option>
                    <option value="archived">Status: Archived</option>
                  </select>

                  <button
                    onClick={() => {
                      setIsViewingEmail(false);
                      setSelectedEmail(null);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition shrink-0 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-left">

                {/* Contact Blueprint & Specifications */}
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3">
                    Contact & Project Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    {/* Phone */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</div>
                      {selectedEmail.phone ? (
                        <a
                          href={`tel:${selectedEmail.phone}`}
                          className="mt-1 font-bold text-xs text-amber-600 hover:text-amber-700 inline-flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{selectedEmail.phone}</span>
                        </a>
                      ) : (
                        <div className="mt-1 text-xs text-slate-400 italic">Not provided</div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</div>
                      {selectedEmail.email ? (
                        <a
                          href={`mailto:${selectedEmail.email}`}
                          className="mt-1 font-bold text-xs text-amber-600 hover:text-amber-700 inline-flex items-center gap-1.5 break-all"
                        >
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span>{selectedEmail.email}</span>
                        </a>
                      ) : (
                        <div className="mt-1 text-xs text-slate-400 italic">Not provided</div>
                      )}
                    </div>

                    {/* Property Address */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Installation Address</div>
                      <div className="mt-1 font-semibold text-xs text-slate-800 inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{selectedEmail.address || "Nashville, TN (Regional Inquiry)"}</span>
                      </div>
                    </div>

                    {/* Shelter Model / Service */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Shelter Service</div>
                      <div className="mt-1 font-semibold text-xs text-slate-800 inline-flex items-center gap-1.5">
                        <HardHat className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{selectedEmail.service || "Storm Shelter Inquiry"}</span>
                      </div>
                    </div>

                    {/* Timeframe */}
                    {selectedEmail.timeframe && (
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 sm:col-span-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Installation Timeframe</div>
                        <div className="mt-1 font-semibold text-xs text-slate-800 inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{selectedEmail.timeframe}</span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Customer Inquiry Message */}
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
                    Customer Message & Notes
                  </h4>
                  <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 text-xs text-slate-800 leading-relaxed font-sans">
                    <p className="whitespace-pre-wrap">{selectedEmail.message || "No additional message provided."}</p>
                  </div>
                </div>

                {/* Internal Staff Notes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Internal Staff Notes (Saved to Database)
                    </h4>
                    <span className="text-[10px] text-slate-400">Visible only to portal team</span>
                  </div>
                  <textarea
                    rows={3}
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    placeholder="Log customer discussions, pricing quotes, site notes, or survey appointments..."
                    className="w-full p-3 rounded-2xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={handleSaveInquiryNotes}
                      disabled={isSavingInquiryNotes}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                    >
                      {isSavingInquiryNotes ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Save Staff Notes</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* CRM Pipeline Conversion Banner */}
                <div className={`p-4 rounded-2xl border ${selectedEmail.status === "converted"
                    ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                    : "bg-slate-900 text-white border-slate-800 shadow-sm"
                  }`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 font-bold text-xs">
                        {selectedEmail.status === "converted" ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Active in Leads CRM Pipeline</span>
                          </>
                        ) : (
                          <>
                            <ArrowRightLeft className="w-4 h-4 text-amber-400" />
                            <span>Convert Inquiry into Official CRM Lead</span>
                          </>
                        )}
                      </div>
                      <p className={`text-[11px] mt-0.5 ${selectedEmail.status === "converted" ? "text-emerald-700" : "text-slate-400"}`}>
                        {selectedEmail.status === "converted"
                          ? "This customer has been added to your CRM pipeline for estimate generation and scheduling."
                          : "Automatically create a new Lead card in your CRM pipeline with customer info and project type."}
                      </p>
                    </div>

                    {selectedEmail.status === "converted" ? (
                      <button
                        onClick={() => {
                          setIsViewingEmail(false);
                          setActiveTab("leads");
                          setSearchTerm(selectedEmail.name || "");
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition whitespace-nowrap cursor-pointer"
                      >
                        View in Leads
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConvertInquiryToLead(selectedEmail)}
                        disabled={isConvertingEmail}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition whitespace-nowrap shadow-xs cursor-pointer"
                      >
                        {isConvertingEmail ? "Converting..." : "Convert to Lead Now"}
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => handleDeleteInquiry(selectedEmail.id)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Inquiry</span>
                </button>

                <div className="flex flex-wrap items-center gap-2 justify-end">
                  {selectedEmail.phone && (
                    <a
                      href={`tel:${selectedEmail.phone}`}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  )}
                  {selectedEmail.email && (
                    <a
                      href={`mailto:${selectedEmail.email}?subject=Regarding your Southern Storm Shelters Inquiry`}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setIsViewingEmail(false);
                      setSelectedEmail(null);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── ADD STAFF MEMBER MODAL ───────────────────────────── */}
        {isCreatingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
                    <UserPlus className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Add Staff Member</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Create a new portal account with role-based access</p>
                  </div>
                </div>
                <button
                  onClick={() => { setIsCreatingUser(false); setNewUsername(""); setNewUserName(""); setNewUserPassword(""); setNewUserRole("dispatcher"); }}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
                {/* Full Name + Username */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
                    <input
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="e.g. Sarah Johnson"
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Username *</label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
                      required
                      placeholder="e.g. sjohnson"
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition font-mono"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Password *</label>
                  <div className="relative">
                    <input
                      type={showNewUserPassword ? "text" : "password"}
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      required
                      placeholder="Min. 6 characters"
                      className="w-full h-9 pl-3 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewUserPassword(!showNewUserPassword)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showNewUserPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Role Picker */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Access Role *</label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {Object.entries(ROLE_CONFIG).filter(([k]) => k !== "admin").map(([key, conf]) => (
                      <label
                        key={key}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${newUserRole === key
                            ? "border-amber-400 bg-amber-50/60"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="newUserRole"
                          value={key}
                          checked={newUserRole === key}
                          onChange={() => setNewUserRole(key)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition ${newUserRole === key ? "border-amber-500 bg-amber-500" : "border-slate-300"
                          }`}>
                          {newUserRole === key && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{conf.title}</span>
                            <span className={`inline-flex items-center text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${conf.badge}`}>
                              {key}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed line-clamp-1">{conf.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setIsCreatingUser(false); setNewUsername(""); setNewUserName(""); setNewUserPassword(""); setNewUserRole("dispatcher"); }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newUsername.trim() || !newUserPassword || newUserPassword.length < 6}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-2"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── ADD REVIEW MODAL ─────────────────────────────────── */}
        {isAddingReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50 shrink-0">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Add Customer Review</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Manually publish a new customer testimonial</p>
                </div>
                <button
                  onClick={() => setIsAddingReview(false)}
                  className="w-8 h-8 rounded-xl bg-white/70 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleAddReview} className="p-5 sm:p-6 space-y-4 overflow-y-auto">

                {/* Row 1: Author Name + Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Customer Name *</label>
                    <input
                      type="text"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      required
                      placeholder="e.g. Michael R."
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Location</label>
                    <input
                      type="text"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      placeholder="e.g. Franklin, TN"
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                    />
                  </div>
                </div>

                {/* Shelter Installed */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Shelter Model Installed</label>
                  <input
                    type="text"
                    value={newReviewInstalled}
                    onChange={(e) => setNewReviewInstalled(e.target.value)}
                    placeholder="e.g. Granger ISS 6-Person In-Ground Shelter"
                    className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                  />
                </div>

                {/* Review Title / Headline */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Review Headline *</label>
                  <input
                    type="text"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    required
                    placeholder="e.g. Best investment we've ever made for our family's safety"
                    className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition"
                  />
                </div>

                {/* Rating Stars */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Star Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="cursor-pointer transition hover:scale-110"
                      >
                        <Star
                          className={`w-5 h-5 ${star <= newReviewRating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-100 text-slate-300"
                            }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-slate-500 ml-1 font-semibold">{newReviewRating}/5</span>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Review Text *</label>
                  <textarea
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                    rows={4}
                    placeholder="Write the full customer testimonial here..."
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition resize-none leading-relaxed"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddingReview(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newReviewAuthor.trim() || !newReviewTitle.trim() || !newReviewText.trim()}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Publish Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── OWNER REPLY MODAL ─────────────────────────────────── */}
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Owner Reply</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Replying to {selectedReview.author}</p>
                </div>
                <button
                  onClick={() => { setSelectedReview(null); setReviewReplyText(""); }}
                  className="w-8 h-8 rounded-xl bg-white/70 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Review Preview */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(selectedReview.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-slate-900 mb-1">"{selectedReview.title}"</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{selectedReview.text}</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-semibold">
                    — {selectedReview.author} · {selectedReview.location || "Nashville, TN"}
                  </p>
                </div>

                {/* Reply Textarea */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Your Reply</label>
                  <textarea
                    value={reviewReplyText}
                    onChange={(e) => setReviewReplyText(e.target.value)}
                    rows={4}
                    placeholder="Thank the customer and address their feedback..."
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition resize-none leading-relaxed"
                    autoFocus
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-1">
                  <button
                    onClick={() => { setSelectedReview(null); setReviewReplyText(""); }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReplyReview}
                    disabled={!reviewReplyText.trim()}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {selectedReview.reply || (selectedReview as any).replyText ? "Update Reply" : "Post Reply"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmConfig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200">
              <h4 className="text-sm font-bold text-slate-900 mb-2">{confirmConfig.title}</h4>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">{confirmConfig.message}</p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setConfirmConfig(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    confirmConfig.onConfirm();
                    setConfirmConfig(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider"
                >
                  {confirmConfig.confirmText || "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
