"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create an account?",
        answer: "elurc market uses wallet-based authentication. Simply connect your Solana wallet (like Phantom or Solflare) to get started. No traditional account creation is needed.",
      },
      {
        question: "What wallets are supported?",
        answer: "We support all major Solana wallets including Phantom, Solflare, Backpack, and any wallet compatible with the Solana wallet adapter standard.",
      },
      {
        question: "Do I need cryptocurrency to shop?",
        answer: "Yes, all transactions on elurc market are conducted using cryptocurrency on the Solana blockchain. You'll need SOL or supported tokens in your wallet to make purchases.",
      },
    ],
  },
  {
    category: "Shopping & Orders",
    questions: [
      {
        question: "How do I place an order?",
        answer: "Browse products, add items to your cart, connect your wallet, and complete the checkout process. Your transaction will be processed on the Solana blockchain.",
      },
      {
        question: "Can I track my order?",
        answer: "Yes, once your order is confirmed, you'll receive an order confirmation with tracking information. You can view your order history in your account dashboard.",
      },
      {
        question: "What's the difference between Fresh and Dry products?",
        answer: "Fresh products are perishable items that require refrigeration and have shorter delivery times. Dry products are non-perishable goods with longer shelf life and more flexible delivery options.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer: "Due to the nature of blockchain transactions, orders cannot be cancelled once confirmed on-chain. Please review your order carefully before completing the purchase.",
      },
    ],
  },
  {
    category: "Payments & Transactions",
    questions: [
      {
        question: "What are transaction fees?",
        answer: "Transaction fees (gas fees) are required to process blockchain transactions. These fees go to the Solana network validators and vary based on network congestion.",
      },
      {
        question: "How long do transactions take?",
        answer: "Solana transactions typically confirm in seconds. However, during high network activity, it may take slightly longer. You'll see a confirmation once the transaction is complete.",
      },
      {
        question: "What if my transaction fails?",
        answer: "If a transaction fails, your funds will remain in your wallet. Common causes include insufficient balance for fees or network issues. Try again or contact support if the problem persists.",
      },
      {
        question: "Are refunds available?",
        answer: "Refund policies are determined by individual sellers. Contact the seller or our support team to discuss refund options for your specific order.",
      },
    ],
  },
  {
    category: "Security & Privacy",
    questions: [
      {
        question: "Is my wallet information safe?",
        answer: "We never have access to your private keys or seed phrases. All wallet interactions are handled through secure wallet providers. Always keep your private keys secure and never share them.",
      },
      {
        question: "How is my personal data protected?",
        answer: "We collect minimal personal data and use industry-standard encryption. Blockchain transactions are public, but your personal information remains private. See our Privacy Policy for details.",
      },
      {
        question: "What should I do if I suspect fraud?",
        answer: "Report any suspicious activity immediately to our support team at support@elurc-market.com. We take security seriously and will investigate all reports promptly.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "My wallet won't connect. What should I do?",
        answer: "Try refreshing the page, ensuring your wallet extension is installed and unlocked, and checking that you're on the correct network. Clear your browser cache if issues persist.",
      },
      {
        question: "The website is loading slowly. Why?",
        answer: "Slow loading may be due to network congestion or your internet connection. Try refreshing the page or checking back later. Contact support if the issue continues.",
      },
      {
        question: "I found a bug. How do I report it?",
        answer: "We appreciate bug reports! Please contact us at support@elurc-market.com with details about the issue, including what you were doing when it occurred and any error messages.",
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left hover:text-primary transition-colors"
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-muted-foreground text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="container mx-auto  px-4 py-12 md:py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Quick answers to common questions about elurc market
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category) => (
            <div key={category.category} className="space-y-4">
              <h2 className="text-2xl font-semibold">{category.category}</h2>
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  {category.questions.map((faq) => (
                    <FAQItem key={faq.question} {...faq} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border bg-muted/50 p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our support team.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
