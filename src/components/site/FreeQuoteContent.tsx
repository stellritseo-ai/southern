import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Award,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Building2,
  Home,
  AlertTriangle,
  FileCheck,
  BadgeCheck,
  Compass,
  FileText,
  Calculator,
  Users,
  HardHat,
  Shield,
  Upload,
  Calendar,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { addWebEmail } from "@/lib/leads-store";
import { SITE_CONFIG } from "@/config/site-config";

export function FreeQuoteContent() {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [preferredContact, setPreferredContact] = useState<"Phone Call" | "Email" | "Text Message">("Phone Call");
  const [referralSource, setReferralSource] = useState<string>("Google Search");
  const [otherReferral, setOtherReferral] = useState<string>("");
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileNames = Array.from(e.target.files).map((f) => f.name);
      setAttachedFiles((prev) => [...prev, ...fileNames]);
      toast.success(t("Photos attached successfully.", "Fotos adjuntadas exitosamente."));
    }
  };

  const removeFile = (idx: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const name = (form.querySelector("#fullName") as HTMLInputElement)?.value || "";
    const phone = (form.querySelector("#phoneNumber") as HTMLInputElement)?.value || "";
    const email = (form.querySelector("#emailAddress") as HTMLInputElement)?.value || "";
    const address = (form.querySelector("#propertyAddress") as HTMLInputElement)?.value || "";
    const city = (form.querySelector("#city") as HTMLInputElement)?.value || "";
    const state = (form.querySelector("#state") as HTMLInputElement)?.value || "TN";
    const zip = (form.querySelector("#zipCode") as HTMLInputElement)?.value || "";
    const propertyNotes = (form.querySelector("#propertyNotes") as HTMLTextAreaElement)?.value || "";
    const questions = (form.querySelector("#questions") as HTMLTextAreaElement)?.value || "";

    const fullReferral = referralSource === "Other" && otherReferral.trim() ? `Other (${otherReferral})` : referralSource;

    const messagePayload = [
      `=== FREE ESTIMATE REQUEST ===`,
      `Preferred Contact: ${preferredContact}`,
      `Property Address: ${address}, ${city}, ${state} ${zip}`,
      `Referral Source: ${fullReferral}`,
      attachedFiles.length > 0 ? `Attached Photos: ${attachedFiles.join(", ")}` : "",
      propertyNotes ? `\nProperty Details:\n${propertyNotes}` : "",
      questions ? `\nQuestions / Special Requests:\n${questions}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await addWebEmail({
        name,
        phone,
        email,
        address: `${address}, ${city}, ${state} ${zip}`,
        projectType: "In-Ground Granger ISS Shelter",
        timeframe: "Flexible / As soon as possible",
        service: "Free Site Evaluation & Estimate",
        message: messagePayload,
        source: "Dedicated Free Quote Page",
      });

      setSubmitted(true);
      toast.success(
        t(
          "Thank you for your request! Our team will contact you within 24 hours to schedule your free consultation and site evaluation.",
          "¡Gracias por su solicitud! Nuestro equipo se comunicará con usted dentro de las 24 horas para programar su consulta y evaluación gratuita en el sitio."
        )
      );
    } catch (err) {
      console.error("Free estimate submission error:", err);
      toast.error(
        t(
          "Submission error. Please call us directly at (615) 991-2381.",
          "Error de envío. Por favor llámenos directamente al (615) 991-2381."
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatToExpectPillars = [
    {
      step: "01",
      title: t("Personalized Consultation", "Consulta Personalizada"),
      subtitle: t("We start by understanding your situation:", "Comenzamos entendiendo su situación:"),
      points: [
        t("Family Size: Exceeds FEMA requirements for 6 adults, with custom configurations for larger families.", "Tamaño Familiar: Supera los requisitos FEMA para 6 adultos, con configuraciones para familias más grandes."),
        t("Property Type: Residential home, new construction, commercial building, or community safe room.", "Tipo de Propiedad: Vivienda residencial, nueva construcción, edificio comercial o refugio comunitario."),
        t("Location: Determining the optimal placement for rapid safety, accessibility, and natural drainage.", "Ubicación: Determinación de la ubicación óptima para seguridad rápida, accesibilidad y drenaje."),
      ],
      icon: Users,
    },
    {
      step: "02",
      title: t("Professional Site Evaluation", "Evaluación Profesional del Terreno"),
      subtitle: t("Proper installation starts with understanding the property:", "Una instalación adecuada comienza con conocer la propiedad:"),
      points: [
        t("Soil Conditions: Inspecting regional karst limestone and clay to guarantee structural stability.", "Condiciones del Suelo: Inspección de piedra caliza y arcilla para garantizar estabilidad estructural."),
        t("Drainage & Water Table: Preventing water infiltration and ensuring your shelter remains 100% dry.", "Drenaje y Nivel Freático: Prevención de infiltración de agua para mantener el refugio 100% seco."),
        t("Access & Utilities: Locating buried 811 utilities and confirming heavy equipment clearance.", "Acceso y Servicios: Localización de servicios subterráneos 811 y confirmación de acceso de maquinaria."),
        t("Shelter Location: Laser-measured placement engineered specifically for your Tennessee property.", "Ubicación del Refugio: Medición láser diseñada específicamente para su terreno en Tennessee."),
      ],
      tag: t("Engineering-Informed Assessment", "Evaluación con Enfoque de Ingeniería"),
      icon: HardHat,
    },
    {
      step: "03",
      title: t("Transparent, Detailed Quote", "Cotización Transparente y Detallada"),
      subtitle: t("Your comprehensive estimate will include:", "Su presupuesto detallado incluirá:"),
      points: [
        t("Recommended Model & Size: Granger ISS In-Ground Prefabricated or Custom Built safe room.", "Modelo y Tamaño Recomendado: Granger ISS Prefabricado Subterráneo o Construcción Personalizada."),
        t("Custom Color & Aesthetic Options: Match your home's trim, patio pavers, or lawn landscape.", "Opciones de Color y Estética: Combine con la moldura de su casa, patio o césped."),
        t("Installation Plan & Timeline: Complete turnkey installation taking 4 hours or less.", "Plan y Plazos de Instalación: Instalación completa llave en mano en 4 horas o menos."),
        t("Warranty Details: Limited lifetime warranty on body against cracking, rusting, rotting, or floating, plus lifetime door warranty.", "Detalles de Garantía: Garantía de por vida en el cuerpo contra roturas, óxido y flotación, más garantía en la puerta."),
        t("Total Cost With No Hidden Fees: Upfront, itemized pricing backed by construction professionals.", "Costo Total Sin Cargos Ocultos: Precios claros y desglosados respaldados por expertos."),
      ],
      icon: FileCheck,
    },
  ];

  const whyChooseUsPoints = [
    {
      title: t("We Are Builders, Not Just Dealers", "Somos Constructores, No Simples Distribuidores"),
      desc: t(
        "As a full-service construction company based in Nashville, TN, we handle the entire process—from site evaluation and heavy equipment excavation to final laser leveling and backfill. You never have to coordinate third-party contractors.",
        "Como empresa de construcción integral en Nashville, TN, manejamos todo el proceso, desde la evaluación y excavación hasta la nivelación láser final. Nunca tendrá que lidiar con contratistas externos."
      ),
      icon: HardHat,
    },
    {
      title: t("Industry-Leading Products", "Productos Líderes en la Industria"),
      desc: t(
        "We install the Granger ISS, manufactured by Granger Plastics Company—an internationally recognized rotational molding leader with over 30 years of experience serving aerospace, medical, defense, and agricultural industries.",
        "Instalamos el Granger ISS, fabricado por Granger Plastics Company, líder internacional en moldeo rotacional con más de 30 años de experiencia sirviendo a industrias aeroespaciales, médicas, de defensa y agrícolas."
      ),
      icon: Shield,
    },
    {
      title: t("Local Expertise", "Experiencia Local en Middle Tennessee"),
      desc: t(
        "We understand Middle Tennessee soil, high water tables, karst limestone, and regional weather patterns. Our installations are tailored to the specific geological conditions of your property.",
        "Entendemos la geología de Middle Tennessee, niveles freáticos, roca caliza y patrones climáticos severos. Nuestras instalaciones se adaptan a las condiciones exactas de su terreno."
      ),
      icon: MapPin,
    },
    {
      title: t("Lifetime Peace of Mind", "Tranquilidad de Por Vida"),
      desc: t(
        "Every shelter we install is backed by a limited lifetime warranty on the body of the unit against cracking, rusting, rotting, or floating out of the ground. The door is also protected by a lifetime warranty.",
        "Cada refugio está respaldado por una garantía limitada de por vida en el cuerpo contra roturas, oxidación, descomposición o flotación. La puerta también incluye garantía de por vida."
      ),
      icon: Award,
    },
  ];

  const faqs = [
    {
      q: t("How long does the installation take?", "¿Cuánto tiempo tarda la instalación?"),
      a: t(
        "A standard installation of the Granger ISS generally takes 4 hours or less. The procedure is straightforward: dig a hole, position the unit, ensure the shelter is level, and backfill with the soil that was removed.",
        "Una instalación estándar del Granger ISS generalmente toma 4 horas o menos. El procedimiento es directo: excavar, posicionar la unidad, nivelar con precisión láser y rellenar con la tierra removida."
      ),
    },
    {
      q: t("What areas do you serve?", "¿Qué áreas atienden?"),
      a: t(
        "We proudly serve Nashville, Franklin, Murfreesboro, and surrounding areas within a 100-mile radius across Tennessee.",
        "Servimos con orgullo a Nashville, Franklin, Murfreesboro y las áreas circundantes dentro de un radio de 100 millas en Tennessee."
      ),
    },
    {
      q: t("Do you offer custom color options?", "¿Ofrecen opciones de colores personalizados?"),
      a: t(
        "Yes! Unlike most competing tornado shelters that look industrial and unsightly, the Granger ISS allows you to customize the door and vent colors to coordinate with your home or landscaping. Choose green to blend with grass, gray to match concrete, or a custom color to match your home.",
        "¡Sí! A diferencia de los refugios convencionales con aspecto industrial, el Granger ISS le permite personalizar los colores de la puerta y ventilación para coordinar con su paisajismo: verde pasto, gris patio o personalizado."
      ),
    },
    {
      q: t("What warranty is included?", "¿Qué garantía está incluida?"),
      a: t(
        "The Granger ISS is the only single-family tornado shelter on the planet that offers a limited lifetime warranty on the body of the unit against cracking, rusting, rotting, or floating out of the ground. The door is also protected by a lifetime warranty.",
        "El Granger ISS es el único refugio unifamiliar en el planeta que ofrece una garantía limitada de por vida contra roturas, oxidación, descomposición o flotación. La puerta también cuenta con garantía de por vida."
      ),
    },
    {
      q: t("How many people can the shelter hold?", "¿A cuántas personas puede albergar el refugio?"),
      a: t(
        "The Granger ISS exceeds FEMA requirements for 6 adults, though several more can fit in an emergency. Molded-in circular seating allows occupants to sit comfortably with plenty of headroom.",
        "El Granger ISS supera los requisitos de FEMA para 6 adultos, aunque caben más en caso de emergencia. El asiento circular moldeado permite que los ocupantes se sienten cómodamente con amplio espacio para la cabeza."
      ),
    },
    {
      q: t("Is a site evaluation included?", "¿Está incluida una evaluación en el sitio?"),
      a: t(
        "Absolutely. Every free estimate includes a professional site evaluation to assess soil conditions, drainage, access, and buried utilities. We don't guess—we engineer solutions based on your specific property.",
        "Totalmente. Cada estimación gratuita incluye una evaluación profesional en el sitio para verificar el suelo, drenaje, accesibilidad y servicios subterráneos 811. Diseñamos soluciones basadas en su terreno real."
      ),
    },
  ];

  return (
    <div className="bg-white text-slate-900 overflow-hidden selection:bg-amber-600 selection:text-white">

      {/* ── SECTION 1: WHAT TO EXPECT FROM YOUR FREE ESTIMATE ─────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div aria-hidden className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 left-10 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>{t("Transparent & Comprehensive", "Transparente y Completo")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("What to Expect from Your Free Estimate", "Qué Esperar de Su Estimación Gratuita")}
            </h2>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {t(
                "We don't just hand you a number. We provide a complete site assessment based on your specific property and soil conditions. Turnkey underground shelter installation with clear scope and pricing.",
                "No solo le damos un número. Brindamos una evaluación completa del terreno basada en su propiedad y condiciones del suelo. Instalación subterránea llave en mano con alcance y precios transparentes."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {whatToExpectPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="rounded-3xl bg-white border border-slate-200 p-7 sm:p-8 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 relative group shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-black text-slate-200 group-hover:text-amber-600 transition-colors">
                        {pillar.step}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mb-4">{pillar.subtitle}</p>

                    <ul className="space-y-3">
                      {pillar.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {pillar.tag && (
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <span className="inline-block text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                        {pillar.tag}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: REQUEST YOUR FREE ESTIMATE (FORM) ────────────────── */}
      <section id="estimate-form" className="py-16 sm:py-24 bg-white relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>{t("24-Hour Fast Response", "Respuesta Rápida en 24 Horas")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("Request Your Free Estimate", "Solicite Su Estimación Gratuita")}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {t(
                "Fill out the form below and our team will contact you within 24 hours to schedule your free consultation and site evaluation.",
                "Complete el formulario a continuación y nuestro equipo se comunicará con usted dentro de las 24 horas para programar su consulta y evaluación en el sitio."
              )}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-10 shadow-lg relative overflow-hidden">

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {t("Thank You for Your Request!", "¡Gracias por Su Solicitud!")}
                </h3>
                <p className="mt-3 text-slate-600 text-base max-w-lg mx-auto leading-relaxed">
                  {t(
                    "Our team has received your property details and will contact you within 24 hours to schedule your free consultation and site evaluation.",
                    "Nuestro equipo ha recibido los detalles de su propiedad y se comunicará con usted dentro de las 24 horas para programar su consulta y evaluación gratuita en el sitio."
                  )}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-slate-300 text-slate-800 hover:bg-slate-100 rounded-xl"
                  >
                    {t("Submit Another Request", "Enviar Otra Solicitud")}
                  </Button>
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-lg shadow-amber-600/20 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t(`Call ${SITE_CONFIG.phone} Now`, `Llamar al ${SITE_CONFIG.phone}`)}</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8 relative z-10">
                
                {/* 1. Contact Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                      1
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {t("Contact Information", "Información de Contacto")}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("Full Name *", "Nombre Completo *")}
                      </Label>
                      <Input
                        id="fullName"
                        required
                        placeholder={t("e.g. John Miller", "ej. Juan Pérez")}
                        className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phoneNumber" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("Phone Number *", "Número de Teléfono *")}
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        required
                        placeholder="(615) 000-0000"
                        className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="emailAddress" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("Email Address *", "Correo Electrónico *")}
                      </Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl"
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("Preferred Contact Method", "Método de Contacto Preferido")}
                      </Label>
                      <div className="mt-1.5 grid grid-cols-3 gap-2">
                        {(["Phone Call", "Email", "Text Message"] as const).map((method) => {
                          const isSelected = preferredContact === method;
                          return (
                            <button
                              type="button"
                              key={method}
                              onClick={() => setPreferredContact(method)}
                              className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition cursor-pointer ${
                                isSelected
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                                  : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                              }`}
                            >
                              {t(
                                method === "Phone Call" ? "Phone Call" : method === "Email" ? "Email" : "Text",
                                method === "Phone Call" ? "Llamada" : method === "Email" ? "Correo" : "Texto"
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Property Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                      2
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {t("Property Information", "Información de la Propiedad")}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="propertyAddress" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("Property Address *", "Dirección de la Propiedad *")}
                      </Label>
                      <Input
                        id="propertyAddress"
                        required
                        placeholder={t("123 Street Name", "Calle y Número")}
                        className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("City *", "Ciudad *")}
                      </Label>
                      <Input
                        id="city"
                        required
                        placeholder="Nashville"
                        className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="state" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {t("State *", "Estado *")}
                        </Label>
                        <Input
                          id="state"
                          required
                          defaultValue="TN"
                          className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl text-center font-bold"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {t("ZIP Code *", "Código Postal *")}
                        </Label>
                        <Input
                          id="zipCode"
                          required
                          placeholder="37201"
                          className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Additional Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                      3
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {t("Additional Information & Property Notes", "Información Adicional y Notas")}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyNotes" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("Tell Us About Your Property", "Cuéntenos Sobre Su Propiedad")}
                      </Label>
                      <Textarea
                        id="propertyNotes"
                        rows={3}
                        placeholder={t(
                          "Yard slope, gate access width, buried utilities, underground sprinkler systems, patio or yard placement...",
                          "Pendiente del patio, ancho de portón, rociadores, servicios subterráneos..."
                        )}
                        className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs rounded-xl focus:border-amber-600 focus:ring-amber-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="questions" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("Questions or Special Requests", "Preguntas o Solicitudes Especiales")}
                      </Label>
                      <Textarea
                        id="questions"
                        rows={3}
                        placeholder={t(
                          "Custom color preferences, timing requirements, commercial safety specifications...",
                          "Preferencias de color, fechas específicas, requerimientos comerciales..."
                        )}
                        className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs rounded-xl focus:border-amber-600 focus:ring-amber-600"
                      />
                    </div>
                  </div>

                  {/* How Did You Hear About Us */}
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {t("How Did You Hear About Us?", "¿Cómo Nos Conoció?")}
                    </Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Google Search", "Facebook", "Referral", "Drove By", "Other"].map((src) => {
                        const isSelected = referralSource === src;
                        return (
                          <button
                            type="button"
                            key={src}
                            onClick={() => setReferralSource(src)}
                            className={`py-2 px-3.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                              isSelected
                                ? "bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-sm"
                                : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                            }`}
                          >
                            {t(
                              src,
                              src === "Google Search"
                                ? "Búsqueda Google"
                                : src === "Referral"
                                ? "Recomendación"
                                : src === "Drove By"
                                ? "Pasé por ahí"
                                : src === "Other"
                                ? "Otro"
                                : src
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {referralSource === "Other" && (
                      <Input
                        value={otherReferral}
                        onChange={(e) => setOtherReferral(e.target.value)}
                        placeholder={t("Please specify...", "Por favor especifique...")}
                        className="mt-2 bg-white border-slate-300 text-slate-900 text-xs rounded-xl h-10 focus:border-amber-600 focus:ring-amber-600"
                      />
                    )}
                  </div>

                  {/* Optional File Upload */}
                  <div className="pt-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                      <span>{t("Attach Property / Yard Photos (Optional)", "Adjuntar Fotos del Terreno (Opcional)")}</span>
                      <span className="text-[10px] text-slate-500">{t("JPG, PNG, PDF up to 10MB", "JPG, PNG, PDF hasta 10MB")}</span>
                    </Label>
                    
                    <div className="mt-2 border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl p-4 text-center bg-white transition relative">
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                      <p className="text-xs font-semibold text-slate-700">
                        {t("Click or drag photos of your installation area here", "Haga clic o arrastre fotos del área aquí")}
                      </p>
                    </div>

                    {attachedFiles.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {attachedFiles.map((fn, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-300 text-xs text-slate-800"
                          >
                            <span className="truncate max-w-[180px]">{fn}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-slate-400 hover:text-amber-600 transition"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button & Disclaimer */}
                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-14 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm sm:text-base font-extrabold uppercase tracking-wider rounded-2xl shadow-lg shadow-amber-600/20 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      t("Submitting Request...", "Enviando Solicitud...")
                    ) : (
                      <>
                        <span>{t("SUBMIT ESTIMATE REQUEST", "ENVIAR SOLICITUD DE ESTIMACIÓN")}</span>
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-[11px] text-slate-500 leading-relaxed max-w-2xl mx-auto">
                    {t(
                      "By submitting this form, you agree to be contacted by Southern Storm Shelters regarding your estimate request. We respect your privacy and will never share your information with third parties.",
                      "Al enviar este formulario, usted acepta ser contactado por Southern Storm Shelters con respecto a su solicitud de estimación. Respetamos su privacidad y nunca compartiremos su información con terceros."
                    )}
                  </p>
                </div>

              </form>
            )}

          </div>

          {/* Quick Contact Box: Prefer to Call? */}
          <div className="mt-10 rounded-3xl bg-slate-900 text-white border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
                <Phone className="w-3 h-3" />
                <span>{t("Prefer to Call?", "¿Prefiere Llamar Directamente?")}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {t("We're happy to answer your questions directly.", "Con gusto respondemos sus preguntas de inmediato.")}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {SITE_CONFIG.operatingHours.scheduleText}
              </p>
            </div>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2.5 bg-amber-600 hover:bg-amber-700 text-white font-black px-7 py-3.5 rounded-2xl transition shadow-lg shadow-amber-600/30 text-base shrink-0"
            >
              <Phone className="w-5 h-5" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
          </div>

        </div>
      </section>

      {/* ── SECTION 3: WHY REQUEST YOUR ESTIMATE FROM US? ──────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{t("Construction Professionals", "Profesionales de la Construcción")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t(
                "Why Request Your Estimate from Southern Storm Shelters?",
                "¿Por Qué Solicitar Su Estimación Con Southern Storm Shelters?"
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUsPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white border border-slate-200 p-8 hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 shadow-xs"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: FREQUENTLY ASKED QUESTIONS ──────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>{t("Common Inquiries", "Preguntas Frecuentes")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("Frequently Asked Questions", "Preguntas Frecuentes")}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 hover:text-amber-700 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 5: CONTACT INFORMATION & SERVICE AREA ──────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-md relative overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
                  {t("Middle Tennessee Construction Company", "Empresa de Construcción de Middle Tennessee")}
                </span>
                
                <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Southern Storm Shelters LLC
                </h3>
                
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {t(
                    "Service Area: Proudly serving Nashville, Franklin, Murfreesboro, and surrounding areas within a 100-mile radius.",
                    "Área de Servicio: Sirviendo con orgullo a Nashville, Franklin, Murfreesboro y áreas circundantes en un radio de 100 millas."
                  )}
                </p>

                <blockquote className="mt-6 border-l-2 border-amber-500 pl-4 text-sm font-semibold italic text-slate-700">
                  {t(
                    '"Engineered storm protection with professional crane placement and turnkey excavation."',
                    '"Protección certificada contra tormentas con colocación profesional mediante grúa y excavación integral."'
                  )}
                </blockquote>
              </div>

              <div className="space-y-4 rounded-2xl bg-slate-50 border border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("Phone", "Teléfono")}</div>
                    <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-sm font-bold text-slate-900 hover:text-amber-700 transition">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("Email", "Correo")}</div>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm font-bold text-slate-900 hover:text-amber-700 transition">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("Address", "Dirección")}</div>
                    <div className="text-sm font-semibold text-slate-900">
                      Nashville, TN
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("Operating Hours", "Horario de Atención")}</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {SITE_CONFIG.operatingHours.scheduleText}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
