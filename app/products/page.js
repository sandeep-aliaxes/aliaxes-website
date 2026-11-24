import { Suspense } from "react";
import Products from "../../components/Products";

export const metadata = {
  title: "Products | Embedded Systems, Agentic AI, IoT & VLSI | Aliaxes Technologies",
  description:
    "Explore Aliaxes Technologies' product suite: Raspberry Pi and ST embedded kits, agentic AI labs, edge intelligence, IoT solutions, and VLSI design tools.",
  keywords: [
    "Aliaxes Technologies products",
    "embedded systems kits",
    "agentic AI stack",
    "edge AI solutions",
    "IoT solution suite",
    "VLSI design suite",
    "Raspberry Pi embedded kit",
    "STM32 embedded kit",
    "Arduino lab setup",
    "Raspberry Pi lab",
    "IoT trainer kit",
    "Edge AI lab",
    "Vision AI lab",
    "Quantum machine learning lab",
    "Quantum computing lab",
    "FPGA development boards",
    "LoRaWAN gateway",
    "PCB design lab",
    "SMT pick and place",
    "PLC automation workbench",
    "EV workbench",
    "AICTE IDEA Lab",
  ],
  alternates: {
    canonical: "https://www.aliaxestech.com/products",
  },
  openGraph: {
    title: "Products | Embedded Systems, Agentic AI, IoT & VLSI | Aliaxes Technologies",
    description:
      "Explore Aliaxes Technologies' product suite across embedded systems, agentic AI, IoT, and VLSI design.",
    url: "https://www.aliaxestech.com/products",
    siteName: "Aliaxes Technologies",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Embedded Systems, Agentic AI, IoT & VLSI | Aliaxes Technologies",
    description:
      "Explore Aliaxes Technologies' product suite across embedded systems, agentic AI, IoT, and VLSI design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <Products />
    </Suspense>
  );
}