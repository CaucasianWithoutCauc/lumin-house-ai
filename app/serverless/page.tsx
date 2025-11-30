"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Zap, Cloud, Timer, DollarSign, Cpu, ArrowRight,
  Check, ChevronRight, Scale, Shield, Gauge
} from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Timer,
    title: "Zero Cold Starts",
    description: "Pre-warmed GPU instances ready to serve requests instantly. No waiting for containers to spin up.",
  },
  {
    icon: Scale,
    title: "Auto-Scaling",
    description: "Automatically scale from zero to thousands of GPUs based on demand. Pay only for active compute.",
  },
  {
    icon: DollarSign,
    title: "Pay Per Second",
    description: "Granular billing with no minimum commitments. Perfect for variable or unpredictable workloads.",
  },
  {
    icon: Shield,
    title: "Managed Infrastructure",
    description: "No servers to manage. We handle provisioning, monitoring, and maintenance for you.",
  },
];

const useCases = [
  {
    title: "Model Inference",
    description: "Deploy ML models as APIs with automatic scaling. Handle millions of requests with low latency.",
  },
  {
    title: "Batch Processing",
    description: "Process large datasets in parallel. Scale up for heavy workloads, scale down when done.",
  },
  {
    title: "Training Jobs",
    description: "Run distributed training jobs on-demand. No need to reserve capacity ahead of time.",
  },
  {
    title: "Event-Driven AI",
    description: "Trigger AI workloads from events, webhooks, or schedules. Perfect for async processing.",
  },
];

const gpuOptions = [
  {
    name: "RTX 4090",
    vram: "24GB",
    price: "$0.20/hr",
    useCase: "Inference & Fine-tuning",
  },
  {
    name: "H100",
    vram: "80GB",
    price: "$1.84/hr",
    useCase: "Large Model Training",
  },
  {
    name: "H200",
    vram: "141GB",
    price: "$2.28/hr",
    useCase: "LLM & Distributed Training",
  },
  {
    name: "B200",
    vram: "180GB",
    price: "$3.38/hr",
    useCase: "Frontier Model Training",
  },
];

const comparisonPoints = [
  { feature: "Cold Start Time", serverless: "< 1 second", traditional: "30-120 seconds" },
  { feature: "Scaling", serverless: "Automatic", traditional: "Manual configuration" },
  { feature: "Minimum Cost", serverless: "$0", traditional: "$100+/month" },
  { feature: "Management", serverless: "Fully managed", traditional: "Self-managed" },
  { feature: "Billing", serverless: "Per-second", traditional: "Per-hour" },
];

export default function ServerlessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm mb-6">
            <Zap className="h-4 w-4 mr-2" />
            New: Serverless GPU now supports H200 and B200
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Serverless GPU
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Run GPU workloads without managing infrastructure. Scale to zero, 
            scale to thousands. Pay only for what you use.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              Read the Docs
            </Link>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="font-semibold mb-2">Deploy Your Code</h3>
            <p className="text-muted-foreground">
              Push your container or Python function. We handle the rest.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="font-semibold mb-2">Configure Scaling</h3>
            <p className="text-muted-foreground">
              Set min/max replicas, concurrency limits, and scaling triggers.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="font-semibold mb-2">Start Processing</h3>
            <p className="text-muted-foreground">
              Send requests via API. We scale automatically based on load.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Serverless GPU?</h2>
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
                <Icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-12 text-center">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <h3 className="font-semibold mb-2">{useCase.title}</h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GPU Options */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Available GPUs</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Choose the right GPU for your workload. All GPUs available on-demand.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gpuOptions.map((gpu, index) => (
            <motion.div
              key={gpu.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card text-center"
            >
              <Cpu className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-1">{gpu.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{gpu.vram} VRAM</p>
              <p className="text-2xl font-bold text-success-foreground mb-2">{gpu.price}</p>
              <p className="text-xs text-muted-foreground">{gpu.useCase}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-12 text-center">Serverless vs Traditional</h2>
        <div className="rounded-xl border border-border overflow-hidden max-w-3xl mx-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left font-semibold">Feature</th>
                <th className="px-6 py-4 text-left font-semibold text-primary">Serverless GPU</th>
                <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Traditional</th>
              </tr>
            </thead>
            <tbody>
              {comparisonPoints.map((point, index) => (
                <tr key={point.feature} className="border-b border-border last:border-0">
                  <td className="px-6 py-4">{point.feature}</td>
                  <td className="px-6 py-4 text-success-foreground">{point.serverless}</td>
                  <td className="px-6 py-4 text-muted-foreground">{point.traditional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Example */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Simple API</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Deploy and invoke GPU functions with just a few lines of code
        </p>
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl bg-muted p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-muted-foreground">
{`from lumin import serverless

@serverless.function(gpu="rtx-4090")
def predict(image_url: str):
    # Your inference code here
    model = load_model()
    result = model.predict(image_url)
    return result

# Deploy with one command
# lumin deploy predict.py`}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start building with Serverless GPU</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get $100 free credits. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get Started Free
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              View Pricing
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
