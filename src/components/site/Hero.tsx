import { useState, useEffect } from "react";
import { ArrowRight, Hammer, Check, MapPin, Phone, HardHat } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import heroImgNew from "@/assets/gallery/2.png";
import heroImg1 from "@/assets/gallery/Professional Installation.jpg";
import heroImg2 from "@/assets/gallery/shelterinstall.jpg";

const heroImages = [
  {
    src: heroImgNew,
    alt: "Underground storm shelter construction",
  },
  {
    src: heroImg1,
    alt: "Tornado shelter installation",
  },
  {
    src: heroImg2,
    alt: "Underground storm shelter structure",
  },
];

export function Hero() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-16 md:pt-20 flex items-center bg-[#0b0f15]">
      {/* Background Image Carousel with Cinematic Dark Contrast Overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-1000 ease-in-out ${
              currentImageIndex === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          />
        ))}
        {/* Lightened, balanced gradient overlays to maximize image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f15]/85 via-[#0b0f15]/50 to-black/25 sm:from-[#0b0f15]/80 sm:via-[#0b0f15]/40 sm:to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f15]/85 via-transparent to-[#0b0f15]/30" />
      </div>

      {/* Subtle atmospheric glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-slate-400/10 blur-3xl animate-blob" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pt-20 w-full flex justify-start">
        <div className="animate-fade-up text-white flex flex-col items-start text-left max-w-5xl w-full drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">

          {/* Eyebrow badge — construction credibility */}
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-black/60 px-4 py-1.5 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-md">
            <HardHat className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-amber-300 font-bold">
              {t("Nashville's Underground Shelter Builders", "Constructores de Refugios Subterráneos en Nashville")}
            </span>
          </span>

          {/* Main Headline */}
          <h1 className="mt-4 sm:mt-5 font-display font-extrabold tracking-tight leading-[1.2] sm:leading-[1.25]">
            <span className="block text-[18px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-amber-400 mb-2">
              {t("America's Leading Storm Shelters", "Refugios Líderes en América")}
            </span>
            <span className="block text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] whitespace-normal sm:whitespace-nowrap leading-tight">
              {t("Does Your Family Have a ", "Tiene su Familia un ")}
            </span>
            <span className="block text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] whitespace-normal sm:whitespace-nowrap leading-tight">
              {t("Safe Place to ", "Lugar Seguro para ")}
              <span className="gradient-text-orange">{t("Take Shelter?", "Refugiarse?")}</span>
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mt-4 mb-0 text-slate-200 text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed font-normal">
            {t("Severe weather is notoriously unpredictable. The smartest thing you can do for your family is to be prepared. We build and install heavy-gauge steel and custom concrete underground shelters in Nashville, TN—engineered for a lifetime of near-absolute protection.", "El clima severo es notoriamente impredecible. Lo más inteligente que puede hacer por su familia es estar preparado. Construimos e instalamos refugios de acero de calibre grueso y de concreto en Nashville, TN, diseñados para toda una vida de protección.")}
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button variant="hero" size="xl" className="w-full sm:w-auto justify-center bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-lg btn-glow">
              📋 {t("Get a Free Estimate", "Solicitar Estimación Gratis")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="heroOutline" size="xl" asChild className="w-full sm:w-auto justify-center border-white/40 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md">
              <a href="tel:+16159912361">
                <Phone className="h-4 w-4 text-slate-300" /> (615) 991-2361
              </a>
            </Button>
          </div>

          {/* Trust Badges — Construction Credibility */}
          <div className="mt-7 pt-5 border-t border-white/10 w-full overflow-hidden">
            <div className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 flex-nowrap overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

              {/* 1. Steel + Concrete Builds */}
              <div className="group inline-flex items-center gap-1.5 lg:gap-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-amber-500/40 px-3 py-1.5 text-[11px] lg:text-[11.5px] font-semibold text-slate-200 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 select-none whitespace-nowrap shrink-0">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                  <Check className="h-2 w-2 stroke-[3]" />
                </span>
                <Hammer className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="tracking-wide">
                  <strong className="text-white font-bold">Steel</strong> {t("& Concrete Builds", "y Construcción de Concreto")}
                </span>
              </div>

              {/* 2. Free Site Evaluation */}
              <div className="group inline-flex items-center gap-1.5 lg:gap-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-slate-500/40 px-3 py-1.5 text-[11px] lg:text-[11.5px] font-semibold text-slate-200 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 select-none whitespace-nowrap shrink-0">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Check className="h-2 w-2 stroke-[3]" />
                </span>
                <span className="tracking-wide">
                  {t("Free Site Evaluation", "Evaluación Gratuita del Sitio")}
                </span>
              </div>

              {/* 3. Nashville, TN */}
              <div className="group inline-flex items-center gap-1.5 lg:gap-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-slate-500/40 px-3 py-1.5 text-[11px] lg:text-[11.5px] font-semibold text-slate-200 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 select-none whitespace-nowrap shrink-0">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Check className="h-2 w-2 stroke-[3]" />
                </span>
                <MapPin className="h-3.5 w-3.5 text-slate-300 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="tracking-wide">
                  <strong className="text-white font-bold">Nashville, TN</strong>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-5 right-6 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-lg">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            aria-label={`Switch to slide ${idx + 1}`}
            className={`h-2 transition-all duration-300 rounded-full ${
              currentImageIndex === idx
                ? "w-6 bg-slate-300"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
