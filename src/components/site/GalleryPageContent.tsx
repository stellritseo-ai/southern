import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Shield,
  HardHat,
  X,
  ZoomIn,
  Camera,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Award,
  Compass,
  Phone,
  Layers,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/config/site-config";
import { getGalleryPhotos, GalleryPhoto } from "@/lib/leads-store";
import { io } from "socket.io-client";

export function GalleryPageContent() {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Dynamic real-time fetch from MongoDB & Socket.io
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
      autoConnect: true,
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

  const filteredItems = useMemo(() => {
    return photos
      .filter((p) => p.url && !p.url.includes("unsplash.com") && !p.url.includes("localhost"))
      .map((p) => ({
        id: p.id,
        img: p.url,
        title: p.title || t("Engineered Shelter Installation", "Instalación de Refugio Subterráneo"),
        category: p.category ? p.category.toLowerCase() : "residential",
        location: p.location || "Nashville, TN",
        tag: p.tag || "Underground Vault",
        desc: p.title
          ? `${p.title} completed in ${p.location || "Nashville, TN"}. Engineered underground protection.`
          : t(
              "Engineered storm shelter installation built to FEMA standards.",
              "Instalación de refugio subterráneo construida según estándares FEMA."
            ),
      }));
  }, [photos, t]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showNext = useCallback(() => {
    if (selectedImageIndex !== null && filteredItems.length > 0) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  }, [selectedImageIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (selectedImageIndex !== null && filteredItems.length > 0) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [selectedImageIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, showNext, showPrev]);

  return (
    <div className="bg-white text-slate-900 overflow-hidden selection:bg-amber-600 selection:text-white">
      {/* ── SECTION 1: KEY TECHNICAL HIGHLIGHTS BANNER ─────────────────── */}
      <section className="relative py-8 bg-slate-900 text-white border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">4 Hours</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">
                {t("Turnkey Installation", "Instalación Llave en Mano")}
              </div>
            </div>
            <div className="p-3 border-l border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">500+ Yrs</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">
                {t("Polyethylene Lifespan", "Vida Útil del Polietileno")}
              </div>
            </div>
            <div className="p-3 border-l border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">
                {t("Guaranteed Not to Float", "Garantizado Que No Flota")}
              </div>
            </div>
            <div className="p-3 border-l border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">100 Miles</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">
                {t("Service Radius Across TN", "Radio de Servicio en TN")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: GALLERY CATEGORY FILTER & GRID ───────────────────── */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-3">
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>{t("Verified Project Portfolio", "Portafolio de Proyectos Verificados")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("Real Installations. Real Protection.", "Instalaciones Reales. Protección Real.")}
            </h2>

            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {t(
                "Browse authentic jobsite photos showing our turnkey installations, precision crane placements, custom color doors, and comfortable interiors across Middle Tennessee.",
                "Explore fotos auténticas de nuestras instalaciones llave en mano, descensos con grúa, puertas de color personalizado e interiores confortables en Middle Tennessee."
              )}
            </p>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-4/3 rounded-3xl bg-slate-100 border border-slate-200" />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <div className="text-center py-20 px-6 bg-slate-50 border border-slate-200/80 rounded-3xl max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Live Cloudinary Gallery Connected</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto mb-6">
                No photos in this category yet. Upload new high-resolution installation photos in the Admin Dashboard to sync them automatically here.
              </p>
              <Link
                to="/free-quote"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-full transition cursor-pointer shadow-md"
              >
                {t("Request a Free Estimate", "Solicitar Estimación Gratis")} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && filteredItems.length > 0 && (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredItems.map((item, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    key={item.id || idx}
                    onClick={() => openLightbox(idx)}
                    className="group rounded-3xl bg-slate-900 border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                      <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <div className="flex flex-col items-center justify-center gap-2 text-center">
                          <div className="w-12 h-12 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                            <ZoomIn className="w-5 h-5 text-amber-600" />
                          </div>
                          <span className="text-xs font-bold text-white drop-shadow-md">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-amber-300 font-medium">
                            {item.location} · {item.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── SECTION 3: READY TO PROTECT YOUR FAMILY CTA ─────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-14 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden border border-amber-500/30">
            <div
              aria-hidden
              className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
            />

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              {t(
                "Ready to See an Engineered Shelter on Your Property?",
                "¿Listo Para Instalar un Refugio en Su Terreno?"
              )}
            </h2>

            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
              {t(
                "Precision underground shelter construction. We evaluate your soil conditions, slope, drainage, and equipment access to deliver an upfront, itemized proposal.",
                "Construcción subterránea de precisión. Evaluamos el suelo, pendiente, drenaje y acceso de maquinaria para brindarle un presupuesto detallado."
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-quote"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl shadow-xl transition text-sm sm:text-base cursor-pointer"
              >
                <span>{t("Request a Free Estimate", "Solicitar Estimación Gratis")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-2xl transition text-sm sm:text-base cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[92vh]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-slate-950 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Buttons */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-950/70 text-white hover:bg-slate-950 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-950/70 text-white hover:bg-slate-950 transition cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Container */}
              <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center min-h-[350px]">
                <img
                  src={filteredItems[selectedImageIndex].img}
                  alt={filteredItems[selectedImageIndex].title}
                  className="max-h-[68vh] w-full object-contain"
                />
              </div>

              {/* Image Details Bar */}
              <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                    {filteredItems[selectedImageIndex].tag}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {filteredItems[selectedImageIndex].title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{filteredItems[selectedImageIndex].location}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-500 font-mono">
                    {selectedImageIndex + 1} / {filteredItems.length}
                  </span>
                  <Link
                    to="/free-quote"
                    onClick={closeLightbox}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-sm"
                  >
                    {t("Request Estimate", "Solicitar Estimación")}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
