import { useRef } from "react";
import { Star, Quote, BadgeCheck, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

interface Review {
  text: string;
  name: string;
  role: string;
  rating: number;
  initials: string;
  avatarColor: string;
  service?: string;
  replyText?: string;
}

const avatarColors = [
  "#1E3A8A",
  "#B45309",
  "#047857",
  "#475569",
  "#7C2D12",
  "#0D9488",
  "#1E293B",
  "#D97706",
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i < count
              ? "fill-[#FFD54F] text-[#FFD54F]"
              : "fill-white/15 text-white/15"
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  review,
  isGrid = false,
}: {
  review: Review;
  isGrid?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "relative bg-[#0e1624]/90 border border-white/[0.08] rounded-2xl p-4 sm:p-4.5 flex flex-col gap-2.5 group transition-all duration-300 text-left",
        "shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.12)] hover:border-amber-400/40 backdrop-blur-md",
        isGrid ? "w-full" : "flex-shrink-0 w-[320px] sm:w-[350px] mx-2.5"
      )}
    >
      {/* Top Specular Rim */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-amber-400/40 transition-colors pointer-events-none" />

      {/* Top row: rating + verified badge */}
      <div className="flex items-center justify-between">
        <StarRating count={review.rating} />
        <span className="inline-flex items-center gap-1 text-[8.5px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          <BadgeCheck className="w-3 h-3 text-emerald-400" />
          {t("Verified", "Verificado")}
        </span>
      </div>

      {/* Quote icon + text (compact height with line-clamp) */}
      <div className="relative">
        <Quote className="absolute -top-0.5 -left-0.5 w-5 h-5 text-amber-400/20 fill-amber-400/20" />
        <p className="text-slate-300 text-[12.5px] sm:text-[13px] leading-snug font-medium pl-5 line-clamp-3">
          {review.text}
        </p>
      </div>

      {/* Service tag */}
      {review.service && (
        <span className="self-start inline-flex items-center bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
          {review.service}
        </span>
      )}

      {/* Business reply (compact) */}
      {review.replyText && (
        <div className="bg-white/[0.03] border border-amber-500/20 p-2 sm:p-2.5 rounded-lg text-[11px] leading-tight">
          <p className="font-extrabold text-amber-400 uppercase tracking-wider text-[8.5px] mb-0.5">
            {t(
              "Southern Storm Shelters Response",
              "Respuesta de Southern Storm Shelters"
            )}
          </p>
          <p className="text-slate-300 font-medium line-clamp-2">
            "{review.replyText}"
          </p>
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/[0.07] mt-auto">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#FFD54F] text-[11px] font-black flex-shrink-0 shadow-sm border border-white/10"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="text-white font-extrabold text-[13px] sm:text-sm leading-tight truncate">
            {review.name}
          </p>
          <p className="text-slate-400 text-[10.5px] font-medium mt-0.5 truncate">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  bgColor = "#0b0f15",
}: {
  items: Review[];
  direction?: "left" | "right";
  bgColor?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const duplicated = [...items, ...items, ...items];
  const animClass =
    direction === "left" ? "marquee-track-left" : "marquee-track-right";

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
      }}
      onMouseLeave={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "running";
      }}
    >
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-28 z-10"
        style={{
          background: `linear-gradient(to right, ${bgColor}, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-28 z-10"
        style={{
          background: `linear-gradient(to left, ${bgColor}, transparent)`,
        }}
      />

      <div ref={trackRef} className={`flex ${animClass}`}>
        {duplicated.map((review, i) => (
          <TestimonialCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials({ isGrid = false }: { isGrid?: boolean }) {
  const { t } = useLanguage();

  const reviews: Review[] = [
    {
      text: t(
        "We got quotes from three different companies. Two were salespeople who subcontracted the work. Southern Storm Shelters showed up with their own crane crew, evaluated our soil, and explained every detail. Installed in under four hours, lawn left spotless.",
        "Pedimos cotizaciones a tres empresas. Dos eran vendedores que subcontrataban el trabajo. Southern Storm Shelters llegó con su cuadrilla y grúa propia, evaluaron el suelo e instalaron todo en cuatro horas dejando el césped impecable."
      ),
      name: "Michael R.",
      role: t("Homeowner · Franklin, TN", "Propietario · Franklin, TN"),
      rating: 5,
      initials: "MR",
      avatarColor: avatarColors[0],
      service: t(
        "Granger ISS In-Ground Shelter",
        "Refugio Subterráneo Granger ISS"
      ),
      replyText: t(
        "Thank you Michael! Our crew takes immense pride in turnkey, same-day crane installations. Stay safe!",
        "¡Gracias Michael! Nuestro equipo se enorgullece de las instalaciones con grúa en un solo día. ¡Cuídense!"
      ),
    },
    {
      text: t(
        "With three kids and aging parents living with us, we needed a shelter easy to enter. The articulating handrails and molded seating are game-changers. Even my father with mobility issues walked right in. Complete peace of mind.",
        "Con tres niños y abuelos en casa, necesitábamos un refugio de fácil acceso. Los pasamanos articulados y asientos moldeados fueron la clave. Toda la familia entra con facilidad y tranquilidad total."
      ),
      name: "Sarah & David T.",
      role: t("Homeowner · Murfreesboro, TN", "Propietarios · Murfreesboro, TN"),
      rating: 5,
      initials: "ST",
      avatarColor: avatarColors[1],
      service: t("Turnkey In-Ground Shelter", "Refugio Llave en Mano"),
      replyText: t(
        "We are honored to protect your family, Sarah & David. The Granger ISS accessibility was designed for exactly this.",
        "Es un honor proteger a su familia. La accesibilidad del Granger ISS fue diseñada justo para esto."
      ),
    },
    {
      text: t(
        "I'm a general contractor myself, so I am particular about site work. Southern Storm Shelters exceeded every standard. They understood laser grading, soil expansion, and drainage backfill. The reverse-taper anchoring design saved us concrete costs.",
        "Soy contratista general y muy exigente con la obra civil. Southern Storm Shelters superó todas mis expectativas. Dominan nivelación láser, expansión de suelo y drenaje. Excelente trabajo."
      ),
      name: "James K.",
      role: t(
        "Contractor & Homeowner · Nashville, TN",
        "Contratista y Propietario · Nashville, TN"
      ),
      rating: 5,
      initials: "JK",
      avatarColor: avatarColors[2],
      service: t(
        "Custom Color Door Install",
        "Puerta de Color Personalizada"
      ),
      replyText: t(
        "Appreciate the high praise from a fellow builder, James! Glad the color matches your outdoor space perfectly.",
        "¡Agradecemos el elogio de un colega constructor, James! Qué bueno que el color combinó con su espacio exterior."
      ),
    },
    {
      text: t(
        "We were building a new house in Brentwood and wanted the storm shelter set before final sod. Southern Storm Shelters coordinated with our builder, scheduled the crane lift without delay, and completed everything seamlessly. The LED light is top-tier.",
        "Estábamos construyendo nuestra casa en Brentwood y queríamos instalar el refugio antes del césped final. Coordinaron con nuestro constructor y la grúa sin demoras. Excelente iluminación LED interior."
      ),
      name: "Emily W.",
      role: t("Homeowner · Brentwood, TN", "Propietaria · Brentwood, TN"),
      rating: 5,
      initials: "EW",
      avatarColor: avatarColors[3],
      service: t(
        "New Construction Placement",
        "Colocación en Nueva Construcción"
      ),
    },
    {
      text: t(
        "After the severe tornado warnings in Middle Tennessee last spring, we couldn't wait any longer. They responded in 24 hours, did a free site evaluation that week, and gave a transparent quote with zero surprise fees. Lifetime warranty sealed the deal.",
        "Tras las alertas de tornado en Middle Tennessee la primavera pasada, no pudimos esperar más. Respondieron en 24 horas, evaluaron el terreno y dieron una cotización transparente. La garantía de por vida nos convenció."
      ),
      name: "Robert & Linda M.",
      role: t("Homeowner · Spring Hill, TN", "Propietarios · Spring Hill, TN"),
      rating: 5,
      initials: "RM",
      avatarColor: avatarColors[4],
      service: t("Underground Shelter", "Refugio Subterráneo"),
      replyText: t(
        "Thank you Robert & Linda. The lifetime warranty ensures your family stays protected for decades to come.",
        "Gracias Robert y Linda. La garantía de por vida asegura que su familia estará protegida durante décadas."
      ),
    },
    {
      text: t(
        "They explained the FEMA 320 and 361 testing certificates and showed us how the multi-point locking system operates. The gas-assisted shock lid makes opening the heavy door effortless even for my teenage daughter. Truly professional.",
        "Nos explicaron los certificados FEMA 320 y 361 y nos enseñaron el sistema de bloqueo multipunto. La tapa con pistones de gas permite abrirla sin esfuerzo. Verdaderos profesionales."
      ),
      name: "Angela P.",
      role: t("Homeowner · Columbia, TN", "Propietaria · Columbia, TN"),
      rating: 5,
      initials: "AP",
      avatarColor: avatarColors[5],
      service: t(
        "FEMA Rated Installation",
        "Instalación Certificada FEMA"
      ),
    },
    {
      text: t(
        "What impressed me most was the follow-up. Two weeks after crane installation, they called to confirm everything was settling cleanly and that we had zero concerns. That level of personal accountability is rare. Recommended them to both my neighbors.",
        "Lo que más me impresionó fue el seguimiento. Dos semanas después de la instalación nos llamaron para verificar que todo estuviera perfecto. Ya los recomendé a dos vecinos."
      ),
      name: "Thomas H.",
      role: t("Homeowner · Hendersonville, TN", "Propietario · Hendersonville, TN"),
      rating: 5,
      initials: "TH",
      avatarColor: avatarColors[6],
      service: t(
        "Crane Placement & Backfill",
        "Colocación con Grúa y Relleno"
      ),
      replyText: t(
        "Neighbor recommendations mean the world to us, Thomas! We take care of our Middle Tennessee community.",
        "¡Las recomendaciones de vecinos significan mucho para nosotros! Cuidamos a nuestra comunidad."
      ),
    },
    {
      text: t(
        "We looked at above-ground steel safe rooms, but in-ground Granger ISS was hands-down the superior choice for our open acreage. Double-wall foam construction stays dry in wet clay, never sweats, and the molded bench seating is super comfortable.",
        "Evaluamos cuartos seguros sobre suelo, pero el Granger ISS subterráneo fue la mejor opción para nuestro terreno. La doble pared con espuma nunca suda en arcilla húmeda y los asientos son comodísimos."
      ),
      name: "Karen & Steve B.",
      role: t("Homeowner · Gallatin, TN", "Propietarios · Gallatin, TN"),
      rating: 5,
      initials: "KB",
      avatarColor: avatarColors[7],
      service: t(
        "Double-Wall Granger ISS",
        "Granger ISS de Doble Pared"
      ),
    },
    {
      text: t(
        "I watched the entire crane excavation and installation process from my porch. These guys are true machinery experts. Checked utilities, verified runoff slope, and had the shelter level to the millimeter before compacting backfill.",
        "Vi todo el proceso de excavación e instalación desde mi porche. Son auténticos expertos en maquinaria. Verificaron servicios subterráneos, pendiente de drenaje y nivelaron al milímetro."
      ),
      name: "Daniel F.",
      role: t("Homeowner · Mount Juliet, TN", "Propietario · Mount Juliet, TN"),
      rating: 5,
      initials: "DF",
      avatarColor: avatarColors[1],
      service: t(
        "Laser-Graded Installation",
        "Instalación con Nivelación Láser"
      ),
    },
    {
      text: t(
        "From free quote to full crane installation in under two weeks. The custom forest green door lid blends directly into our backyard lawn. You barely notice it until severe weather sirens go off. Five stars across the board!",
        "Desde la cotización gratuita hasta la instalación completa en menos de dos semanas. La tapa verde bosque se camufla con el césped. ¡Cinco estrellas en todo!"
      ),
      name: "Patricia L.",
      role: t("Homeowner · Nolensville, TN", "Propietaria · Nolensville, TN"),
      rating: 5,
      initials: "PL",
      avatarColor: avatarColors[2],
      service: t(
        "Custom Green Door Shelter",
        "Refugio con Tapa Verde Personalizada"
      ),
      replyText: t(
        "Thank you Patricia! Blending life-saving protection seamlessly into Tennessee yards is our specialty.",
        "¡Gracias Patricia! Integrar protección de vida discretamente en los patios de Tennessee es nuestra especialidad."
      ),
    },
  ];

  const row1 = reviews.slice(0, Math.ceil(reviews.length / 2));
  const row2 = reviews.slice(Math.ceil(reviews.length / 2));

  const sectionBg = "#0b0f15";

  return (
    <section
      id="testimonials"
      className="relative py-[60px] overflow-hidden border-y border-white/10"
      style={{
        background: sectionBg,
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-amber-500/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[450px] h-[300px] rounded-full bg-amber-400/[0.05] blur-[120px]" />

      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-[90%] max-w-7xl text-center mb-8 sm:mb-12 relative z-10"
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-amber-500/30 rounded-full px-5 py-1.5 text-[11px] font-black uppercase tracking-widest text-amber-300 mb-5 shadow-[0_0_15px_rgba(245,158,11,0.08)]">
          <Star className="w-3.5 h-3.5 fill-[#FFD54F] text-[#FFD54F]" />
          {t("Client Reviews", "Opiniones de Clientes")}
          <Star className="w-3.5 h-3.5 fill-[#FFD54F] text-[#FFD54F]" />
        </div>

        <h2 className="text-[22px] sm:text-[32px] lg:text-[40px] font-black text-white tracking-tight leading-tight mt-0 sm:mt-[-8px] mb-[10px]">
          {t("What Our ", "Lo Que Dicen ")}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
            {t("Customers Say", "Nuestros Clientes")}
          </span>
        </h2>

        <p
          className={cn(
            "mx-auto max-w-xl text-slate-400 text-[14px] sm:text-[15px] leading-relaxed font-normal",
            isGrid ? "mb-0" : "mb-[-24px]"
          )}
        >
          {t(
            "Real 5-star experiences from homeowners and builders across Middle Tennessee and a 100-mile radius.",
            "Experiencias reales de propietarios y constructores en Middle Tennessee y un radio de 100 millas."
          )}
        </p>

        {/* Aggregate trust row */}
        {!isGrid && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex -space-x-2">
              {["MR", "ST", "JK", "EW", "RM"].map((init, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0b0f15] flex items-center justify-center text-[10px] font-black text-[#FFD54F] shadow-md"
                  style={{
                    backgroundColor: avatarColors[i % avatarColors.length],
                    zIndex: 5 - i,
                  }}
                >
                  {init}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-[#FFD54F] text-[#FFD54F]"
                  />
                ))}
                <span className="text-[13px] font-black text-white ml-1">
                  5.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {t("140+ verified reviews", "140+ reseñas verificadas")}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Grid or Marquee View */}
      {isGrid ? (
        <div className="mx-auto w-[90%] max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <TestimonialCard review={review} isGrid />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="relative z-10 flex flex-col gap-3.5">
          <MarqueeRow items={row1} direction="left" bgColor={sectionBg} />
          <MarqueeRow items={row2} direction="right" bgColor={sectionBg} />
        </div>
      )}

      {/* Bottom Actions Bar */}
      {!isGrid && (
        <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 px-4">
          <Link
            to="/reviews"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
          >
            <span>
              {t("Read All 140+ Client Reviews", "Ver Todas las 140+ Reseñas")}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/free-quote"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-amber-400/40 text-white hover:text-amber-300 font-black text-xs uppercase tracking-widest px-7 py-3.5 rounded-xl backdrop-blur-md shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
          >
            <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>
              {t("Request On-Site Estimate", "Solicitar Estimación")}
            </span>
          </Link>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          animation: marquee-left 38s linear infinite;
          width: max-content;
        }
        .marquee-track-right {
          animation: marquee-right 38s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
