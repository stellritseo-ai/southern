import { useState } from "react";

import {
  ArrowRight,
  Shield,
  Home,
  Building2,
  HardHat,
  Wrench,
  RefreshCw,
  Star,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Sparkles
} from "lucide-react";

import shelterInteriorImg from "@/assets/shelter-interior.jpg";
import familyHomeImg from "@/assets/family-home.jpg";
import commercialImg from "@/assets/commercial.jpg";
import installCraneImg from "@/assets/install-crane.jpg";
import excavationImg from "@/assets/excavation.jpg";
import hatchCloseImg from "@/assets/hatch-close.jpg";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

/* ── Service Card Component ─────────────────────────────── */
function ServiceCard({
  s,
  aspectRatio = "min-h-[420px]"
}: {
  s: {
    id: string;
    category: string;
    icon: any;
    title: string;
    categoryLabel: string;
    desc: string;
    features: string[];
    image: string;
    to: string;
  };
  aspectRatio?: string;
}) {
  const Icon = s.icon;
  const { t } = useLanguage();

  return (
    <div
      className={`group relative w-full ${aspectRatio} rounded-[32px] overflow-hidden bg-slate-950 border border-slate-200/80 hover:border-[#dc2626] shadow-xl hover:shadow-[0_22px_60px_rgba(220,38,38,0.3)] transition-all duration-500 cursor-default flex flex-col justify-end select-none block`}
    >
      {/* Background Image */}
      <img
        src={s.image}
        alt={s.title}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Gradient Overlay: Dark at bottom for text, crystal clear & light at top to showcase the image */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          background: "linear-gradient(to top, rgba(11, 15, 21, 0.98) 0%, rgba(11, 15, 21, 0.92) 36%, rgba(11, 15, 21, 0.45) 60%, rgba(11, 15, 21, 0.08) 80%, rgba(0, 0, 0, 0) 100%)"
        }}
      />

      {/* Red Accent Border Highlight on Hover */}
      <div className="absolute inset-0 rounded-[32px] border-2 border-transparent group-hover:border-[#dc2626]/80 transition-colors duration-500 pointer-events-none" />

      {/* Top Glass Header Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        {/* Icon Badge */}
        <div className="w-11 h-11 rounded-2xl bg-[#0b0f15]/90 backdrop-blur-md border border-red-500/40 text-red-400 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#dc2626] group-hover:text-white transition-all duration-300">
          <Icon className="h-5 w-5" />
        </div>

        {/* Category Label */}
        <span className="bg-black/80 backdrop-blur-md border border-red-500/30 text-red-300 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
          {s.categoryLabel}
        </span>
      </div>

      {/* Card Body Content */}
      <div className="relative z-20 p-6 sm:p-7 flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-1">

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight tracking-tight group-hover:text-red-400 transition-colors duration-300">
          {s.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5 font-normal line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {s.desc}
        </p>

        {/* Feature Checkmarks list */}
        <div className="mt-4 pt-3 border-t border-white/15 space-y-2">
          {s.features.map((feat) => (
            <div key={feat} className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Action Link Footer */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <div className="overflow-hidden">
            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-red-400 text-xs font-black uppercase tracking-widest group/btn">
              <span className="inline-flex items-center gap-1.5 group-hover/btn:underline">
                {t("Get Free Estimate", "Solicitar Estimación")}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#dc2626] text-white flex items-center justify-center transition-all duration-300">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function Services() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const services = [
    {
      id: "underground-shelters",
      category: "residential",
      icon: Shield,
      title: t("Underground Storm Shelters", "Refugios Subterráneos"),
      categoryLabel: t("Core Protection", "Protección Principal"),
      desc: t("Engineered underground safety shelters built below grade to provide impenetrable protection against EF-5 tornadoes.", "Refugios subterráneos diseñados para proporcionar protección impenetrable contra tornados EF-5."),
      features: [
        t("FEMA P-320 & ICC-500 Certified", "Certificación FEMA P-320 e ICC-500"),
        t("Reinforced Steel Vault Core", "Núcleo de Bóveda de Acero Reforzado"),
        t("Integrated Bench Seating & Air Flow", "Bancas Integradas y Ventilación")
      ],
      image: shelterInteriorImg,
      to: "/services/lawn-mowing"
    },
    {
      id: "residential-shelters",
      category: "residential",
      icon: Home,
      title: t("Residential Storm Shelters", "Refugios Residenciales"),
      categoryLabel: t("Residential", "Residencial"),
      desc: t("Custom underground backyard tornado shelters designed specifically for family homes across Nashville and Middle TN.", "Refugios subterráneos personalizados para patios traseros de viviendas familiares en Nashville."),
      features: [
        t("Immediate Backyard Access", "Acceso Inmediato en el Patio"),
        t("Capacity for 6 to 16+ People", "Capacidad para 6 a 16+ Personas"),
        t("Clean Flush-to-Lawn Finish", "Acabado al Nivel del Césped")
      ],
      image: familyHomeImg,
      to: "/services/landscaping"
    },
    {
      id: "commercial-shelters",
      category: "commercial",
      icon: Building2,
      title: t("Commercial Storm Shelters", "Refugios Comerciales"),
      categoryLabel: t("Commercial", "Comercial"),
      desc: t("Heavy-duty large capacity storm shelters and reinforced safe rooms for businesses, schools, and job sites.", "Refugios para tormentas de gran capacidad para empresas, escuelas y sitios de trabajo."),
      features: [
        t("Engineered High Capacity", "Alta Capacidad de Ocupación"),
        t("OSHA & Building Code Compliant", "Cumple con Códigos de Edificación"),
        t("Dual Emergency Exit Hatches", "Escotillas Dobles de Emergencia")
      ],
      image: commercialImg,
      to: "/services/office-commercial-cleaning"
    },
    {
      id: "shelter-installation",
      category: "installation",
      icon: HardHat,
      title: t("Professional Installation", "Instalación Profesional"),
      categoryLabel: t("Installation", "Instalación"),
      desc: t("Turnkey installation with laser-guided leveling, heavy crane setting, and anti-buoyancy concrete anchoring.", "Instalación completa con nivelación láser, colocación con grúa pesada y anclaje anti-flotación."),
      features: [
        t("Fast 1-2 Day Turnkey Setup", "Instalación Rápida en 1-2 Días"),
        t("Precision Crane Placement", "Colocación con Grúa de Precisión"),
        t("Anti-Buoyancy Anchoring", "Anclaje de Concreto Anti-Flotación")
      ],
      image: installCraneImg,
      to: "/services/gravel-dirt-work"
    },
    {
      id: "site-prep",
      category: "installation",
      icon: Wrench,
      title: t("Shelter Site Preparation", "Preparación del Terreno"),
      categoryLabel: t("Excavation", "Excavación"),
      desc: t("Yard excavation, underground utility clearance, precision backfill, and complete site cleanup.", "Excavación de jardín, localización de servicios públicos, relleno de precisión y limpieza."),
      features: [
        t("Utility Clearance & Markout", "Marcación de Servicios Públicos"),
        t("Laser-Guided Yard Excavation", "Excavación con Guía Láser"),
        t("Proper Water Drainage Grading", "Nivelación para Drenaje de Agua")
      ],
      image: excavationImg,
      to: "/services/tree-brush-removal"
    },
    {
      id: "upgrades",
      category: "installation",
      icon: RefreshCw,
      title: t("Shelter Upgrades & Hatches", "Mejoras y Escotillas"),
      categoryLabel: t("Maintenance", "Mantenimiento"),
      desc: t("Hydraulic gas-strut hatch upgrades, multi-point deadbolt locks, emergency lighting, and gasket seals.", "Mejoras de escotillas con amortiguadores de gas, cerraduras de seguridad y sellado hermético."),
      features: [
        t("Easy-Lift Gas Strut Hatches", "Escotillas Fáciles de Abrir"),
        t("Multi-Point Steel Deadbolts", "Cerrojos de Seguridad de Acero"),
        t("Watertight Rubber Gasket Seal", "Sellos de Goma Herméticos")
      ],
      image: hatchCloseImg,
      to: "/services/residential-wire-house-cleaning"
    }
  ];

  const filterTabs = [
    { id: "all", label: t("All Services", "Todos los Servicios"), count: services.length },
    { id: "residential", label: t("Residential Shelters", "Refugios Residenciales"), count: services.filter(s => s.category === "residential").length },
    { id: "commercial", label: t("Commercial Shelters", "Refugios Comerciales"), count: services.filter(s => s.category === "commercial").length },
    { id: "installation", label: t("Installation & Site Prep", "Instalación y Terreno"), count: services.filter(s => s.category === "installation").length },
  ];

  const filteredServices = activeFilter === "all"
    ? services
    : services.filter(s => s.category === activeFilter);

  return (
    <section id="services" className="bg-[#F8FAFC] py-12 sm:py-16 lg:py-24 overflow-hidden border-y border-slate-200/60 relative">
      {/* Background Decor Ambient Blobs */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-[#dc2626]/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] rounded-full bg-red-600/5 blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {/* ── Section Header ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl text-left space-y-4">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#dc2626]">
              <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
              {t("Life-Safety Solutions", "Soluciones de Seguridad")}
              <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
            </div>

            {/* Headline */}
            <h2
              className="font-display text-[24px] sm:text-[30px] lg:text-[34px] font-black text-slate-900 tracking-tight leading-tight -mt-[10px] mb-[7px]"
              style={{ marginTop: "-10px", marginBottom: "7px" }}
            >
              {t("Storm Protection, ", "Protección Contra Tormentas, ")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#b91c1c]">
                {t("Built Around You.", "Diseñada para Usted.")}
              </span>
            </h2>

            <p className="text-slate-600 text-[14px] sm:text-base lg:text-lg leading-relaxed font-normal">
              {t("FEMA-compliant underground shelters, residential backyard safe rooms, and turnkey site preparation across Nashville and Middle Tennessee.", "Refugios subterráneos conformes a FEMA, cuartos de seguridad residenciales y preparación completa del terreno en Nashville y el centro de Tennessee.")}
            </p>
          </div>

          {/* Quick Callout Button */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Button variant="hero" size="lg" className="font-bold rounded-full px-6 text-sm sm:text-base bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-md hover:shadow-lg transition-all duration-200 w-full md:w-auto justify-center">
              {t("Explore All Shelters", "Explorar Todos los Refugios")}
              <ArrowRight className="w-4 h-4 ml-1 text-white" />
            </Button>
          </div>
        </div>

        {/* ── Trust & Quality Guarantee Banner ─────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md mb-8 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-red-50 text-[#dc2626] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-tight truncate">{t("Licensed & Insured", "Licencia y Seguro")}</span>
              <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-500 truncate">{t("100% Bonded Protection", "Protección 100% Garantizada")}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-red-50 text-[#dc2626] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-tight truncate">{t("24/7 Availability", "Disponible 24/7")}</span>
              <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-500 truncate">{t("Emergency Response", "Respuesta Rápida")}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-red-50 text-[#dc2626] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-tight truncate">{t("100-Mile Radius", "Radio de 100 Millas")}</span>
              <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-500 truncate">{t("Nashville & Beyond", "Nashville y Alrededores")}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-red-50 text-[#dc2626] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-tight truncate">{t("FEMA P-320", "Norma FEMA P-320")}</span>
              <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-500 truncate">{t("EF-5 Tornado Tested", "Probado Contra Tornados EF-5")}</span>
            </div>
          </div>
        </div>

        {/* ── Category Filter Tabs ─────────────────────────────── */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 whitespace-nowrap shadow-xs cursor-pointer flex items-center gap-2 ${isActive
                    ? "bg-[#dc2626] text-white shadow-md shadow-red-600/25 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90"
                  }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${isActive ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Filtered Main Grid (3 columns for 6 cards) ──────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((s, idx) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <div className="block w-full">
                  <ServiceCard s={s} aspectRatio="min-h-[350px] sm:min-h-[420px] lg:min-h-[480px]" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
