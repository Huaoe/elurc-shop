import { Zap, Shield, Truck, Wallet } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Fast Blockchain Payments",
    description: "Complete transactions in seconds with ELURC tokens on Solana's high-speed network",
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    description: "See prices in both ELURC tokens and EUR conversion for complete clarity",
  },
  {
    icon: Truck,
    title: "Fresh & Dry Products",
    description: "Quality products delivered directly to your door with blockchain-verified payments",
  },
  {
    icon: Wallet,
    title: "Secure Wallet Integration",
    description: "Connect your Phantom wallet for safe and seamless cryptocurrency payments",
  },
];

export default function ValuePropositions() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12">
          Why Choose elurc-market?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-base text-gray-700">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
