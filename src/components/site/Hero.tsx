import { ArrowRight, Award, BadgeCheck, Check, Clock, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import heroVideo from "@/assets/hero.mp4";
import heroStorm from "@/assets/hero-storm.jpg";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-16 md:pt-20 flex items-center bg-[#0b0f15]">
      {/* Background Video with Cinematic Dark Contrast Overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroStorm}
          className="h-full w-full object-cover object-center filter brightness-95 sm:brightness-100 contrast-105 pointer-events-none select-none"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Lightened, balanced gradient overlays to maximize video visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f15]/80 via-[#0b0f15]/40 to-black/15 sm:from-[#0b0f15]/75 sm:via-[#0b0f15]/30 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15]/80 via-transparent to-[#0b0f15]/25" />
      </div>

      {/* Subtle atmospheric glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-[#dc2626]/10 blur-3xl animate-blob" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-20 w-full flex justify-start">
        <div className="animate-fade-up text-white flex flex-col items-start text-left max-w-5xl w-full drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">

          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-black/60 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-md">
            <span className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current text-amber-400" />)}
            </span>
            <span className="text-red-300 font-bold">
              {t("FEMA P-320 & ICC-500 Certified • Nashville's Shelter Experts", "Certificación FEMA P-320 e ICC-500 • Expertos en Refugios de Nashville")}
            </span>
          </span>

          {/* Main Headline */}
          <h1 className="mt-4 sm:mt-5 font-display font-extrabold tracking-tight leading-[1.2] sm:leading-[1.25]">
            <span className="block text-[21px] sm:text-[28px] md:text-[34px] lg:text-[38px] whitespace-normal sm:whitespace-nowrap">
              {t("Protect What Matters ", "Proteja Lo Que Más ")}
              <span className="gradient-text-orange">{t("Most.", "Importa.")}</span>
            </span>
            <span className="block text-[17px] sm:text-[25px] md:text-[31px] lg:text-[36px] whitespace-normal sm:whitespace-nowrap text-slate-200 mt-1 sm:mt-1.5">
              {t("— Premium Underground Storm Shelters.", "— Refugios Subterráneos de Alta Resistencia.")}
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mt-3 mb-0 text-slate-200 text-[13px] sm:text-[15px] md:text-[17px] leading-relaxed font-normal">
            {t("Protect your family, home, and future with professionally installed underground storm shelters from Southern Storm Shelters LLC. Engineered for serious severe-weather and tornado protection across Nashville and a 100-mile service radius.", "Proteja a su familia, hogar y futuro con refugios subterráneos contra tormentas instalados profesionalmente por Southern Storm Shelters LLC. Diseñados para tornados severos y protección climática extrema en Nashville y un radio de 100 millas.")}
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button variant="hero" size="xl" asChild className="w-full sm:w-auto justify-center bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-lg btn-glow">
              <Link to="/free-quote">
                📋 {t("Get a Free Estimate", "Solicitar Estimación Gratis")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild className="w-full sm:w-auto justify-center border-white/40 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
              <a href="tel:+16159912361">
                <Phone className="h-4 w-4 text-red-400" /> (615) 991-2361
              </a>
            </Button>
          </div>

          {/* Trust Badges — Pixel-Perfect Single-Line Ribbon */}
          <div className="mt-7 pt-5 border-t border-white/10 w-full overflow-hidden">
            <div className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 flex-nowrap overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {/* 1. 100-Mile Service Area */}
              <div className="group inline-flex items-center gap-1.5 lg:gap-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-red-500/40 px-3 py-1.5 text-[11px] lg:text-[11.5px] font-semibold text-slate-200 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 select-none whitespace-nowrap shrink-0">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Check className="h-2 w-2 stroke-[3]" />
                </span>
                <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="tracking-wide">
                  <strong className="text-white font-bold">100-Mile</strong> {t("Service Area", "Área de Servicio")}
                </span>
              </div>

              {/* 2. 24/7 Availability */}
              <div className="group inline-flex items-center gap-1.5 lg:gap-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-red-500/40 px-3 py-1.5 text-[11px] lg:text-[11.5px] font-semibold text-slate-200 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 select-none whitespace-nowrap shrink-0">
                <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <Clock className="h-3.5 w-3.5 text-red-400 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="tracking-wide">
                  <strong className="text-white font-bold">24/7</strong> {t("Availability", "Disponibilidad")}
                </span>
              </div>

              {/* 3. Licensed • Insured • Bonded */}
              <div className="group inline-flex items-center gap-1.5 lg:gap-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-red-500/40 px-3 py-1.5 text-[11px] lg:text-[11.5px] font-semibold text-slate-200 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 select-none whitespace-nowrap shrink-0">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Check className="h-2 w-2 stroke-[3]" />
                </span>
                <ShieldCheck className="h-3.5 w-3.5 text-red-400 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="tracking-wide font-medium">
                  {t("Licensed • Insured • Bonded", "Licenciado • Asegurado • Afianzado")}
                </span>
              </div>

              {/* 4. 5+ Years Experience */}
              <div className="group inline-flex items-center gap-1.5 lg:gap-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-red-500/40 px-3 py-1.5 text-[11px] lg:text-[11.5px] font-semibold text-slate-200 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 select-none whitespace-nowrap shrink-0">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Check className="h-2 w-2 stroke-[3]" />
                </span>
                <Award className="h-3.5 w-3.5 text-red-400 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="tracking-wide">
                  <strong className="text-white font-bold">5+ Years</strong> {t("Experience", "Experiencia")}
                </span>
              </div>

              {/* 5. FEMA Compliant */}
              <div className="group inline-flex items-center gap-1.5 lg:gap-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-red-500/30 hover:border-red-500/60 px-3 py-1.5 text-[11px] lg:text-[11.5px] font-semibold text-slate-200 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 select-none whitespace-nowrap shrink-0 shadow-red-950/20">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500/20 text-red-400 border border-red-500/40 shrink-0">
                  <Check className="h-2 w-2 stroke-[3]" />
                </span>
                <BadgeCheck className="h-3.5 w-3.5 text-red-400 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="tracking-wide">
                  <strong className="text-white font-bold">FEMA</strong> {t("Compliant", "Cumplimiento")}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
