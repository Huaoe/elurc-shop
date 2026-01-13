import Link from "next/link";
import { Apple, Package } from "lucide-react";

const categories = [
  {
    name: "Fresh Products",
    slug: "fresh",
    description: "Farm-fresh produce and perishable goods delivered to your door",
    icon: Apple,
    color: "bg-success-light",
    iconColor: "text-success-dark",
  },
  {
    name: "Dry Products",
    slug: "dry",
    description: "Pantry staples, grains, and non-perishable essentials",
    icon: Package,
    color: "bg-accent-champagne",
    iconColor: "text-accent-brass",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group block p-8 rounded-lg border-2 border-gray-200 hover:border-primary transition-all hover:shadow-lg"
              >
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4`}>
                  <Icon className={`w-8 h-8 ${category.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-base text-gray-700 mb-4">
                  {category.description}
                </p>
                <span className="inline-flex items-center text-primary font-semibold group-hover:text-primary-dark transition-colors">
                  Shop Now
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
