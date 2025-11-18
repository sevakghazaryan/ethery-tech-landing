import NotFound from "@/components/NotFound";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethery Tech | 404",
  description: "The page you're looking for doesn't exist. Return to Ethery Tech's homepage to explore our secure radio communication solutions.",
};

const ErrorPage = () => {

  /**
   * 
   * Error Page and 404 Page
   */


  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "404" },
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
