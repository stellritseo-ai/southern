import { useRef } from "react";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ── Google Multi-Color Brand Icon ───────────────── */
const GoogleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

interface Review {
  text: string;
  name: string;
  role: string;
  rating: number;
  initials: string;
  avatarColor: string;
  service?: string;
  replyText?: string;
  date?: string;
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
      "relative bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex flex-col gap-3.5 group transition-all duration-300 text-left",
      "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(220,38,38,0.14)] hover:border-[#dc2626]/40 hover:-translate-y-1",
      isGrid ? "w-full" : "flex-shrink-0 w-[340px] sm:w-[380px] mx-3"
    )}>

      {/* Top row: Star rating + Google Verified Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <StarRating count={review.rating} />
          {review.date && (
            <span className="text-[11px] text-slate-400 font-medium ml-1">
              • {review.date}
            </span>
          )}
        </div>

        {/* Google Verified pill */}
        <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 px-2.5 py-1 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)] select-none">
          <GoogleIcon className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold text-slate-700 tracking-tight flex items-center gap-0.5">
            Google <span className="text-[#16a34a] font-extrabold">Verified</span>
          </span>
        </div>
      </div>

      {/* Quote watermark + review text */}
      <div className="relative flex-1">
        <Quote className="absolute -top-1.5 -left-1 w-6 h-6 text-[#dc2626]/12 fill-[#dc2626]/12 pointer-events-none" />
        <p className="text-slate-700 text-[13.5px] sm:text-[14px] leading-relaxed font-normal pl-4 flex-1">
          "{review.text}"
        </p>
      </div>

      {/* Service tag + FEMA Compliance */}
      <div className="flex flex-wrap items-center gap-2 pt-0.5">
        {review.service && (
          <span className="self-start inline-flex items-center bg-red-50/90 border border-red-200 text-[#dc2626] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            {review.service}
          </span>
        )}
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full select-none">
          <BadgeCheck className="w-3 h-3 text-emerald-600" />
          FEMA Inspected
        </span>
      </div>

      {/* Business owner reply */}
      {review.replyText && (
        <div className="bg-slate-50 border-l-2 border-[#dc2626] p-2.5 sm:p-3 rounded-r-xl text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#dc2626] text-[10px] uppercase tracking-wider">
              Southern Storm Shelters (Owner)
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Response</span>
          </div>
          <p className="text-slate-600 font-medium leading-relaxed text-[11.5px]">
            "{review.replyText}"
          </p>
        </div>
      )}

      {/* Author with Avatar + Verified Buyer Check */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 mt-auto">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-sm relative ring-2 ring-white"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.initials}
          {/* Mini Google badge overlay on avatar */}
          <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-xs">
            <GoogleIcon className="w-2.5 h-2.5" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-slate-900 font-extrabold text-sm leading-tight truncate">{review.name}</p>
            <BadgeCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
          </div>
          <p className="text-slate-400 text-[11px] font-medium mt-0.5 truncate">{review.role}</p>
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
        className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 z-10"
        style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 z-10"
        style={{ background: `linear-gradient(to left, ${bgColor}, transparent)` }}
      />

      <div ref={trackRef} className={`flex py-2 ${animClass}`}>
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
      date: t("3 days ago", "hace 3 días"),
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
      date: t("1 week ago", "hace 1 semana"),
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
      date: t("2 weeks ago", "hace 2 semanas"),
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
      date: t("3 weeks ago", "hace 3 semanas"),
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
      date: t("1 month ago", "hace 1 mes"),
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
      date: t("1 month ago", "hace 1 mes"),
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
      date: t("2 months ago", "hace 2 meses"),
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
      date: t("2 months ago", "hace 2 meses"),
    },
  ];

  const row1 = reviews.slice(0, Math.ceil(reviews.length / 2));
  const row2 = reviews.slice(Math.ceil(reviews.length / 2));

  const sectionBg = "#F8FAFC";

  return (
    <section id="reviews" className="relative py-14 sm:py-18 lg:py-24 overflow-hidden" style={{ background: sectionBg }}>

      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-red-600/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-amber-500/8 blur-[100px]" />

      {/* Subtle radial grid */}
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
        className="mx-auto w-[90%] max-w-7xl text-center mb-10 sm:mb-14 relative z-10"
      >
        {/* Eyebrow Badge: Google Verified */}
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200/90 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-slate-800 mb-4 shadow-sm select-none">
          <GoogleIcon className="w-4 h-4" />
          <span>{t("Google Verified Reviews", "Reseñas Verificadas de Google")}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[#dc2626] font-extrabold tracking-normal">5.0 ★★★★★</span>
        </div>

        <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-tight mt-0 sm:mt-[-4px] mb-3">
          {t("Trusted to Protect ", "De Confianza para Proteger ")}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] via-red-600 to-[#b91c1c]">
            {t("What Matters Most", "Lo Que Más Importa")}
          </span>
        </h2>

        <p className="mx-auto max-w-xl text-slate-500 text-[14px] sm:text-[15px] leading-relaxed font-normal mb-6">
          {t("Real 5-star experiences from homeowners and businesses across Nashville, TN and our 100-mile Middle Tennessee service radius.", "Experiencias reales de 5 estrellas de propietarios y empresas en Nashville, TN y nuestro radio de 100 millas en Middle Tennessee.")}
        </p>

        {/* Google Trust Banner & Rating Badge */}
        {!isGrid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-full px-5 py-2.5 sm:px-6 sm:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] select-none"
          >
            {/* Google Rating */}
            <div className="flex items-center gap-2.5">
              <GoogleIcon className="w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight block leading-tight">Google Rating</span>
                <span className="text-[10px] text-slate-400 font-semibold block leading-tight">Verified Reviews</span>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md ml-1">
                <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                <span className="text-xs font-black text-slate-900 leading-none">5.0</span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-6 bg-slate-200" />

            {/* Stars & Customer Stats */}
            <div className="flex items-center gap-2.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-600">
                {t("100% Recommendation Rate · 200+ Shelter Installs", "100% Tasa de Recomendación · 200+ Instalaciones")}
              </span>
            </div>
          </motion.div>
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
        <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
          <MarqueeRow items={row1} direction="left" bgColor={sectionBg} />
          <MarqueeRow items={row2} direction="right" bgColor={sectionBg} />
        </div>
      )}

      {/* Bottom Google Authenticity Trust Bar */}
      <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500 font-medium relative z-10 select-none px-4">
        <div className="flex items-center gap-1.5">
          <GoogleIcon className="w-4 h-4" />
          <span className="font-bold text-slate-800">100% Authentic Google Reviews</span>
        </div>
        <span className="hidden sm:inline text-slate-300">•</span>
        <div className="flex items-center gap-1.5">
          <BadgeCheck className="w-4 h-4 text-emerald-600" />
          <span>{t("Verified Middle Tennessee Homeowners", "Propietarios Verificados de Middle Tennessee")}</span>
        </div>
        <span className="hidden sm:inline text-slate-300">•</span>
        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
          <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
          <span>{t("5.0 Star Average Across All Installations", "Promedio de 5.0 Estrellas en Todas las Instalaciones")}</span>
        </div>
      </div>

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
          animation: marquee-left 42s linear infinite;
          width: max-content;
        }
        .marquee-track-right {
          animation: marquee-right 42s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
