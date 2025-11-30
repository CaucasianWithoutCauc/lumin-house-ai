"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Zap, Globe2, Shield, Users, Building2, MapPin, 
  Award, Target, Heart, ChevronRight, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "1 GW+", label: "Data Center Capacity" },
  { value: "32+", label: "Global Locations" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "50K+", label: "Active Users" },
];

const values = [
  {
    icon: Target,
    title: "Innovation",
    description: "We push the boundaries of AI infrastructure, constantly improving our technology to deliver cutting-edge solutions.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Our enterprise-grade infrastructure ensures maximum uptime and performance for mission-critical AI workloads.",
  },
  {
    icon: Heart,
    title: "Sustainability",
    description: "We&apos;re committed to reducing the carbon footprint of AI computing through energy-efficient data centers.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We build strong partnerships with developers, researchers, and enterprises to advance AI together.",
  },
];

const locations = [
  { city: "Singapore", country: "HQ", flag: "🇸🇬" },
  { city: "Hong Kong", country: "APAC", flag: "🇭🇰" },
  { city: "Tokyo", country: "Japan", flag: "🇯🇵" },
  { city: "San Francisco", country: "USA", flag: "🇺🇸" },
  { city: "Dallas", country: "USA", flag: "🇺🇸" },
  { city: "Frankfurt", country: "Germany", flag: "🇩🇪" },
  { city: "London", country: "UK", flag: "🇬🇧" },
  { city: "Oslo", country: "Norway", flag: "🇳🇴" },
];

const leadership = [
  {
    name: "David Chen",
    role: "CEO & Co-Founder",
    bio: "Former VP of Engineering at a major cloud provider with 15+ years in distributed systems.",
  },
  {
    name: "Sarah Kim",
    role: "CTO",
    bio: "PhD in Computer Science, previously led AI infrastructure at a Fortune 500 tech company.",
  },
  {
    name: "Michael Zhang",
    role: "COO",
    bio: "20+ years experience in data center operations and global infrastructure management.",
  },
  {
    name: "Emily Park",
    role: "VP of Engineering",
    bio: "Expert in GPU computing and machine learning systems, former researcher at top AI labs.",
  },
];

export default function AboutPage() {
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
            Powering the Future of AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Lumin House AI is a global technology company providing high-performance GPU cloud 
            infrastructure for AI/ML workloads. We enable developers and enterprises to build, 
            train, and deploy AI at scale.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Join Our Team
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-xl border border-border bg-card"
            >
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
              <p>
                Founded in 2021, Lumin House AI emerged from a simple observation: AI developers 
                were spending more time managing infrastructure than building innovative solutions. 
                Our founders, experienced engineers from leading tech companies, set out to change that.
              </p>
              <p>
                We built a platform that makes GPU computing accessible, affordable, and scalable. 
                Starting with a single data center in Singapore, we&apos;ve expanded to over 30 locations 
                worldwide, serving thousands of developers and enterprises.
              </p>
              <p>
                Today, Lumin House AI powers some of the most innovative AI projects in the world, 
                from cutting-edge research to production ML systems. We&apos;re proud to be an NVIDIA 
                Preferred Partner and continue to push the boundaries of what&apos;s possible in AI infrastructure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Leadership */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card text-center"
            >
              <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{person.name}</h3>
              <p className="text-sm text-primary mb-3">{person.role}</p>
              <p className="text-sm text-muted-foreground">{person.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Presence */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-6 text-center">Global Presence</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          With data centers strategically located around the world, we ensure low-latency 
          access to GPU resources wherever your users are.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg border border-border bg-card text-center"
            >
              <span className="text-2xl mb-2 block">{location.flag}</span>
              <p className="font-medium text-sm">{location.city}</p>
              <p className="text-xs text-muted-foreground">{location.country}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Partners</h2>
        <p className="text-center text-muted-foreground mb-12">
          We work with industry leaders to deliver the best AI infrastructure
        </p>
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Zap className="h-8 w-8 text-green-500" />
            NVIDIA Partner
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <Globe2 className="h-8 w-8 text-blue-500" />
            AWS Partner
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <Building2 className="h-8 w-8 text-orange-500" />
            Equinix Partner
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of developers and enterprises using Lumin House AI
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              Contact Sales
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
