import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { Welcome } from "@/components/site/Welcome";
import { Services } from "@/components/site/Services";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { ContactIllustrationSection } from "@/components/site/ContactIllustrationSection";
import { ServiceArea } from "@/components/site/ServiceArea";
import { GetInTouch } from "@/components/site/GetInTouch";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Storm Shelters Nashville TN | Southern Storm Shelters LLC" },
      {
        name: "description",
        content:
          "Engineered underground storm shelters, residential safe rooms & commercial tornado protection in Nashville, TN & 100-mile service radius across Middle Tennessee. Licensed, insured, bonded. Call 615-991-2361.",
      },
      {
        name: "keywords",
        content:
          "storm shelters nashville tn, underground storm shelters nashville, storm shelter installation nashville, underground tornado shelters nashville, residential storm shelters nashville, tornado shelters nashville tn, storm shelter company nashville, commercial storm shelters nashville",
      },
      { property: "og:title", content: "Storm Shelters Nashville TN | Southern Storm Shelters LLC" },
      {
        property: "og:description",
        content:
          "5+ Years Experience — Licensed, Insured & Bonded Underground Storm Shelters & Safe Rooms in Nashville, TN & 100-Mile Radius. FEMA P-320 & ICC-500 Compliant.",
      },
      { property: "og:url", content: "https://www.southernstormsheltersllc.com" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.southernstormsheltersllc.com" },
    ],
  }),
  component: Index,
});

function Index() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Southern Storm Shelters LLC",
    "image": "https://www.southernstormsheltersllc.com/assets/logo.png",
    "@id": "https://www.southernstormsheltersllc.com/#organization",
    "url": "https://www.southernstormsheltersllc.com",
    "telephone": "+16159912361",
    "email": "admin@nashvillesiteworks.com",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "468 Craighead St",
      "addressLocality": "Nashville",
      "addressRegion": "TN",
      "postalCode": "37204",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.1264,
      "longitude": -86.7725
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
      "name": "Underground Storm Shelter Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Underground Storm Shelters",
            "description": "Engineered subterranean tornado storm shelters built to FEMA P-320 and ICC-500 standards in Nashville, TN."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Storm Shelters",
            "description": "Turnkey family safe rooms and backyard underground vaults for 99% residential homeowners."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Storm Shelters",
            "description": "Heavy-capacity engineered storm shelters for business sites, warehouses, and commercial properties."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Storm Shelter Installation",
            "description": "Turnkey laser-leveling, crane setting, concrete anchoring, and waterproof sealing."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Shelter Site Preparation",
            "description": "Precision backhoe excavation, grade stabilization, and soil evaluation for safe installation."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Shelter Upgrades & Hatches",
            "description": "Hydraulic gas-strut hatch doors, emergency latch mechanisms, and multi-point air venting."
          }
        }
      ]
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How deep is an underground storm shelter installed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most residential underground shelters are set so the top sits slightly above natural grade for watershed, with the shelter vault resting several feet below ground. Exact depth is determined during the site evaluation."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the storm shelter installation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many residential installations are completed in a single day once the site excavation begins. We coordinate crane setting, anchoring, and backfill with minimal lawn disruption."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve outside of Nashville, TN?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve a 100-mile radius around Nashville, covering Middle Tennessee communities including Franklin, Murfreesboro, Hendersonville, Brentwood, Clarksville, Columbia, Gallatin, Lebanon, Mount Juliet, and Dickson."
        }
      },
      {
        "@type": "Question",
        "name": "Is Southern Storm Shelters LLC licensed and insured?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we are fully licensed, insured, and bonded. Every shelter meets or exceeds FEMA P-320 and ICC-500 standards for severe weather and EF-5 tornadoes."
        }
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Southern Storm Shelters LLC",
    "url": "https://www.southernstormsheltersllc.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.southernstormsheltersllc.com/services?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Hero />
      <Welcome />
      <Services />
      <EmergencyCTA />
      <Process />
      <WhyChooseUs />
      <Projects isLanding={true} />
      <Testimonials />
      <ContactIllustrationSection />
      <ServiceArea />
      <GetInTouch />
    </SiteLayout>
  );
}
