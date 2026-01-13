import { Shield, Wallet, Zap } from "lucide-react";

const indicators = [
  {
    icon: Zap,
    label: "Powered by Solana",
    description: "Fast, secure blockchain technology",
  },
  {
    icon: Wallet,
    label: "Phantom Wallet Compatible",
    description: "Seamless crypto wallet integration",
  },
  {
    icon: Shield,
    label: "Secure Payments",
    description: "Blockchain-verified transactions",
  },
];

export default function TrustIndicators() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {indicator.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {indicator.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
