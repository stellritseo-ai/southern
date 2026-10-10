import { motion } from "framer-motion";
import { Phone, ShieldCheck, ArrowRight, HardHat, Wrench, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { SITE_CONFIG } from "@/config/site-config";
import grangerInstallImg from "@/assets/granger-install.jpg";

export function EmergencyCTA() {
  const { t } = useLanguage();
  const trustBadges = [
    {
      icon: HardHat,
      title: t("Turnkey Construction", "Construcción Llave en Mano"),
      subtitle: t("Excavation to Backfill", "Excavación y Relleno"),
    },
    {
      icon: Wrench,
      title: t("Precision Crane Placement", "Colocación con Grúa"),
      subtitle: t("Single-Day Turnkey Installs", "Instalación en un Solo Día"),
    },
    {
      icon: ShieldCheck,
      title: t("FEMA 320/361 Compliant", "Normas FEMA 320/361"),
      subtitle: t("Engineered Life Safety", "Seguridad Diseñada"),
    },
    {
      icon: MapPin,
      title: t("Nashville & Middle TN", "Nashville y Middle TN"),
      subtitle: t("Local Crew & Equipment", "Personal y Equipos Locales"),
    },
  ];

  return (
    <section className="relative w-full overflow-hidden text-white bg-[#0b0f15] border-y border-white/10 py-12 sm:py-16 lg:py-20">

      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img
          src={grangerInstallImg}
          alt="Storm shelter installation"
          className="h-full w-full object-cover brightness-[0.25] contrast-110 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f15]/95 via-[#0b0f15]/70 to-[#0b0f15]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15]/90 via-transparent to-[#0b0f15]/50" />
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white"
            >
              <HardHat className="w-3.5 h-3.5 text-white shrink-0" />
              {t("Master Construction & Site Specialists", "Especialistas en Construcción")}
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold tracking-tight text-white text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.12] lg:leading-[46px]"
              style={{
                fontWeight: 700,
                marginTop: "-8px",
                marginBottom: "10px",
              }}
            >
              {t("Built for Protection.", "Construido para Proteger.")}
              <br />
              <span
                className="gradient-text-construction text-[25px] sm:text-[34px] lg:text-[43px] leading-[1.12] lg:leading-[46px]"
                style={{
                  fontWeight: 700,
                }}
              >
                {t("Engineered by Local Craftsmen.", "Diseñado por Artesanos Locales.")}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed font-normal"
            >
              {t(
                "Proper underground shelter installation requires specialized excavation equipment, accurate soil and slope assessment, and precision crane placement. Our experienced Nashville construction crew manages every phase from initial yard grading to clean, turn-key backfill.",
                "La instalación adecuada de un refugio subterráneo requiere maquinaria especializada, análisis del terreno y colocación precisa con grúa."
              )}
            </motion.p>

            {/* Feature Cards Grid (All blocks 100% visible on mobile and desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-2 w-full max-w-xl"
            >
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-white/40 transition-colors shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-xs font-extrabold text-white leading-tight">{badge.title}</span>
                      <span className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">{badge.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Action Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center gap-4 w-full max-w-md mx-auto lg:mx-0"
          >
            {/* Phone CTA card */}
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-white/10 rounded-[22px] blur-md opacity-25 group-hover:opacity-40 transition duration-500" />
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="relative flex items-center justify-between gap-3 sm:gap-4 rounded-[18px] bg-[#0b0f15] border border-slate-700 p-4 sm:p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300 w-full cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="grid place-items-center h-11 w-11 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-white shrink-0">
                    <Phone className="h-5 w-5 text-black" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest truncate">{t("Call Us Direct", "Llámenos")}</div>
                    <div className="text-white font-black text-lg sm:text-2xl tracking-tight whitespace-nowrap">{SITE_CONFIG.phone}</div>
                  </div>
                </div>
                <span className="px-3.5 sm:px-4 py-2 rounded-xl bg-white text-black text-xs font-black uppercase tracking-wider shrink-0 group-hover:bg-slate-200 transition-colors">
                  {t("Call", "Llamar")}
                </span>
              </a>
            </div>

            {/* Online estimate CTA */}
            <Button
              variant="outline"
              size="xl"
              asChild
              className="w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 font-extrabold text-xs sm:text-sm py-3.5 sm:py-4 px-4 sm:px-8 shadow-lg h-auto flex items-center justify-center gap-2"
            >
              <Link to="/free-quote">
                <span>{t("Schedule On-Site Evaluation", "Programar Evaluación en el Sitio")}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </Button>

            {/* Micro-trust badge */}
            <div className="flex items-center gap-2 rounded-2xl bg-black/60 backdrop-blur-md border border-slate-700/60 px-4 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-xs text-slate-300 w-full justify-center shadow-md text-center">
              <ShieldCheck className="h-4 w-4 text-white shrink-0" />
              <span className="font-semibold">{t("Middle Tennessee's Trusted Shelter Builders", "Constructores de Confianza en Tennessee")}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
