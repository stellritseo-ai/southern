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
  Building2,
  Home,
  Lightbulb,
  CheckSquare,
  Droplets,
  HardHat,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

// Real high-resolution Granger ISS assets
import grangerShelterUnit from "@/assets/granger-shelter-unit.jpg";
import grangerInstallImg from "@/assets/granger-install.jpg";
import grangerInsideShelter from "@/assets/granger-inside-shelter.jpg";
import grangerHatchExterior from "@/assets/granger-hatch-exterior.jpg";
import grangerDoorHatch from "@/assets/granger-door-hatch.jpg";
import grangerShelterYard from "@/assets/granger-shelter-yard.jpg";

export function CustomBuiltShelterContent() {
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState<"green" | "gray" | "custom">("green");

  // ── 5 PILLARS OF CUSTOM BUILT ──
  const customPillars = [
    {
      num: "01",
      title: t("Custom Site Evaluation & Engineering", "Evaluación y Diseño de Sitio Personalizado"),
      desc: t(
        "Proper installation starts with understanding the property. Before any excavation begins, we analyze soil conditions, slope drainage, water table depth, equipment access, and buried utilities. We don't guess—we engineer solutions tailored to your Tennessee property.",
        "La instalación adecuada comienza con entender el terreno. Analizamos la estabilidad del suelo, drenaje, nivel freático, acceso y servicios subterráneos para diseñar soluciones a la medida de su propiedad."
      ),
      icon: Search,
      tags: [t("Soil Stability", "Estabilidad del Suelo"), t("Drainage", "Drenaje"), t("811 Utilities", "Servicios 811")],
    },
    {
      num: "02",
      title: t("Custom Color & Aesthetic Options", "Opciones de Color y Estética Personalizadas"),
      desc: t(
        "Unlike industrial-looking bunkers that stand out like an eyesore, our custom shelters offer color-coordinated doors and vents. Choose Lawn Green to blend with vegetation, Patio Gray to match concrete, or custom architectural tones to match your home's trim.",
        "A diferencia de búnkeres industriales antiestéticos, ofrecemos puertas y ventilaciones combinadas en color: Verde Césped, Gris Patio o tonos personalizados a juego con su casa."
      ),
      icon: Palette,
      tags: [t("Lawn Green", "Verde Césped"), t("Patio Gray", "Gris Patio"), t("Custom Match", "Personalizado")],
    },
    {
      num: "03",
      title: t("Residential Custom Shelters", "Refugios Residenciales Personalizados"),
      desc: t(
        "Whether you are building a new dream home or retrofitting an existing yard, we integrate the shelter into your landscape with zero structural disruption. Standard units exceed FEMA requirements for 6 adults, with custom configurations for larger families.",
        "Ya sea para nueva construcción o para incorporar en una propiedad existente, integramos el refugio con mínima alteración. Supera requisitos FEMA para 6 adultos, con opciones para familias grandes."
      ),
      icon: Home,
      tags: [t("New Construction", "Nueva Construcción"), t("Retrofits", "Adaptaciones"), t("Custom Sizing", "Tamaño a Medida")],
    },
    {
      num: "04",
      title: t("Commercial & Community Safe Rooms", "Salas Seguras Comerciales y Comunitarias"),
      desc: t(
        "Leveraging Granger Plastics' 30+ years of rotational molding leadership for aerospace and defense, we deliver robust safe rooms for offices, private schools, industrial campuses, mobile home parks, and residential neighborhoods meeting ICC 500 and FEMA 361 standards.",
        "Aprovechando más de 30 años de experiencia de Granger Plastics en aeroespacial y defensa, creamos salas seguras para oficinas, escuelas, industrias y comunidades cumpliendo normas ICC 500 y FEMA 361."
      ),
      icon: Building2,
      tags: [t("Offices & Schools", "Oficinas y Escuelas"), t("ICC 500 / FEMA 361", "ICC 500 / FEMA 361"), t("Group Shelters", "Refugios Grupales")],
    },
    {
      num: "05",
      title: t("Custom Features & Accessories", "Características y Accesorios Personalizados"),
      desc: t(
        "Tailor your unit with high-output auxiliary LED lighting, articulating safety handrails that extend and lock into place, molded-in circular seating with ample headroom, and dual gas-assisted shocks for effortless, smooth door operation.",
        "Personalice su unidad con iluminación LED auxiliar adicional, pasamanos articulados de seguridad, asientos circulares ergonómicos y amortiguadores de gas dobles para una apertura sin esfuerzo."
      ),
      icon: Wrench,
      tags: [t("Auxiliary LED", "LED Auxiliar"), t("Safety Handrails", "Pasamanos"), t("Gas Shocks", "Amortiguadores")],
    },
  ];

  // ── COMPARISON / SPECS TABLE DATA ──
  const specsTable = [
    {
      feature: t("Patented Reverse Taper Design", "Diseño Cónico Invertido Patentado"),
      benefit: t(
        "Installs without additional anchoring systems—no messy concrete, reduced installation time and lower total cost",
        "Se instala sin anclajes adicionales: sin concreto sucio, menor tiempo de instalación y menor costo total"
      ),
    },
    {
      feature: t("Double-Wall Foam-Filled Construction", "Construcción de Doble Pared con Espuma"),
      benefit: t(
        "Exceptional rigidity, enhanced structural integrity, and complete elimination of underground condensation",
        "Rigidez excepcional, mayor integridad estructural y eliminación total de condensación subterránea"
      ),
    },
    {
      feature: t("Triple Panel FEMA-Exceeding Door", "Puerta de Triple Panel que Supera FEMA"),
      benefit: t(
        "Double-wall polyethylene exterior/interior with polycarbonate core—ballistic missile tested at Texas Tech Wind Lab",
        "Polietileno de doble pared exterior/interior con núcleo de policarbonato: probado contra misiles en Texas Tech"
      ),
    },
    {
      feature: t("Triple Locking System", "Sistema de Bloqueo Triple"),
      benefit: t(
        "Heavy-duty 3-point locking system compliant with FEMA and ICC 500 specifications, easily secured in seconds",
        "Sistema de cierre de 3 puntos conforme a FEMA e ICC 500, fácil de asegurar en segundos por cualquier adulto"
      ),
    },
    {
      feature: t("500+ Year Lifespan", "Vida Útil de Más de 500 Años"),
      benefit: t(
        "Rotationally molded polyethylene resists extreme impacts, subterranean chemicals, acids, and UV degradation",
        "Polietileno de moldeo rotacional resistente a impactos extremos, químicos del suelo, ácidos y rayos UV"
      ),
    },
    {
      feature: t("Guaranteed Not to Float", "Garantizado Contra Flotación"),
      benefit: t(
        "Limited lifetime warranty not to float out of the ground—backed by natural soil ballast on the reverse taper",
        "Garantía limitada de por vida contra flotación, respaldada por el lastre natural del cono invertido"
      ),
    },
    {
      feature: t("Limited Lifetime Warranty", "Garantía Limitada de por Vida"),
      benefit: t(
        "Comprehensive coverage against cracking, leaking, rotting, rusting, or material deterioration on body and door",
        "Cobertura total contra agrietamiento, filtraciones, putrefacción, oxidación o deterioro en cuerpo y puerta"
      ),
    },
  ];

  // ── 4-STEP CUSTOM PROCESS ──
  const processSteps = [
    {
      step: "01",
      title: t("Free Consultation & Site Evaluation", "Consulta Gratuita y Evaluación de Sitio"),
      desc: t(
        "We start with a thorough conversation about your family's or organization's needs, followed by an on-site property evaluation analyzing soil, drainage, access, and optimal placement.",
        "Comenzamos con una conversación sobre sus necesidades, seguida de una evaluación en el terreno analizando suelo, drenaje, acceso y ubicación óptima."
      ),
    },
    {
      step: "02",
      title: t("Custom Design & Itemized Quote", "Diseño Personalizado y Cotización Detallada"),
      desc: t(
        "Based on our evaluation, we provide a detailed proposal covering the recommended shelter size, color and accessory options, engineering drawings, timeline, and full warranty terms.",
        "Le entregamos una propuesta detallada con el tamaño recomendado, opciones de color y accesorios, planos de ingeniería, cronograma y garantía completa."
      ),
    },
    {
      step: "03",
      title: t("Professional Turnkey Installation", "Instalación Profesional Llave en Mano"),
      desc: t(
        "A standard installation generally takes 4 hours or less. We excavate, position the unit, level with laser precision, and backfill with native soil with minimal lawn disturbance.",
        "La instalación estándar toma 4 horas o menos. Excavamos, colocamos la unidad, nivelamos con láser y rellenamos con tierra nativa con mínima alteración."
      ),
    },
    {
      step: "04",
      title: t("Final Walkthrough & Long-Term Support", "Entrega Final y Soporte Continuo"),
      desc: t(
        "We walk you through the triple locking system, gas struts, lighting, and emergency egress procedures. You receive documentation and lifetime warranty registration.",
        "Le mostramos la operación del sistema de cierre triple, amortiguadores, luces y salida de emergencia, con registro de garantía de por vida."
      ),
    },
  ];

  // ── WHY CHOOSE US POINTS ──
  const whyChoosePoints = [
    {
      title: t("We Are Builders, Not Just Dealers", "Somos Constructores, No Simples Vendedores"),
      desc: t("As a full-service construction company, we operate our own heavy excavators, cranes, and certified rigging crews.", "Como empresa de construcción integral, operamos nuestras propias excavadoras, grúas y equipos de montaje."),
      icon: HardHat,
    },
    {
      title: t("Local Middle Tennessee Expertise", "Experiencia Local en Middle Tennessee"),
      desc: t("We know regional karst limestone, clay soil conditions, high water tables, and severe storm paths inside and out.", "Conocemos a fondo el suelo arcilloso, roca caliza, mantos freáticos y patrones de tormentas de Tennessee."),
      icon: Compass,
    },
    {
      title: t("Manufacturer-Backed Quality", "Calidad Respaldada por el Fabricante"),
      desc: t("Powered by Granger Plastics Company in Middletown, OH—30+ years of manufacturing excellence in aerospace and defense.", "Respaldado por Granger Plastics Company en Middletown, OH con más de 30 años de liderazgo industrial."),
      icon: Award,
    },
    {
      title: t("Custom Without Compromise", "Personalización Sin Concesiones"),
      desc: t("Every custom shelter exceeds FEMA 320 and FEMA 361 standards regardless of size or aesthetic configurations.", "Cada refugio personalizado supera los estándares FEMA 320 y 361 sin importar las adaptaciones estéticas."),
      icon: ShieldCheck,
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
                {t("Tailored Engineering · Zero Compromise", "Ingeniería a Medida · Cero Concesiones")}
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-[#0B0F15] leading-[1.22]">
                {t("Engineered to Your Specifications.", "Diseñado Según Sus Especificaciones.")}{" "}
                <span className="text-[#DC2626]">
                  {t("Built for Your Property.", "Construido para Su Propiedad.")}
                </span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {t(
                  "Every property is different. Every family has unique needs. At Southern Storm Shelters, we don't believe in one-size-fits-all solutions. As a full-service construction company, we specialize in delivering custom-built storm shelter solutions that integrate seamlessly with your home, business, or community space.",
                  "Cada propiedad es diferente y cada familia tiene necesidades únicas. En Southern Storm Shelters no creemos en soluciones genéricas. Como empresa de construcción integral, nos especializamos en refugios contra tormentas personalizados que se integran a la perfección con su hogar, negocio o espacio comunitario."
                )}
              </p>

              <p className="text-slate-600 text-base leading-relaxed font-normal">
                {t(
                  "Powered by the industry-leading Granger ISS platform and manufactured by Granger Plastics Company—a rotational molding leader with over 30 years of experience serving aerospace, medical, defense, and agricultural industries—our custom shelters offer near absolute protection with the flexibility to meet your exact specifications.",
                  "Impulsados por la plataforma líder Granger ISS y fabricados por Granger Plastics Company —líder de moldeo rotacional con más de 30 años de experiencia en aeroespacial, medicina, defensa y agricultura— nuestros refugios personalizados ofrecen protección casi absoluta con total flexibilidad."
                )}
              </p>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="text-xl sm:text-2xl font-black text-[#DC2626]">FEMA</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    320 & 361 Exceeded
                  </div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="text-xl sm:text-2xl font-black text-[#DC2626]">30+ Yrs</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {t("Manufacturing", "Manufactura")}
                  </div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="text-xl sm:text-2xl font-black text-[#0B0F15]">100%</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {t("Custom Engineered", "Ingeniería a Medida")}
                  </div>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="text-xl sm:text-2xl font-black text-[#0B0F15]">ICC 500</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {t("Compliant", "Conforme")}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={grangerInstallImg}
                  alt="Custom built storm shelter installation in Nashville, TN"
                  className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#0B0F15]/90 backdrop-blur-md border border-white/10 text-white text-left">
                  <div className="flex items-center gap-2 text-[#FBBF24] text-xs font-black uppercase tracking-wider">
                    <Building2 className="w-4 h-4" />
                    {t("Residential & Commercial Custom Solutions", "Soluciones Residenciales y Comerciales")}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-medium">
                    {t("Engineered by construction experts for your specific property conditions.", "Diseñado por expertos en construcción para las condiciones de su propiedad.")}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHAT DOES "CUSTOM BUILT" MEAN? (5 PILLARS) ── */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
              {t("Builders, Not Just Dealers", "Constructores, No Simples Vendedores")}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
              {t("What Does \"Custom Built\" Mean at Southern Storm Shelters?", "¿Qué Significa \"Construcción Personalizada\"?")}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              {t(
                "Unlike dealers who simply drop off a prefabricated box, we are construction professionals who work with you from concept to completion.",
                "A diferencia de distribuidores que solo entregan una caja prefabricada, somos profesionales de la construcción que trabajamos con usted desde el concepto hasta la entrega."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-red-500/10 text-[#DC2626] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-slate-400 font-display">
                        {pillar.num}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-black text-[#0B0F15] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {pillar.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* 6th Card: Interactive Color Customizer Mini */}
            <div className="bg-gradient-to-br from-[#0B0F15] to-[#1A2230] p-6 sm:p-7 rounded-3xl text-white shadow-lg flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#DC2626]/20 text-[#FBBF24] flex items-center justify-center border border-[#DC2626]/30">
                    <Palette className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-[#FBBF24] uppercase tracking-wider">
                    {t("Preview Colors", "Ver Colores")}
                  </span>
                </div>

                <h3 className="font-display text-lg font-black text-white mb-2">
                  {t("Aesthetics of Quality Home Improvement", "Estética de Mejora del Hogar")}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {t(
                    "You get the security of an EF5 bunker with the aesthetic look of a custom home upgrade.",
                    "Obtiene la seguridad de un búnker EF5 con la estética elegante de una mejora del hogar."
                  )}
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedColor("green")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedColor === "green" ? "bg-emerald-700 text-white shadow-sm" : "bg-white/10 hover:bg-white/20 text-slate-200"
                    }`}
                  >
                    🌿 {t("Lawn Green", "Verde Césped")}
                  </button>
                  <button
                    onClick={() => setSelectedColor("gray")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedColor === "gray" ? "bg-slate-600 text-white shadow-sm" : "bg-white/10 hover:bg-white/20 text-slate-200"
                    }`}
                  >
                    🔘 {t("Patio Gray", "Gris Patio")}
                  </button>
                  <button
                    onClick={() => setSelectedColor("custom")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedColor === "custom" ? "bg-[#DC2626] text-white shadow-sm" : "bg-white/10 hover:bg-white/20 text-slate-200"
                    }`}
                  >
                    🎨 {t("Custom Match", "Personalizado")}
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 text-xs text-slate-400 font-semibold">
                {t("Color-matched low-profile doors & vents", "Puertas y ventilaciones combinadas")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE GRANGER ISS ADVANTAGE (SPECS TABLE) ── */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
              {t("Custom Without Compromise", "Personalización Sin Concesiones")}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
              {t("The Granger ISS Advantage: Engineering & Benefits", "La Ventaja Granger ISS: Ingeniería y Beneficios")}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              {t(
                "When you choose a custom-built shelter from Southern Storm Shelters, you never sacrifice safety for customization. Every unit features:",
                "Al elegir un refugio personalizado de Southern Storm Shelters, nunca sacrifica seguridad por personalización. Cada unidad cuenta con:"
              )}
            </p>
          </div>

          {/* Interactive Specs Table */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-900 text-white text-xs font-black uppercase tracking-wider py-4 px-6">
              <div className="md:col-span-5 text-left">{t("Granger ISS Feature", "Característica Granger ISS")}</div>
              <div className="md:col-span-7 text-left">{t("Engineering Benefit", "Beneficio de Ingeniería")}</div>
            </div>

            <div className="divide-y divide-slate-100">
              {specsTable.map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-1 md:grid-cols-12 py-4 px-6 text-left items-center gap-2 md:gap-4 transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                  } hover:bg-red-50/40`}
                >
                  <div className="md:col-span-5 font-bold text-sm text-[#0B0F15] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                    <span>{row.feature}</span>
                  </div>
                  <div className="md:col-span-7 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {row.benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: OUR CUSTOM PROCESS (4 STEPS) ── */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
              {t("Consultation to Completion", "De la Consulta a la Entrega")}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
              {t("Our Custom Process: From Consultation to Completion", "Nuestro Proceso Personalizado")}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              {t(
                "We make building your custom shelter straightforward, transparent, and completely stress-free.",
                "Hacemos que la construcción de su refugio sea sencilla, transparente y sin complicaciones."
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm text-left flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-[#DC2626]/25 mb-2 font-display">
                    {step.step}
                  </div>
                  <h3 className="font-display text-base font-black text-[#0B0F15] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: WHY CHOOSE SOUTHERN STORM SHELTERS ── */}
      <section className="py-14 sm:py-20 bg-[#0B0F15] text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#FBBF24] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              {t("The Southern Storm Shelters Standard", "El Estándar Southern Storm Shelters")}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-white tracking-tight leading-[1.22]">
              {t("Why Choose Us for Your Custom Project?", "¿Por Qué Elegirnos para Su Proyecto Personalizado?")}
            </h2>
            <p className="mt-3 text-slate-300 text-base sm:text-lg">
              {t(
                "When severe weather strikes, the quality of construction makes all the difference. Here is why Tennessee homeowners and businesses trust our team.",
                "Cuando llega el mal clima, la calidad de construcción marca la diferencia. Por esto confían en nosotros los propietarios y negocios de Tennessee."
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChoosePoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#FBBF24] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-base font-black text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed font-medium">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warranty Callout Banner */}
          <div className="mt-10 rounded-3xl bg-white/5 border border-white/15 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-1.5 max-w-2xl">
              <div className="text-xs font-black uppercase tracking-wider text-[#FBBF24]">
                {t("Lifetime Peace of Mind", "Paz Mental de por Vida")}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {t(
                  "Backed by a limited lifetime warranty on the body against cracking, rotting, rusting, or floating, plus lifetime tornado replacement protection on the door. \"That’s peace of mind, providing peace of mind for decades to come.\"",
                  "Respaldado por una garantía limitada de por vida contra agrietamiento, putrefacción, oxidación o flotación, más reemplazo de puerta de por vida por tornado."
                )}
              </p>
            </div>
            <Link
              to="/free-quote"
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg whitespace-nowrap"
            >
              {t("Request Custom Quote", "Solicitar Cotización Personalizada")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: READY TO DESIGN YOUR CUSTOM SHELTER? (CTA) ── */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20">
            {t("Ready to Design Your Custom Storm Shelter?", "¿Listo para Diseñar Su Refugio Personalizado?")}
          </span>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B0F15] tracking-tight leading-[1.22]">
            {t("Don't Settle for a \"Cookie-Cutter\" Solution.", "No Se Conforme con Soluciones Genéricas.")}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {t(
              "Whether you need a residential shelter that blends seamlessly with your landscaping or a commercial safe room engineered for dozens of occupants, Southern Storm Shelters has the expertise to deliver.",
              "Ya sea que necesite un refugio residencial que combine con su jardín o una sala segura comercial para decenas de personas, Southern Storm Shelters tiene la experiencia para lograrlo."
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
