import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  Sparkles,
  Home,
  Building2,
  Users,
  Star,
  ArrowRight,
  FileCheck,
  HardHat,
  AlertTriangle,
  Search,
  Wrench,
  CheckSquare,
  Layers,
  HelpCircle,
  FileText,
  Download,
  ExternalLink,
  ChevronDown,
  Info,
  Shield,
  Factory,
  Boxes,
  Compass,
  Check,
  Eye,
  Tv,
  ThermometerSnowflake,
  Timer,
  Palette,
  Accessibility,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Counter } from "./Counter";
import { Button } from "@/components/ui/button";

// High-fidelity shelter & manufacturing assets
import grangerShelterUnit from "@/assets/granger-shelter-unit.jpg";
import grangerInstallImg from "@/assets/granger-install.jpg";
import grangerInsideShelter from "@/assets/granger-inside-shelter.jpg";
import grangerHatchExterior from "@/assets/granger-hatch-exterior.jpg";
import grangerDoorHatch from "@/assets/granger-door-hatch.jpg";
import grangerShelterYard from "@/assets/granger-shelter-yard.jpg";

export function AboutPageContent() {
  const { t } = useLanguage();

  // ── INDUSTRY-LEADING SAFETY FEATURES ──
  const safetyFeatures = [
    {
      icon: ShieldCheck,
      badge: "FEMA 320 & 361",
      title: t("Exceeds FEMA 320 & 361 Standards", "Supera las Normas FEMA 320 y 361"),
      desc: t(
        "Our multi-layer, rotationally molded door exceeds both FEMA 320 and FEMA 361 debris impact standards, tested against 250+ mph EF5 tornado vortex missiles.",
        "Nuestra puerta de moldeo rotacional multicapa supera los estándares de impacto de escombros FEMA 320 y FEMA 361, probada contra proyectiles de tornado EF5 de más de 250 mph."
      ),
      highlight: t("EF5 Missile Tested", "Probado contra Proyectiles EF5"),
    },
    {
      icon: Layers,
      badge: t("Patented Construction", "Construcción Patentada"),
      title: t("Double-Wall Foam-Filled Construction", "Construcción de Doble Pared Rellena de Espuma"),
      desc: t(
        "One of the only double-wall shelters in the industry. The body is foam-filled for unmatched rigidity, structural integrity, and to completely eliminate underground condensation issues.",
        "Uno de los únicos refugios de doble pared en la industria. El cuerpo está relleno de espuma para una rigidez incomparable y eliminar la condensación subterránea."
      ),
      highlight: t("Zero Condensation", "Cero Condensación"),
    },
    {
      icon: Clock,
      badge: "500+ Years",
      title: t("500+ Year Usable Lifespan", "500+ Años de Vida Útil"),
      desc: t(
        "Rotationally molded virgin polyethylene construction offers the longest usable lifespan of any tornado shelter on the market. It will never rust, rot, crack, or deteriorate in wet soil.",
        "La construcción de polietileno virgen moldeado rotacionalmente ofrece la vida útil más larga del mercado. Nunca se oxida, pudre, agrieta ni deteriora en suelo húmedo."
      ),
      highlight: t("Impervious to Moisture", "Inmune a la Humedad"),
    },
    {
      icon: Accessibility,
      badge: t("Family Accessibility", "Accesibilidad Familiar"),
      title: t("Articulating Handrails", "Pasamanos Articulados"),
      desc: t(
        "Designed for supreme safety and accessibility, our articulating handrails extend and lock firmly into place, making entry and exit smooth and secure for older or less mobile family members.",
        "Diseñados para máxima seguridad y accesibilidad, nuestros pasamanos articulados se extienden y fijan firmemente, facilitando el acceso a familiares mayores o con movilidad reducida."
      ),
      highlight: t("Safe Entry & Exit", "Entrada y Salida Segura"),
    },
    {
      icon: Lock,
      badge: t("Maximum Security", "Máxima Seguridad"),
      title: t("Heavy-Duty Three-Point Locking Door", "Puerta de Seguridad con Cierre de Tres Puntos"),
      desc: t(
        "A multi-bolt positive locking security door providing near-absolute protection against extreme vortex suction, flying debris, and severe atmospheric pressure drops.",
        "Una puerta de seguridad con cierre positivo de múltiples pernos que brinda protección casi absoluta contra succión de vórtice, escombros voladores y caídas de presión."
      ),
      highlight: t("Near-Absolute Protection", "Protección Casi Absoluta"),
    },
    {
      icon: Tv,
      badge: t("Nationally Trusted", "Confianza Nacional"),
      title: t("Trusted by The Weather Channel", "Tecnología Confiada por The Weather Channel"),
      desc: t(
        "Featured on national media and recognized across the weather safety industry as the gold standard in subterranean residential tornado shelters.",
        "Destacado en medios nacionales y reconocido en la industria de seguridad meteorológica como el estándar de oro en refugios residenciales subterráneos."
      ),
      highlight: t("The Weather Channel Featured", "Destacado en The Weather Channel"),
    },
  ];

  // ── INSTALLATION EXECUTION POINTS ──
  const executionPoints = [
    {
      title: t("3 to 4 Hour Rapid Placement", "Colocación Rápida de 3 a 4 Horas"),
      desc: t(
        "Because of the innovative reverse taper design, the Granger ISS is wildly simple to install compared to bulky concrete units—often taking as little as 3 to 4 hours once the project begins.",
        "Gracias al innovador diseño cónico invertido, el Granger ISS es sumamente sencillo de instalar en comparación con pesadas unidades de concreto, tomando tan solo de 3 a 4 horas."
      ),
      icon: Timer,
    },
    {
      title: t("Comprehensive Site & Soil Evaluation", "Evaluación Integral del Sitio y Suelo"),
      desc: t(
        "As construction experts with 5 years of local field experience, we evaluate soil conditions, slope drainage, property setbacks, and crane access before excavation begins.",
        "Como expertos en construcción con 5 años de experiencia de campo local, evaluamos el suelo, drenaje de pendientes, linderos y acceso de grúa antes de excavar."
      ),
      icon: Search,
    },
    {
      title: t("811 Underground Utility Coordination", "Coordinación de Servicios Subterráneos 811"),
      desc: t(
        "We coordinate complete utility markouts prior to digging, ensuring water, gas, power, and fiber lines are thoroughly mapped and protected.",
        "Coordinamos el marcado de servicios públicos antes de excavar, garantizando que tuberías de agua, gas, energía y fibra estén protegidas."
      ),
      icon: Wrench,
    },
    {
      title: t("Color-Coordinated Doors & Vents", "Puertas y Ventilaciones a Juego de Color"),
      desc: t(
        "We don't just drop a box in a hole; we integrate the shelter into your landscape with color-coordinated doors and vents that complement your home's aesthetic.",
        "No dejamos una caja en un agujero; integramos el refugio en su paisaje con puertas y ventilaciones en colores combinados que complementan su hogar."
      ),
      icon: Palette,
    },
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-[#0B0F15] overflow-hidden">

      {/* ── SECTION 1: WHERE WILL YOUR FAMILY GO? ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-amber-800">
                <HardHat className="w-4 h-4 text-amber-600" />
                {t("Engineered Underground Protection", "Protección Subterránea Diseñada")}
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-[#0B0F15] leading-[1.22]">
                {t("Built for Middle Tennessee Storm Seasons.", "Construido para las Temporadas de Tormentas en Middle Tennessee.")}{" "}
                <span className="text-amber-600">
                  {t("Precision Excavation & Installation.", "Excavación e Instalación de Precisión.")}
                </span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {t(
                  "Middle Tennessee weather demands serious, permanent underground protection. As a specialized construction and excavation firm, Southern Storm Shelters installs proven rotationally molded storm shelters engineered for extreme weather resilience.",
                  "El clima de Middle Tennessee exige una protección subterránea seria y permanente. Como empresa especializada en construcción y excavación, Southern Storm Shelters instala refugios moldeados por rotación probados y diseñados para resistir condiciones climáticas extremas."
                )}
              </p>

              <div className="p-6 rounded-2xl bg-slate-50 border-l-4 border-amber-600 border border-slate-200 shadow-sm space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-amber-800">
                  {t("Engineering Peace of Mind", "Ingeniería de Paz Mental")}
                </div>
                <p className="text-slate-800 text-base sm:text-lg font-bold leading-relaxed">
                  {t(
                    "At Southern Storm Shelters, we don’t just sell shelters; we engineer peace of mind. As a full-service construction company based in Nashville, TN, we specialize in installing the industry’s most advanced underground shelters—the Granger ISS—across a 100-mile radius.",
                    "En Southern Storm Shelters, no solo vendemos refugios; diseñamos tranquilidad. Como empresa de construcción integral en Nashville, TN, nos especializamos en instalar los refugios subterráneos más avanzados de la industria —el Granger ISS— en un radio de 100 millas."
                  )}
                </p>
                <div className="text-xs text-slate-500 font-semibold pt-1">
                  {t("Serving Nashville, Franklin, Murfreesboro, Brentwood, Clarksville & Middle TN", "Sirviendo a Nashville, Franklin, Murfreesboro, Brentwood, Clarksville y Middle TN")}
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-2xl font-black text-amber-600">100 mi</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {t("Service Radius", "Radio de Servicio")}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-2xl font-black text-amber-600">5+ Yrs</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {t("Construction Exp", "Exp en Construcción")}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-2xl font-black text-[#0B0F15]">3-4 Hrs</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {t("Rapid Placement", "Colocación Rápida")}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-2xl font-black text-[#0B0F15]">500+ Yr</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {t("Lifespan", "Vida Útil")}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={grangerInstallImg}
                  alt="Southern Storm Shelters Professional Installation"
                  className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B0F15]/90 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center gap-2 text-[#FBBF24] text-xs font-black uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    {t("Full-Service Construction Company", "Empresa de Construcción Integral")}
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-1">
                    Southern Storm Shelters LLC · Nashville, TN
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {t("Crane placement, site excavation & turnkey installation", "Colocación con grúa, excavación e instalación llave en mano")}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0B0F15] uppercase tracking-wider">
                    The Weather Channel
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {t("Featured Tornado Shelter Technology", "Tecnología Destacada en Medios")}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHY GRANGER ISS? THE DIFFERENCE IS IN THE DESIGN ── */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left Image Showcase */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 group">
                <img
                  src={grangerShelterUnit}
                  alt="Granger ISS Patented Reverse Taper Design"
                  className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left">
                <div className="flex items-center gap-2 text-amber-700 font-black text-xs uppercase tracking-wider">
                  <Shield className="w-4 h-4" />
                  {t("Patented Reverse Taper Design", "Diseño Cónico Invertido Patentado")}
                </div>
                <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-medium">
                  {t(
                    "The reverse taper acts as a natural earth anchor. Soil weight holds the unit down, eliminating expensive hold-down cables and guaranteeing the shelter will never float out of the ground.",
                    "El cono invertido actúa como anclaje natural de tierra. El peso del suelo sujeta la unidad, eliminando cables costosos y garantizando que nunca flote."
                  )}
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
                {t("Why Granger ISS?", "¿Por Qué Granger ISS?")}
              </span>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
                {t("The Difference is in the Design.", "La Diferencia Está en el Diseño.")}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {t(
                  "We chose to partner with Granger Plastics because they represent the gold standard in tornado safety. Unlike \"cookie-cutter\" knock-offs that can crack, rot, or float out of the ground, the Granger ISS features a patented reverse taper design.",
                  "Elegimos asociarnos con Granger Plastics porque representan el estándar de oro en seguridad contra tornados. A diferencia de imitaciones genéricas que pueden agrietarse, pudrirse o flotar fuera de la tierra, el Granger ISS cuenta con un diseño cónico invertido patentado."
                )}
              </p>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {t(
                  "This innovative engineering allows for installation virtually anywhere without the need for additional anchoring systems that drive up costs. It is the only single-family tornado shelter on the planet that offers a limited lifetime warranty against cracking, rusting, rotting, or floating out of the ground.",
                  "Esta ingeniería innovadora permite la instalación prácticamente en cualquier lugar sin necesidad de sistemas de anclaje adicionales que encarecen los costos. Es el único refugio para una sola familia en el planeta que ofrece una garantía limitada de por vida contra agrietamiento, oxidación, putrefacción o flotación fuera del suelo."
                )}
              </p>

              {/* Differentiators Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    {t("Will Never Float Out", "Nunca Flotará")}
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {t(
                      "Integrated earth anchor uses natural soil weight. No external cables that snap or corrode.",
                      "El anclaje integrado usa el peso natural del suelo. Sin cables externos que se rompan o corroan."
                    )}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    {t("Limited Lifetime Warranty", "Garantía Limitada de por Vida")}
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {t(
                      "Protected against cracking, rusting, rotting, or water ingress for generations.",
                      "Protegido contra agrietamiento, oxidación, putrefacción o filtración de agua por generaciones."
                    )}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: INDUSTRY-LEADING SAFETY FEATURES ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
              {t("Engineered Beyond Standards", "Diseñado Más Allá de las Normas")}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
              {t("Industry-Leading Safety Features", "Características de Seguridad Líderes")}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              {t(
                "When you install a Southern Storm Shelter, you are getting technology trusted by The Weather Channel and engineered to exceed the strictest standards in the nation.",
                "Al instalar un refugio de Southern Storm Shelters, obtiene tecnología respaldada por The Weather Channel y diseñada para superar los estándares más exigentes de la nación."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {safetyFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 group-hover:bg-amber-600 group-hover:text-white text-amber-700 flex items-center justify-center transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-black text-[#0B0F15] mb-3 leading-snug">
                      {feat.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs font-bold text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>{feat.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: EASIEST INSTALLATION & PROFESSIONAL EXECUTION ── */}
      <section className="py-16 sm:py-24 bg-[#0B0F15] text-white relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-600/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#FBBF24] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
                {t("Expert Execution", "Ejecución Experta")}
              </span>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-white tracking-tight leading-[1.22]">
                {t("Easiest Installation & Professional Execution", "Instalación Más Sencilla y Ejecución Profesional")}
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                {t(
                  "A shelter is only as good as its installation. Because of the innovative reverse taper design, the Granger ISS is wildly simple to install compared to other shelters—often taking as little as 3 to 4 hours once the project starts.",
                  "Un refugio es tan bueno como su instalación. Gracias al innovador diseño cónico invertido, el Granger ISS es sumamente sencillo de instalar en comparación con otros refugios, tomando tan solo de 3 a 4 horas una vez que comienza el proyecto."
                )}
              </p>

              <p className="text-slate-300 text-base leading-relaxed font-normal">
                {t(
                  "However, proper installation starts with understanding the property. As construction experts, we evaluate soil conditions, drainage, access, and buried utilities before excavation begins. We don’t just drop a box in a hole; we ensure your shelter is integrated into your property’s landscape, minimizing the industrial look by offering color-coordinated doors and vents to match your home.",
                  "Sin embargo, la instalación correcta comienza con el entendimiento del terreno. Como expertos en construcción, evaluamos las condiciones del suelo, drenaje, acceso y servicios públicos subterráneos antes de excavar. No dejamos caer una caja en un agujero; integramos el refugio en el paisaje de su propiedad, minimizando el aspecto industrial con puertas y ventilaciones combinadas con su hogar."
                )}
              </p>

              {/* Execution Points */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {executionPoints.map((pt, i) => {
                  const Icon = pt.icon;
                  return (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2"
                    >
                      <div className="flex items-center gap-2.5 text-[#FBBF24] font-black text-sm">
                        <Icon className="w-4 h-4 text-[#FBBF24] shrink-0" />
                        <span>{pt.title}</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed font-medium">
                        {pt.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900 group">
                <img
                  src={grangerShelterYard}
                  alt="Granger ISS storm shelter yard installation"
                  className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-left">
                <div className="text-xs font-black uppercase tracking-wider text-[#FBBF24]">
                  {t("Turnkey Crane Placement", "Colocación con Grúa Llave en Mano")}
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {t("Minimal Lawn Disruption", "Mínima Alteración del Jardín")}
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {t(
                    "Our professional rigging crew coordinates crane placement, earth excavation, anchoring, and precision backfill with total respect for your yard and landscaping.",
                    "Nuestro equipo profesional de montaje coordina grúa, excavación, anclaje y relleno con total respeto por su jardín y paisajismo."
                  )}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: SAFE, SECURE, AND ATTRACTIVE ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 group">
                <img
                  src={grangerHatchExterior}
                  alt="Safe, Secure, and Attractive Storm Shelter Integration"
                  className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left">
                <div className="text-xs font-black uppercase tracking-wider text-amber-700">
                  {t("Blends with Your Landscaping", "Combina con Su Paisajismo")}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  {t(
                    "Color-matched doors and low-profile ventilation hoods ensure your shelter looks like an intentional landscape feature rather than an industrial bunker.",
                    "Puertas combinadas en color y campanas de ventilación de bajo perfil aseguran que su refugio parezca un elemento de paisajismo en lugar de un búnker industrial."
                  )}
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
                {t("Architectural Integration", "Integración Arquitectónica")}
              </span>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
                {t("Safe, Secure, and Attractive", "Seguro, Protegido y Atractivo")}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {t(
                  "We believe safety shouldn’t be unsightly. Unlike most competing tornado shelters that look industrial and out of place, the Granger ISS allows you to coordinate doors and vents with your home or landscaping. You get the security of a bunker with the aesthetics of a quality home improvement.",
                  "Creemos que la seguridad no tiene por qué ser antiestética. A diferencia de la mayoría de los refugios de la competencia que lucen industriales y fuera de lugar, el Granger ISS le permite coordinar puertas y ventilaciones con su hogar o paisajismo. Obtiene la seguridad de un búnker con la estética de una mejora del hogar de calidad."
                )}
              </p>

              <div className="space-y-3 pt-2">
                {[
                  t("Custom color-coordinated entry doors to complement your siding or trim", "Puertas de entrada personalizadas en colores combinados con su hogar"),
                  t("Low-profile flush-mount lids that don't obstruct lawn mowers or yard views", "Tapas de perfil bajo que no obstruyen cortacéspedes ni vistas del patio"),
                  t("Clean interior with articulating safety handrails and ergonomic seating", "Interior limpio con pasamanos de seguridad articulados y asientos cómodos"),
                  t("Adds tangible resale value to your Tennessee property", "Añade valor de reventa tangible a su propiedad en Tennessee"),
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-800 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 6: OUR COMMITMENT TO TENNESSEE & CTA ── */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80 text-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
              {t("Our Commitment to Tennessee", "Nuestro Compromiso con Tennessee")}
            </span>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
              {t("Peace of Mind for Decades to Come", "Tranquilidad por Décadas")}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              {t(
                "From Nashville to Franklin, Murfreesboro, and beyond, Southern Storm Shelters is dedicated to providing peace of mind, providing peace of mind for decades to come.",
                "Desde Nashville hasta Franklin, Murfreesboro y más allá, Southern Storm Shelters se dedica a brindar tranquilidad, brindando tranquilidad por décadas."
              )}
            </p>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              {t(
                "We work with qualified installers and provide full installation guidance so homeowners understand exactly what to expect. When you choose us, you are choosing internationally recognized design, engineering, and a lifetime of safety.",
                "Trabajamos con instaladores calificados y brindamos orientación completa de instalación para que los propietarios comprendan exactamente qué esperar. Al elegirnos, elige diseño reconocido internacionalmente, ingeniería de vanguardia y una vida de seguridad."
              )}
            </p>

            <p className="text-xl sm:text-2xl font-black text-amber-700 pt-2">
              {t(
                "Engineered for generational protection. Built by Middle Tennessee craftsmen.",
                "Diseñado para una protección generacional. Construido por artesanos de Middle Tennessee."
              )}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/free-quote"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-slate-950 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-amber-600/20 transition-all active:scale-95 cursor-pointer"
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

          <div className="text-xs text-slate-400 font-semibold pt-4">
            {t(
              "Southern Storm Shelters LLC · Fully Insured Installation Crews · Nashville, TN",
              "Southern Storm Shelters LLC · Cuadrillas de Instalación Totalmente Aseguradas · Nashville, TN"
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
