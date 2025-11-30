"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Check, ChevronRight, Cpu, Server, HardDrive, Database, 
  Zap, ArrowRight, MapPin, Clock, Shield
} from "lucide-react";
import { motion } from "framer-motion";

// GPU pricing data
const gpuPricing = [
  {
    id: "rtx-4090-24gb",
    name: "RTX 4090 24GB",
    vram: "24GB GDDR6X",
    gpuCount: 8,
    hourly: 0.20,
    monthly: 144,
    yearly: 1469,
    threeYear: 3744,
    specs: {
      cpu: "2× Intel Xeon Gold 6330/6530",
      memory: "512GB DDR5",
      storage: "3.84TB NVMe × 2",
      network: "25 GbE dual-port",
    },
    popular: true,
  },
  {
    id: "rtx-4090-48gb",
    name: "RTX 4090 48GB",
    vram: "48GB GDDR6X",
    gpuCount: 8,
    hourly: 0.29,
    monthly: 209,
    yearly: 2132,
    threeYear: 5440,
    specs: {
      cpu: "2× Intel Xeon Gold 8570/6530",
      memory: "512GB DDR5-5600",
      storage: "3.84TB NVMe",
      network: "25 GbE dual-port × 2",
    },
    popular: false,
  },
  {
    id: "rtx-5090-32gb",
    name: "RTX 5090 32GB",
    vram: "32GB GDDR7",
    gpuCount: 8,
    hourly: 0.34,
    monthly: 245,
    yearly: 2499,
    threeYear: 6375,
    specs: {
      cpu: "2× Intel Xeon Gold 6530 (32C/64T)",
      memory: "1TB DDR5-4800",
      storage: "3.84TB NVMe U.2 × 2",
      network: "25 GbE × 2 + 100 GbE RDMA",
    },
    popular: true,
  },
  {
    id: "h100-80gb",
    name: "NVIDIA H100 80GB",
    vram: "80GB HBM3",
    gpuCount: 8,
    hourly: 1.84,
    monthly: 1325,
    yearly: 13514,
    threeYear: 34474,
    specs: {
      cpu: "2× Intel 8558/8468 (48C)",
      memory: "2TB DDR5-5600",
      storage: "7.68TB NVMe × 2-4",
      network: "400 GbE × 8 + 200 GbE IB",
    },
    popular: true,
  },
  {
    id: "h200-141gb",
    name: "NVIDIA H200 141GB",
    vram: "141GB HBM3e",
    gpuCount: 8,
    hourly: 2.28,
    monthly: 1642,
    yearly: 16747,
    threeYear: 42722,
    specs: {
      cpu: "2× Intel Xeon Platinum 8558/8468",
      memory: "2TB DDR5",
      storage: "3.84TB U.2 NVMe × 4",
      network: "400 GbE/NDR × 8 + 200 GbE",
    },
    popular: false,
  },
  {
    id: "b200-180gb",
    name: "NVIDIA B200 180GB",
    vram: "180GB HBM3e",
    gpuCount: 8,
    hourly: 3.38,
    monthly: 2434,
    yearly: 24827,
    threeYear: 63345,
    specs: {
      cpu: "2× Intel 6960P (72C, 2.7GHz)",
      memory: "2.25TB DDR5-6400",
      storage: "7.68TB NVMe × 8",
      network: "400 GbE × 8",
    },
    popular: true,
  },
];

const billingCycles = [
  { id: "hourly", name: "Hourly", discount: 0 },
  { id: "monthly", name: "Monthly", discount: 0 },
  { id: "yearly", name: "1 Year", discount: 15 },
  { id: "threeYear", name: "3 Years", discount: 35 },
];

const features = [
  "Instant deployment in under 60 seconds",
  "Pre-installed CUDA, PyTorch, TensorFlow",
  "SSH and Jupyter access",
  "Persistent storage",
  "99.99% uptime SLA",
  "24/7 technical support",
  "Free inbound traffic",
  "API access",
];

export default function PricingPage() {
  const [selectedBilling, setSelectedBilling] = useState("hourly");

  const getPrice = (gpu: typeof gpuPricing[0]) => {
    switch (selectedBilling) {
      case "hourly": return { value: gpu.hourly, unit: "/GPU/hr" };
      case "monthly": return { value: gpu.monthly, unit: "/mo" };
      case "yearly": return { value: gpu.yearly, unit: "/yr" };
      case "threeYear": return { value: gpu.threeYear, unit: "/3yr" };
      default: return { value: gpu.hourly, unit: "/GPU/hr" };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Pay only for what you use. No hidden fees, no minimum commitments.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex p-1 rounded-lg bg-muted">
            {billingCycles.map((cycle) => (
              <button
                key={cycle.id}
                onClick={() => setSelectedBilling(cycle.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedBilling === cycle.id
                    ? "bg-background text-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cycle.name}
                {cycle.discount > 0 && (
                  <span className="ml-1 text-xs text-success-foreground">-{cycle.discount}%</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gpuPricing.map((gpu, index) => {
            const price = getPrice(gpu);
            return (
              <motion.div
                key={gpu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl border p-6 ${
                  gpu.popular ? "border-primary" : "border-border"
                }`}
              >
                {gpu.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-xl font-bold">{gpu.name}</h3>
                  <p className="text-muted-foreground">{gpu.vram} × {gpu.gpuCount} GPUs</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">${price.value.toFixed(2)}</span>
                  <span className="text-muted-foreground">{price.unit}</span>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <p><span className="text-muted-foreground">CPU:</span> {gpu.specs.cpu}</p>
                  <p><span className="text-muted-foreground">Memory:</span> {gpu.specs.memory}</p>
                  <p><span className="text-muted-foreground">Storage:</span> {gpu.specs.storage}</p>
                  <p><span className="text-muted-foreground">Network:</span> {gpu.specs.network}</p>
                </div>

                <Link
                  href="/register"
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors ${
                    gpu.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-input hover:bg-accent"
                  }`}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything Included</h2>
          <p className="text-muted-foreground">No extra charges for these features</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center space-x-2 p-4 rounded-lg bg-card border border-border"
            >
              <Check className="h-5 w-5 text-success-foreground flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Flexible Payment Options</h2>
          <p className="text-muted-foreground">Pay with cryptocurrency or traditional methods</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {["BTC", "ETH", "USDT", "USDC"].map((crypto) => (
            <div key={crypto} className="p-6 rounded-xl border border-border text-center">
              <span className="text-2xl font-bold">{crypto}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Sign up now and get $100 free credits to try our GPU cloud.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              View Documentation
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
