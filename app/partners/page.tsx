"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Building2, Globe2, Zap, Shield, ChevronRight, 
  Award, Users, Server, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

const partners = [
  {
    name: "NVIDIA",
    logo: "🟢",
    type: "Technology Partner",
    description: "As an NVIDIA Preferred Partner, we leverage cutting-edge GPU technology to deliver exceptional AI computing performance.",
    benefits: ["Latest NVIDIA GPUs", "Optimized CUDA Drivers", "Enterprise Support"],
  },
  {
    name: "Equinix",
    logo: "🔴",
    type: "Infrastructure Partner",
    description: "Our data centers are powered by Equinix's world-class infrastructure, ensuring enterprise-grade reliability and connectivity.",
    benefits: ["Global Presence", "Low Latency", "Tier-4 Data Centers"],
  },
  {
    name: "AWS",
    logo: "🟠",
    type: "Cloud Partner",
    description: "Seamlessly connect your Lumin House AI resources with AWS through VPC peering and integrated solutions.",
    benefits: ["VPC Peering", "Data Transfer", "Hybrid Workloads"],
  },
  {
    name: "Google Cloud",
    logo: "🔵",
    type: "Cloud Partner",
    description: "Integrate with Google Cloud services for a complete AI/ML pipeline from training to deployment.",
    benefits: ["GCP Integration", "BigQuery Access", "AI Platform"],
  },
];

const partnershipTypes = [
  {
    icon: Server,
    title: "Technology Partners",
    description: "Hardware and software providers that power our infrastructure",
  },
  {
    icon: Globe2,
    title: "Cloud Partners",
    description: "Cloud providers for hybrid and multi-cloud solutions",
  },
  {
    icon: Building2,
    title: "System Integrators",
    description: "Partners who help enterprises adopt GPU cloud solutions",
  },
  {
    icon: Users,
    title: "Solution Partners",
    description: "ISVs and consulting firms building on our platform",
  },
];

const benefits = [
  {
    icon: Award,
    title: "Partner Certification",
    description: "Get certified on our platform and showcase your expertise to customers.",
  },
  {
    icon: Zap,
    title: "Technical Resources",
    description: "Access dedicated technical support, training, and development resources.",
  },
  {
    icon: Shield,
    title: "Co-Marketing",
    description: "Joint marketing opportunities including events, webinars, and content.",
  },
  {
    icon: Users,
    title: "Lead Sharing",
    description: "Receive qualified leads and referrals from our sales team.",
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Partner With Us
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join our ecosystem of technology leaders to deliver exceptional 
            AI infrastructure solutions to customers worldwide.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:partners@luminhouse.ai"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Become a Partner
              <ChevronRight className="h-4 w-4 ml-2" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Partnership Types */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-12 text-center">Partnership Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnershipTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card text-center"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Partners */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{partner.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{partner.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">
                      {partner.type}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{partner.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {partner.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-6 text-center">Partner Benefits</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join our partner program and gain access to resources that help you grow your business
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <Icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to partner with us?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Fill out the partner application form and our team will reach out within 48 hours.
          </p>
          <a
            href="mailto:partners@luminhouse.ai"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Apply Now
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
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
