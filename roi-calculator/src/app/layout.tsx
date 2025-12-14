import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "AR SOP ROI Calculator | ActARion",
  description: "Calculate the ROI of AR-guided SOPs for your plant. See estimated savings, payback time, and 3-year ROI from AR-based work instructions.",
  keywords: ["AR", "augmented reality", "SOP", "ROI calculator", "manufacturing", "training", "quality"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
