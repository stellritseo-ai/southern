import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  User, 
  Lock, 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowLeft, 
  HardHat,
  CheckCircle2,
  LockKeyhole,
  Clock,
  Layers,
  PhoneCall
} from "lucide-react";
import { toast } from "sonner";
import { loginAdmin, verifyAdminToken } from "@/lib/leads-store";
import logoImg from "@/assets/logo.png";
import shelterImg from "@/assets/granger-install.jpg";

export const Route = createFileRoute("/dashboard/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal Access | Southern Storm Shelters LLC" },
      { name: "description", content: "Authenticate to access Southern Storm Shelters LLC business console." },
      { name: "robots", content: "noindex, nofollow" }
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  // Check if already authenticated on mount
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("shelter-session-token") || localStorage.getItem("electrical-session-token");
      if (token) {
        const isValid = await verifyAdminToken(token);
        if (isValid) {
          navigate({ to: "/dashboard" });
          return;
        }
      }
      setCheckingSession(false);
    };
    checkToken();
  }, [navigate]);

  const handleQuickFill = () => {
    setUsername("admin");
    setPassword("admin123");
    setErrorMsg("");
    toast.info("Demo credentials loaded: admin / admin123");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg("Please enter both your username and password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await loginAdmin(username, password);
      if (res && res.success) {
        toast.success("Authentication successful. Welcome to the Console!");
        navigate({ to: "/dashboard" });
      } else {
        setErrorMsg("Invalid username or password. Please verify credentials.");
        toast.error("Invalid credentials.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to communicate with authentication server.");
      toast.error("Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-amber-600 border-t-transparent animate-spin" />
        <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Loading console...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* ── LEFT SHOWCASE PANEL (Visible on lg screens, 45% width) ── */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[44%] bg-gradient-to-br from-slate-100/90 via-[#F8FAFC] to-amber-50/40 border-r border-slate-200/90 p-8 xl:p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle engineering grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-slate-300/30 rounded-full blur-2xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <div className="inline-block bg-white/95 rounded-2xl p-3 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] mb-6">
            <img 
              src={logoImg} 
              alt="Southern Storm Shelters LLC" 
              className="h-10 xl:h-12 w-auto object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-[11px] font-bold tracking-wide uppercase mb-3">
            <HardHat className="w-3.5 h-3.5 text-amber-700" />
            <span>Operations & Dispatch Control</span>
          </div>

          <h2 className="text-2xl xl:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Tennessee's Premier Storm Shelter Construction & In-Ground Vaults
          </h2>
          <p className="text-xs xl:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
            Real-time pipeline management for residential safe rooms, heavy excavator site prep, and turnkey professional installations.
          </p>
        </div>

        {/* Centerpiece Image Card with Live Badges */}
        <div className="relative z-10 my-8">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.1)] group">
            <img 
              src={shelterImg} 
              alt="Heavy Crane Shelter Installation" 
              className="w-full h-48 xl:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            {/* In-image caption & live badge */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-amber-400">Field Operations</p>
                <p className="text-xs font-bold text-white tracking-tight">Turnkey Crane Placement & Anchoring</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Crews
              </span>
            </div>
          </div>

          {/* Quick Feature Pillars */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-3 shadow-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Lead Automation</h4>
                <p className="text-[11px] text-slate-500 leading-snug">Instant quote routing & call logs</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-3 shadow-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Craftsmanship</h4>
                <p className="text-[11px] text-slate-500 leading-snug">Heavy steel & precision vault doors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Footer */}
        <div className="relative z-10 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <LockKeyhole className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Encrypted Data Tunnel</span>
          </div>
          <span>Nashville, TN</span>
        </div>
      </div>

      {/* ── RIGHT AUTHENTICATION PANEL (55% on lg screens, 100% on mobile) ── */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 relative bg-white">
        
        {/* Top Bar Navigation */}
        <div className="w-full flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-all duration-200 shadow-xs group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-1 group-hover:text-amber-600 transition-all duration-200" />
            <span>Back to Public Website</span>
          </a>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">System Status:</span>
            <span className="font-bold text-slate-700">Online</span>
          </div>
        </div>

        {/* Login Form Center Box */}
        <div className="w-full max-w-md mx-auto my-8">
          
          {/* Mobile brand header (shown if screen < lg) */}
          <div className="lg:hidden mb-6 flex flex-col items-center text-center">
            <div className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-sm mb-3">
              <img 
                src={logoImg} 
                alt="Southern Storm Shelters LLC" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Operations Portal
            </span>
          </div>

          {/* Heading */}
          <div className="mb-7 text-left">
            <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 text-[10.5px] font-extrabold uppercase tracking-wider text-amber-800 mb-2.5">
              <LockKeyhole className="w-3 h-3 text-amber-700" />
              <span>Admin Authentication</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sign In to Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed font-normal">
              Enter your verified credentials to access leads, customer inquiries, reviews, and site operations.
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 animate-in fade-in slide-in-from-top-2 duration-250">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start gap-2.5">
                <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-rose-800 leading-snug">{errorMsg}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div className="space-y-1.5">
              <label 
                htmlFor="username" 
                className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block"
              >
                Username or Account ID
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin"
                  className="w-full h-12 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-amber-600 focus:ring-4 focus:ring-amber-500/10 rounded-xl pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all duration-200 outline-none"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your security password"
                  className="w-full h-12 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-amber-600 focus:ring-4 focus:ring-amber-500/10 rounded-xl pl-11 pr-11 text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all duration-200 outline-none"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer rounded-md focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember device checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-medium">Keep me signed in</span>
              </label>

              <span className="text-xs text-slate-400 font-medium">
                Console v2.4
              </span>
            </div>

            {/* Demo Quick-Fill Pill */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between text-xs text-amber-950">
              <div className="flex items-center gap-2 truncate">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="truncate">
                  Demo access: <strong className="font-mono text-slate-900 bg-white px-1.5 py-0.5 rounded border border-amber-200">admin</strong> / <strong className="font-mono text-slate-900 bg-white px-1.5 py-0.5 rounded border border-amber-200">admin123</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 bg-amber-200/70 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ml-2 inline-flex items-center gap-1 shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Auto-Fill</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 active:from-amber-800 active:to-amber-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md shadow-amber-600/25 hover:shadow-lg hover:shadow-amber-600/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] select-none cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-75 disabled:pointer-events-none mt-4"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Verifying Credentials...</span>
                </span>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>

          {/* Direct Assistance Hint */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Trouble signing in?</span>
            <a 
              href="tel:6158061445" 
              className="text-amber-700 hover:text-amber-800 font-bold inline-flex items-center gap-1 hover:underline"
            >
              <PhoneCall className="w-3 h-3" />
              <span>(615) 806-1445</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full text-center text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} Southern Storm Shelters LLC · All rights reserved.
        </div>
      </div>
    </div>
  );
}
