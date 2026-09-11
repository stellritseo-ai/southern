import { motion } from "framer-motion";
import {
  CalendarCheck,
  Search,
  ShieldCheck,
  HardHat,
  BadgeCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

/* ── Custom Animated Icons for Start & Finish ────── */

const AnimatedStartIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="54" height="54" rx="18" fill="url(#startBg)" />
    <rect x="1" y="1" width="52" height="52" rx="17" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.7" />

    {/* Vault hatch emblem */}
    <path d="M14 27L27 15L40 27" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 26V37C18 38.1 18.9 39 20 39H34C35.1 39 36 38.1 36 37V26" stroke="#ffffff" strokeWidth="2" opacity="0.9" />
    <circle cx="27" cy="32" r="3" fill="#ef4444" />

    <defs>
      <linearGradient id="startBg" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#991b1b" />
        <stop offset="1" stopColor="#dc2626" />
      </linearGradient>
    </defs>
  </svg>
);

const AnimatedFinishIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="54" height="54" rx="18" fill="url(#finishBg)" />
    <rect x="1" y="1" width="52" height="52" rx="17" stroke="#dc2626" strokeWidth="1.5" strokeOpacity="0.8" />

    {/* Shield Outline */}
    <path d="M27 10L41 15V26C41 34.5 34.5 42 27 45C19.5 42 13 34.5 13 26V15L27 10Z" fill="#111722" stroke="#dc2626" strokeWidth="2" />
    <path d="M20 26.5L25 31.5L34 21.5" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

    <defs>
      <linearGradient id="finishBg" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0b0f15" />
        <stop offset="1" stopColor="#1a2230" />
      </linearGradient>
    </defs>
  </svg>
);

