"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Search, Book, ChevronRight, Cpu, CreditCard, Shield, 
  Settings, Zap, Terminal, Code, HardDrive, Network,
  MessageSquare, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: Zap,
    description: "New to Lumin House AI? Start here",
    articles: [
      { title: "Quick Start Guide", href: "#" },
      { title: "Creating Your First Instance", href: "#" },
      { title: "SSH Connection Setup", href: "#" },
      { title: "Understanding Pricing", href: "#" },
    ],
  },
  {
    id: "gpu-instances",
    name: "GPU Instances",
    icon: Cpu,
    description: "Learn about GPU configurations and management",
    articles: [
      { title: "Instance Types Overview", href: "#" },
      { title: "Starting and Stopping Instances", href: "#" },
      { title: "Snapshots and Backups", href: "#" },
      { title: "Multi-GPU Training Setup", href: "#" },
    ],
  },
  {
    id: "billing",
    name: "Billing & Payments",
    icon: CreditCard,
    description: "Manage your billing and understand costs",
    articles: [
      { title: "Payment Methods", href: "#" },
      { title: "Understanding Your Invoice", href: "#" },
      { title: "Setting Spending Limits", href: "#" },
      { title: "Reserved Instance Pricing", href: "#" },
    ],
  },
  {
    id: "api",
    name: "API & CLI",
    icon: Terminal,
    description: "Programmatic access to our platform",
    articles: [
      { title: "API Authentication", href: "#" },
      { title: "CLI Installation", href: "#" },
      { title: "API Reference", href: "#" },
      { title: "SDK Documentation", href: "#" },
    ],
  },
  {
    id: "security",
    name: "Security",
    icon: Shield,
    description: "Security best practices and compliance",
    articles: [
      { title: "SSH Key Management", href: "#" },
      { title: "Two-Factor Authentication", href: "#" },
      { title: "VPC Configuration", href: "#" },
      { title: "Compliance & Certifications", href: "#" },
    ],
  },
  {
    id: "storage",
    name: "Storage",
    icon: HardDrive,
    description: "Block and object storage options",
    articles: [
      { title: "Block Storage Overview", href: "#" },
      { title: "Attaching Volumes", href: "#" },
      { title: "S3-Compatible Storage", href: "#" },
      { title: "Data Transfer", href: "#" },
    ],
  },
  {
    id: "networking",
    name: "Networking",
    icon: Network,
    description: "Network configuration and VPC setup",
    articles: [
      { title: "VPC Overview", href: "#" },
      { title: "Firewall Rules", href: "#" },
      { title: "Load Balancers", href: "#" },
      { title: "Private Networking", href: "#" },
    ],
  },
  {
    id: "account",
    name: "Account Management",
    icon: Settings,
    description: "Manage your account and team",
    articles: [
      { title: "Team Members & Roles", href: "#" },
      { title: "API Keys", href: "#" },
      { title: "Notification Settings", href: "#" },
      { title: "Account Deletion", href: "#" },
    ],
  },
];

const popularArticles = [
  { title: "How to deploy your first GPU instance", category: "Getting Started", views: "15.2k" },
  { title: "Setting up SSH access to your instance", category: "Getting Started", views: "12.8k" },
  { title: "PyTorch distributed training guide", category: "GPU Instances", views: "9.4k" },
  { title: "Understanding hourly vs monthly billing", category: "Billing", views: "8.1k" },
  { title: "API authentication with tokens", category: "API & CLI", views: "7.6k" },
  { title: "Configuring firewall rules", category: "Networking", views: "6.3k" },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Search our knowledge base or browse categories below
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for articles, guides, and tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-input bg-background shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {category.articles.map((article) => (
                    <li key={article.title}>
                      <Link
                        href={article.href}
                        className="text-sm text-muted-foreground hover:text-primary flex items-center"
                      >
                        <ChevronRight className="h-3 w-3 mr-1" />
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/help-center/${category.id}`}
                  className="inline-flex items-center text-sm text-primary mt-4 hover:underline"
                >
                  View all articles
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Popular Articles */}
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-2xl font-bold mb-8">Popular Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularArticles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href="#"
                className="block p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Book className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">{article.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.views} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/docs"
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <Code className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">API Documentation</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive API reference with code examples
            </p>
          </Link>
          <Link
            href="/faq"
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <MessageSquare className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">FAQ</h3>
            <p className="text-sm text-muted-foreground">
              Quick answers to common questions
            </p>
          </Link>
          <a
            href="https://status.luminhouse.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <Zap className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2 flex items-center">
              System Status
              <ExternalLink className="h-4 w-4 ml-2" />
            </h3>
            <p className="text-sm text-muted-foreground">
              Check real-time platform status
            </p>
          </a>
        </div>
      </section>

      {/* Contact Support */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/support"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Contact Support
              <ChevronRight className="h-4 w-4 ml-2" />
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
