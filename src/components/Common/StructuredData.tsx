import Script from "next/script";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from "@/utils/seo";

interface StructuredDataProps {
  type?: "organization" | "website" | "breadcrumb";
  data?: any;
}

export default function StructuredData({ type = "organization", data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": SITE_NAME,
          "alternateName": "Ethery",
          "url": SITE_URL,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/icon/favicon-512x512.png`,
            "width": 512,
            "height": 512
          },
          "image": DEFAULT_OG_IMAGE,
          "description": SITE_DESCRIPTION,
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Sales & Support",
            "email": "info@ethery.tech"
          },
          "sameAs": [
            "https://www.linkedin.com/company/ethery-tech"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "AM"
          }
        };
      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": SITE_NAME,
          "url": SITE_URL,
          "description": SITE_DESCRIPTION,
          "publisher": {
            "@type": "Organization",
            "name": SITE_NAME,
            "logo": {
              "@type": "ImageObject",
              "url": `${SITE_URL}/images/logo/logo.svg`
            }
          }
        };
      default:
        return data;
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}

