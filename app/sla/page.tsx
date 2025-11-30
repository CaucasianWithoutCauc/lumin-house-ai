"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const serviceCredits = [
  { uptime: "< 99.99%", credit: "10%" },
  { uptime: "< 99.9%", credit: "25%" },
  { uptime: "< 99.0%", credit: "50%" },
  { uptime: "< 95.0%", credit: "100%" },
];

const coveredServices = [
  "On-demand GPU instances",
  "Reserved GPU instances",
  "Block storage",
  "Object storage",
  "VPC networking",
  "Load balancers",
];

const excludedServices = [
  "Spot instances",
  "Free tier usage",
  "Beta features",
  "Scheduled maintenance",
];

export default function SLAPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">Service Level Agreement</h1>
          <p className="text-muted-foreground text-center mb-8">Last updated: January 28, 2024</p>

          {/* Uptime Guarantee */}
          <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 mb-12 text-center">
            <h2 className="text-6xl font-bold text-primary mb-2">99.99%</h2>
            <p className="text-xl text-muted-foreground">Uptime Guarantee</p>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Service Commitment</h2>
              <p className="text-muted-foreground mb-4">
                Lumin House AI is committed to providing highly reliable GPU cloud services. We guarantee a monthly uptime percentage of 99.99% for covered services. This means your services may experience no more than 4.32 minutes of downtime per month.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Uptime Calculation</h2>
              <p className="text-muted-foreground mb-4">
                Monthly Uptime Percentage is calculated as:
              </p>
              <div className="p-4 rounded-lg bg-muted mb-4 font-mono text-sm">
                ((Total Minutes - Downtime Minutes) / Total Minutes) × 100
              </div>
              <p className="text-muted-foreground mb-4">
                Where &quot;Downtime&quot; means total accumulated minutes during which services are unavailable, excluding scheduled maintenance and exclusions listed below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Service Credits</h2>
              <p className="text-muted-foreground mb-4">
                If we fail to meet our uptime commitment, you are eligible for service credits as follows:
              </p>
              <div className="rounded-xl border border-border overflow-hidden mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left font-semibold">Monthly Uptime</th>
                      <th className="px-4 py-3 text-left font-semibold">Service Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceCredits.map((row, index) => (
                      <tr key={index} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 text-muted-foreground">{row.uptime}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.credit} of monthly bill</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground mb-4">
                Service credits are applied to future billing cycles and are non-refundable as cash.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Covered Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl border border-border bg-card">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-success-foreground mr-2" />
                    Covered
                  </h4>
                  <ul className="space-y-2">
                    {coveredServices.map((service) => (
                      <li key={service} className="text-sm text-muted-foreground flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-success-foreground mr-2" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AlertCircle className="h-5 w-5 text-warning-foreground mr-2" />
                    Excluded
                  </h4>
                  <ul className="space-y-2">
                    {excludedServices.map((service) => (
                      <li key={service} className="text-sm text-muted-foreground flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-warning-foreground mr-2" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. SLA Exclusions</h2>
              <p className="text-muted-foreground mb-4">
                This SLA does not apply to unavailability caused by:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li>Factors outside our reasonable control (e.g., natural disasters, war, government actions)</li>
                <li>Your equipment, software, or network connections</li>
                <li>Your actions or inactions, or those of third parties</li>
                <li>Scheduled maintenance (announced at least 72 hours in advance)</li>
                <li>Emergency maintenance required to protect the security of the platform</li>
                <li>Features labeled as &quot;Beta&quot; or &quot;Preview&quot;</li>
                <li>Suspension of your account due to breach of Terms of Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Maintenance Windows</h2>
              <p className="text-muted-foreground mb-4">
                Scheduled maintenance is performed during the following windows:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                <li><strong>APAC Region:</strong> Tuesdays 2:00 AM - 6:00 AM SGT</li>
                <li><strong>Americas Region:</strong> Wednesdays 2:00 AM - 6:00 AM PST</li>
                <li><strong>EMEA Region:</strong> Thursdays 2:00 AM - 6:00 AM GMT</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                We will notify you of scheduled maintenance at least 72 hours in advance via email and status page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Credit Request Process</h2>
              <p className="text-muted-foreground mb-4">
                To request a service credit:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">
                <li>Submit a support ticket within 30 days of the incident</li>
                <li>Include your account ID and affected resources</li>
                <li>Provide dates and times of the outage</li>
                <li>Describe the impact on your services</li>
              </ol>
              <p className="text-muted-foreground mb-4">
                We will review your request and apply eligible credits within 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Status Page</h2>
              <p className="text-muted-foreground mb-4">
                Real-time service status and incident history are available at{" "}
                <a href="https://status.luminhouse.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  status.luminhouse.ai
                </a>
                . Subscribe to receive automatic notifications about service disruptions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Maximum Credits</h2>
              <p className="text-muted-foreground mb-4">
                The maximum service credit for any billing period shall not exceed 100% of your fees for that period. Credits are not transferable and have no cash value.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to This SLA</h2>
              <p className="text-muted-foreground mb-4">
                We may modify this SLA from time to time. Changes will not apply retroactively and will become effective 30 days after posting, unless we notify you of changes with a longer notice period.
              </p>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-4">Related Documents</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
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
