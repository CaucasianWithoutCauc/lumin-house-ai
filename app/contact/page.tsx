"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Mail, Phone, MapPin, Clock, MessageSquare, 
  Building2, Headphones, Users, ChevronRight, Send
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const offices = [
  {
    city: "Singapore (HQ)",
    address: "1 Raffles Place, #20-01 One Raffles Place, Singapore 048616",
    phone: "+65 6123 4567",
    email: "asia@luminhouse.ai",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM SGT",
  },
  {
    city: "San Francisco",
    address: "525 Market Street, Suite 500, San Francisco, CA 94105",
    phone: "+1 (415) 555-0123",
    email: "americas@luminhouse.ai",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM PST",
  },
  {
    city: "London",
    address: "100 Liverpool Street, London EC2M 2AT, United Kingdom",
    phone: "+44 20 7123 4567",
    email: "emea@luminhouse.ai",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM GMT",
  },
];

const contactOptions = [
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Get help with your GPU instances and technical issues",
    action: "Contact Support",
    href: "/support",
  },
  {
    icon: Building2,
    title: "Sales Inquiries",
    description: "Learn about enterprise plans and custom solutions",
    action: "Contact Sales",
    href: "mailto:sales@luminhouse.ai",
  },
  {
    icon: Users,
    title: "Partnerships",
    description: "Explore partnership and integration opportunities",
    action: "Partner With Us",
    href: "mailto:partners@luminhouse.ai",
  },
  {
    icon: MessageSquare,
    title: "Media & Press",
    description: "Press inquiries and media resources",
    action: "Press Contact",
    href: "mailto:press@luminhouse.ai",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Get in touch with our team.
          </p>
        </motion.div>
      </section>

      {/* Contact Options */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={option.href}
                  className="block p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors h-full"
                >
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <span className="text-sm text-primary flex items-center">
                    {option.action}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {isSubmitted ? (
              <div className="rounded-xl border border-success/50 bg-success/10 p-8 text-center">
                <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-6 w-6 text-success-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      subject: "",
                      message: "",
                      type: "general",
                    });
                  }}
                  className="text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Inquiry Type *</label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="press">Press & Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Office Locations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <div
                  key={office.city}
                  className="p-6 rounded-xl border border-border bg-card"
                >
                  <h3 className="font-semibold text-lg mb-4">{office.city}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${office.email}`} className="text-primary hover:underline">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{office.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="mt-8 p-6 rounded-xl border border-primary/30 bg-primary/5">
              <h3 className="font-semibold mb-3">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is available 24/7 for urgent technical issues.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/support"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90"
                >
                  Open Support Ticket
                </Link>
                <a
                  href="https://discord.gg/luminhouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-input text-sm hover:bg-accent"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </motion.div>
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
