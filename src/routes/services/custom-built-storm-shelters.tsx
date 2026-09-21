import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CustomBuiltShelterContent } from "@/components/site/services/CustomBuiltShelterContent";
import { ShelterFeatures } from "@/components/site/ShelterFeatures";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

function CustomBuiltPage() {
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
        "name": "Storm Shelters",
        "item": "https://www.southernstormsheltersllc.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Custom Built Storm Shelters",
        "item": "https://www.southernstormsheltersllc.com/services/custom-built-storm-shelters"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Built Storm Shelter Services",
    "serviceType": "Custom Storm Shelter Construction",
    "description": "Custom-built storm shelters and safe rooms engineered to your exact specifications for homes, businesses, and communities in Nashville, TN and Middle Tennessee. Powered by Granger ISS.",
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Southern Storm Shelters LLC",
      "telephone": "+16159912361",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "468 Craighead St",
        "addressLocality": "Nashville",
        "addressRegion": "TN",
        "postalCode": "37204",
        "addressCountry": "US"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Nashville, TN" },
      { "@type": "City", "name": "Franklin, TN" },
      { "@type": "City", "name": "Murfreesboro, TN" },
      { "@type": "City", "name": "Brentwood, TN" },
      { "@type": "City", "name": "Clarksville, TN" },
      { "@type": "City", "name": "Middle Tennessee" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHeader
        eyebrow={t(
          "Custom Built Storm Shelter Services",
          "Servicios de Refugios contra Tormentas Personalizados"
        )}
        title={t(
          "Engineered to Your Specifications. Built for Your Property. Backed by a Lifetime Warranty.",
          "Diseñado Según Sus Especificaciones. Construido para Su Propiedad. Respaldado por Garantía de por Vida."
        )}
        subtitle={t(
          "Tailored residential and commercial storm shelter solutions powered by the Granger ISS platform, engineered by full-service construction experts in Nashville, TN.",
          "Soluciones de refugios residenciales y comerciales a medida con la plataforma Granger ISS, diseñadas por expertos en construcción en Nashville, TN."
        )}
      />
      <CustomBuiltShelterContent />
      <ShelterFeatures />
      <WhyChooseUs />
      <EmergencyCTA />
    </>
  );
}

export const Route = createFileRoute(
  "/services/custom-built-storm-shelters"
)({
  head: () => ({
    meta: [
      {
        title:
          "Custom Built Storm Shelters | Southern Storm Shelters LLC",
      },
      {
        name: "description",
        content:
          "Custom built storm shelters and commercial safe rooms engineered to your exact specifications in Nashville, TN & 100-mile radius. Powered by Granger ISS with a limited lifetime warranty.",
      },
      {
        name: "keywords",
        content:
          "custom built storm shelters, commercial safe rooms, custom tornado shelters nashville tn, engineered storm shelters middle tennessee, granger iss custom shelter",
      },
      {
        property: "og:title",
        content:
          "Custom Built Storm Shelters | Southern Storm Shelters LLC",
      },
      {
        property: "og:description",
        content:
          "Engineered to Your Specifications. Built for Your Property. Custom residential and commercial safe rooms in Nashville, TN.",
      },
      {
        property: "og:url",
        content:
          "https://www.southernstormsheltersllc.com/services/custom-built-storm-shelters",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.southernstormsheltersllc.com/services/custom-built-storm-shelters",
      },
    ],
  }),
  component: CustomBuiltPage,
});
