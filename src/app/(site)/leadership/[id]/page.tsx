
import { LeadershipMembers } from "@/app/api/data";
import Image from "next/image";
import HeroSub from "@/components/SharedComponents/HeroSub";
import Link from "next/link";

const breadcrumbLinks = [
  { href: "/", text: "Home" },
  { href: "/leadership", text: "Leadership" },
];

export function generateStaticParams() {
  return LeadershipMembers.map((member) => ({
    id: member.id,
  }));
}

type LeadershipPageProps = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function LeadershipPage({ params }: LeadershipPageProps) {

  /**
   * 
   * Leader Ship Page Hooks.
   */


  const resolvedParams = await Promise.resolve(params);

  const member = LeadershipMembers.find((m) => m.id === resolvedParams.id);

  if (!member) {
    return (
      <main className="p-10 text-center text-red-600">
        <h1 className="text-2xl font-bold">Leader not found</h1>
        <Link href="/leadership" className="mt-4 inline-block text-blue-600 underline">
          ← Back to Leadership
        </Link>
      </main>
    );
  }

  return (
    <main className="dark:bg-darkmode overflow-x-hidden pb-14">
      <HeroSub
        title={"Leadership Team"}
        description="Explore our innovative product lineup designed to meet your needs"
        breadcrumbLinks={breadcrumbLinks}
        isBrodcurb={false}
      />
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-darkmode px-4 py-10 md:py-16">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
          <h1 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white">
            {member.name}
          </h1>
          <h2 className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-2">
            {member.role}
          </h2>
        </div>
      </section>

      <div className="py-10" />
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-4/12 order-1 lg:order-1">
            <div className="overflow-hidden rounded-3xl shadow-md">
              <Image
                src={member.image}
                alt={member.name}
                width={600}
                height={400}
                quality={100}
                className="h-auto w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-8/12 order-2 lg:order-2">
            <article className="prose dark:prose-invert max-w-none">
              <p className="text-18 leading-normal text-muted dark:text-white dark:text-opacity-70 text-start">
                {member.bio}
              </p>
              <hr className="my-6" />
              <p className="text-18 leading-normal text-muted dark:text-white dark:text-opacity-70 text-start">
                Additional placeholder text for longer bios, achievements, and
                leadership history. You can expand this with real data later.
              </p>
            </article>
          </div>
        </div>

        {/* Other Leaders */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 text-midnight_text dark:text-white">
            Other Leaders
          </h2>

          <ul className="flex flex-col  gap-2">
            {LeadershipMembers.filter((m) => m.id !== member.id).map((m) => (
              <li key={m.id} className="text-16 leading-normal pb-2" >
                <Link
                  href={`/leadership/${m.id}`}
                  className="flex flex-row text-primary hover:underline"
                >
                  <span>{m.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
      <div className="py-10" />
    </main>
  );
}
