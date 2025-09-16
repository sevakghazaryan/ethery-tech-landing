import NotFound from "@/components/NotFound";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page | Nicktio ",
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
