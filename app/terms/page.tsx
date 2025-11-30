"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">Terms of Service</h1>
          <p className="text-muted-foreground text-center mb-8">Last updated: January 28, 2024</p>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using Lumin House AI&apos;s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Description of Services</h2>
              <p className="text-muted-foreground mb-4">
                Lumin House AI provides GPU cloud computing services, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>On-demand GPU instances</li>
                <li>Reserved GPU capacity</li>
                <li>Block and object storage</li>
                <li>Networking and VPC services</li>
                <li>AI Studio collaborative platform</li>
                <li>API access and CLI tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                To use our services, you must:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Be at least 18 years old or the age of legal majority in your jurisdiction</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly notify us of any unauthorized account access</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                You are responsible for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to use our services to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the intellectual property rights of others</li>
                <li>Distribute malware, viruses, or harmful code</li>
                <li>Send spam or unsolicited communications</li>
                <li>Engage in cryptocurrency mining without authorization</li>
                <li>Attempt to gain unauthorized access to systems or data</li>
                <li>Interfere with or disrupt our services or infrastructure</li>
                <li>Generate, store, or distribute illegal content</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                We reserve the right to suspend or terminate accounts that violate these policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Payment Terms</h2>
              <h3 className="text-xl font-semibold mb-3">5.1 Billing</h3>
              <p className="text-muted-foreground mb-4">
                You agree to pay all fees associated with your use of our services. Fees are based on your selected pricing plan (hourly, monthly, or reserved) and actual resource usage.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">5.2 Payment Methods</h3>
              <p className="text-muted-foreground mb-4">
                We accept credit cards, wire transfers, and select cryptocurrency payments. You authorize us to charge your payment method for all fees incurred.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">5.3 Overdue Payments</h3>
              <p className="text-muted-foreground mb-4">
                Accounts with overdue payments may be suspended. A 1.5% monthly interest rate applies to overdue amounts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Service Level Agreement</h2>
              <p className="text-muted-foreground mb-4">
                Our Service Level Agreement (SLA) guarantees 99.99% uptime for on-demand instances. Please refer to our <Link href="/sla" className="text-primary hover:underline">SLA page</Link> for detailed terms and service credits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Data and Content</h2>
              <h3 className="text-xl font-semibold mb-3">7.1 Your Data</h3>
              <p className="text-muted-foreground mb-4">
                You retain all rights to data you upload to our services. You grant us a limited license to process and store your data as necessary to provide our services.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">7.2 Data Backup</h3>
              <p className="text-muted-foreground mb-4">
                While we implement redundancy measures, you are responsible for maintaining your own backups. We are not liable for data loss.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">7.3 Data Deletion</h3>
              <p className="text-muted-foreground mb-4">
                Upon account termination, we will delete your data within 30 days unless retention is required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                Lumin House AI and its logo, features, and functionality are owned by us and are protected by intellectual property laws. You may not copy, modify, or distribute our platform without permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, LUMIN HOUSE AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
              </p>
              <p className="text-muted-foreground mb-4">
                Our total liability shall not exceed the amount paid by you for services during the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
              <p className="text-muted-foreground mb-4">
                You agree to indemnify and hold harmless Lumin House AI from any claims, damages, or expenses arising from your use of our services or violation of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
              <p className="text-muted-foreground mb-4">
                Either party may terminate this agreement at any time. Upon termination:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Your access to services will be revoked</li>
                <li>Outstanding fees become immediately due</li>
                <li>Your data will be deleted according to our data retention policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We may update these terms from time to time. We will notify you of material changes by email or through our platform. Continued use after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These terms shall be governed by the laws of Singapore, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Singapore.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none text-muted-foreground space-y-2">
                <li>Email: legal@luminhouse.ai</li>
                <li>Address: 1 Raffles Place, #20-01 One Raffles Place, Singapore 048616</li>
              </ul>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-4">Related Documents</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
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
