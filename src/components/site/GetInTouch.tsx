import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, HardHat } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { addWebEmail } from "@/lib/leads-store";
import { SITE_CONFIG } from "@/config/site-config";

const TinySparkleIcon = () => (
  <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4z" />
  </svg>
);

export function GetInTouch() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleGitSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const name = (form.querySelector("input[name='name']") as HTMLInputElement)?.value || "";
    const phone = (form.querySelector("input[name='phone']") as HTMLInputElement)?.value || "";
    const email = (form.querySelector("input[name='email']") as HTMLInputElement)?.value || "";
    const address = (form.querySelector("input[name='address']") as HTMLInputElement)?.value || "";
    const projectType = (form.querySelector("select[name='projectType']") as HTMLSelectElement)?.value || "";
    const timeframe = (form.querySelector("select[name='timeframe']") as HTMLSelectElement)?.value || "";
    const msg = (form.querySelector("textarea[name='message']") as HTMLTextAreaElement)?.value || "";

    try {
      await addWebEmail({
        name,
        phone,
        email,
        service: `Project: ${projectType} | Timeframe: ${timeframe} | Address: ${address}`,
        message: msg,
        source: "Landing Free Estimate Form"
      });

      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="get-in-touch" className="relative py-[60px] bg-white border-b border-slate-100 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="mx-auto w-[90%] max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-5">
            <TinySparkleIcon /> {t("Request a Free Estimate", "Solicitar Estimación Gratis")} <TinySparkleIcon />
          </span>
          <h2 className="text-[19px] sm:text-[24px] lg:text-[30px] font-extrabold text-[#0F172A] leading-tight mt-0 sm:mt-[-10px] mb-[5px] tracking-tight sm:whitespace-nowrap">
            {t("Get Your Free, ", "Obtenga Su ")}
            <span className="gradient-text-construction">
              {t("No-Obligation Estimate", "Estimación Sin Compromiso")}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
            <span className="md:block">
              {t(
                "Tell us about your property — residential underground shelter, commercial safe room, or crane installation —",
                "Cuéntenos sobre su propiedad — refugio subterráneo residencial, comercial o instalación con grúa —"
              )}
            </span>{" "}
            <span className="md:block">
              {t(
                "and our team will provide a transparent evaluation within 24 hours.",
                "y le daremos una evaluación transparente en 24 horas."
              )}
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b0f15] via-[#111722] to-[#1e293b] text-white p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-700"
          >
            <div className="absolute inset-0 bg-grid opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6 border border-amber-500/40 text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Nashville Office &amp; 100-Mile Radius
              </span>
              <h3 className="text-2xl font-display font-black uppercase tracking-wider text-white">
                Contact Info
              </h3>
              <p className="mt-3 text-sm text-slate-300 font-medium leading-relaxed">
                Southern Storm Shelters LLC — Engineered Underground Storm Shelters &amp; Severe Weather Safe Rooms.
              </p>

              <ul className="mt-8 space-y-6">
                <Item
                  icon={Phone}
                  label="Direct Office Phone"
                  value={SITE_CONFIG.phone}
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  isCall
                />
                <Item
                  icon={Mail}
                  label="Direct Email"
                  value={SITE_CONFIG.email}
                  href={`mailto:${SITE_CONFIG.email}`}
                />
                <Item
                  icon={MapPin}
                  label="Office Address"
                  value={SITE_CONFIG.address}
                />
                <Item
                  icon={Clock}
                  label="Business Hours"
                  value={SITE_CONFIG.operatingHours.scheduleText}
                />
              </ul>
            </div>

            <div className="relative mt-10 pt-6 border-t border-white/15 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
                {SITE_CONFIG.licenseNotice}
              </span>
            </div>
          </motion.div>

          {/* Right: Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 relative flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="grid place-items-center text-center py-16"
                >
                  <div className="grid place-items-center h-16 w-16 rounded-full bg-amber-50 text-amber-600 mb-5 shadow-sm">
                    <CheckCircle2 className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-[#0F172A] uppercase tracking-wider">
                    Estimate Request Received
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 font-semibold max-w-sm">
                    Thanks! We'll review your property details and respond promptly. For urgent assistance, call 615-991-2361.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleGitSubmit}
                  className="space-y-5 text-left"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Full Name *"
                      name="name"
                      placeholder="Homeowner / Business Name"
                      required
                    />
                    <Field
                      label="Phone Number *"
                      name="phone"
                      type="tel"
                      placeholder="615-991-2361"
                      required
                    />
                    <Field
                      label="Email Address *"
                      name="email"
                      type="email"
                      placeholder="yourname@example.com"
                      required
                    />
                    <Field
                      label="Address or ZIP Code *"
                      name="address"
                      placeholder="Nashville, TN 37204"
                      required
                    />

                    <div>
                      <Label>Shelter Project Type</Label>
                      <select
                        name="projectType"
                        required
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base sm:text-xs font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="Residential Underground Shelter">Residential Underground Shelter</option>
                        <option value="Commercial Storm Shelter">Commercial Storm Shelter</option>
                        <option value="Shelter Installation & Crane Set">Shelter Installation & Crane Set</option>
                        <option value="Site Preparation & Excavation">Site Preparation & Excavation</option>
                        <option value="Shelter Replacement / Upgrade">Shelter Replacement / Upgrade</option>
                      </select>
                    </div>

                    <div>
                      <Label>Timeline / Project Phase</Label>
                      <select
                        name="timeframe"
                        required
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base sm:text-xs font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="As Soon As Possible">As Soon As Possible</option>
                        <option value="Within 1-2 weeks">Within 1-2 weeks</option>
                        <option value="Within 30 days">Within 30 days</option>
                        <option value="Planning / Future project">Planning / Future project</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <Label>Tell Us About Your Property</Label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Describe your yard access, property grade, family capacity needs, or any specific requirements..."
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base sm:text-xs font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 focus:bg-white transition-all resize-none"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white border border-amber-500/50 px-6 py-4 text-xs font-black uppercase tracking-wider shadow-md hover:brightness-110 cursor-pointer transition-all duration-300 disabled:opacity-75"
                  >
                    <span>{submitting ? "Submitting..." : "Request a Free Estimate →"}</span>
                  </motion.button>

                  <p className="text-center text-[11px] text-slate-500 font-semibold">
                    We respond promptly during business hours. For immediate assistance, call {SITE_CONFIG.phone}.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Item({
  icon: Icon,
  label,
  value,
  href,
  isCall,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
  isCall?: boolean;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`grid place-items-center h-10 w-10 rounded-xl text-white shrink-0 transition-all duration-300 ${
          isCall 
            ? "bg-amber-600 text-white border border-amber-400/40 shadow-sm" 
            : "bg-white/10 border border-white/10 hover:bg-white/15"
        }`}
      >
        <Icon className="h-5 w-5 text-white" />
      </motion.div>
      <div className="text-left">
        <div className="text-[9px] uppercase tracking-wider text-white/70 font-bold">
          {label}
        </div>
        <div
          className={`font-display font-bold leading-tight ${isCall ? "text-lg text-white" : "text-sm text-white/95"}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
  return href ? (
    <li>
      <motion.a
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        href={href}
        className="block hover:opacity-90 transition-opacity"
      >
        {inner}
      </motion.a>
    </li>
  ) : (
    <li>{inner}</li>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  className = "",
}: any) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base sm:text-xs font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 focus:bg-white transition-all"
      />
    </div>
  );
}
