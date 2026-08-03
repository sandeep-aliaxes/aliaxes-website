import Contact from "../../components/contact";

export const metadata = {
  title: "Contact Us | Aliaxes Technologies",
  description:
    "Get in touch with Aliaxes Technologies. Reach us by phone, email, or visit our office in Bangalore, India. We'd love to hear from you.",
  keywords: [
    "contact Aliaxes Technologies",
    "Aliaxes Tech contact",
    "Aliaxes Bangalore office",
    "get in touch Aliaxes",
    "Aliaxes support",
  ],
  alternates: {
    canonical: "https://www.aliaxestech.com/contact",
  },
  openGraph: {
    title: "Contact Us | Aliaxes Technologies",
    description:
      "Get in touch with Aliaxes Technologies. Reach us by phone, email, or visit our office in Bangalore, India.",
    url: "https://www.aliaxestech.com/contact",
    siteName: "Aliaxes Technologies",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    title: "Contact Us | Aliaxes Technologies",
    description:
      "Get in touch with Aliaxes Technologies. Reach us by phone, email, or visit our office in Bangalore, India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return <Contact />;
}