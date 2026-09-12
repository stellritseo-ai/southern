import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Phone, Clock, ShieldCheck, CheckCircle2, AlertTriangle, Zap, ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import heroStorm from "@/assets/hero-storm.jpg";
import welcomeVideo from "@/assets/welcome.mp4";

export function EmergencyCTA() {
  const { t } = useLanguage();
  const trustBadges = [
    {
      icon: Clock,
      title: t("24/7 Availability", "Disponible 24/7"),
      subtitle: t("Always Ready to Dispatch", "Siempre Listos"),
    },
    {
      icon: AlertTriangle,
      title: t("EF-5 Rated Strength", "Resistencia EF-5"),
      subtitle: t("250+ MPH Wind Protection", "Vientos de Más de 250 MPH"),
    },
    {
      icon: ShieldCheck,
      title: t("Licensed • Insured • Bonded", "Licenciado • Asegurado • Afianzado"),
      subtitle: t("100% Certified Installs", "Instalaciones 100% Certificadas"),
    },
    {
      icon: CheckCircle2,
      title: t("5+ Years Experience", "5+ Años de Experiencia"),
      subtitle: t("Nashville's Trusted Crew", "Equipo Confiable de Nashville"),
    },
  ];

  return (
    <section
      className="relative w-full overflow-hidden py-[50px] text-white bg-[#0b0f15] border-y border-red-500/30"
      style={{ paddingTop: "50px", paddingBottom: "50px" }}
    >
      {/* Background Video with Balanced Visibility */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroStorm}
          className="h-full w-full object-cover scale-105 filter brightness-85 contrast-110 select-none"
        >
          <source src={welcomeVideo} type="video/mp4" />
        </video>

        {/* Soft balanced overlays so the video is clearly visible with strong text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f15]/90 via-[#0b0f15]/75 to-[#0b0f15]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15]/90 via-transparent to-[#0b0f15]/60" />

        {/* Ambient Glowing Blobs */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 rounded-full bg-[#dc2626]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-[90%] max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">

          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Live Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-red-500/50 px-4 py-2 text-xs font-black uppercase tracking-widest text-red-400 shadow-lg"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                {t("Severe Weather Alert — Open 24/7", "Alerta de Clima Severo — Abierto 24/7")}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[24px] sm:text-[30px] lg:text-[36px] font-black tracking-tight leading-tight text-white max-w-2xl"
            >
              <span className="block">
                {t("Don't Wait for the Next Severe Storm.", "No Espere a la Próxima Tormenta Severa.")}
              </span>
              <span
                className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-300 to-amber-300 text-[20px] sm:text-[28px] leading-tight mb-2 sm:-mb-[14px]"
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
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal"
            >
              {t("Tornado sirens offer only minutes of warning. Give your family an unshakeable, certified underground safe vault steps from your home. We provide turnkey installation and consultation across Nashville and a 100-mile service radius.", "Las sirenas de tornado ofrecen solo minutos de aviso. Brinde a su familia una bóveda de seguridad subterránea certificada e inquebrantable a pasos de su hogar. Ofrecemos instalación completa en Nashville y 100 millas a la redonda.")}
            </motion.p>

            {/* Feature Cards — Infinite Auto Scrolling Marquee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full overflow-hidden pt-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
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
                      className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-red-500/40 hover:bg-white/10 transition-all duration-300 shrink-0 select-none shadow-sm cursor-default"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/20 text-red-400 shrink-0 border border-red-500/30">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col text-left whitespace-nowrap">
                        <span className="text-xs font-extrabold text-white leading-tight">{badge.title}</span>
                        <span className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">{badge.subtitle}</span>
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
            className="lg:col-span-5 flex flex-col items-center gap-5 w-full"
          >
            {/* Primary Phone Action Card */}
            <div className="relative group w-full max-w-md">
              {/* Glowing Aura Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#dc2626] via-red-500 to-[#b91c1c] rounded-[28px] blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" />

              <a
                href="tel:6159912361"
                className="relative flex flex-col items-center justify-between gap-4 rounded-[20px] sm:rounded-[24px] bg-[#0b0f15] border border-red-500/60 p-5 sm:p-6 lg:p-7 shadow-2xl hover:scale-[1.02] transition-all duration-300 w-full text-center sm:text-left sm:flex-row cursor-pointer"
              >
                <div className="flex items-center gap-4 justify-center sm:justify-start text-left w-full sm:w-auto">
                  <span className="relative grid place-items-center h-14 w-14 rounded-2xl bg-[#dc2626] border border-red-400/50 shrink-0 shadow-lg">
                    <Phone className="h-6 w-6 text-white animate-bounce" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-red-400 font-black flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
                      {t("24/7 Shelter Hotline", "Línea Directa 24/7")}
                    </span>
                    <span className="text-[22px] sm:text-[24px] font-display font-black leading-tight tracking-tight mt-1 text-white">
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
              <Button variant="outline" size="xl" asChild className="w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 font-extrabold text-sm py-4 shadow-lg">
                <Link to="/free-quote">
                  {t("Request a Free Estimate Online", "Solicitar Estimación en Línea")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Micro-trust glass badge */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-red-500/20 px-5 py-3 text-xs text-slate-300 w-full max-w-md justify-center shadow-md">
              <MapPin className="h-4 w-4 text-red-400 shrink-0" />
              <span className="font-semibold">{t("Proudly Serving Nashville & 100-Mile Radius (24/7)", "Sirviendo a Nashville y un Radio de 100 Millas (24/7)")}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
