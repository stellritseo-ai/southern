import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { ContactPageContent } from "@/components/site/ContactPageContent";
import { Toaster } from "@/components/ui/sonner";
import { useLanguage } from "@/hooks/useLanguage";

function ContactPage() {
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
        "name": "Contact Us",
        "item": "https://www.southernstormshelters.com/contact"
      }
    ]
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Southern Storm Shelters LLC",
    "url": "https://www.southernstormshelters.com/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Southern Storm Shelters LLC",
      "telephone": "+16159912381",
      "email": "admin@nashvillesiteworks.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2000 Meridian Blvd, Suite 200",
        "addressLocality": "Franklin",
        "addressRegion": "TN",
        "postalCode": "37067",
        "addressCountry": "US"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "17:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "description": "By Appointment"
        }
      ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <PageHeader
        eyebrow={t("Contact Southern Storm Shelters", "Contacto Southern Storm Shelters")}
        title={t("Let's Talk About Protecting Your Family", "Hablemos de Proteger a Su Familia")}
        subtitle={t(
          "Severe weather is notoriously unpredictable. The best and smartest thing you can do for yourself and your family is to be prepared. Whether you have questions about underground shelter construction, need a site evaluation, or are ready to request a quote, our team is here to help.",
          "El clima severo es impredecible. Lo mejor que puede hacer por usted y su familia es estar preparado. Ya sea que tenga preguntas sobre construcción de refugios, requiera una evaluación o desee cotizar, estamos aquí para ayudarle."
        )}
      />
      <ContactPageContent />
      <Toaster />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Southern Storm Shelters LLC | Franklin & Nashville, TN" },
      {
        name: "description",
        content: "Get in touch with Southern Storm Shelters in Franklin, TN. Call (615) 991-2381 for consultations, site evaluations, and transparent underground shelter quotes across Middle Tennessee."
      },
      {
        name: "keywords",
        content: "contact storm shelters nashville, southern storm shelters phone number, underground shelter consultation franklin tn, storm shelter quote middle tennessee"
      },
      { property: "og:title", content: "Contact Us | Southern Storm Shelters LLC" },
      {
        property: "og:description",
        content: "Let's talk about protecting your family. Reach out today—we respond to all inquiries within 24 hours."
      },
      { property: "og:url", content: "https://www.southernstormshelters.com/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.southernstormshelters.com/contact" },
    ],
  }),
  component: ContactPage,
});
