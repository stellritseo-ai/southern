import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { FreeQuoteContent } from "@/components/site/FreeQuoteContent";
import { Toaster } from "@/components/ui/sonner";
import { useLanguage } from "@/hooks/useLanguage";

function FreeQuotePage() {
  const { t } = useLanguage();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.southernstormshelters.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Request a Free Estimate",
        "item": "https://www.southernstormshelters.com/free-quote"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Storm Shelter Installation & Free Estimates",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Southern Storm Shelters LLC",
      "telephone": "+16159912381",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2000 Meridian Blvd, Suite 200",
        "addressLocality": "Franklin",
        "addressRegion": "TN",
        "postalCode": "37067",
        "addressCountry": "US"
      }
    },
    "areaServed": "Middle Tennessee (100-mile radius)",
    "description": "Get a free, transparent, no-obligation estimate within 24 hours for Granger ISS in-ground prefabricated storm shelters and custom safe rooms."
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHeader
        eyebrow={t("Request a Free Estimate", "Solicitar Estimación Gratis")}
        title={t("Get Your Free, No-Obligation Estimate Today", "Obtenga Su Estimación Gratuita y Sin Compromiso Hoy")}
        subtitle={t(
          "Tell us about your property—residential or commercial—and our team will provide a transparent, comprehensive estimate within 24 hours. No pressure. No obligation. Just honest guidance from construction experts who understand what it takes to protect your family.",
          "Cuéntenos sobre su propiedad, residencial o comercial, y nuestro equipo le proporcionará una estimación transparente y completa en 24 horas. Sin presión ni compromiso. Solo orientación honesta de expertos en construcción."
        )}
      />
      <FreeQuoteContent />
      <Toaster />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/free-quote")({
  head: () => ({
    meta: [
      { title: "Request a Free Estimate | Southern Storm Shelters LLC" },
      {
        name: "description",
        content: "Get your free, no-obligation storm shelter estimate within 24 hours. Comprehensive site evaluations and upfront pricing for Granger ISS underground shelters and custom safe rooms across Middle Tennessee."
      },
      {
        name: "keywords",
        content: "free storm shelter estimate, tornado shelter quote nashville, granger iss cost franklin tn, underground shelter price middle tennessee, custom safe room quote"
      },
      { property: "og:title", content: "Request a Free Estimate | Southern Storm Shelters LLC" },
      {
        property: "og:description",
        content: "Transparent, comprehensive storm shelter estimates within 24 hours. Honest guidance from Middle Tennessee construction experts."
      },
      { property: "og:url", content: "https://www.southernstormshelters.com/free-quote" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.southernstormshelters.com/free-quote" },
    ],
  }),
  component: FreeQuotePage,
});
