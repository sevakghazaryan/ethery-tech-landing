import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderItem } from "../../../../types/menu";


interface MobileHeaderLinkProps {
  item: HeaderItem;
  navbarOpen: boolean;
  setNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const MobileHeaderLink: React.FC<MobileHeaderLinkProps> = ({
  item,
  navbarOpen,
  setNavbarOpen,
}) =>  {

  /**
   * Mobile Header Link Hooks
   */
  const [submenuOpen, setSubmenuOpen] = useState(false);

    const path = usePathname();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setSubmenuOpen(!submenuOpen);
  };

  const handleCloseMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        onClick={item.submenu ? handleToggle : handleCloseMenu}
        className={` flex items-center justify-between w-full py-2 text-black focus:outline-none 
          ${
          path === item.href
            ? "text-primary hover:text-grey"
            : "text-midnight_text dark:text-white "
        }
          
          `} 
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div className="bg-white p-2 w-full">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              onClick={handleCloseMenu}
              className="block py-2 text-midnight_text hover:bg-primary hover:text-white "
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
