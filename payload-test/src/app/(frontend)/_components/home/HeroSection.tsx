import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center bg-gradient-to-b from-primary-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6">
            Welcome to elurc-market
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Shop fresh and dry products with ELURC tokens on the Solana blockchain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold text-lg min-h-[48px] flex items-center justify-center"
            >
              Browse Products
            </Link>
            <a
              href="https://solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border-2 border-accent-gold text-accent-gold rounded-lg hover:bg-accent-champagne transition-colors font-semibold text-lg min-h-[48px] flex items-center justify-center"
            >
              Learn About ELURC
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