export function Process() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t("1. Consultation & Evaluation", "1. Consulta y Evaluación"),
      desc: t("Free on-site property evaluation, soil assessment, and laser yard measurements in Nashville & Middle TN.", "Evaluación gratuita en su propiedad, análisis de suelo y mediciones láser en Nashville y Middle TN."),
    },
    {
      icon: ShieldCheck,
      title: t("2. Shelter Selection", "2. Selección del Refugio"),
      desc: t("Select the right capacity for your family or team. Built to meet strict FEMA P-320 and ICC-500 standards.", "Seleccione la capacidad adecuada. Construidos bajo estrictas normas FEMA P-320 e ICC-500."),
    },
    {
      icon: HardHat,
      title: t("3. Precision Excavation", "3. Excavación de Precisión"),
      desc: t("Utility markout, laser-guided ground excavation, and proper water drainage base grading.", "Marcación de servicios, excavación con guía láser y nivelación adecuada para drenaje de agua."),
    },
    {
      icon: CalendarCheck,
      title: t("4. Crane Setting & Anchoring", "4. Colocación con Grúa y Anclaje"),
      desc: t("Heavy crane lowers the shelter into position with anti-buoyancy concrete anchors.", "Grúa pesada coloca el refugio en posición con anclajes de concreto anti-flotación."),
    },
    {
      icon: BadgeCheck,
      title: t("5. Sealing & Final Inspection", "5. Sellado e Inspección Final"),
      desc: t("Watertight gasket calibration, multi-point lock testing, clean lawn backfill, and client walk-through.", "Calibración de empaques herméticos, prueba de cerraduras, relleno limpio y revisión final."),
    },
  ];

  const desktopPositions = [
    { left: "20%", top: "50px" },
    { left: "50%", top: "50px" },
    { left: "80%", top: "50px" },
    { left: "20%", top: "310px" },
    { left: "50%", top: "310px" },
  ];

  return (
    <section className="relative pt-12 sm:pt-16 pb-[40px] lg:pt-20 lg:pb-[40px] overflow-hidden bg-white border-y border-slate-100" style={{ paddingBottom: "40px" }}>

      {/* Background grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #dc2626 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <style>{`
        @keyframes sparkFlowRed {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 45; }
        }
        @keyframes verticalRedFlow {
          0%   { background-position: 0 0; }
          100% { background-position: 0 -40px; }
        }
        .spark-flow-red { stroke-dasharray: 12 24; animation: sparkFlowRed 1.8s infinite linear; }
        .mobile-red-flow {
          background: linear-gradient(to bottom, #dc2626 0%, #dc2626 30%, #f87171 50%, #dc2626 70%, #dc2626 100%);
          background-size: 100% 40px;
          animation: verticalRedFlow 1.2s infinite linear;
        }
      `}</style>

      <div className="mx-auto w-[90%] max-w-7xl relative z-10">

        {/* ── Section Header ──────────────────────────────── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-[#dc2626] rounded-full px-5 py-1.5 text-xs font-black uppercase tracking-widest mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
            {t("Installation Process", "Proceso de Instalación")}
            <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
          </span>

          <h2
            className="text-slate-900 tracking-tight leading-[1.15] font-black"
            style={{ fontSize: "clamp(24px, 5vw, 36px)", marginTop: "-15px", marginBottom: "10px" }}
          >
            {t("Precision Installation in ", "Instalación de Precisión en ")}
            <span className="bg-gradient-to-r from-[#dc2626] via-red-600 to-[#b91c1c] bg-clip-text text-transparent">
              {t("5 Proven Steps.", "5 Pasos Probados.")}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
            {t("From initial laser site evaluation to precision crane placement and final hydrostatic anchoring, our turnkey process delivers complete family safety in just 1 to 2 days.", "Desde la evaluación láser inicial del terreno hasta la colocación con grúa pesada y el anclaje final, nuestro proceso entrega seguridad total en solo 1 o 2 días.")}
          </p>
        </motion.div>

        {/* ── 1. DESKTOP: S-Curve SVG Layout ──────────────── */}
        <div className="hidden lg:block relative w-full h-[460px] select-none">

          {/* Left Animated Start Icon */}
          <div className="absolute left-[70px] top-[50px] z-20 -translate-x-1/2 -translate-y-1/2 group">
            <div className="relative p-1.5 rounded-[22px] bg-white shadow-[0_12px_36px_rgba(220,38,38,0.22)] border-2 border-[#dc2626] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="absolute -inset-1.5 rounded-[24px] bg-[#dc2626]/20 blur-md -z-10 group-hover:bg-[#dc2626]/40 transition-colors animate-pulse" />
              <AnimatedStartIcon />
            </div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider text-[#dc2626] whitespace-nowrap bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-red-200 shadow-sm">
              {t("Site Start", "Inicio del Sitio")}
            </div>
          </div>

          {/* Right Animated Finish Icon */}
          <div className="absolute left-[975px] top-[310px] z-20 -translate-x-1/2 -translate-y-1/2 group">
            <div className="relative p-1.5 rounded-[22px] bg-white shadow-[0_12px_36px_rgba(220,38,38,0.25)] border-2 border-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="absolute -inset-1.5 rounded-[24px] bg-red-600/25 blur-md -z-10 group-hover:bg-red-600/50 transition-colors animate-pulse" />
              <AnimatedFinishIcon />
            </div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider text-slate-900 whitespace-nowrap bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-red-300 shadow-sm">
              {t("100% Certified", "100% Certificado")}
            </div>
          </div>

          {/* S-Curve Path Conduit */}
          <svg
            viewBox="0 0 1200 360"
            className="absolute top-0 left-0 w-full h-[360px] pointer-events-none z-0"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Drop shadow */}
            <path d="M 100 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 940 310"
              stroke="#0f172a" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.06" />
            {/* Outer conduit */}
            <path d="M 100 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 940 310"
              stroke="#111722" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            {/* Animated red core */}
            <motion.path
              d="M 100 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 940 310"
              stroke="#dc2626" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            {/* Red spark flow */}
            <path d="M 100 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 940 310"
              stroke="#f87171" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
              opacity="0.85" className="spark-flow-red" />
          </svg>

          {/* Step nodes */}
          {steps.map((s, i) => {
            const pos = desktopPositions[i];
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="absolute group cursor-default"
                style={{ left: pos.left, top: pos.top }}
              >
                {/* Circle node */}
                <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[82px] h-[82px] rounded-full bg-white shadow-[0_12px_36px_rgba(220,38,38,0.12)] border-2 border-slate-100 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_20px_40px_-6px_rgba(220,38,38,0.3)] group-hover:border-[#dc2626]">
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-[#dc2626] text-white flex items-center justify-center shadow-md border-2 border-white">
                    <span className="text-[11px] font-black leading-none">{i + 1}</span>
                  </div>
                  {/* Inner ring */}
                  <div className="absolute inset-1.5 rounded-full border border-transparent group-hover:border-red-200 transition-all duration-300" />
                  {/* Icon */}
                  <Icon className="h-7 w-7 text-slate-600 group-hover:text-[#dc2626] transition-colors duration-300" />
                </div>

                {/* Text block below node */}
                <div className="absolute top-[52px] -translate-x-1/2 text-center w-[230px] flex flex-col items-center pt-2">
                  <h3 className="font-extrabold text-[15px] text-slate-900 leading-tight mt-1 mb-1.5 group-hover:text-[#dc2626] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed font-normal px-1">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── 2. MOBILE: Vertical Timeline ────────────────── */}
        <div className="relative grid gap-8 pl-14 lg:hidden pt-10 pb-4">

          {/* Mobile Top Start Icon */}
          <div className="absolute left-[14px] -top-6 z-20 p-1 rounded-2xl bg-white shadow-md border-2 border-[#dc2626] flex items-center justify-center">
            <AnimatedStartIcon />
          </div>

          {/* Animated vertical conduit */}
          <div className="absolute left-[39px] top-6 bottom-6 w-2.5 pointer-events-none z-0">
            <div className="absolute inset-0 bg-slate-900/10 rounded-full blur-[2px]" />
            <div className="absolute inset-0 bg-[#111722] rounded-full" />
            <div className="absolute inset-[2px] rounded-full mobile-red-flow" />
          </div>

          {/* Mobile Bottom Finish Icon */}
          <div className="absolute left-[14px] -bottom-6 z-20 p-1 rounded-2xl bg-white shadow-md border-2 border-red-600 flex items-center justify-center">
            <AnimatedFinishIcon />
          </div>

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col group text-left"
              >
                {/* Circle node */}
                <div className="absolute -left-[54px] top-0 w-12 h-12 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#dc2626]">
                  {/* Step badge */}
                  <div className="absolute -top-1.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#dc2626] text-white flex items-center justify-center border border-white">
                    <span className="text-[9px] font-black">{i + 1}</span>
                  </div>
                  <Icon className="h-5 w-5 text-slate-600 group-hover:text-[#dc2626] transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="pl-4 py-0.5">
                  <h3 className="font-extrabold text-base text-slate-900 leading-tight mt-0 mb-1.5 group-hover:text-[#dc2626] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal max-w-sm">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
