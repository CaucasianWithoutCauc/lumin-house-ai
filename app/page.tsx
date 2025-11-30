"use client";

import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { 
  CheckCircle2, Zap, Globe2, ShieldCheck, Server, ArrowRight, 
  Cpu, HardDrive, Gauge, Cloud, Database, Monitor, 
  ChevronRight, Star, Users, Clock, MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Product category tabs
const categories = [
  { id: "gpu", name: "Cloud GPU", icon: Cpu },
  { id: "compute", name: "Cloud Compute", icon: Server },
  { id: "bare-metal", name: "Bare Metal", icon: HardDrive },
  { id: "storage", name: "Storage", icon: Database },
];

// GPU inventory data
const gpuInventory = [
  {
    id: "h100-sxm5",
    name: "NVIDIA H100 SXM5",
    vram: "80GB HBM3",
    cores: "16,896 CUDA",
    memory: "512GB DDR5",
    storage: "3.84TB NVMe",
    bandwidth: "32TB/mo",
    hourlyPrice: 1.95,
    monthlyPrice: 1250,
    status: "Available",
    popular: true,
  },
  {
    id: "h800-sxm",
    name: "NVIDIA H800 SXM",
    vram: "80GB HBM3",
    cores: "16,896 CUDA",
    memory: "256GB DDR5",
    storage: "1.92TB NVMe",
    bandwidth: "20TB/mo",
    hourlyPrice: 1.65,
    monthlyPrice: 1050,
    status: "Low Stock",
    popular: false,
  },
  {
    id: "a100-80gb",
    name: "NVIDIA A100 80GB",
    vram: "80GB HBM2e",
    cores: "6,912 CUDA",
    memory: "256GB DDR4",
    storage: "1.92TB NVMe",
    bandwidth: "20TB/mo",
    hourlyPrice: 1.10,
    monthlyPrice: 700,
    status: "Available",
    popular: false,
  },
  {
    id: "rtx-4090",
    name: "RTX 4090 Cluster",
    vram: "24GB GDDR6X",
    cores: "16,384 CUDA",
    memory: "128GB DDR5",
    storage: "960GB NVMe",
    bandwidth: "10TB/mo",
    hourlyPrice: 0.35,
    monthlyPrice: 220,
    status: "Available",
    popular: true,
  },
  {
    id: "l40s",
    name: "NVIDIA L40S",
    vram: "48GB GDDR6",
    cores: "18,176 CUDA",
    memory: "128GB DDR5",
    storage: "960GB NVMe",
    bandwidth: "15TB/mo",
    hourlyPrice: 0.75,
    monthlyPrice: 480,
    status: "Available",
    popular: false,
  },
];

// Cloud Compute data
const computeInventory = [
  {
    id: "vc2-1c-1gb",
    name: "Regular Cloud",
    cpu: "1 vCPU",
    memory: "1GB",
    storage: "25GB SSD",
    bandwidth: "1TB/mo",
    hourlyPrice: 0.007,
    monthlyPrice: 5,
    type: "Regular",
  },
  {
    id: "vc2-2c-4gb",
    name: "Regular Cloud",
    cpu: "2 vCPU",
    memory: "4GB",
    storage: "80GB SSD",
    bandwidth: "3TB/mo",
    hourlyPrice: 0.030,
    monthlyPrice: 20,
    type: "Regular",
  },
  {
    id: "vhf-1c-2gb",
    name: "High Frequency",
    cpu: "1 vCPU (3GHz+)",
    memory: "2GB",
    storage: "64GB NVMe",
    bandwidth: "2TB/mo",
    hourlyPrice: 0.018,
    monthlyPrice: 12,
    type: "High Frequency",
  },
  {
    id: "vhp-2c-4gb",
    name: "High Performance",
    cpu: "2 AMD EPYC",
    memory: "4GB",
    storage: "80GB NVMe",
    bandwidth: "3TB/mo",
    hourlyPrice: 0.036,
    monthlyPrice: 24,
    type: "High Performance",
  },
];

// Regions data
const regions = [
  { id: "apac-hk", name: "Hong Kong", flag: "🇭🇰", latency: "12ms" },
  { id: "apac-sg", name: "Singapore", flag: "🇸🇬", latency: "18ms" },
  { id: "apac-jp", name: "Tokyo", flag: "🇯🇵", latency: "25ms" },
  { id: "na-sfo", name: "San Francisco", flag: "🇺🇸", latency: "120ms" },
  { id: "eu-fra", name: "Frankfurt", flag: "🇩🇪", latency: "180ms" },
  { id: "eu-lon", name: "London", flag: "🇬🇧", latency: "195ms" },
];

// Statistics
const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "32+", label: "Data Centers" },
  { value: "<60s", label: "Deploy Time" },
  { value: "24/7", label: "Support" },
];

// Testimonials
const testimonials = [
  {
    quote: "Lumin House AI has transformed how we train our models. The H100 availability is incredible.",
    author: "Sarah Chen",
    role: "ML Engineer at TechStartup",
    avatar: "SC",
  },
  {
    quote: "Best price-to-performance ratio in the market. We've cut our cloud costs by 40%.",
    author: "Mike Johnson",
    role: "CTO at DataFlow",
    avatar: "MJ",
  },
  {
    quote: "The instant deployment and global network make it perfect for our distributed training jobs.",
    author: "Dr. Emily Park",
    role: "Research Scientist",
    avatar: "EP",
  },
];

