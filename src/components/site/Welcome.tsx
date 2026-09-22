import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Star, HardHat, Home, MapPin } from "lucide-react";

import shelterInstallImg from "@/assets/gallery/shelterinstall.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";

const TinySparkleIcon = () => (
  <svg className="w-3.5 h-3.5 text-slate-600 fill-slate-600 shrink-0" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4z" />
  </svg>
);

export function Welcome() {
  const { t } = useLanguage();

  const promisePoints = [
    {
      title: t("Free On-Site Evaluation", "Evaluación Gratuita en el Sitio"),
      desc: t("We assess your property, soil conditions, yard access, and drainage before recommending the right shelter.", "Evaluamos su propiedad, condiciones del suelo y acceso antes de recomendar el refugio adecuado."),
      icon: ShieldCheck,
      tag: "Step 1",
    },
    {
      title: t("Excavation & Crane Placement", "Excavación y Colocación con Grúa"),
      desc: t("Our crew handles full excavation, crane delivery, precision leveling, and anchor installation — all in a single day for prefab units.", "Nuestro equipo realiza toda la excavación, entrega con grúa, nivelación y anclaje en un solo día."),
      icon: HardHat,
      tag: "Step 2",
    },
    {
      title: t("Immediate Backyard Access", "Acceso Inmediato en el Patio"),
      desc: t("Steps away from your back door. No long walk, no detour — immediate access when severe weather strikes.", "A pasos de su puerta trasera. Acceso inmediato cuando el clima severo golpea."),
      icon: Home,
      tag: "Access",
    },
    {
      title: t("Nashville, TN", "Nashville, TN"),
      desc: t("Locally owned and operated, serving the Nashville community with professional construction expertise.", "De propiedad local, sirviendo a la comunidad de Nashville con experiencia en construcción profesional."),
      icon: MapPin,
      tag: "Local",
    },
  ];

  return (
    <section id="welcome" className="bg-white overflow-hidden py-12 sm:py-16 lg:py-24 border-b border-slate-100 relative">
      {/* Subtle background */}
      <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-slate-400/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {/* Premium 2-Column Grid */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16 items-center">

          {/* Left Column: Copy & Checklist */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

            {/* Eyebrow Badge — slate */}
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-300 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-slate-700 shadow-xs">
              <TinySparkleIcon /> {t("Underground Shelter Construction", "Construcción de Refugios Subterráneos")} <TinySparkleIcon />
            </div>

            {/* Main Headline */}
            <h2
              className="font-display font-extrabold leading-tight text-[#0b0f15] tracking-tight -mt-[14px] mb-[10px] text-[28px] sm:text-[36px] lg:text-[41px]"
              style={{ fontSize: "clamp(26px, 4vw, 41px)", marginTop: "-14px", marginBottom: "10px" }}
            >
              {t("Built Underground. ", "Construido bajo Tierra. ")}
              <span className="gradient-text-construction">
                {t("Built to Last.", "Construido para Durar.")}
              </span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-3.5 text-slate-600 text-[14px] sm:text-base leading-relaxed font-normal">
              <p>
                {t("Southern Storm Shelters LLC builds underground storm shelters designed for a multi-generational lifespan. Featuring innovative design and industry-leading safety features, our shelters offer the ultimate protection for your family.", "Southern Storm Shelters LLC construye refugios subterráneos diseñados para una vida útil multigeneracional.")}
              </p>
              <p>
                {t("Based in Nashville, TN, we expertly install prefabricated in-ground units and build fully custom concrete shelters with precision using proper excavation and heavy crane equipment.", "Ubicados en Nashville, TN, instalamos de manera experta unidades subterráneas prefabricadas y construimos refugios de concreto totalmente personalizados.")}
              </p>
            </div>

            {/* Highlight Banner — amber accent */}
            <div className="w-full bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-2xl text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-amber-600 shrink-0" />
              <span>{t("Our commitment to quality starts with construction and engineering features that exceed standard requirements, providing peace of mind for decades to come.", "Nuestro compromiso con la calidad comienza con características de construcción que superan los requisitos estándar.")}</span>
            </div>

            {/* Promise Points List — Premium Interactive Hover Cards */}
            <div className="w-full pt-1">
              <div className="grid gap-3 sm:gap-3.5 sm:grid-cols-2">
                {promisePoints.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group relative rounded-2xl p-3.5 sm:p-4 bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden select-none"
                    >
                      <div className="relative z-10 flex items-start gap-3">
                        {/* Icon */}
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 shrink-0 border border-amber-500/20 group-hover:scale-110 transition-transform">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full shrink-0">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed mt-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <Button variant="hero" size="lg" asChild className="font-bold rounded-full px-6 text-sm sm:text-base bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md hover:shadow-lg transition-all duration-200">
                <Link to="/about">
                  {t("Learn More About Our Shelters", "Conozca Más Sobre Nuestros Refugios")} <ArrowRight className="ml-2 h-4 w-4 text-white" />
                </Link>
              </Button>
            </div>

          </div>

          {/* Right Column: Visual Container */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center max-w-md sm:max-w-lg lg:max-w-none mx-auto">

            {/* Soft Ambient Glow backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[480px] h-[500px] sm:h-[640px] rounded-full bg-slate-300/10 blur-3xl -z-10 pointer-events-none" />

            <div className="relative w-full max-w-[400px] sm:max-w-[480px] lg:max-w-[500px] xl:max-w-[520px] aspect-[4/5] sm:aspect-[3/4] lg:aspect-[3/4] min-h-[340px] sm:min-h-[460px] lg:min-h-[640px] xl:min-h-[680px] rounded-[24px] sm:rounded-[32px] border border-slate-300 bg-[#0b0f15] p-2.5 sm:p-3.5 shadow-xl overflow-hidden group">

              <img
                src={shelterInstallImg}
                alt="Southern Storm Shelters installation jobsite"
                className="w-full h-full object-cover rounded-[20px] sm:rounded-[26px] select-none transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Bottom Floating Glass Badge */}
              <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 bg-[#0b0f15]/90 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-2xl shadow-lg select-none">
                <div className="flex text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                </div>
                <span className="text-xs font-black text-white">Nashville, TN</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
