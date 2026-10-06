import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  HardHat,
  X,
  ZoomIn,
  Camera,
  Star,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@tanstack/react-router";
import { SITE_CONFIG } from "@/config/site-config";

// ── Jobsite Gallery Assets (All 13 images from src/assets/gallery1) ──────────
import g1 from "@/assets/gallery1/1.png";
import g2 from "@/assets/gallery1/2.png";
import g3 from "@/assets/gallery1/3.png";
import g4 from "@/assets/gallery1/4.png";
import g5 from "@/assets/gallery1/5.png";
import g6 from "@/assets/gallery1/6.png";
import g7 from "@/assets/gallery1/7.png";
import g8 from "@/assets/gallery1/11.png";
import g9 from "@/assets/gallery1/IMG_0118-scaled-r4ebojreuj48ftcjj6kje1k3ffiqpa38l623yhkuf4.jpg";
import g10 from "@/assets/gallery1/IMG_0137-scaled-r4ebojrkbvjcrsnwjnowdzrmtrncu4qwzlzsen983c.jpg";
import g11 from "@/assets/gallery1/Professional Installation.jpg";
import g12 from "@/assets/gallery1/shelter5.jpg";
import g13 from "@/assets/gallery1/tornadoshelters6.jpg";

interface ProjectItem {
  id: string;
  img: string;
  title: string;
  cat: string;
  loc: string;
  year: string;
  tag: string;
  featured?: boolean;
}

