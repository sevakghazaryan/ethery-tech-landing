// SEO utilities for consistent metadata generation across all pages
import type { Metadata } from "next";

export const SITE_NAME = "Ethery Tech";
export const SITE_URL = "https://ethery.tech";
export const SITE_DESCRIPTION = "Ethery Tech designs and develops advanced radio communication systems with intelligent hopping and reliable real-time performance in any environment.";
export const TWITTER_HANDLE = "@etherytech";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero/hero-image.webp`;

export interface SEOMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  author = SITE_NAME,
}: SEOMetadataProps): Metadata {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: author }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: ogType,
      locale: "en_US",
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: TWITTER_HANDLE,
      images: [ogImage],
    },
  } as Metadata;
}
