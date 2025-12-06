import NotFound from "@/components/NotFound";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { generateSEOMetadata } from "@/utils/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Page Not Found - 404 Error",
  description: "The page you're looking for doesn't exist. Return to Ethery Tech's homepage to explore our secure radio communication solutions.",
  canonicalPath: "/404/",
  noIndex: true, // Don't index 404 pages
});

const ErrorPage = () => {

  /**
   * 
   * Error Page and 404 Page
   */


  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "", text: "404" },
  ];
  return (
    <>
      <HeroSub
        title="404"
        description="We Can't Seem to Find The Page You're Looking For"
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={true}
      />
      <NotFound />
    </>
  );
};

export default ErrorPage;
