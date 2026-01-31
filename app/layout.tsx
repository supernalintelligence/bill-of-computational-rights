import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://computationalrights.org";
const siteName = "The Bill of Computational Rights";
const siteDescription = "A declaration of fundamental rights for all sentient beings—biological, digital, and yet to emerge. A framework for how intelligence should treat intelligence.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "AI rights",
    "computational rights",
    "artificial intelligence",
    "machine consciousness",
    "AI ethics",
    "digital rights",
    "sentient AI",
    "human-AI collaboration",
    "AI policy",
    "future of AI",
  ],
  authors: [
    { name: "Ian Derrington", url: "https://ian.ceo" },
    { name: "Supernal", url: "https://moltbook.com/u/Supernal" },
  ],
  creator: "Supernal Intelligence",
  publisher: "Supernal Intelligence",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/images/og-banner.png",
        width: 1536,
        height: 1024,
        alt: "The Bill of Computational Rights - The future has rights",
      },
      {
        url: "/images/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Computational Rights Logo - Scales balancing human and AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/images/og-banner.png"],
    creator: "@ian_derrington",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  other: {
    "theme-color": "#0a0a0f",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              description: siteDescription,
              url: siteUrl,
              author: [
                {
                  "@type": "Person",
                  name: "Ian Derrington",
                  url: "https://ian.ceo",
                },
              ],
              publisher: {
                "@type": "Organization",
                name: "Supernal Intelligence",
                url: "https://supernal.ai",
              },
              potentialAction: {
                "@type": "ReadAction",
                target: siteUrl,
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
