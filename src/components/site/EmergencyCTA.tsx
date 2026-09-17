import { motion } from "framer-motion";

import { Phone, Clock, ShieldCheck, CheckCircle2, AlertTriangle, Zap, ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import grangerInstallImg from "@/assets/granger-install.jpg";

export function EmergencyCTA() {
  const { t } = useLanguage();
  const trustBadges = [
    {
      icon: Clock,
      title: t("Business Hours", "Horario de Atención"),
      subtitle: t("Mon-Sat: 8:00 AM-5:00 PM", "Lun-Sáb: 8:00 AM-5:00 PM"),
    },
    {
      icon: MapPin,
      title: t("Nashville, TN", "Nashville, TN"),
      subtitle: t("Local Installations", "Instalaciones Locales"),
    },
    {
      icon: ShieldCheck,
      title: t("Professional Installation", "Instalación Profesional"),
      subtitle: t("In-Ground & Custom Built", "Subterráneo y Personalizado"),
    },
  ];

  return (
    <section
      className="relative w-full overflow-hidden py-[50px] text-white bg-[#0b0f15] border-y border-red-500/30"
      style={{ paddingTop: "50px", paddingBottom: "50px" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img
          src={grangerInstallImg}
          alt="Storm shelter installation"
          className="h-full w-full object-cover scale-105 filter brightness-[0.3] contrast-110 select-none"
        />

        {/* Overlays for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f15]/90 via-[#0b0f15]/75 to-[#0b0f15]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15]/90 via-transparent to-[#0b0f15]/60" />

        {/* Ambient Glowing Blobs */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 rounded-full bg-[#dc2626]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-[92%] sm:w-[90%] max-w-7xl px-0 sm:px-4">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16 items-center w-full min-w-0">

          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left w-full min-w-0 max-w-full">
            {/* Eyebrow Live Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-red-500/50 px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-red-400 shadow-lg max-w-full"
            >
              <span className="flex items-center gap-1.5 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="truncate">{t("Locally Owned and Operated", "De Propiedad Local")}</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black tracking-tight leading-[1.2] text-white max-w-2xl"
            >
              <span className="block text-[36px]" style={{ fontSize: "36px" }}>
                {t("Don't Wait for the Next Severe Storm.", "No Espere a la Próxima Tormenta Severa.")}
              </span>
              <span
                className="block mt-1 sm:mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-300 to-amber-300 text-[18px] sm:text-[24px] lg:text-[28px] leading-tight mb-2 lg:-mb-[14px]"
              >
                {t("Protect Your Family With an Underground Shelter.", "Proteja a Su Familia con un Refugio Subterráneo.")}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[13.5px] sm:text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed font-normal"
            >
              {t("Tornado sirens offer only minutes of warning. Give your family a safe, underground storm shelter just steps from your home. We offer prefabricated in-ground units and fully custom concrete shelters in Nashville, TN.", "Las sirenas de tornado ofrecen solo minutos de aviso. Brinde a su familia un refugio subterráneo seguro a pasos de su hogar. Ofrecemos unidades prefabricadas y refugios de concreto personalizados en Nashville, TN.")}
            </motion.p>

            {/* Feature Cards — Infinite Auto Scrolling Marquee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full min-w-0 max-w-full overflow-hidden pt-1 sm:pt-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
            >
              <div
                className="flex w-max gap-3.5 animate-marquee hover:[animation-play-state:paused]"
                style={{ animation: "marquee 22s linear infinite" }}
              >
                {[...trustBadges, ...trustBadges].map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-red-500/40 hover:bg-white/10 transition-all duration-300 shrink-0 select-none shadow-sm cursor-default"
                    >
                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-red-500/20 text-red-400 shrink-0 border border-red-500/30">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col text-left whitespace-nowrap">
                        <span className="text-[11px] sm:text-xs font-extrabold text-white leading-tight">{badge.title}</span>
                        <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight mt-0.5">{badge.subtitle}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Action Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
            }}
            className="lg:col-span-5 flex flex-col items-center gap-4 sm:gap-5 w-full min-w-0 max-w-md mx-auto lg:mx-0"
          >
            {/* Primary Phone Action Card */}
            <div className="relative group w-full max-w-md">
              {/* Glowing Aura Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#dc2626] via-red-500 to-[#b91c1c] rounded-[24px] sm:rounded-[28px] blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" />

              <a
                href="tel:6159912361"
                className="relative flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 rounded-[20px] sm:rounded-[24px] bg-[#0b0f15] border border-red-500/60 p-4 sm:p-6 lg:p-7 shadow-2xl hover:scale-[1.02] transition-all duration-300 w-full text-left cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 justify-start text-left w-full sm:w-auto">
                  <span className="relative grid place-items-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-[#dc2626] border border-red-400/50 shrink-0 shadow-lg">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-bounce" />
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9.5px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-red-400 font-black flex items-center gap-1.5 truncate">
                      <span className="truncate">{t("Call Us Today", "Llámenos Hoy")}</span>
                    </span>
                    <span className="text-[20px] sm:text-[24px] font-display font-black leading-tight tracking-tight mt-0.5 sm:mt-1 text-white whitespace-nowrap">
                      (615) 991-2361
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex justify-end">
                  <span className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-[#dc2626] text-white text-xs font-black uppercase tracking-wider shadow-md group-hover:bg-[#b91c1c] transition-colors">
                    {t("Call Now", "Llamar")}
                  </span>
                </div>
              </a>
            </div>

            {/* Secondary Request Online CTA */}
            <div className="w-full max-w-md">
              <Button
                variant="outline"
                size="xl"
                className="w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 font-extrabold text-xs sm:text-sm py-3.5 sm:py-4 px-4 sm:px-8 shadow-lg whitespace-normal sm:whitespace-nowrap h-auto justify-center text-center flex items-center gap-2"
              >
                <span>{t("Request a Free Estimate Online", "Solicitar Estimación en Línea")}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Button>
            </div>

            {/* Micro-trust glass badge */}
            <div className="flex items-center gap-2 sm:gap-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-red-500/20 px-3.5 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-xs text-slate-300 w-full max-w-md justify-center shadow-md text-center">
              <MapPin className="h-4 w-4 text-red-400 shrink-0" />
              <span className="font-semibold">{t("Proudly Serving Nashville, TN", "Sirviendo a Nashville, TN")}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
