import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/config/site-config";
import {
  ArrowRight,
  Shield,
  Hammer,
  Layers,
  Droplets,
  Building2,
  Shovel,
  HardHat,
  Grid3X3,
  Phone,
} from "lucide-react";

import shelterCardImg1 from "@/assets/gallery/6.png";
import grangerCustomImg from "@/assets/granger-shelter-unit.jpg";
import grangerYardImg from "@/assets/granger-shelter-yard.jpg";
import grangerHatchImg from "@/assets/gallery/4.png";
import shelterInstallImg from "@/assets/gallery/shelterinstall.jpg";
import heroImg2 from "@/assets/gallery/5.png";
import heroImg1 from "@/assets/gallery/2.png";
import grangerInstallImg from "@/assets/granger-install.jpg";

const servicesData = [
  {
    id: "inground",
    icon: Shovel,
    titleEn: "In-Ground Prefab Shelters",
    titleEs: "Refugios Prefabricados Subterráneos",
    tagEn: "FEMA 320/361 Rated",
    tagEs: "Certificado FEMA",
    descEn:
      "Underground composite & steel units engineered for maximum tornado impact resistance and lifetime leakproof seal.",
    descEs:
      "Unidades subterráneas diseñadas para máxima resistencia a tornados y sellado de por vida.",
    href: "/services/in-ground-prefabricated-storm-shelters",
    img: shelterCardImg1,
  },
  {
    id: "custom",
    icon: Hammer,
    titleEn: "Custom Built Concrete Shelters",
    titleEs: "Refugios de Concreto a Medida",
    tagEn: "Heavy Construction",
    tagEs: "Construcción Pesada",
    descEn:
      "Reinforced 5,000+ PSI concrete storm shelters custom-poured to fit your exact residential or commercial footprint.",
    descEs:
      "Refugios de concreto reforzado de más de 5,000 PSI adaptados a la huella de su propiedad.",
    href: "/services/custom-built-storm-shelters",
    img: grangerCustomImg,
  },
  {
    id: "excavation",
    icon: HardHat,
    titleEn: "Excavation & Precision Site Prep",
    titleEs: "Excavación y Preparación de Terreno",
    tagEn: "Laser-Guided Grade",
    tagEs: "Nivelación Láser",
    descEn:
      "Full-service ground excavation, rock fracturing, and laser-guided grading for zero-settling foundation.",
    descEs:
      "Excavación integral de terreno y nivelación guiada por láser para una base sólida.",
    href: "/free-quote",
    img: shelterInstallImg,
  },
  {
    id: "crane",
    icon: Building2,
    titleEn: "Crane Rigging & Placement",
    titleEs: "Colocación con Grúa y Maniobras",
    tagEn: "Zero-Yard-Damage",
    tagEs: "Cero Daño al Jardín",
    descEn:
      "Certified boom crane operators placing multi-ton shelters cleanly over existing fences and tight suburban lots.",
    descEs:
      "Operadores certificados de grúa colocando refugios sobre cercas y patios difíciles.",
    href: "/free-quote",
    img: grangerInstallImg,
  },
  {
    id: "drainage",
    icon: Droplets,
    titleEn: "Hydrostatic Drainage & Anchors",
    titleEs: "Drenaje Hidrostático y Anclaje",
    tagEn: "Waterproof Seal",
    tagEs: "Sellado Impermeable",
    descEn:
      "French drains, anti-buoyancy engineered anchors, and sealed backfill transitions against Middle TN clay.",
    descEs:
      "Drenajes franceses, anclas anti-flotación y relleno sellado contra arcilla de Tennessee.",
    href: "/free-quote",
    img: grangerYardImg,
  },
  {
    id: "concrete",
    icon: Layers,
    titleEn: "Impact Slabs & Foundation Walls",
    titleEs: "Losas de Impacto y Muros",
    tagEn: "Structural Strength",
    tagEs: "Fuerza Estructural",
    descEn:
      "Rebar-reinforced retaining collars and concrete anchoring slabs designed to resist extreme hydrostatic load.",
    descEs:
      "Collares de retención y losas de anclaje de concreto diseñadas para carga hidrostática.",
    href: "/free-quote",
    img: heroImg2,
  },
  {
    id: "safe-rooms",
    icon: Shield,
    titleEn: "Above-Ground Armor Safe Rooms",
    titleEs: "Cuartos Seguros Sobre Suelo",
    tagEn: "EF5 Rated Armor",
    tagEs: "Blindaje Grado EF5",
    descEn:
      "Steel-armored safe rooms bolted with high-tensile epoxy anchors to existing concrete slabs for instant indoor safety.",
    descEs:
      "Cuartos seguros de acero blindado anclados a losas de concreto para acceso inmediato en casa.",
    href: "/free-quote",
    img: grangerHatchImg,
  },
  {
    id: "hardscape",
    icon: Grid3X3,
    titleEn: "Shelter Access & Landscape Finish",
    titleEs: "Accesorios y Acabado de Jardinería",
    tagEn: "Turnkey Restoration",
    tagEs: "Restauración Total",
    descEn:
      "Gas-spring assisted lightweight hatch lids, dual solar ventilation turbines, and complete yard turf restoration.",
    descEs:
      "Tapas asistidas por pistones, ventilación solar y restauración completa del césped.",
    href: "/free-quote",
    img: heroImg1,
  },
];

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="relative bg-[#070b12] py-[60px] overflow-hidden isolate"
      style={{ paddingTop: "60px", paddingBottom: "60px" }}
    >
      {/* Ambient Lighting & Atmosphere */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-sky-500/[0.03] rounded-full blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-14 sm:mb-16">
          {/* Eyebrow Status Ribbon */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-amber-400 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.12)]">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {t(
                "Turnkey Protection Services",
                "Servicios de Protección Llave en Mano",
              )}
            </span>
          </div>

          {/* Section Title */}
          <h2
            className="font-display font-bold tracking-tight capitalize text-white drop-shadow-md text-[24px] sm:text-[32px] lg:text-[40px] whitespace-normal lg:whitespace-nowrap"
            style={{
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {t(
              "Engineered Underground & Safe Room Solutions",
              "Soluciones de Refugios Subterráneos y Seguros",
            )}
          </h2>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px w-10 bg-white/20" />
            <div className="h-1.5 w-6 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
            <div className="h-px w-10 bg-white/20" />
          </div>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto mb-6 sm:mb-8 lg:-mb-[35px]">
            {t(
              "Every shelter project is executed by licensed Middle Tennessee construction specialists — from precision excavation and crane placement to anchoring and final lawn restoration.",
              "Cada proyecto es ejecutado por especialistas de Tennessee — desde la excavación y grúa hasta el anclaje y restauración final.",
            )}
          </p>
        </div>

        {/* 8 Pixel-Perfect Service Cards in a 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {servicesData.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="h-full"
              >
                <Link
                  to={service.href}
                  className="group relative flex flex-col justify-between h-full min-h-[380px] rounded-3xl overflow-hidden border border-white/[0.12] hover:border-amber-400/60 bg-[#080d16]/40 hover:bg-[#080d16]/20 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_-10px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.22)] cursor-pointer"
                >
                  {/* Background Photo with Depth Overlay - Highly Visible */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={service.img}
                      alt={t(service.titleEn, service.titleEs)}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-95 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/50 to-black/15 group-hover:via-[#070b12]/35 transition-colors duration-500" />
                  </div>

                  {/* Top Rim Specular Hairline */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-amber-400/60 transition-colors pointer-events-none" />

                  {/* Card Top Row: Icon */}
                  <div className="relative z-10 p-5 sm:p-6 flex items-start justify-end">
                    <div className="w-11 h-11 rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:text-slate-950 text-amber-400 flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-105 shrink-0">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                  </div>

                  {/* Card Footer: Anchored to Bottom of Card */}
                  <div className="relative z-10 mt-auto p-5 sm:p-6 bg-gradient-to-t from-[#060a12] via-[#060a12]/95 to-[#060a12]/75 backdrop-blur-md border-t border-white/[0.08] group-hover:border-amber-400/30 transition-all duration-300">
                    <h3
                      className="font-display text-white group-hover:text-amber-300 transition-colors leading-snug drop-shadow-md capitalize"
                      style={{
                        fontSize: "20px",
                        textTransform: "capitalize",
                        fontWeight: 700,
                      }}
                    >
                      {t(service.titleEn, service.titleEs)}
                    </h3>

                    <p className="text-xs text-slate-200/90 font-normal leading-relaxed line-clamp-2 mt-2 drop-shadow-sm">
                      {t(service.descEn, service.descEs)}
                    </p>

                    {/* Action Link Footer - Smoothly reveals on hover with grid expansion */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                      <div className="overflow-hidden">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent my-3" />
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 pt-0.5">
                          <span className="flex items-center gap-1.5 font-bold tracking-wider">
                            {t("Learn More", "Ver Detalles")}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/50 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-400 flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Active Glow Accent Bar */}
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-14 sm:mt-18 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
          >
            <span>
              {t(
                "Explore All Shelter Specifications",
                "Explorar Todas las Especificaciones",
              )}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-amber-400/40 text-white hover:text-amber-300 text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xl backdrop-blur-md transition-all duration-300 group"
          >
            <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>
              {SITE_CONFIG.phone} • {t("Direct Project Line", "Línea Directa")}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
