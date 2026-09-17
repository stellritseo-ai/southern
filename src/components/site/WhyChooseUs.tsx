import { motion } from "framer-motion";

import { useLanguage } from "@/hooks/useLanguage";
import tornadoShelterImg from "@/assets/gallery/tornadoshelters6.jpg";
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
    icon: ShieldCheck,
    title: t("Proven Protection", "Protección Comprobada"),
    desc: t("Expert craftsmanship in underground shelter excavation, leveling & anchoring.", "Experiencia comprobada en excavación, nivelación y anclaje de refugios."),
  },
  {
    icon: MapPin,
    title: t("Nashville, TN", "Nashville, TN"),
    desc: t("Locally owned and operated, serving the Nashville community.", "De propiedad local, sirviendo a la comunidad de Nashville."),
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
              {t("Southern Storm Shelters LLC is a storm shelter company dedicated to defending Tennessee families and businesses against severe tornadoes.", "Southern Storm Shelters LLC es una empresa de refugios dedicada a defender a las familias y empresas de Tennessee contra tornados severos.")}
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
              <div
                className="inline-flex items-center justify-center gap-2 bg-[#0b0f15] hover:bg-[#111722] text-white text-[11px] font-black uppercase tracking-widest rounded-full px-5 sm:px-6 py-3.5 transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-[0.97] cursor-default w-full sm:w-auto"
              >
                {t("Explore Shelters", "Explorar Refugios")}
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
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

            {/* Visual image container */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-12px_rgba(0,0,0,0.25)] border-2 border-slate-100 group bg-[#0b0f15]">
              <img
                src={tornadoShelterImg}
                alt="Tornado storm shelter installation"
                className="w-full h-[320px] sm:h-[400px] lg:h-[530px] object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15]/85 via-[#0b0f15]/20 to-transparent pointer-events-none" />



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
