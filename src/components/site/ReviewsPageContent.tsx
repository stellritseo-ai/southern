import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  CheckCircle2,
  ShieldCheck,
  Award,
  HardHat,
  Shield,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Send,
  MessageSquarePlus,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { addWebEmail } from "@/lib/leads-store";

export function ReviewsPageContent() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const reviewsList = [
    {
      name: "Michael R.",
      location: "Franklin, TN",
      installed: t("Granger ISS In-Ground Shelter", "Refugio Subterráneo Granger ISS"),
      headline: t("Finally, a company that actually knows how to install a shelter.", "Por fin, una empresa que realmente sabe cómo instalar un refugio."),
      review: t(
        "We got quotes from three different companies. Two of them were just dealers who subcontracted the work. Southern Storm Shelters was different—they showed up with their own equipment, evaluated our soil, and explained exactly what they were doing. The installation took less than four hours, and the site was left spotless. You can tell they're construction professionals, not just salespeople.",
        "Pedimos cotizaciones a tres empresas diferentes. Dos eran simples distribuidores que subcontrataban el trabajo. Southern Storm Shelters fue diferente: llegaron con su propia maquinaria, evaluaron nuestro suelo y nos explicaron todo con detalle. La instalación tomó menos de cuatro horas y dejaron el lugar impecable. Se nota que son profesionales de la construcción, no simples vendedores."
      ),
      stars: 5,
    },
    {
      name: "Sarah & David T.",
      location: "Murfreesboro, TN",
      installed: t("Granger ISS In-Ground Shelter", "Refugio Subterráneo Granger ISS"),
      headline: t("Peace of mind for our family of six.", "Tranquilidad para nuestra familia de seis."),
      review: t(
        "With three kids and aging parents living with us, we needed a shelter that was easy to access for everyone. The articulating handrails and molded-in seating were game-changers. Even my father, who has mobility issues, can get in and out without difficulty. The team at Southern Storm Shelters was patient, professional, and answered every question we had. We finally feel prepared.",
        "Con tres niños y padres mayores viviendo con nosotros, necesitábamos un refugio de fácil acceso para todos. Los pasamanos articulados y los asientos moldeados marcaron la diferencia. Incluso mi padre, que tiene problemas de movilidad, puede entrar y salir sin dificultad. El equipo fue paciente, profesional y respondió todas nuestras dudas."
      ),
      stars: 5,
    },
    {
      name: "James K.",
      location: "Nashville, TN",
      installed: t("Granger ISS Custom Color Door", "Puerta de Color Personalizado Granger ISS"),
      headline: t("The installation was flawless.", "La instalación fue impecable."),
      review: t(
        "I'm a contractor myself, so I'm particular about workmanship. Southern Storm Shelters exceeded my expectations. They understood drainage, soil conditions, and proper backfill. The reverse taper design meant no concrete anchoring was needed, which saved us money. The door color matches our landscaping perfectly. Highly recommend.",
        "Soy contratista, así que soy muy exigente con la mano de obra. Southern Storm Shelters superó mis expectativas. Entendieron el drenaje, el suelo y el relleno adecuado. El diseño cónico inverso evitó anclajes de concreto innecesarios, lo que nos ahorró dinero. El color de la puerta combina perfecto con el jardín."
      ),
      stars: 5,
    },
    {
      name: "Emily W.",
      location: "Brentwood, TN",
      installed: t("Granger ISS During New Construction", "Granger ISS Durante Nueva Construcción"),
      headline: t("They handled everything from start to finish.", "Manejaron todo de principio a fin."),
      review: t(
        "We were building a new home and wanted the shelter installed during construction. Southern Storm Shelters coordinated with our builder, scheduled the excavation perfectly, and integrated the shelter seamlessly into our plans. No hassle, no delays. The LED light inside is a nice touch, too.",
        "Estábamos construyendo una casa nueva y queríamos el refugio instalado durante la obra. Coordinaron perfectamente con nuestro constructor, programaron la excavación y lo integraron sin problemas. Cero complicaciones y sin retrasos. La luz LED interior también es un gran detalle."
      ),
      stars: 5,
    },
    {
      name: "Robert & Linda M.",
      location: "Spring Hill, TN",
      installed: t("Granger ISS In-Ground Shelter", "Refugio Subterráneo Granger ISS"),
      headline: t("Worth every penny for the peace of mind.", "Vale cada centavo por la tranquilidad."),
      review: t(
        "After the tornado warnings we had last spring, we decided we couldn't wait any longer. Southern Storm Shelters responded to our inquiry within 24 hours and scheduled a site evaluation that same week. The quote was transparent with no hidden fees. The installation was quick, and the lifetime warranty sealed the deal. We sleep better at night now.",
        "Después de las alertas de tornado de la primavera pasada, decidimos no esperar más. Respondieron en 24 horas y programaron la visita esa misma semana. La cotización fue clara y sin sorpresas. La instalación fue rápida y la garantía de por vida nos dio total seguridad. Ahora dormimos tranquilos."
      ),
      stars: 5,
    },
    {
      name: "Angela P.",
      location: "Columbia, TN",
      installed: t("Granger ISS In-Ground Shelter", "Refugio Subterráneo Granger ISS"),
      headline: t("Professional, punctual, and knowledgeable.", "Profesionales, puntuales y con gran conocimiento."),
      review: t(
        "From the first phone call to the final walkthrough, the team at Southern Storm Shelters was professional and courteous. They explained the FEMA 320 and FEMA 361 testing, showed us the triple locking system, and made sure we understood how to operate everything. The gas-assisted shocks make opening the heavy door easy. We couldn't be happier.",
        "Desde la primera llamada hasta la revisión final, el equipo fue profesional y cortés. Nos explicaron las pruebas FEMA 320 y 361, nos enseñaron el sistema de triple cerrojo y cómo operar todo. Los amortiguadores a gas hacen que abrir la puerta pesada sea sumamente fácil."
      ),
      stars: 5,
    },
    {
      name: "Thomas H.",
      location: "Hendersonville, TN",
      installed: t("Granger ISS In-Ground Shelter", "Refugio Subterráneo Granger ISS"),
      headline: t("They truly care about their customers.", "Realmente se preocupan por sus clientes."),
      review: t(
        "What impressed me most was the follow-up. A few weeks after installation, they called to make sure everything was working properly and that we had no questions. That level of customer service is rare these days. I've already recommended them to two neighbors.",
        "Lo que más me impresionó fue el seguimiento posterior. Semanas después de la instalación, nos llamaron para verificar que todo estuviera en orden y que no tuviéramos dudas. Ese nivel de atención al cliente es poco común hoy en día. Ya los he recomendado a dos vecinos."
      ),
      stars: 5,
    },
    {
      name: "Karen & Steve B.",
      location: "Gallatin, TN",
      installed: t("Granger ISS In-Ground Shelter", "Refugio Subterráneo Granger ISS"),
      headline: t("The best investment we've made for our home.", "La mejor inversión que hemos hecho en nuestro hogar."),
      review: t(
        "We considered an above-ground safe room, but after talking with Southern Storm Shelters, we realized an underground shelter was the better option for our property. The double-wall foam-filled construction keeps it dry and comfortable. The molded-in seating means we can wait out a storm in relative comfort. Installation was fast, and the team was fantastic.",
        "Consideramos un cuarto seguro sobre el suelo, pero al hablar con ellos nos dimos cuenta de que el refugio subterráneo era superior para nuestro terreno. La construcción de doble pared con espuma lo mantiene seco y cómodo. Los asientos moldeados permiten esperar la tormenta con comodidad."
      ),
      stars: 5,
    },
    {
      name: "Daniel F.",
      location: "Mount Juliet, TN",
      installed: t("Granger ISS In-Ground Shelter", "Refugio Subterráneo Granger ISS"),
      headline: t("Impressed with their construction expertise.", "Impresionado con su experiencia en construcción."),
      review: t(
        "I watched the entire installation. These guys know what they're doing. They checked for buried utilities, assessed drainage, and made sure the shelter was perfectly level before backfilling. The reverse taper design is brilliant—no concrete needed, no risk of floating. This is how it should be done.",
        "Observé toda la instalación. Estos muchachos realmente saben lo que hacen. Verificaron tuberías y cables subterráneos, evaluaron el drenaje y nivelaron el refugio con precisión antes de rellenar. El diseño cónico invertido es brillante: sin concreto y sin riesgo de flotación."
      ),
      stars: 5,
    },
    {
      name: "Patricia L.",
      location: "Nolensville, TN",
      installed: t("Granger ISS Custom Green Door", "Puerta Verde Personalizada Granger ISS"),
      headline: t("From quote to installation in under two weeks.", "De la cotización a la instalación en menos de dos semanas."),
      review: t(
        "We were on a tight timeline before storm season. Southern Storm Shelters moved quickly without cutting corners. The estimate was detailed and fair, the scheduling was easy, and the installation was completed in a single morning. The custom green door blends right into our lawn. You can barely tell it's there—until you need it.",
        "Teníamos poco tiempo antes de la temporada de tormentas. Avanzaron rápido sin recortar calidad. El presupuesto fue detallado y justo, la coordinación sencilla y la instalación se completó en una sola mañana. La puerta verde personalizada se camufla con el césped. Apenas se nota, hasta que la necesitas."
      ),
      stars: 5,
    },
  ];

  const whyChooseUsPoints = [
    {
      title: t("We Are Builders, Not Just Dealers", "Somos Constructores, No Simples Distribuidores"),
      desc: t(
        "Our customers consistently tell us that our construction expertise sets us apart. We don't just drop off a box—we evaluate your property, engineer the installation, and handle every detail from excavation to final grading.",
        "Nuestros clientes destacan nuestra experiencia en construcción. No dejamos una caja en su patio: evaluamos su propiedad, diseñamos la instalación y ejecutamos cada detalle desde la excavación hasta la nivelación final."
      ),
      icon: HardHat,
    },
    {
      title: t("Industry-Leading Products", "Productos Líderes en la Industria"),
      desc: t(
        "We install the Granger ISS, manufactured by Granger Plastics Company—an internationally recognized rotational molding leader with over 30 years of experience. Our customers love the patented Reverse Taper Design, double-wall foam-filled construction, and the peace of mind that comes with a lifetime warranty.",
        "Instalamos el Granger ISS, fabricado por Granger Plastics Company con más de 30 años de experiencia. A nuestros clientes les encanta el diseño cónico inverso patentado, la estructura de doble pared con espuma y la garantía de por vida."
      ),
      icon: Shield,
    },
    {
      title: t("Local Expertise", "Experiencia Local en Middle Tennessee"),
      desc: t(
        "We understand Middle Tennessee soil, water tables, and weather patterns. Our installations are tailored to the specific geological conditions of your property—not a one-size-fits-all approach.",
        "Entendemos los suelos de Middle Tennessee, mantos freáticos y patrones meteorológicos. Nuestras instalaciones se adaptan a las condiciones geológicas exactas de su propiedad, sin soluciones genéricas."
      ),
      icon: MapPin,
    },
    {
      title: t("Lifetime Peace of Mind", "Tranquilidad de Por Vida"),
      desc: t(
        "Every shelter we install is backed by a limited lifetime warranty on the body of the unit against cracking, rusting, rotting, or floating out of the ground. The door is also protected by a lifetime warranty.",
        "Cada refugio cuenta con garantía limitada de por vida contra agrietamiento, oxidación, descomposición o flotación. La puerta también está protegida con garantía de por vida."
      ),
      icon: Award,
    },
  ];

  const valueMatrix = [
    {
      value: t("Construction Expertise", "Experiencia en Construcción"),
      deliver: t("We are builders, not just dealers—we handle excavation, installation, and site work ourselves", "Somos constructores, no simples distribuidores: realizamos la excavación, instalación y obra civil nosotros mismos"),
    },
    {
      value: t("Quality Products", "Productos de Calidad"),
      deliver: t("We install the Granger ISS, backed by a limited lifetime warranty", "Instalamos el Granger ISS, respaldado por una garantía limitada de por vida"),
    },
    {
      value: t("Transparent Pricing", "Precios Transparentes"),
      deliver: t("Free estimates with no hidden fees", "Presupuestos gratuitos sin cargos ocultos ni sorpresas"),
    },
    {
      value: t("Fast Installation", "Instalación Rápida"),
      deliver: t("Most installations completed in 4 hours or less", "La mayoría de las instalaciones se completan en 4 horas o menos"),
    },
    {
      value: t("Local Knowledge", "Conocimiento Local"),
      deliver: t("We understand Middle Tennessee soil and weather", "Comprendemos la geología y el clima de Middle Tennessee"),
    },
    {
      value: t("Customer Service", "Servicio al Cliente"),
      deliver: t("We respond within 24 hours and follow up after installation", "Respondemos en 24 horas y realizamos seguimiento después de la instalación"),
    },
  ];

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const name = (form.querySelector("#reviewerName") as HTMLInputElement)?.value || "";
    const city = (form.querySelector("#reviewerCity") as HTMLInputElement)?.value || "";
    const text = (form.querySelector("#reviewerText") as HTMLTextAreaElement)?.value || "";

    try {
      await addWebEmail({
        name,
        phone: "N/A (Review Submission)",
        email: "reviews@southernstormshelters.com",
        service: "Customer Review Submission",
        message: `Customer Review from ${name} (${city}):\nRating: ${rating} Stars\n\nReview:\n${text}`,
        source: "Reviews Page Modal",
      });

      toast.success(
        t(
          "Thank you for sharing your experience! Your review has been submitted for verification.",
          "¡Gracias por compartir su experiencia! Su reseña ha sido enviada para verificación."
        )
      );
      setModalOpen(false);
    } catch (err) {
      console.error("Review submission error:", err);
      toast.error(t("Submission error. Please try again.", "Error de envío. Intente nuevamente."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-slate-900 overflow-hidden selection:bg-red-600 selection:text-white">

      {/* ── SECTION 1: WHY OUR CUSTOMERS CHOOSE US ─────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div aria-hidden className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{t("5-Star Reputation", "Reputación 5 Estrellas")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("Why Our Customers Choose Southern Storm Shelters", "¿Por Qué Nuestros Clientes Eligen Southern Storm Shelters?")}
            </h2>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {t(
                "When severe weather strikes, there's no room for doubt. Your storm shelter must perform flawlessly. Read what our customers have to say about their experience—from the first consultation to the final installation.",
                "Cuando el clima severo azota, no hay lugar para dudas. Su refugio debe funcionar a la perfección. Lea lo que dicen nuestros clientes sobre su experiencia, desde la primera consulta hasta la instalación final."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white border border-slate-200 p-7 flex flex-col justify-between hover:border-red-500/40 hover:shadow-xl transition-all duration-300 shadow-xs group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: 10 CUSTOMER REVIEWS (GRID) ───────────────────────── */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-widest mb-3">
              <Quote className="w-3.5 h-3.5 text-red-600" />
              <span>{t("Verified Testimonials", "Testimonios Verificados")}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("What Our Customers Are Saying", "Lo Que Dicen Nuestros Clientes")}
            </h2>

            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {t(
                "Real stories from families, contractors, and homeowners across Nashville, Franklin, and Middle Tennessee.",
                "Historias reales de familias, contratistas y propietarios en Nashville, Franklin y Middle Tennessee."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsList.map((rev, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-slate-50/70 border border-slate-200 p-7 sm:p-8 flex flex-col justify-between hover:border-red-500/40 hover:shadow-lg transition-all duration-300 shadow-xs relative"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Headline */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-3 leading-snug">
                    "{rev.headline}"
                  </h3>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    "{rev.review}"
                  </p>
                </div>

                {/* Reviewer Metadata */}
                <div className="pt-4 border-t border-slate-200/80 flex flex-col gap-1">
                  <div className="text-xs font-extrabold text-slate-900">
                    — {rev.name}, <span className="text-slate-500 font-semibold">{rev.location}</span>
                  </div>
                  <div className="text-[11px] font-bold text-red-600 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>{t("Installed", "Instalado")}: {rev.installed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Share Your Experience Callout */}
          <div className="mt-14 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
            <div aria-hidden className="absolute -right-10 -bottom-10 w-60 h-60 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
              {t("Share Your Experience", "Comparta Su Experiencia")}
            </h3>
            
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
              {t(
                "Have you recently had a shelter installed by Southern Storm Shelters? We'd love to hear about your experience! Your feedback helps us continue to improve and helps other families make informed decisions about their safety.",
                "¿Le instalamos recientemente un refugio? ¡Nos encantaría conocer su experiencia! Sus comentarios nos ayudan a seguir mejorando y orientan a otras familias para protegerse."
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={() => setModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/30 text-sm cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4 mr-2" />
                <span>{t("LEAVE A REVIEW", "DEJAR UNA RESEÑA")}</span>
              </Button>
              
              <a
                href="mailto:admin@nashvillesiteworks.com"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl border border-white/20 text-sm transition"
              >
                <Mail className="w-4 h-4" />
                <span>{t("Email Us Directly", "Escribir por Correo")}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 3: WHY REVIEWS MATTER (VALUE TABLE) ────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-red-700 bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
              {t("Why Reviews Matter", "¿Por Qué Importan las Reseñas?")}
            </span>

            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-[1.22]">
              {t("Transparency & Peace of Mind", "Transparencia y Tranquilidad")}
            </h2>

            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {t(
                "When it comes to protecting your family, you shouldn't have to guess whether a company will deliver. Reviews from real customers provide transparency and peace of mind.",
                "Al proteger a su familia, no debería adivinar si una empresa cumplirá. Las opiniones de clientes reales brindan total certidumbre."
              )}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-xs">
                  <th className="p-4 sm:p-5 w-1/3 sm:w-1/4">{t("What Customers Value", "Lo Que Valoran los Clientes")}</th>
                  <th className="p-4 sm:p-5">{t("How We Deliver", "Cómo Cumplimos Nosotros")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {valueMatrix.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{row.value}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-700 font-medium leading-relaxed">
                      {row.deliver}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: READY TO JOIN OUR FAMILY CTA ─────────────────────── */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-3xl bg-gradient-to-r from-red-600 via-red-600 to-amber-600 text-white p-8 sm:p-14 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            <div aria-hidden className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              {t("Ready to Join Our Family of Satisfied Customers?", "¿Listo Para Unirse a Nuestra Familia de Clientes Satisfechos?")}
            </h2>

            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
              {t(
                "Don't wait for the warning sirens. The best and smartest thing you can do for yourself and your family is to be prepared. Contact us today to schedule your free consultation and site evaluation.",
                "No espere a que suenen las sirenas. Lo más inteligente para su familia es estar preparado. Contáctenos hoy para programar su consulta y evaluación gratuita en el terreno."
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

      {/* ── SECTION 5: CONTACT INFORMATION SUMMARY ─────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-md max-w-4xl mx-auto">
            
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

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-white transition-colors">
                    <td className="p-4 font-bold text-slate-500 w-1/3 sm:w-1/4">{t("Phone", "Teléfono")}</td>
                    <td className="p-4 font-extrabold text-slate-900">
                      <a href="tel:6159912381" className="text-red-600 hover:underline">
                        (615) 991-2381
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="p-4 font-bold text-slate-500">{t("Email", "Correo Electrónico")}</td>
                    <td className="p-4 font-semibold text-slate-900">
                      <a href="mailto:admin@nashvillesiteworks.com" className="text-red-600 hover:underline">
                        admin@nashvillesiteworks.com
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="p-4 font-bold text-slate-500">{t("Address", "Dirección")}</td>
                    <td className="p-4 font-semibold text-slate-900">
                      2000 Meridian Blvd, Suite 200, Franklin, TN 37067
                    </td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="p-4 font-bold text-slate-500">{t("Hours", "Horario")}</td>
                    <td className="p-4 font-semibold text-slate-900">
                      {t(
                        "Monday–Friday: 8:00 AM – 5:00 PM | Saturday: By Appointment | Sunday: Closed",
                        "Lunes a Viernes: 8:00 AM – 5:00 PM | Sábado: Con Cita | Domingo: Cerrado"
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
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

      {/* ── MODAL: SUBMIT A REVIEW ─────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-lg w-full relative"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              {t("Share Your Experience", "Comparta Su Experiencia")}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {t(
                "Your feedback helps other Tennessee families make informed safety decisions.",
                "Sus comentarios orientan a otras familias de Tennessee."
              )}
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <Label htmlFor="reviewerName" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t("Your Name *", "Su Nombre *")}
                </Label>
                <Input
                  id="reviewerName"
                  required
                  placeholder={t("e.g. John Miller", "ej. Juan Pérez")}
                  className="mt-1 bg-white border-slate-300 text-slate-900 h-10 text-xs rounded-xl focus:border-red-600 focus:ring-red-600"
                />
              </div>

              <div>
                <Label htmlFor="reviewerCity" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t("City, State *", "Ciudad, Estado *")}
                </Label>
                <Input
                  id="reviewerCity"
                  required
                  placeholder="Franklin, TN"
                  className="mt-1 bg-white border-slate-300 text-slate-900 h-10 text-xs rounded-xl focus:border-red-600 focus:ring-red-600"
                />
              </div>

              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t("Star Rating *", "Calificación *")}
                </Label>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-hidden transition"
                    >
                      <Star
                        className={`w-6 h-6 cursor-pointer ${
                          (hoverRating !== null ? star <= hoverRating : star <= rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-700">
                    {rating} / 5 {t("Stars", "Estrellas")}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="reviewerText" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t("Review Text *", "Texto de la Reseña *")}
                </Label>
                <Textarea
                  id="reviewerText"
                  required
                  rows={4}
                  placeholder={t(
                    "Tell us about the installation, customer service, and how you feel about your shelter...",
                    "Cuéntenos sobre la instalación, atención al cliente y su refugio..."
                  )}
                  className="mt-1 bg-white border-slate-300 text-slate-900 text-xs rounded-xl focus:border-red-600 focus:ring-red-600"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="permission"
                  required
                  defaultChecked
                  className="mt-0.5 rounded border-slate-300 text-red-600 focus:ring-red-600"
                />
                <label htmlFor="permission" className="text-[11px] text-slate-600 leading-tight">
                  {t(
                    "I give permission for Southern Storm Shelters to publish this review on their website.",
                    "Doy permiso a Southern Storm Shelters para publicar esta reseña en su sitio web."
                  )}
                </label>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-extrabold uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/20 text-xs mt-2 cursor-pointer"
              >
                {submitting ? t("Submitting...", "Enviando...") : t("SUBMIT REVIEW", "PUBLICAR RESEÑA")}
              </Button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
