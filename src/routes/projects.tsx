import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { GalleryPageContent } from "@/components/site/GalleryPageContent";
import { Toaster } from "@/components/ui/sonner";
import { useLanguage } from "@/hooks/useLanguage";

function ProjectsPage() {
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
        "name": "Project Gallery",
        "item": "https://www.southernstormshelters.com/projects"
      }
    ]
  };

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Southern Storm Shelters Project Gallery",
    "description": "Authentic jobsite photos of Granger ISS in-ground storm shelter installations, crane placements, and safe rooms across Middle Tennessee.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <PageHeader
        eyebrow={t("Project Gallery", "Galería de Proyectos")}
        title={t("Real Installations. Real Protection.", "Instalaciones Reales. Protección Real.")}
        subtitle={t(
          "Explore our portfolio of Granger ISS underground storm shelters, custom door integrations, crane placements, and completed safe room installations across Middle Tennessee.",
          "Explore nuestro portafolio de refugios subterráneos Granger ISS, puertas personalizadas, colocaciones con grúa e instalaciones completadas en Middle Tennessee."
        )}
      />
      <GalleryPageContent />
      <Toaster />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Project Gallery | Southern Storm Shelters LLC | Nashville & Franklin, TN" },
      {
        name: "description",
        content: "Explore our photo gallery of Granger ISS in-ground storm shelter installations, crane placements, custom color doors, and completed residential safe rooms across Middle Tennessee."
      },
      {
        name: "keywords",
        content: "storm shelter photos nashville, granger iss installation gallery, underground tornado shelter photos franklin tn, safe room gallery middle tennessee"
      },
      { property: "og:title", content: "Project Gallery | Southern Storm Shelters LLC" },
      {
        property: "og:description",
        content: "Real Installations. Real Protection. Browse authentic jobsite photos of Granger ISS storm shelter installations across Middle Tennessee."
      },
      { property: "og:url", content: "https://www.southernstormshelters.com/projects" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.southernstormshelters.com/projects" },
    ],
  }),
  component: ProjectsPage,
});
