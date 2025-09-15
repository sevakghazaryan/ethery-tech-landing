import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  companyLinks,
  featureLinks,
  supportLink,
  SolutionsLink,
  address,
  phone,
  email,
  facebook,
  twitter,
  linkedin,
} from "@/app/api/data";

const Footer = () => {
  /**
   *
   * Footer Component Hooks.
   */

  const phoneCall = "+37494426764";

  const emailTech = "info@ethery.tech";

  return (
    <footer className="pt-5 bg-midnight_text relative   xl:after:block ">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-2">
       
        <div className="grid grid-cols-12 sm:mb-16 mb-8 pt-8 gap-4 relative lg:before:block ">
          {/* Solutions */}
          <div className="md:col-span-4 col-span-6 mb-4 md:mb-0">
            <h4 className="text-18 text-white dark:text-white mb-3">
              Solutions
            </h4>
            <ul>
              {SolutionsLink.slice(0, 4).map((item, index) => (
                <li key={index} className="pb-3">
                  <Link
                    href={item.href}
                    className="text-foottext text-16 hover:text-primary"
                  >
                    {item.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Company */}

          <div className="md:col-span-3 col-span-6 mb-4 md:mb-0">
            <h4 className="text-18 text-white dark:text-white mb-3">Company</h4>
            <ul>
              {companyLinks.slice(0, 4).map((item, index) => (
                <li key={index} className="pb-3">
                  <Link
                    href={item.href}
                    className="text-foottext text-16 hover:text-primary"
                  >
                    {item.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-3 col-span-6 mb-4 md:mb-0">
            <h4 className="text-18 text-white dark:text-white mb-3">Support</h4>
            <ul>
              {supportLink.slice(0, 4).map((item, index) => (
                <li key={index} className="pb-3">
                  <Link
                    href={item.href}
                    className="text-foottext text-16 hover:text-primary"
                  >
                    {item.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col  md:justify-between md:flex-row items-center">
          <div className="flex items-center sm:flex-row flex-col justify-between md:py-10 ">
            <p className="text-16 text-foottext sm:mb-0 mb-4">
              © 2025 Ethery Tech.{" "}
              <Link
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailTech}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-16 "
              >
                <span>{email}</span>
              </Link>{" "}
              |{" "}
              <Link href={`tel:${phoneCall}`} className="text-16 ">
                <span>{phoneCall}</span>
              </Link>{" "}
              ։
            </p>
          </div>
          <div className="flex gap-4 my-4 lg:mt-0">
            {facebook && (
              <Link
                href={facebook}
                className="text-muted hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="fe:facebook" width="32" height="32" />
              </Link>
            )}
            {/* {twitter && (
              <Link
                href={twitter}
                className="text-muted hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="fa6-brands:square-twitter" width="32" height="32" />
              </Link>
            )} */}
            {linkedin && (
              <Link
                href={linkedin}
                className="text-muted hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="fa6-brands:linkedin" width="32" height="32" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
