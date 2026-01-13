import type { Metadata } from "next";
import HeroSection from "./_components/home/HeroSection";
import ValuePropositions from "./_components/home/ValuePropositions";
import HowItWorks from "./_components/home/HowItWorks";
import FeaturedCategories from "./_components/home/FeaturedCategories";
import TrustIndicators from "./_components/home/TrustIndicators";

export const metadata: Metadata = {
  title: "elurc-market - Shop with ELURC Tokens",
  description: "Shop fresh and dry products with ELURC cryptocurrency on the Solana blockchain. Fast, secure, and transparent blockchain payments for quality groceries.",
  openGraph: {
    title: "elurc-market - Shop with ELURC Tokens",
    description: "Shop fresh and dry products with ELURC cryptocurrency on the Solana blockchain.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "elurc-market - Shop with ELURC Tokens",
    description: "Shop fresh and dry products with ELURC cryptocurrency on the Solana blockchain.",
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ValuePropositions />
      <HowItWorks />
      <FeaturedCategories />
      <TrustIndicators />
    </main>
  );
}
