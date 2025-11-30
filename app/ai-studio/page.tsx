"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Cpu, Code, Database, GitBranch, Play, Layers,
  Zap, ChevronRight, Check, ArrowRight, Terminal,
  Workflow, Bot, BarChart3
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Code,
    title: "Collaborative Notebooks",
    description: "Real-time collaborative Jupyter notebooks with GPU acceleration. Share, comment, and version your work.",
  },
  {
    icon: Workflow,
    title: "Experiment Tracking",
    description: "Automatic logging of parameters, metrics, and artifacts. Compare experiments and reproduce results.",
  },
  {
    icon: GitBranch,
    title: "Model Versioning",
    description: "Git-like version control for models and datasets. Branch, merge, and rollback with confidence.",
  },
  {
    icon: Play,
    title: "One-Click Deploy",
    description: "Deploy models to production with a single click. Auto-scaling inference endpoints with load balancing.",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "S3-compatible storage with dataset versioning. Mount data directly to notebooks and training jobs.",
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Build and deploy AI agents with our visual workflow builder. Chain models and tools together.",
  },
];

const frameworks = [
  { name: "PyTorch", icon: "🔥" },
  { name: "TensorFlow", icon: "📊" },
  { name: "JAX", icon: "⚡" },
  { name: "Hugging Face", icon: "🤗" },
  { name: "ONNX", icon: "🔷" },
  { name: "MPI", icon: "🔗" },
];

const useCases = [
  {
    title: "LLM Fine-tuning",
    description: "Fine-tune large language models like LLaMA, Mistral, and GPT on your custom datasets.",
    icon: Terminal,
  },
  {
    title: "Computer Vision",
    description: "Train and deploy image classification, object detection, and segmentation models.",
    icon: Layers,
  },
  {
    title: "Generative AI",
    description: "Build diffusion models, VAEs, and GANs for image, audio, and video generation.",
    icon: Zap,
  },
  {
    title: "Analytics & BI",
    description: "Run large-scale data processing and machine learning on structured data.",
    icon: BarChart3,
  },
];

const pricing = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for experimentation",
    features: [
      "5 hours GPU compute/month",
      "10GB storage",
      "Community notebooks",
      "Basic experiment tracking",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For serious ML practitioners",
    features: [
      "100 hours GPU compute/month",
      "100GB storage",
      "Private notebooks",
      "Advanced experiment tracking",
      "Model versioning",
      "API access",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$199",
    period: "/month",
    description: "For ML teams and startups",
    features: [
      "500 hours GPU compute/month",
      "1TB storage",
      "Team collaboration",
      "Custom environments",
      "Priority support",
      "SSO/SAML",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function AIStudioPage() {
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
            New: AI Agents now available in beta
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            AI Studio
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The all-in-one platform for building, training, and deploying AI models. 
            From notebooks to production in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              View Documentation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-12 text-center">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
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
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Frameworks */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Supported Frameworks</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Pre-configured environments with your favorite ML frameworks
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {frameworks.map((framework) => (
            <div
              key={framework.name}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card"
            >
              <span className="text-2xl">{framework.icon}</span>
              <span className="font-medium">{framework.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-12 text-center">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card text-center"
              >
                <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Simple Pricing</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Start free and scale as you grow. No hidden fees.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricing.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl border ${
                plan.highlighted
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs mb-4 inline-block">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-success-foreground mr-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`block text-center py-2 rounded-lg font-medium ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input hover:bg-accent"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to build with AI Studio?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start with 5 free GPU hours. No credit card required.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Started Free
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
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
