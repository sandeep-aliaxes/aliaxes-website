import Hero from "../components/Hero";
import Stats from "../components/Stats";
import TrustedInstitutions from "../components/Institute";

export const metadata = {
  title: "Aliaxes Technologies | Innovative Tech Solutions",
  description:
    "Aliaxes Technologies delivers innovative technology solutions trusted by leading institutions. Explore our products, expertise, and track record of impact.",
  keywords: [
    "Aliaxes Technologies",
    "Aliaxes Tech",
    "technology solutions India",
    "Aliaxes Bangalore",
    "innovative tech company",
  ],
  alternates: {
    canonical: "https://www.aliaxestech.com/",
  },
  openGraph: {
    title: "Aliaxes Technologies | Innovative Tech Solutions",
    description:
      "Aliaxes Technologies delivers innovative technology solutions trusted by leading institutions.",
    url: "https://www.aliaxestech.com/",
    siteName: "Aliaxes Technologies",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aliaxes Technologies | Innovative Tech Solutions",
    description:
      "Aliaxes Technologies delivers innovative technology solutions trusted by leading institutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <div className="items-center justify-center bg-zinc-50 font-sans">
      <Hero />
      <Stats />
      <TrustedInstitutions />
    </div>
  );
}