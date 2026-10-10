import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  HardHat,
  Home,
  MapPin,
  Phone,
  Sparkles,
  Clock,
  Wrench,
  Award,
} from "lucide-react";
import shelterInstallImg from "@/assets/gallery/shelterinstall.jpg";
import grangerYardImg from "@/assets/granger-shelter-yard.jpg";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/config/site-config";

const steps = [
  {
    icon: ShieldCheck,
    titleEn: "Free On-Site Evaluation",
    titleEs: "Evaluación Gratuita en el Sitio",
    descEn:
      "We inspect soil composition, yard access, underground utilities, and drainage slope before recommending the ideal shelter size.",
    descEs:
      "Inspeccionamos el suelo, acceso al patio, servicios subterráneos y pendiente antes de recomendar el modelo ideal.",
    tagEn: "Day 0 • Upfront Quote",
    tagEs: "Día 0 • Cotización",
    step: "01",
  },
  {
    icon: HardHat,
    titleEn: "Excavation & Crane Placement",
    titleEs: "Excavación y Colocación con Grúa",
    descEn:
      "Our licensed crew manages hydraulic rock excavation, laser-guided grading, crane rigging over fences, and deep anchor sets in a single day.",
    descEs:
      "Nuestro equipo gestiona la excavación en roca, nivelación láser, grúa sobre cercas y anclajes en un solo día.",
    tagEn: "Single-Day Install",
    tagEs: "Instalación en 1 Día",
    step: "02",
  },
  {
    icon: Home,
    titleEn: "Immediate Backyard Access",
    titleEs: "Acceso Inmediato en el Patio",
    descEn:
      "Steps from your back door with gas-spring assisted lightweight hatch lids for rapid, zero-detour entry when tornado sirens sound.",
    descEs:
      "A pocos pasos de su puerta con tapas asistidas por pistones para entrada rápida cuando suenen las sirenas.",
    tagEn: "Sub-60s Entry",
    tagEs: "Entrada Rápida",
    step: "03",
  },
  {
    icon: MapPin,
    titleEn: "Nashville & Middle TN Built",
    titleEs: "Construido en Nashville, TN",
    descEn:
      "Locally owned and operated with experienced construction craftsmen, dedicated equipment, and backed by a lifetime structural warranty.",
    descEs:
      "Empresa local con constructores experimentados, maquinaria propia y respaldo de garantía estructural de por vida.",
    tagEn: "100-Mile Radius",
    tagEs: "Radio de 100 Millas",
    step: "04",
  },
];