// Status styling helper
const getStatusStyles = (status: string) => {
  const styles = {
    Available: "bg-success/20 text-success-foreground",
    "Low Stock": "bg-warning/20 text-warning-foreground",
    "Out of Stock": "bg-destructive/20 text-destructive",
  };
  return styles[status as keyof typeof styles] || "bg-muted text-muted-foreground";
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("gpu");
  const [billingCycle, setBillingCycle] = useState<"hourly" | "monthly">("hourly");
  const [selectedRegion, setSelectedRegion] = useState("apac-hk");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm mb-4 sm:mb-6">
            <Zap className="h-4 w-4 mr-2" />
            New: H100 SXM5 clusters now available
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent leading-tight">
            Enterprise GPU Cloud
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Access high-performance NVIDIA GPUs for AI/ML workloads. 
            Deploy in seconds, scale without limits.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-6 sm:px-8 w-full sm:w-auto">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-6 sm:px-8 w-full sm:w-auto">
              View Documentation
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4 rounded-lg border border-border bg-card"
            >
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Tabs */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Choose Your Infrastructure</h2>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center p-1 rounded-lg bg-muted">
            <button
              onClick={() => setBillingCycle("hourly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "hourly"
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Hourly
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
              <span className="ml-1 text-xs text-success-foreground">Save 15%</span>
            </button>
          </div>
        </div>

        {/* Region Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="flex items-center text-sm text-muted-foreground mr-2">
            <MapPin className="h-4 w-4 mr-1" />
            Region:
          </span>
          {regions.slice(0, 4).map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedRegion === region.id
                  ? "bg-primary/20 text-primary border border-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 border border-transparent"
              }`}
            >
              <span className="mr-1.5">{region.flag}</span>
              {region.name}
              <span className="ml-1.5 text-[10px] opacity-70">{region.latency}</span>
            </button>
          ))}
        </div>

        {/* GPU Pricing Cards */}
        <AnimatePresence mode="wait">
          {activeCategory === "gpu" && (
            <motion.div
              key="gpu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {gpuInventory.map((gpu) => (
                <div
                  key={gpu.id}
                  className={`relative rounded-xl border ${gpu.popular ? 'border-primary' : 'border-border'} bg-card p-5 sm:p-6 hover:border-primary/50 transition-all`}
                >
                  {gpu.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">{gpu.name}</h3>
                      <p className="text-sm text-muted-foreground">{gpu.vram}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(gpu.status)}`}>
                      {gpu.status === "Available" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {gpu.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CUDA Cores</span>
                      <span className="font-medium">{gpu.cores}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Memory</span>
                      <span className="font-medium">{gpu.memory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-medium">{gpu.storage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bandwidth</span>
                      <span className="font-medium">{gpu.bandwidth}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-2xl sm:text-3xl font-bold text-success-foreground">
                          ${billingCycle === "hourly" ? gpu.hourlyPrice.toFixed(2) : gpu.monthlyPrice}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /{billingCycle === "hourly" ? "hr" : "mo"}
                        </span>
                      </div>
                    </div>
                    <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4">
                      Deploy Now
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeCategory === "compute" && (
            <motion.div
              key="compute"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {computeInventory.map((instance) => (
                <div
                  key={instance.id}
                  className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-all"
                >
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground mb-2">
                      {instance.type}
                    </span>
                    <h3 className="font-semibold">{instance.cpu}</h3>
                  </div>

                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Memory</span>
                      <span className="font-medium">{instance.memory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-medium">{instance.storage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bandwidth</span>
                      <span className="font-medium">{instance.bandwidth}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="text-center mb-4">
                      <span className="text-2xl font-bold text-success-foreground">
                        ${billingCycle === "hourly" ? instance.hourlyPrice.toFixed(3) : instance.monthlyPrice}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /{billingCycle === "hourly" ? "hr" : "mo"}
                      </span>
                    </div>
                    <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4">
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {(activeCategory === "bare-metal" || activeCategory === "storage") && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <Cloud className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground mb-4">
                {activeCategory === "bare-metal" 
                  ? "Bare metal servers with dedicated resources will be available soon."
                  : "Block and object storage solutions are in development."}
              </p>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6">
                Get Notified
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Why Choose Lumin House AI</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 sm:p-6 rounded-lg border border-border bg-card"
          >
            <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-primary mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">Instant Deploy</h3>
            <p className="text-sm text-muted-foreground">Spin up GPU instances in under 60 seconds with pre-configured ML environments.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-5 sm:p-6 rounded-lg border border-border bg-card"
          >
            <Globe2 className="h-8 w-8 sm:h-10 sm:w-10 text-primary mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">Global Network</h3>
            <p className="text-sm text-muted-foreground">32+ data centers across APAC, NA, and EU for optimal latency.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-5 sm:p-6 rounded-lg border border-border bg-card"
          >
            <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-primary mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">Enterprise Security</h3>
            <p className="text-sm text-muted-foreground">SOC 2 Type II certified with dedicated VPCs and end-to-end encryption.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-5 sm:p-6 rounded-lg border border-border bg-card"
          >
            <Gauge className="h-8 w-8 sm:h-10 sm:w-10 text-primary mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">Pay As You Go</h3>
            <p className="text-sm text-muted-foreground">Per-second billing with no long-term commitments. Only pay for what you use.</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Trusted by ML Engineers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg border border-border bg-card"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to accelerate your AI workloads?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get started with $100 free credits. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Cloud GPU</a></li>
                <li><a href="#" className="hover:text-foreground">Cloud Compute</a></li>
                <li><a href="#" className="hover:text-foreground">Bare Metal</a></li>
                <li><a href="#" className="hover:text-foreground">Storage</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground">Tutorials</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">SLA</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border">
            <div className="flex items-center mb-4 sm:mb-0">
              <Zap className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold">Lumin House AI</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Lumin House AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
