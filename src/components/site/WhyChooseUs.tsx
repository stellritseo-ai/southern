import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import whyUsVideo from "@/assets/whyus.mp4";
import installCraneImg from "@/assets/install-crane.jpg";
import {
  ShieldCheck,
  Clock,
  Award,
  MapPin,
  HardHat,
  Home,
  Building2,
  CheckCircle2,
  Star,
  Phone,
  ArrowRight,
} from "lucide-react";

const features = (t: (en: string, es: string) => string) => [
  {
    icon: Award,
    title: t("5+ Years of Experience", "5+ Años de Experiencia"),
    desc: t("Proven craftsmanship in underground shelter excavation, leveling & anchoring.", "Experiencia comprobada en excavación, nivelación y anclaje de refugios."),
  },
  {
    icon: ShieldCheck,
    title: t("Licensed, Insured & Bonded", "Licenciado, Asegurado y Afianzado"),
    desc: t("Full liability protection and compliance on every single residential install.", "Protección de responsabilidad completa y cumplimiento en cada instalación."),
  },
  {
    icon: Clock,
    title: t("24/7 Availability", "Disponible 24/7"),
    desc: t("Severe weather never waits. Our consultation team is always reachable.", "El clima severo no espera. Nuestro equipo siempre está localizable."),
  },
  {
    icon: MapPin,
    title: t("100-Mile Service Area", "Radio de 100 Millas"),
    desc: t("Nashville, TN and all surrounding Middle Tennessee counties and towns.", "Nashville, TN y todos los condados y pueblos de Middle Tennessee."),
  },
  {
    icon: HardHat,
    title: t("FEMA P-320 & ICC-500", "Normas FEMA e ICC"),
    desc: t("Engineered to withstand EF-5 tornado wind loads of 250+ MPH.", "Diseñados para soportar cargas de viento de tornados EF-5 de más de 250 MPH."),
  },
  {
    icon: Home,
    title: t("99% Residential Focus", "99% Enfoque Residencial"),
    desc: t("We specialize in keeping families safe with immediate backyard access.", "Nos especializamos en mantener a las familias seguras en sus patios."),
  },
  {
    icon: Building2,
    title: t("Commercial Capabilities", "Capacidades Comerciales"),
    desc: t("Heavy-duty multi-person safe rooms for job sites, schools & facilities.", "Refugios de gran capacidad para empresas, escuelas e instalaciones."),
  },
  {
    icon: CheckCircle2,
    title: t("Turnkey 1-2 Day Install", "Instalación en 1-2 Días"),
    desc: t("From ground-breaking to lawn backfill, minimal disruption to your yard.", "Desde la excavación hasta el relleno del césped, mínima alteración."),
  },
];

const trustStats = [
  { value: "5+", label: "Years Exp." },
  { value: "100mi", label: "Service Radius" },
  { value: "24/7", label: "Availability" },
  { value: "100%", label: "FEMA Compliant" },
];

export function WhyChooseUs() {
  const { t } = useLanguage();
  const items = features(t);

  return (
    <section
      id="why-choose-us"
      className="relative py-[60px] bg-white border-b border-slate-100 overflow-hidden"
      style={{ paddingTop: "60px", paddingBottom: "60px" }}
    >

      {/* Subtle background blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#dc2626]/[0.04] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-red-600/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16 items-center">

          {/* ── LEFT: Content ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="flex flex-col order-2 lg:order-1 lg:col-span-7"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-red-200 bg-red-50 text-[#dc2626] text-[10px] font-black uppercase tracking-widest mb-5 shadow-sm select-none">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dc2626]" />
              </span>
              {t("Why Choose Us", "Por Qué Elegirnos")}
            </div>

            {/* Headline */}
            <h2
              className="text-slate-900 font-black tracking-tight leading-[1.18] max-w-2xl"
              style={{ fontSize: "clamp(24px, 5.5vw, 32px)", marginTop: "-7px", marginBottom: "10px" }}
            >
              {t("Built on Experience. ", "Basado en Experiencia. ")}
              <span className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] bg-clip-text text-transparent">
                {t("Focused on Protection.", "Enfocados en la Protección.")}
              </span>
            </h2>

            {/* Subtext */}
            <p
              className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed font-normal max-w-2xl"
              style={{ marginBottom: "10px" }}
            >
              {t("Southern Storm Shelters LLC is a licensed, insured, and bonded storm shelter company dedicated to defending Tennessee families and businesses against severe tornadoes.", "Southern Storm Shelters LLC es una empresa de refugios con licencia, seguro y fianza dedicada a defender a las familias y empresas de Tennessee contra tornados severos.")}
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {items.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-red-50/60 border border-transparent hover:border-red-100 transition-all duration-250 cursor-default"
                  >
                    <span className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-red-50 border border-red-200 group-hover:bg-[#dc2626] text-[#dc2626] group-hover:text-white transition-colors duration-250">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-extrabold text-slate-900 leading-tight mb-0.5 group-hover:text-[#dc2626] transition-colors duration-250">{f.title}</p>
                      <p className="text-[11.5px] text-slate-500 leading-relaxed font-normal">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-[#0b0f15] hover:bg-[#111722] text-white text-[11px] font-black uppercase tracking-widest rounded-full px-5 sm:px-6 py-3.5 transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-[0.97] cursor-pointer w-full sm:w-auto"
              >
                {t("Explore Shelters", "Explorar Refugios")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="tel:6159912361"
                className="inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-[11px] font-black uppercase tracking-widest rounded-full px-5 sm:px-6 py-3.5 transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-[0.97] cursor-pointer w-full sm:w-auto"
              >
                <Phone className="w-3.5 h-3.5" />
                {t("Call (615) 991-2361", "Llamar (615) 991-2361")}
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: Visual Card ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-[100px] w-full max-w-[460px] lg:max-w-none mx-auto"
          >
            {/* Decorative glow rings */}
            <div aria-hidden className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-[#dc2626]/15 via-transparent to-red-600/15 blur-xl pointer-events-none" />
            <div aria-hidden className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-[#dc2626]/20 to-red-500/20 blur-md pointer-events-none" />

            {/* Video container */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-12px_rgba(0,0,0,0.25)] border-2 border-slate-100 group bg-[#0b0f15]">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={installCraneImg}
                className="w-full h-[320px] sm:h-[400px] lg:h-[530px] object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
              >
                <source src={whyUsVideo} type="video/mp4" />
              </video>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15]/85 via-[#0b0f15]/20 to-transparent pointer-events-none" />

              {/* Trust Stats Bar at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                <div className="bg-[#0b0f15]/85 backdrop-blur-md border border-red-500/30 rounded-2xl px-2 sm:px-4 py-2 sm:py-3 grid grid-cols-4 divide-x divide-white/15">
                  {trustStats.map((s) => (
                    <div key={s.label} className="flex flex-col items-center px-0.5 sm:px-2">
                      <span className="text-red-400 font-black text-[12px] sm:text-[16px] leading-tight">{s.value}</span>
                      <span className="text-white/80 text-[7.5px] sm:text-[9.5px] font-bold uppercase tracking-wide text-center leading-tight mt-0.5">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top-left badge */}
              <div className="absolute top-4 left-4 z-20 bg-[#dc2626] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                {t("Nashville's Premier Shelter Team", "Equipo Líder en Nashville")}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
