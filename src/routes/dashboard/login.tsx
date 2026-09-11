import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { User, Lock, ArrowRight, ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { loginAdmin, verifyAdminToken } from "@/lib/leads-store";
import logo from "@/assets/logo-mark.png";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  // Check if already authenticated on mount
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("electrical-session-token");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await loginAdmin(username, password);
      if (res && res.success) {
        toast.success("Authentication successful. Welcome back!");
        navigate({ to: "/dashboard" });
      } else {
        setErrorMsg("Invalid username or password. Please verify your .env credentials.");
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
      <div className="min-h-screen bg-[#0B0F15] flex items-center justify-center">
        <div className="h-7 w-7 rounded-full border-2 border-[#dc2626] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F15] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Return Link */}
      <div className="absolute top-6 left-6 z-20">
        <a 
          href="/" 
          className="text-xs text-white/50 hover:text-white uppercase font-bold tracking-widest transition-colors duration-300 flex items-center gap-1.5"
        >
          ← Back to Site
        </a>
      </div>

      <div
        className="w-full max-w-md bg-gradient-to-b from-[#111722]/95 to-[#0B0F15]/98 backdrop-blur-md border border-red-500/20 rounded-3xl shadow-[0_16px_50px_0_rgba(0,0,0,0.6)] p-8 sm:p-10 flex flex-col items-center text-center relative z-10 hover:border-red-500/40 transition-all duration-300"
      >
        {/* Logo and Branding */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 mb-2 shadow-inner">
            <img src={logo} alt="Southern Storm Shelters Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#dc2626] select-none">
            Southern Storm Shelters LLC
          </h2>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            Admin Portal
          </h1>
          <p className="text-[11.5px] text-slate-400 font-medium max-w-xs mt-1 leading-relaxed">
            Secure management for storm shelter installations, customer inquiries, leads, and reviews.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="w-full mb-6 text-left animate-in fade-in slide-in-from-top-2 duration-250">
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3.5 flex items-start gap-3">
              <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-rose-300 leading-relaxed">{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full text-left space-y-4">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/20 focus:outline-none transition-all duration-300"
              />
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/20 focus:outline-none transition-all duration-300"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            </div>
          </div>

          {/* Credentials helper hint */}
          <div className="flex items-center justify-between px-1 pt-1 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dc2626]" />
              FEMA P-320 Compliant Console
            </span>
            <span className="text-[10px] text-slate-500">
              Default: <code className="text-slate-300 font-mono">admin / admin123</code>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#dc2626] text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-red-600/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] select-none cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-75 disabled:pointer-events-none mt-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                <span>Authenticating...</span>
              </span>
            ) : (
              <>
                <span>Enter Admin Console</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer bar */}
      <div className="absolute bottom-6 text-center text-[10px] text-white/40 font-semibold tracking-wider uppercase">
        © {new Date().getFullYear()} Southern Storm Shelters LLC · Admin Portal
      </div>
    </div>
  );
}