export function Projects({ isLanding = false }: { isLanding?: boolean }) {
  const { t } = useLanguage();

  const allProjects: ProjectItem[] = useMemo(
    () => [
      {
        id: "proj-1",
        img: g1,
        title: t(
          "Granger ISS In-Ground Vault Installation",
          "Instalación de Refugio Subterráneo Granger ISS"
        ),
        cat: "In-Ground Shelters",
        loc: "Franklin, TN",
        year: "2024",
        tag: t("In-Ground Vault", "Refugio Subterráneo"),
        featured: true,
      },
      {
        id: "proj-2",
        img: g2,
        title: t(
          "Laser-Guided Grade & Compaction Backfill",
          "Nivelación Láser y Relleno Compactado"
        ),
        cat: "Excavation & Prep",
        loc: "Brentwood, TN",
        year: "2024",
        tag: t("Soil Compaction", "Compactación"),
        featured: false,
      },
      {
        id: "proj-3",
        img: g3,
        title: t(
          "Hydraulic Rock Excavation & Site Trenching",
          "Excavación Hidráulica en Roca y Zanjas"
        ),
        cat: "Excavation & Prep",
        loc: "Murfreesboro, TN",
        year: "2024",
        tag: t("Heavy Excavation", "Excavación Pesada"),
        featured: true,
      },
      {
        id: "proj-4",
        img: g4,
        title: t(
          "Emergency Top Escape Hatch & Gas Shock Struts",
          "Tapa de Escape Superior y Pistones de Gas"
        ),
        cat: "Safety Engineering",
        loc: "Spring Hill, TN",
        year: "2024",
        tag: t("Emergency Egress", "Escape de Emergencia"),
        featured: false,
      },
      {
        id: "proj-5",
        img: g5,
        title: t(
          "Double-Wall Polyethylene Molded Seating Vault",
          "Bóveda de Doble Pared con Asientos Moldeados"
        ),
        cat: "In-Ground Shelters",
        loc: "Hendersonville, TN",
        year: "2024",
        tag: t("Interior Comfort", "Interior Confortable"),
        featured: true,
      },
      {
        id: "proj-6",
        img: g6,
        title: t(
          "Multi-Point Security Locking Storm Door",
          "Puerta de Seguridad con Cierre Multipunto"
        ),
        cat: "Safety Engineering",
        loc: "Gallatin, TN",
        year: "2024",
        tag: t("FEMA 320/361 Door", "Puerta Certificada FEMA"),
        featured: false,
      },
      {
        id: "proj-7",
        img: g7,
        title: t(
          "Turnkey Yard Restoration & Clean Lawn Finish",
          "Restauración Llave en Mano y Acabado de Césped"
        ),
        cat: "Excavation & Prep",
        loc: "Mount Juliet, TN",
        year: "2024",
        tag: t("Clean Lawn Finish", "Acabado Impecable"),
        featured: false,
      },
      {
        id: "proj-8",
        img: g8,
        title: t(
          "In-Ground Storm Shelter with Articulating Handrails",
          "Refugio Subterráneo con Pasamanos Articulados"
        ),
        cat: "In-Ground Shelters",
        loc: "Columbia, TN",
        year: "2024",
        tag: t("Safe Entry", "Entrada Segura"),
        featured: true,
      },
      {
        id: "proj-9",
        img: g9,
        title: t(
          "Precision Crane Rigging Over Backyard Fencing",
          "Maniobra de Grúa de Precisión Sobre Cercas"
        ),
        cat: "Crane Installation",
        loc: "Nolensville, TN",
        year: "2024",
        tag: t("Crane Rigging", "Maniobra con Grúa"),
        featured: false,
      },
      {
        id: "proj-10",
        img: g10,
        title: t(
          "Single-Day Turnkey Crane Placement & Leveling",
          "Colocación y Nivelación con Grúa en un Solo Día"
        ),
        cat: "Crane Installation",
        loc: "Lebanon, TN",
        year: "2024",
        tag: t("Single-Day Placement", "Colocación en 1 Día"),
        featured: true,
      },
      {
        id: "proj-11",
        img: g11,
        title: t(
          "Heavy Track Crane Rigging & Placement Crew",
          "Personal Especializado y Grúa de Oruga"
        ),
        cat: "Crane Installation",
        loc: "Clarksville, TN",
        year: "2024",
        tag: t("Pro Crew", "Cuadrilla Especializada"),
        featured: false,
      },
      {
        id: "proj-12",
        img: g12,
        title: t(
          "Complete Residential Installation Ready for Storm Season",
          "Instalación Residencial Lista para Tormentas"
        ),
        cat: "In-Ground Shelters",
        loc: "Nashville, TN",
        year: "2024",
        tag: t("Storm Ready", "Listo para Tormentas"),
        featured: true,
      },
      {
        id: "proj-13",
        img: g13,
        title: t(
          "Heavy Structural Steel Engineered Storm Vault",
          "Bóveda de Acero Estructural de Alta Resistencia"
        ),
        cat: "Safety Engineering",
        loc: "Dickson, TN",
        year: "2024",
        tag: t("EF5 Armor", "Protección EF5"),
        featured: false,
      },
    ],
    [t]
  );

  const displayItems = useMemo(() => allProjects.slice(0, 8), [allProjects]);

  // Lightbox Modal state
  const [lightbox, setLightbox] = useState<null | ProjectItem>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number>(0);

  const openLightbox = useCallback((p: ProjectItem, idx: number) => {
    setLightbox(p);
    setLightboxIdx(idx);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const prevPhoto = useCallback(() => {
    if (displayItems.length === 0) return;
    const newIdx =
      (lightboxIdx - 1 + displayItems.length) % displayItems.length;
    setLightboxIdx(newIdx);
    setLightbox(displayItems[newIdx]);
  }, [lightboxIdx, displayItems]);

  const nextPhoto = useCallback(() => {
    if (displayItems.length === 0) return;
    const newIdx = (lightboxIdx + 1) % displayItems.length;
    setLightboxIdx(newIdx);
    setLightbox(displayItems[newIdx]);
  }, [lightboxIdx, displayItems]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox, prevPhoto, nextPhoto]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative bg-[#070b12] text-white py-[60px] overflow-hidden border-y border-white/10 isolate"
      style={{ paddingTop: "60px", paddingBottom: "60px" }}
    >
      {/* Specular Edge Hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Atmospheric Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-amber-500/[0.045] rounded-full blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[350px] bg-sky-500/[0.03] rounded-full blur-[120px]"
      />

      {/* Architectural Dot Matrix Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* ── Section Header ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10"
        >
          <div className="max-w-2xl">
            {/* Eyebrow Ribbon */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-300 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.12)]">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {t(
                  "Verified Jobsite Gallery",
                  "Galería de Obras Verificadas"
                )}
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-display tracking-tight text-white leading-tight drop-shadow-md text-[26px] sm:text-[32px] lg:text-[40px]"
              style={{
                marginTop: "-7px",
                marginBottom: "5px",
                fontWeight: 700,
              }}
            >
              {t("Engineered Installations Across ", "Instalaciones en ")}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                {t("Middle Tennessee", "Middle Tennessee")}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              {t(
                "Every project showcases laser grading, heavy crane placement, and clean yard restoration. Explore authentic photos from homes across Nashville, Franklin, Brentwood, and beyond.",
                "Cada proyecto muestra nivelación láser, grúa pesada y restauración limpia del césped. Vea fotos reales en Nashville, Franklin, Brentwood y más."
              )}
            </p>
          </div>

          {/* Header Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/free-quote"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
            >
              <span>
                {t("Request On-Site Estimate", "Solicitar Estimación")}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* ── Gallery Grid (2 Rows of 4 Images) ───────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
          {displayItems.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              onClick={() => openLightbox(p, idx)}
              className="group relative overflow-hidden rounded-2xl bg-[#0e1624] border border-white/10 hover:border-amber-400/50 shadow-md hover:shadow-[0_16px_36px_rgba(0,0,0,0.7),0_0_22px_rgba(245,158,11,0.18)] transition-all duration-500 cursor-zoom-in aspect-[4/3] w-full"
            >
              {/* Top Specular Rim Line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-amber-400/50 transition-colors pointer-events-none z-20" />

              {/* Main Photo */}
              <div className="overflow-hidden w-full h-full bg-slate-950">
                <img
                  src={p.img}
                  alt={p.title}
                  loading={idx < 4 ? "eager" : "lazy"}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Center Hover Zoom Icon Pill */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center pointer-events-none z-10">
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-amber-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-md">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Bottom Trust & Navigation Bar ───────────── */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-white">
                100% Genuine Jobsite Photos
              </span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>FEMA 320/361 Tested Specs</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <HardHat className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Own Equipment & Operators</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <Link
              to="/free-quote"
              className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-amber-400/40 text-white hover:text-amber-300 text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t("Free Estimate", "Cotización")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Fullscreen Lightbox Modal ─────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            {/* Dark Blur Backdrop */}
            <div className="absolute inset-0 bg-black/92 backdrop-blur-xl" />

            {/* Modal Dialog Card */}
            <motion.div
              className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.85)] border border-white/15 bg-[#0b1019]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:border-amber-400/60 transition hover:scale-110 cursor-pointer shadow-lg"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Prev Arrow */}
              <button
                onClick={prevPhoto}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:border-amber-400/60 transition hover:scale-110 cursor-pointer shadow-lg"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Next Arrow */}
              <button
                onClick={nextPhoto}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:border-amber-400/60 transition hover:scale-110 cursor-pointer shadow-lg"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Photo Index Counter */}
              <div className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {lightboxIdx + 1} / {displayItems.length}
                </span>
              </div>

              {/* Image Container (Pure Full Viewport Image) */}
              <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center min-h-[350px] p-2 sm:p-4">
                <img
                  src={lightbox.img}
                  alt={lightbox.title}
                  className="w-full h-full object-contain max-h-[82vh] rounded-xl select-none"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
