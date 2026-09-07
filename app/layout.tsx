import type { Metadata } from "next";
import "./globals.css";

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";
const SERVICE_NAME = "Fraction Calculator";
const SERVICE_DESCRIPTION =
  "Add, subtract, multiply, or divide fractions and mixed numbers, with full step-by-step working shown.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: SERVICE_NAME,
    template: `%s — ${SERVICE_NAME}`,
  },
  description: SERVICE_DESCRIPTION,
  openGraph: {
    title: SERVICE_NAME,
    description: SERVICE_DESCRIPTION,
    url: APP_URL,
    siteName: SERVICE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SERVICE_NAME,
    description: SERVICE_DESCRIPTION,
  },
  other: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
