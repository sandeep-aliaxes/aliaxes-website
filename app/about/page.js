import About from "../../components/About";

export const metadata = {
  title: "About Us | Aliaxes Technologies",
  description:
    "Aliaxes Technologies accelerates prototyping, experimentation, and deployment through advanced lab solutions and expertise spanning Agentic AI, Embedded Systems, IoT, Quantum Computing, and VLSI Design.",
  keywords: [
    "About Aliaxes Technologies",
    "Agentic AI",
    "Embedded Systems",
    "IoT",
    "VLSI Design",
    "Quantum Computing",
    "Deep-Tech Engineering",
  ],
  openGraph: {
    title: "About Us | Aliaxes Technologies",
    description:
      "Aliaxes Technologies accelerates prototyping, experimentation, and deployment through advanced lab solutions and expertise spanning Agentic AI, Embedded Systems, IoT, Quantum Computing, and VLSI Design.",
    url: "https://aliaxestech.com/about",
    images: ["/logo.png"],
    type: "website",
  },
  twitter: {
    title: "About Us | Aliaxes Technologies",
    description:
      "Aliaxes Technologies accelerates prototyping, experimentation, and deployment through advanced lab solutions and expertise spanning Agentic AI, Embedded Systems, IoT, Quantum Computing, and VLSI Design.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://aliaxestech.com/about",
  },
};

export default function AboutPage() {
  return <About />;
}