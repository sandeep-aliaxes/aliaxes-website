import Careers from "../../components/careers";

export const metadata = {
  title: "Careers | Aliaxes Technologies",
  description:
    "Explore career opportunities at Aliaxes Technologies. Join our team of engineers and innovators working on embedded systems, agentic AI, IoT, and VLSI design.",
  keywords: [
    "Aliaxes Technologies careers",
    "Aliaxes Tech jobs",
    "tech jobs Bangalore",
    "embedded systems careers",
    "AI engineering jobs India",
  ],
  alternates: {
    canonical: "https://www.aliaxestech.com/careers",
  },
  openGraph: {
    title: "Careers | Aliaxes Technologies",
    description:
      "Explore career opportunities at Aliaxes Technologies and join our team of engineers and innovators.",
    url: "https://www.aliaxestech.com/careers",
    siteName: "Aliaxes Technologies",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Aliaxes Technologies",
    description:
      "Explore career opportunities at Aliaxes Technologies and join our team of engineers and innovators.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CareersPage() {
  return <Careers />;
}