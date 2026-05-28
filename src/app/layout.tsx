import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://meucalculotrabalhista.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Meu Cálculo Trabalhista | Calculadora de Rescisão Online",
    template: "%s | Meu Cálculo Trabalhista",
  },
  description:
    "Simule sua rescisão trabalhista online com férias, FGTS, 13º salário, multa rescisória e aviso prévio.",
  applicationName: "Meu Cálculo Trabalhista",
  keywords: [
    "calculadora de rescisão",
    "rescisão trabalhista",
    "cálculo trabalhista",
    "FGTS",
    "férias proporcionais",
    "13º proporcional",
  ],
  authors: [{ name: "Meu Cálculo Trabalhista" }],
  creator: "Meu Cálculo Trabalhista",
  publisher: "Meu Cálculo Trabalhista",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Meu Cálculo Trabalhista | Calculadora de Rescisão Online",
    description:
      "Simule sua rescisão trabalhista gratuitamente com uma experiência rápida, clara e mobile-first.",
    url: "/",
    siteName: "Meu Cálculo Trabalhista",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meu Cálculo Trabalhista",
    description: "Calculadora de rescisão trabalhista online, gratuita e fácil de usar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f4a44",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
