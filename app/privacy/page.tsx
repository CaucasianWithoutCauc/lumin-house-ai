"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">Privacy Policy</h1>
          <p className="text-muted-foreground text-center mb-8">Last updated: January 28, 2024</p>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Lumin House AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our GPU cloud platform and services.
              </p>
              <p className="text-muted-foreground mb-4">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Register for an account</li>
                <li>Make a purchase or payment</li>
                <li>Contact our support team</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                This information may include: name, email address, phone number, billing address, payment information, and company name.
              </p>

              <h3 className="text-xl font-semibold mb-3">2.2 Usage Information</h3>
              <p className="text-muted-foreground mb-4">
                We automatically collect certain information when you use our services, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Usage patterns and preferences</li>
                <li>Log data and analytics</li>
                <li>API calls and resource utilization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Providing, operating, and maintaining our services</li>
                <li>Processing transactions and billing</li>
                <li>Sending administrative communications</li>
                <li>Providing customer support</li>
                <li>Analyzing usage to improve our services</li>
                <li>Detecting and preventing fraud or abuse</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>With Your Consent:</strong> For any other purpose with your explicit consent</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Encryption of data at rest and in transit</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Right to access your personal information</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete your information</li>
                <li>Right to data portability</li>
                <li>Right to opt out of marketing communications</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                To exercise these rights, please contact us at privacy@luminhouse.ai.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to collect and store information. You can control cookies through your browser settings and other tools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none text-muted-foreground space-y-2">
                <li>Email: privacy@luminhouse.ai</li>
                <li>Address: 1 Raffles Place, #20-01 One Raffles Place, Singapore 048616</li>
              </ul>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-4">Related Documents</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
              <Link href="/sla" className="text-primary hover:underline">
                Service Level Agreement
              </Link>
              <Link href="/security-compliance" className="text-primary hover:underline">
                Security & Compliance
              </Link>
            </div>
          </div>
        </motion.div>
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
