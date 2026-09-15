import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Sparkles, Shield, HardHat, Building2, Home, X, ZoomIn, Camera, Star } from "lucide-react";

import g1 from "@/assets/gallery/1.png";
import g2 from "@/assets/gallery/2.png";
import g3 from "@/assets/gallery/3.png";
import g4 from "@/assets/gallery/4.png";
import g5 from "@/assets/gallery/5.png";
import g6 from "@/assets/gallery/6.png";
import g7 from "@/assets/gallery/7.png";
import g8 from "@/assets/gallery/8.png";
import g9 from "@/assets/gallery/9.png";
import g10 from "@/assets/gallery/10.png";
import g12 from "@/assets/gallery/12.png";
import gShelterInstall from "@/assets/gallery/shelterinstall.jpg";
import gTornadoShelters6 from "@/assets/gallery/tornadoshelters6.jpg";
import gShelter5 from "@/assets/gallery/shelter5.jpg";
import gProInstall from "@/assets/gallery/Professional Installation.jpg";
import gGrangerPrepared from "@/assets/gallery/GrangerISSforPreparedSpared-e1741714349365.jpg";
import gInsideShelter from "@/assets/gallery/InsideofShelter-scaled-r4ebojreuj4ns9cra8kvsdflptcw5p2mja6hh7h24g.jpg";
import gImg0118 from "@/assets/gallery/IMG_0118-scaled-r4ebojreuj48ftcjj6kje1k3ffiqpa38l623yhkuf4.jpg";
import gImg0137 from "@/assets/gallery/IMG_0137-scaled-r4ebojrkbvjcrsnwjnowdzrmtrncu4qwzlzsen983c.jpg";
import gImg0181 from "@/assets/gallery/IMG_0181-scaled-r4ebojreuj4io40op7wrnlh3mcquc82tvwt0yyubk0.jpg";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@tanstack/react-router";

