import {SolutionsItems} from "@/app/api/data";
import Image from "next/image";
import Link from "next/link";
import type {Metadata} from "next";
import {generateSEOMetadata, SITE_URL} from "@/utils/seo";
import HeroSub from "@/components/SharedComponents/HeroSub";
import {notFound} from "next/navigation";

const titles: Record<string, { title: string; description: string }> = {
    "defense-military": {
        title: "Ethery Tech | Defense & Military Solutions",
        description:
            "Rugged, encrypted radios for tactical comms: frequency hopping, long-range, low-latency links for soldiers, vehicles, UAVs, and base stations.",
    },
    "uav-drone": {
        title: "Ethery Tech | UAV & Drone Solutions",
        description:
            "High-bandwidth, low-latency links for UAV control, telemetry, and data. Compact modules offer frequency agility and dependable long-range connectivity.",
    },
    "industrial-automation": {
        title: "Ethery Tech | Industrial Automation Solutions",
        description:
            "Reliable radio modules for industrial automation: robust performance in noisy environments, SCADA/PLC integration, high availability, and rugged design.",
    },
    "energy-utilities": {
        title: "Ethery Tech | Energy & Utilities Solutions",
        description:
            "Low-power, scalable communications for utilities and smart metering. Secure data collection, extended battery life, and reliable grid-wide connectivity.",
    },
    "oem-solutions": {
        title: "Ethery Tech | OEM Solutions",
        description:
            "Custom radio modules and OEM solutions tailored to your specs: multi-band support, rapid prototyping, and end-to-end development from design to deployment.",
    },
};


const breadcrumbLinks = [
    {href: "/", text: "Home"},
    {href: "/solutions", text: "Solutions"},
];

export function generateStaticParams() {
  return SolutionsItems.map((item) => ({
    id: item.id,
  }));
}

type SolutionPageProps = {
    params: Promise<{ id: string }>
};

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const {id} = await params;
    const meta = titles[id];
    const solution = SolutionsItems.find((s) => s.id === id);

    if (!meta || !solution) {
        return {
            title: "Solution Not Found | Ethery Tech",
            description: "The requested solution could not be found.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    return generateSEOMetadata({
        title: meta.title,
        description: meta.description,
        keywords: [
            solution.title,
            "radio communication solutions",
            "wireless solutions",
            "secure communication",
        ],
        canonicalPath: `/solution/${id}/`,
        ogImage: `${SITE_URL}${solution.image}`,
    });
}


export default async function SolutionItemPage({params}: SolutionPageProps) {
    const resolvedParams = await params;

    const product = SolutionsItems.find((p) => p.id === resolvedParams.id);

    if (!product) {
        notFound();
    }

    return (
        <main className="dark:bg-darkmode overflow-x-hidden pb-14">
            <HeroSub
                title={product.title}
                description="Explore our innovative solution lineup designed to meet your needs"
                breadcrumbLinks={breadcrumbLinks}
                isBrodcurb={false}
            />
            <div className="py-10"/>
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    <div className="w-full lg:w-8/12 order-2 lg:order-1">
                        <article className="prose dark:prose-invert max-w-none">
                            <p className="text-18 leading-normal text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% pb-8">
                                {product.details}
                            </p>
                            <p className="text-18 leading-normal text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75% pb-8">
                                {product.description}
                            </p>
                            {product.sectionTitle && (
                                <h3 className="text-xl font-semibold text-muted dark:text-white pt-4 pb-4">
                                    {product.sectionTitle}
                                </h3>
                            )}
                            {product.priorities && product.priorities.length > 0 && (
                                <ul className="text-base list-disc list-inside space-y-2 text-muted dark:text-white">
                                    {product.priorities.map((priority, index) => (
                                        <li
                                            key={index}
                                            className="text-16 leading-normal pb-3 text-muted dark:text-white dark:text-opacity-70"
                                        >
                                            <strong>{priority.title}:</strong> {priority.text}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {product.extraDescription && (
                                <>
                                    <div className="py-4"/>
                                    <p className="leading-normal text-18 text-muted dark:text-white dark:text-opacity-70 text-start lg:max-w-full sm:max-w-75%">
                                        {product.extraDescription}
                                    </p>
                                </>
                            )}
                            <hr className="my-6"/>
                            {product.relatedProducts && product.relatedProducts.length > 0 && (
                                <div>
                                    <h4 className="text-18 leading-normal font-semibold text-muted dark:text-white mb-3">
                                        Related Products:
                                    </h4>
                                    <ul className="list-disc list-inside space-y-2 text-muted dark:text-white">
                                        {product.relatedProducts.map((rp, idx) => (
                                            <li
                                                key={idx}
                                                className="text-16 leading-normal pb-2 text-primary hover:underline dark:text-white dark:text-opacity-70"
                                            >
                                                <Link href={`/product/${rp.link}`}>
                                                    {rp.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </article>
                    </div>
                    <div className="w-full lg:w-4/12 order-1 lg:order-2">
                        <div className="overflow-hidden rounded-3xl shadow-md">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={600}
                                height={400}
                                quality={100}
                                className="h-auto w-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-16">
                    <h2 className="text-20 font-bold mb-4 text-midnight_text dark:text-white">
                        Other Solutions
                    </h2>
                    <ul className="flex flex-col gap-2">
                        {SolutionsItems.filter((item) => item.id !== product.id).map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={`/solution/${item.id}`}
                                    className="text-16 leading-normal pb-2 flex flex-row   text-primary hover:underline"
                                >
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
