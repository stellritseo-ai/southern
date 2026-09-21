import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
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
    title: t("Quality-Grade Materials", "Materiales de Calidad"),
    desc: t("Heavy 14-gauge corrugated steel with powder-coat finish. Every shelter is built to resist underground corrosion for decades.", "Acero corrugado de calibre 14 con acabado en polvo. Cada refugio está construido para resistir la corrosión subterránea durante décadas."),
  },
  {
    icon: MapPin,
    title: t("Nashville, TN", "Nashville, TN"),
    desc: t("Locally owned and operated. We know Middle Tennessee soil conditions, drainage, and code requirements better than anyone.", "De propiedad local. Conocemos las condiciones del suelo, drenaje y requisitos de código mejor que nadie."),
  },
  {
    icon: HardHat,
    title: t("Professional Crew & Equipment", "Personal Profesional y Equipamiento"),
    desc: t("Our team operates heavy excavation and crane equipment. Every installation is handled by experienced construction professionals.", "Nuestro equipo opera equipos pesados de excavación y grúa. Cada instalación está a cargo de profesionales de la construcción con experiencia."),
  },
  {
    icon: Home,
    title: t("Residential Expertise", "Especialización Residencial"),
    desc: t("We specialize in residential installs. Your yard, property lines, and landscaping are treated with care throughout the process.", "Nos especializamos en instalaciones residenciales. Su patio y paisajismo se tratan con cuidado durante todo el proceso."),
  },
  {
    icon: Building2,
    title: t("Custom Concrete Builds", "Construcciones de Concreto Personalizadas"),
    desc: t("Beyond prefab, we construct fully custom concrete underground shelters built to your exact size, layout, and spec.", "Además de los prefabricados, construimos refugios de concreto subterráneos totalmente personalizados."),
  },
  {
    icon: CheckCircle2,
    title: t("Site Evaluation Included", "Evaluación del Sitio Incluida"),
    desc: t("Every project starts with a free site evaluation. We assess soil, slope, drainage, access, and recommend the best fit.", "Cada proyecto comienza con una evaluación gratuita del sitio. Evaluamos el suelo, la pendiente, el drenaje y el acceso."),
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

      {/* Subtle background */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-slate-400/[0.04] blur-3xl" />

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
            {/* Eyebrow Badge — slate */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-slate-300 bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest mb-5 shadow-sm select-none">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-600" />
              </span>
              {t("Why Choose Us", "Por Qué Elegirnos")}
            </div>

            {/* Headline */}
            <h2
              className="text-slate-900 font-black tracking-tight leading-[1.18] max-w-2xl"
              style={{ fontSize: "clamp(24px, 5.5vw, 32px)", marginTop: "-7px", marginBottom: "10px" }}
            >
              {t("Built by a Construction Company. ", "Construido por una Empresa Constructora. ")}
              <span className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] bg-clip-text text-transparent">
                {t("Not Just a Dealer.", "No Solo un Distribuidor.")}
              </span>
            </h2>

            {/* Subtext */}
            <p
              className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed font-normal max-w-2xl"
              style={{ marginBottom: "10px" }}
            >
              {t("Southern Storm Shelters LLC is a construction company — we show up with excavators, cranes, and a professional crew. We build and install using quality-grade materials and proper construction practices, not drop-ship and install.", "Southern Storm Shelters LLC es una empresa de construcción. Llegamos con excavadoras, grúas y un equipo profesional. Construimos e instalamos con materiales de calidad y prácticas de construcción adecuadas.")}
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
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-250 cursor-default"
                  >
                    <span className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-slate-100 border border-slate-200 group-hover:bg-slate-800 text-slate-700 group-hover:text-white transition-colors duration-250">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-extrabold text-slate-900 leading-tight mb-0.5">{f.title}</p>
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
            {/* Decorative glow rings — slate */}
            <div aria-hidden className="absolute -inset-4 rounded-[36px] bg-slate-200/30 blur-xl pointer-events-none" />

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



              {/* Top-left badge — slate */}
              <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
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
