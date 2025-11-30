"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Shield, Lock, Key, Server, Globe2, FileCheck,
  CheckCircle2, ChevronRight, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

const certifications = [
  {
    name: "SOC 2 Type II",
    description: "Independently audited for security, availability, and confidentiality controls",
    status: "Certified",
  },
  {
    name: "ISO 27001",
    description: "International standard for information security management systems",
    status: "Certified",
  },
  {
    name: "GDPR",
    description: "Compliant with EU General Data Protection Regulation",
    status: "Compliant",
  },
  {
    name: "HIPAA",
    description: "Healthcare data protection available for enterprise customers",
    status: "Available",
  },
  {
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard for billing",
    status: "Compliant",
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "Encryption at Rest",
    description: "All data is encrypted using AES-256 encryption. Customer data stored on our platform is encrypted by default.",
  },
  {
    icon: Shield,
    title: "Encryption in Transit",
    description: "All network traffic is encrypted using TLS 1.3. We enforce HTTPS for all API and web communications.",
  },
  {
    icon: Key,
    title: "Access Control",
    description: "Role-based access control (RBAC) with fine-grained permissions. Support for SSO/SAML for enterprise customers.",
  },
  {
    icon: Server,
    title: "Network Security",
    description: "Isolated VPCs with configurable firewall rules. DDoS protection and intrusion detection included.",
  },
  {
    icon: Globe2,
    title: "Data Centers",
    description: "Tier-3 certified data centers with 24/7 physical security, biometric access, and surveillance.",
  },
  {
    icon: FileCheck,
    title: "Audit Logging",
    description: "Comprehensive audit logs for all account and resource actions. Logs retained for 90 days by default.",
  },
];

const practices = [
  {
    title: "Vulnerability Management",
    items: [
      "Regular penetration testing by third-party security firms",
      "Automated vulnerability scanning of infrastructure",
      "Bug bounty program for responsible disclosure",
      "Timely patching of security vulnerabilities",
    ],
  },
  {
    title: "Incident Response",
    items: [
      "24/7 Security Operations Center (SOC)",
      "Documented incident response procedures",
      "Customer notification within 72 hours of confirmed breach",
      "Post-incident analysis and remediation",
    ],
  },
  {
    title: "Employee Security",
    items: [
      "Background checks for all employees",
      "Regular security awareness training",
      "Principle of least privilege for access",
      "Secure development training for engineers",
    ],
  },
  {
    title: "Business Continuity",
    items: [
      "Multi-region data replication",
      "Regular backup and recovery testing",
      "Documented disaster recovery procedures",
      "99.99% uptime SLA for production services",
    ],
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Security & Compliance
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We take security seriously. Our platform is built with enterprise-grade 
            security features and certified against industry standards.
          </p>
        </motion.div>
      </section>

      {/* Certifications */}
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-3xl font-bold mb-8 text-center">Certifications & Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{cert.name}</h3>
                <span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success-foreground">
                  {cert.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Security Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Security Practices */}
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-3xl font-bold mb-8 text-center">Security Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {practices.map((practice, index) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <h3 className="font-semibold mb-4">{practice.title}</h3>
              <ul className="space-y-2">
                {practice.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success-foreground mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Data Privacy */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Data Privacy</h2>
          <div className="prose prose-invert max-w-none">
            <div className="p-6 rounded-xl border border-border bg-card mb-6">
              <h3 className="text-xl font-semibold mb-3">Your Data is Yours</h3>
              <p className="text-muted-foreground mb-4">
                We do not access, sell, or share your data with third parties. Your workloads 
                and data remain completely private. We only process data as necessary to 
                provide our services.
              </p>
              <h3 className="text-xl font-semibold mb-3">Data Residency</h3>
              <p className="text-muted-foreground mb-4">
                You choose where your data is stored. We offer data centers in multiple 
                regions, and your data never leaves the region you select without your 
                explicit authorization.
              </p>
              <h3 className="text-xl font-semibold mb-3">Data Deletion</h3>
              <p className="text-muted-foreground">
                Upon request or account termination, we securely delete all your data 
                within 30 days. We use industry-standard data destruction methods to 
                ensure complete removal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Report Vulnerability */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Report a Security Vulnerability</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We value the security community. If you discover a vulnerability, please report 
            it responsibly through our bug bounty program.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:security@luminhouse.ai"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Report Vulnerability
              <ChevronRight className="h-4 w-4 ml-2" />
            </a>
            <a
              href="https://hackerone.com/luminhouse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              Bug Bounty Program
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto p-6 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-4">Related Documents</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="/sla" className="text-primary hover:underline">
              Service Level Agreement
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
