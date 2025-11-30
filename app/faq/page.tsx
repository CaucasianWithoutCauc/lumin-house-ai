"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Search, ChevronDown, ChevronRight, HelpCircle, 
  Cpu, CreditCard, Shield, Settings, Zap, MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const categories = [
  { id: "getting-started", name: "Getting Started", icon: Zap },
  { id: "billing", name: "Billing & Payments", icon: CreditCard },
  { id: "gpu-instances", name: "GPU Instances", icon: Cpu },
  { id: "security", name: "Security & Access", icon: Shield },
  { id: "account", name: "Account Settings", icon: Settings },
];

const faqs = [
  // Getting Started
  {
    category: "getting-started",
    question: "How do I get started with Lumin House AI?",
    answer: "Getting started is easy! Simply create an account, add a payment method, and you can deploy your first GPU instance in under 60 seconds. We offer $100 in free credits for new users to try our platform.",
  },
  {
    category: "getting-started",
    question: "What GPU types are available?",
    answer: "We offer a wide range of NVIDIA GPUs including RTX 4090, RTX 5090, H100, H200, and the latest B200. Each GPU type is optimized for different workloads, from inference to large-scale training.",
  },
  {
    category: "getting-started",
    question: "How do I connect to my GPU instance?",
    answer: "You can connect to your instance via SSH using the public IP address provided. We also support Jupyter notebooks, VS Code Remote, and our web-based terminal. SSH keys can be managed in your account settings.",
  },
  {
    category: "getting-started",
    question: "What operating systems are supported?",
    answer: "We support Ubuntu 20.04, Ubuntu 22.04, and Ubuntu 24.04 LTS. Each comes pre-configured with NVIDIA drivers, CUDA toolkit, and popular ML frameworks like PyTorch and TensorFlow.",
  },
  {
    category: "getting-started",
    question: "Can I use Docker with my GPU instance?",
    answer: "Yes! All our instances come with Docker and NVIDIA Container Toolkit pre-installed. You can run any GPU-accelerated Docker container directly on your instance.",
  },

  // Billing
  {
    category: "billing",
    question: "How does billing work?",
    answer: "We offer flexible billing options: hourly (pay-as-you-go), monthly (15% discount), and reserved instances (up to 35% discount for 3-year commitment). You&apos;re billed per-second for hourly usage.",
  },
  {
    category: "billing",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), wire transfers for enterprise accounts, and cryptocurrency payments (BTC, ETH, USDC) for select regions.",
  },
  {
    category: "billing",
    question: "Can I set spending limits?",
    answer: "Yes, you can set monthly spending limits in your billing settings. We&apos;ll notify you when you reach 50%, 80%, and 100% of your limit. You can also set up budget alerts via email or Slack.",
  },
  {
    category: "billing",
    question: "How do I get an invoice?",
    answer: "Invoices are automatically generated at the end of each billing cycle and can be downloaded from the Billing History section. Enterprise customers can request custom invoicing terms.",
  },
  {
    category: "billing",
    question: "What is the refund policy?",
    answer: "We offer a pro-rated refund for unused reserved instance time if you cancel within the first 7 days. Hourly usage is non-refundable but you can stop instances at any time to stop accruing charges.",
  },

  // GPU Instances
  {
    category: "gpu-instances",
    question: "What is the difference between on-demand and spot instances?",
    answer: "On-demand instances are guaranteed and run until you stop them. Spot instances offer up to 70% discount but can be interrupted with 2-minute notice when demand is high. Spot is ideal for fault-tolerant workloads.",
  },
  {
    category: "gpu-instances",
    question: "Can I resize my instance?",
    answer: "You can change your storage size at any time. To change GPU type, you'll need to create a snapshot, terminate the current instance, and launch a new one from the snapshot.",
  },
  {
    category: "gpu-instances",
    question: "What is the SLA for GPU instances?",
    answer: "We guarantee 99.99% uptime for on-demand instances. If we fail to meet this SLA, you'll receive service credits. Spot instances are not covered by the SLA.",
  },
  {
    category: "gpu-instances",
    question: "How do I set up multi-GPU training?",
    answer: "Our 8-GPU instances are pre-configured with NVLink for high-bandwidth GPU communication. For distributed training across multiple nodes, we provide InfiniBand connectivity in select regions.",
  },
  {
    category: "gpu-instances",
    question: "What network bandwidth is available?",
    answer: "Network bandwidth varies by instance type: consumer GPUs get 25 Gbps, while enterprise GPUs (H100, H200, B200) get up to 400 Gbps with optional InfiniBand for RDMA.",
  },

  // Security
  {
    category: "security",
    question: "Is my data secure?",
    answer: "Yes, we take security seriously. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Instances run in isolated VPCs, and we&apos;re SOC 2 Type II certified.",
  },
  {
    category: "security",
    question: "How do I manage SSH keys?",
    answer: "You can add, remove, and manage SSH keys in Settings > SSH Keys. Keys are deployed to new instances automatically. You can also add keys to existing instances via our API.",
  },
  {
    category: "security",
    question: "Do you offer VPC peering?",
    answer: "Yes, enterprise customers can set up VPC peering with AWS, GCP, or Azure. Contact our sales team to configure private connectivity between your cloud environment and Lumin House AI.",
  },
  {
    category: "security",
    question: "What compliance certifications do you have?",
    answer: "We are SOC 2 Type II certified and GDPR compliant. We also support HIPAA for healthcare workloads and can provide BAAs for enterprise customers.",
  },

  // Account
  {
    category: "account",
    question: "How do I invite team members?",
    answer: "Go to Settings > Team to invite team members. You can assign roles (Admin, Developer, Billing) to control access. Enterprise plans include SSO/SAML support.",
  },
  {
    category: "account",
    question: "Can I use API keys for automation?",
    answer: "Yes, you can create API keys in Settings > API Keys. Each key can have specific permissions and expiration dates. We recommend rotating keys regularly for security.",
  },
  {
    category: "account",
    question: "How do I enable two-factor authentication?",
    answer: "Go to Settings > Security > Two-Factor Authentication. We support TOTP apps (Google Authenticator, Authy) and hardware security keys (YubiKey).",
  },
  {
    category: "account",
    question: "How do I close my account?",
    answer: "To close your account, first terminate all instances and ensure your balance is zero. Then contact support. Note that this action is irreversible and all data will be deleted.",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleQuestion = (question: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(question)) {
      newExpanded.delete(question);
    } else {
      newExpanded.add(question);
    }
    setExpandedQuestions(newExpanded);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions about our GPU cloud platform
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Topics
          </button>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 py-8 max-w-4xl">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No questions found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={`${faq.category}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(faq.question)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expandedQuestions.has(faq.question) ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedQuestions.has(faq.question) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Still need help */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help 24/7.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/support"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Contact Support
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              Browse Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Lumin House AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
