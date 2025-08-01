import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logo.svg"
        alt="logo"
        width={160}
        height={18}
        quality={100}
        className="dark:hidden"
      />

      <Image
        src="/images/logo/logo_dark.svg"
        alt="logo"
        width={160}
        height={18}
        quality={100}
        className="hidden dark:block"
      />
    </Link>
  );
};

export default Logo;
