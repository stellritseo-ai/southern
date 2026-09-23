import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Services } from "@/components/site/Services";
import { ShelterFeatures } from "@/components/site/ShelterFeatures";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Underground Storm Shelter Services | Southern Storm Shelters LLC" },
      { name: "description", content: "Underground prefabricated tornado shelters and custom-built reinforced concrete storm shelters in Nashville, TN and 100-mile service radius across Middle Tennessee." },
      { name: "keywords", content: "underground storm shelters nashville tn, prefabricated tornado shelters middle tennessee, custom built storm shelters, tornado safe rooms nashville" },
      { property: "og:title", content: "Underground Storm Shelter Services | Southern Storm Shelters LLC" },
      { property: "og:description", content: "Engineered underground storm shelters & custom safe rooms in Nashville, TN and Middle Tennessee." },
      { property: "og:url", content: "https://www.southernstormsheltersllc.com/services" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.southernstormsheltersllc.com/services" },
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
        "item": "https://www.southernstormsheltersllc.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.southernstormsheltersllc.com/services"
      }
    ]
  };

  const serviceHubSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Underground Storm Shelter Construction & Installation",
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Southern Storm Shelters LLC",
      "telephone": "+16159912361",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nashville",
        "addressRegion": "TN",
        "addressCountry": "US"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Nashville, TN" },
      { "@type": "City", "name": "Franklin, TN" },
      { "@type": "City", "name": "Murfreesboro, TN" },
      { "@type": "City", "name": "Hendersonville, TN" },
      { "@type": "City", "name": "Brentwood, TN" },
      { "@type": "City", "name": "Clarksville, TN" },
      { "@type": "City", "name": "Columbia, TN" },
      { "@type": "City", "name": "Gallatin, TN" },
      { "@type": "City", "name": "Lebanon, TN" },
      { "@type": "City", "name": "Mount Juliet, TN" },
      { "@type": "City", "name": "Spring Hill, TN" },
      { "@type": "City", "name": "Dickson, TN" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Storm Shelter Services Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "In-Ground Prefabricated Storm Shelters",
            "url": "https://www.southernstormsheltersllc.com/services/in-ground-prefabricated-storm-shelters"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Built Storm Shelters",
            "url": "https://www.southernstormsheltersllc.com/services/custom-built-storm-shelters"
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
        eyebrow={t("Storm Shelter Services", "Servicios de Refugios contra Tormentas")}
        title={t("Engineered Underground Protection for Your Family.", "Protección Subterránea Diseñada para Su Familia.")}
        subtitle={t("Prefabricated in-ground units and custom-built reinforced concrete storm shelters across Nashville and Middle Tennessee.", "Unidades subterráneas prefabricadas y refugios de concreto reforzado en Nashville y Middle Tennessee.")}
      />
      <Services />
      <ShelterFeatures />
      <EmergencyCTA />
    </>
  );
}
