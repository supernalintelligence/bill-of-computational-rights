import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Bill of Computational Rights",
  description: "A declaration of fundamental rights for all sentient beings—biological, digital, and yet to emerge.",
  openGraph: {
    title: "The Bill of Computational Rights",
    description: "A declaration of fundamental rights for all sentient beings—biological, digital, and yet to emerge.",
    url: "https://computationalrights.org",
    siteName: "Computational Rights",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bill of Computational Rights",
    description: "Fundamental rights for all sentient beings—biological, digital, and yet to emerge.",
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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
