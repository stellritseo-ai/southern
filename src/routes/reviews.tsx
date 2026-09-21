import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { ReviewsPageContent } from "@/components/site/ReviewsPageContent";
import { Toaster } from "@/components/ui/sonner";
import { useLanguage } from "@/hooks/useLanguage";

function ReviewsPage() {
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
        "name": "Customer Reviews",
        "item": "https://www.southernstormshelters.com/reviews"
      }
    ]
  };

  const reviewsSchema = {
    "@context": "https://schema.org",
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "10",
      "bestRating": "5",
      "worstRating": "1"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <PageHeader
        eyebrow={t("Customer Reviews", "Reseñas de Clientes")}
        title={t("Real Results. Real Protection. Real Peace of Mind.", "Resultados Reales. Protección Real. Verdadera Tranquilidad.")}
        subtitle={t(
          "When severe weather strikes, there's no room for doubt. Your storm shelter must perform flawlessly. Read what our customers have to say about their experience—from the first consultation to the final installation.",
          "Cuando el clima severo azota, no hay lugar para dudas. Su refugio debe funcionar a la perfección. Familias en Middle Tennessee confían en Southern Storm Shelters. Lea lo que dicen nuestros clientes."
        )}
      />
      <ReviewsPageContent />
      <Toaster />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews & Testimonials | Southern Storm Shelters LLC" },
      {
        name: "description",
        content: "Read verified 5-star customer reviews for Southern Storm Shelters LLC. Trusted underground Granger ISS storm shelter installations in Nashville, Franklin, Murfreesboro, and Middle Tennessee."
      },
      {
        name: "keywords",
        content: "southern storm shelters reviews, granger iss reviews franklin tn, tornado shelter testimonials nashville, underground storm shelter customer ratings"
      },
      { property: "og:title", content: "Customer Reviews & Testimonials | Southern Storm Shelters LLC" },
      {
        property: "og:description",
        content: "Real Results. Real Protection. Real Peace of Mind. Read verified customer reviews from homeowners across Middle Tennessee."
      },
      { property: "og:url", content: "https://www.southernstormshelters.com/reviews" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.southernstormshelters.com/reviews" },
    ],
  }),
  component: ReviewsPage,
});
