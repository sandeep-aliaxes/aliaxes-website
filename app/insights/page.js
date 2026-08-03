import Insight from "../../components/insights";

export const metadata = {
  title: "Insights & Articles | Aliaxes Technologies",
  description:
    "Read the latest insights from Aliaxes Technologies on agentic AI, embedded systems, IoT, VLSI design, quantum computing, and emerging technology trends.",
  keywords: [
    "Aliaxes Technologies insights",
    "agentic AI articles",
    "embedded systems blog",
    "IoT industry trends",
    "VLSI design insights",
    "tech blog India",
  ],
  alternates: {
    canonical: "https://www.aliaxestech.com/insights",
  },
  openGraph: {
    title: "Insights & Articles | Aliaxes Technologies",
    description:
      "Read the latest insights from Aliaxes Technologies on agentic AI, embedded systems, IoT, VLSI design, and more.",
    url: "https://www.aliaxestech.com/insights",
    siteName: "Aliaxes Technologies",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Articles | Aliaxes Technologies",
    description:
      "Read the latest insights from Aliaxes Technologies on agentic AI, embedded systems, IoT, VLSI design, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function InsightsPage() {
  return <Insight />;
}