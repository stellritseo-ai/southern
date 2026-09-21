import { motion } from "framer-motion";
import banner1 from "@/assets/gallery/1.png";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  backgroundImage = banner1,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0B0F15] pt-28 sm:pt-36 pb-20 sm:pb-28 text-white">
      {/* Background Banner Image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover object-center filter brightness-70 contrast-110 scale-105 transition-transform duration-700"
        />
        {/* Balanced, lightened gradient overlays to maximize banner visibility while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F15]/70 via-[#0B0F15]/40 to-[#0B0F15]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F15]/70 via-transparent to-[#0B0F15]/70" />
      </div>

      {/* Ambient glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-[#DC2626]/15 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 h-56 w-56 rounded-full bg-[#FBBF24]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-[#DC2626]/10 blur-3xl" />
      </div>

      {/* Dot grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #FFD54F 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {eyebrow && (
            <div className="inline-flex items-center gap-2 bg-white/8 border border-[#FFD54F]/20 backdrop-blur-sm rounded-full px-5 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#FFD54F] mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD54F] animate-pulse" />
              {eyebrow}
            </div>
          )}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black leading-tight tracking-tight text-white mb-4 max-w-3xl mx-auto">
            {title}
          </h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mx-auto max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed font-medium"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Decorative bottom divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-12 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"
        />
      </div>
    </section>
  );
}
