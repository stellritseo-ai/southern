import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronDown,
  Zap,
} from "lucide-react";
import logoImg from "@/assets/logo-mark.png";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const MapMarkerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const socials = [
  { icon: FacebookIcon, href: "https://www.facebook.com", label: "Facebook" },
  { icon: HomeIcon, href: "https://nextdoor.com", label: "Nextdoor" },
  { icon: MapMarkerIcon, href: "https://www.google.com/business", label: "Google Business Profile" },
];

/** Collapsible section exclusively for mobile view */
function MobileCollapsibleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-1 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-xs uppercase tracking-widest text-red-400 font-bold">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-red-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t("Home", "Inicio"), href: "/" },
    { label: t("About Us", "Sobre Nosotros"), href: "/about" },
    { label: t("Storm Shelters", "Refugios"), href: "/services" },
    { label: t("Service Area (100-Mi)", "Área de Servicio"), href: "/service-areas" },
    { label: t("Free Estimate", "Cotización Gratis"), href: "/free-quote" },
    { label: t("Gallery", "Galería"), href: "/projects" },
    { label: t("Reviews", "Reseñas"), href: "/reviews" },
    { label: t("Contact", "Contacto"), href: "/contact" },
  ];

  const servicesLinks = [
    { label: t("Underground Storm Shelters", "Refugios Subterráneos"), href: "/services" },
    { label: t("Residential Storm Shelters", "Refugios Residenciales"), href: "/services" },
    { label: t("Commercial Storm Shelters", "Refugios Comerciales"), href: "/services" },
    { label: t("Shelter Installation & Crane Sets", "Instalación y Colocación"), href: "/services" },
    { label: t("Site Preparation & Excavation", "Preparación de Terreno"), href: "/services" },
    { label: t("Shelter Upgrades & Modernization", "Mejoras de Refugios"), href: "/services" },
  ];

  const serviceAreaLinks = [
    { label: "Nashville, TN (HQ)", href: "/service-areas" },
    { label: "Franklin, TN", href: "/service-areas" },
    { label: "Murfreesboro, TN", href: "/service-areas" },
    { label: "Hendersonville, TN", href: "/service-areas" },
    { label: "Brentwood, TN", href: "/service-areas" },
    { label: "Clarksville, TN", href: "/service-areas" },
    { label: "Columbia, TN", href: "/service-areas" },
    { label: "Lebanon, TN", href: "/service-areas" },
    { label: "All Service Areas (100-Mi)", href: "/service-areas" },
  ];

  return (
    <footer className="relative bg-[#0b0f15] text-white overflow-hidden border-t border-red-500/30">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />

      {/* Decorative Blur Blobs */}
      <div className="absolute -top-40 left-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute -bottom-40 right-10 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "10s" }} />

      <div className="relative mx-auto w-[90%] max-w-7xl pt-10 pb-8 sm:pt-14 sm:pb-10 lg:py-20 z-10 text-left">

        {/* ── MOBILE VERSION ────────────────────────── */}
        <div className="block lg:hidden">
          {/* Logo & Description */}
          <div className="mb-4">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logoImg} alt="Southern Storm Shelters Logo" className="h-12 w-auto object-contain" />
              <div className="flex flex-col text-left">
                <span className="text-base font-black uppercase tracking-tight text-white leading-none">
                  Southern
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-[#dc2626] leading-none mt-1">
                  Storm Shelters LLC
                </span>
              </div>
            </Link>

            <p className="text-[13px] text-slate-300 leading-relaxed font-medium mb-4">
              {t(
                "Underground storm shelter installation for homeowners and businesses across Nashville and a 100-mile service area throughout Middle Tennessee. FEMA P-320 & ICC-500 compliant engineering.",
                "Instalación de refugios subterráneos para hogares y empresas en Nashville y un área de servicio de 100 millas en Middle Tennessee."
              )}
            </p>

            {/* Phone CTA */}
            <a
              href="tel:6159912361"
              className="flex items-center gap-3 w-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] border border-red-500/50 rounded-2xl px-4 py-3 mb-4 shadow-lg"
            >
              <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Phone className="h-4 w-4 text-white animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-widest text-red-200 font-bold">24/7 Severe Weather Hotline</span>
                <span className="font-black text-white text-[15px] tracking-tight leading-tight">615-991-2361</span>
              </div>
            </a>

            {/* Trust Badges - 2x2 grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {["Licensed", "Insured", "Bonded", "FEMA P-320"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 bg-red-950/40 border border-red-500/40 rounded-xl px-3 py-2 text-[10px] font-bold text-red-300 uppercase tracking-wide">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24] animate-pulse shrink-0" />
                  ✓ {badge}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold text-slate-400">{t("Connect With Us:", "Conéctese Con Nosotros:")}</span>
              {socials.map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid place-items-center h-9 w-9 rounded-xl bg-slate-900/80 border border-red-500/30 text-red-300 hover:bg-[#dc2626] hover:text-white active:scale-95 transition-all shadow-sm"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Collapsible Sections */}
          <MobileCollapsibleSection title={t("Quick Links", "Enlaces Rápidos")}>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-xs text-slate-300 hover:text-red-400 font-semibold block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileCollapsibleSection>

          <MobileCollapsibleSection title={t("Storm Shelters", "Refugios")}>
            <ul className="space-y-2.5">
              {servicesLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-xs text-slate-300 hover:text-red-400 font-semibold block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileCollapsibleSection>

          <MobileCollapsibleSection title={t("Service Areas", "Áreas de Servicio")}>
            <ul className="space-y-2.5">
              {serviceAreaLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-xs text-slate-300 hover:text-red-400 font-semibold block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileCollapsibleSection>

          <MobileCollapsibleSection title={t("Contact Info", "Contacto")}>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="tel:6159912361" className="flex items-center gap-2.5 text-slate-300">
                  <Phone className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span>615-991-2361</span>
                </a>
              </li>
              <li>
                <a href="mailto:admin@nashvillesiteworks.com" className="flex items-center gap-2.5 text-slate-300 break-all">
                  <Mail className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span>admin@nashvillesiteworks.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span>468 Craighead St, Nashville, TN 37204</span>
                </div>
              </li>
            </ul>
          </MobileCollapsibleSection>

          <MobileCollapsibleSection title={t("Availability", "Disponibilidad")}>
            <div className="bg-black/60 border border-red-500/40 rounded-xl p-3 text-xs text-slate-300 leading-relaxed font-semibold space-y-1">
              <span className="text-[#fbbf24] font-black uppercase tracking-wider block mb-1 text-[10px] flex items-center gap-1.5">
                <Zap className="w-3 h-3 fill-current" /> 24/7 Severe Weather Dispatch
              </span>
              <p>Open 24 Hours / 7 Days a Week</p>
              <p className="text-slate-400">100-Mile Radius Around Nashville, TN</p>
            </div>
          </MobileCollapsibleSection>
        </div>

        {/* ── DESKTOP VERSION ──────────────── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">

          {/* Col 1: Brand Info (col-span-3) */}
          <div className="lg:col-span-3 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImg} alt="Southern Storm Shelters Logo" className="h-14 w-auto object-contain" />
              <div className="flex flex-col text-left">
                <span className="text-lg font-black uppercase tracking-tight text-white leading-none">
                  Southern
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-[#dc2626] leading-none mt-1">
                  Storm Shelters LLC
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm font-medium">
              {t(
                "Engineered underground storm shelter installation for homeowners and businesses across Nashville and a 100-mile service radius throughout Middle Tennessee. FEMA P-320 & ICC-500 compliant.",
                "Instalación de refugios subterráneos diseñados para hogares y empresas en Nashville y un radio de 100 millas en Middle Tennessee."
              )}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">{t("Connect:", "Conectar:")}</span>
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid place-items-center h-9 w-9 rounded-xl bg-slate-900/90 border border-red-500/35 text-red-300 hover:bg-[#dc2626] hover:text-white transition-all shadow-sm"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Licensed", "Insured", "Bonded", "5+ Yrs Exp."].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 bg-red-950/40 border border-red-500/40 rounded-xl px-3 py-1.5 text-[10px] font-bold text-red-300 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                  ✓ {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links (col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-widest text-red-400 font-extrabold mb-6">
              {t("Quick Links", "Enlaces Rápidos")}
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 text-[#dc2626] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (col-span-3) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-widest text-red-400 font-extrabold mb-6">
              {t("Storm Shelters", "Refugios")}
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              {servicesLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 text-[#dc2626] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Service Areas (col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-widest text-red-400 font-extrabold mb-6">
              {t("Service Areas", "Áreas de Servicio")}
            </h3>
            <ul className="space-y-2 text-xs font-semibold">
              {serviceAreaLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-2.5 w-2.5 text-[#dc2626] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="truncate">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Hours (col-span-2) */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-red-400 font-extrabold mb-5">
                {t("Contact Us", "Contáctenos")}
              </h3>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <a
                    href="tel:6159912361"
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 group-hover:bg-[#dc2626] group-hover:text-white transition-all shrink-0">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Phone 24/7</span>
                      <span className="font-semibold text-white tracking-tight text-xs">615-991-2361</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:admin@nashvillesiteworks.com"
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 group-hover:bg-[#dc2626] group-hover:text-white transition-all shrink-0">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Email</span>
                      <span className="font-semibold text-white tracking-tight text-xs truncate">admin@nashvillesiteworks.com</span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="h-8 w-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{t("Address", "Dirección")}</span>
                      <span className="font-semibold text-white tracking-tight text-xs leading-snug">
                        468 Craighead St, Nashville, TN 37204
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Hours card */}
            <div className="bg-black/60 border border-red-500/40 rounded-2xl p-4">
              <span className="text-[#fbbf24] font-black uppercase tracking-wider block mb-2 text-[10px] flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fbbf24]" />
                </span>
                24/7 Severe Weather Ready
              </span>
              <div className="text-xs text-slate-300 leading-relaxed font-semibold space-y-1">
                <p>Open 24 Hours / 7 Days</p>
                <p className="text-slate-400">100-Mile Middle TN Radius</p>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ───────────────────────────────────────── */}
        <div className="mt-10 sm:mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 order-2 sm:order-1 text-xs text-slate-400 font-semibold">
            <p>
              © 2026 Southern Storm Shelters LLC.{" "}
              {t("Licensed, Insured & Bonded.", "Licenciado, Asegurado y Afianzado.")}
            </p>
            <span className="hidden sm:inline text-white/20">|</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-[#dc2626]" />
              <span>FEMA P-320 &amp; ICC-500 Standards</span>
            </div>
          </div>

          <div className="flex items-center gap-6 order-1 sm:order-2">
            <p className="text-xs text-slate-400 font-semibold hidden sm:block">
              ✓ Licensed • Insured • Bonded • 5+ Years Experience
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs text-slate-300 hover:text-white transition-colors font-bold flex items-center gap-2 cursor-pointer select-none"
            >
              <span>{t("Back to Top", "Volver Arriba")}</span>
              <ArrowRight className="h-4 w-4 -rotate-90 text-red-400" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}
