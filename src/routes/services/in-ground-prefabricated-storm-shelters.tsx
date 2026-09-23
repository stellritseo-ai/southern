import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { InGroundPrefabShelterContent } from "@/components/site/services/InGroundPrefabShelterContent";
import { ShelterFeatures } from "@/components/site/ShelterFeatures";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

function InGroundPrefabricatedPage() {
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
        "name": "In-Ground Prefabricated Storm Shelters",
        "item": "https://www.southernstormsheltersllc.com/services/in-ground-prefabricated-storm-shelters"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "In-Ground Prefabricated Storm Shelter Services",
    "serviceType": "Tornado Shelter Installation",
    "description": "Professional installation of the Granger ISS In-Ground Prefabricated Storm Shelter in Nashville, TN & 100-mile radius. Patented reverse taper design, FEMA 320/361 compliant, 500+ year lifespan, and lifetime warranty not to float.",
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
          "In-Ground Prefabricated Storm Shelter Services",
          "Servicios de Refugios Subterráneos Prefabricados"
        )}
        title={t(
          "Industry-Leading Innovation. Near Absolute Protection. Installed by Construction Experts.",
          "Innovación Líder en la Industria. Protección Casi Absoluta. Instalado por Expertos en Construcción."
        )}
        subtitle={t(
          "The Granger ISS In-Ground Prefabricated Storm Shelter offers a patented reverse taper design, 500+ year lifespan, and limited lifetime warranty not to float out of the ground.",
          "El refugio subterráneo prefabricado Granger ISS ofrece diseño cónico invertido patentado, vida útil de más de 500 años y garantía limitada de por vida contra flotación."
        )}
      />
      <InGroundPrefabShelterContent />
      <ShelterFeatures />
      <WhyChooseUs />
      <EmergencyCTA />
    </>
  );
}

export const Route = createFileRoute(
  "/services/in-ground-prefabricated-storm-shelters"
)({
  head: () => ({
    meta: [
      {
        title:
          "In-Ground Prefabricated Storm Shelters | Southern Storm Shelters LLC",
      },
      {
        name: "description",
        content:
          "Industry-leading Granger ISS in-ground prefabricated storm shelter installation in Nashville, TN & 100-mile radius. Patented reverse taper, FEMA 320/361 tested, 500+ yr lifespan, and lifetime warranty.",
      },
      {
        name: "keywords",
        content:
          "in-ground storm shelters, prefabricated tornado shelter, granger iss storm shelter, underground tornado shelters nashville tn, residential storm shelter installation middle tn",
      },
      {
        property: "og:title",
        content:
          "In-Ground Prefabricated Storm Shelters | Southern Storm Shelters LLC",
      },
      {
        property: "og:description",
        content:
          "Industry-Leading Innovation. Near Absolute Protection. Granger ISS in-ground storm shelters installed in 4 hours or less by construction experts.",
      },
      {
        property: "og:url",
        content:
          "https://www.southernstormsheltersllc.com/services/in-ground-prefabricated-storm-shelters",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.southernstormsheltersllc.com/services/in-ground-prefabricated-storm-shelters",
      },
    ],
  }),
  component: InGroundPrefabricatedPage,
});
