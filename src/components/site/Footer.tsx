import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/config/site-config";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const NextdoorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const socials = [
  { Icon: FacebookIcon, href: "https://www.facebook.com", label: "Facebook" },
  { Icon: NextdoorIcon, href: "https://nextdoor.com", label: "Nextdoor" },
  { Icon: GoogleIcon, href: "https://www.google.com/business", label: "Google" },
];

function MobileAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-4 text-left cursor-pointer"
      >
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{title}</span>
        <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
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
    { label: t("About Us", "Nosotros"), href: "/about" },
    { label: t("Storm Shelters", "Refugios"), href: "/services" },
    { label: t("Free Estimate", "Cotización"), href: "/free-quote" },
    { label: t("Gallery", "Galería"), href: "/projects" },
    { label: t("Reviews", "Reseñas"), href: "/reviews" },
    { label: t("Contact", "Contacto"), href: "/contact" },
  ];

  const servicesLinks = [
    { label: t("In-Ground Prefab Shelter", "Refugio Prefabricado"), href: "/services/in-ground-prefabricated-storm-shelters" },
    { label: t("Custom Built Shelter", "Refugio Personalizado"), href: "/services/custom-built-storm-shelters" },
    { label: t("Free Site Evaluation", "Evaluación Gratuita"), href: "/free-quote" },
  ];

  const areaLinks = [
    { label: "Nashville, TN", href: "/contact" },
    { label: "Franklin", href: "/contact" },
    { label: "Murfreesboro", href: "/contact" },
    { label: "Brentwood", href: "/contact" },
    { label: "Clarksville", href: "/contact" },
    { label: "Hendersonville", href: "/contact" },
  ];

  const linkCls = "text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-1.5 group py-0.5";
  const arrowCls = "w-3 h-3 text-amber-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0";
  const colHeadCls = "text-[11px] font-black uppercase tracking-widest text-slate-500 mb-5";

  return (
    <footer className="relative bg-[#0b0f15] text-white overflow-hidden">
      {/* Top amber gradient line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {/* Glow blobs */}
      <div className="absolute -top-32 left-1/4 w-80 h-80 bg-amber-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-700/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 lg:pt-20">

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 xl:gap-16 pb-14">

          {/* Col 1 — Brand (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link to="/" aria-label="Southern Storm Shelters">
              <img
                src={logoImg}
                alt="Southern Storm Shelters"
                className="h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t(
                "Underground storm shelter construction and turnkey installation for Nashville and Middle Tennessee homeowners. Precision excavation — engineered safety.",
                "Construcción e instalación llave en mano de refugios subterráneos en Nashville y Middle Tennessee."
              )}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/10 transition-colors duration-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

            {/* Phone CTA */}
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="group inline-flex flex-col gap-0.5 border-t border-white/10 pt-5"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-amber-400 transition-colors">
                {t("Call Direct", "Llamar Directo")}
              </span>
              <span className="font-display font-black text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {SITE_CONFIG.phone}
              </span>
            </a>
          </div>

          {/* Col 2 — Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <p className={colHeadCls}>{t("Quick Links", "Navegación")}</p>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className={linkCls}>
                    <ArrowRight className={arrowCls} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services (3 cols) */}
          <div className="lg:col-span-3">
            <p className={colHeadCls}>{t("Our Shelters", "Nuestros Refugios")}</p>
            <ul className="space-y-2">
              {servicesLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className={linkCls}>
                    <ArrowRight className={arrowCls} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className={`${colHeadCls} mt-8`}>{t("Service Areas", "Áreas de Servicio")}</p>
            <ul className="space-y-1.5">
              {areaLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className={linkCls}>
                    <ArrowRight className={arrowCls} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact + Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <p className={colHeadCls}>{t("Contact", "Contacto")}</p>

            <ul className="space-y-3.5">
              {[
                { icon: Phone, label: t("Call", "Llamar"), value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phoneRaw}` },
                { icon: Mail, label: t("Email", "Email"), value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { icon: MapPin, label: t("Area", "Área"), value: "Nashville, TN · 100-Mile Radius", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/15 group-hover:border-amber-500/30 transition-all duration-300">
                    <Icon className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-sm text-slate-300 hover:text-white transition-colors font-medium truncate block">{value}</a>
                    ) : (
                      <div className="text-sm text-slate-300 font-medium leading-snug">{value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Hours card */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 mt-2">
              <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-3">
                <Clock className="w-3.5 h-3.5" />
                {t("Business Hours", "Horario")}
              </div>
              <div className="space-y-1 text-xs text-slate-400 font-medium leading-relaxed">
                <p>{SITE_CONFIG.operatingHours.weekdays}</p>
                <p>{SITE_CONFIG.operatingHours.saturdays}</p>
                <p className="text-slate-600">{SITE_CONFIG.operatingHours.sundays}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="lg:hidden pb-6">
          {/* Brand block */}
          <div className="mb-8">
            <Link to="/" className="block mb-5">
              <img src={logoImg} alt="Southern Storm Shelters" className="h-10 w-auto object-contain brightness-0 invert opacity-90" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              {t(
                "Underground storm shelter construction and installation in Nashville and Middle Tennessee.",
                "Construcción e instalación de refugios subterráneos en Nashville y Middle Tennessee."
              )}
            </p>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex items-center gap-3 bg-amber-500 hover:bg-amber-400 rounded-xl px-4 py-3 mb-4 transition-colors"
            >
              <Phone className="h-4 w-4 text-[#0b0f15]" />
              <span className="font-black text-[#0b0f15] text-sm tracking-tight">{SITE_CONFIG.phone}</span>
            </a>
            <div className="flex items-center gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile accordions */}
          <MobileAccordion title={t("Quick Links", "Navegación")}>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-slate-400 hover:text-white transition-colors font-medium block">{label}</Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          <MobileAccordion title={t("Our Shelters", "Refugios")}>
            <ul className="space-y-2.5">
              {servicesLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-slate-400 hover:text-white transition-colors font-medium block">{label}</Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          <MobileAccordion title={t("Contact", "Contacto")}>
            <ul className="space-y-3">
              <li><a href={`tel:${SITE_CONFIG.phoneRaw}`} className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"><Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" />{SITE_CONFIG.phone}</a></li>
              <li><a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors break-all"><Mail className="h-3.5 w-3.5 text-amber-400 shrink-0" />{SITE_CONFIG.email}</a></li>
              <li><div className="flex items-center gap-2.5 text-sm text-slate-400"><MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />Nashville, TN · 100-Mile Radius</div></li>
            </ul>
          </MobileAccordion>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} Southern Storm Shelters · Design by{" "}
            <a href="https://stellrit.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">StellR IT LLC</a>
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link to="/contact" className="hover:text-slate-300 transition-colors font-medium">{t("Privacy Policy", "Política de Privacidad")}</Link>
            <span className="text-white/20">·</span>
            <Link to="/contact" className="hover:text-slate-300 transition-colors font-medium">{t("Terms of Service", "Términos de Servicio")}</Link>
            <span className="text-white/20">·</span>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-400 hover:text-white transition-colors font-bold flex items-center gap-1 cursor-pointer select-none"
            >
              {t("Top", "Inicio")}
              <ArrowRight className="h-3.5 w-3.5 -rotate-90 text-amber-400" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}
