import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { AboutPageContent } from "@/components/site/AboutPageContent";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { ShelterFeatures } from "@/components/site/ShelterFeatures";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/config/site-config";

function AboutPage() {
  const { t } = useLanguage();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.southernstormsheltersllc.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Southern Storm Shelters",
        "item": "https://www.southernstormsheltersllc.com/about"
      }
    ]
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Southern Storm Shelters LLC",
    "description": "Southern Storm Shelters is a full-service construction company based in Nashville, TN, specializing in installing the industry's most advanced underground shelters—the Granger ISS—across a 100-mile radius.",
    "url": "https://www.southernstormsheltersllc.com/about",
    "mainEntity": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Southern Storm Shelters LLC",
      "telephone": SITE_CONFIG.phoneRaw,
      "email": SITE_CONFIG.email,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nashville",
        "addressRegion": "TN",
        "addressCountry": "US"
      }
    }
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <PageHeader
        eyebrow={t(
          "About Southern Storm Shelters",
          "Acerca de Southern Storm Shelters"
        )}
        title={t(
          "America’s Leading Storm Shelters. Built Underground. Built to Last.",
          "Los Refugios contra Tormentas Líderes de EE. UU. Construidos Bajo Tierra. Construidos para Durar."
        )}
        subtitle={t(
          "As a full-service construction company based in Nashville, TN, we specialize in installing the industry’s most advanced underground shelters—the Granger ISS—across a 100-mile radius.",
          "Como empresa de construcción integral con sede en Nashville, TN, nos especializamos en la instalación de los refugios subterráneos más avanzados de la industria —el Granger ISS— en un radio de 100 millas."
        )}
      />
      <AboutPageContent />
      <ShelterFeatures />
      <WhyChooseUs />
      <EmergencyCTA />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Southern Storm Shelters | America's Leading Underground Shelters" },
      {
        name: "description",
        content:
          "Southern Storm Shelters is a full-service construction company in Nashville, TN, installing the Granger ISS underground shelter across a 100-mile radius. Patented reverse taper design, FEMA 320/361 compliant.",
      },
      {
        name: "keywords",
        content:
          "about southern storm shelters, granger iss tornado shelter, underground storm shelters nashville tn, reverse taper storm shelter, tornado shelter installation middle tennessee",
      },
      { property: "og:title", content: "About Southern Storm Shelters | America's Leading Underground Shelters" },
      {
        property: "og:description",
        content:
          "America’s Leading Storm Shelters. Built Underground. Built to Last. Full-service construction company based in Nashville, TN.",
      },
      { property: "og:url", content: "https://www.southernstormsheltersllc.com/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.southernstormsheltersllc.com/about" },
    ],
  }),
  component: AboutPage,
});
