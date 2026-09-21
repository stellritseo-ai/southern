import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Shield,
  Award,
  CheckCircle2,
  Phone,
  ArrowRight,
  Clock,
  Layers,
  Wrench,
  Search,
  Lock,
  Timer,
  Palette,
  Accessibility,
  Footprints,
  Users,
  Compass,
  Check,
  AlertTriangle,
  HelpCircle,
  FileCheck,
  Info,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

// Real high-resolution Granger ISS assets
import grangerShelterUnit from "@/assets/granger-shelter-unit.jpg";
import grangerInstallImg from "@/assets/granger-install.jpg";
import grangerInsideShelter from "@/assets/granger-inside-shelter.jpg";
import grangerHatchExterior from "@/assets/granger-hatch-exterior.jpg";
import grangerDoorHatch from "@/assets/granger-door-hatch.jpg";
import grangerShelterYard from "@/assets/granger-shelter-yard.jpg";

export function InGroundPrefabShelterContent() {
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState<"green" | "gray" | "custom">("green");

  // ── THE GRANGER ISS ADVANTAGE ──
  const advantages = [
    {
      icon: Compass,
      badge: t("Patented Engineering", "Ingeniería Patentada"),
      title: t("Patented Reverse Taper Design", "Diseño Cónico Invertido Patentado"),
      desc: t(
        "The ISS is wider at the bottom than at the top. This unique configuration allows it to be installed directly into the ground without any additional anchoring systems. This means no messy concrete, no complicated installation, and a drastically reduced total cost of ownership.",
        "El ISS es más ancho en la base que en la parte superior. Esta configuración única permite instalarlo directamente en el suelo sin sistemas de anclaje adicionales. Sin concreto complicado y con menor costo total."
      ),
      highlight: t("Natural Earth Anchor", "Anclaje de Tierra Natural"),
    },
    {
      icon: Clock,
      badge: "500+ Years",
      title: t("500+ Year Lifespan", "500+ Años de Vida Útil"),
      desc: t(
        "Rotationally molded from durable virgin polyethylene, this shelter offers the longest usable lifespan of any tornado shelter on the market. It is impervious to moisture, acids, soil chemicals, and UV degradation.",
        "Moldeado rotacionalmente a partir de polietileno virgen duradero, ofrece la vida útil más larga de cualquier refugio del mercado. Es inmune a la humedad, ácidos del suelo y degradación UV."
      ),
      highlight: t("Zero Rust or Rot", "Cero Óxido o Putrefacción"),
    },
    {
      icon: ShieldCheck,
      badge: t("Lifetime Protection", "Protección de por Vida"),
      title: t("Guaranteed Not to Float", "Garantizado Contra Flotación"),
      desc: t(
        "Unlike less capable designs that pop out of saturated ground during heavy rains, the Granger ISS offers a limited lifetime warranty not to float out of the ground. When installed by our approved team, buoyancy issues are 100% eliminated.",
        "A diferencia de diseños inferiores que flotan en suelos saturados por lluvias intensas, el Granger ISS ofrece garantía limitada de por vida contra flotación al ser instalado por nuestro equipo."
      ),
      highlight: t("Buoyancy Proof", "A Prueba de Flotación"),
    },
    {
      icon: Layers,
      badge: t("Foam Insulation", "Aislamiento de Espuma"),
      title: t("Double-Wall Foam-Filled Construction", "Construcción de Doble Pared con Espuma"),
      desc: t(
        "One of the ONLY double-wall shelters in the industry. The body is foam-filled for unmatched rigidity, structural integrity, and to eliminate condensation issues, keeping the interior dry, comfortable, and clean.",
        "Uno de los ÚNICOS refugios de doble pared en la industria. El cuerpo está relleno de espuma para rigidez superior y eliminar por completo la condensación, manteniendo el interior seco."
      ),
      highlight: t("Condensation Free", "Sin Condensación"),
    },
  ];

  // ── INDUSTRY-LEADING SAFETY FEATURES ──
  const safetyFeatures = [
    {
      icon: Shield,
      badge: "250 MPH EF5",
      title: t("Triple Panel FEMA-Exceeding Door", "Puerta de Triple Panel que Supera FEMA"),
      desc: t(
        "Features a double-wall polyethylene exterior panel, a double-wall polyethylene interior panel, and a polycarbonate layer secured in between for maximum protection against flying debris at wind speeds of 250 MPH.",
        "Cuenta con panel exterior de polietileno de doble pared, panel interior de doble pared y una capa de policarbonato intermedia para máxima protección contra escombros voladores a 250 MPH."
      ),
    },
    {
      icon: Lock,
      badge: "FEMA & ICC 500",
      title: t("Triple Locking System", "Sistema de Bloqueo Triple"),
      desc: t(
        "In compliance with FEMA and ICC 500 specifications, the door offers a 3-point locking system that is easy to use, highly robust, and capable of being safely secured in seconds by any adult occupant.",
        "Cumpliendo con FEMA e ICC 500, la puerta ofrece un sistema de cierre de 3 puntos fácil de operar y que se asegura en segundos por cualquier ocupante."
      ),
    },
    {
      icon: Wrench,
      badge: t("Easy Operation", "Fácil Operación"),
      title: t("Dual Gas Assisted Shocks", "Amortiguadores Duales Asistidos por Gas"),
      desc: t(
        "Because the FEMA-rated door is built heavy for ballistic impact protection, each Granger ISS includes two gas-assisted shocks that make opening the door smooth, easy, and safe for all family members.",
        "Dado que la puerta clasificada por FEMA es pesada para protección balística, incluye dos amortiguadores de gas que facilitan su apertura de manera suave y segura."
      ),
    },
    {
      icon: Accessibility,
      badge: t("All-Age Safety", "Seguridad Todas las Edades"),
      title: t("Articulating Handrails", "Pasamanos Articulados"),
      desc: t(
        "Safety for all ages. The handrails extend and lock firmly into place for safe, assisted entry, then lower smoothly to a resting position once everyone is securely inside.",
        "Seguridad para todas las edades. Los pasamanos se extienden y fijan firmemente para una entrada segura y asistida, bajando a posición de descanso una vez adentro."
      ),
    },
    {
      icon: Footprints,
      badge: t("Seconds to Enter", "Segundos para Entrar"),
      title: t("Easy 3-Step Entrance", "Entrada Fácil de 3 Escalones"),
      desc: t(
        "A durable, molded 3-step entrance allows for rapid entry. In an impending tornado disaster, timing is paramount—entry into the Granger ISS only takes a matter of seconds.",
        "Una entrada moldeada y duradera de 3 escalones permite un acceso veloz. En una emergencia de tornado, el tiempo es vital: entrar toma cuestión de segundos."
      ),
    },
    {
      icon: Users,
      badge: "6+ Adults",
      title: t("Molded-In Seating", "Asientos Moldeados Integrados"),
      desc: t(
        "Exceeds FEMA requirements for 6 adults (though several more can safely fit in an emergency). Circular seating allows occupants to sit comfortably with generous headroom.",
        "Supera los requisitos de FEMA para 6 adultos (pueden caber más en emergencia). El asiento circular permite estar cómodo con amplio espacio superior."
      ),
    },
  ];

  // ── INSTALLATION WORKFLOW ──
  const installSteps = [
    {
      step: "01",
      title: t("Precision Excavation", "Excavación de Precisión"),
      desc: t("We excavate a clean, engineered pit to exact depth and grade specifications with minimal lawn disruption.", "Excavamos un foso limpio a la profundidad y nivel exactos con mínima alteración del jardín."),
    },
    {
      step: "02",
      title: t("Unit Placement", "Colocación de la Unidad"),
      desc: t("The prefabricated Granger ISS is lowered into position using professional crane and rigging equipment.", "Se baja la unidad prefabricada a su posición mediante equipo profesional de grúa y montaje."),
    },
    {
      step: "03",
      title: t("Precision Leveling", "Nivelación de Precisión"),
      desc: t("Our crew checks laser level on all four sides to ensure perfect drainage watershed and smooth door operation.", "Verificamos el nivel láser en los cuatro lados para garantizar drenaje óptimo y apertura suave de la puerta."),
    },
    {
      step: "04",
      title: t("Native Soil Backfill", "Relleno con Suelo Nativo"),
      desc: t("We backfill and compact using the excavated soil—the reverse taper design naturally locks it into place.", "Rellenamos y compactamos con la tierra excavada; el diseño cónico invertido la fija naturalmente."),
    },
  ];

  // ── SITE EVALUATION CHECKLIST ──
  const evaluationChecks = [
    {
      title: t("Soil Conditions", "Condiciones del Suelo"),
      desc: t("Ensuring stability, proper compaction density, and water drainage capacity.", "Garantizamos estabilidad, densidad de compactación y capacidad de drenaje."),
    },
    {
      title: t("Access & Utilities", "Acceso y Servicios"),
      desc: t("Locating 811 buried lines (gas, water, electric, fiber) and ensuring crane clearance.", "Ubicación de líneas 811 (gas, agua, luz, fibra) y espacio para la grúa."),
    },
    {
      title: t("Drainage & Watershed", "Drenaje y Escurrimiento"),
      desc: t("Elevating the collar slightly above grade to prevent stormwater pooling.", "Elevamos el marco sobre el nivel del suelo para evitar encharcamientos."),
    },
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-[#0B0F15] overflow-hidden">

      {/* ── SECTION 1: OVERVIEW & POSITIONING ── */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Copy */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-[#DC2626]">
                <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                {t("Technologically Advanced Underground Protection", "Protección Subterránea Tecnológicamente Avanzada")}
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-[#0B0F15] leading-[1.22]">
                {t("Near Absolute Protection.", "Protección Casi Absoluta.")}{" "}
                <span className="text-[#DC2626]">
                  {t("Installed by Construction Experts.", "Instalado por Expertos en Construcción.")}
                </span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {t(
                  "When severe weather strikes, you need a safe place that is ready in seconds. At Southern Storm Shelters, we specialize in the installation of the Granger ISS In-Ground Prefabricated Storm Shelter—the most technologically advanced underground tornado shelter on the market.",
                  "Cuando el clima severo golpea, necesita un lugar seguro listo en segundos. En Southern Storm Shelters, nos especializamos en la instalación del refugio subterráneo prefabricado Granger ISS: el refugio contra tornados más avanzado tecnológicamente del mercado."
                )}
              </p>

              <p className="text-slate-600 text-base leading-relaxed font-normal">
                {t(
                  "Unlike \"cookie-cutter\" knock-offs that can crack, rot, or float out of the ground, the Granger ISS is manufactured by an internationally recognized rotational molding leader and installed by our local Tennessee construction team. We combine world-class engineering with local expertise to provide your family with near absolute protection.",
                  "A diferencia de imitaciones genéricas que pueden agrietarse, pudrirse o flotar fuera de la tierra, el Granger ISS es fabricado por un líder internacional de moldeo rotacional e instalado por nuestro equipo local de construcción en Tennessee. Combinamos ingeniería de clase mundial con experiencia local."
                )}
              </p>

              {/* Trust Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="text-xl sm:text-2xl font-black text-[#DC2626]">FEMA</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    320 & 361 Exceeded
                  </div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="text-xl sm:text-2xl font-black text-[#DC2626]">500+ Yr</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {t("Lifespan", "Vida Útil")}
                  </div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="text-xl sm:text-2xl font-black text-[#0B0F15]">4 Hrs</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {t("Standard Install", "Instalación Estándar")}
                  </div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="text-xl sm:text-2xl font-black text-[#0B0F15]">100%</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {t("Float Proof", "Contra Flotación")}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={grangerShelterYard}
                  alt="Granger ISS in-ground storm shelter installed in backyard"
                  className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#0B0F15]/90 backdrop-blur-md border border-white/10 text-white text-left">
                  <div className="flex items-center gap-2 text-[#FBBF24] text-xs font-black uppercase tracking-wider">
                    <Shield className="w-4 h-4" />
                    {t("Granger ISS In-Ground Safety Shelter", "Refugio Subterráneo Granger ISS")}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-medium">
                    {t("Installed in backyard with minimal disruption. Ready in seconds.", "Instalado en patio con mínima alteración. Listo en segundos.")}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHY CHOOSE AN IN-GROUND PREFABRICATED SHELTER? ── */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
              {t("The Granger ISS Advantage", "La Ventaja del Granger ISS")}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
              {t("Why Choose an In-Ground Prefabricated Shelter?", "¿Por Qué Elegir un Refugio Subterráneo Prefabricado?")}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              {t(
                "The Granger ISS is not just a box buried in the ground; it is a precision-engineered safety device. Here is what sets it apart from all other underground shelters on the market.",
                "El Granger ISS no es solo una caja enterrada; es un dispositivo de seguridad con ingeniería de precisión. Esto es lo que lo diferencia de cualquier otro refugio subterráneo."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-[#DC2626] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#DC2626] bg-red-500/10 px-3 py-1 rounded-full">
                        {adv.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-black text-[#0B0F15] mb-2.5">
                      {adv.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {adv.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-[#DC2626]" />
                    <span>{adv.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: INDUSTRY-LEADING SAFETY FEATURES ── */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
              {t("FEMA 320 & FEMA 361 Exceeded", "Supera FEMA 320 y FEMA 361")}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
              {t("Industry-Leading Safety Features", "Características de Seguridad Líderes")}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              {t(
                "The Granger ISS exceeds FEMA 320 and FEMA 361 standards—the benchmarks for tornado and storm shelters. Every unit we install comes equipped with uncompromising safety hardware.",
                "El Granger ISS supera las normas FEMA 320 y FEMA 361: el estándar supremo para refugios contra tornados. Cada unidad cuenta con herrajes de seguridad sin concesiones."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:bg-white hover:border-red-500/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#DC2626] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#DC2626] bg-red-500/10 px-2.5 py-1 rounded-md">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-black text-[#0B0F15] mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Door Anatomy Banner */}
          <div className="mt-10 rounded-3xl bg-[#0B0F15] text-white p-6 sm:p-10 border border-slate-800 grid lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#DC2626]/20 text-[#FBBF24] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#DC2626]/30">
                <Sparkles className="w-3.5 h-3.5" />
                {t("Ballistic Impact Protection", "Protección contra Impacto Balístico")}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                {t("Triple Panel FEMA-Exceeding Door Technology", "Tecnología de Puerta de Triple Panel FEMA")}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t(
                  "The door is the most vulnerable part of any tornado shelter. Granger engineers created a proprietary composite sandwich: an outer polyethylene panel, an inner polyethylene panel, and a heavy-gauge polycarbonate core that absorbs missile impacts at 250 MPH.",
                  "La puerta es la parte más vulnerable de cualquier refugio. Los ingenieros de Granger crearon una estructura compuesta: panel exterior de polietileno, panel interior y núcleo de policarbonato que absorbe impactos a 250 MPH."
                )}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626]" />
                  <span>{t("Dual Gas Struts Included", "Amortiguadores Duales de Gas")}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626]" />
                  <span>{t("3-Point Positive Locking", "Cierre Positivo de 3 Puntos")}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-white/10 bg-slate-900 shadow-xl">
                <img
                  src={grangerDoorHatch}
                  alt="Granger ISS door hatch and locking mechanism"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THE EASIEST INSTALLATION AVAILABLE ── */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
              {t("4 Hours or Less", "4 Horas o Menos")}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
              {t("The Easiest Installation Available", "La Instalación Más Sencilla del Mercado")}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              {t(
                "A standard installation of the Granger ISS generally takes 4 hours or less. The procedure is straightforward: dig a hole, position the unit, ensure the shelter is level on all sides, and backfill with native soil.",
                "Una instalación estándar del Granger ISS generalmente toma 4 horas o menos: cavar un foso, posicionar la unidad, nivelar todos los lados y rellenar con tierra nativa."
              )}
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {installSteps.map((s, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm text-left relative overflow-hidden"
              >
                <div className="text-3xl font-black text-[#DC2626]/25 mb-2 font-display">
                  {s.step}
                </div>
                <h3 className="font-display text-base font-black text-[#0B0F15] mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Construction Evaluation Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md text-left">
            <div className="max-w-3xl mb-6">
              <div className="text-xs font-black uppercase tracking-wider text-[#DC2626] mb-1">
                {t("Full-Service Construction Company", "Empresa de Construcción Integral")}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black text-[#0B0F15]">
                {t("Proper Installation Starts with Understanding the Property", "La Instalación Correcta Comienza con el Terreno")}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {t(
                  "As a full-service construction company, Southern Storm Shelters does not cut corners. Before excavation begins, we thoroughly evaluate your site to ensure flawless performance for decades to come.",
                  "Como empresa de construcción integral, Southern Storm Shelters no escatima esfuerzos. Antes de excavar, evaluamos exhaustivamente su terreno para garantizar un desempeño impecable."
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 pt-2">
              {evaluationChecks.map((check, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-sm text-[#0B0F15] mb-1 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#DC2626]" />
                    <span>{check.title}</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">
                    {check.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-500 font-semibold">
              <span>{t("Flexible Placement: Outside existing homes, new construction builds, or retrofitted into designated areas.", "Ubicación Flexible: Fuera de casas existentes, nuevas construcciones o adaptado en áreas designadas.")}</span>
              <Link to="/free-quote" className="text-[#DC2626] hover:underline font-bold flex items-center gap-1">
                {t("Schedule Site Evaluation", "Programar Evaluación")} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: SAFE, SECURE, AND ATTRACTIVE (COLOR CUSTOMIZATION) ── */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Visual Customizer */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={
                    selectedColor === "green"
                      ? grangerHatchExterior
                      : selectedColor === "gray"
                      ? grangerShelterYard
                      : grangerShelterUnit
                  }
                  alt="Granger ISS customizable door and vent color"
                  className="w-full h-72 sm:h-80 object-cover object-center transition-all duration-500"
                />
              </div>

              {/* Color Selector Pills */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-left">
                <div className="text-xs font-bold text-slate-700">
                  {t("Select Color Option:", "Seleccione Color:")}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedColor("green")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      selectedColor === "green"
                        ? "bg-emerald-700 text-white shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    🌿 {t("Lawn Green", "Verde Césped")}
                  </button>
                  <button
                    onClick={() => setSelectedColor("gray")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      selectedColor === "gray"
                        ? "bg-slate-700 text-white shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    🔘 {t("Patio Gray", "Gris Patio")}
                  </button>
                  <button
                    onClick={() => setSelectedColor("custom")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      selectedColor === "custom"
                        ? "bg-[#0B0F15] text-white shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    🎨 {t("Custom Match", "Personalizado")}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Copy */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
                {t("Architectural Integration", "Integración Arquitectónica")}
              </span>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
                {t("Safe, Secure, and Attractive", "Seguro, Protegido y Atractivo")}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {t(
                  "We believe safety shouldn't be unsightly. Unlike most competing tornado shelters that look industrial and out of place, the Granger ISS allows you to customize the door and vent colors.",
                  "Creemos que la seguridad no debe ser antiestética. A diferencia de la mayoría de los refugios que lucen industriales y fuera de lugar, el Granger ISS le permite personalizar los colores de puertas y ventilación."
                )}
              </p>

              <p className="text-slate-600 text-base leading-relaxed font-normal">
                {t(
                  "Choose green to blend in with grass and landscaping, gray to blend in with a concrete floor, or match your home's exterior trim. You get the security of a bunker with the aesthetics of a quality home improvement.",
                  "Elija verde para combinar con el césped y paisajismo, gris para combinar con piso de concreto, o combine con la fachada de su casa. Obtiene la seguridad de un búnker con la estética de una mejora del hogar de calidad."
                )}
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>{t("Green: Blends seamlessly with lawn and backyard vegetation", "Verde: Se integra a la perfección con el césped y jardines")}</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626]" />
                  <span>{t("Gray: Blends with garage slabs, patios, and concrete walkways", "Gris: Combina con losas de garaje, patios y andenes")}</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626]" />
                  <span>{t("Custom: Matched to your siding, brickwork, or trim colors", "Personalizado: Coordinado con el color de su casa o molduras")}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 6: LIMITED LIFETIME WARRANTY ── */}
      <section className="py-14 sm:py-20 bg-[#0B0F15] text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-8 space-y-5 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#FBBF24] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
                {t("Unsurpassed Industry Warranty", "Garantía Insuperable en la Industria")}
              </span>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-white tracking-tight leading-[1.22]">
                {t("Limited Lifetime Warranty on Body & Door", "Garantía Limitada de por Vida en Cuerpo y Puerta")}
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                {t(
                  "The Granger ISS is the only single-family tornado shelter on the planet that offers a limited lifetime warranty on the body of the unit against cracking, rusting, rotting, or floating up out of the ground.",
                  "El Granger ISS es el único refugio para una sola familia en el planeta que ofrece garantía limitada de por vida en el cuerpo de la unidad contra agrietamiento, oxidación, putrefacción o flotación."
                )}
              </p>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-[#FBBF24]">
                  {t("Door Tornado Replacement Guarantee", "Garantía de Reemplazo de Puerta por Tornado")}
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {t(
                    "The door is also protected by a lifetime warranty. If your door is damaged in a verifiable tornado outbreak, Granger will work with your homeowner’s insurance to get the door replaced at no cost for the replacement door. That’s peace of mind, providing peace of mind for decades to come.",
                    "La puerta también está protegida de por vida. Si sufre daños en un tornado verificable, Granger trabajará con su seguro de hogar para reemplazarla sin costo por la puerta de reemplazo. Verdadera paz mental por décadas."
                  )}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-red-600/20 to-amber-600/10 border-2 border-[#DC2626]/40 text-center space-y-3 w-full max-w-sm shadow-2xl">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#DC2626] text-white flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8" />
                </div>
                <div className="font-display text-2xl font-black text-white">
                  {t("Lifetime Backed", "Respaldo de por Vida")}
                </div>
                <div className="text-xs text-slate-300 leading-relaxed font-medium">
                  {t("Crack Proof · Rust Proof · Rot Proof · Float Proof", "Antigrietas · Antioxidante · Antiputrefacción · Antiflotación")}
                </div>
                <div className="pt-2 text-[11px] text-[#FBBF24] font-black uppercase tracking-wider">
                  Granger Plastics Company · Middletown, OH
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 7: READY TO PROTECT YOUR FAMILY? (CTA) ── */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20">
            {t("Ready to Protect Your Family?", "¿Listo para Proteger a Su Familia?")}
          </span>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
            {t("Don’t Wait for the Warning Sirens.", "No Espere a las Sirenas de Advertencia.")}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {t(
              "The best and smartest thing you can do for yourself and your family is to be prepared. Contact Southern Storm Shelters today to schedule your site evaluation and request a free estimate.",
              "Lo mejor y más inteligente que puede hacer por usted y su familia es estar preparado. Póngase en contacto con Southern Storm Shelters hoy mismo para programar su evaluación de terreno y solicitar una estimación gratuita."
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Link
              to="/free-quote"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>{t("Request a Free Estimate", "Solicitar Estimación Gratuita")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:6159912361"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B0F15] hover:bg-black text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer border border-white/10"
            >
              <Phone className="w-4 h-4 text-[#FBBF24]" />
              <span>{t("Call (615) 991-2361", "Llamar (615) 991-2361")}</span>
            </a>
          </div>

          <div className="text-xs text-slate-500 font-semibold pt-3">
            {t(
              "Serving Nashville, Franklin, Murfreesboro, and surrounding areas within a 100-mile radius.",
              "Sirviendo a Nashville, Franklin, Murfreesboro y áreas circundantes dentro de un radio de 100 millas."
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
