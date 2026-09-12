import { ArrowRight, Award, BadgeCheck, Clock, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import heroStorm from "@/assets/hero-storm.jpg";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-16 md:pt-20 flex items-center bg-[#0b0f15]">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroStorm}
          alt="Underground storm shelter hatch beneath severe Tennessee weather"
          className="h-full w-full object-cover object-center filter brightness-90 contrast-105"
        />
        {/* Multi-stage dark gradient overlays for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f15]/98 via-[#0b0f15]/85 to-[#0b0f15]/50 sm:from-[#0b0f15]/95 sm:via-[#0b0f15]/75 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15] via-transparent to-[#0b0f15]/70" />
      </div>

      {/* Animated blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-[#dc2626]/20 blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-red-600/15 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-20 w-full flex justify-start">
        <div className="animate-fade-up text-white flex flex-col items-start text-left max-w-4xl w-full">

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

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-xs sm:text-sm text-white/90 font-medium">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-red-500" /> ✓ {t("100-Mile Service Area", "Área de 100 Millas")}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-red-500" /> ✓ {t("24/7 Availability", "Disponible 24/7")}</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-red-500" /> ✓ {t("Licensed • Insured • Bonded", "Licenciado • Asegurado • Afianzado")}</span>
            <span className="inline-flex items-center gap-1.5"><Award className="h-4 w-4 text-red-500" /> ✓ {t("5+ Years Experience", "5+ Años de Experiencia")}</span>
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-red-500" /> ✓ {t("FEMA Compliant", "Cumplimiento FEMA")}</span>
          </div>

        </div>
      </div>
    </section>
  );
}
