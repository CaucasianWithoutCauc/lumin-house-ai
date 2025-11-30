"use client";

import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { 
  CheckCircle2, Zap, Globe2, ShieldCheck, Server, ArrowRight, 
  Cpu, HardDrive, Gauge, Cloud, Database, Monitor, 
  ChevronRight, Star, Users, Clock, MapPin, AlertTriangle,
  Wallet, Building2, Award, Timer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Product category tabs
const categories = [
  { id: "gpu", name: "Cloud GPU", icon: Cpu },
  { id: "compute", name: "Cloud Compute", icon: Server },
  { id: "bare-metal", name: "Bare Metal", icon: HardDrive },
  { id: "storage", name: "Storage", icon: Database },
];

// GPU inventory data with stock counts for urgency
const gpuInventory = [
  {
    id: "rtx-4090-24gb",
    name: "RTX 4090 24GB",
    vram: "24GB GDDR6X",
    cpu: "2× Intel Xeon Gold 6330/6530",
    memory: "512GB DDR5",
    storage: "3.84TB NVMe × 2",
    network: "25 GbE dual-port",
    gpuCount: 8,
    hourlyPrice: 0.20,
    monthlyPrice: 144,
    spotPrice: 0.06, // 70% discount for spot instances
    status: "Available",
    stockCount: 12,
    popular: true,
    configs: ["Config A", "Config B"],
    deploymentType: ["bare-metal", "docker"],
    // New detailed product info
    tagline: "Cost-Effective AI Training",
    description: "Perfect for startups and researchers. The RTX 4090 delivers exceptional performance for fine-tuning LLMs, image generation, and development workloads at an unbeatable price point.",
    useCases: ["Fine-tuning LLMs", "Stable Diffusion", "Development & Testing"],
    architecture: "Ada Lovelace",
    tensorCores: 512,
    cudaCores: 16384,
    memoryBandwidth: "1008 GB/s",
    interconnect: "PCIe Gen 4 x16",
    tdp: "450W",
    formFactor: "4U Server Chassis",
  },
  {
    id: "rtx-4090-48gb",
    name: "RTX 4090 48GB",
    vram: "48GB GDDR6X",
    cpu: "2× Intel Xeon Gold 8570/6530",
    memory: "512GB DDR5-5600",
    storage: "3.84TB NVMe",
    network: "25 GbE dual-port × 2",
    gpuCount: 8,
    hourlyPrice: 0.29,
    monthlyPrice: 209,
    spotPrice: 0.09,
    status: "Available",
    stockCount: 8,
    popular: false,
    configs: ["Config C", "Config D"],
    deploymentType: ["bare-metal", "docker"],
    // New detailed product info
    tagline: "Extended Memory for Large Models",
    description: "Double the VRAM for larger batch sizes and bigger models. Ideal for training medium-sized transformers and running inference on 30B+ parameter models.",
    useCases: ["30B+ Model Inference", "Large Batch Training", "Multi-Model Serving"],
    architecture: "Ada Lovelace (Enhanced)",
    tensorCores: 512,
    cudaCores: 16384,
    memoryBandwidth: "1008 GB/s",
    interconnect: "PCIe Gen 4 x16",
    tdp: "500W",
    formFactor: "4U Server Chassis",
  },
  {
    id: "rtx-5090-32gb",
    name: "RTX 5090 32GB",
    vram: "32GB GDDR7",
    cpu: "2× Intel Xeon Gold 6530 (32C/64T)",
    memory: "1TB DDR5-4800",
    storage: "3.84TB NVMe U.2 × 2",
    network: "25 GbE × 2 + 100 GbE RDMA",
    gpuCount: 8,
    hourlyPrice: 0.34,
    monthlyPrice: 245,
    spotPrice: 0.10,
    status: "Available",
    stockCount: 5,
    popular: true,
    configs: ["Config E", "Config F"],
    deploymentType: ["bare-metal", "docker"],
    // New detailed product info
    tagline: "Next-Gen Architecture",
    description: "Featuring NVIDIA's latest Blackwell architecture with GDDR7 memory. 2x faster than RTX 4090 for AI workloads with improved power efficiency.",
    useCases: ["Real-time Inference", "Video AI", "Next-Gen Model Training"],
    architecture: "Blackwell",
    tensorCores: 680,
    cudaCores: 21760,
    memoryBandwidth: "1792 GB/s",
    interconnect: "PCIe Gen 5 x16",
    tdp: "575W",
    formFactor: "4U Server Chassis",
  },
  {
    id: "h100-80gb",
    name: "NVIDIA H100 80GB",
    vram: "80GB HBM3",
    cpu: "2× Intel 8558/8468 (48C)",
    memory: "2TB DDR5-5600",
    storage: "7.68TB NVMe × 2-4",
    network: "400 GbE × 8 + 200 GbE IB",
    gpuCount: 8,
    hourlyPrice: 1.84,
    monthlyPrice: 1325,
    spotPrice: 0.55,
    status: "Available",
    stockCount: 6,
    popular: true,
    configs: ["Config G", "Config H"],
    deploymentType: ["bare-metal", "docker"],
    // New detailed product info
    tagline: "Industry Standard for LLM Training",
    description: "The gold standard for enterprise AI. H100 delivers breakthrough performance for training foundation models, with NVLink for multi-GPU scaling.",
    useCases: ["Foundation Model Training", "Enterprise AI", "Multi-Node Distributed Training"],
    architecture: "Hopper",
    tensorCores: 640,
    cudaCores: 16896,
    memoryBandwidth: "3350 GB/s",
    interconnect: "NVLink 4.0 (900 GB/s)",
    tdp: "700W",
    formFactor: "8-GPU DGX-style Cluster",
  },
  {
    id: "h200-141gb",
    name: "NVIDIA H200 141GB",
    vram: "141GB HBM3e",
    cpu: "2× Intel Xeon Platinum 8558/8468",
    memory: "2TB DDR5",
    storage: "3.84TB U.2 NVMe × 4",
    network: "400 GbE/NDR × 8 + 200 GbE",
    gpuCount: 8,
    hourlyPrice: 2.28,
    monthlyPrice: 1642,
    spotPrice: 0.68,
    status: "Low Stock",
    stockCount: 2,
    popular: false,
    configs: ["Config I", "Config J"],
    deploymentType: ["bare-metal", "docker"],
    // New detailed product info
    tagline: "Maximum Memory for Largest Models",
    description: "76% more HBM memory than H100 with faster HBM3e. Train 70B+ models with larger batch sizes and run inference on 180B+ parameter models.",
    useCases: ["70B+ Model Training", "180B+ Inference", "Research & Development"],
    architecture: "Hopper (Enhanced)",
    tensorCores: 640,
    cudaCores: 16896,
    memoryBandwidth: "4800 GB/s",
    interconnect: "NVLink 4.0 (900 GB/s)",
    tdp: "700W",
    formFactor: "8-GPU DGX-style Cluster",
  },
  {
    id: "b200-180gb",
    name: "NVIDIA B200 180GB",
    vram: "180GB HBM3e",
    cpu: "2× Intel 6960P (72C, 2.7GHz)",
    memory: "2.25TB DDR5-6400",
    storage: "7.68TB NVMe × 8",
    network: "400 GbE × 8",
    gpuCount: 8,
    hourlyPrice: 3.38,
    monthlyPrice: 2434,
    spotPrice: 1.01,
    status: "Low Stock",
    stockCount: 1,
    popular: true,
    configs: ["Config K"],
    deploymentType: ["bare-metal"],
    // New detailed product info
    tagline: "The Ultimate AI Supercomputer",
    description: "NVIDIA's flagship Blackwell GPU. 5x faster than H100 for LLM inference with revolutionary second-generation Transformer Engine and 180GB of HBM3e memory.",
    useCases: ["Frontier Model Training", "Real-time LLM Inference", "AGI Research"],
    architecture: "Blackwell",
    tensorCores: 896,
    cudaCores: 20480,
    memoryBandwidth: "8000 GB/s",
    interconnect: "NVLink 5.0 (1800 GB/s)",
    tdp: "1000W",
    formFactor: "GB200 NVL72 SuperPod",
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

// Regions data with availability status for FOMO effect
const regions = [
  { id: "apac-hk", name: "Hong Kong", flag: "🇭🇰", latency: "12ms", availability: "High", nodesAvailable: 24 },
  { id: "apac-sg", name: "Singapore", flag: "🇸🇬", latency: "18ms", availability: "High", nodesAvailable: 18 },
  { id: "apac-jp", name: "Tokyo", flag: "🇯🇵", latency: "25ms", availability: "Medium", nodesAvailable: 8 },
  { id: "na-sfo", name: "San Francisco", flag: "🇺🇸", latency: "120ms", availability: "Limited", nodesAvailable: 3 },
  { id: "eu-fra", name: "Frankfurt", flag: "🇩🇪", latency: "180ms", availability: "High", nodesAvailable: 15 },
  { id: "eu-lon", name: "London", flag: "🇬🇧", latency: "195ms", availability: "Medium", nodesAvailable: 6 },
];

// Hardware showcase images for each category
const hardwareShowcase = {
  gpu: {
    title: "High-Performance GPU Clusters",
    subtitle: "NVIDIA H100/H200/B200 & RTX 4090/5090",
    description: "Enterprise-grade GPU servers with NVLink interconnect, optimized for AI/ML training and inference workloads.",
    gradient: "from-purple-500/30 via-pink-500/20 to-transparent",
  },
  compute: {
    title: "Cloud Compute Instances",
    subtitle: "High-Frequency AMD EPYC & Intel Xeon",
    description: "Scalable virtual machines with NVMe storage and dedicated bandwidth for general computing workloads.",
    gradient: "from-blue-500/30 via-cyan-500/20 to-transparent",
  },
  "bare-metal": {
    title: "Bare Metal Servers",
    subtitle: "Dedicated Physical Hardware",
    description: "Single-tenant servers with full hardware access, perfect for workloads requiring maximum isolation and performance.",
    gradient: "from-orange-500/30 via-amber-500/20 to-transparent",
  },
  storage: {
    title: "High-Speed Storage",
    subtitle: "NVMe Block & S3-Compatible Object Storage",
    description: "Persistent storage solutions with sub-millisecond latency and multi-region replication options.",
    gradient: "from-green-500/30 via-emerald-500/20 to-transparent",
  },
};

// GPU specs for visual performance bars
const gpuSpecs = {
  "rtx-4090-24gb": { vramGB: 24, maxVram: 180, bandwidth: 1008, maxBandwidth: 8000, tier: "Consumer" },
  "rtx-4090-48gb": { vramGB: 48, maxVram: 180, bandwidth: 1008, maxBandwidth: 8000, tier: "Consumer" },
  "rtx-5090-32gb": { vramGB: 32, maxVram: 180, bandwidth: 1792, maxBandwidth: 8000, tier: "Consumer" },
  "h100-80gb": { vramGB: 80, maxVram: 180, bandwidth: 3350, maxBandwidth: 8000, tier: "Enterprise" },
  "h200-141gb": { vramGB: 141, maxVram: 180, bandwidth: 4800, maxBandwidth: 8000, tier: "Enterprise" },
  "b200-180gb": { vramGB: 180, maxVram: 180, bandwidth: 8000, maxBandwidth: 8000, tier: "Flagship" },
};

// Statistics with SLA guarantees
const stats = [
  { value: "99.99%", label: "Uptime SLA", icon: Award },
  { value: "32+", label: "Data Centers", icon: Building2 },
  { value: "<60s", label: "Deploy Time", icon: Timer },
  { value: "24/7", label: "Support", icon: Clock },
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

// Availability styling helper for regions
const getAvailabilityStyles = (availability: string) => {
  const styles = {
    High: { bg: "bg-success/20", text: "text-success-foreground", dot: "bg-success-foreground", label: "High Availability" },
    Medium: { bg: "bg-warning/20", text: "text-warning-foreground", dot: "bg-warning-foreground", label: "Medium Availability" },
    Limited: { bg: "bg-destructive/20", text: "text-destructive", dot: "bg-destructive", label: "Limited Stock" },
  };
  return styles[availability as keyof typeof styles] || styles.High;
};

// Performance bar component
const PerformanceBar = ({ value, max, label, color = "primary" }: { value: number; max: number; label: string; color?: string }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}{label === "VRAM" ? "GB" : "GB/s"}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className={`h-full rounded-full ${color === "primary" ? "bg-primary" : "bg-gradient-to-r from-primary to-pink-500"}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// GPU Product Detail Showcase Component (like Crusoe's hardware showcase)
const GPUProductShowcase = ({ gpu, onClose }: { gpu: typeof gpuInventory[0] | null; onClose: () => void }) => {
  if (!gpu) return null;
  
  const specs = gpuSpecs[gpu.id as keyof typeof gpuSpecs];
  const isEnterprise = gpu.id.includes("h100") || gpu.id.includes("h200") || gpu.id.includes("b200");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* GPU Visual */}
          <div className="lg:w-1/3 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[280px] aspect-square">
              {/* Animated GPU visualization */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-card to-muted overflow-hidden"
                animate={{ 
                  boxShadow: ["0 0 30px rgba(139,92,246,0.3)", "0 0 60px rgba(139,92,246,0.5)", "0 0 30px rgba(139,92,246,0.3)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* GPU Circuit Board Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  <div className="absolute top-4 bottom-4 left-4 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
                  <div className="absolute top-4 bottom-4 right-4 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
                </div>
                
                {/* Central GPU Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-8 border border-primary/20 rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-12 border border-primary/10 rounded-full"
                    />
                    <Cpu className={`h-20 w-20 ${isEnterprise ? 'text-primary' : 'text-green-500'}`} />
                  </div>
                </div>
                
                {/* Floating data points */}
                <motion.div 
                  className="absolute top-6 right-6 px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {gpu.vram}
                </motion.div>
                <motion.div 
                  className="absolute bottom-6 left-6 px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  {gpu.architecture}
                </motion.div>
                
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary/50" />
              </motion.div>
              
              {/* Tier badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  specs?.tier === "Flagship" ? "bg-gradient-to-r from-primary to-pink-500 text-white" :
                  specs?.tier === "Enterprise" ? "bg-primary text-primary-foreground" :
                  "bg-green-500/20 text-green-500"
                }`}>
                  {specs?.tier || "Consumer"} GPU
                </span>
              </div>
            </div>
            
            {/* Form Factor */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">Form Factor</p>
              <p className="text-sm font-medium">{gpu.formFactor}</p>
            </div>
          </div>
          
          {/* GPU Details */}
          <div className="lg:w-2/3">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold">{gpu.name}</h3>
                  {gpu.status === "Low Stock" && (
                    <span className="px-2 py-0.5 rounded-full bg-warning/20 text-warning-foreground text-xs font-medium animate-pulse">
                      Low Stock
                    </span>
                  )}
                </div>
                <p className="text-primary font-medium">{gpu.tagline}</p>
              </div>
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-muted-foreground mb-6">{gpu.description}</p>
            
            {/* Use Cases */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Best For:</p>
              <div className="flex flex-wrap gap-2">
                {gpu.useCases?.map((useCase) => (
                  <span key={useCase} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">VRAM</p>
                <p className="text-lg font-bold text-primary">{gpu.vram}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">Tensor Cores</p>
                <p className="text-lg font-bold">{gpu.tensorCores}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">Memory BW</p>
                <p className="text-lg font-bold">{gpu.memoryBandwidth}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">TDP</p>
                <p className="text-lg font-bold">{gpu.tdp}</p>
              </div>
            </div>
            
            {/* Performance Bars */}
            {specs && (
              <div className="mb-6 p-4 rounded-lg bg-muted/30 space-y-3">
                <p className="text-sm font-medium mb-2">Performance Comparison</p>
                <PerformanceBar 
                  value={specs.vramGB} 
                  max={specs.maxVram} 
                  label="VRAM" 
                  color={specs.tier === "Flagship" ? "gradient" : "primary"}
                />
                <PerformanceBar 
                  value={specs.bandwidth} 
                  max={specs.maxBandwidth} 
                  label="Bandwidth" 
                  color={specs.tier === "Flagship" ? "gradient" : "primary"}
                />
              </div>
            )}
            
            {/* Additional Specs */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Architecture</span>
                <span className="font-medium">{gpu.architecture}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CUDA Cores</span>
                <span className="font-medium">{gpu.cudaCores?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interconnect</span>
                <span className="font-medium">{gpu.interconnect}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GPUs per Node</span>
                <span className="font-medium">{gpu.gpuCount}× GPU</span>
              </div>
            </div>
            
            {/* Pricing CTA */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">${gpu.hourlyPrice.toFixed(2)}</span>
                  <span className="text-muted-foreground">/GPU/hr</span>
                </div>
              </div>
              <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">
                Deploy Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("gpu");
  const [billingCycle, setBillingCycle] = useState<"hourly" | "monthly" | "spot">("hourly");
  const [selectedRegion, setSelectedRegion] = useState("apac-hk");
  const [selectedGpu, setSelectedGpu] = useState<typeof gpuInventory[0] | null>(null);

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
            New: RTX 5090 & NVIDIA B200 clusters now available
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
              {stat.icon && <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />}
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Infrastructure Trust Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="p-6 rounded-xl border border-border bg-gradient-to-r from-card to-muted/30">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Enterprise-Grade Infrastructure
              </h3>
              <p className="text-muted-foreground mb-4">
                Our data centers feature Tier-3 reliability with redundant power, cooling, and network connectivity. 
                Every GPU server is monitored 24/7 with automated failover systems.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                  <span>SOC 2 Type II Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                  <span>99.99% SLA Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                  <span>End-to-End Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                  <span>Dedicated VPC Options</span>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Hong Kong DC", status: "Operational" },
                  { label: "Singapore DC", status: "Operational" },
                  { label: "Tokyo DC", status: "Operational" },
                  { label: "SF DC", status: "Operational" },
                ].map((dc) => (
                  <div key={dc.label} className="px-3 py-2 rounded-lg bg-card border border-border text-center">
                    <p className="text-xs text-muted-foreground">{dc.label}</p>
                    <p className="text-xs font-medium text-success-foreground flex items-center justify-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-success-foreground animate-pulse" />
                      {dc.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Choose Your Infrastructure</h2>
        
        {/* Hardware Showcase - Dynamic Preview Window */}
        <motion.div 
          className="mb-8 rounded-2xl border border-border bg-gradient-to-r overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${hardwareShowcase[activeCategory as keyof typeof hardwareShowcase].gradient} pointer-events-none`} />
          <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
            {/* Hardware Visual */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                {/* Animated GPU/Server Visualization */}
                <motion.div 
                  className="absolute inset-0 rounded-xl border-2 border-primary/30 bg-card/50 backdrop-blur flex items-center justify-center overflow-hidden"
                  animate={{ 
                    boxShadow: ["0 0 20px rgba(139,92,246,0.3)", "0 0 40px rgba(139,92,246,0.5)", "0 0 20px rgba(139,92,246,0.3)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Inner glow lines */}
                  <div className="absolute inset-4 border border-primary/20 rounded-lg" />
                  <div className="absolute inset-8 border border-primary/10 rounded-md" />
                  
                  {/* Category Icon */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      {activeCategory === "gpu" && (
                        <Cpu className="h-16 w-16 sm:h-24 sm:w-24 text-primary mx-auto mb-2" />
                      )}
                      {activeCategory === "compute" && (
                        <Server className="h-16 w-16 sm:h-24 sm:w-24 text-primary mx-auto mb-2" />
                      )}
                      {activeCategory === "bare-metal" && (
                        <HardDrive className="h-16 w-16 sm:h-24 sm:w-24 text-primary mx-auto mb-2" />
                      )}
                      {activeCategory === "storage" && (
                        <Database className="h-16 w-16 sm:h-24 sm:w-24 text-primary mx-auto mb-2" />
                      )}
                      <div className="text-xs text-primary font-medium animate-pulse">
                        {activeCategory === "gpu" ? "8× GPU Array" : 
                         activeCategory === "compute" ? "vCPU Cluster" :
                         activeCategory === "bare-metal" ? "Dedicated Server" : "Storage Array"}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Animated corner accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/50" />
                </motion.div>
                
                {/* Floating particles */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-primary/50"
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-pink-500/50"
                  animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
              </div>
            </div>
            
            {/* Hardware Info */}
            <div className="flex-1 text-center md:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    {hardwareShowcase[activeCategory as keyof typeof hardwareShowcase].title}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {hardwareShowcase[activeCategory as keyof typeof hardwareShowcase].subtitle}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {hardwareShowcase[activeCategory as keyof typeof hardwareShowcase].description}
                  </p>
                  {activeCategory === "gpu" && (
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">NVLink</span>
                      <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">PCIe Gen5</span>
                      <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">400GbE</span>
                      <span className="px-2 py-1 rounded-full bg-warning/20 text-warning-foreground text-xs font-medium">Hot 🔥</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        
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
            <button
              onClick={() => setBillingCycle("spot")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "spot"
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Spot
              <span className="ml-1 text-xs text-warning-foreground">70% off</span>
            </button>
          </div>
        </div>

        {/* Region Selector with Availability Status */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="flex items-center text-sm text-muted-foreground mr-2">
            <MapPin className="h-4 w-4 mr-1" />
            Region:
          </span>
          {regions.slice(0, 4).map((region) => {
            const availStyles = getAvailabilityStyles(region.availability);
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`relative inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedRegion === region.id
                    ? "bg-primary/20 text-primary border border-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 border border-transparent"
                }`}
              >
                {/* Availability indicator dot */}
                <span className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full ${availStyles.dot} ${region.availability === "High" ? "animate-pulse" : ""}`} />
                <span className="mr-1.5">{region.flag}</span>
                {region.name}
                <span className="ml-1.5 text-[10px] opacity-70">{region.latency}</span>
              </button>
            );
          })}
        </div>
        
        {/* Selected Region Status Card */}
        {selectedRegion && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            {(() => {
              const region = regions.find(r => r.id === selectedRegion);
              if (!region) return null;
              const availStyles = getAvailabilityStyles(region.availability);
              return (
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg border ${availStyles.bg} border-border`}>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${availStyles.dot} ${region.availability === "High" ? "animate-pulse" : ""}`} />
                    <span className={`text-sm font-medium ${availStyles.text}`}>{availStyles.label}</span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <span className="text-sm text-muted-foreground">
                    {region.nodesAvailable} nodes available
                  </span>
                  {region.nodesAvailable <= 5 && (
                    <>
                      <div className="w-px h-4 bg-border" />
                      <span className="text-xs text-warning-foreground font-medium animate-pulse">
                        🔥 High demand
                      </span>
                    </>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* GPU Product Showcase - Detailed view when a GPU is selected */}
        <AnimatePresence>
          {selectedGpu && activeCategory === "gpu" && (
            <GPUProductShowcase gpu={selectedGpu} onClose={() => setSelectedGpu(null)} />
          )}
        </AnimatePresence>

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
              {gpuInventory.map((gpu) => {
                const specs = gpuSpecs[gpu.id as keyof typeof gpuSpecs];
                const isSelected = selectedGpu?.id === gpu.id;
                return (
                <div
                  key={gpu.id}
                  onClick={() => setSelectedGpu(gpu)}
                  className={`relative rounded-xl border ${isSelected ? 'border-primary ring-2 ring-primary/50' : gpu.popular ? 'border-primary' : 'border-border'} bg-card p-5 sm:p-6 hover:border-primary/50 transition-all cursor-pointer group`}
                >
                  {/* Click to view hint */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-medium">
                      Click to view details
                    </span>
                  </div>
                  
                  {gpu.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </span>
                    </div>
                  )}
                  
                  {/* Tier Badge */}
                  {specs && (
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        specs.tier === "Flagship" ? "bg-gradient-to-r from-primary to-pink-500 text-white" :
                        specs.tier === "Enterprise" ? "bg-primary/20 text-primary" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {specs.tier}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4 pr-16">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">{gpu.name}</h3>
                      <p className="text-sm text-muted-foreground">{gpu.vram} × {gpu.gpuCount} GPUs</p>
                    </div>
                  </div>
                  
                  {/* Status Badges Row */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(gpu.status)}`}>
                      {gpu.status === "Available" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {gpu.status}
                    </span>
                    {gpu.stockCount <= 5 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-warning/20 text-warning-foreground">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Only {gpu.stockCount} left
                      </span>
                    )}
                  </div>
                  
                  {/* Performance Bars */}
                  {specs && (
                    <div className="mb-4 p-3 rounded-lg bg-muted/50 space-y-2">
                      <PerformanceBar 
                        value={specs.vramGB} 
                        max={specs.maxVram} 
                        label="VRAM" 
                        color={specs.tier === "Flagship" ? "gradient" : "primary"}
                      />
                      <PerformanceBar 
                        value={specs.bandwidth} 
                        max={specs.maxBandwidth} 
                        label="Bandwidth" 
                        color={specs.tier === "Flagship" ? "gradient" : "primary"}
                      />
                    </div>
                  )}

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="text-muted-foreground shrink-0">CPU</span>
                      <span className="font-medium text-right text-xs">{gpu.cpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Memory</span>
                      <span className="font-medium">{gpu.memory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-medium">{gpu.storage}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-muted-foreground shrink-0">Network</span>
                      <span className="font-medium text-right text-xs">{gpu.network}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {gpu.configs.map((config) => (
                      <span key={config} className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs">
                        {config}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-2xl sm:text-3xl font-bold text-success-foreground">
                          ${billingCycle === "hourly" ? gpu.hourlyPrice.toFixed(2) : billingCycle === "monthly" ? gpu.monthlyPrice : gpu.spotPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /{billingCycle === "hourly" ? "GPU/hr" : billingCycle === "monthly" ? "mo" : "GPU/hr"}
                        </span>
                        {billingCycle === "spot" && (
                          <span className="ml-2 text-xs line-through text-muted-foreground">
                            ${gpu.hourlyPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    {billingCycle === "spot" && (
                      <div className="mb-3 p-2 rounded-lg bg-warning/10 border border-warning/20">
                        <div className="flex items-center text-xs text-warning-foreground">
                          <Timer className="h-3 w-3 mr-1" />
                          Spot: May be reclaimed with 2-min notice
                        </div>
                      </div>
                    )}
                    <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4">
                      Deploy Now
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
                );
              })}
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/pricing" className="hover:text-foreground">Cloud GPU</a></li>
                <li><a href="/ai-studio" className="hover:text-foreground">AI Studio</a></li>
                <li><a href="/serverless" className="hover:text-foreground">Serverless GPU</a></li>
                <li><a href="/pricing" className="hover:text-foreground">Bare Metal</a></li>
                <li><a href="/pricing" className="hover:text-foreground">Storage</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/docs" className="hover:text-foreground">Documentation</a></li>
                <li><a href="/help-center" className="hover:text-foreground">Help Center</a></li>
                <li><a href="/faq" className="hover:text-foreground">FAQ</a></li>
                <li><a href="/blog" className="hover:text-foreground">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about" className="hover:text-foreground">About Us</a></li>
                <li><a href="/careers" className="hover:text-foreground">Careers</a></li>
                <li><a href="/partners" className="hover:text-foreground">Partners</a></li>
                <li><a href="/investor-relations" className="hover:text-foreground">Investors</a></li>
                <li><a href="/contact" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/support" className="hover:text-foreground">Contact Support</a></li>
                <li><a href="https://status.luminhouse.ai" className="hover:text-foreground">System Status</a></li>
                <li><a href="https://discord.gg/luminhouse" className="hover:text-foreground">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="/sla" className="hover:text-foreground">SLA</a></li>
                <li><a href="/security-compliance" className="hover:text-foreground">Security</a></li>
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
