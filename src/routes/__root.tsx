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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d160f] px-4 py-16 text-white select-none relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#2E7D32]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl text-center shadow-2xl space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2E7D32]/20 border border-[#D4AF37]/40 rounded-2xl text-[#FFD54F] font-black text-2xl">
          404
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="mt-2 text-sm text-slate-300 font-medium leading-relaxed">
            The page you're looking for might have been moved, renamed, or is temporarily unavailable. Let's get you back on track:
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <Link
            to="/"
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#2E7D32]/30 hover:border-[#D4AF37]/50 text-white transition-all duration-200"
          >
            🏡 Home
          </Link>
          <Link
            to="/services"
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#2E7D32]/30 hover:border-[#D4AF37]/50 text-white transition-all duration-200"
          >
            🌿 All Services
          </Link>
          <Link
            to="/service-areas"
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#2E7D32]/30 hover:border-[#D4AF37]/50 text-white transition-all duration-200"
          >
            📍 Service Areas
          </Link>
          <Link
            to="/free-quote"
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#2E7D32]/30 hover:border-[#D4AF37]/50 text-[#FFD54F] transition-all duration-200"
          >
            📋 Free Quote
          </Link>
        </div>

        {/* Emergency Call Button */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div>
            <div className="text-[10px] uppercase font-black tracking-wider text-[#FFD54F]">Need Immediate Help?</div>
            <div className="text-xs text-slate-300 font-medium">Emergency tree & storm response</div>
          </div>
          <a
            href="tel:6625711048"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] border border-[#D4AF37]/50 text-[#FFD54F] px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:scale-[1.03] transition-all shadow-md"
          >
            📞 (662) 571-1048
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
      { name: "theme-color", content: "#dc2626" },
      { title: "Southern Storm Shelters LLC | Nashville, TN" },
      { name: "description", content: "FEMA P-320 & ICC-500 compliant residential underground storm shelters, garage vaults, and commercial safe rooms in Nashville, TN & 100-mile radius. Licensed, insured, bonded." },
      { name: "keywords", content: "storm shelters nashville tn, underground storm shelters, tornado shelters tennessee, safe rooms franklin tn, murfreesboro storm shelter, residential storm shelter" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Southern Storm Shelters LLC" },
      { name: "geo.region", content: "US-TN" },
      { name: "geo.placename", content: "Nashville, TN" },
      { name: "geo.position", content: "36.1627;-86.7816" },
      { name: "ICBM", content: "36.1627, -86.7816" },
      { property: "og:title", content: "Southern Storm Shelters LLC | Nashville, TN" },
      { property: "og:description", content: "FEMA P-320 & ICC-500 compliant residential underground storm shelters, garage vaults, and commercial safe rooms in Nashville, TN & 100-mile radius." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.southernstormshelters.com" },
      { property: "og:image", content: "https://www.southernstormshelters.com/favicon.png" },
      { property: "og:site_name", content: "Southern Storm Shelters LLC" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "es_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Southern Storm Shelters LLC | Nashville, TN" },
      { name: "twitter:description", content: "FEMA P-320 & ICC-500 compliant residential underground storm shelters, garage vaults, and commercial safe rooms in Nashville, TN & 100-mile radius." },
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
    <div className="min-h-screen w-full bg-[#111111] relative flex flex-col items-center justify-center p-6 overflow-hidden font-sans text-white select-none">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#2E7D32]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-[32px] text-center shadow-[0_24px_60px_rgba(0,0,0,0.4)] flex flex-col items-center gap-6">

        <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-[#2E7D32]/30 to-[#1B5E20]/30 border border-[#D4AF37]/40 rounded-full shadow-[0_0_30px_rgba(46,125,50,0.2)] animate-pulse">
          <span className="text-3xl font-black text-[#FFD54F]">B</span>
        </div>

        <span className="bg-[#2E7D32]/20 border border-[#D4AF37]/40 text-[#FFD54F] text-[10px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">
          System Update in Progress
        </span>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
            Under <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E7D32] to-[#FFD54F]">Optimization</span>
          </h1>
          <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-md mx-auto">
            We are currently optimizing Brown Lawn Care &amp; Cleaning Service's portal to serve you better. We'll be back online shortly.
          </p>
        </div>

        <div className="w-full h-px bg-white/10" />

        <div className="space-y-4 w-full">
          <div className="text-left bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#FFD54F]">Emergency Dispatch</h3>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Storm damage &amp; tree emergencies during business hours.</p>
            </div>
            <a
              href="tel:6625711048"
              className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-[#FFD54F] border border-[#D4AF37]/50 text-xs font-black uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 shadow-md text-center whitespace-nowrap"
            >
              Call (662) 571-1048
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-slate-300 font-bold px-1.5">
            <div className="flex items-center gap-2">
              <span>royleebrown@ymail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Licensed · Insured · Bonded</span>
            </div>
          </div>
        </div>

      </div>

      <span className="relative z-10 text-[9px] uppercase font-bold tracking-[0.2em] text-slate-500 mt-8">
        &copy; {new Date().getFullYear()} Brown Lawn Care &amp; Cleaning Service, LLC. All rights reserved.
      </span>
    </div>
  );
}
