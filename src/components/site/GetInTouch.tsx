import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addWebEmail } from "@/lib/leads-store";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  HardHat,
  Award,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/config/site-config";

export function GetInTouch() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const name =
      (form.querySelector("input[name='name']") as HTMLInputElement)?.value ||
      "";
    const phone =
      (form.querySelector("input[name='phone']") as HTMLInputElement)?.value ||
      "";
    const email =
      (form.querySelector("input[name='email']") as HTMLInputElement)?.value ||
      "";
    const address =
      (form.querySelector("input[name='address']") as HTMLInputElement)
        ?.value || "";
    const projectType =
      (form.querySelector("select[name='projectType']") as HTMLSelectElement)
        ?.value || "";
    const timeframe =
      (form.querySelector("select[name='timeframe']") as HTMLSelectElement)
        ?.value || "";
    const msg =
      (form.querySelector("textarea[name='message']") as HTMLTextAreaElement)
        ?.value || "";

    try {
      await addWebEmail({
        name,
        phone,
        email,
        address,
        projectType,
        timeframe,
        service: projectType
          ? `${projectType} (${timeframe})`
          : "Underground Storm Shelter",
        message: msg
          ? `${msg}\n\nSite Address: ${address}\nTarget Timeframe: ${timeframe}`
          : `Site Address: ${address}\nTarget Timeframe: ${timeframe}`,
        source: "Landing Get-In-Touch Form",
      });

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="get-in-touch"
      className="relative py-[60px] bg-[#F8FAFC] border-y border-slate-200/80 overflow-hidden"
      style={{ paddingTop: "60px", paddingBottom: "60px" }}
    >
      {/* Background Architectural Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0F172A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="mx-auto w-[92%] max-w-7xl relative z-10">
        {/* ── Section Header ──────────────────────────── */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{t("Request an On-Site Estimate", "Solicitar Cotización")}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>

          <h2
            className="tracking-tight text-slate-900 leading-tight whitespace-nowrap text-[17px] xs:text-[20px] sm:text-[30px] md:text-[36px] lg:text-[40px] font-bold"
            style={{
              marginTop: "-7px",
              marginBottom: "8px",
            }}
          >
            {t("Get Your Free, ", "Obtenga Su ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
              {t("No-Obligation Estimate", "Estimación Sin Compromiso")}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
            {t(
              "Tell us about your property — shelter model, yard access, and desired installation timeline. We will inspect your site and provide a clear, upfront quote.",
              "Cuéntenos sobre su propiedad: modelo de refugio, acceso al patio y tiempos de instalación. Evaluaremos su terreno y le daremos una cotización clara."
            )}
          </p>
        </div>

        {/* ── 2-Column Split: Info Card & Form ────────── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* LEFT: Premium Dark Contact Info Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070b12] via-[#0b0f15] to-[#151c28] text-white p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-amber-500/30 flex flex-col justify-between"
          >
            {/* Top Specular Rim Line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none" />

            {/* Ambient Background Glow */}
            <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Status Dispatch Badge */}
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest mb-6 border border-amber-400/30 text-amber-300">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{t("Nashville & 100-Mile Dispatch", "Nashville y Despacho a 100 Millas")}</span>
              </span>

              <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white mb-2">
                Southern Storm Shelters
              </h3>
              <p className="text-sm text-slate-300 font-medium leading-relaxed mb-8">
                {t(
                  "Turnkey Underground Storm Shelters & Safe Rooms. Engineered construction, licensed operators, and single-day crane installations.",
                  "Refugios Subterráneos y Cuartos Seguros Llave en Mano. Ingeniería de construcción, operadores licenciados e instalación en un día."
                )}
              </p>

              {/* Contact Items List */}
              <ul className="space-y-5">
                <ContactItem
                  icon={Phone}
                  label={t("Direct Phone & Dispatch", "Teléfono Directo y Despacho")}
                  value={SITE_CONFIG.phone}
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  isCall
                />
                <ContactItem
                  icon={Mail}
                  label={t("Direct Email", "Correo Electrónico")}
                  value={SITE_CONFIG.email}
                  href={`mailto:${SITE_CONFIG.email}`}
                />
                <ContactItem
                  icon={MapPin}
                  label={t("Service Territory", "Territorio de Servicio")}
                  value={SITE_CONFIG.serviceRadius}
                />
                <ContactItem
                  icon={Clock}
                  label={t("Operating Hours", "Horario de Atención")}
                  value={SITE_CONFIG.operatingHours.scheduleText}
                />
              </ul>
            </div>

            {/* Bottom Verification Strip */}
            <div className="relative z-10 mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-white">
                  FEMA 320/361 Tested
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HardHat className="h-5 w-5 text-amber-400 shrink-0" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-white">
                  Turnkey Crews
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Modern White Quote Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.1)] transition-shadow duration-300 relative flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="grid place-items-center text-center py-16"
                >
                  <div className="grid place-items-center h-16 w-16 rounded-full bg-amber-500/15 text-amber-600 mb-5 shadow-sm">
                    <CheckCircle2 className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-slate-900 uppercase tracking-wider mb-2">
                    {t("Estimate Request Received!", "¡Solicitud Recibida!")}
                  </h3>
                  <p className="text-slate-600 text-sm max-w-sm leading-relaxed mb-6">
                    {t(
                      `Thank you! Our construction director will review your property details and contact you shortly. For immediate help, call ${SITE_CONFIG.phone}.`,
                      `¡Gracias! Nuestro equipo revisará los detalles y se pondrá en contacto a la brevedad. Para ayuda inmediata, llame al ${SITE_CONFIG.phone}.`
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-5 py-2.5 rounded-xl hover:bg-amber-100 transition cursor-pointer"
                  >
                    <span>{t("Submit Another Inquiry", "Enviar Otra Consulta")}</span>
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900 font-black text-xl tracking-tight">
                      {t("Tell Us About Your Project", "Cuéntenos Sobre Su Proyecto")}
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400">
                      * {t("Required", "Requerido")}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label={t("Full Name *", "Nombre Completo *")}
                      name="name"
                      placeholder="e.g. John Miller"
                      required
                    />
                    <Field
                      label={t("Phone Number *", "Teléfono *")}
                      name="phone"
                      type="tel"
                      placeholder="e.g. (615) 555-0192"
                      required
                    />
                    <Field
                      label={t("Email Address *", "Correo Electrónico *")}
                      name="email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      required
                    />
                    <Field
                      label={t("Property Address / City *", "Dirección / Ciudad *")}
                      name="address"
                      placeholder="e.g. Franklin, TN"
                      required
                    />

                    <div>
                      <Label>{t("Shelter Model / Installation Type", "Modelo de Refugio / Tipo")}</Label>
                      <select
                        name="projectType"
                        required
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="Granger ISS In-Ground Shelter">
                          Granger ISS In-Ground Shelter (Turnkey Crane Set)
                        </option>
                        <option value="Custom Concrete Storm Shelter">
                          Custom Built Concrete Shelter
                        </option>
                        <option value="Above-Ground Steel Armor Safe Room">
                          Above-Ground Steel Armor Safe Room
                        </option>
                        <option value="New Construction Pre-Installation">
                          New Home Construction Installation
                        </option>
                        <option value="Site Evaluation & Grade Inspection">
                          Site Evaluation & Soil Inspection Only
                        </option>
                      </select>
                    </div>

                    <div>
                      <Label>{t("Target Timeline", "Tiempo Estimado")}</Label>
                      <select
                        name="timeframe"
                        required
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="As Soon As Possible (Storm Season)">
                          As Soon As Possible (Upcoming Storm Season)
                        </option>
                        <option value="Within 1–2 Weeks">Within 1–2 Weeks</option>
                        <option value="Within 30 Days">Within 30 Days</option>
                        <option value="Planning for Future Build">
                          Planning / Future Construction
                        </option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <Label>
                        {t("Describe Your Property / Yard Access", "Detalles del Terreno y Acceso")}
                      </Label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder={t(
                          "Tell us about fence gate width, backyard slope, rocky soil, or family capacity needed...",
                          "Describa el ancho del portón, pendiente del terreno, tipo de suelo o capacidad requerida..."
                        )}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 focus:bg-white transition-all resize-none"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-xl shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.55)] transition-all duration-300 disabled:opacity-60 cursor-pointer mt-2 group"
                  >
                    <span>
                      {submitting
                        ? t("Submitting Your Request...", "Enviando...")
                        : t("Submit On-Site Estimate Request", "Enviar Solicitud de Estimación")}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <p className="text-center text-[11px] text-slate-400 font-medium">
                    {t(
                      `We respect your privacy. No obligation. For immediate questions, call ${SITE_CONFIG.phone}.`,
                      `Respetamos su privacidad. Sin compromiso. Para consultas inmediatas, llame al ${SITE_CONFIG.phone}.`
                    )}
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

function ContactItem({
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
  const content = (
    <div className="flex items-start gap-3.5 group">
      <motion.div
        whileHover={{ scale: 1.06 }}
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
          isCall
            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
            : "bg-white/10 text-amber-400 border border-white/10 group-hover:bg-white/15"
        }`}
      >
        <Icon className={`w-4 h-4 ${isCall ? "text-slate-950" : "text-amber-400"}`} />
      </motion.div>
      <div className="min-w-0 text-left">
        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
          {label}
        </div>
        <div
          className={`font-display font-bold leading-tight truncate ${
            isCall ? "text-lg sm:text-xl text-amber-300 group-hover:text-amber-200" : "text-xs sm:text-sm text-white/95"
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  );

  return href ? (
    <li>
      <motion.a
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        href={href}
        className="block transition-opacity hover:opacity-95"
      >
        {content}
      </motion.a>
    </li>
  ) : (
    <li>{content}</li>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 focus:bg-white transition-all"
      />
    </div>
  );
}
