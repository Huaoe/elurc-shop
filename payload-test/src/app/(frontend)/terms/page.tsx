import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | elurc market",
  description: "Read our terms of service and understand your rights and responsibilities when using elurc market.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 13, 2026
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using elurc market, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Use of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              elurc market provides a decentralized marketplace platform for buying and selling products. 
              You agree to use the service only for lawful purposes and in accordance with these Terms.
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li>You must be at least 18 years old to use this service</li>
              <li>You are responsible for maintaining the security of your wallet</li>
              <li>You must not use the service for any illegal or unauthorized purpose</li>
              <li>You must not transmit any malicious code or interfere with the service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Blockchain Transactions</h2>
            <p className="text-muted-foreground leading-relaxed">
              All transactions on elurc market are conducted on the Solana blockchain. By using our service, 
              you acknowledge that:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li>Blockchain transactions are irreversible once confirmed</li>
              <li>You are responsible for all transaction fees (gas fees)</li>
              <li>Network congestion may affect transaction speed</li>
              <li>You must ensure wallet addresses are correct before confirming transactions</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Product Listings</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sellers are responsible for the accuracy of their product listings, including descriptions, 
              images, and pricing. elurc market does not guarantee the quality, safety, or legality of 
              items listed on the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Payments and Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              All payments are processed through blockchain transactions. Refund policies are determined 
              by individual sellers. elurc market is not responsible for processing refunds but may assist 
              in dispute resolution.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              elurc market shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages resulting from your use of or inability to use the service. This includes 
              but is not limited to loss of funds, data, or business opportunities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Modifications to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material 
              changes via email or platform notification. Continued use of the service after changes 
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at legal@elurc-market.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
