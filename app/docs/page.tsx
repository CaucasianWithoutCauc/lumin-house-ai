"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Book, Code, Terminal, Settings, Cpu, Shield, 
  Zap, ChevronRight, Search, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

const docCategories = [
  {
    title: "Getting Started",
    icon: Zap,
    description: "Quick start guides and tutorials",
    links: [
      { title: "Quick Start Guide", href: "#quick-start" },
      { title: "Account Setup", href: "#account-setup" },
      { title: "First Deployment", href: "#first-deployment" },
      { title: "SSH Access", href: "#ssh-access" },
    ],
  },
  {
    title: "GPU Instances",
    icon: Cpu,
    description: "Learn about GPU configurations",
    links: [
      { title: "Instance Types", href: "#instance-types" },
      { title: "Specifications", href: "#specifications" },
      { title: "Pricing", href: "#pricing" },
      { title: "Regions", href: "#regions" },
    ],
  },
  {
    title: "API Reference",
    icon: Code,
    description: "REST API documentation",
    links: [
      { title: "Authentication", href: "#authentication" },
      { title: "Instances API", href: "#instances-api" },
      { title: "Billing API", href: "#billing-api" },
      { title: "Webhooks", href: "#webhooks" },
    ],
  },
  {
    title: "CLI Tools",
    icon: Terminal,
    description: "Command line interface",
    links: [
      { title: "Installation", href: "#cli-installation" },
      { title: "Commands", href: "#cli-commands" },
      { title: "Configuration", href: "#cli-config" },
      { title: "Examples", href: "#cli-examples" },
    ],
  },
  {
    title: "Guides",
    icon: Book,
    description: "Step-by-step tutorials",
    links: [
      { title: "PyTorch Training", href: "#pytorch" },
      { title: "TensorFlow Setup", href: "#tensorflow" },
      { title: "Jupyter Notebooks", href: "#jupyter" },
      { title: "Multi-GPU Training", href: "#multi-gpu" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    description: "Security best practices",
    links: [
      { title: "SSH Keys", href: "#ssh-keys" },
      { title: "Network Security", href: "#network-security" },
      { title: "Data Encryption", href: "#encryption" },
      { title: "Compliance", href: "#compliance" },
    ],
  },
];

const popularArticles = [
  { title: "How to deploy your first GPU instance", category: "Getting Started" },
  { title: "Setting up SSH access", category: "Getting Started" },
  { title: "PyTorch distributed training guide", category: "Guides" },
  { title: "API authentication with tokens", category: "API Reference" },
  { title: "Using the CLI to manage instances", category: "CLI Tools" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn how to use Lumin House AI for your ML workloads
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-border p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {category.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 mr-1" />
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Popular Articles */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
        <div className="space-y-3">
          {popularArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href="#"
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Book className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{article.title}</h4>
                    <p className="text-sm text-muted-foreground">{article.category}</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-2xl bg-card border border-border p-8">
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <p className="text-muted-foreground mb-6">
            Deploy your first GPU instance in under 2 minutes
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-2">1. Install the CLI</p>
              <code className="text-sm font-mono">pip install lumin-cli</code>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-2">2. Authenticate</p>
              <code className="text-sm font-mono">lumin auth login</code>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-2">3. Deploy an instance</p>
              <code className="text-sm font-mono">lumin deploy --gpu rtx-4090 --region hk</code>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is available 24/7
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/support"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Contact Support
            </Link>
            <a
              href="https://discord.gg/luminhouse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              Join Discord
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
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
