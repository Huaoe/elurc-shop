import type { Metadata } from "next";
import HeroSection from "./_components/home/HeroSection";
import ValuePropositions from "./_components/home/ValuePropositions";
import HowItWorks from "./_components/home/HowItWorks";
import FeaturedCategories from "./_components/home/FeaturedCategories";
import TrustIndicators from "./_components/home/TrustIndicators";
import Image from 'next/image'

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
       
      {/* Gold coin with circular text */}
      <div className="relative mb-16 mt-8">
        <div className="flex justify-center">
          <div className="relative group cursor-pointer">
            <Image
              src="/images/e-lur.png"
              alt={"elurc-market"}
              width={160}
              height={160}
              className="drop-shadow-lg transition-all duration-1800 animate-coin-rotate"
            />
          </div>
        </div>

        {/* Circular text around the coin */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            className="absolute animate-spin"
            style={{ animationDuration: '20s' }}
          >
            <defs>
              <path
                id="circlePath"
                d="M 160, 160 m -130, 0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0"
              />
            </defs>
            <text className="text-gray-500 text-base fill-current font-medium">
              <textPath href="#circlePath" startOffset="0%">
                {"elurc-market"}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      
      <ValuePropositions />
      <HowItWorks />
      <FeaturedCategories />
      <TrustIndicators />
    </main>
  );
}
