import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Services } from "@/components/site/Services";
import { ShelterFeatures } from "@/components/site/ShelterFeatures";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Lawn Care & Cleaning Services | Brown Lawn Care & Cleaning Service LLC" },
      { name: "description", content: "Full-service lawn mowing, landscape design, tree removal, gravel driveways, and commercial/residential cleaning in Horn Lake, MS & 50-mile radius across MS, TN, and AR." },
      { name: "keywords", content: "lawn care services horn lake ms, property maintenance desoto county, commercial cleaning horn lake, landscaping services memphis" },
      { property: "og:title", content: "Lawn Care & Cleaning Services | Brown Lawn Care & Cleaning Service LLC" },
      { property: "og:description", content: "Full-service property care, lawn maintenance, landscaping, and cleaning solutions in Horn Lake, MS." },
      { property: "og:url", content: "https://www.brownlawncarecleaningservicellc.com/services" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.brownlawncarecleaningservicellc.com/services" },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { t } = useLanguage();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.brownlawncarecleaningservicellc.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.brownlawncarecleaningservicellc.com/services"
      }
    ]
  };

  const serviceHubSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Property Maintenance and Cleaning Services",
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Brown Lawn Care & Cleaning Service, LLC",
      "telephone": "+16625711048",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Alden Lake Dr W",
        "addressLocality": "Horn Lake",
        "addressRegion": "MS",
        "postalCode": "38637",
        "addressCountry": "US"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Horn Lake, MS" },
      { "@type": "City", "name": "Southaven, MS" },
      { "@type": "City", "name": "Olive Branch, MS" },
      { "@type": "City", "name": "Hernando, MS" },
      { "@type": "City", "name": "Memphis, TN" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Full Property Services Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lawn Mowing & Maintenance",
            "url": "https://www.brownlawncarecleaningservicellc.com/services/lawn-mowing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Landscaping & Design",
            "url": "https://www.brownlawncarecleaningservicellc.com/services/landscaping"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tree & Brush Removal",
            "url": "https://www.brownlawncarecleaningservicellc.com/services/tree-brush-removal"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gravel & Dirt Work",
            "url": "https://www.brownlawncarecleaningservicellc.com/services/gravel-dirt-work"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Office & Commercial Cleaning",
            "url": "https://www.brownlawncarecleaningservicellc.com/services/office-commercial-cleaning"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential & Warehouse Cleaning",
            "url": "https://www.brownlawncarecleaningservicellc.com/services/residential-wire-house-cleaning"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceHubSchema) }}
      />
      <PageHeader
        eyebrow={t("Services", "Servicios")}
        title={t("What We Do — From Your Lawn to Your Office.", "Lo Que Hacemos — Desde Su Césped Hasta Su Oficina.")}
        subtitle={t("Licensed, insured, and bonded property care across Horn Lake and the 50-mile radius.", "Cuidado de propiedad licenciado y asegurado en Horn Lake y 50 millas a la redonda.")}
      />
      <Services />
      <ShelterFeatures />
      <EmergencyCTA />
    </>
  );
}
