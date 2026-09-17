import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock,
  Star,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import residentialShelterImg from "@/assets/granger-inside-shelter.jpg";
import logoImg from "@/assets/logo-mark.png";

interface FAQItem {
  id: string;
  q: string;
  qEs: string;
  a: string;
  aEs: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    q: "How deep is an underground storm shelter installed?",
    qEs: "¿A qué profundidad se instala un refugio subterráneo?",
    a: "Most residential underground shelters are engineered so the reinforced lid sits slightly above natural grade for proper watershed, with the reinforced vault resting 6 to 8 feet below ground level. Exact depth is determined during the on-site evaluation.",
    aEs: "La mayoría de los refugios subterráneos residenciales están diseñados para que la tapa reforzada quede ligeramente sobre el nivel del suelo para el drenaje de agua, con la bóveda a 6-8 pies bajo tierra.",
  },
  {
    id: "faq-2",
    q: "How long does the shelter installation process take?",
    qEs: "¿Cuánto tiempo toma el proceso de instalación del refugio?",
    a: "Most residential turnkey installations are completed in a single day once site excavation begins. We coordinate heavy crane setting, anchoring, sealing, and backfill efficiently with minimal yard disruption.",
    aEs: "La mayoría de las instalaciones residenciales llave en mano se completan en un solo día una vez iniciada la excavación. Coordinamos la grúa pesada, el anclaje y el relleno eficientemente.",
  },

  {
    id: "faq-4",
    q: "What areas do you serve around Nashville, TN?",
    qEs: "¿Qué áreas cubren alrededor de Nashville, TN?",
    a: "We serve a 100-mile radius around Nashville, Tennessee — including Franklin, Murfreesboro, Hendersonville, Brentwood, Clarksville, Columbia, Lebanon, Mount Juliet, and surrounding Middle Tennessee communities.",
    aEs: "Servimos un radio de 100 millas alrededor de Nashville, TN — incluyendo Franklin, Murfreesboro, Hendersonville, Brentwood, Clarksville, Columbia, Lebanon y comunidades cercanas.",
  },
  {
    id: "faq-5",
    q: "Do you offer residential and commercial safe rooms?",
    qEs: "¿Ofrecen salas seguras residenciales y comerciales?",
    a: "Yes! While approximately 99% of our projects protect residential families and homeowners, we also engineer and install heavy-capacity commercial storm shelters for businesses and job sites.",
    aEs: "¡Sí! Aunque aproximadamente el 99% de nuestros proyectos son para familias residenciales, también diseñamos e instalamos refugios comerciales de alta capacidad para empresas.",
  },
  {
    id: "faq-6",
    q: "How do I request a free on-site estimate?",
    qEs: "¿Cómo solicito una estimación gratuita en el sitio?",
    a: "You can call us directly at 615-991-2361 or submit an estimate request online. We evaluate your property, soil, access, and provide an upfront transparent quote.",
    aEs: "Puede llamarnos directamente al 615-991-2361 o enviar una solicitud en línea. Evaluamos su propiedad, suelo y brindamos una cotización transparente.",
  },
];

