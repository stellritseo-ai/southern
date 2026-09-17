import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { AboutPageContent } from "@/components/site/AboutPageContent";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { ShelterFeatures } from "@/components/site/ShelterFeatures";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

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
        "item": "https://www.brownlawncarecleaningservicellc.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://www.brownlawncarecleaningservicellc.com/about"
      }
    ]
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Brown Lawn Care & Cleaning Service, LLC",
    "description": "Learn about Brown Lawn Care & Cleaning Service, LLC. Family-owned with 6 years in business as an LLC and 15+ years experience, serving Horn Lake, MS and a 50-mile radius.",
    "url": "https://www.brownlawncarecleaningservicellc.com/about",
    "mainEntity": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Brown Lawn Care & Cleaning Service, LLC",
      "founder": {
        "@type": "Person",
        "name": "Roy Lee Brown"
      },
      "telephone": "+16625711048",
      "email": "royleebrown@ymail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Alden Lake Dr W",
        "addressLocality": "Horn Lake",
        "addressRegion": "MS",
        "postalCode": "38637",
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
        eyebrow={t("Where Quality Meets Community", "Donde la Calidad Encuentra la Comunidad")}
        title={t("About Brown Lawn Care & Cleaning Service, LLC", "Acerca de Brown Lawn Care & Cleaning Service, LLC")}
        subtitle={t("Family owned & operated deeply rooted in Horn Lake, MS, serving a 50-mile radius across MS, TN, and AR.", "Empresa familiar con sede en Horn Lake, MS, sirviendo en un radio de 50 millas en MS, TN y AR.")}
      />
      <AboutPageContent />
      <WhyChooseUs />
      <ShelterFeatures />
      <EmergencyCTA />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Brown Lawn Care & Cleaning Service LLC | Horn Lake MS" },
      { name: "description", content: "Learn about Brown Lawn Care & Cleaning Service LLC. Family-owned by Roy Lee Brown with 15+ years experience serving Horn Lake, MS & 50-mile radius across MS, TN, and AR." },
      { name: "keywords", content: "about brown lawn care, lawn care company horn lake ms, roy lee brown lawn care, licensed lawn care desoto county ms, landscaping contractor horn lake" },
      { property: "og:title", content: "About Us | Brown Lawn Care & Cleaning Service LLC | Horn Lake MS" },
      { property: "og:description", content: "Family-owned lawn care, landscaping, tree care, and cleaning services in Horn Lake, MS serving MS, TN, & AR." },
      { property: "og:url", content: "https://www.brownlawncarecleaningservicellc.com/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.brownlawncarecleaningservicellc.com/about" },
    ],
  }),
  component: AboutPage,
});
