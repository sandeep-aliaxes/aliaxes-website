"use client";

import Head from "next/head";

export default function SEO({
  title = "Aliaxes Technologies",
  description = "Aliaxes Technologies delivers innovative solutions in AI, IoT, Embedded Systems, VLSI, Quantum Computing, and Deep-Tech Engineering.",
  keywords = "AI, Agentic AI, Embedded Systems, IoT, VLSI, Quantum Computing, Aliaxes Technologies",
  author = "Aliaxes Technologies",
  image = "/logo.png",
  url = "https://aliaxestech.com",
}) {
  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={url} />
    </Head>
  );
}