export function Welcome() {
  const { t } = useLanguage();

  return (
    <section
      id="welcome"
      className="relative bg-[#fafbfc] border-y border-slate-200/80 overflow-hidden py-16 sm:py-20 lg:py-24 isolate"
    >
      {/* Subtle Architectural Dot Matrix Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient Lighting Accents */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-slate-400/[0.03] rounded-full blur-[130px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-slate-900/[0.025] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Showcase (Photo + PIP Finishing Card) - 40% Width */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 relative order-2 lg:order-1 w-full"
          >
            {/* Architectural Frame */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 p-2 sm:p-2.5 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.22)] border border-slate-200/90 group">
              {/* Main Installation Image */}
              <div className="relative rounded-[20px] overflow-hidden aspect-[4/4.5] sm:aspect-[4/4.8] w-full bg-slate-950">
                <img
                  src={shelterInstallImg}
                  alt={t(
                    "Crane placement and excavation for underground storm shelter in Nashville",
                    "Instalación de refugio subterráneo con grúa y excavación en Nashville",
                  )}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/40 pointer-events-none" />

                {/* Top Left Status Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                    {t("FEMA 320/361 Certified", "Certificado FEMA 320/361")}
                  </span>
                </div>

                {/* Top Right Crane Rigging Tag */}
                <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
                  <Wrench className="w-3 h-3 text-white" />
                  <span>{t("Single-Day Crane Set", "Colocación con Grúa")}</span>
                </div>

                {/* Bottom Left Trust Ribbon */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-20 flex items-center gap-3 bg-slate-950/90 backdrop-blur-md border border-white/15 text-white px-4 py-3 rounded-2xl shadow-xl max-w-sm">
                  <div className="w-9 h-9 rounded-xl bg-white text-slate-950 flex items-center justify-center shrink-0 font-black shadow-md">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-white uppercase tracking-tight">
                      {t(
                        "Nashville's Premier Shelter Builders",
                        "Constructores Premier en Nashville",
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {t(
                        "Lifetime warranty on all units",
                        "Garantía de por vida en todas las unidades",
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Picture-in-Picture Clean Lawn Restoration Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-6 z-30 w-52 sm:w-64 rounded-2xl bg-white p-2.5 shadow-[0_24px_50px_rgba(15,23,42,0.22)] border border-slate-200/90 group/pip hidden sm:block"
            >
              <div className="relative rounded-xl overflow-hidden h-28 sm:h-32 mb-2 bg-slate-100">
                <img
                  src={grangerYardImg}
                  alt={t(
                    "Finished underground shelter with manicured lawn restoration",
                    "Refugio subterráneo terminado con césped restaurado",
                  )}
                  className="w-full h-full object-cover group-hover/pip:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-slate-950/90 backdrop-blur-md px-2 py-0.5 rounded text-[9.5px] font-black uppercase tracking-wider text-white border border-white/10">
                  {t("Finished Result", "Resultado Final")}
                </div>
              </div>
              <div className="px-1.5 pb-1">
                <div className="text-xs font-black text-slate-900 leading-tight">
                  {t("Turnkey Lawn Restoration", "Restauración de Jardín")}
                </div>
                <div className="text-[10.5px] text-slate-500 mt-0.5 font-medium leading-snug">
                  {t(
                    "Clean backfill & grade in 1 day",
                    "Relleno limpio y césped en 1 día",
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Process & Value Proposition - 60% Width */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 flex flex-col order-1 lg:order-2 w-full"
          >
            {/* Eyebrow Ribbon */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-slate-900/5 border border-slate-900/15 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-slate-900 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
              <span>
                {t(
                  "Our Turnkey Construction Process",
                  "Nuestro Proceso de Construcción",
                )}
              </span>
            </div>

            {/* Section Headline */}
            <h2
              className="font-display font-bold tracking-tight text-slate-950 leading-tight mb-[10px] text-[26px] sm:text-[32px] lg:text-[38px]"
              style={{
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              <span className="block">
                {t("Built Underground", "Construido Bajo Tierra")}
              </span>
              <span className="block text-slate-950 lg:whitespace-nowrap">
                {t(
                  "Engineered To Protect For Generations.",
                  "Diseñado Para Proteger Por Generaciones.",
                )}
              </span>
            </h2>

            {/* Lead Narrative */}
            <p
              className="text-black text-sm sm:text-base leading-relaxed font-medium -mt-[6px] mb-[10px]"
              style={{
                marginTop: "-6px",
                marginBottom: "10px",
                fontWeight: 500,
                color: "#000",
              }}
            >
              {t(
                "Southern Storm Shelters builds and installs precision-engineered underground storm shelters built to withstand extreme EF5 tornadic pressure. From laser-guided grade inspection to single-day crane placement and clean yard backfill, we make securing your family effortless and turnkey.",
                "Southern Storm Shelters construye e instala refugios subterráneos diseñados para resistir la fuerza de tornados EF5. Desde la inspección de suelo con láser hasta la colocación con grúa en un solo día, protegemos a su familia sin complicaciones.",
              )}
            </p>

            {/* 4 Interactive Process Stage Cards */}
            <div className="space-y-2.5 mb-7">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group relative flex items-center gap-3.5 py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-xl sm:rounded-2xl bg-white hover:bg-white border border-slate-200/80 hover:border-slate-950 shadow-[0_2px_6px_rgba(15,23,42,0.03)] hover:shadow-[0_10px_25px_-6px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-1 overflow-hidden"
                  >
                    {/* Left Illumination Edge Bar on Hover */}
                    <div className="absolute left-0 inset-y-0 w-1 bg-slate-950 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-r" />

                    {/* Stage Number & Icon Hardware Plaque */}
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 text-white group-hover:from-white group-hover:to-slate-100 group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-800/80 group-hover:border-slate-900">
                        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-black text-white text-[8.5px] font-black flex items-center justify-center border-2 border-white shadow-xs group-hover:scale-110 transition-transform">
                        {step.step}
                      </span>
                    </div>

                    {/* Stage Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-0.5">
                        <h3 className="text-slate-950 font-bold text-xs sm:text-[14.5px] tracking-tight leading-snug group-hover:text-black transition-colors">
                          {t(step.titleEn, step.titleEs)}
                        </h3>
                        <span className="text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 group-hover:bg-slate-950 border border-slate-200/60 group-hover:border-slate-950 text-slate-700 group-hover:text-white shrink-0 transition-colors">
                          {t(step.tagEn, step.tagEs)}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11.5px] sm:text-[12px] leading-snug font-normal">
                        {t(step.descEn, step.descEs)}
                      </p>
                    </div>

                    {/* Subtle Right Hover Micro-Arrow Cue */}
                    <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-slate-950 group-hover:text-white text-slate-400 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-1.5 group-hover:translate-x-0 transition-all duration-300 shrink-0 hidden sm:flex">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Actions Row & Hotline */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-widest px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <span>
                  {t(
                    "Learn More About Our Team",
                    "Conozca a Nuestro Equipo",
                  )}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 hover:border-slate-900 text-slate-900 text-xs font-bold px-5 py-3.5 rounded-xl transition-all duration-300 group"
              >
                <Phone className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform" />
                <span>
                  {SITE_CONFIG.phone} • {t("Free Estimate", "Cotización")}
                </span>
              </a>
            </div>

            {/* 3-Pillar Architectural Metrics Strip */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