export function ContactIllustrationSection() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative py-[60px] bg-white border-b border-slate-100 overflow-hidden"
      style={{ paddingTop: "60px", paddingBottom: "60px" }}
    >

      {/* ── Background Decorations ──────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] opacity-60" />
        <div className="absolute -top-40 right-0 w-[560px] h-[560px] rounded-full bg-red-600/8 blur-[130px]" />
        <div className="absolute bottom-0 -left-24 w-[500px] h-[500px] rounded-full bg-amber-500/8 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-[90%] max-w-7xl">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN: FAQ Accordion (col-span-7) ───── */}
          <div className="lg:col-span-7 space-y-4 text-left">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-5 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#dc2626] shadow-sm"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {t("Frequently Asked Questions", "Preguntas Frecuentes")}
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h2
                className="font-display font-black text-slate-900 tracking-tight leading-tight text-[24px] sm:text-[32px] lg:text-[37px]"
                style={{ marginTop: "-18px", marginBottom: "5px" }}
              >
                {t("Got Questions? ", "¿Tiene Preguntas? ")}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#b91c1c]">
                  {t("We Have Clear Answers.", "Tenemos Respuestas Claras.")}
                </span>
              </h2>
              <p className="text-slate-500 font-medium text-[14.5px] leading-relaxed max-w-xl">
                {t(
                  "Everything you need to know about engineering specs, site evaluation, and installation timeline for Middle Tennessee properties.",
                  "Todo lo que necesita saber sobre especificaciones de ingeniería, evaluación del sitio y tiempos de instalación en Middle Tennessee."
                )}
              </p>
            </motion.div>

            {/* Accordion list */}
            <div className="space-y-2 pt-1">
              {faqs.map((faq, idx) => {
                const isOpen = openId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className={`rounded-xl border transition-all duration-300 overflow-hidden ${isOpen
                      ? "bg-red-50/30 border-[#dc2626]/40 shadow-xs"
                      : "bg-white border-slate-200 hover:border-red-300 hover:shadow-xs"
                      }`}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex items-center justify-between py-2.5 px-3.5 sm:py-3 sm:px-4 text-left gap-3 cursor-pointer select-none"
                      aria-expanded={isOpen}
                    >
                      <span className="font-extrabold text-[13.5px] sm:text-[14.5px] text-slate-900 leading-snug flex items-center gap-2.5">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${isOpen ? "bg-[#dc2626]" : "bg-slate-300"
                          }`} />
                        {t(faq.q, faq.qEs)}
                      </span>
                      <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                        ? "bg-[#dc2626] text-white rotate-180 shadow-xs"
                        : "bg-slate-100 text-slate-500 group-hover:bg-red-50"
                        }`}>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                        >
                          <div className="px-4 pb-3 pt-0 text-slate-600 font-medium text-[12.5px] sm:text-[13px] leading-relaxed border-t border-red-100 mt-0.5 pt-2.5">
                            {t(faq.a, faq.aEs)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Direct call bottom line */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <div
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white border border-red-500/50 text-[11px] font-black uppercase tracking-widest rounded-full px-7 py-3.5 shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 w-full sm:w-auto cursor-default"
              >
                {t("Ask a Question", "Hacer una Pregunta")}
                <ArrowRight className="h-4 w-4" />
              </div>
              <a
                href="tel:6159912361"
                className="inline-flex items-center gap-2 text-slate-800 text-[13px] font-extrabold hover:text-[#dc2626] transition-colors cursor-pointer"
              >
                <Phone className="h-4 w-4 text-[#dc2626]" />
                {t("Call (615) 991-2361", "Llamar (615) 991-2361")}
              </a>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Section Image Showcase (col-span-5) ─ */}
          <div className="lg:col-span-5 relative w-full lg:sticky lg:top-[120px] self-start mt-8 lg:mt-0">
            {/* Outer ambient glow */}
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-red-600/15 via-transparent to-amber-500/15 blur-xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 85, damping: 16, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-[0_24px_70px_-12px_rgba(0,0,0,0.22)] border-2 border-white group"
            >
              {/* Main Image */}
              <img
                src={residentialShelterImg}
                alt="Residential Underground Storm Shelter Installation in Nashville, TN"
                className="w-full h-[360px] sm:h-[480px] lg:h-[580px] object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20 pointer-events-none" />

              {/* Floating Top Header Bar: Logo + Business Name & Phone */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20">
                <div className="flex items-center gap-2.5 bg-slate-950/80 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-2xl shadow-lg">
                  <img src={logoImg} alt="Southern Storm Shelters Logo" className="w-6 h-6 object-contain" />
                  <div className="text-left">
                    <p className="text-[11px] font-black text-white leading-none tracking-tight">Southern Storm Shelters</p>
                    <p className="text-[9px] font-bold text-red-400 leading-none mt-0.5">LLC · Nashville, TN</p>
                  </div>
                </div>

                <a
                  href="tel:6159912361"
                  className="inline-flex items-center gap-1.5 bg-[#dc2626] border border-red-400/50 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-2xl shadow-lg hover:scale-105 transition-transform"
                >
                  <Phone className="w-3 h-3 fill-current" />
                  <span>(615) 991-2361</span>
                </a>
              </div>

              {/* Floating Bottom Card: Action & Details */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-2xl text-left z-20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#dc2626] font-black block">
                      {t("Nashville, TN", "Nashville, TN")}
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                      {t("Call (615) 991-2361 for Free Estimates", "Llama al (615) 991-2361 para Estimaciones")}
                    </p>
                  </div>
                  <a
                    href="tel:6159912361"
                    className="shrink-0 w-9 h-9 rounded-full bg-[#0F172A] text-white flex items-center justify-center border border-white/20 shadow-md hover:bg-[#dc2626] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
