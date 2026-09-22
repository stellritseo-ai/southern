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
  HardHat,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/config/site-config";

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

      {/* ── TOP UTILITY BAR (Architectural Dark Slate & Amber) ────── */}
      <div
        className={cn(
          "w-full bg-[#0b0f15] text-white border-b border-slate-800 px-4 sm:px-6 lg:px-8 pointer-events-auto transition-all duration-300 origin-top overflow-hidden",
          scrolled ? "max-h-0 py-0 opacity-0 border-none" : "max-h-14 py-2 opacity-100"
        )}
      >
        <div className="mx-auto max-w-7xl flex flex-row justify-between items-center w-full gap-4">

          {/* Left: Hours & Location */}
          <div className="flex items-center gap-4 text-slate-300 min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Clock className="h-3 w-3 text-amber-400" />
                {t(SITE_CONFIG.operatingHours.shortBadge, "Lun-Sáb: 8:00 AM–5:00 PM")}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 border-l border-white/15 pl-4 text-[11px] font-semibold text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span>{t(SITE_CONFIG.serviceRadius, SITE_CONFIG.serviceRadius)}</span>
            </div>
          </div>

          {/* Right: Office Hours & Language Switcher */}
          <div className="flex items-center gap-4 text-xs shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300 font-semibold text-[11px]">
              <HardHat className="h-3.5 w-3.5 text-amber-400" />
              <span>Nashville Construction Team</span>
            </div>

            <div className="flex items-center gap-1 bg-black/60 border border-slate-700 rounded-full px-1.5 py-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold transition-all cursor-pointer",
                  language === "en"
                    ? "bg-amber-600 text-white shadow-sm border border-amber-500/50"
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
                    ? "bg-amber-600 text-white shadow-sm border border-amber-500/50"
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
            ? "py-2 bg-white/98 backdrop-blur-md shadow-md border-b border-slate-200"
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
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[11px] font-extrabold rounded-full px-3.5 py-1.5 border border-amber-500/50 shadow-sm active:scale-95 transition-transform"
              >
                <Phone className="h-3.5 w-3.5 fill-current" />
                <span className="hidden xs:inline">{SITE_CONFIG.phone}</span>
                <span className="inline xs:hidden">Call</span>
              </a>
              <button
                aria-label="Toggle navigation menu"
                onClick={() => setOpen((v) => !v)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-[#0b0f15] transition hover:border-amber-500 active:scale-95"
              >
                {open ? <X className="h-5 w-5 text-slate-800" /> : <Menu className="h-5 w-5 text-slate-800" />}
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
                              ? "text-amber-700 bg-amber-50 border border-amber-200"
                              : "text-[#0b0f15] hover:text-amber-600"
                          )}
                          style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase" }}
                        >
                          {t("Storm Shelters", "Refugios")}
                          <ChevronDown className="h-3.5 w-3.5 text-amber-600 group-hover/nav:rotate-180 transition-transform duration-200" />
                        </Link>

                        {/* ── SUBMENU DROPDOWN ──────────────── */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 pt-3 opacity-0 invisible pointer-events-none group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:pointer-events-auto transition-all duration-300 transform group-hover/nav:translate-y-0 translate-y-2">
                          <div className="w-[640px] max-w-[calc(100vw-32px)] bg-white border border-slate-200 rounded-[24px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.2)] p-5 sm:p-6 flex flex-col gap-4.5 relative overflow-hidden backdrop-blur-xl">

                            {/* Subtle background glow */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                            {/* Submenu Top Header Bar */}
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3.5 relative z-10">
                              <div className="flex items-center gap-2">
                                <span className="p-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                                  <HardHat className="w-4 h-4 text-amber-600" />
                                </span>
                                <span className="text-[11px] font-black text-[#0b0f15] uppercase tracking-widest">
                                  {t("Engineered Underground Safety Systems", "Sistemas de Seguridad Diseñados")}
                                </span>
                              </div>
                              <Link
                                to="/services"
                                className="text-[11px] font-extrabold uppercase text-amber-700 hover:text-amber-800 tracking-wider transition-colors flex items-center gap-1 group/all cursor-pointer"
                              >
                                <span>{t("Explore All Shelters", "Ver Todos Los Refugios")}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover/all:translate-x-1 transition-transform" />
                              </Link>
                            </div>

                            {/* 2-Column Service Cards Grid */}
                            <div className="grid grid-cols-2 gap-3 relative z-10">
                              {serviceLinks.map((srv) => (
                                <Link
                                  key={srv.l}
                                  to={srv.to}
                                  className="group/item flex items-start gap-3.5 rounded-2xl p-3 bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all duration-300 text-left relative overflow-hidden cursor-pointer"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 group-hover/item:bg-amber-600 border border-amber-500/20 flex items-center justify-center text-amber-700 group-hover/item:text-white transition-all duration-300 shrink-0 shadow-xs group-hover/item:scale-105">
                                    <srv.icon className="h-5 w-5" />
                                  </div>
                                  <div className="flex flex-col text-left min-w-0 pr-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[13px] font-extrabold text-[#0b0f15] group-hover/item:text-amber-700 transition-colors leading-tight truncate">
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

                            {/* Construction Consultation Banner inside Submenu */}
                            <div className="bg-gradient-to-r from-[#0b0f15] to-[#1e293b] border border-slate-700 rounded-2xl p-4 flex justify-between items-center gap-4 relative z-10 shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-sm">
                                  <Wrench className="h-5 w-5 text-amber-400" />
                                </div>
                                <div className="flex flex-col text-left">
                                  <span className="text-[12px] font-extrabold text-white">
                                    {t("Turnkey Installation & Engineering Consultation", "Instalación Llave en Mano y Consulta")}
                                  </span>
                                  <span className="text-[10px] text-slate-300 font-medium mt-0.5">
                                    {t("On-site property evaluations & precision crane setting in Middle TN.", "Evaluaciones en el sitio e instalaciones con grúa en Middle TN.")}
                                  </span>
                                </div>
                              </div>
                              <a
                                href={`tel:${SITE_CONFIG.phoneRaw}`}
                                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-[11px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all border border-amber-500/50 shadow-md whitespace-nowrap active:scale-95 flex items-center gap-1.5"
                              >
                                <span>{t("Call " + SITE_CONFIG.phone, "Llamar " + SITE_CONFIG.phone)}</span>
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
                          ? "text-amber-700 bg-amber-50 border border-amber-200"
                          : "text-[#0b0f15] hover:text-amber-600"
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
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white flex items-center gap-2.5 shadow-[0_8px_25px_-6px_rgba(217,119,6,0.4)] hover:shadow-[0_12px_30px_-4px_rgba(217,119,6,0.6)] transition-all duration-300 shrink-0 px-4.5 py-2.5 border border-amber-500/50 active:scale-95 rounded-full cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shrink-0 shadow-xs">
                  <Phone className="h-3.5 w-3.5 fill-current text-white" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-100">
                    {t("Call Our Team", "Llámenos")}
                  </span>
                  <span className="text-xs lg:text-sm font-black text-white mt-0.5 tracking-tight">
                    {SITE_CONFIG.phone}
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
          "md:hidden overflow-y-auto transition-[max-height,opacity] duration-300 bg-white pointer-events-auto shadow-2xl border-t border-amber-500/30",
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
                        className="p-1 text-amber-600 cursor-pointer"
                        aria-label="Toggle services submenu"
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-amber-600 transition-transform duration-300",
                            servicesOpen && "rotate-180"
                          )}
                        />
                      </button>
                    </div>

                    {servicesOpen && (
                      <div className="ml-4 pl-4 border-l-2 border-amber-600/30 space-y-1.5 py-1">
                        {serviceLinks.map((srv) => (
                          <Link
                            key={srv.l}
                            to={srv.to}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 py-2 px-2 rounded-xl text-[13px] font-bold text-[#0b0f15] hover:text-amber-600 hover:bg-slate-50 transition cursor-pointer"
                            style={{ fontSize: "13px", fontWeight: 700 }}
                          >
                            <srv.icon className="h-4 w-4 text-amber-600 shrink-0" />
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
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "text-[#0b0f15] hover:bg-slate-50"
                  )}
                  style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase" }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Contact & Consultation Card */}
          <div className="border-t border-slate-200 pt-5 flex flex-col gap-4">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3.5 text-sm font-black border border-amber-500/40 shadow-lg transition"
            >
              <Phone className="h-4 w-4 fill-current" />
              <span>{SITE_CONFIG.phone}</span>
            </a>

            <div className="flex flex-col gap-2.5 text-xs text-slate-600 font-semibold px-2">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 hover:text-amber-600 transition"
              >
                <Mail className="h-4 w-4 text-amber-600 shrink-0" />
                <span className="truncate">{SITE_CONFIG.email}</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                <span>{SITE_CONFIG.addressShort}</span>
              </div>
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 mt-2">
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                  language === "en"
                    ? "bg-amber-600 text-white shadow-sm border border-amber-500/40"
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
                    ? "bg-amber-600 text-white shadow-sm border border-amber-500/40"
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
