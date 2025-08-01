import { HeaderItem } from "../../../../types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "#",
    submenu: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: "/careers" },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Contact Us", href: "/contact" },
];
