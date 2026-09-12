import { motion } from "framer-motion";
import {
  CalendarCheck,
  Search,
  ShieldCheck,
  HardHat,
  BadgeCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

/* ── Custom Animated Icons for Start & Finish ────── */

interface AnimatedIconProps {
  className?: string;
}

const AnimatedStartIcon = ({ className = "w-28 h-21 sm:w-32 sm:h-24 lg:w-[138px] lg:h-[104px]" }: AnimatedIconProps) => (
  <svg className={`${className} overflow-visible`} viewBox="0 0 112 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="startDirtGrad" x1="0" y1="58" x2="0" y2="82" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#854d0e" />
        <stop offset="40%" stopColor="#713f12" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
      <linearGradient id="startPitGrad" x1="0" y1="58" x2="0" y2="82" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#18181b" />
        <stop offset="100%" stopColor="#09090b" />
      </linearGradient>
      <linearGradient id="jcbYellowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="vaultRedGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="vaultBodyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>

    {/* ── GROUND & EXCAVATION PIT ─────────────────── */}
    {/* Left ground subsoil strata */}
    <rect x="2" y="58" width="34" height="23" fill="url(#startDirtGrad)" opacity="0.85" rx="2" />
    <circle cx="10" cy="67" r="1" fill="#ca8a04" opacity="0.6" />
    <circle cx="22" cy="72" r="1.4" fill="#a16207" opacity="0.5" />
    <circle cx="28" cy="65" r="0.9" fill="#eab308" opacity="0.4" />
    {/* Left lawn turf & grass */}
    <path d="M2 58H36" stroke="#713f12" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M2 56H36" stroke="#16a34a" strokeWidth="2.8" strokeLinecap="round" />
    {/* Grass blades */}
    <path d="M6 54.5L8 56 M14 54L16 56 M24 54.5L25 56 M32 54L33 56" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" />

    {/* Excavated trench pit */}
    <path
      d="M36 58L42 81H70L76 58"
      fill="url(#startPitGrad)"
      stroke="#713f12"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path d="M41 62H71V80H41Z" fill="#050507" opacity="0.9" />
    {/* Pit gravel bed */}
    <circle cx="48" cy="79" r="1" fill="#64748b" />
    <circle cx="56" cy="79.5" r="1.2" fill="#94a3b8" />
    <circle cx="64" cy="79" r="1" fill="#64748b" />

    {/* Right ground subsoil strata */}
    <rect x="76" y="58" width="34" height="23" fill="url(#startDirtGrad)" opacity="0.85" rx="2" />
    <circle cx="84" cy="66" r="1.2" fill="#ca8a04" opacity="0.5" />
    <circle cx="96" cy="71" r="1" fill="#a16207" opacity="0.6" />
    <circle cx="102" cy="64" r="1.5" fill="#eab308" opacity="0.4" />
    {/* Right lawn turf & grass */}
    <path d="M76 58H110" stroke="#713f12" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M76 56H110" stroke="#16a34a" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M80 54L82 56 M89 54.5L90 56 M98 54L100 56 M105 54.5L106 56" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" />

    {/* Excavated Dirt Mounds on pit rim */}
    <path d="M33 58C34 52 38 52 41 58Z" fill="#a16207" stroke="#713f12" strokeWidth="0.8" />
    <path d="M71 58C73 51 77 51 79 58Z" fill="#a16207" stroke="#713f12" strokeWidth="0.8" />

    {/* ── CRANE CABLES & CONTAINER VAULT ─────────── */}
    <g className="container-hoist">
      {/* Heavy braided crane cable */}
      <line x1="56" y1="2" x2="56" y2="30" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="3 1.5" />
      {/* Crane block & swivel hook */}
      <rect x="53" y="27" width="6" height="5" rx="1" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
      <path d="M56 32C56 35.5 59.5 35.5 59.5 33.5" stroke="#e2e8f0" strokeWidth="1.6" strokeLinecap="round" />
      
      {/* Rigging 4-point cables */}
      <line x1="56" y1="33" x2="45" y2="43" stroke="#cbd5e1" strokeWidth="1.2" />
      <line x1="56" y1="33" x2="67" y2="43" stroke="#cbd5e1" strokeWidth="1.2" />

      {/* Storm Shelter Armored Container Vault */}
      <g className="container-vault">
        {/* Anti-buoyancy concrete foundation plate at bottom of shelter */}
        <rect x="42" y="62" width="28" height="2.5" rx="0.8" fill="#94a3b8" stroke="#64748b" strokeWidth="0.6" />

        {/* Vault Corrugated Steel Body */}
        <rect x="44" y="43" width="24" height="20" rx="2.5" fill="url(#vaultBodyGrad)" stroke="#dc2626" strokeWidth="2" />
        {/* Reinforced Structural Steel Ribs */}
        <line x1="49" y1="44" x2="49" y2="62" stroke="#475569" strokeWidth="1.3" />
        <line x1="56" y1="44" x2="56" y2="62" stroke="#dc2626" strokeWidth="1.3" />
        <line x1="63" y1="44" x2="63" y2="62" stroke="#475569" strokeWidth="1.3" />

        {/* Vault Hatch on Roof */}
        <rect x="49" y="40.5" width="14" height="3" rx="1" fill="url(#vaultRedGrad)" stroke="#991b1b" strokeWidth="0.7" />
        <rect x="53" y="39.5" width="6" height="1.4" rx="0.7" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.4" />
        
        {/* Lifting Shackles */}
        <circle cx="45.5" cy="43" r="1.6" fill="#cbd5e1" stroke="#475569" strokeWidth="0.9" />
        <circle cx="66.5" cy="43" r="1.6" fill="#cbd5e1" stroke="#475569" strokeWidth="0.9" />
      </g>
    </g>

    {/* ── JCB EXCAVATOR ──────────────────────────── */}
    <g className="jcb-digger">
      {/* Heavy Rubber Tracks / Undercarriage */}
      <rect x="5" y="52" width="25" height="8.5" rx="4.25" fill="#09090b" stroke="#334155" strokeWidth="1.2" />
      {/* Drive sprockets and road wheels */}
      <circle cx="9" cy="56.2" r="2.3" fill="#64748b" stroke="#334155" strokeWidth="0.6" />
      <circle cx="14" cy="56.2" r="1.8" fill="#475569" />
      <circle cx="18" cy="56.2" r="1.8" fill="#475569" />
      <circle cx="22" cy="56.2" r="1.8" fill="#475569" />
      <circle cx="26" cy="56.2" r="2.3" fill="#64748b" stroke="#334155" strokeWidth="0.6" />
      {/* Track cleats */}
      <line x1="7" y1="60" x2="28" y2="60" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />

      {/* Slew Turret Body */}
      <rect x="8" y="50" width="19" height="2.5" rx="1" fill="#1e293b" />
      {/* Counterweight rear */}
      <path d="M7 50V40H12V50H7Z" fill="#0f172a" stroke="#334155" strokeWidth="0.6" />
      <line x1="8" y1="48" x2="11" y2="44" stroke="#fbbf24" strokeWidth="1" />
      {/* Main Yellow Cab Engine Housing */}
      <path d="M11 50V38H22L26 44V50H11Z" fill="url(#jcbYellowGrad)" stroke="#d97706" strokeWidth="0.9" />
      
      {/* Cab Glass Cockpit */}
      <path d="M15 39.5H21L24.5 44H15V39.5Z" fill="url(#glassReflection)" stroke="#0284c7" strokeWidth="0.7" />
      <path d="M16 40.5L20 40.5L18 43.5H16V40.5Z" fill="#e0f2fe" opacity="0.7" />

      {/* Roof Safety Amber Flasher */}
      <rect x="13.5" y="36.5" width="4" height="2" rx="0.8" fill="#ef4444" />
      <circle cx="15.5" cy="37.5" r="1.2" fill="#fef08a" />
      {/* Exhaust Pipe */}
      <rect x="9" y="36" width="1.6" height="4.5" rx="0.6" fill="#475569" />

      {/* Hydraulic Articulated Boom Arm & Digging Bucket */}
      <g className="jcb-arm-motion">
        {/* Main Boom Arm */}
        <path d="M23 44L34 29" stroke="url(#jcbYellowGrad)" strokeWidth="3.6" strokeLinecap="round" />
        <circle cx="23" cy="44" r="2.2" fill="#0f172a" stroke="#d97706" strokeWidth="1" />
        <line x1="21" y1="41" x2="28" y2="34" stroke="#cbd5e1" strokeWidth="1.3" />

        {/* Elbow Joint */}
        <circle cx="34" cy="29" r="2.2" fill="#0f172a" stroke="#d97706" strokeWidth="1" />
        {/* Dipper / Stick */}
        <path d="M34 29L42 45" stroke="#d97706" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="32" y1="31" x2="38" y2="40" stroke="#cbd5e1" strokeWidth="1.1" />

        {/* Bucket Pivot & Cast Steel Digging Bucket */}
        <circle cx="42" cy="45" r="2" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
        <path
          d="M42 45C45.5 48.5 49 51 47.5 56L41.5 54C39 51.5 38 48 42 45Z"
          fill="#334155"
          stroke="#0f172a"
          strokeWidth="1.2"
        />
        {/* Bucket Excavation Teeth */}
        <line x1="47.5" y1="56" x2="49" y2="57.5" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="45.5" y1="55.5" x2="47" y2="57" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="43.5" y1="55" x2="45" y2="56.5" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </g>

    {/* Flying Dirt particles during excavation */}
    <circle cx="47" cy="51" r="1.4" fill="#d97706" className="dirt-puff-1" />
    <circle cx="50" cy="48" r="1.8" fill="#b45309" className="dirt-puff-2" />
    <circle cx="44" cy="55" r="1.1" fill="#78350f" className="dirt-puff-1" />
  </svg>
);

const AnimatedFinishIcon = ({ className = "w-28 h-21 sm:w-32 sm:h-24 lg:w-[138px] lg:h-[104px]" }: AnimatedIconProps) => (
  <svg className={`${className} overflow-visible`} viewBox="0 0 112 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="finishLawnGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
      <linearGradient id="finishRoofGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
      <linearGradient id="finishWallGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f1f5f9" />
      </linearGradient>
      <linearGradient id="finishSubsoilGrad" x1="0" y1="58" x2="0" y2="82" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#292524" />
        <stop offset="100%" stopColor="#1c1917" />
      </linearGradient>
      <linearGradient id="finishWindowGlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <linearGradient id="finishVaultRed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
    </defs>

    {/* ── FINISHED GROUND & LAWN LEVEL ─────────────── */}
    <path d="M2 58H110" stroke="#713f12" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M2 56H110" stroke="url(#finishLawnGrad)" strokeWidth="2.8" strokeLinecap="round" />
    {/* Micro grass blades along yard */}
    <path d="M6 54L8 56 M20 54.5L21 56 M36 54L38 56 M52 54.5L53 56 M70 54L71 56 M88 54.5L89 56 M104 54L105 56" stroke="#4ade80" strokeWidth="1" strokeLinecap="round" />

    {/* Subterranean soil depth under yard */}
    <rect x="4" y="58" width="46" height="22" fill="url(#finishSubsoilGrad)" opacity="0.9" rx="2" />

    {/* ── LEFT: INSTALLED FLUSH STORM SHELTER ──────── */}
    {/* Anti-buoyancy concrete anchor footer */}
    <rect x="6" y="77" width="38" height="3" rx="1" fill="#64748b" stroke="#475569" strokeWidth="0.8" />
    
    {/* Underground Armor Container Body */}
    <rect x="8" y="59" width="34" height="18" rx="2.5" fill="#1e293b" stroke="#dc2626" strokeWidth="1.8" />
    {/* Heavy Structural Steel Rib Columns */}
    <line x1="16" y1="60" x2="16" y2="76" stroke="#475569" strokeWidth="1.3" />
    <line x1="25" y1="60" x2="25" y2="76" stroke="#dc2626" strokeWidth="1.3" />
    <line x1="34" y1="60" x2="34" y2="76" stroke="#475569" strokeWidth="1.3" />

    {/* Flush-to-Grade Vault Hatch Door on Lawn */}
    <rect x="9" y="53" width="32" height="4.5" rx="1.5" fill="#334155" stroke="#94a3b8" strokeWidth="1.2" />
    <line x1="12" y1="55" x2="38" y2="55" stroke="#64748b" strokeWidth="0.8" />
    {/* Hatch Red Safety Perimeter Trim & Gas-Strut Handle */}
    <rect x="19" y="51.5" width="12" height="2" rx="0.8" fill="url(#finishVaultRed)" stroke="#7f1d1d" strokeWidth="0.6" />
    <rect x="23" y="52" width="4" height="1" rx="0.5" fill="#fef08a" />
    
    {/* Stainless High-flow Ventilation Snorkel Pipe */}
    <path d="M38 53V47C38 45 41 45 41 47V49" stroke="#cbd5e1" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="37" y="45" width="5" height="1.5" rx="0.6" fill="#94a3b8" />

    {/* Green Active Safety Radar Sonar Pulse */}
    <circle cx="25" cy="49" r="6" stroke="#22c55e" strokeWidth="1.3" opacity="0.8" className="shelter-radar" />
    <circle cx="25" cy="49" r="11" stroke="#22c55e" strokeWidth="1" opacity="0.5" className="shelter-radar-outer" />

    {/* Floating Green Verified Safety Shield Seal */}
    <g transform="translate(18, 28)">
      <circle cx="7" cy="7" r="6.5" fill="#15803d" stroke="#86efac" strokeWidth="1.2" />
      <path d="M4.5 7L6.5 9L9.5 5" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Paved Flagstone Garden Walkway connecting House to Shelter */}
    <ellipse cx="46" cy="56.5" rx="2.8" ry="1.4" fill="#94a3b8" />
    <ellipse cx="53" cy="56.5" rx="3.2" ry="1.5" fill="#cbd5e1" />

    {/* ── RIGHT: RESIDENTIAL SUBURBAN HOME ─────────── */}
    {/* House Main Walls */}
    <rect x="58" y="32" width="44" height="26" fill="url(#finishWallGrad)" stroke="#cbd5e1" strokeWidth="1.2" rx="1.5" />
    {/* Clapboard horizontal siding lines */}
    <line x1="58" y1="38" x2="102" y2="38" stroke="#e2e8f0" strokeWidth="0.8" />
    <line x1="58" y1="44" x2="102" y2="44" stroke="#e2e8f0" strokeWidth="0.8" />
    <line x1="58" y1="50" x2="102" y2="50" stroke="#e2e8f0" strokeWidth="0.8" />

    {/* Architectural Crimson Shingle Gabled Roof */}
    <path d="M54 32L80 12L106 32H54Z" fill="url(#finishRoofGrad)" />
    <path d="M53 32.5L80 11.5L107 32.5" stroke="#7f1d1d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="54" y1="32" x2="106" y2="32" stroke="#ffffff" strokeWidth="1.2" />

    {/* Brick Chimney & Fireplace Smoke */}
    <rect x="92" y="15" width="6" height="12" fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.9" />
    <line x1="92" y1="18" x2="98" y2="18" stroke="#fca5a5" strokeWidth="0.5" />
    <line x1="92" y1="22" x2="98" y2="22" stroke="#fca5a5" strokeWidth="0.5" />
    <rect x="91" y="13.5" width="8" height="2" rx="0.6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.6" />
    {/* Animated chimney smoke curls */}
    <circle cx="95" cy="10" r="1.5" fill="#cbd5e1" className="chimney-smoke-1" />
    <circle cx="97" cy="6" r="2" fill="#e2e8f0" className="chimney-smoke-2" />

    {/* Attic Decorative Circular Roundel Window */}
    <circle cx="80" cy="22" r="3.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
    <line x1="80" y1="18.5" x2="80" y2="25.5" stroke="#ffffff" strokeWidth="0.7" />
    <line x1="76.5" y1="22" x2="83.5" y2="22" stroke="#ffffff" strokeWidth="0.7" />

    {/* Front Porch Entrance Door */}
    <rect x="62" y="40" width="11" height="18" rx="1" fill="#1e293b" stroke="#334155" strokeWidth="0.9" />
    <circle cx="71" cy="49" r="0.9" fill="#fbbf24" />
    <rect x="60" y="38" width="15" height="2" rx="0.8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.7" />
    <circle cx="74" cy="42" r="1.2" fill="#fef08a" />

    {/* Warm Glowing Living Room Window */}
    <rect x="79" y="37" width="18" height="14" rx="1.2" fill="url(#finishWindowGlow)" className="home-window-glow" stroke="#334155" strokeWidth="1" />
    <line x1="88" y1="37" x2="88" y2="51" stroke="#1e293b" strokeWidth="0.9" />
    <line x1="79" y1="44" x2="97" y2="44" stroke="#1e293b" strokeWidth="0.9" />
    <rect x="78" y="51" width="20" height="1.6" rx="0.6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.7" />

    {/* Landscaping Decorative Garden Foundation Shrubs */}
    <circle cx="56" cy="56" r="3.8" fill="#15803d" />
    <circle cx="58" cy="55" r="2.8" fill="#22c55e" />
    <circle cx="104" cy="56" r="3.5" fill="#15803d" />
    <circle cx="102" cy="55" r="2.5" fill="#22c55e" />
  </svg>
);

export function Process() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t("1. Consultation & Evaluation", "1. Consulta y Evaluación"),
      desc: t("Free on-site property evaluation, soil assessment, and laser yard measurements in Nashville & Middle TN.", "Evaluación gratuita en su propiedad, análisis de suelo y mediciones láser en Nashville y Middle TN."),
    },
    {
      icon: ShieldCheck,
      title: t("2. Shelter Selection", "2. Selección del Refugio"),
      desc: t("Select the right capacity for your family or team. Built to meet strict FEMA P-320 and ICC-500 standards.", "Seleccione la capacidad adecuada. Construidos bajo estrictas normas FEMA P-320 e ICC-500."),
    },
    {
      icon: HardHat,
      title: t("3. Precision Excavation", "3. Excavación de Precisión"),
      desc: t("Utility markout, laser-guided ground excavation, and proper water drainage base grading.", "Marcación de servicios, excavación con guía láser y nivelación adecuada para drenaje de agua."),
    },
    {
      icon: CalendarCheck,
      title: t("4. Crane Setting & Anchoring", "4. Colocación con Grúa y Anclaje"),
      desc: t("Heavy crane lowers the shelter into position with anti-buoyancy concrete anchors.", "Grúa pesada coloca el refugio en posición con anclajes de concreto anti-flotación."),
    },
    {
      icon: BadgeCheck,
      title: t("5. Sealing & Final Inspection", "5. Sellado e Inspección Final"),
      desc: t("Watertight gasket calibration, multi-point lock testing, clean lawn backfill, and client walk-through.", "Calibración de empaques herméticos, prueba de cerraduras, relleno limpio y revisión final."),
    },
  ];

  const desktopPositions = [
    { left: "20%", top: "50px" },
    { left: "50%", top: "50px" },
    { left: "80%", top: "50px" },
    { left: "20%", top: "310px" },
    { left: "50%", top: "310px" },
  ];

  return (
    <section className="relative pt-12 sm:pt-16 pb-[40px] lg:pt-20 lg:pb-[40px] overflow-hidden bg-white border-y border-slate-100" style={{ paddingBottom: "40px" }}>

      {/* Background grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #dc2626 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <style>{`
        @keyframes sparkFlowRed {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 45; }
        }
        @keyframes verticalRedFlow {
          0%   { background-position: 0 0; }
          100% { background-position: 0 -40px; }
        }
        .spark-flow-red { stroke-dasharray: 12 24; animation: sparkFlowRed 1.8s infinite linear; }
        .mobile-red-flow {
          background: linear-gradient(to bottom, #dc2626 0%, #dc2626 30%, #f87171 50%, #dc2626 70%, #dc2626 100%);
          background-size: 100% 40px;
          animation: verticalRedFlow 1.2s infinite linear;
        }

        /* JCB Digging & Container Placement Animations */
        @keyframes jcbDigArm {
          0%, 100% { transform: rotate(0deg); }
          30%      { transform: rotate(-8deg) translate(-1px, -1px); }
          65%      { transform: rotate(6deg) translate(1px, 1px); }
        }
        @keyframes containerLower {
          0%, 100% { transform: translateY(-3px); }
          50%      { transform: translateY(4px); }
        }
        @keyframes dirtPuff {
          0%, 100% { opacity: 0.2; transform: scale(0.8) translate(0, 0); }
          50%      { opacity: 1; transform: scale(1.4) translate(1.5px, -2px); }
        }
        @keyframes shelterRadar {
          0%   { r: 2px; opacity: 0.8; }
          100% { r: 10px; opacity: 0; }
        }
        @keyframes windowPulse {
          0%, 100% { fill: #fef08a; filter: drop-shadow(0 0 2px rgba(254, 240, 138, 0.4)); }
          50%      { fill: #fde047; filter: drop-shadow(0 0 5px rgba(253, 224, 71, 0.8)); }
        }
        @keyframes chimneySmoke {
          0%   { transform: translateY(0) scale(0.8); opacity: 0; }
          40%  { opacity: 0.7; }
          100% { transform: translateY(-7px) scale(1.6); opacity: 0; }
        }

        .jcb-arm-motion {
          transform-origin: 23px 44px;
          animation: jcbDigArm 3s ease-in-out infinite;
        }
        .container-hoist {
          animation: containerLower 3.4s ease-in-out infinite;
        }
        .dirt-puff-1 {
          animation: dirtPuff 1.5s ease-in-out infinite;
        }
        .dirt-puff-2 {
          animation: dirtPuff 1.5s ease-in-out infinite 0.75s;
        }
        .shelter-radar {
          animation: shelterRadar 2.2s ease-out infinite;
          transform-origin: 25px 49px;
        }
        .shelter-radar-outer {
          animation: shelterRadar 2.2s ease-out infinite 1.1s;
          transform-origin: 25px 49px;
        }
        .home-window-glow {
          animation: windowPulse 3s ease-in-out infinite;
        }
        .chimney-smoke-1 {
          animation: chimneySmoke 2.6s ease-out infinite;
          transform-origin: 95px 10px;
        }
        .chimney-smoke-2 {
          animation: chimneySmoke 2.6s ease-out infinite 1.3s;
          transform-origin: 97px 6px;
        }
      `}</style>

      <div className="mx-auto w-[90%] max-w-7xl relative z-10">

        {/* ── Section Header ──────────────────────────────── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-[#dc2626] rounded-full px-5 py-1.5 text-xs font-black uppercase tracking-widest mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
            {t("Installation Process", "Proceso de Instalación")}
            <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
          </span>

          <h2
            className="text-slate-900 tracking-tight leading-[1.15] font-black"
            style={{ fontSize: "clamp(24px, 5vw, 36px)", marginTop: "-15px", marginBottom: "10px" }}
          >
            {t("Precision Installation in ", "Instalación de Precisión en ")}
            <span className="bg-gradient-to-r from-[#dc2626] via-red-600 to-[#b91c1c] bg-clip-text text-transparent">
              {t("5 Proven Steps.", "5 Pasos Probados.")}
            </span>
          </h2>

          <p
            className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed"
            style={{ marginBottom: "-50px" }}
          >
            {t("From initial laser site evaluation to precision crane placement and final hydrostatic anchoring, our turnkey process delivers complete family safety in just 1 to 2 days.", "Desde la evaluación láser inicial del terreno hasta la colocación con grúa pesada y el anclaje final, nuestro proceso entrega seguridad total en solo 1 o 2 días.")}
          </p>
        </motion.div>

        {/* ── 1. DESKTOP: S-Curve SVG Layout ──────────────── */}
        <div className="hidden lg:block relative w-full h-[460px] select-none">

          {/* Left Animated Start Icon: JCB Digging + Container Placement */}
          <div className="absolute left-[70px] top-[50px] z-20 -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center">
            <div className="relative group-hover:scale-108 transition-transform duration-300 filter drop-shadow-[0_10px_20px_rgba(220,38,38,0.18)]">
              <AnimatedStartIcon />
            </div>
            <div className="mt-2 text-[10px] font-black uppercase tracking-wider text-[#dc2626] whitespace-nowrap bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-red-200 shadow-sm group-hover:border-red-400 group-hover:shadow-md transition-all duration-300">
              {t("Excavation & Vault Drop", "Excavación y Colocación")}
            </div>
          </div>

          {/* Right Animated Finish Icon: Flush Vault in Lawn + Residential Home */}
          <div className="absolute left-[975px] top-[310px] z-20 -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center">
            <div className="relative group-hover:scale-108 transition-transform duration-300 filter drop-shadow-[0_10px_20px_rgba(34,197,94,0.22)]">
              <AnimatedFinishIcon />
            </div>
            <div className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-900 whitespace-nowrap bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-emerald-300 shadow-sm group-hover:border-emerald-500 group-hover:shadow-md transition-all duration-300">
              {t("Lawn Finished & Certified", "Instalado y Certificado")}
            </div>
          </div>

          {/* S-Curve Path Conduit */}
          <svg
            viewBox="0 0 1200 360"
            className="absolute top-0 left-0 w-full h-[360px] pointer-events-none z-0"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Drop shadow */}
            <path d="M 100 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 940 310"
              stroke="#0f172a" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.06" />
            {/* Outer conduit */}
            <path d="M 100 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 940 310"
              stroke="#111722" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            {/* Animated red core */}
            <motion.path
              d="M 100 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 940 310"
              stroke="#dc2626" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            {/* Red spark flow */}
            <path d="M 100 50 L 1025 50 A 70 70 0 0 1 1025 190 L 175 190 A 60 60 0 0 0 175 310 L 940 310"
              stroke="#f87171" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
              opacity="0.85" className="spark-flow-red" />
          </svg>

          {/* Step nodes */}
          {steps.map((s, i) => {
            const pos = desktopPositions[i];
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="absolute group cursor-default"
                style={{ left: pos.left, top: pos.top }}
              >
                {/* Circle node */}
                <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[82px] h-[82px] rounded-full bg-white shadow-[0_12px_36px_rgba(220,38,38,0.12)] border-2 border-slate-100 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_20px_40px_-6px_rgba(220,38,38,0.3)] group-hover:border-[#dc2626]">
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-[#dc2626] text-white flex items-center justify-center shadow-md border-2 border-white">
                    <span className="text-[11px] font-black leading-none">{i + 1}</span>
                  </div>
                  {/* Inner ring */}
                  <div className="absolute inset-1.5 rounded-full border border-transparent group-hover:border-red-200 transition-all duration-300" />
                  {/* Icon */}
                  <Icon className="h-7 w-7 text-slate-600 group-hover:text-[#dc2626] transition-colors duration-300" />
                </div>

                {/* Text block below node */}
                <div className="absolute top-[52px] -translate-x-1/2 text-center w-[230px] flex flex-col items-center pt-2">
                  <h3 className="font-extrabold text-[15px] text-slate-900 leading-tight mt-1 mb-1.5 group-hover:text-[#dc2626] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed font-normal px-1">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── 2. MOBILE: Vertical Timeline ────────────────── */}
        <div className="relative grid gap-8 pl-14 lg:hidden pt-14 pb-14">

          {/* Mobile Top Start Icon */}
          <div className="absolute left-[44px] -top-12 z-20 -translate-x-1/2 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(220,38,38,0.2)]">
            <AnimatedStartIcon className="w-24 h-18 sm:w-28 sm:h-21" />
          </div>

          {/* Animated vertical conduit */}
          <div className="absolute left-[39px] top-4 bottom-4 w-2.5 pointer-events-none z-0">
            <div className="absolute inset-0 bg-slate-900/10 rounded-full blur-[2px]" />
            <div className="absolute inset-0 bg-[#111722] rounded-full" />
            <div className="absolute inset-[2px] rounded-full mobile-red-flow" />
          </div>

          {/* Mobile Bottom Finish Icon */}
          <div className="absolute left-[44px] -bottom-12 z-20 -translate-x-1/2 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(34,197,94,0.22)]">
            <AnimatedFinishIcon className="w-24 h-18 sm:w-28 sm:h-21" />
          </div>

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col group text-left"
              >
                {/* Circle node */}
                <div className="absolute -left-[54px] top-0 w-12 h-12 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#dc2626]">
                  {/* Step badge */}
                  <div className="absolute -top-1.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#dc2626] text-white flex items-center justify-center border border-white">
                    <span className="text-[9px] font-black">{i + 1}</span>
                  </div>
                  <Icon className="h-5 w-5 text-slate-600 group-hover:text-[#dc2626] transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="pl-4 py-0.5">
                  <h3 className="font-extrabold text-base text-slate-900 leading-tight mt-0 mb-1.5 group-hover:text-[#dc2626] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal max-w-sm">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
