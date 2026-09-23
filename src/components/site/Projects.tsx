import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Shield, HardHat, Building2, Home, X, ZoomIn, Camera, Star, Sparkles, Image as ImageIcon } from "lucide-react";
import { getGalleryPhotos, GalleryPhoto } from "@/lib/leads-store";
import { io } from "socket.io-client";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@tanstack/react-router";

export function Projects({ isLanding = false }: { isLanding?: boolean }) {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch photos dynamically from MongoDB via API & sync via Socket.IO
  useEffect(() => {
    let mounted = true;

    getGalleryPhotos().then((items) => {
      if (mounted) {
        setPhotos(items || []);
        setLoading(false);
      }
    });

    const socket = io({
      transports: ["websocket", "polling"],
      autoConnect: true
    });

    socket.on("gallery-updated", (updated: GalleryPhoto[]) => {
      if (mounted) setPhotos(updated || []);
    });

    socket.on("new-gallery-photo", (newPhoto: GalleryPhoto) => {
      if (mounted) {
        setPhotos((prev) => [newPhoto, ...prev.filter((p) => p.id !== newPhoto.id)]);
      }
    });

    socket.on("gallery-photo-deleted", (deletedId: string) => {
      if (mounted) {
        setPhotos((prev) => prev.filter((p) => p.id !== deletedId));
      }
    });

    return () => {
      mounted = false;
      socket.disconnect();
    };
  }, []);

  const all = useMemo(() => {
    return photos
      .filter((p) => p.url && !p.url.includes("unsplash.com") && !p.url.includes("localhost"))
      .map((p) => ({
        id: p.id,
        img: p.url,
        title: p.title || t("Engineered Shelter Installation", "Instalación de Refugio"),
        cat: p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1).toLowerCase() : "Underground",
        loc: p.location || "Nashville, TN",
        year: new Date(p.uploadedAt || Date.now()).getFullYear().toString(),
        tag: p.tag || "Underground Vault",
        featured: p.featured ?? true,
      }));
  }, [photos, t]);

  const [showAll, setShowAll] = useState<boolean>(false);
  const displayItems = isLanding && !showAll ? all.slice(0, 8) : all;

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
    if (displayItems.length === 0) return;
    const newIdx = (lightboxIdx - 1 + displayItems.length) % displayItems.length;
    setLightboxIdx(newIdx);
    setLightbox(displayItems[newIdx]);
  }, [lightboxIdx, displayItems]);

  const nextPhoto = useCallback(() => {
    if (displayItems.length === 0) return;
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
          backgroundImage: "radial-gradient(circle, #d97706 1px, transparent 1px)",
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
              <div className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-amber-700 mb-5 shadow-sm">
                <Camera className="w-3.5 h-3.5" />
                {t("Our Shelter Gallery", "Nuestra Galería de Refugios")}
              </div>

              <h2
                className="text-slate-900 tracking-tight leading-[1.1] font-black"
                style={{ fontSize: "38px", marginTop: "-8px", marginBottom: "10px" }}
              >
                {t("See Our Work — ", "Vea Nuestro Trabajo — ")}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] to-[#b45309]">
                  {t("Real Protection in Action.", "Protección Real en Acción.")}
                </span>
              </h2>
              <p className="text-slate-500 text-[15px] leading-relaxed font-normal max-w-xl">
                {t(
                  "Every installation represents a family safeguarded. Browse our recent underground storm shelter installations across Nashville and Middle Tennessee.",
                  "Cada instalación representa una familia protegida. Explore nuestras instalaciones recientes en Nashville y Middle Tennessee."
                )}
              </p>
            </div>

            <Link
              to="/free-quote"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-[11px] font-black uppercase tracking-widest rounded-full px-6 py-3.5 transition-all duration-300 shadow-lg hover:scale-[1.03] active:scale-[0.97] shrink-0 self-start lg:self-auto cursor-pointer"
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
              <div className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-amber-700 mb-4 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
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

        {/* ── Loading Skeleton ───────────────────────── */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-[4/3] bg-slate-200 rounded-2xl" />
            ))}
          </div>
        )}

        {/* ── Empty State ────────────────────────────── */}
        {!loading && displayItems.length === 0 && (
          <div className="text-center py-16 px-6 bg-white border border-slate-200/80 rounded-3xl max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">Live Cloudinary Gallery Connected</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto mb-6">
              New project installations uploaded through the Admin Dashboard sync directly with Cloudinary and will instantly display here in real time.
            </p>
            <Link
              to="/free-quote"
              className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-slate-800 transition cursor-pointer"
            >
              {t("Request Installation Consultation", "Solicitar Consulta")} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* ── Projects Grid ───────────────────────────── */}
        {!loading && displayItems.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key="gallery-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                isLanding
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              }
            >
              {displayItems.map((p, idx) => (
                <motion.article
                  key={p.id || idx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  onClick={() => openLightbox(p, idx)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-zoom-in",
                    isLanding ? "aspect-[4/3] w-full" : p.featured ? "sm:col-span-1 lg:row-span-2" : ""
                  )}
                >
                  {/* Image */}
                  <div
                    className={cn(
                      "overflow-hidden w-full h-full",
                      isLanding ? "h-full" : p.featured ? "h-[420px] lg:h-full lg:min-h-[520px]" : "h-[250px] sm:h-[270px]"
                    )}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                      loading={idx < 5 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center p-3">
                    <div className="flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 border border-white/40 text-amber-600 shadow-md backdrop-blur-xs">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-bold text-white drop-shadow-md truncate max-w-[90%]">
                        {p.title}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── View More Button ── */}
        {isLanding && all.length > 8 && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="group inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 hover:border-amber-500 text-xs sm:text-sm font-black uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{showAll ? t("Show Less", "Ver Menos") : t("View More", "Ver Más")}</span>
              <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-colors">
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
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition hover:scale-110 cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Prev / Next arrows */}
              {displayItems.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition hover:scale-110 cursor-pointer"
                    aria-label="Previous"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-14 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition hover:scale-110 cursor-pointer"
                    aria-label="Next"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Photo counter */}
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
                {lightboxIdx + 1} / {displayItems.length}
              </div>

              {/* Full image */}
              <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center min-h-[300px]">
                <img
                  src={lightbox.img}
                  alt={lightbox.title}
                  className="w-full h-full object-contain max-h-[75vh]"
                />
              </div>

              {/* Bottom bar with Info & CTA */}
              <div className="bg-white px-5 py-3.5 flex items-center justify-between shrink-0 border-t border-slate-100">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900">{lightbox.title}</span>
                  <span className="text-[10px] text-amber-700 font-medium">{lightbox.loc} · {lightbox.tag}</span>
                </div>
                <Link
                  to="/free-quote"
                  onClick={closeLightbox}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-2.5 rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-md cursor-pointer"
                >
                  {t("Get a Quote", "Solicitar Cotización")} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
