import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  Phone,
  X,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Home,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Shield,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";
import { useLanguage } from "@/hooks/useLanguage";

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { to: "/", label: t("Home", "Inicio") },
    { to: "/about", label: t("About", "Sobre Nosotros") },
    { to: "/services", label: t("Storm Shelters", "Refugios") },
    { to: "/projects", label: t("Gallery", "Galería") },
    { to: "/reviews", label: t("Reviews", "Reseñas") },
    { to: "/free-quote", label: t("Free Estimates", "Estimaciones") },
    { to: "/contact", label: t("Contact", "Contacto") },
  ];

  const serviceLinks = [
    {
      to: "/services/in-ground-prefabricated-storm-shelters",
      l: t("In-Ground Prefabricated Storm Shelter", "Refugio Subterráneo Prefabricado"),
      desc: t("Granger ISS underground shelter with patented reverse taper, 500+ yr lifespan, and lifetime warranty", "Refugio subterráneo Granger ISS con cono invertido patentado, vida útil de más de 500 años y garantía de por vida"),
      icon: Shield,
      tag: t("Most Popular", "Más Popular"),
    },
    {
      to: "/services/custom-built-storm-shelters",
      l: t("Custom Built Storm Shelter", "Refugio de Construcción Personalizada"),
      desc: t("Custom engineered storm shelters for homes, businesses, and communities — tailored to your property", "Refugios contra tormentas personalizados para hogares, empresas y comunidades"),
      icon: Home,
      tag: t("Premium", "Premium"),
    },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full bg-transparent pointer-events-none select-none">

      {/* ── TOP UTILITY BAR (Dark #0B0F15, Storm Red #DC2626 & Amber #FBBF24) ────── */}
      <div
        className={cn(
          "w-full bg-[#0b0f15] text-white border-b border-red-500/30 px-4 sm:px-6 lg:px-8 pointer-events-auto transition-all duration-300 origin-top overflow-hidden",
          scrolled ? "max-h-0 py-0 opacity-0 border-none" : "max-h-14 py-2 opacity-100"
        )}
      >
        <div className="mx-auto max-w-7xl flex flex-row justify-between items-center w-full gap-4">

          {/* Left: Emergency Status & License */}
          <div className="flex items-center gap-4 text-slate-300 min-w-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fbbf24]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#fbbf24] flex items-center gap-1">
                <Clock className="h-3 w-3 fill-current" />
                {t("Mon-Sat: 8:00 AM–5:00 PM", "Lun-Sáb: 8:00 AM–5:00 PM")}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 border-l border-white/15 pl-4 text-[11px] font-semibold text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-[#dc2626]" />
              <span>{t("Nashville, TN", "Nashville, TN")}</span>
            </div>
          </div>

          {/* Right: Office Hours & Language Switcher */}
          <div className="flex items-center gap-4 text-xs shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300 font-semibold text-[11px]">
              <Clock className="h-3.5 w-3.5 text-red-400" />
              <span>Mon-Sat: 8:00 AM–5:00 PM</span>
            </div>

            <div className="flex items-center gap-1 bg-black/60 border border-red-500/40 rounded-full px-1.5 py-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold transition-all cursor-pointer",
                  language === "en"
                    ? "bg-[#dc2626] text-white shadow-sm border border-red-400/40"
                    : "text-slate-300 hover:text-white"
                )}
              >
                <span>🇺🇸</span>
                <span>English</span>
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold transition-all cursor-pointer",
                  language === "es"
                    ? "bg-[#dc2626] text-white shadow-sm border border-red-400/40"
                    : "text-slate-300 hover:text-white"
                )}
              >
                <span>🇲🇽</span>
                <span>Español</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── MAIN NAVIGATION BAR ───────────────────────────────── */}
      <div
        className={cn(
          "w-full transition-all duration-300 px-3 sm:px-4 lg:px-8 pointer-events-auto",
          scrolled
            ? "py-2 bg-[#FFFFFF]/98 backdrop-blur-md shadow-md border-b border-red-500/20"
            : "py-3 bg-[#F8FAFC]/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm"
        )}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between w-full gap-4">

          {/* ── MOBILE NAVBAR HEADER ───────────────────────────────── */}
          <div className="flex items-center justify-between w-full md:hidden">
            <Link to="/" className="flex items-center shrink-0" aria-label="Southern Storm Shelters LLC Home">
              <img
                src={logoImg}
                alt="Southern Storm Shelters LLC"
                className="h-7 sm:h-9 w-auto max-w-[180px] sm:max-w-[220px] object-contain"
              />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href="tel:6159912361"
                className="flex items-center gap-1.5 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white text-[11px] font-extrabold rounded-full px-3.5 py-1.5 border border-red-400/50 shadow-sm active:scale-95 transition-transform"
              >
                <Phone className="h-3.5 w-3.5 fill-current" />
                <span className="hidden xs:inline">(615) 991-2361</span>
                <span className="inline xs:hidden">Call</span>
              </a>
              <button
                aria-label="Toggle navigation menu"
                onClick={() => setOpen((v) => !v)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-[#0b0f15] transition hover:border-[#dc2626] active:scale-95"
              >
                {open ? <X className="h-5 w-5 text-[#dc2626]" /> : <Menu className="h-5 w-5 text-[#dc2626]" />}
              </button>
            </div>
          </div>

          {/* ── DESKTOP UNIFIED HEADER: BIGGER LOGO LEFT | MENU & CTA RIGHT ── */}
          <div className="hidden md:flex items-center justify-between w-full gap-6">

            {/* Left: Prominent Brand Logo */}
            <Link to="/" className="flex items-center shrink-0 group py-0.5" aria-label="Southern Storm Shelters LLC Home">
              <img
                src={logoImg}
                alt="Southern Storm Shelters LLC"
                className="h-9 lg:h-10 xl:h-11 w-auto max-w-[220px] lg:max-w-[260px] xl:max-w-[280px] object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Right Side Stack: Nav Items Pill + Phone Button */}
            <div className="flex items-center gap-3 lg:gap-4 shrink-0 ml-auto">

              {/* Nav Items Pill */}
              <nav className="rounded-full bg-white border border-slate-200 px-3 lg:px-4 py-1.5 flex items-center gap-1.5 lg:gap-2.5 shadow-sm">
                {navItems.map((item) => {
                  const active = pathname === item.to;

                  if (item.to === "/services") {
                    return (
                      <div key={item.label} className="relative group/nav">
                        <Link
                          to="/services"
                          className={cn(
                            "flex items-center gap-1 rounded-full px-2.5 lg:px-3 py-1 text-[13px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer",
                            active
                              ? "text-[#dc2626] bg-red-50 border border-red-200"
                              : "text-[#0b0f15] hover:text-[#dc2626]"
                          )}
                          style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase" }}
                        >
                          {t("Storm Shelters", "Refugios")}
                          <ChevronDown className="h-3.5 w-3.5 text-[#dc2626] group-hover/nav:rotate-180 transition-transform duration-200" />
                        </Link>

                        {/* ── PREMIUM PIXEL-PERFECT SUBMENU DROPDOWN ──────────────── */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 pt-3 opacity-0 invisible pointer-events-none group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:pointer-events-auto transition-all duration-300 transform group-hover/nav:translate-y-0 translate-y-2">
                          <div className="w-[640px] max-w-[calc(100vw-32px)] bg-white border-2 border-red-500/40 rounded-[28px] shadow-[0_25px_60px_-15px_rgba(11,15,21,0.35)] p-5 sm:p-6 flex flex-col gap-4.5 relative overflow-hidden backdrop-blur-xl">

                            {/* Subtle background glow blobs */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                            {/* Submenu Top Header Bar */}
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3.5 relative z-10">
                              <div className="flex items-center gap-2">
                                <span className="p-1 rounded-lg bg-red-50 text-[#dc2626] border border-red-200">
                                  <Sparkles className="w-4 h-4 text-[#dc2626]" />
                                </span>
                                <span className="text-[11px] font-black text-[#0b0f15] uppercase tracking-widest">
                                  {t("Engineered Underground Safety Systems", "Sistemas de Seguridad Diseñados")}
                                </span>
                              </div>
                              <Link
                                to="/services"
                                className="text-[11px] font-extrabold uppercase text-[#dc2626] hover:text-[#b91c1c] tracking-wider transition-colors flex items-center gap-1 group/all cursor-pointer"
                              >
                                <span>{t("Explore All Shelters", "Ver Todos Los Refugios")}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#dc2626] group-hover/all:translate-x-1 transition-transform" />
                              </Link>
                            </div>

                            {/* 2-Column Pixel-Perfect Service Cards Grid */}
                            <div className="grid grid-cols-2 gap-3 relative z-10">
                              {serviceLinks.map((srv) => (
                                <Link
                                  key={srv.l}
                                  to={srv.to}
                                  className="group/item flex items-start gap-3.5 rounded-2xl p-3 bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#dc2626] hover:shadow-md transition-all duration-300 text-left relative overflow-hidden cursor-pointer"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/15 to-red-600/20 group-hover/item:from-[#dc2626] group-hover/item:to-[#b91c1c] border border-red-400/40 flex items-center justify-center text-[#dc2626] group-hover/item:text-white transition-all duration-300 shrink-0 shadow-xs group-hover/item:scale-105">
                                    <srv.icon className="h-5 w-5" />
                                  </div>
                                  <div className="flex flex-col text-left min-w-0 pr-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[13px] font-extrabold text-[#0b0f15] group-hover/item:text-[#dc2626] transition-colors leading-tight truncate">
                                        {srv.l}
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-medium leading-normal mt-1 line-clamp-2">
                                      {srv.desc}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>

                            {/* Severe Weather Alert Banner inside Submenu */}
                            <div className="bg-gradient-to-r from-[#0b0f15] to-[#1e0a0d] border border-red-500/40 rounded-2xl p-4 flex justify-between items-center gap-4 relative z-10 shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#dc2626] border border-red-400/50 flex items-center justify-center text-white shrink-0 shadow-md">
                                  <AlertTriangle className="h-5 w-5 animate-pulse text-white" />
                                </div>
                                <div className="flex flex-col text-left">
                                  <span className="text-[12px] font-extrabold text-white">
                                    {t("Prepare Before Severe Weather Threatens", "Prepárese Antes del Mal Clima")}
                                  </span>
                                  <span className="text-[10px] text-slate-300 font-semibold mt-0.5">
                                    {t("On-site evaluations & turnkey installs in Nashville, TN.", "Evaluaciones en el sitio e instalaciones en Nashville, TN.")}
                                  </span>
                                </div>
                              </div>
                              <a
                                href="tel:6159912361"
                                className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#dc2626] text-white text-[11px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all border border-red-400/50 shadow-md whitespace-nowrap active:scale-95 flex items-center gap-1.5"
                              >
                                <span>{t("Call 615-991-2361", "Llamar 615-991-2361")}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-white" />
                              </a>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      className={cn(
                        "rounded-full px-2.5 lg:px-3 py-1 text-[13px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer",
                        active
                          ? "text-[#dc2626] bg-red-50 border border-red-200"
                          : "text-[#0b0f15] hover:text-[#dc2626]"
                      )}
                      style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase" }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Call Direct CTA Button */}
              <a
                href="tel:6159912361"
                className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#dc2626] text-white flex items-center gap-2.5 shadow-[0_8px_25px_-6px_rgba(220,38,38,0.5)] hover:shadow-[0_12px_30px_-4px_rgba(220,38,38,0.7)] transition-all duration-300 shrink-0 px-4.5 py-2.5 border border-red-400/50 active:scale-95 rounded-full"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shrink-0 shadow-xs">
                  <Phone className="h-3.5 w-3.5 fill-current text-white animate-pulse" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] font-black uppercase tracking-wider text-red-200">
                    {t("Call Us Today", "Llámenos Hoy")}
                  </span>
                  <span className="text-xs lg:text-sm font-black text-white mt-0.5 tracking-tight">
                    615-991-2361
                  </span>
                </div>
              </a>

            </div>

          </div>

        </div>
      </div>

      {/* ── MOBILE MENU DRAWER ─────────────────────────────────── */}
      <div
        className={cn(
          "md:hidden overflow-y-auto transition-[max-height,opacity] duration-300 bg-white pointer-events-auto shadow-2xl border-t border-red-500/30",
          open ? "max-h-[calc(100vh-70px)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-5 py-6 flex flex-col gap-6 text-left">

          {/* Nav links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.to;

              if (item.to === "/services") {
                return (
                  <div key="services-mobile" className="space-y-1">
                    <div className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-[13px] font-bold uppercase tracking-wider text-[#0b0f15] hover:bg-slate-50 transition">
                      <Link
                        to="/services"
                        onClick={() => setOpen(false)}
                        className="flex-1"
                        style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase" }}
                      >
                        {t("Storm Shelters", "Refugios")}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((v) => !v)}
                        className="p-1 text-[#dc2626] cursor-pointer"
                        aria-label="Toggle services submenu"
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-[#dc2626] transition-transform duration-300",
                            servicesOpen && "rotate-180"
                          )}
                        />
                      </button>
                    </div>

                    {servicesOpen && (
                      <div className="ml-4 pl-4 border-l-2 border-[#dc2626]/30 space-y-1.5 py-1">
                        {serviceLinks.map((srv) => (
                          <Link
                            key={srv.l}
                            to={srv.to}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 py-2 px-2 rounded-xl text-[13px] font-bold text-[#0b0f15] hover:text-[#dc2626] hover:bg-slate-50 transition cursor-pointer"
                            style={{ fontSize: "13px", fontWeight: 700 }}
                          >
                            <srv.icon className="h-4 w-4 text-[#dc2626] shrink-0" />
                            <span>{srv.l}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-[13px] font-bold uppercase tracking-wider transition-colors cursor-pointer block",
                    active
                      ? "bg-red-50 text-[#dc2626] border border-red-200"
                      : "text-[#0b0f15] hover:bg-slate-50"
                  )}
                  style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase" }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Contact & Emergency Call Card */}
          <div className="border-t border-slate-200 pt-5 flex flex-col gap-4">
            <a
              href="tel:6159912361"
              className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white py-3.5 text-sm font-black border border-red-400/40 shadow-lg transition"
            >
              <Phone className="h-4 w-4 fill-current" />
              <span>(615) 991-2361</span>
            </a>

            <div className="flex flex-col gap-2.5 text-xs text-slate-600 font-semibold px-2">
              <a
                href="mailto:admin@nashvillesiteworks.com"
                className="flex items-center gap-2.5 hover:text-[#dc2626] transition"
              >
                <Mail className="h-4 w-4 text-[#dc2626] shrink-0" />
                <span className="truncate">admin@nashvillesiteworks.com</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#dc2626] shrink-0" />
                <span>Nashville, TN</span>
              </div>
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 mt-2">
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                  language === "en"
                    ? "bg-[#dc2626] text-white shadow-sm border border-red-400/40"
                    : "text-[#0b0f15] hover:bg-white"
                )}
              >
                <span>🇺🇸</span>
                <span>English</span>
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                  language === "es"
                    ? "bg-[#dc2626] text-white shadow-sm border border-red-400/40"
                    : "text-[#0b0f15] hover:bg-white"
                )}
              >
                <span>🇲🇽</span>
                <span>Español</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </header>
  );
}
