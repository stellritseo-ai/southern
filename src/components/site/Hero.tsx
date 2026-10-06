import { useState, useEffect } from "react";
import {
  ArrowRight,
  Phone,
  Shield,
  ShieldCheck,
  Star,
  Sparkles,
  Lock,
  User,
  Mail,
  MapPin,
  Clock,
  HardHat,
  CheckCircle2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/config/site-config";
import { addWebEmail } from "@/lib/leads-store";
import heroImgNew from "@/assets/gallery/2.png";
import heroImg1 from "@/assets/gallery/Professional Installation.jpg";
import heroImg2 from "@/assets/gallery/5.png";

const heroImages = [
  { src: heroImgNew, alt: "Underground storm shelter construction" },
  { src: heroImg1, alt: "Tornado shelter installation" },
  { src: heroImg2, alt: "Heavy duty underground shelter" },
];

export function Hero() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const name =
      (form.querySelector("input[name='name']") as HTMLInputElement)?.value ||
      "";
    const phone =
      (form.querySelector("input[name='phone']") as HTMLInputElement)?.value ||
      "";
    const email =
      (form.querySelector("input[name='email']") as HTMLInputElement)?.value ||
      "";
    const address =
      (form.querySelector("input[name='address']") as HTMLInputElement)
        ?.value || "";
    try {
      await addWebEmail({
        name,
        phone,
        email,
        address,
        service: "Underground Storm Shelter",
        source: "Hero Quick Form",
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative isolate min-h-screen bg-[#070b12]">
      {/* ── BACKGROUND SLIDESHOW WITH AMBIENT LIGHTING (STICKY) ── */}
      <div className="sticky top-0 h-screen w-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding={index === 0 ? "sync" : "async"}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-out will-change-[opacity] ${currentImageIndex === index
                ? "opacity-90"
                : "opacity-0 pointer-events-none"
                }`}
            />
          ))}

          {/* Lightweight directional scrims: keeps photo vivid while ensuring text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b12]/60 via-[#070b12]/20 to-transparent pointer-events-none" />

          {/* Ambient atmospheric warm glows (GPU-efficient radial gradients without expensive Gaussian blur passes) */}
          <div
            className="absolute -top-32 left-[-10%] w-[550px] h-[550px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/3 right-[-5%] w-[500px] h-[500px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(71,85,105,0.18) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-[600px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(217,119,6,0.1) 0%, transparent 75%)" }}
          />

          {/* Architectural subtle dot grid pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
      </div>

      {/* ── MAIN HERO CONTENT & CONTROLS WRAPPER ── */}
      <div className="-mt-[100vh] relative z-10 min-h-screen flex flex-col justify-between">
        {/* ── MAIN CONTENT CONTAINER ── */}
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-12 flex-1 flex flex-col justify-center">
          {/* ── HEADLINE & SOCIAL PROOF BLOCK ── */}
          <div className="max-w-4xl mb-8 sm:mb-10">
            {/* Eyebrow Status Ribbon */}
            <div className="mt-8 sm:mt-16 lg:mt-[180px] inline-flex flex-wrap items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(217,119,6,0.15)] mb-5 sm:mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="h-3 w-px bg-white/20 hidden sm:block" />
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                {t(
                  "Nashville's #1 Underground Shelter Builders",
                  "Constructores #1 en Nashville",
                )}
              </span>
            </div>

            {/* Master Headline */}
            <h1 className="-mt-[15px] font-display font-bold uppercase text-[30px] xs:text-[34px] sm:text-[56px] tracking-tight leading-[1.08] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              <span className="block text-[30px] xs:text-[34px] sm:text-[56px] leading-[1.08]">
                {t("Engineered Shelters.", "Refugios Diseñados.")}
              </span>
              <span className="block text-[30px] xs:text-[34px] sm:text-[56px] leading-[1.08] gradient-text-construction drop-shadow-[0_4px_20px_rgba(217,119,6,0.35)]">
                {t("Built to Protect.", "Construidos para Proteger.")}
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="mt-[10px] text-slate-100 text-[15px] sm:text-[18px] leading-[26px] sm:leading-[34px] max-w-2xl font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {t(
                "Southern Storm Shelters specializes in precision underground storm shelter installation across Nashville and Middle Tennessee. From excavation to crane placement — turnkey protection.",
                "Southern Storm Shelters se especializa en refugios subterráneos en Nashville y Middle Tennessee. De la excavación al acabado llave en mano.",
              )}
            </p>

            {/* Value Badges Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
              {[
                t(
                  "Turnkey Crane & Excavation",
                  "Excavación y Grúa Llave en Mano",
                ),
                t(
                  "100% Zero-Failure Safety Record",
                  "Historial de Seguridad 100%",
                ),
                t(
                  "Lifetime Structural Warranty",
                  "Garantía Estructural de Por Vida",
                ),
              ].map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-lg backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── BOTTOM SPLIT: FORM (LEFT) | PROCESS & HOTLINE (RIGHT) ── */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* LEFT: Quick Contact & Estimate Form (6 cols on large) - Apple Liquid Glass Effect */}
            <div
              className="lg:col-span-6 xl:col-span-6 rounded-[32px] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group transition-all duration-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 45%, rgba(0, 0, 0, 0.22) 100%)",
                backdropFilter: "blur(40px) saturate(190%) contrast(105%)",
                WebkitBackdropFilter: "blur(40px) saturate(190%) contrast(105%)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                boxShadow:
                  "0 32px 64px -16px rgba(0, 0, 0, 0.6), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.25), inset 0 0 20px 0 rgba(255, 255, 255, 0.03)",
              }}
            >
              {/* Apple Specular Top Rim Glare */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              {/* Apple VisionOS Diffuse Surface Reflection */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_120%_60%_at_50%_-20%,rgba(255,255,255,0.35),transparent_70%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-br from-white/20 via-transparent to-transparent"
              />

              {submitted ? (
                <div className="relative z-10 flex flex-col items-center justify-center py-12 sm:py-16 text-center gap-4 my-auto">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(217,119,6,0.3)]">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-black text-xl uppercase tracking-wider font-display">
                    {t("Estimate Request Received!", "¡Solicitud Recibida!")}
                  </h3>
                  <p className="text-white/80 text-sm max-w-sm leading-relaxed">
                    {t(
                      "Our engineering team will review your property location and contact you within 24 hours.",
                      "Nuestro equipo revisará la ubicación de su propiedad y se comunicará dentro de 24 horas.",
                    )}
                  </p>
                  <div className="pt-3 border-t border-white/15 w-full mt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <span className="text-xs text-white/70">
                      {t(
                        "Need faster service?",
                        "¿Necesita respuesta inmediata?",
                      )}
                    </span>
                    <a
                      href={`tel:${SITE_CONFIG.phoneRaw}`}
                      className="inline-flex items-center gap-2 text-xs font-black text-amber-400 hover:text-amber-300 uppercase tracking-wider"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col justify-between flex-1">
                  <div className="mb-5 sm:mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.12] backdrop-blur-xl border border-white/25 text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t("Free On-Site Estimate", "Cotización Gratuita")}</span>
                    </div>
                    <h2 className="text-white font-black text-2xl sm:text-3xl uppercase tracking-tight font-display drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                      {t("Request Your Turnkey Quote", "Solicite su Cotización")}
                    </h2>
                    <p className="text-white/80 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                      {t(
                        "Enter your project details — we inspect soil grade and provide upfront pricing.",
                        "Ingrese sus datos — evaluamos el terreno y ofrecemos precios claros.",
                      )}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      {/* Full Name */}
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/50 group-focus-within/field:text-amber-300 transition-colors">
                          <User className="h-4 w-4" />
                        </div>
                        <input
                          name="name"
                          type="text"
                          required
                          placeholder={t("Full Name *", "Nombre Completo *")}
                          className="w-full bg-black/25 hover:bg-black/35 focus:bg-black/45 backdrop-blur-xl border border-white/[0.15] hover:border-white/25 focus:border-amber-400 rounded-2xl pl-10 pr-4 py-3 sm:py-3.5 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/50 group-focus-within/field:text-amber-300 transition-colors">
                          <Phone className="h-4 w-4" />
                        </div>
                        <input
                          name="phone"
                          type="tel"
                          required
                          placeholder={t(
                            "Phone Number *",
                            "Número de Teléfono *",
                          )}
                          className="w-full bg-black/25 hover:bg-black/35 focus:bg-black/45 backdrop-blur-xl border border-white/[0.15] hover:border-white/25 focus:border-amber-400 rounded-2xl pl-10 pr-4 py-3 sm:py-3.5 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="relative group/field">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/50 group-focus-within/field:text-amber-300 transition-colors">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder={t("Email Address *", "Correo Electrónico *")}
                        className="w-full bg-black/25 hover:bg-black/35 focus:bg-black/45 backdrop-blur-xl border border-white/[0.15] hover:border-white/25 focus:border-amber-400 rounded-2xl pl-10 pr-4 py-3 sm:py-3.5 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]"
                      />
                    </div>

                    {/* Address / Location */}
                    <div className="relative group/field">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/50 group-focus-within/field:text-amber-300 transition-colors">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <input
                        name="address"
                        type="text"
                        required
                        placeholder={t(
                          "Property Address / Nashville Area ZIP *",
                          "Dirección de Propiedad / ZIP *",
                        )}
                        className="w-full bg-black/25 hover:bg-black/35 focus:bg-black/45 backdrop-blur-xl border border-white/[0.15] hover:border-white/25 focus:border-amber-400 rounded-2xl pl-10 pr-4 py-3 sm:py-3.5 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full group/btn relative inline-flex items-center justify-center gap-2 mt-2 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 hover:brightness-105 active:scale-[0.985] text-slate-950 font-black text-xs uppercase tracking-widest py-4 px-6 rounded-2xl shadow-[0_8px_25px_-5px_rgba(245,158,11,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(0,0,0,0.2)] transition-all duration-200 disabled:opacity-60 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent h-1/2 pointer-events-none rounded-t-2xl" />
                      <span className="font-display font-black tracking-wider text-[13px] relative z-10">
                        {submitting
                          ? t("Submitting Request...", "Enviando...")
                          : t(
                            "Get Free Estimate Now",
                            "Obtener Cotización Gratis",
                          )}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                    </button>

                    {/* Trust Micro-Footer */}
                    <div className="flex items-center justify-center gap-2 text-[11px] text-white/70 pt-1.5 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>
                        {t(
                          "100% Confidential • No high-pressure sales",
                          "100% Confidencial • Sin compromiso",
                        )}
                      </span>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* RIGHT: Process Highlights + Direct Line + Trust Cards (6 cols on large) */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between gap-4 sm:gap-5">
              {/* Turnkey Engineering Process Box */}
              <div className="bg-gradient-to-b from-[#0e1626]/95 via-[#090e18]/95 to-[#05080f]/98 backdrop-blur-md border border-white/[0.14] hover:border-white/[0.22] transition-colors rounded-3xl p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] relative overflow-hidden group">
                {/* Top subtle highlight hairline */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />

                <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-amber-400 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <HardHat className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="font-display font-bold text-sm tracking-wider">
                    {t(
                      "Complete Turnkey Installation",
                      "Instalación Integral Llave en Mano",
                    )}
                  </span>
                </div>
                <p className="text-slate-200 text-sm sm:text-[15px] leading-relaxed font-normal mb-4">
                  {t(
                    "We handle the entire process — from on-site soil evaluation and precision excavation to crane placement, anchoring, and clean backfill. Every shelter installation is backed by a lifetime warranty and handled by experienced Nashville construction professionals.",
                    "Manejamos todo el proceso — desde la evaluación del terreno hasta la colocación con grúa y el relleno limpio. Cada instalación está respaldada por garantía de por vida.",
                  )}
                </p>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-black uppercase tracking-wider group/link transition-colors py-1"
                >
                  <span>
                    {t(
                      "Learn More About Our Team & Standards",
                      "Conozca Más de Nuestro Equipo",
                    )}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
                </Link>
              </div>

              {/* High-Impact Direct Hotline Banner */}
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                aria-label={`Call Southern Storm Shelters directly at ${SITE_CONFIG.phone}`}
                className="group/call flex items-center justify-between gap-4 rounded-3xl p-5 sm:p-6 border border-amber-500/40 hover:border-amber-400 bg-gradient-to-r from-amber-500/15 via-[#0e1626]/95 to-[#070b14]/98 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(245,158,11,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(245,158,11,0.22)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover/call:scale-105 group-hover/call:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-2 mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                      {t(
                        "Direct Project Line • Priority Dispatch",
                        "Línea Directa de Proyecto",
                      )}
                    </div>
                    <div className="text-white font-black text-xl sm:text-2xl lg:text-3xl tracking-tight leading-tight group-hover/call:text-amber-300 transition-colors truncate font-display drop-shadow-sm">
                      {SITE_CONFIG.phone}
                    </div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">
                      {t(
                        SITE_CONFIG.operatingHours.shortBadge,
                        "Lun-Sáb: 8AM-5PM",
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/[0.06] border border-white/10 group-hover/call:bg-amber-400 group-hover/call:text-slate-950 group-hover/call:border-amber-400 flex items-center justify-center text-amber-400 transition-all shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/call:translate-x-0.5 transition-transform" />
                </div>
              </a>

              {/* Trust Proof Badges Row */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                {[
                  {
                    icon: ShieldCheck,
                    label: t("Lifetime Warranty", "Garantía de Por Vida"),
                    sub: t("On All Shelters", "En Todos Los Refugios"),
                  },
                  {
                    icon: Clock,
                    label: t("Fast 1-Day Install", "Instalación Rápida"),
                    sub: t("Prefab Units", "Unidades Prefabricadas"),
                  },
                  {
                    icon: MapPin,
                    label: t("Nashville, TN", "Nashville, TN"),
                    sub: t("100-Mile Radius", "Radio de 100 Millas"),
                  },
                ].map((badge) => {
                  const IconCmp = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.1] hover:border-amber-400/40 rounded-2xl p-2.5 sm:p-4 text-center flex flex-col items-center justify-center gap-1 sm:gap-1.5 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-white/[0.08] transition-all duration-200 group"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-amber-500/40 transition-all shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                        <IconCmp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                      </div>
                      <div className="text-white text-[11px] sm:text-[13px] font-bold leading-tight mt-0.5">
                        {badge.label}
                      </div>
                      <div className="text-slate-400 text-[9.5px] sm:text-[11px] font-medium leading-tight">
                        {badge.sub}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── CAROUSEL CONTROLS ── */}
        <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-4 flex items-center justify-end">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1">
              {t("Gallery", "Galería")}
            </span>
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentImageIndex(idx)}
                aria-label={`Switch to hero background slide ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${currentImageIndex === idx
                  ? "w-6 bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                  : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
