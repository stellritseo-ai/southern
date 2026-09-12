import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Star, HardHat, Home, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import shelterInteriorImg from "@/assets/shelter-interior.jpg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const TinySparkleIcon = () => (
  <svg className="w-3.5 h-3.5 text-[#dc2626] fill-[#dc2626] shrink-0" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4z" />
  </svg>
);

export function Welcome() {
  const { t } = useLanguage();

  const promisePoints = [
    {
      title: t("EF-5 Tornado Protection", "Protección contra Tornados EF-5"),
      desc: t("Meets & exceeds FEMA P-320 & ICC-500 standards.", "Cumple con las normas FEMA P-320 e ICC-500."),
      icon: ShieldCheck,
      tag: "FEMA Certified",
    },
    {
      title: t("Rapid 1-2 Day Installation", "Instalación Rápida en 1-2 Días"),
      desc: t("Complete excavation, crane placement & backfill.", "Excavación completa, colocación con grúa y relleno."),
      icon: HardHat,
      tag: "Turnkey",
    },
    {
      title: t("Immediate Backyard Access", "Acceso Inmediato en el Patio"),
      desc: t("Steps away from your back door when alarms sound.", "A pasos de su puerta cuando suenen las alarmas."),
      icon: Home,
      tag: "Fast Entry",
    },
    {
      title: t("100-Mile Service Area", "Área de Cobertura de 100 Millas"),
      desc: t("Serving Nashville & all surrounding Middle Tennessee counties.", "Sirviendo a Nashville y todos los condados cercanos."),
      icon: MapPin,
      tag: "Middle TN",
    },
  ];

  return (
    <section id="welcome" className="bg-white overflow-hidden py-12 sm:py-16 lg:py-24 border-b border-slate-100 relative">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-[#dc2626]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {/* Premium 2-Column Grid */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16 items-center">

          {/* Left Column: Copy & Checklist */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#dc2626] shadow-xs">
              <TinySparkleIcon /> {t("Engineered Life Protection", "Protección Diseñada para Salvar Vidas")} <TinySparkleIcon />
            </div>

            {/* Main Headline */}
            <h2
              className="font-display font-extrabold leading-tight text-[#0b0f15] tracking-tight -mt-[14px] mb-[10px] text-[32px] sm:text-[41px]"
              style={{ fontSize: "41px", marginTop: "-14px", marginBottom: "10px" }}
            >
              {t("When the Storm Comes, ", "Cuando Llega la Tormenta, ")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#b91c1c]">
                {t("Be Ready.", "Esté Preparado.")}
              </span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-3.5 text-slate-600 text-[14px] sm:text-base leading-relaxed font-normal">
              <p>
                {t("When severe tornadoes and supercells threaten Middle Tennessee, every second counts. Southern Storm Shelters LLC specializes in professionally engineered and installed underground storm shelters designed to give your family an impenetrable sanctuary.", "Cuando tornados severos amenazan el centro de Tennessee, cada segundo cuenta. Southern Storm Shelters LLC se especializa en refugios subterráneos diseñados profesionalmente para brindar un santuario impenetrable a su familia.")}
              </p>
              <p>
                {t("With 5+ years of field experience and 100-mile service radius around Nashville, our certified installations meet strict FEMA P-320 guidelines to withstand 250+ MPH winds and extreme projectile impacts. We are fully licensed, insured, and bonded for your ultimate peace of mind.", "Con más de 5 años de experiencia y un radio de servicio de 100 millas alrededor de Nashville, nuestras instalaciones certificadas cumplen con las directrices FEMA P-320 para soportar vientos de más de 250 MPH. Contamos con licencia, seguro y fianza.")}
              </p>
            </div>

            {/* Highlight Banner */}
            <div className="w-full bg-gradient-to-r from-red-50 via-slate-50 to-transparent border-l-4 border-[#dc2626] p-4 rounded-r-2xl text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#dc2626] shrink-0" />
              <span>{t("Approximately 99% of our work is dedicated to protecting residential family homes, with custom commercial shelter solutions also available.", "Aproximadamente el 99% de nuestro trabajo está dedicado a proteger hogares familiares residenciales, con soluciones comerciales también disponibles.")}</span>
            </div>

            {/* Promise Points List — Premium Interactive Hover Cards */}
            <div className="w-full pt-1">
              <div className="grid gap-3 sm:gap-3.5 sm:grid-cols-2">
                {promisePoints.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group relative rounded-2xl p-3.5 sm:p-4 bg-gradient-to-br from-slate-50/90 via-white to-slate-50/50 border border-slate-200/90 hover:border-[#dc2626]/40 shadow-xs hover:shadow-[0_12px_28px_-8px_rgba(220,38,38,0.16)] transition-all duration-300 hover:-translate-y-1 overflow-hidden select-none"
                    >
                      {/* Ambient corner glow on hover */}
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#dc2626]/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="relative z-10 flex items-start gap-3">
                        {/* Icon Jewel */}
                        <div className="w-10 h-10 rounded-xl bg-red-50 group-hover:bg-[#dc2626] text-[#dc2626] group-hover:text-white border border-red-200/70 group-hover:border-[#dc2626] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 shadow-xs group-hover:shadow-md group-hover:shadow-red-600/30">
                          <Icon className="h-5 w-5 transition-transform duration-300" />
                        </div>

                        {/* Text & Details */}
                        <div className="flex flex-col text-left min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-[13px] sm:text-[13.5px] font-black text-[#0b0f15] group-hover:text-[#dc2626] transition-colors duration-200 leading-snug">
                              {item.title}
                            </span>
                            <span className="text-[9px] uppercase font-black tracking-wider text-slate-400 bg-white/90 border border-slate-200/80 px-1.5 py-0.5 rounded-full group-hover:border-red-200 group-hover:text-[#dc2626] group-hover:bg-red-50/80 transition-colors shrink-0">
                              {item.tag}
                            </span>
                          </div>

                          <p className="text-[11.5px] sm:text-[12px] text-slate-500 group-hover:text-slate-700 leading-relaxed font-medium transition-colors">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Bottom glowing underline accent on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Button variant="hero" size="xl" asChild className="font-extrabold rounded-full px-8 bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-md btn-glow">
                <Link to="/about">
                  {t("Learn More About Our Shelters", "Conozca Más Sobre Nuestros Refugios")} <ArrowRight className="ml-2 h-4 w-4 text-white" />
                </Link>
              </Button>
            </div>

          </div>

          {/* Right Column: Visual Container */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center max-w-sm sm:max-w-md mx-auto lg:max-w-none">

            {/* Soft Ambient Glow backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-[#dc2626]/10 blur-3xl -z-10 animate-pulse" />

            <div className="relative w-full max-w-[360px] sm:max-w-[460px] aspect-square lg:aspect-[4/5] rounded-[24px] sm:rounded-[32px] border border-red-500/30 bg-[#0b0f15] p-2.5 sm:p-3.5 shadow-2xl overflow-hidden group">

              <img
                src={shelterInteriorImg}
                alt="Inside view of an underground storm shelter with bench seating"
                className="w-full h-full object-cover rounded-[22px] select-none transition-transform duration-700 group-hover:scale-105"
              />

              {/* Top Floating Glass Badge */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-[#0b0f15]/90 backdrop-blur-md border border-red-500/40 px-3.5 py-2 rounded-2xl shadow-md select-none">
                <ShieldCheck className="h-4 w-4 text-[#dc2626]" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black uppercase text-white">FEMA P-320 &amp; ICC-500</span>
                  <span className="text-[9px] font-bold text-slate-300">Certified Life-Safety Vault</span>
                </div>
              </div>

              {/* Bottom Floating Glass Badge */}
              <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 bg-[#0b0f15]/90 backdrop-blur-md border border-red-500/40 text-white px-4 py-2.5 rounded-2xl shadow-lg select-none">
                <div className="flex text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                </div>
                <span className="text-xs font-black text-white">5+ Years Experience</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
