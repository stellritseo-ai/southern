import { useEffect, useState, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  Phone,
  X,
  ChevronDown,
  Shield,
  ShieldCheck,
  Home,
  HardHat,
  ArrowRight,
  MapPin,
  Mail,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/config/site-config";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { to: "/", label: t("Home", "Inicio") },
    { to: "/about", label: t("About", "Nosotros") },
    { to: "/services", label: t("Shelters", "Refugios"), hasDropdown: true },
    { to: "/projects", label: t("Gallery", "Galería") },
    { to: "/reviews", label: t("Reviews", "Reseñas") },
    { to: "/contact", label: t("Contact", "Contacto") },
  ];

  const serviceLinks = [
    {
      to: "/services/in-ground-prefabricated-storm-shelters",
      l: t("In-Ground Prefabricated", "Refugio Prefabricado"),
      subtitle: t(
        "Granger ISS Polyethylene composite",
        "Compuesto de polietileno Granger ISS",
      ),
      desc: t(
        "Engineered underground unit with lifetime warranty against rust, rot, and cracking. Fast turnkey yard installation.",
        "Refugio subterráneo diseñado con garantía de por vida contra óxido y grietas. Instalación rápida en patio.",
      ),
      icon: ShieldCheck,
      tag: t("Most Popular", "Más Popular"),
      tagHighlight: true,
      features: [
        t("Lifetime Warranty", "Garantía de Por Vida"),
        t("1-Day Installation", "Instalación en 1 Día"),
      ],
    },
    {
      to: "/services/custom-built-storm-shelters",
      l: t("Custom Built Concrete Shelter", "Refugio de Concreto a Medida"),
      subtitle: t(
        "Poured-in-place reinforced structural concrete",
        "Concreto estructural reforzado in situ",
      ),
      desc: t(
        "FEMA 320/361 compliant safe rooms and below-ground shelters tailored to your residential or commercial property footprint.",
        "Refugios de concreto y cuartos seguros conformes a FEMA 320/361, adaptados a las dimensiones de su propiedad.",
      ),
      icon: Home,
      tag: t("Heavy Construction", "Construcción Pesada"),
      tagHighlight: false,
      features: [
        t("FEMA 320 / 361 Rated", "Norma FEMA 320 / 361"),
        t("Custom Dimensions", "Dimensiones a Medida"),
      ],
    },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Track scroll position for header transformation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 25;
      setScrolled(isScrolled);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setDesktopDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Keyboard navigation: Escape key closes menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setDesktopDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDropdownMouseEnter = () => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
      dropdownCloseTimeoutRef.current = null;
    }
    setDesktopDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setDesktopDropdownOpen(false);
    }, 180);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300">
      {/* ── TOP UTILITY & STATUS BAR ── */}
      <div
        className={cn(
          "w-full transition-all duration-300 ease-in-out border-b border-white/[0.08] bg-[#05080c] relative z-20",
          scrolled
            ? "h-0 py-0 opacity-0 -translate-y-2 pointer-events-none overflow-hidden"
            : "h-9 py-0 opacity-100 translate-y-0",
        )}
      >
        <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          {/* Left: Location & Real-Time Readiness Badge */}
          <div className="flex items-center gap-3 sm:gap-5 text-slate-300">
            {/* Radius Badge */}
            <div className="flex items-center gap-1.5 font-medium tracking-tight">
              <MapPin className="h-3 w-3 text-amber-400 shrink-0" />
              <span className="hidden sm:inline text-slate-300 text-[11px] font-semibold">
                {SITE_CONFIG.serviceRadius}
              </span>
              <span className="inline sm:hidden text-slate-300 text-[11px] font-semibold">
                Nashville, TN
              </span>
            </div>

            {/* Live Operational Status */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-3 sm:pl-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 hidden md:inline">
                {t("Crews on Standby", "Equipos en Alerta")} •
              </span>
              <span className="text-[11px] font-medium text-slate-300">
                {t(SITE_CONFIG.operatingHours.shortBadge, "Lun-Sáb: 8AM-5PM")}
              </span>
            </div>
          </div>

          {/* Right: Engineering Credential, Direct Phone & Language Toggle */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Accreditation highlight */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>
                {t("FEMA Compliant Engineering", "Ingeniería Conforme a FEMA")}
              </span>
            </div>

            {/* Social media icons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Southern Storm Shelters on Facebook"
                className="w-6 h-6 rounded-md bg-white/[0.06] hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-all duration-200"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Southern Storm Shelters on Instagram"
                className="w-6 h-6 rounded-md bg-white/[0.06] hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-all duration-200"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.google.com/business"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Southern Storm Shelters on Google"
                className="w-6 h-6 rounded-md bg-white/[0.06] hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-all duration-200"
              >
                <GoogleIcon className="w-3.5 h-3.5" />
              </a>
            </div>


          </div>
        </div>
      </div>

      {/* ── MAIN NAVIGATION BAR ── */}
      <div
        className={cn(
          "w-full transition-all duration-300 ease-in-out relative z-10",
          "bg-[#080d14]/96 backdrop-blur-md border-b border-white/[0.08]",
          scrolled
            ? "py-2.5 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.85)]"
            : "py-3.5 sm:py-4 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]",
        )}
      >
        {/* Subtle ambient amber top highlight glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              aria-label="Southern Storm Shelters - Home"
              className="group flex items-center outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-0.5"
            >
              <img
                src={logoImg}
                alt="Southern Storm Shelters"
                className={cn(
                  "w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] group-hover:opacity-95 transition-all duration-300",
                  scrolled ? "h-7 sm:h-8 lg:h-9" : "h-8 sm:h-9 lg:h-10",
                )}
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-1.5 ml-auto mr-3 sm:mr-4 lg:mr-6"
          >
            {navItems.map((item) => {
              const active =
                pathname === item.to ||
                (item.to === "/services" && pathname.startsWith("/services"));

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <Link
                      to="/services"
                      aria-haspopup="true"
                      aria-expanded={desktopDropdownOpen}
                      className={cn(
                        "relative flex items-center gap-1.5 px-3 lg:px-3.5 py-2 rounded-xl text-[12.5px] font-bold uppercase tracking-[0.06em] transition-all duration-200 cursor-pointer font-display",
                        active
                          ? "text-amber-400 bg-amber-500/[0.08] shadow-[inset_0_0_0_1px_rgba(245,158,11,0.25)]"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.06]",
                      )}
                      style={{ fontWeight: 700 }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 text-amber-400/80 transition-transform duration-300",
                          desktopDropdownOpen && "rotate-180 text-amber-400",
                        )}
                      />
                      {active && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                      )}
                    </Link>

                    {/* ── RICH SHELTERS MEGA DROPDOWN ── */}
                    <div
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 top-full z-50 pt-3 transition-all duration-200 ease-out",
                        desktopDropdownOpen
                          ? "opacity-100 visible translate-y-0 pointer-events-auto"
                          : "opacity-0 invisible translate-y-2 pointer-events-none",
                      )}
                    >
                      <div className="w-[620px] max-w-[calc(100vw-2rem)] rounded-2xl bg-[#090e17]/98 backdrop-blur-md border border-white/[0.12] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)] p-5 overflow-hidden">
                        {/* Header Bar */}
                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                              <Shield className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-200">
                              {t(
                                "Engineered Shelter Systems",
                                "Sistemas de Refugios",
                              )}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[9px] font-extrabold uppercase tracking-wider text-amber-300">
                              FEMA 320/361
                            </span>
                          </div>
                          <Link
                            to="/services"
                            className="group/link flex items-center gap-1 text-[11px] font-extrabold text-amber-400 hover:text-amber-300 uppercase tracking-wider transition-colors"
                          >
                            <span>{t("All Services", "Ver Todos")}</span>
                            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>

                        {/* Product Cards Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {serviceLinks.map((srv) => {
                            const IconComponent = srv.icon;
                            return (
                              <Link
                                key={srv.to}
                                to={srv.to}
                                className="group/item flex flex-col justify-between rounded-xl p-4 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-amber-500/50 transition-all duration-200 cursor-pointer relative overflow-hidden"
                              >
                                <div>
                                  {/* Card Header */}
                                  <div className="flex items-center justify-between gap-2 mb-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover/item:bg-amber-500 group-hover/item:text-slate-950 transition-all duration-200 shadow-sm">
                                      <IconComponent className="h-4.5 w-4.5" />
                                    </div>
                                    <span
                                      className={cn(
                                        "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md",
                                        srv.tagHighlight
                                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                          : "bg-white/10 text-slate-300 border border-white/15",
                                      )}
                                    >
                                      {srv.tag}
                                    </span>
                                  </div>

                                  {/* Title & Description */}
                                  <h4 className="text-[13px] font-black text-white group-hover/item:text-amber-400 transition-colors uppercase font-display leading-snug mb-1">
                                    {srv.l}
                                  </h4>
                                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3 line-clamp-2">
                                    {srv.desc}
                                  </p>
                                </div>

                                {/* Micro-features list */}
                                <div className="pt-2.5 border-t border-white/[0.06] flex items-center gap-3 text-[10px] font-semibold text-slate-300">
                                  {srv.features.map((feat, i) => (
                                    <span
                                      key={i}
                                      className="flex items-center gap-1 text-slate-300"
                                    >
                                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                      {feat}
                                    </span>
                                  ))}
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Dropdown Bottom Banner CTA */}
                        <div className="rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 p-3.5 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-[12px] font-black uppercase tracking-wider text-white">
                                {t(
                                  "Free On-Site Property Evaluation",
                                  "Evaluación Gratuita de Propiedad",
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 font-medium">
                                {t(
                                  "Expert soil, grade & placement assessment",
                                  "Evaluación experta de suelo, nivel y ubicación",
                                )}
                              </div>
                            </div>
                          </div>

                          <a
                            href={`tel:${SITE_CONFIG.phoneRaw}`}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                          >
                            <Phone className="w-3.5 h-3.5 fill-current" />
                            <span>{SITE_CONFIG.phone}</span>
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
                    "relative px-3 lg:px-3.5 py-2 rounded-xl text-[12.5px] font-bold uppercase tracking-[0.06em] transition-all duration-200 cursor-pointer font-display",
                    active
                      ? "text-amber-400 bg-amber-500/[0.08] shadow-[inset_0_0_0_1px_rgba(245,158,11,0.25)]"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]",
                  )}
                  style={{ fontWeight: 700 }}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster: Free Quote + Primary Phone CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">


            {/* High-Conversion Primary Phone CTA Button */}
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              aria-label={`Call Southern Storm Shelters at ${SITE_CONFIG.phone}`}
              className="group/call relative inline-flex items-center gap-2 px-3.5 sm:px-4 lg:px-4.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(217,119,6,0.35)] hover:shadow-[0_6px_24px_rgba(217,119,6,0.5)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-black/10 group-hover/call:rotate-12 transition-transform duration-200">
                <Phone className="h-3.5 w-3.5 fill-current shrink-0" />
              </span>
              <span className="hidden lg:inline font-bold tracking-tight">
                {SITE_CONFIG.phone}
              </span>
              <span className="inline lg:hidden font-bold">
                {t("Call", "Llamar")}
              </span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-xl border border-white/15 bg-white/[0.08] text-white hover:bg-white/[0.15] transition-all active:scale-95 cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-amber-400" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU DRAWER (LIGHT MODE) ── */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-white flex flex-col md:hidden transition-all duration-300 ease-in-out",
          mobileOpen
            ? "opacity-100 pointer-events-auto visible translate-y-0"
            : "opacity-0 pointer-events-none invisible -translate-y-2",
        )}
      >
        {/* Mobile Menu Sticky/Pinned Header with Brand Logo & Cancel Button */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-white shadow-xs">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            aria-label="Southern Storm Shelters - Home"
            className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-0.5"
          >
            <img
              src={logoImg}
              alt="Southern Storm Shelters"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Cancel and close menu"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all border border-slate-300 active:scale-95 cursor-pointer shadow-xs"
          >
            <span>{t("Cancel", "Cerrar")}</span>
            <X className="h-4 w-4 text-slate-800 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Drawer Body in Light Mode */}
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5 max-w-lg mx-auto w-full">
          {/* Top Operational Dispatch Pill in Light Mode */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </span>
              <span className="text-xs font-bold text-slate-800">
                {t("Nashville Dispatch Team", "Equipo de Despacho")}
              </span>
            </div>
            <span className="text-[11px] font-extrabold text-amber-700 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
              {t(SITE_CONFIG.operatingHours.shortBadge, "Lun-Sáb: 8AM-5PM")}
            </span>
          </div>

          {/* Navigation Links in Light Mode */}
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                pathname === item.to ||
                (item.to === "/services" && pathname.startsWith("/services"));

              if (item.hasDropdown) {
                return (
                  <div key="services-mobile" className="space-y-1">
                    <div
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 transition-colors",
                        active
                          ? "bg-amber-500/10 text-amber-700 border-l-4 border-amber-500"
                          : "text-slate-800 hover:bg-slate-50",
                      )}
                    >
                      <Link
                        to="/services"
                        onClick={() => setMobileOpen(false)}
                        className="text-[14px] font-bold uppercase tracking-wider font-display flex-1 text-inherit"
                        style={{ fontWeight: 700 }}
                      >
                        {t(
                          "Shelters & Safe Rooms",
                          "Refugios y Cuartos Seguros",
                        )}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-amber-600 transition-colors cursor-pointer border border-slate-200"
                        aria-label="Toggle shelters sub-menu"
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            mobileServicesOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="ml-2 pl-3 border-l-2 border-amber-500/40 space-y-2.5 py-2 animate-in slide-in-from-top-2 duration-200">
                        {serviceLinks.map((srv) => {
                          const IconComp = srv.icon;
                          return (
                            <Link
                              key={srv.to}
                              to={srv.to}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-400/50 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                <IconComp className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div
                                  className="text-[13px] font-bold text-slate-900 uppercase font-display leading-tight mb-0.5"
                                  style={{ fontWeight: 700 }}
                                >
                                  {srv.l}
                                </div>
                                <div className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                                  {srv.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-bold uppercase tracking-wider font-display transition-colors cursor-pointer",
                    active
                      ? "bg-amber-500/10 text-amber-700 border-l-4 border-amber-500"
                      : "text-slate-800 hover:text-amber-600 hover:bg-slate-50",
                  )}
                  style={{ fontWeight: 700 }}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              );
            })}
          </nav>

          {/* Primary Mobile CTAs in Light Mode */}
          <div className="border-t border-slate-200 pt-5 flex flex-col gap-3">
            {/* Call Button */}
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3.5 text-sm font-black uppercase tracking-wider shadow-md shadow-amber-500/25 transition-all active:scale-[0.98]"
            >
              <Phone className="h-4 w-4 fill-current shrink-0" />
              <span>
                {t("Call Now", "Llamar Ahora")}: {SITE_CONFIG.phone}
              </span>
            </a>

            {/* Email & Location Card */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-amber-700 font-semibold transition-colors truncate text-slate-800"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase shrink-0">
                Nashville, TN
              </span>
            </div>

            {/* Bilingual Switcher in Mobile Drawer */}
            <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl p-1.5 mt-1">
              {(["en", "es"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5",
                    language === lang
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  <span>{lang === "en" ? "🇺🇸 English" : "🇲🇽 Español"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
