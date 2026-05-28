import { CalculatorSection } from "@/components/CalculatorSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Meu Cálculo Trabalhista",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  description:
    "Calculadora online para estimar rescisão trabalhista com saldo de salário, férias, 13º, FGTS, multa e aviso prévio.",
};

export default function Home() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
        type="application/ld+json"
      />
      <Header />
      <main>
        <Hero />
        <CalculatorSection />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
