import { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

// All 21 authentic gallery assets from assets/gallery/
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
import gGrangerPrepared from "@/assets/gallery/GrangerISSforPreparedSpared-e1741714349365.jpg";
import gImg0118 from "@/assets/gallery/IMG_0118-scaled-r4ebojreuj48ftcjj6kje1k3ffiqpa38l623yhkuf4.jpg";
import gImg0137 from "@/assets/gallery/IMG_0137-scaled-r4ebojrkbvjcrsnwjnowdzrmtrncu4qwzlzsen983c.jpg";
import gImg0181 from "@/assets/gallery/IMG_0181-scaled-r4ebojreuj4io40op7wrnlh3mcquc82tvwt0yyubk0.jpg";
import gInsideShelter from "@/assets/gallery/InsideofShelter-scaled-r4ebojreuj4ns9cra8kvsdflptcw5p2mja6hh7h24g.jpg";
import gProInstall from "@/assets/gallery/Professional Installation.jpg";
import gTimelapseGif from "@/assets/gallery/ezgif.com-speed.gif";
import gShelter5 from "@/assets/gallery/shelter5.jpg";
import gShelterInstall from "@/assets/gallery/shelterinstall.jpg";
import gTornadoShelters6 from "@/assets/gallery/tornadoshelters6.jpg";

export function GalleryPageContent() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const galleryItems = [
    {
      img: g1,
      title: t("Granger ISS In-Ground Installation", "Instalación Subterránea Granger ISS"),
      category: "placement",
      location: "Franklin, TN",
      tag: t("In-Ground Shelter", "Refugio Subterráneo"),
      desc: t("Turnkey underground installation showing open hatch, articulating safety handrails, and clean yard finish.", "Instalación subterránea llave en mano con escotilla abierta, pasamanos de seguridad y acabado impecable."),
    },
    {
      img: g2,
      title: t("Precision Crane Excavation & Setting", "Excavación y Colocación con Grúa de Precisión"),
      category: "equipment",
      location: "Nashville, TN",
      tag: t("Crane Placement", "Colocación con Grúa"),
      desc: t("Heavy equipment placement lowering the rotomolded body into the laser-leveled excavation pit.", "Colocación con equipo pesado bajando el cuerpo rotomoldeado en el pozo nivelado con láser."),
    },
    {
      img: g3,
      title: t("FEMA Multi-Point Security Door", "Puerta de Seguridad Multipunto FEMA"),
      category: "doors",
      location: "Murfreesboro, TN",
      tag: t("Security Door", "Puerta de Seguridad"),
      desc: t("Triple-panel reinforced door tested against 250 MPH EF5 missile impacts with dual gas-assist struts.", "Puerta reforzada de triple panel probada contra impactos de proyectiles EF5 a 250 MPH con amortiguadores a gas."),
    },
    {
      img: g4,
      title: t("Molded Circular Seating & Interior Chamber", "Asientos Circulares Moldeados y Cámara Interior"),
      category: "interior",
      location: "Brentwood, TN",
      tag: t("Interior Vault", "Bóveda Interior"),
      desc: t("Double-wall foam-filled construction eliminating condensation, with built-in seating for 6+ adults.", "Estructura de doble pared con espuma que elimina la condensación, con asientos integrados para más de 6 adultos."),
    },
    {
      img: g5,
      title: t("Site Excavation & Grade Alignment", "Excavación del Terreno y Alineación de Pendiente"),
      category: "placement",
      location: "Spring Hill, TN",
      tag: t("Excavation", "Excavación"),
      desc: t("Careful excavation respecting property lines, buried utilities (811), and natural lawn slope.", "Excavación cuidadosa respetando límites de propiedad, servicios subterráneos (811) y pendiente natural."),
    },
    {
      img: g6,
      title: t("In-Ground Prefabricated Vault Placement", "Colocación de Bóveda Prefabricada Subterránea"),
      category: "placement",
      location: "Hendersonville, TN",
      tag: t("Underground Vault", "Bóveda Subterránea"),
      desc: t("Patented reverse taper design anchored naturally into native Middle Tennessee soil without concrete.", "Diseño cónico inverso patentado anclado naturalmente al suelo de Middle Tennessee sin concreto."),
    },
    {
      img: g7,
      title: t("Granger ISS Reverse Taper Unit Profile", "Perfil de Unidad Cónica Inversa Granger ISS"),
      category: "equipment",
      location: "Columbia, TN",
      tag: t("Engineering", "Ingeniería"),
      desc: t("Full exterior unit displaying the wide base that acts as an integrated earth anchor against buoyancy.", "Unidad exterior completa mostrando la base ancha que actúa como ancla natural de tierra contra la flotación."),
    },
    {
      img: g8,
      title: t("Articulating Handrail & Safety Steps", "Pasamanos Articulado y Escalones de Seguridad"),
      category: "interior",
      location: "Gallatin, TN",
      tag: t("Accessibility", "Accesibilidad"),
      desc: t("Assisted entry system designed for easy, rapid access for children, elderly parents, and mobility-impaired.", "Sistema de entrada asistida diseñado para acceso fácil y rápido de niños, adultos mayores y personas con movilidad reducida."),
    },
    {
      img: g9,
      title: t("Double-Wall Structural Foam Wall Cutaway", "Corte de Pared Estructural de Doble Capa con Espuma"),
      category: "interior",
      location: "Mount Juliet, TN",
      tag: t("Insulation", "Aislamiento"),
      desc: t("Virgin polyethylene double wall filled with dense structural foam for 500+ year durability and zero condensation.", "Doble pared de polietileno virgen relleno de espuma estructural para durabilidad de más de 500 años sin condensación."),
    },
    {
      img: g10,
      title: t("Custom Architectural Door & Trim Match", "Combinación Arquitectónica de Puerta y Molduras"),
      category: "doors",
      location: "Nolensville, TN",
      tag: t("Custom Color", "Color Personalizado"),
      desc: t("Door customized to match home siding and patio pavers, proving safety can be attractive.", "Puerta personalizada para combinar con el revestimiento de la casa y el patio, demostrando que la seguridad puede ser atractiva."),
    },
    {
      img: g12,
      title: t("Seamless Backyard Lawn Integration", "Integración Impecable en el Césped del Patio"),
      category: "doors",
      location: "Lebanon, TN",
      tag: t("Lawn Integration", "Integración con Césped"),
      desc: t("Completed installation backfilled with native soil and graded smoothly for immediate lawn use.", "Instalación completada rellenada con suelo nativo y nivelada suavemente para el uso inmediato del jardín."),
    },
    {
      img: gGrangerPrepared,
      title: t("Granger ISS: Prepared & Spared Official Unit", "Granger ISS: Unidad Oficial Prepared & Spared"),
      category: "equipment",
      location: "Middle Tennessee",
      tag: t("Official Unit", "Unidad Oficial"),
      desc: t("Manufactured by Granger Plastics Company with over 30 years of rotational molding excellence.", "Fabricado por Granger Plastics Company con más de 30 años de excelencia en moldeo rotacional."),
    },
    {
      img: gImg0118,
      title: t("On-Site Laser Leveling & Backfill", "Nivelación Láser y Relleno en el Sitio"),
      category: "placement",
      location: "Franklin, TN",
      tag: t("Laser Precision", "Precisión Láser"),
      desc: t("Verifying level tolerance with high-precision lasers before compacting native soil backfill.", "Verificación de tolerancia de nivel con láseres de alta precisión antes de compactar el relleno."),
    },
    {
      img: gImg0137,
      title: t("Finished In-Ground Installation with Green Door", "Instalación Subterránea Terminada con Puerta Verde"),
      category: "doors",
      location: "Nashville, TN",
      tag: t("Green Door", "Puerta Verde"),
      desc: t("Lawn Green door blends seamlessly into the grass, keeping your backyard aesthetic completely intact.", "La puerta color verde césped se camufla perfectamente, manteniendo la estética de su patio totalmente intacta."),
    },
    {
      img: gImg0181,
      title: t("Post-Installation Final Grading", "Nivelación Final Posterior a la Instalación"),
      category: "placement",
      location: "Murfreesboro, TN",
      tag: t("Final Grade", "Nivelación Final"),
      desc: t("Clean, tidy jobsite with minimal turf disturbance, ready for grass re-seeding or sod.", "Zona de trabajo limpia y ordenada con mínima perturbación del césped, lista para resembrar o colocar césped."),
    },
    {
      img: gInsideShelter,
      title: t("Spacious Underground Shelter Interior", "Interior Espacioso del Refugio Subterráneo"),
      category: "interior",
      location: "Brentwood, TN",
      tag: t("Ample Headroom", "Amplio Espacio"),
      desc: t("Generous headroom and molded-in circular seating allowing 6+ occupants to comfortably ride out storms.", "Amplio espacio superior y asientos circulares moldeados que permiten a más de 6 ocupantes esperar la tormenta con comodidad."),
    },
    {
      img: gProInstall,
      title: t("Professional Turnkey Construction Crew", "Equipo de Construcción Profesional Llave en Mano"),
      category: "equipment",
      location: "Nashville, TN",
      tag: t("Pro Crew", "Equipo Profesional"),
      desc: t("Southern Storm Shelters operates our own heavy equipment, cranes, and certified installation specialists.", "Southern Storm Shelters opera su propia maquinaria pesada, grúas y especialistas certificados en instalación."),
    },
    {
      img: gTimelapseGif,
      title: t("4-Hour Complete Installation Process", "Proceso Completo de Instalación en 4 Horas"),
      category: "placement",
      location: "Middle Tennessee",
      tag: t("Fast Turnkey", "Rápido Llave en Mano"),
      desc: t("From morning excavation to afternoon walkthrough—complete installation takes 4 hours or less.", "Desde la excavación matutina hasta la entrega por la tarde: la instalación completa toma 4 horas o menos."),
    },
    {
      img: gShelter5,
      title: t("Rotomolded Polyethylene Vault Body", "Cuerpo de Bóveda de Polietileno Rotomoldeado"),
      category: "equipment",
      location: "Franklin, TN",
      tag: t("Seamless Shell", "Estructura Sin Costuras"),
      desc: t("Single-piece seamless rotationally molded polyethylene shell that will never rot, rust, or crack.", "Carcasa de polietileno rotomoldeado de una sola pieza sin costuras que nunca se pudrirá, oxidará ni agrietará."),
    },
    {
      img: gShelterInstall,
      title: t("Precision Crane Lowering into Pit", "Descenso con Grúa de Precisión al Pozo"),
      category: "equipment",
      location: "Spring Hill, TN",
      tag: t("Crane Rigging", "Maniobra con Grúa"),
      desc: t("Professional crane rigging ensuring zero stress on yard structures during lowering.", "Maniobra profesional con grúa que garantiza cero impacto en las estructuras del patio durante el descenso."),
    },
    {
      img: gTornadoShelters6,
      title: t("Pre-Installation Delivery & Quality Inspection", "Entrega e Inspección de Calidad Previa"),
      category: "equipment",
      location: "Nashville, TN",
      tag: t("Quality Check", "Control de Calidad"),
      desc: t("Factory-sealed unit arrives directly from the Granger Plastics Company facility ready for placement.", "La unidad sellada de fábrica llega directamente de Granger Plastics Company lista para su colocación."),
    },
  ];

  const categories = [
    { id: "all", label: t("All Photos (21)", "Todas las Fotos (21)") },
    { id: "placement", label: t("In-Ground Placement", "Colocación Subterránea") },
    { id: "interior", label: t("Shelter Interiors", "Interiores de Refugios") },
    { id: "doors", label: t("Custom Doors & Yards", "Puertas y Patios") },
    { id: "equipment", label: t("Construction & Equipment", "Construcción y Maquinaria") },
  ];

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  }, [selectedImageIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (selectedImageIndex !== null) {
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
    <div className="bg-white text-slate-900 overflow-hidden selection:bg-red-600 selection:text-white">

      {/* ── SECTION 1: KEY TECHNICAL HIGHLIGHTS BANNER ─────────────────── */}
      <section className="relative py-8 bg-slate-900 text-white border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">4 Hours</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">{t("Turnkey Installation", "Instalación Llave en Mano")}</div>
            </div>
            <div className="p-3 border-l border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">500+ Yrs</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">{t("Polyethylene Lifespan", "Vida Útil del Polietileno")}</div>
            </div>
            <div className="p-3 border-l border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">{t("Guaranteed Not to Float", "Garantizado Que No Flota")}</div>
            </div>
            <div className="p-3 border-l border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">100 Miles</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">{t("Service Radius Across TN", "Radio de Servicio en TN")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: GALLERY CATEGORY FILTER & GRID ───────────────────── */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-widest mb-3">
              <Camera className="w-3.5 h-3.5 text-red-600" />
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

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={item.title}
                  onClick={() => openLightbox(idx)}
                  className="group rounded-3xl bg-slate-900 border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-red-500/40 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn className="w-5 h-5 text-red-600" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 3: READY TO PROTECT YOUR FAMILY CTA ─────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-3xl bg-gradient-to-r from-red-600 via-red-600 to-amber-600 text-white p-8 sm:p-14 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            <div aria-hidden className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              {t("Ready to See a Shelter on Your Property?", "¿Listo Para Instalar un Refugio en Su Terreno?")}
            </h2>

            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
              {t(
                "Don't wait for the warning sirens. We evaluate your soil conditions, slope, drainage, and equipment access to deliver an upfront, itemized quote within 24 hours.",
                "No espere a que suenen las sirenas. Evaluamos el suelo, pendiente, drenaje y acceso de maquinaria para brindarle un presupuesto detallado en 24 horas."
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/free-quote"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-extrabold px-8 py-4 rounded-2xl shadow-xl transition text-sm sm:text-base"
              >
                <span>{t("Request a Free Estimate", "Solicitar Estimación Gratis")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <a
                href="tel:6159912381"
                className="inline-flex items-center gap-2 bg-slate-950/80 hover:bg-slate-950 text-white font-extrabold px-8 py-4 rounded-2xl border border-white/20 transition text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                <span>(615) 991-2381</span>
              </a>
            </div>

            <blockquote className="mt-8 border-t border-white/20 pt-4 text-xs font-semibold italic text-white/80">
              {t(
                '"That\'s peace of mind, providing peace of mind for decades to come."',
                '"Eso es tranquilidad, brindando tranquilidad para las próximas décadas."'
              )}
            </blockquote>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: CONTACT INFORMATION SUMMARY ─────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12 shadow-md max-w-4xl mx-auto">
            
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-red-700 bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
                {t("Contact Information Summary", "Resumen de Contacto")}
              </span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Southern Storm Shelters
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
                {t("A Middle Tennessee Construction Company", "Empresa de Construcción de Middle Tennessee")}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-500 w-1/3 sm:w-1/4">{t("Phone", "Teléfono")}</td>
                    <td className="p-4 font-extrabold text-slate-900">
                      <a href="tel:6159912381" className="text-red-600 hover:underline">
                        (615) 991-2381
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-500">{t("Email", "Correo Electrónico")}</td>
                    <td className="p-4 font-semibold text-slate-900">
                      <a href="mailto:admin@nashvillesiteworks.com" className="text-red-600 hover:underline">
                        admin@nashvillesiteworks.com
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-500">{t("Address", "Dirección")}</td>
                    <td className="p-4 font-semibold text-slate-900">
                      2000 Meridian Blvd, Suite 200, Franklin, TN 37067
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-500">{t("Hours", "Horario")}</td>
                    <td className="p-4 font-semibold text-slate-900">
                      {t(
                        "Monday–Friday: 8:00 AM – 5:00 PM | Saturday: By Appointment | Sunday: Closed",
                        "Lunes a Viernes: 8:00 AM – 5:00 PM | Sábado: Con Cita | Domingo: Cerrado"
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-500">{t("Service Area", "Área de Servicio")}</td>
                    <td className="p-4 font-semibold text-slate-900">
                      {t(
                        "Nashville, Franklin, Murfreesboro, and surrounding areas within a 100-mile radius",
                        "Nashville, Franklin, Murfreesboro y áreas circundantes dentro de un radio de 100 millas"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ─────────────────────────────────────────────── */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md">
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 sm:right-2 text-white hover:text-red-400 transition p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={showPrev}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-red-600 transition cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={showNext}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-red-600 transition cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl max-h-[85vh] flex items-center justify-center">
              <img
                src={filteredItems[selectedImageIndex].img}
                alt={filteredItems[selectedImageIndex].title}
                className="max-h-[85vh] w-auto max-w-full object-contain"
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
