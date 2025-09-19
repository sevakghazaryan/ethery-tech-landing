import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/icon/logo_vector.svg"
        alt="logo"
        width={50}
        height={18}
        quality={100}
        className="dark:hidden"
      /> 

       <Image
        src="/icon/logo_vector.svg"
        alt="logo"
        width={50}
        height={18}
        quality={100}
        className="hidden dark:block"
      />
    </Link>
  );
};

export default Logo;
