import { ShoppingBag, Wallet, CreditCard } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: ShoppingBag,
    title: "Browse Products",
    description: "Explore our catalog of fresh and dry products with transparent ELURC pricing",
  },
  {
    number: 2,
    icon: Wallet,
    title: "Connect Phantom Wallet",
    description: "Securely connect your Phantom wallet to enable ELURC token payments",
  },
  {
    number: 3,
    icon: CreditCard,
    title: "Pay with ELURC Tokens",
    description: "Complete your purchase instantly using ELURC on the Solana blockchain",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                    <Icon className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gray-300" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
