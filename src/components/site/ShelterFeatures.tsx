import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import {
  ShieldCheck,
  Wind,
  Lock,
  Users,
  Anchor,
  DoorOpen,
  Droplets,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Phone,
  ShieldAlert,
  HardHat,
  Ruler,
} from "lucide-react";
import grangerHatchImg from "@/assets/granger-door-hatch.jpg";

const specs = [
  {
    icon: ShieldAlert,
    title: "Exceeds FEMA Standards",
    desc: "Heavy-duty, multi-point locking security doors that exceed FEMA 320 and 361 specifications for near absolute protection against debris impact.",
    tag: "Safety",
  },
  {
    icon: HardHat,
    title: "Lifetime Warranty",
    desc: "Offering a limited lifetime warranty on the body of the unit against cracking, rusting, or rotting in the ground for generations of peace of mind.",
    tag: "Warranty",
  },
  {
    icon: Lock,
    title: "Easiest Installation",
    desc: "Our innovative designs and professional crane installation mean your shelter can be installed quickly and securely without disrupting your entire yard.",
    tag: "Installation",
  },
  {
    icon: Ruler,
    title: "Multiple Ventilation Sources",
    desc: "Featuring dual sources of air flow and comfortable seating so you can wait out inclement weather with your family in safety and security.",
    tag: "Interior",
  },
  {
    icon: Wind,
    title: "Dual One-Way Ventilation",
    desc: "Two one-way air vents provide continuous airflow without allowing debris or water infiltration. Vents maintain breathable air even when sealed.",
    tag: "Ventilation",
  },
  {
    icon: DoorOpen,
    title: "Top Escape Hatch",
    desc: "Every shelter includes a secondary escape hatch on top — a critical safety feature that allows egress if the primary entry is blocked by storm debris.",
    tag: "Safety",
  },
  {
    icon: Droplets,
    title: "Watertight Sealed Design",
    desc: "Factory-sealed seams and a raised entry frame prevent groundwater infiltration. Shelters are engineered for Tennessee's varying soil and moisture conditions.",
    tag: "Engineering",
  },
  {
    icon: Wrench,
    title: "Same-Day Crane Placement",
    desc: "Prefabricated shelters are delivered and set in place by crane in a single day. Complete excavation, crane setting, anchoring, and backfill with minimal yard disruption.",
    tag: "Installation",
  },
];

const tagColors: Record<string, string> = {
  Construction: "bg-amber-50 text-amber-700 border-amber-200",
  Installation: "bg-blue-50 text-blue-700 border-blue-200",
  Safety: "bg-slate-100 text-slate-700 border-slate-300",
  Interior: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Warranty: "bg-amber-50 text-amber-700 border-amber-200",
  Ventilation: "bg-slate-100 text-slate-600 border-slate-300",
  Engineering: "bg-stone-100 text-stone-700 border-stone-300",
};

export function ShelterFeatures() {
  const { t } = useLanguage();

  return (
    <section
      id="shelter-features"
      className="relative py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/60 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-slate-400/6 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-end mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Eyebrow — slate/charcoal */}
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-slate-700 mb-5">
              <Wrench className="w-3.5 h-3.5" />
              {t("Engineering & Construction Details", "Detalles de Ingeniería y Construcción")}
            </div>

            <h2
              className="font-display font-black text-slate-900 tracking-tight leading-tight"
              style={{ fontSize: "clamp(26px, 4.5vw, 40px)", marginTop: "-8px", marginBottom: "12px" }}
            >
              {t("Built to Construction Standards.", " ")}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#b91c1c]">
                {t("Every Detail Engineered for Safety.", "Cada Detalle Diseñado para la Seguridad.")}
              </span>
            </h2>

            <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed font-normal max-w-2xl">
              {t(
                "Our underground storm shelters are built with the same attention to materials and construction quality you'd expect from any serious construction company — heavy-gauge steel, professional anchoring, and code-grade engineering.",
                "Nuestros refugios subterráneos están construidos con la misma atención a los materiales y la calidad de construcción que esperaría de cualquier empresa de construcción seria."
              )}
            </p>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.10)] group">
              <img
                src={grangerHatchImg}
                alt="Storm shelter door hatch detail"
                className="w-full h-[220px] sm:h-[280px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">
                  {t("Spring-loaded interior latch — secured from inside", "Pestillo interior de resorte — asegurado desde adentro")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spec Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {specs.map((spec, i) => {
            const Icon = spec.icon;
            const tagClass = tagColors[spec.tag] ?? "bg-slate-100 text-slate-600 border-slate-300";
            return (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-sm hover:shadow-md"
              >
                <div className="relative z-10">
                  {/* Tag badge */}
                  <span className={`inline-flex items-center text-[9px] font-black uppercase tracking-wider border rounded-full px-2 py-0.5 mb-4 ${tagClass}`}>
                    {spec.tag}
                  </span>

                  {/* Icon — slate */}
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mb-4 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-[13.5px] font-extrabold text-slate-900 leading-snug mb-2 group-hover:text-slate-700 transition-colors duration-200">
                    {spec.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11.5px] text-slate-500 leading-relaxed font-normal">
                    {spec.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm"
        >
          <div className="text-center sm:text-left">
            <p className="text-slate-900 font-extrabold text-[15px] sm:text-[16px] leading-tight">
              {t("Ready to see a shelter in person?", "¿Listo para ver un refugio en persona?")}
            </p>
            <p className="text-slate-500 text-[13px] font-normal mt-1">
              {t("Call us to schedule a free on-site estimate and site evaluation.", "Llámenos para programar una estimación gratuita en su sitio.")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:6159912361"
              className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-[11px] font-black uppercase tracking-widest rounded-full px-6 py-3.5 transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-[0.97]"
            >
              <Phone className="w-3.5 h-3.5" />
              {t("Call (615) 991-2361", "Llamar (615) 991-2361")}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white text-[11px] font-black uppercase tracking-widest rounded-full px-6 py-3.5 transition-all duration-300 hover:scale-[1.03]"
            >
              {t("Free Estimate", "Estimación Gratis")}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
