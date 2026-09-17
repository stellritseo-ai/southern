import {
  ArrowRight,
  Shield,
  Hammer,
  CheckCircle2,
  Phone,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";

import shelterCardImg1 from "@/assets/gallery/6.png";
import grangerCustomImg from "@/assets/granger-shelter-unit.jpg";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

function ServiceCard({ s }: {
  s: {
    id: string; icon: any; title: string; categoryLabel: string;
    badge?: string; desc: string; features: string[]; image: string;
  };
}) {
  const Icon = s.icon;
  const { t } = useLanguage();
  return (
    <div className="group relative w-full min-h-[480px] sm:min-h-[560px] rounded-[32px] overflow-hidden bg-slate-950 border border-slate-200/80 hover:border-[#dc2626] shadow-xl hover:shadow-[0_22px_60px_rgba(220,38,38,0.3)] transition-all duration-500 cursor-default flex flex-col justify-end select-none">
      <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(11, 15, 21, 0.98) 0%, rgba(11, 15, 21, 0.92) 36%, rgba(11, 15, 21, 0.45) 60%, rgba(11, 15, 21, 0.08) 80%, rgba(0, 0, 0, 0) 100%)" }} />
      <div className="absolute inset-0 rounded-[32px] border-2 border-transparent group-hover:border-slate-400/50 transition-colors duration-500 pointer-events-none" />
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        <div className="w-11 h-11 rounded-2xl bg-[#0b0f15]/90 backdrop-blur-md border border-slate-500/40 text-slate-300 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-slate-700 group-hover:text-white transition-all duration-300"><Icon className="h-5 w-5" /></div>
        <span className="bg-black/80 backdrop-blur-md border border-slate-500/30 text-slate-300 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">{s.categoryLabel}</span>
      </div>
      {s.badge && (
        <div className="absolute top-[68px] left-4 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-amber-500 text-amber-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">⭐ {s.badge}</span>
        </div>
      )}
      <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-1">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight group-hover:text-slate-300 transition-colors duration-300">{s.title}</h3>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3 font-normal line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{s.desc}</p>
        <div className="mt-5 pt-4 border-t border-white/15 space-y-2.5">
          {s.features.map((feat) => (
            <div key={feat} className="flex items-center gap-2.5 text-sm font-bold text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /><span>{feat}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <div className="overflow-hidden">
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-slate-300 text-xs font-black uppercase tracking-widest group/btn">
              <span className="inline-flex items-center gap-1.5 group-hover/btn:underline">{t("Get a Free Quote", "Solicitar Cotizacion")}</span>
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-slate-700 text-white flex items-center justify-center transition-all duration-300"><ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const { t } = useLanguage();
  const services = [
    {
      id: "inground-storm-shelter", icon: Shield,
      title: t("In-Ground Prefabricated Storm Shelter", "Refugio Subterráneo Prefabricado"),
      categoryLabel: t("Most Popular", "Mas Popular"),
      badge: t("Our #1 Seller", "Mas Vendido"),
      desc: t("Heavy-gauge corrugated steel vault, powder-coated for corrosion resistance, set in-ground by crane in a single day. Anchored with galvanized auger straps — no concrete pad required. Ready to protect your family immediately after installation.", "Bóveda de acero corrugado de alto calibre, recubierta de polvo para resistencia a la corrosión."),
      features: [
        t("14-gauge corrugated steel — powder-coated finish", "Acero corrugado de calibre 14"),
        t("Galvanized auger anchor system — no concrete pad needed", "Sistema de ancla de barrena galvanizada"),
        t("Spring-loaded interior latch — cannot open from outside", "Pestillo interior de resorte"),
        t("Polyethylene bench seating + dual one-way vents", "Bancas de polietileno + ventilación dual"),
      ],
      image: shelterCardImg1,
    },
    {
      id: "custom-built-storm-shelter", icon: Hammer,
      title: t("Custom Built Storm Shelter", "Refugio de Construccion Personalizada"),
      categoryLabel: t("Premium", "Premium"),
      badge: undefined,
      desc: t("A fully custom-designed concrete storm shelter built to your exact specifications. Reinforced concrete walls, custom size and layout, premium interior finishes — the ultimate in underground protection, built on your property by our crew.", "Un refugio de tormenta de concreto completamente personalizado según sus especificaciones exactas."),
      features: [
        t("Reinforced concrete construction — custom thickness", "Construcción de concreto reforzado"),
        t("Choose your size, entry configuration & depth", "Elija tamaño, configuración y profundidad"),
        t("Interior lighting, seating, ventilation & storage", "Iluminación, asientos, ventilación y almacenamiento"),
        t("Built on-site to your property's exact needs", "Construído en su propiedad según sus necesidades"),
      ],
      image: grangerCustomImg,
    },
  ];

  return (
    <section id="services" className="bg-[#F8FAFC] py-12 sm:py-16 lg:py-24 overflow-hidden border-y border-slate-200/60 relative">
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-slate-400/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] rounded-full bg-slate-400/5 blur-3xl pointer-events-none -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="max-w-3xl lg:max-w-4xl text-left space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-300 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              {t("Two Ways to Get Protected", "Dos Formas de Protegerse")}
              <Sparkles className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <h2 className="font-display text-[20px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-black text-slate-900 tracking-tight leading-tight -mt-[10px] mb-[7px] whitespace-normal sm:whitespace-nowrap" style={{ marginTop: "-10px", marginBottom: "7px" }}>
              {t("Built for Protection, ", "Construido para Proteger, ")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#b91c1c]">{t("Designed Around You.", "Disenado para Usted.")}</span>
            </h2>
            <p className="text-slate-600 text-[14px] sm:text-base lg:text-lg leading-relaxed font-normal max-w-2xl">
              {t("Whether you want a prefabricated in-ground shelter installed in a day, or a fully custom concrete shelter with premium amenities — we build both across Nashville and Middle Tennessee.", "Ya sea un refugio subterraneo prefabricado o un refugio de concreto personalizado — construimos ambos en Nashville y Middle Tennessee.")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
            <Button variant="hero" size="lg" className="font-bold rounded-full px-6 text-sm sm:text-base bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto justify-center">
              {t("Get a Free Quote", "Solicitar Cotizacion Gratis")}<ArrowRight className="w-4 h-4 ml-1 text-white" />
            </Button>
          </div>
        </div>
        <div className="-mt-[20px] relative z-20 grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 px-3 sm:px-5 py-[5px] rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 min-w-0 text-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><Clock className="w-4 h-4 sm:w-5 sm:h-5" /></div>
            <div className="flex flex-col text-center min-w-0">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-tight truncate">{t("Same-Day Install", "Instalacion el Mismo Dia")}</span>
              <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-500 truncate">{t("In-Ground Prefab Units", "Unidades Prefabricadas")}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 min-w-0 text-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><Phone className="w-4 h-4 sm:w-5 sm:h-5" /></div>
            <div className="flex flex-col text-center min-w-0">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-tight truncate">{t("Call Us Today", "Llámenos Hoy")}</span>
              <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-500 truncate">{t("Mon-Sat: 8:00 AM-5:00 PM", "Lun-Sáb: 8:00 AM-5:00 PM")}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 min-w-0 col-span-2 md:col-span-1 text-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4 sm:w-5 sm:h-5" /></div>
            <div className="flex flex-col text-center min-w-0">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-tight truncate">{t("Nashville, TN", "Nashville, TN")}</span>
              <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-500 truncate">{t("Local Installations", "Instalaciones Locales")}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((s, idx) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <ServiceCard s={s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
