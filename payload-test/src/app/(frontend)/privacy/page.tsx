import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | elurc market",
  description: "Learn how elurc market collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 13, 2026
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At elurc market, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use 
              our decentralized marketplace platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect different types of information to provide and improve our service:
            </p>
            
            <div className="space-y-4 ml-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Wallet Information</h3>
                <p className="text-muted-foreground text-sm">
                  Your public wallet address when you connect to our platform. We do not have access to 
                  your private keys or seed phrases.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Transaction Data</h3>
                <p className="text-muted-foreground text-sm">
                  Information about your purchases and sales, which is publicly available on the Solana blockchain.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Usage Data</h3>
                <p className="text-muted-foreground text-sm">
                  Information about how you interact with our platform, including pages visited, features used, 
                  and time spent on the site.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Communication Data</h3>
                <p className="text-muted-foreground text-sm">
                  Information you provide when contacting our support team or participating in surveys.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the collected information for the following purposes:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li>To provide and maintain our marketplace service</li>
              <li>To process your transactions on the blockchain</li>
              <li>To send you order confirmations and updates</li>
              <li>To improve our platform and user experience</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data. However, please note 
              that blockchain transactions are public and permanent. We store minimal personal data and 
              use encryption for sensitive information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our platform. 
              You can control cookie preferences through your browser settings. Essential cookies are 
              required for the platform to function properly.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may use third-party services for analytics, payment processing, and other functionalities. 
              These services have their own privacy policies, and we encourage you to review them:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li>Solana blockchain network</li>
              <li>Wallet providers (Phantom, Solflare, etc.)</li>
              <li>Analytics services</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Object to processing of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our service is not intended for users under 18 years of age. We do not knowingly collect 
              personal information from children. If you believe we have collected data from a child, 
              please contact us immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any material 
              changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@elurc-market.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
