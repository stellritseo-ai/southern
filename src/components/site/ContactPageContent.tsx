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
  HelpCircle,
  Building2,
  Home,
  FileCheck,
  HardHat,
  Shield,
  Calendar,
  MessageSquare,
  Check,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { addWebEmail } from "@/lib/leads-store";
import { SITE_CONFIG } from "@/config/site-config";

export function ContactPageContent() {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [preferredContact, setPreferredContact] = useState<"Phone Call" | "Email" | "Text Message">("Phone Call");
  const [contactReason, setContactReason] = useState<string>("Request a Free Estimate");
  const [shelterType, setShelterType] = useState<string>("In-Ground Prefabricated Storm Shelter");
  const [propertyType, setPropertyType] = useState<string>("Residential – Existing Home");
  const [referralSource, setReferralSource] = useState<string>("Google Search");
  const [otherReferral, setOtherReferral] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    const message = (form.querySelector("#message") as HTMLTextAreaElement)?.value || "";

    const fullReferral = referralSource === "Other" && otherReferral.trim() ? `Other (${otherReferral})` : referralSource;

    const messagePayload = [
      `=== CONTACT FORM INQUIRY ===`,
      `Reason for Contact: ${contactReason}`,
      `Preferred Contact: ${preferredContact}`,
      address ? `Property Address: ${address}, ${city}, ${state} ${zip}` : "",
      `Shelter Type of Interest: ${shelterType}`,
      `Property Type: ${propertyType}`,
      `Referral Source: ${fullReferral}`,
      message ? `\nCustomer Message:\n${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await addWebEmail({
        name,
        phone,
        email,
        address: address ? `${address}, ${city}, ${state} ${zip}` : undefined,
        projectType: shelterType,
        service: `Contact Inquiry: ${contactReason}`,
        message: messagePayload,
        source: "Dedicated Contact Page",
      });

      setSubmitted(true);
      toast.success(
        t(
          "Thank you for contacting Southern Storm Shelters! Our team will respond to your inquiry within 24 hours.",
          "¡Gracias por contactar a Southern Storm Shelters! Nuestro equipo responderá a su consulta dentro de las 24 horas."
        )
      );
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error(
        t(
          `Submission error. Please call us directly at ${SITE_CONFIG.phone}.`,
          `Error de envío. Por favor llámenos directamente al ${SITE_CONFIG.phone}.`
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const contactChannels = [
    {
      title: t("Phone", "Teléfono"),
      value: SITE_CONFIG.phone,
      href: `tel:${SITE_CONFIG.phoneRaw}`,
      desc: t(
        "Call us directly to speak with a member of our team. We're happy to answer questions, schedule a consultation, or provide guidance on the best shelter solution for your property.",
        "Llámenos directamente para hablar con nuestro equipo. Con gusto respondemos preguntas, programamos consultas o le orientamos sobre la mejor solución para su terreno."
      ),
      hours: `${SITE_CONFIG.operatingHours.weekdays}\n${SITE_CONFIG.operatingHours.saturdays}\n${SITE_CONFIG.operatingHours.sundays}`,
      icon: Phone,
      action: t("Call Now", "Llamar Ahora"),
    },
    {
      title: t("Email", "Correo Electrónico"),
      value: SITE_CONFIG.email,
      href: `mailto:${SITE_CONFIG.email}`,
      desc: t(
        "Prefer to write? Send us an email with your questions, property details, or request for a quote. We'll respond within 24 hours.",
        "¿Prefiere escribir? Envíenos un correo con sus preguntas, detalles de su terreno o solicitud de cotización. Responderemos en 24 horas."
      ),
      hours: t("Response Time: Within 24 Hours", "Tiempo de Respuesta: En 24 Horas"),
      icon: Mail,
      action: t("Send Email", "Enviar Correo"),
    },
    {
      title: t("Office Location", "Ubicación de Oficina"),
      value: "Nashville, TN",
      desc: t(
        "Note: This is our administrative office. All shelter installations are performed on-site at your property.",
        "Nota: Esta es nuestra oficina administrativa. Todas las instalaciones de refugios se realizan directamente en su propiedad."
      ),
      hours: SITE_CONFIG.operatingHours.weekdays,
      icon: MapPin,
    },
    {
      title: t("Service Area", "Área de Servicio"),
      value: t("100-Mile Radius Across Tennessee", "Radio de 100 Millas en Tennessee"),
      desc: t(
        "We proudly serve Nashville, Franklin, Murfreesboro, and surrounding areas within a 100-mile radius across Tennessee. If you're unsure whether we serve your area, give us a call—we're happy to confirm.",
        "Servimos con orgullo a Nashville, Franklin, Murfreesboro y áreas circundantes dentro de un radio de 100 millas en Tennessee. Llámenos si desea confirmar su área."
      ),
      hours: t("Nashville • Franklin • Murfreesboro • Middle TN", "Nashville • Franklin • Murfreesboro • Middle TN"),
      icon: Compass,
    },
  ];

  const whatHappensSteps = [
    {
      step: "01",
      title: t("Step 1: Prompt Response", "Paso 1: Respuesta Inmediata"),
      desc: t(
        "Our team will respond to your inquiry within 24 hours during normal business hours.",
        "Nuestro equipo responderá a su consulta dentro de las 24 horas durante el horario laboral."
      ),
      icon: Clock,
    },
    {
      step: "02",
      title: t("Step 2: Personalized Consultation", "Paso 2: Consulta Personalizada"),
      desc: t(
        "We'll discuss your needs, answer your questions, and schedule a convenient time for a free site evaluation if needed.",
        "Conversaremos sobre sus necesidades, responderemos sus preguntas y programaremos una evaluación gratuita en el sitio si es necesario."
      ),
      icon: MessageSquare,
    },
    {
      step: "03",
      title: t("Step 3: Professional Site Evaluation", "Paso 3: Evaluación Profesional del Terreno"),
      desc: t(
        "Our construction experts will visit your property to assess soil conditions, drainage, access, and the optimal shelter location. This isn't a guess—it's an engineering-informed assessment.",
        "Nuestros expertos en construcción visitarán su terreno para analizar el suelo, drenaje, acceso y la ubicación óptima. Es una evaluación con criterio de ingeniería."
      ),
      icon: HardHat,
    },
    {
      step: "04",
      title: t("Step 4: Transparent Quote", "Paso 4: Cotización Transparente"),
      desc: t(
        "You'll receive a detailed, no-obligation estimate that includes recommended shelter model, custom options, installation plan, warranty details, and total cost with no hidden fees.",
        "Recibirá un presupuesto detallado y sin compromiso que incluye modelo recomendado, opciones personalizadas, plan de instalación, garantía y costo total sin cargos ocultos."
      ),
      icon: FileCheck,
    },
    {
      step: "05",
      title: t("Step 5: Professional Installation", "Paso 5: Instalación Profesional"),
      desc: t(
        "Once you're ready to proceed, our team handles everything—from excavation to final installation. Most installations take 4 hours or less.",
        "Cuando decida avanzar, nuestro equipo se encarga de todo: excavación, colocación y acabado. La mayoría de las instalaciones toman 4 horas o menos."
      ),
      icon: ShieldCheck,
    },
  ];

  const whyTrustUsPoints = [
    {
      title: t("We Are Builders, Not Just Dealers", "Somos Constructores, No Simples Distribuidores"),
      desc: t(
        "As a full-service construction company based in Nashville, TN, we handle the entire process—from site evaluation and heavy equipment excavation to final grading and installation. You never have to coordinate third-party contractors.",
        "Como empresa de construcción integral en Nashville, TN, manejamos todo el proceso, desde la evaluación y excavación hasta la nivelación final. Nunca tendrá que coordinar contratistas externos."
      ),
      icon: HardHat,
    },
    {
      title: t("Industry-Leading Products", "Productos Líderes en la Industria"),
      desc: t(
        "We install the Granger ISS, manufactured by Granger Plastics Company—an internationally recognized rotational molding leader with over 30 years of experience serving aerospace, medical, defense, and agricultural industries.",
        "Instalamos el Granger ISS, fabricado por Granger Plastics Company, líder internacional en moldeo rotacional con más de 30 años de experiencia en sectores aeroespacial, médico, defensa y agrícola."
      ),
      icon: Shield,
    },
    {
      title: t("Local Expertise", "Experiencia Local en Middle Tennessee"),
      desc: t(
        "We understand Middle Tennessee soil, water tables, and weather patterns. Our installations are tailored to the specific geological conditions of your property.",
        "Entendemos la geología de Middle Tennessee, niveles de agua subterránea y patrones climáticos. Nuestras instalaciones se adaptan a las condiciones exactas de su propiedad."
      ),
      icon: MapPin,
    },
    {
      title: t("Lifetime Peace of Mind", "Tranquilidad de Por Vida"),
      desc: t(
        "Every shelter we install is backed by a limited lifetime warranty on the body of the unit against cracking, rusting, rotting, or floating out of the ground. The door is also protected by a lifetime warranty.",
        "Cada refugio cuenta con una garantía limitada de por vida en el cuerpo contra roturas, óxido, descomposición o flotación. La puerta también incluye garantía de por vida."
      ),
      icon: Award,
    },
  ];

  const faqs = [
    {
      q: t("How quickly will I hear back after contacting you?", "¿Qué tan rápido recibiré respuesta después de contactarles?"),
      a: t(
        "We respond to all inquiries within 24 hours during normal business hours. If you call during business hours, you'll typically speak with someone immediately.",
        "Respondemos a todas las consultas dentro de las 24 horas en días hábiles. Si llama durante el horario de atención, normalmente hablará con un especialista de inmediato."
      ),
    },
    {
      q: t("Do you offer free estimates?", "¿Ofrecen estimaciones gratuitas?"),
      a: t(
        "Yes. Every estimate is free and no-obligation. We'll evaluate your property, discuss your needs, and provide a transparent quote with no hidden fees.",
        "Sí. Cada presupuesto es 100% gratuito y sin compromiso. Evaluamos su terreno, analizamos sus requerimientos y entregamos una cotización transparente sin cargos ocultos."
      ),
    },
    {
      q: t("What areas do you serve?", "¿Qué áreas cubren?"),
      a: t(
        "We proudly serve Nashville, Franklin, Murfreesboro, and surrounding areas within a 100-mile radius across Tennessee.",
        "Servimos con orgullo a Nashville, Franklin, Murfreesboro y todas las áreas dentro de un radio de 100 millas en Tennessee."
      ),
    },
    {
      q: t("How long does installation take?", "¿Cuánto tiempo tarda la instalación?"),
      a: t(
        "A standard installation of the Granger ISS generally takes 4 hours or less. The procedure is straightforward: dig a hole, position the unit, ensure the shelter is level, and backfill with the soil that was removed.",
        "Una instalación estándar del Granger ISS generalmente toma 4 horas o menos: excavar, colocar la unidad, nivelar con precisión láser y rellenar con la tierra extraída."
      ),
    },
    {
      q: t("Do you offer custom color options?", "¿Ofrecen opciones de colores personalizados?"),
      a: t(
        "Yes! Unlike most competing tornado shelters that look industrial and unsightly, the Granger ISS allows you to customize the door and vent colors to coordinate with your home or landscaping.",
        "¡Sí! A diferencia de refugios convencionales que lucen antiestéticos, el Granger ISS le permite personalizar los colores de puerta y ventilación para coordinar con su vivienda o paisajismo."
      ),
    },
    {
      q: t("What warranty is included?", "¿Qué garantía está incluida?"),
      a: t(
        "The Granger ISS offers a limited lifetime warranty on the body of the unit against cracking, rusting, rotting, or floating out of the ground. The door is also protected by a lifetime warranty.",
        "El Granger ISS ofrece garantía limitada de por vida en el cuerpo contra roturas, oxidación, descomposición o flotación. La puerta también está protegida de por vida."
      ),
    },
    {
      q: t("How many people can the shelter hold?", "¿A cuántas personas puede albergar el refugio?"),
      a: t(
        "The Granger ISS exceeds FEMA requirements for 6 adults, though several more can fit in an emergency. Molded-in circular seating allows occupants to sit comfortably with plenty of headroom.",
        "El Granger ISS supera las especificaciones FEMA para 6 adultos, aunque caben más en una emergencia. Los asientos circulares moldeados brindan comodidad y amplio espacio superior."
      ),
    },
  ];

  return (
    <div className="bg-white text-slate-900 overflow-hidden selection:bg-amber-600 selection:text-white">

      {/* ── SECTION 1: GET IN TOUCH CHANNELS ───────────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div aria-hidden className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 left-10 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>{t("Get in Touch", "Póngase en Contacto")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("Let's Talk About Protecting Your Family", "Hablemos de Proteger a Su Familia")}
            </h2>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {t(
                "Turnkey underground storm shelter installation across Nashville and Middle Tennessee. Speak directly with our project team—we respond to all inquiries promptly.",
                "Instalación subterránea llave en mano en Nashville y Middle Tennessee. Hable directamente con nuestro equipo de proyectos: respondemos a todas las consultas con prontitud."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((ch) => {
              const Icon = ch.icon;
              return (
                <div
                  key={ch.title}
                  className="rounded-3xl bg-white border border-slate-200 p-7 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 shadow-xs group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-5 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                      {ch.title}
                    </div>

                    {ch.href ? (
                      <a
                        href={ch.href}
                        className="text-lg font-bold text-slate-900 hover:text-amber-700 transition block mb-2"
                      >
                        {ch.value}
                      </a>
                    ) : (
                      <div className="text-base font-bold text-slate-900 mb-2 leading-snug">
                        {ch.value}
                      </div>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {ch.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-500 whitespace-pre-line">
                    {ch.hours}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SEND US A MESSAGE (CONTACT FORM) ────────────────── */}
      <section id="contact-form" className="py-16 sm:py-24 bg-white relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>{t("24-Hour Turnaround", "Respuesta en 24 Horas")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("Send Us a Message", "Envíenos un Mensaje")}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {t(
                "Fill out the form below and our team will contact you within 24 hours.",
                "Complete el formulario a continuación y nuestro equipo se comunicará con usted dentro de las 24 horas."
              )}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-10 shadow-lg relative overflow-hidden">

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
                  {t("Thank You for Contacting Southern Storm Shelters!", "¡Gracias por Contactar a Southern Storm Shelters!")}
                </h3>
                <p className="mt-3 text-slate-600 text-base max-w-lg mx-auto leading-relaxed">
                  {t(
                    "Our team has received your message and will respond to your inquiry within 24 hours.",
                    "Nuestro equipo ha recibido su mensaje y responderá a su consulta dentro de las 24 horas."
                  )}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-slate-300 text-slate-800 hover:bg-slate-100 rounded-xl"
                  >
                    {t("Send Another Message", "Enviar Otro Mensaje")}
                  </Button>
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition shadow-lg shadow-amber-600/20 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t(`Call ${SITE_CONFIG.phone}`, `Llamar al ${SITE_CONFIG.phone}`)}</span>
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
                        placeholder={t("e.g. Michael Davis", "ej. Miguel Torres")}
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
                        placeholder="michael@example.com"
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
                              className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition cursor-pointer ${isSelected
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
                        {t("Property Address", "Dirección de la Propiedad")}
                      </Label>
                      <Input
                        id="propertyAddress"
                        placeholder={t("123 Street Name", "Calle y Número")}
                        className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("City", "Ciudad")}
                      </Label>
                      <Input
                        id="city"
                        placeholder="Franklin"
                        className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="state" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {t("State", "Estado")}
                        </Label>
                        <Input
                          id="state"
                          defaultValue="TN"
                          className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl text-center font-bold"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {t("ZIP Code", "Código Postal")}
                        </Label>
                        <Input
                          id="zipCode"
                          placeholder="37067"
                          className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:ring-amber-600 h-11 text-sm rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. How Can We Help You? */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                      3
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {t("How Can We Help You?", "¿Cómo Podemos Ayudarle?")}
                    </h3>
                  </div>

                  {/* Reason for Contact */}
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {t("Reason for Contact *", "Motivo del Contacto *")}
                    </Label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {[
                        "Request a Free Estimate",
                        "Schedule a Site Evaluation",
                        "General Question",
                        "Warranty Support",
                        "Commercial / Community Shelter Inquiry",
                        "Other",
                      ].map((reason) => {
                        const isSelected = contactReason === reason;
                        return (
                          <button
                            type="button"
                            key={reason}
                            onClick={() => setContactReason(reason)}
                            className={`p-3 rounded-xl border text-left text-xs font-bold transition cursor-pointer flex items-center justify-between ${isSelected
                                ? "bg-amber-500/10 border-amber-600 text-amber-800 shadow-2xs"
                                : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                              }`}
                          >
                            <span>
                              {t(
                                reason,
                                reason === "Request a Free Estimate"
                                  ? "Solicitar Estimación Gratis"
                                  : reason === "Schedule a Site Evaluation"
                                    ? "Programar Evaluación del Terreno"
                                    : reason === "General Question"
                                      ? "Pregunta General"
                                      : reason === "Warranty Support"
                                        ? "Soporte de Garantía"
                                        : reason === "Commercial / Community Shelter Inquiry"
                                          ? "Consulta Comercial / Comunitaria"
                                          : "Otro"
                              )}
                            </span>
                            <div
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${isSelected ? "border-amber-600 bg-amber-600" : "border-slate-300"
                                }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Shelter Type of Interest */}
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("Shelter Type of Interest", "Tipo de Refugio de Interés")}
                      </Label>
                      <select
                        value={shelterType}
                        onChange={(e) => setShelterType(e.target.value)}
                        className="mt-1.5 w-full h-11 rounded-xl bg-white border border-slate-300 px-3 text-xs font-semibold text-slate-900 focus:border-amber-600 focus:ring-amber-600"
                      >
                        <option value="In-Ground Prefabricated Storm Shelter">In-Ground Prefabricated Storm Shelter</option>
                        <option value="Custom Built Storm Shelter">Custom Built Storm Shelter</option>
                        <option value="Commercial Safe Room">Commercial Safe Room</option>
                        <option value="Not Sure – Please Advise">Not Sure – Please Advise</option>
                      </select>
                    </div>

                    {/* Property Type */}
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {t("Property Type", "Tipo de Propiedad")}
                      </Label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="mt-1.5 w-full h-11 rounded-xl bg-white border border-slate-300 px-3 text-xs font-semibold text-slate-900 focus:border-amber-600 focus:ring-amber-600"
                      >
                        <option value="Residential – Existing Home">Residential – Existing Home</option>
                        <option value="Residential – New Construction">Residential – New Construction</option>
                        <option value="Commercial / Business">Commercial / Business</option>
                        <option value="Community / Multi-Family">Community / Multi-Family</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Your Message */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                      4
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {t("Your Message & Details", "Su Mensaje y Detalles")}
                    </h3>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {t("Tell Us About Your Needs", "Cuéntenos Sobre Sus Necesidades")}
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder={t(
                        "Please provide details about your property, timeline, specific questions, or how we can assist you...",
                        "Proporcione detalles sobre su propiedad, plazos o preguntas específicas..."
                      )}
                      className="mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs rounded-xl focus:border-amber-600 focus:ring-amber-600"
                    />
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
                            className={`py-2 px-3.5 rounded-xl border text-xs font-bold transition cursor-pointer ${isSelected
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
                </div>

                {/* Submit Button & Disclaimer */}
                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-14 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm sm:text-base font-extrabold uppercase tracking-wider rounded-2xl shadow-lg shadow-amber-600/20 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      t("Sending Message...", "Enviando Mensaje...")
                    ) : (
                      <>
                        <span>{t("SEND MESSAGE", "ENVIAR MENSAJE")}</span>
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-[11px] text-slate-500 leading-relaxed max-w-2xl mx-auto">
                    {t(
                      "By submitting this form, you agree to be contacted by Southern Storm Shelters regarding your inquiry. We respect your privacy and will never share your information with third parties.",
                      "Al enviar este formulario, acepta ser contactado por Southern Storm Shelters sobre su consulta. Respetamos su privacidad y nunca compartiremos su información con terceros."
                    )}
                  </p>
                </div>

              </form>
            )}

          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHAT HAPPENS AFTER YOU CONTACT US? (5 STEPS) ─────── */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              <span>{t("Transparent Communication", "Comunicación Transparente")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("What Happens After You Contact Us?", "¿Qué Sucede Después de Contactarnos?")}
            </h2>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {t(
                "We believe in transparent, professional communication. Here's what you can expect from our team:",
                "Creemos en una comunicación transparente y profesional. Esto es lo que puede esperar de nuestro equipo:"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whatHappensSteps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-lg transition-all duration-300 shadow-xs group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-slate-300 group-hover:text-amber-600 transition-colors">
                        {st.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {st.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: WHY HOMEOWNERS ACROSS TENNESSEE TRUST US ──────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{t("Tennessee's Trusted Builders", "Constructores de Confianza en Tennessee")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("Why Homeowners Across Tennessee Trust Us", "¿Por Qué los Propietarios en Tennessee Confían en Nosotros?")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyTrustUsPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-slate-50/70 border border-slate-200 p-8 hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 shadow-xs"
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

      {/* ── SECTION 5: FREQUENTLY ASKED QUESTIONS ──────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>{t("Common Questions", "Preguntas Frecuentes")}</span>
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
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900 hover:text-amber-700 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-700" : ""
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 6: CONTACT INFORMATION SUMMARY & CTA ───────────────── */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12 shadow-md">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
                {t("Contact Information Summary", "Resumen de Información de Contacto")}
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Southern Storm Shelters
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
                {t("A Middle Tennessee Construction Company", "Empresa de Construcción de Middle Tennessee")}
              </p>
            </div>

            {/* Structured Contact Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs max-w-4xl mx-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-bold text-slate-500 w-1/3 sm:w-1/4">{t("Phone", "Teléfono")}</td>
                    <td className="p-4 font-extrabold text-slate-900">
                      <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-amber-700 hover:underline">
                        {SITE_CONFIG.phone}
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-bold text-slate-500">{t("Email", "Correo Electrónico")}</td>
                    <td className="p-4 font-semibold text-slate-900">
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-amber-700 hover:underline">
                        {SITE_CONFIG.email}
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-bold text-slate-500">{t("Address", "Dirección")}</td>
                    <td className="p-4 font-semibold text-slate-900">
                      {SITE_CONFIG.address}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-bold text-slate-500">{t("Hours", "Horario")}</td>
                    <td className="p-4 font-semibold text-slate-900">
                      {t(
                        SITE_CONFIG.operatingHours.scheduleText,
                        "Lunes a Viernes: 8:00 AM – 5:00 PM | Sábado: Con Cita | Domingo: Cerrado"
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors">
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

            {/* Ready to Get Started Callout */}
            <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 sm:p-10 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
              <div aria-hidden className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

              <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
                {t("Ready to Get Started?", "¿Listo Para Comenzar?")}
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed">
                {t(
                  `Schedule a comprehensive site evaluation with our construction specialists. Call us at ${SITE_CONFIG.phone} or request a detailed installation estimate online.`,
                  `Programe una evaluación detallada del terreno con nuestros especialistas en construcción. Llámenos al ${SITE_CONFIG.phone} o solicite un presupuesto en línea.`
                )}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl transition shadow-lg shadow-amber-600/30 text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t(`Call ${SITE_CONFIG.phone}`, `Llamar al ${SITE_CONFIG.phone}`)}</span>
                </a>
                <a
                  href="#contact-form"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition border border-white/20 text-sm sm:text-base"
                >
                  <span>{t("Fill Out Form", "Completar Formulario")}</span>
                </a>
              </div>

              <blockquote className="mt-8 border-t border-slate-700/80 pt-4 text-xs font-semibold italic text-slate-300">
                {t(
                  '"That\'s peace of mind, providing peace of mind for decades to come."',
                  '"Eso es tranquilidad, brindando tranquilidad para las próximas décadas."'
                )}
              </blockquote>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
