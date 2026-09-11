import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowRight, Navigation, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const areasData = [
  { name: "Nashville", x: "50%", y: "45%", primary: true },
  { name: "Franklin", x: "47%", y: "58%" },
  { name: "Murfreesboro", x: "64%", y: "62%" },
  { name: "Hendersonville", x: "56%", y: "32%" },
  { name: "Brentwood", x: "49%", y: "52%" },
  { name: "Clarksville", x: "28%", y: "20%" },
  { name: "Columbia", x: "40%", y: "74%" },
  { name: "Gallatin", x: "64%", y: "28%" },
  { name: "Lebanon", x: "72%", y: "42%" },
  { name: "Mount Juliet", x: "62%", y: "44%" },
  { name: "Spring Hill", x: "44%", y: "66%" },
  { name: "Dickson", x: "26%", y: "46%" },
  { name: "Smyrna", x: "58%", y: "54%" },
  { name: "Cookeville", x: "84%", y: "38%" },
  { name: "Shelbyville", x: "56%", y: "78%" },
];

const statCards = [
  { value: "100mi", label: "Coverage Radius" },
  { value: "5+", label: "Years Experience" },
  { value: "25+", label: "Communities" },
  { value: "24/7", label: "Emergency Response" },
];

export function ServiceArea() {
  const { t } = useLanguage();
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <section id="service-area" className="relative py-12 sm:py-16 lg:py-24 bg-white border-b border-slate-100 overflow-hidden">

      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:26px_26px] opacity-60" />
        <div className="absolute -top-40 left-0 w-[500px] h-[500px] rounded-full bg-red-600/6 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/6 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-[90%] max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">

          {/* ── LEFT COLUMN ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-left space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-[#dc2626] rounded-full px-5 py-1.5 text-[11px] font-black uppercase tracking-widest shadow-sm">
              <Navigation className="w-3.5 h-3.5" />
              {t("Service Area", "Área de Servicio")}
            </div>

            {/* Headline */}
            <div>
              <h2 className="text-slate-900 leading-tight tracking-tight font-black text-[26px] sm:text-[35px] mb-3">
                {t("Proudly Serving a ", "Servimos Con Orgullo un Radio de ")}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#b91c1c]">
                  {t("100-Mile Radius", "100 Millas")}
                </span>
                .
              </h2>
              <p className="text-[14.5px] text-slate-500 font-medium leading-relaxed max-w-md">
                {t(
                  "Based in Nashville, TN (468 Craighead St) — we serve homeowners and businesses across Middle Tennessee and surrounding regions within our 100-mile severe weather protection corridor.",
                  "Con base en Nashville, TN (468 Craighead St) — servimos a propietarios y empresas en todo Middle Tennessee dentro de nuestro radio de protección de 100 millas."
                )}
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3">
              {statCards.map((s) => (
                <div key={s.label} className="flex flex-col items-center p-3 rounded-2xl bg-red-50/60 border border-red-200/80 text-center">
                  <span className="text-[#dc2626] font-black text-[18px] leading-tight">{s.value}</span>
                  <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wide mt-0.5 leading-tight">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Area chips */}
            <div className="flex flex-wrap gap-2">
              {areasData.map((a) => {
                const isActive = hoveredArea === a.name;
                return (
                  <motion.div
                    key={a.name}
                    onMouseEnter={() => setHoveredArea(a.name)}
                    onMouseLeave={() => setHoveredArea(null)}
                    whileHover={{ scale: 1.04, y: -1 }}
                    transition={{ duration: 0.15 }}
                    className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider rounded-xl py-1.5 px-3 cursor-pointer border transition-all duration-200 ${
                      isActive
                        ? "bg-[#dc2626] border-red-500 text-white shadow-md"
                        : a.primary
                        ? "bg-red-50 border-red-300 text-[#dc2626]"
                        : "text-slate-600 bg-slate-50 border-slate-200 hover:bg-red-50/60 hover:border-red-300 hover:text-[#dc2626]"
                    }`}
                  >
                    <MapPin className="h-3 w-3 shrink-0" />
                    {a.name}
                    {a.primary && !isActive && (
                      <span className="ml-0.5 text-[8px] font-black bg-[#dc2626] text-white px-1.5 py-0.5 rounded-full">HQ</span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* "Don't see your city" card */}
            <div className="relative group max-w-lg w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-500" />
              <div className="relative flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#dc2626]" />
                  </div>
                  <p className="text-[12.5px] font-bold text-slate-700 leading-relaxed">
                    {t(
                      "Don't see your town? Call us — we serve all communities within a 100-mile radius around Nashville, TN.",
                      "¿No ve su ciudad? Llámenos — servimos a todas las comunidades en un radio de 100 millas alrededor de Nashville, TN."
                    )}
                  </p>
                </div>
                <a
                  href="tel:6159912361"
                  className="shrink-0 inline-flex items-center gap-1.5 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white border border-red-500/40 text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all duration-200 hover:scale-[1.04] shadow-md cursor-pointer"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {t("Call", "Llamar")}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Map ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-3 rounded-[36px] bg-gradient-to-br from-red-600/12 via-transparent to-amber-500/12 blur-xl pointer-events-none" />

            <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c1324] to-[#040814] border border-slate-800/60 shadow-[0_30px_80px_-12px_rgba(0,0,0,0.4)]">

              {/* Google Map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103070.8359740523!2d-86.86259424843749!3d36.1627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864ec3213eb903d%3A0x7d3fb9d0a1e9daa0!2sNashville%2C%20TN!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                className="absolute inset-0 w-full h-full opacity-70 grayscale invert contrast-[1.15] brightness-[0.8] pointer-events-none"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Radial coverage overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute rounded-full border border-red-500/30 bg-red-600/10"
                  style={{ width: "62%", height: "62%", top: "20%", left: "20%" }}
                />
                <div
                  className="absolute rounded-full border border-dashed border-amber-400/20"
                  style={{ width: "78%", height: "78%", top: "12%", left: "12%" }}
                />
              </div>

              {/* Pins */}
              {areasData.map((pin) => (
                <Pin
                  key={pin.name}
                  x={pin.x}
                  y={pin.y}
                  label={pin.name}
                  primary={pin.primary}
                  active={hoveredArea === pin.name}
                  onMouseEnter={() => setHoveredArea(pin.name)}
                  onMouseLeave={() => setHoveredArea(null)}
                />
              ))}

              {/* Coverage badge — bottom left */}
              <div className="absolute bottom-4 left-4 bg-slate-950/85 border border-red-500/40 backdrop-blur-md text-white rounded-2xl px-4 py-2.5 select-none z-20 shadow-lg">
                <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-tight">
                  Nashville HQ · 100-Mile Radius
                </div>
                <div className="font-bold text-[13px] text-white mt-0.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
                  Middle Tennessee Coverage
                </div>
              </div>

              {/* Live badge — top right */}
              <div className="absolute top-4 right-4 bg-slate-950/85 border border-white/10 backdrop-blur-md text-white rounded-full px-3 py-1.5 select-none z-20 flex items-center gap-1.5 shadow-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dc2626]" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-red-400">
                  Active Coverage 24/7
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function Pin({
  x,
  y,
  label,
  primary = false,
  active = false,
  onMouseEnter,
  onMouseLeave,
}: {
  x: string;
  y: string;
  label: string;
  primary?: boolean;
  active?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full group cursor-pointer z-20 transition-all duration-300"
      style={{ left: x, top: y }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col items-center gap-1.5">
        {/* Glowing hotspot */}
        <div className="relative flex h-8 w-8 items-center justify-center">
          <span className={`animate-ping absolute inline-flex rounded-full opacity-70 transition-all duration-300 ${
            active ? "h-7 w-7 bg-red-500 scale-125" : primary ? "h-6 w-6 bg-red-500" : "h-5 w-5 bg-red-400"
          }`} />
          <span className={`relative inline-flex rounded-full items-center justify-center shadow-lg transition-all duration-300 ${
            primary ? "h-5 w-5" : "h-4 w-4"
          } ${
            active
              ? "bg-[#dc2626] scale-125 shadow-[0_0_14px_rgba(220,38,38,0.8)]"
              : primary
              ? "bg-[#dc2626] shadow-[0_0_10px_rgba(220,38,38,0.6)]"
              : "bg-gradient-to-br from-[#dc2626] to-[#b91c1c]"
          }`}>
            <span className={`rounded-full bg-white animate-pulse ${primary ? "h-2 w-2" : "h-1.5 w-1.5"}`} />
          </span>
        </div>

        {/* Label */}
        <span className={`px-2.5 py-0.5 rounded-lg backdrop-blur-sm border transition-all duration-300 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-sm ${
          primary || active ? "inline-block" : "hidden sm:inline-block"
        } ${
          active
            ? "bg-[#dc2626] border-red-400 text-white scale-105 shadow-md"
            : primary
            ? "bg-[#dc2626]/90 border-red-400 text-white"
            : "bg-[#0c1324]/85 border-slate-700/80 text-white group-hover:bg-[#dc2626] group-hover:border-red-400 group-hover:text-white"
        }`}>
          {label}
        </span>
      </div>
    </div>
  );
}