export function Projects({ isLanding = false }: { isLanding?: boolean }) {
  const { t } = useLanguage();

  const fallbackAll = [
    {
      img: gTornadoShelters6,
      title: t("Underground Safe Room Placement", "Colocación de Refugio Subterráneo"),
      cat: "Underground",
      loc: "Nashville, TN",
      year: "2024",
      tag: t("Underground Vault", "Bóveda Subterránea"),
      featured: true,
    },
    {
      img: g2,
      title: t("Precision Excavation & Shelter Set", "Excavación de Precisión e Instalación"),
      cat: "Installation",
      loc: "Franklin, TN",
      year: "2024",
      tag: t("Backyard Placement", "Colocación en Patio"),
      featured: true,
    },
    {
      img: g6,
      title: t("In-Ground Prefabricated Shelter", "Refugio Subterráneo Prefabricado"),
      cat: "Underground",
      loc: "Murfreesboro, TN",
      year: "2024",
      tag: t("In-Ground Shelter", "Refugio Subterráneo"),
      featured: true,
    },
    {
      img: gShelterInstall,
      title: t("Turnkey Backyard Crane Placement", "Colocación con Grúa en Patio"),
      cat: "Installation",
      loc: "Hendersonville, TN",
      year: "2024",
      tag: t("Crane Placement", "Colocación con Grúa"),
      featured: true,
    },
    {
      img: g1,
      title: t("Steel Safe Room Structure", "Estructura de Sala Segura de Acero"),
      cat: "Residential",
      loc: "Brentwood, TN",
      year: "2024",
      tag: t("Family Safe Haven", "Refugio Familiar"),
      featured: false,
    },
    {
      img: g3,
      title: t("Multi-Point Security Hatch Door", "Puerta de Escotilla de Seguridad"),
      cat: "Underground",
      loc: "Lebanon, TN",
      year: "2024",
      tag: t("Watertight Hatch", "Escotilla Hermética"),
      featured: false,
    },
    {
      img: g4,
      title: t("Reinforced Shelter Interior Chamber", "Cámara Interior Reforzada"),
      cat: "Underground",
      loc: "Mount Juliet, TN",
      year: "2024",
      tag: t("Interior Vault", "Interior de Bóveda"),
      featured: false,
    },
    {
      img: g5,
      title: t("Heavy-Duty Jobsite Installation", "Instalación de Gran Capacidad"),
      cat: "Installation",
      loc: "Spring Hill, TN",
      year: "2024",
      tag: t("Jobsite Setup", "Preparación del Terreno"),
      featured: false,
    },
    {
      img: g7,
      title: t("Underground Modular Storm Shelter", "Refugio Modular Subterráneo"),
      cat: "Underground",
      loc: "Columbia, TN",
      year: "2024",
      tag: t("Modular Safe Room", "Sala Segura Modular"),
      featured: true,
    },
    {
      img: g8,
      title: t("Engineered Shelter Shell Assembly", "Ensamblaje de Carcasa de Refugio"),
      cat: "Residential",
      loc: "Gallatin, TN",
      year: "2024",
      tag: t("Engineered Shell", "Carcasa Diseñada"),
      featured: false,
    },
    {
      img: g9,
      title: t("Backyard Excavation & Anchoring", "Excavación y Anclaje en Patio"),
      cat: "Installation",
      loc: "Smyrna, TN",
      year: "2024",
      tag: t("Ground Anchoring", "Anclaje al Terreno"),
      featured: false,
    },
    {
      img: g10,
      title: t("Safe Entry Access System", "Sistema de Acceso Seguro"),
      cat: "Residential",
      loc: "Clarksville, TN",
      year: "2024",
      tag: t("Entry Access", "Acceso Seguro"),
      featured: false,
    },
    {
      img: g12,
      title: t("Heavy Equipment Rigging & Set", "Maniobra y Colocación con Equipo Pesado"),
      cat: "Installation",
      loc: "Dickson, TN",
      year: "2024",
      tag: t("Heavy Rigging", "Maniobra Pesada"),
      featured: true,
    },
    {
      img: gProInstall,
      title: t("Professional Jobsite Installation", "Instalación Profesional en Terreno"),
      cat: "Installation",
      loc: "Nashville, TN",
      year: "2024",
      tag: t("Professional Install", "Instalación Profesional"),
      featured: false,
    },
    {
      img: gShelter5,
      title: t("Residential Flush-Ground Shelter", "Refugio a Nivel del Césped"),
      cat: "Residential",
      loc: "Franklin, TN",
      year: "2024",
      tag: t("Flush Ground", "Al Nivel del Suelo"),
      featured: true,
    },
    {
      img: gInsideShelter,
      title: t("Interior Molded Seating & Stairs", "Asientos Moldeados y Escalones Interiores"),
      cat: "Underground",
      loc: "Murfreesboro, TN",
      year: "2024",
      tag: t("Interior Comfort", "Comodidad Interior"),
      featured: false,
    },
    {
      img: gGrangerPrepared,
      title: t("Turnkey In-Ground Shelter Unit", "Unidad Subterránea Llave en Mano"),
      cat: "Underground",
      loc: "Brentwood, TN",
      year: "2024",
      tag: t("Prefabricated Vault", "Bóveda Prefabricada"),
      featured: false,
    },
    {
      img: gImg0118,
      title: t("Site Preparation & Leveling", "Nivelación y Preparación del Sitio"),
      cat: "Installation",
      loc: "Hendersonville, TN",
      year: "2024",
      tag: t("Site Prep", "Preparación de Terreno"),
      featured: false,
    },
    {
      img: gImg0137,
      title: t("Safe Ground Hatch Installation", "Instalación de Escotilla a Nivel de Tierra"),
      cat: "Residential",
      loc: "Lebanon, TN",
      year: "2024",
      tag: t("Ground Hatch", "Escotilla de Suelo"),
      featured: false,
    },
    {
      img: gImg0181,
      title: t("Underground Entryway & Latching", "Entrada y Cerraduras Subterráneas"),
      cat: "Underground",
      loc: "Mount Juliet, TN",
      year: "2024",
      tag: t("Secure Latching", "Cerradura de Seguridad"),
      featured: false,
    },
  ];

  const all = fallbackAll;

  const catLabels: Record<string, string> = {
    All: t("All Shelters", "Todos los Refugios"),
    Residential: t("Residential", "Residencial"),
    Installation: t("Installation & Prep", "Instalación y Terreno"),
    Underground: t("Underground Vaults", "Bóvedas Subterráneas"),
  };

  const dynamicCats = useMemo(() => {
    const categories = new Set<string>();
    categories.add("All");
    all.forEach((p) => {
      if (p.cat) categories.add(p.cat);
    });
    return Array.from(categories);
  }, [all]);

  const [active, setActive] = useState<string>("All");
  const [showAll, setShowAll] = useState<boolean>(false);
  const items = active === "All" ? all : all.filter((p) => p.cat === active);
  const displayItems = isLanding && !showAll ? items.slice(0, 8) : items;

  // Lightbox state
  const [lightbox, setLightbox] = useState<null | (typeof all)[number]>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number>(0);

  const openLightbox = useCallback((p: (typeof all)[number], idx: number) => {
    setLightbox(p);
    setLightboxIdx(idx);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const prevPhoto = useCallback(() => {
    const newIdx = (lightboxIdx - 1 + displayItems.length) % displayItems.length;
    setLightboxIdx(newIdx);
    setLightbox(displayItems[newIdx]);
  }, [lightboxIdx, displayItems]);

  const nextPhoto = useCallback(() => {
    const newIdx = (lightboxIdx + 1) % displayItems.length;
    setLightboxIdx(newIdx);
    setLightbox(displayItems[newIdx]);
  }, [lightboxIdx, displayItems]);

  // ESC + Arrow keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox, prevPhoto, nextPhoto]);

  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  return (
    <section id="projects" className="relative bg-[#F8FAFC] py-16 sm:py-20 overflow-hidden">

      {/* Background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #dc2626 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">

        {/* ── Section Header ──────────────────────────── */}
        {!isLanding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white border border-red-200 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#dc2626] mb-5 shadow-sm">
                <Camera className="w-3.5 h-3.5" />
                {t("Our Shelter Gallery", "Nuestra Galería de Refugios")}
              </div>

              <h2
                className="text-slate-900 tracking-tight leading-[1.1] font-black"
                style={{ fontSize: "38px", marginTop: "-8px", marginBottom: "10px" }}
              >
                {t("See Our Work — ", "Vea Nuestro Trabajo — ")}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#b91c1c]">
                  {t("Real Protection in Action.", "Protección Real en Acción.")}
                </span>
              </h2>
              <p className="text-slate-500 text-[15px] leading-relaxed font-normal max-w-xl">
                {t("Every installation represents a family safeguarded. Browse our recent underground storm shelter installations across Nashville and Middle Tennessee.", "Cada instalación representa una familia protegida. Explore nuestras instalaciones recientes en Nashville y Middle Tennessee.")}
              </p>
            </div>

            <Link
              to="/free-quote"
              className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-[11px] font-black uppercase tracking-widest rounded-full px-6 py-3.5 transition-all duration-300 shadow-lg hover:scale-[1.03] active:scale-[0.97] shrink-0 self-start lg:self-auto cursor-pointer"
            >
              {t("Get Free Estimate", "Solicitar Estimación")} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}

        {/* Landing mini header */}
        {isLanding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-red-200 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#dc2626] mb-4 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-[#dc2626]" />
                {t("Our Work Gallery", "Nuestra Galería")}
              </div>
              <h2 className="text-slate-900 font-black text-[26px] sm:text-[32px] leading-tight tracking-tight">
                {t("Real Results, Real Protection.", "Resultados Reales, Protección Real.")}
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-[#0b0f15] hover:bg-[#111722] text-white text-[11px] font-black uppercase tracking-widest rounded-full px-6 py-3 transition-all duration-200 shadow-md hover:scale-[1.02] shrink-0 self-start sm:self-auto cursor-pointer"
            >
              {t("View Full Gallery", "Ver Galería Completa")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        )}

        {/* ── Projects Grid ───────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={isLanding
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            }
          >
            {displayItems.map((p, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onClick={() => openLightbox(p, idx)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-zoom-in",
                  isLanding
                    ? "aspect-[4/3] w-full"
                    : p.featured ? "sm:col-span-1 lg:row-span-2" : ""
                )}
              >
                {/* Image */}
                <div className={cn(
                  "overflow-hidden w-full h-full",
                  isLanding ? "h-full" : p.featured ? "h-[420px] lg:h-full lg:min-h-[520px]" : "h-[250px] sm:h-[270px]"
                )}>
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                    loading={idx < 5 ? "eager" : "lazy"}
                  />
                </div>

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/85 border border-white/40 text-[#dc2626] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-md backdrop-blur-xs">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── View More Button ── */}
        {isLanding && items.length > 8 && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="group inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 hover:border-[#dc2626] text-xs sm:text-sm font-black uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{showAll ? t("Show Less", "Ver Menos") : t("View More", "Ver Más")}</span>
              <div className="w-6 h-6 rounded-full bg-red-50 text-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className={cn("w-3.5 h-3.5 transition-transform", showAll ? "-rotate-90" : "rotate-90")} />
              </div>
            </button>
          </div>
        )}

      </div>

      {/* ── Lightbox Modal ──────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/88 backdrop-blur-md" />

            {/* Modal */}
            <motion.div
              className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition hover:scale-110"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Prev / Next arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition hover:scale-110"
                aria-label="Previous"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-14 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition hover:scale-110"
                aria-label="Next"
              >
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Photo counter */}
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
                {lightboxIdx + 1} / {displayItems.length}
              </div>

              {/* Full image */}
              <div className="relative flex-1 overflow-hidden bg-black">
                <img
                  src={lightbox.img}
                  alt={lightbox.title}
                  className="w-full h-full object-contain max-h-[75vh]"
                />
              </div>

              {/* Bottom bar with Get a Quote button */}
              <div className="bg-white px-5 py-3.5 flex items-center justify-center shrink-0 border-t border-slate-100">
                <a
                  href="/free-quote"
                  onClick={closeLightbox}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-2.5 rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-md cursor-pointer"
                >
                  {t("Get a Quote", "Solicitar Cotización")} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
