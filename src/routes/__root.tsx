import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import favIcon from "../assets/logo-mark.png";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "../hooks/useLanguage";
import { getSiteSettings } from "../lib/leads-store";
import { SITE_CONFIG } from "../config/site-config";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-16 text-white select-none relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-slate-700/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl text-center shadow-2xl space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400 font-black text-2xl">
          404
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="mt-2 text-sm text-slate-300 font-medium leading-relaxed">
            The page you're looking for might have been moved or is temporarily unavailable. Let's get you back on track:
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <Link
            to="/"
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/40 text-white transition-all duration-200"
          >
            🏡 Home
          </Link>
          <Link
            to="/services"
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/40 text-white transition-all duration-200"
          >
            🛡️ Shelters
          </Link>
          <Link
            to="/projects"
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/40 text-white transition-all duration-200"
          >
            📸 Gallery
          </Link>
          <Link
            to="/free-quote"
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/40 text-amber-400 transition-all duration-200"
          >
            📋 Free Quote
          </Link>
        </div>

        {/* Project Line Call Button */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div>
            <div className="text-[10px] uppercase font-black tracking-wider text-amber-400">Direct Project Line</div>
            <div className="text-xs text-slate-300 font-medium">{SITE_CONFIG.operatingHours.shortBadge}</div>
          </div>
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 border border-amber-500/50 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:scale-[1.03] transition-all shadow-md"
          >
            📞 {SITE_CONFIG.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0f172a" },
      { title: "Southern Storm Shelters LLC | Nashville, TN" },
      { name: "description", content: "Underground storm shelter construction and turnkey installation in Nashville, TN and Middle Tennessee. Precision excavation and engineered safety." },
      { name: "keywords", content: "storm shelters nashville tn, underground storm shelters, tornado shelters tennessee, safe rooms franklin tn, murfreesboro storm shelter, residential storm shelter" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Southern Storm Shelters LLC" },
      { name: "geo.region", content: "US-TN" },
      { name: "geo.placename", content: "Nashville, TN" },
      { name: "geo.position", content: "36.1627;-86.7816" },
      { name: "ICBM", content: "36.1627, -86.7816" },
      { property: "og:title", content: "Southern Storm Shelters LLC | Nashville, TN" },
      { property: "og:description", content: "Underground storm shelter construction and turnkey installation in Nashville, TN and Middle Tennessee." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.southernstormshelters.com" },
      { property: "og:image", content: "https://www.southernstormshelters.com/favicon.png" },
      { property: "og:site_name", content: "Southern Storm Shelters LLC" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "es_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Southern Storm Shelters LLC | Nashville, TN" },
      { name: "twitter:description", content: "Underground storm shelter construction and turnkey installation in Nashville, TN and Middle Tennessee." },
      { name: "twitter:image", content: "https://www.southernstormshelters.com/favicon.png" },
    ],
    links: [
      { rel: "icon", href: favIcon, type: "image/png" },
      { rel: "shortcut icon", href: favIcon, type: "image/png" },
      { rel: "apple-touch-icon", href: favIcon },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isApi = location.pathname.startsWith("/api");
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    if (!isDashboard && !isApi) {
      getSiteSettings()
        .then((settings) => {
          if (settings && settings.maintenanceMode) {
            setMaintenance(true);
          } else {
            setMaintenance(false);
          }
        })
        .catch((err) => {
          console.warn("Failed to check maintenance mode status", err);
          setMaintenance(false);
        });
    } else {
      setMaintenance(false);
    }
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {maintenance ? (
          <MaintenanceScreen />
        ) : (
          <Outlet />
        )}
      </LanguageProvider>
    </QueryClientProvider>
  );
}

function MaintenanceScreen() {
  return (
    <div className="min-h-screen w-full bg-slate-950 relative flex flex-col items-center justify-center p-6 overflow-hidden font-sans text-white select-none">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-slate-700/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-[32px] text-center shadow-[0_24px_60px_rgba(0,0,0,0.4)] flex flex-col items-center gap-6">

        <div className="relative flex items-center justify-center w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full shadow-[0_0_30px_rgba(217,119,6,0.2)]">
          <span className="text-3xl font-black text-amber-400">S</span>
        </div>

        <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">
          Scheduled Site Maintenance
        </span>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
            Southern Storm Shelters <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">LLC</span>
          </h1>
          <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-md mx-auto">
            We are performing brief maintenance on our online portal. For underground storm shelter inquiries or property evaluations, our office line remains open.
          </p>
        </div>

        <div className="w-full h-px bg-white/10" />

        <div className="space-y-4 w-full">
          <div className="text-left bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-400">Direct Project Line</h3>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{SITE_CONFIG.operatingHours.scheduleText}</p>
            </div>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white border border-amber-500/50 text-xs font-black uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 shadow-md text-center whitespace-nowrap"
            >
              Call {SITE_CONFIG.phone}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-slate-300 font-bold px-1.5">
            <div className="flex items-center gap-2">
              <span>{SITE_CONFIG.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Nashville Metro & 100-Mile Radius</span>
            </div>
          </div>
        </div>

      </div>

      <span className="relative z-10 text-[9px] uppercase font-bold tracking-[0.2em] text-slate-500 mt-8">
        &copy; {new Date().getFullYear()} Southern Storm Shelters LLC. All rights reserved.
      </span>
    </div>
  );
}
