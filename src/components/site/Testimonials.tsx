import { useRef } from "react";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  "#dc2626", "#b91c1c", "#111722", "#0b0f15", "#d97706", "#475569", "#991b1b",
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i < count ? "fill-[#fbbf24] text-[#fbbf24]" : "fill-slate-200 text-slate-200"
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ review, isGrid = false }: { review: Review; isGrid?: boolean }) {
  return (
    <div className={cn(
      "relative bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-3 group transition-all duration-300 text-left",
      "shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(220,38,38,0.12)] hover:border-[#dc2626]/35",
      isGrid ? "w-full" : "flex-shrink-0 w-[340px] sm:w-[370px] mx-3"
    )}>

      {/* Top row: rating + verified badge */}
      <div className="flex items-center justify-between">
        <StarRating count={review.rating} />
        <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-[#dc2626] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
          <BadgeCheck className="w-3 h-3" />
          Verified Install
        </span>
      </div>

      {/* Quote icon + text */}
      <div className="relative">
        <Quote className="absolute -top-1 -left-0.5 w-6 h-6 text-[#dc2626]/15 fill-[#dc2626]/15" />
        <p className="text-slate-700 text-[13.5px] leading-relaxed font-medium pl-5 flex-1">
          {review.text}
        </p>
      </div>

      {/* Service tag */}
      {review.service && (
        <span className="self-start inline-flex items-center bg-red-50 border border-red-200 text-[#dc2626] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
          {review.service}
        </span>
      )}

      {/* Business reply */}
      {review.replyText && (
        <div className="mt-1 bg-red-50/60 border border-red-200/80 p-3 rounded-xl text-xs">
          <p className="font-extrabold text-[#dc2626] uppercase tracking-wider text-[9px] mb-1">
            Southern Storm Shelters Response
          </p>
          <p className="text-slate-700 font-medium leading-relaxed">"{review.replyText}"</p>
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 mt-auto">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-sm"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.initials}
        </div>
        <div>
          <p className="text-slate-900 font-extrabold text-sm leading-tight">{review.name}</p>
          <p className="text-slate-400 text-[11px] font-semibold mt-0.5">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  bgColor = "#F8FAFC",
}: {
  items: Review[];
  direction?: "left" | "right";
  bgColor?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const duplicated = [...items, ...items, ...items];
  const animClass = direction === "left" ? "marquee-track-left" : "marquee-track-right";

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
        className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10"
        style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10"
        style={{ background: `linear-gradient(to left, ${bgColor}, transparent)` }}
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
        "Having a certified underground storm shelter in our backyard gives our entire family complete peace of mind. The crew excavated, set the unit by crane, and backfilled all in one day with zero lawn damage.",
        "Tener un refugio subterráneo certificado en nuestro patio le da a toda nuestra familia total tranquilidad. El equipo excavó, instaló la unidad con grúa y rellenó todo en un solo día."
      ),
      name: "Marcus & Sarah H.",
      role: t("Homeowners · Franklin, TN", "Propietarios · Franklin, TN"),
      rating: 5,
      initials: "MH",
      avatarColor: avatarColors[0],
      service: t("Underground Shelter", "Refugio Subterráneo"),
      replyText: t("Thank you Marcus! Protecting Middle Tennessee families is our highest calling.", "¡Gracias Marcus! Proteger a las familias de Middle Tennessee es nuestra máxima vocación."),
    },
    {
      text: t(
        "When the tornado sirens blew through Murfreesboro last spring, stepping down into our Southern Storm Shelter was the greatest relief of my life. Solid steel, airtight seals, and emergency latching.",
        "Cuando sonaron las sirenas de tornado en Murfreesboro la primavera pasada, bajar a nuestro refugio de Southern Storm Shelters fue el mayor alivio de mi vida."
      ),
      name: "David K.",
      role: t("Homeowner · Murfreesboro, TN", "Propietario · Murfreesboro, TN"),
      rating: 5,
      initials: "DK",
      avatarColor: avatarColors[1],
      service: t("Residential Tornado Vault", "Bóveda Tornado Residencial"),
    },
    {
      text: t(
        "We needed an engineered storm shelter for our commercial depot just outside Nashville. Southern Storm Shelters handled engineering specs, permits, and heavy crane placement flawlessly.",
        "Necesitábamos un refugio contra tormentas con ingeniería certificada para nuestro depósito comercial en Nashville. Manejaron especificaciones, permisos y colocación de grúa a la perfección."
      ),
      name: "Brian T.",
      role: t("Facility Operations · Nashville, TN", "Operaciones de Instalación · Nashville, TN"),
      rating: 5,
      initials: "BT",
      avatarColor: avatarColors[2],
      service: t("Commercial Safe Room", "Sala Segura Comercial"),
    },
    {
      text: t(
        "Outstanding communication from the initial site evaluation to the final hydraulic hatch inspection. They explained soil grades, drainage, and FEMA P-320 standards clearly.",
        "Comunicación sobresaliente desde la evaluación inicial hasta la inspección final de la escotilla hidráulica. Explicaron la nivelación, drenaje y normas FEMA con claridad."
      ),
      name: "Elena R.",
      role: t("Homeowner · Hendersonville, TN", "Propietaria · Hendersonville, TN"),
      rating: 5,
      initials: "ER",
      avatarColor: avatarColors[4],
      service: t("Turnkey Installation", "Instalación Llave en Mano"),
    },
    {
      text: t(
        "Living in Tornado Alley here in Tennessee, this was the best investment we have ever made in our property. Professional, courteous, punctual, and genuine life-savers.",
        "Viviendo en el callejón de tornados aquí en Tennessee, esta fue la mejor inversión que hemos hecho en nuestra propiedad. Profesionales, puntuales y salvavidas reales."
      ),
      name: "James & Karen W.",
      role: t("Homeowners · Brentwood, TN", "Propietarios · Brentwood, TN"),
      rating: 5,
      initials: "JW",
      avatarColor: avatarColors[0],
      service: t("Family Safe Haven", "Refugio Seguro Familiar"),
    },
    {
      text: t(
        "We upgraded an aging shelter with a new reinforced steel entrance hatch and air filtration vents. Quick turnaround, clean welds, and incredible build quality.",
        "Actualizamos un refugio antiguo con una nueva escotilla de entrada de acero reforzado y respiraderos de filtración de aire. Excelente calidad de construcción."
      ),
      name: "Robert P.",
      role: t("Homeowner · Lebanon, TN", "Propietario · Lebanon, TN"),
      rating: 5,
      initials: "RP",
      avatarColor: avatarColors[5],
      service: t("Shelter Upgrade", "Mejora de Refugio"),
    },
    {
      text: t(
        "Our yard has dense clay and rock, but the excavation team brought the right heavy machinery and completed the precision excavation without disturbing our septic or utilities.",
        "Nuestro patio tiene arcilla densa y roca, pero el equipo de excavación trajo la maquinaria pesada adecuada y completó la excavación con precisión sin tocar servicios."
      ),
      name: "Patricia G.",
      role: t("Homeowner · Mount Juliet, TN", "Propietaria · Mount Juliet, TN"),
      rating: 5,
      initials: "PG",
      avatarColor: avatarColors[3],
      service: t("Site Preparation & Excavation", "Preparación y Excavación"),
    },
    {
      text: t(
        "From our first call to their 24/7 hotline to the day the crane lowered our vault into place, Southern Storm Shelters showed why they are the leaders in Tennessee storm protection.",
        "Desde nuestra primera llamada a su línea directa 24/7 hasta el día en que la grúa colocó nuestra bóveda, demostraron por qué son los líderes en protección contra tormentas en Tennessee."
      ),
      name: "Michael C.",
      role: t("Homeowner · Columbia, TN", "Propietario · Columbia, TN"),
      rating: 5,
      initials: "MC",
      avatarColor: avatarColors[6],
      service: t("Underground Vault", "Bóveda Subterránea"),
    },
  ];

  const row1 = reviews.slice(0, Math.ceil(reviews.length / 2));
  const row2 = reviews.slice(Math.ceil(reviews.length / 2));

  const sectionBg = "#F1F5F9";

  return (
    <section id="reviews" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden" style={{ background: sectionBg }}>

      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-red-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-amber-500/10 blur-[100px]" />

      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #dc2626 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-[90%] max-w-7xl text-center mb-8 sm:mb-14 relative z-10"
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white border border-red-200 rounded-full px-5 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#dc2626] mb-5 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
          {t("Client Reviews", "Opiniones de Clientes")}
          <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
        </div>

        <h2 className="text-[22px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-tight mt-0 sm:mt-[-8px] mb-[10px]">
          {t("Trusted to Protect ", "De Confianza para Proteger ")}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#b91c1c]">
            {t("What Matters Most", "Lo Que Más Importa")}
          </span>
        </h2>

        <p className={cn(
          "mx-auto max-w-xl text-slate-500 text-[14px] sm:text-[15px] leading-relaxed font-medium",
          isGrid ? "mb-0" : "mb-[-30px]"
        )}>
          {t("Real 5-star experiences from homeowners and businesses across Nashville, TN and our 100-mile service radius.", "Experiencias reales de 5 estrellas de propietarios y empresas en Nashville, TN y nuestro radio de 100 millas.")}
        </p>

        {/* Aggregate trust row */}
        {!isGrid && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex -space-x-2">
              {["MH","DK","BT","ER","JW"].map((init, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-md"
                  style={{ backgroundColor: avatarColors[i % avatarColors.length], zIndex: 5 - i }}
                >
                  {init}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />)}
                <span className="text-[13px] font-black text-slate-900 ml-1">5.0</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{t("200+ verified shelter installations", "200+ instalaciones verificadas")}</p>
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
        <div className="relative z-10 flex flex-col gap-4">
          <MarqueeRow items={row1} direction="left" bgColor={sectionBg} />
          <MarqueeRow items={row2} direction="right" bgColor={sectionBg} />
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
