"use client";

import { Navbar } from "@/components/Navbar";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { 
  CheckCircle2, Zap, Globe2, ShieldCheck, Server, ArrowRight, 
  Cpu, HardDrive, Gauge, Cloud, Database, Monitor, 
  ChevronRight, Star, Users, Clock, MapPin, AlertTriangle,
  Wallet, Building2, Award, Timer, Play, ChevronLeft, Sparkles, X
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

// ==========================================
// KINETIC TYPOGRAPHY COMPONENTS
// ==========================================

// Kinetic Text - Word-by-word reveal animation with overshoot
const KineticText = ({ 
  children, 
  className = "",
  delay = 0,
  stagger = 0.08,
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = children.split(" ");
  
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 80, opacity: 0, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 12,
            delay: delay + i * stagger,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Marquee Text - Horizontal scroll animation
const MarqueeText = ({ 
  text, 
  speed = 25,
  className = "",
  reverse = false
}: {
  text: string;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    reverse ? [`-${speed}%`, `${speed}%`] : [`${speed}%`, `-${speed}%`]
  );
  
  return (
    <div ref={ref} className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className={className}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-block mx-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Stretch Text - Text that subtly stretches on scroll
const StretchText = ({ 
  children, 
  className = "" 
}: { 
  children: string; 
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);
  
  return (
    <motion.span
      ref={ref}
      style={{ scaleX, display: "inline-block", transformOrigin: "left" }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

// Character Reveal - Letter by letter animation
const CharReveal = ({ 
  children, 
  className = "",
  delay = 0
}: { 
  children: string; 
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const chars = children.split("");
  
  return (
    <span ref={ref} className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.02,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
        >
          {/* Use non-breaking space for spaces to preserve character animation spacing */}
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Parallax Title - Section title with parallax effect
const ParallaxTitle = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  
  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ScrollReveal - Advanced scroll-triggered reveal with scale and blur
const ScrollReveal = ({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ScaleOnScroll - Element that scales based on scroll progress
const ScaleOnScroll = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.5]);
  
  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// END KINETIC TYPOGRAPHY COMPONENTS
// ==========================================

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
    // GPU Image
    imageUrl: "https://images.nvidia.com/aem-dam/Solutions/geforce/ada/news/geforce-rtx-4090-gpu-reveal/geforce-rtx-4090-announce-article-og.jpg",
    imageAlt: "NVIDIA GeForce RTX 4090 Graphics Card",
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
    // GPU Image - different angle to distinguish from 24GB variant
    imageUrl: "https://images.nvidia.com/aem-dam/Solutions/geforce/ada/news/geforce-rtx-4090-gpu-reveal/geforce-rtx-4090-top-down-view.jpg",
    imageAlt: "NVIDIA GeForce RTX 4090 48GB Extended Memory Graphics Card",
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
    // GPU Image
    imageUrl: "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/geforce-rtx-5090/geforce-rtx-5090-product-tile-og-1200x630.jpg",
    imageAlt: "NVIDIA GeForce RTX 5090 Next-Gen Blackwell GPU",
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
    // GPU Image
    imageUrl: "https://images.nvidia.com/aem-dam/Solutions/Data-Center/h100/nvidia-h100-sxm-702-p@2x.jpg",
    imageAlt: "NVIDIA H100 Tensor Core GPU - The Gold Standard for AI",
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
    // GPU Image
    imageUrl: "https://images.nvidia.com/aem-dam/Solutions/Data-Center/h200/nvidia-h200-nvl-702-p@2x.jpg",
    imageAlt: "NVIDIA H200 Tensor Core GPU with 141GB HBM3e Memory",
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
    // GPU Image
    imageUrl: "https://images.nvidia.com/aem-dam/Solutions/Data-Center/blackwell/nvidia-blackwell-702-p@2x.jpg",
    imageAlt: "NVIDIA B200 Blackwell GPU - The Ultimate AI Supercomputer",
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

// Trust badges for credibility - Fintech-style
const trustBadges = [
  { label: "SOC 2 Type II", icon: ShieldCheck },
  { label: "99.99% SLA", icon: Award },
  { label: "Tier-3+ DCs", icon: Server },
  { label: "GDPR Ready", icon: Globe2 },
];

// Testimonials - Extended for carousel
const testimonials = [
  {
    quote: "Lumin House AI has transformed how we train our models. The H100 availability is incredible.",
    author: "Sarah Chen",
    role: "ML Engineer at TechStartup",
    avatar: "SC",
    company: "TechStartup",
  },
  {
    quote: "Best price-to-performance ratio in the market. We've cut our cloud costs by 40%.",
    author: "Mike Johnson",
    role: "CTO at DataFlow",
    avatar: "MJ",
    company: "DataFlow",
  },
  {
    quote: "The instant deployment and global network make it perfect for our distributed training jobs.",
    author: "Dr. Emily Park",
    role: "Research Scientist",
    avatar: "EP",
    company: "MIT AI Lab",
  },
  {
    quote: "Switching from AWS to Lumin saved us $2M annually. The performance is even better.",
    author: "James Wilson",
    role: "VP of Engineering",
    avatar: "JW",
    company: "ScaleAI",
  },
  {
    quote: "The B200 SuperPods helped us train our 70B model 3x faster than expected.",
    author: "Dr. Lisa Zhang",
    role: "Chief Scientist",
    avatar: "LZ",
    company: "Anthropic",
  },
  {
    quote: "24/7 support and 99.99% uptime. Exactly what enterprise AI needs.",
    author: "Robert Kim",
    role: "Director of MLOps",
    avatar: "RK",
    company: "Uber AI",
  },
];

// Hero slides for carousel with real datacenter & GPU images
const heroSlides = [
  {
    title: "Deploy GPU Clusters in 60 Seconds",
    subtitle: "No more waiting weeks for cloud quotas",
    gradient: "from-purple-900/60 to-slate-900/80",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Modern data center with server racks",
  },
  {
    title: "Powered by NVIDIA H100 & B200",
    subtitle: "Latest-generation GPUs for enterprise AI workloads",
    gradient: "from-purple-900/60 to-slate-900/80",
    image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "High-performance computing server hardware",
  },
  {
    title: "99.99% Uptime Guaranteed",
    subtitle: "Tier-3+ certified data centers with redundant infrastructure",
    gradient: "from-purple-900/60 to-slate-900/80",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Data center infrastructure with blue lighting",
  },
  {
    title: "Global Edge Locations",
    subtitle: "32+ data centers across APAC, NA, and EU",
    gradient: "from-purple-900/60 to-slate-900/80",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Server room with network cables",
  },
  {
    title: "Save 40% vs AWS & GCP",
    subtitle: "Enterprise performance at startup-friendly prices",
    gradient: "from-purple-900/60 to-slate-900/80",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "GPU computing hardware closeup",
  },
];

// Infrastructure showcase images for carousel
const infrastructureImages = [
  {
    id: "dc-1",
    title: "Hong Kong Data Center",
    description: "Tier-3+ certified facility with 99.99% uptime",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Data center interior with server racks",
  },
  {
    id: "dc-2",
    title: "NVIDIA GPU Cluster",
    description: "8x NVIDIA H100 SXM5 per node with NVLink interconnect",
    image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "High-performance GPU computing hardware",
  },
  {
    id: "dc-3",
    title: "Singapore Data Center",
    description: "APAC hub with <15ms latency to major markets",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Modern data center with blue lighting",
  },
  {
    id: "dc-4",
    title: "Enterprise GPU Hardware",
    description: "Next-gen architecture with 180GB HBM3e memory",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "GPU computing hardware",
  },
  {
    id: "dc-5",
    title: "Tokyo Data Center",
    description: "Japan's premier AI infrastructure hub",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Server room infrastructure",
  },
  {
    id: "dc-6",
    title: "High-Performance Computing",
    description: "80GB HBM3 memory with 3.35TB/s bandwidth for LLM training",
    image: "https://images.unsplash.com/photo-1560732488-6b0df240254a?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Computer server hardware closeup",
  },
];

// Customer logos for social proof
const customerLogos = [
  { name: "OpenAI", logo: "🤖" },
  { name: "Meta AI", logo: "Ⓜ️" },
  { name: "Anthropic", logo: "🅰️" },
  { name: "Midjourney", logo: "🎨" },
  { name: "Stability AI", logo: "⚡" },
  { name: "Hugging Face", logo: "🤗" },
  { name: "Cohere", logo: "💬" },
  { name: "Replicate", logo: "🔄" },
];

// Data center locations for world map
const dataCenterLocations = [
  { id: "hk", name: "Hong Kong", region: "APAC", lat: 22.3, lng: 114.2, status: "operational", gpuCount: 1200 },
  { id: "sg", name: "Singapore", region: "APAC", lat: 1.35, lng: 103.8, status: "operational", gpuCount: 800 },
  { id: "jp", name: "Tokyo", region: "APAC", lat: 35.7, lng: 139.7, status: "operational", gpuCount: 600 },
  { id: "kr", name: "Seoul", region: "APAC", lat: 37.6, lng: 127.0, status: "operational", gpuCount: 400 },
  { id: "sf", name: "San Francisco", region: "NA", lat: 37.8, lng: -122.4, status: "operational", gpuCount: 1500 },
  { id: "ny", name: "New York", region: "NA", lat: 40.7, lng: -74.0, status: "operational", gpuCount: 1000 },
  { id: "chi", name: "Chicago", region: "NA", lat: 41.9, lng: -87.6, status: "operational", gpuCount: 500 },
  { id: "fra", name: "Frankfurt", region: "EU", lat: 50.1, lng: 8.7, status: "operational", gpuCount: 900 },
  { id: "lon", name: "London", region: "EU", lat: 51.5, lng: -0.1, status: "operational", gpuCount: 700 },
  { id: "ams", name: "Amsterdam", region: "EU", lat: 52.4, lng: 4.9, status: "operational", gpuCount: 400 },
];

// API code examples
const codeExamples = {
  python: `from luminhouse import Client

# Initialize the client
client = Client(api_key="your-api-key")

# Deploy a GPU instance
instance = client.instances.create(
    gpu_type="h100",
    gpu_count=8,
    region="apac-hk"
)

# Start training
instance.run_command("python train.py")`,
  curl: `curl -X POST https://api.luminhouse.ai/v1/instances \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "gpu_type": "h100",
    "gpu_count": 8,
    "region": "apac-hk",
    "image": "pytorch/pytorch:2.0-cuda11.8"
  }'`,
  javascript: `import { LuminHouse } from '@luminhouse/sdk';

const client = new LuminHouse({ 
  apiKey: process.env.LUMINHOUSE_API_KEY 
});

// Deploy a GPU instance
const instance = await client.instances.create({
  gpuType: 'h100',
  gpuCount: 8,
  region: 'apac-hk'
});

console.log(\`Instance ready: \${instance.id}\`);`,
};

// GPU Comparison data
const gpuComparison = [
  { model: "RTX 4090", vram: "24GB", tensorCores: 512, memBandwidth: "1.0 TB/s", price: "$0.20/hr", tier: "Consumer" },
  { model: "RTX 5090", vram: "32GB", tensorCores: 680, memBandwidth: "1.8 TB/s", price: "$0.34/hr", tier: "Consumer" },
  { model: "H100", vram: "80GB", tensorCores: 640, memBandwidth: "3.4 TB/s", price: "$1.84/hr", tier: "Enterprise" },
  { model: "H200", vram: "141GB", tensorCores: 640, memBandwidth: "4.8 TB/s", price: "$2.28/hr", tier: "Enterprise" },
  { model: "B200", vram: "180GB", tensorCores: 896, memBandwidth: "8.0 TB/s", price: "$3.38/hr", tier: "Flagship" },
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
          {/* GPU Visual - Real Image */}
          <div className="lg:w-1/3 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[320px]">
              {/* GPU Image Container with glow effect */}
              <motion.div 
                className="relative rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-card to-muted overflow-hidden"
                animate={{ 
                  boxShadow: ["0 0 30px rgba(139,92,246,0.3)", "0 0 60px rgba(139,92,246,0.5)", "0 0 30px rgba(139,92,246,0.3)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Actual GPU Image */}
                <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-card to-muted">
                  <Image 
                    src={gpu.imageUrl}
                    alt={gpu.imageAlt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                  {/* Overlay gradient for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* VRAM badge on image */}
                  <motion.div 
                    className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-primary text-xs font-mono border border-primary/30"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    aria-label={`VRAM: ${gpu.vram}`}
                  >
                    {gpu.vram}
                  </motion.div>
                  
                  {/* Architecture badge on image */}
                  <motion.div 
                    className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-primary text-xs font-mono border border-primary/30"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    aria-label={`Architecture: ${gpu.architecture}`}
                  >
                    {gpu.architecture}
                  </motion.div>
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary/50" />
              </motion.div>
              
              {/* Tier badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
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
                aria-label="Close GPU details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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

// Pricing Calculator Component
const PricingCalculator = () => {
  const [calcGpu, setCalcGpu] = useState("h100-80gb");
  const [calcGpuCount, setCalcGpuCount] = useState(8);
  const [calcHours, setCalcHours] = useState(720); // Default to 1 month
  
  const selectedGpuData = gpuInventory.find(g => g.id === calcGpu);
  const hourlyRate = selectedGpuData?.hourlyPrice || 0;
  const totalCost = hourlyRate * calcGpuCount * calcHours;
  const monthlyCost = hourlyRate * calcGpuCount * 720;
  const savings = calcHours >= 720 ? totalCost * 0.15 : 0; // 15% discount for monthly
  
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Pricing Calculator</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Estimate your costs before you deploy. Pay only for what you use.
        </p>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">GPU Type</label>
              <select 
                value={calcGpu}
                onChange={(e) => setCalcGpu(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {gpuInventory.map((gpu) => (
                  <option key={gpu.id} value={gpu.id}>
                    {gpu.name} - ${gpu.hourlyPrice.toFixed(2)}/GPU/hr
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of GPUs: <span className="text-primary font-bold">{calcGpuCount}</span>
              </label>
              <input
                type="range"
                min="1"
                max="64"
                value={calcGpuCount}
                onChange={(e) => setCalcGpuCount(parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 GPU</span>
                <span>64 GPUs</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Usage Duration: <span className="text-primary font-bold">{calcHours} hours</span>
                {calcHours >= 720 && <span className="text-success-foreground ml-2">(Monthly discount applied!)</span>}
              </label>
              <input
                type="range"
                min="1"
                max="2160"
                value={calcHours}
                onChange={(e) => setCalcHours(parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 hour</span>
                <span>1 month (720h)</span>
                <span>3 months</span>
              </div>
            </div>
          </div>
          
          {/* Cost Summary */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Cost Estimate</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GPU Rate</span>
                <span>${hourlyRate.toFixed(2)}/GPU/hr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GPU Count</span>
                <span>{calcGpuCount}× GPUs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span>{calcHours} hours</span>
              </div>
              <div className="border-t border-border my-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm text-success-foreground">
                  <span>Monthly Discount (15%)</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-border my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${(totalCost - savings).toFixed(2)}</span>
              </div>
              <div className="text-xs text-muted-foreground text-right">
                ≈ ${((totalCost - savings) / calcHours).toFixed(2)}/hr effective rate
              </div>
            </div>
            <button className="w-full mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">
              Deploy This Configuration
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Hero Image Carousel Component - Clean professional design
const HeroImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-12 sm:py-16 lg:py-20 overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full border border-border bg-card text-xs sm:text-sm font-medium mb-4">
            <Building2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
            World-Class Infrastructure
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <KineticText>Built for Scale</KineticText>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade data centers powered by the latest NVIDIA GPUs
          </p>
        </div>
        
        {/* Main Carousel - Larger images */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1400px"
                  priority
                  quality={85}
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${heroSlides[currentSlide].gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-10">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-1 sm:mb-2"
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm sm:text-base lg:text-xl text-white/90"
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation arrows - Hidden on very small screens */}
            <button 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
          
          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "w-6 sm:w-8 bg-primary" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Infrastructure Gallery Carousel - Clean professional design with larger images
const InfrastructureGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-card text-sm font-medium mb-4">
            <Building2 className="h-4 w-4 mr-2 text-primary" />
            Our Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tour Our Data Centers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tier-3+ certified facilities with enterprise-grade NVIDIA GPUs
          </p>
        </div>
        
        {/* Gallery Grid - Larger images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Main featured image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-border">
            <Image
              src={infrastructureImages[currentImage].image}
              alt={infrastructureImages[currentImage].imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">
                {infrastructureImages[currentImage].title}
              </h3>
              <p className="text-sm sm:text-base text-white/80">
                {infrastructureImages[currentImage].description}
              </p>
            </div>
          </div>
          
          {/* Thumbnail grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {infrastructureImages.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setCurrentImage(index)}
                className={`group relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden transition-all border-2 ${
                  index === currentImage 
                    ? "border-primary ring-2 ring-primary/30" 
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.image}
                  alt={img.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 200px"
                  quality={75}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 right-1 sm:right-2">
                  <p className="text-[10px] sm:text-xs font-medium text-white truncate">
                    {img.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Carousel Component - Clean professional design
const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);
  
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);
  
  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);
  
  // Get visible testimonials (3 at a time on desktop)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], originalIndex: index });
    }
    return visible;
  };
  
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-border bg-card text-xs sm:text-sm font-medium mb-4">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            Customer Stories
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <KineticText>Loved by ML Engineers</KineticText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join 2,500+ teams who trust us with their AI infrastructure
          </p>
        </div>
        
        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-accent transition-colors hidden md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-accent transition-colors hidden md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="wait">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.originalIndex}-${currentIndex}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all group"
                >
                  {/* Quote mark */}
                  <div className="absolute top-4 right-4 text-6xl text-primary/10 font-serif leading-none">&ldquo;</div>
                  
                  {/* Company badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4">
                    {testimonial.company}
                  </div>
                  
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-base sm:text-lg text-foreground mb-6 leading-relaxed relative z-10 line-clamp-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center mt-auto">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-pink-500/30 flex items-center justify-center text-primary font-bold text-lg mr-4 ring-2 ring-background group-hover:ring-primary/20 transition-all">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Trustpilot-style rating banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8 p-6 rounded-2xl bg-card/50 border border-border/50"
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">4.9</div>
            <div className="flex flex-col">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">847 reviews</span>
            </div>
          </div>
          <div className="hidden sm:block h-10 w-px bg-border" />
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-sm text-muted-foreground">Featured on</span>
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5 text-foreground font-medium text-sm sm:text-base hover:text-primary transition-colors cursor-pointer">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Product Hunt
              </span>
              <span className="flex items-center gap-1.5 text-foreground font-medium text-sm sm:text-base hover:text-primary transition-colors cursor-pointer">
                <Globe2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                TechCrunch
              </span>
              <span className="flex items-center gap-1.5 text-foreground font-medium text-sm sm:text-base hover:text-primary transition-colors cursor-pointer">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Hacker News
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("gpu");
  const [billingCycle, setBillingCycle] = useState<"hourly" | "monthly" | "spot">("hourly");
  const [selectedRegion, setSelectedRegion] = useState("apac-hk");
  const [selectedGpu, setSelectedGpu] = useState<typeof gpuInventory[0] | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* HERO SECTION - Revolut/N26 Style: Clean, Light, Professional */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/20" />
        
        {/* Optional background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-7xl">
          {/* Badge - Minimal style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-sm mb-8"
          >
            <Zap className="h-4 w-4 text-purple-600 mr-2" />
            <span className="font-medium text-gray-900">New:</span>
            <span className="ml-1 text-gray-600">RTX 5090 & B200 SuperPods now available</span>
          </motion.div>
          
          {/* CLEAN HEADLINE - Fintech style */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Focus on{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                your AI
              </span>
              {" "}models
            </h1>
          </motion.div>
          
          {/* Subheadline - Clean and simple */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl text-gray-600 max-w-2xl mb-10 leading-relaxed"
          >
            Deploy GPU clusters in 60 seconds. Train faster. Pay less.
          </motion.p>
          
          {/* Single Strong CTA - Revolut/N26 style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center justify-center rounded-full text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white h-14 sm:h-16 px-10 sm:px-12 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-shadow"
            >
              Deploy Now — Get $100 Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center justify-center rounded-full text-lg font-medium bg-white text-gray-900 border-2 border-gray-200 h-14 sm:h-16 px-10 sm:px-12 hover:border-gray-300 transition-colors"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </motion.button>
          </motion.div>
          
          {/* Trust Badges - Clean minimal cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-4xl"
          >
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={badge.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-gray-200 hover:border-purple-200 hover:shadow-sm transition-all"
                >
                  <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-center">{badge.label}</span>
                </div>
              );
            })}
          </motion.div>
          
          {/* Social proof - minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-6 text-gray-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">4.9</span>
              <span>from 2,400+ reviews</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-300" />
            <div className="hidden sm:flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Trusted by 10,000+ AI teams</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION - Clean card-based design */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "GPU Uptime", value: "99.99%", icon: Gauge },
              { label: "Deploy Time", value: "<60s", icon: Zap },
              { label: "AI Teams", value: "10K+", icon: Users },
              { label: "Global DCs", value: "24/7", icon: Globe2 },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all"
                >
                  <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Clean Design with kinetic elements */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <ParallaxTitle className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              <span className="text-foreground">World-Class </span>
              <StretchText className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Infrastructure
              </StretchText>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">Built for the future of AI</p>
          </ParallaxTitle>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  {stat.icon && <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />}
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Image Carousel - Real datacenter & GPU photos */}
      <HeroImageCarousel />

      {/* Infrastructure Trust Section - Clean professional design */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="p-4 sm:p-6 rounded-xl border border-border bg-card">
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
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
                    <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-medium">
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

      {/* Features Section - Revolut-style with better visual hierarchy */}
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <ParallaxTitle className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <KineticText>Why Teams Choose Lumin House AI</KineticText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to train, deploy, and scale AI models
          </p>
        </ParallaxTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: Zap, 
              title: "60-Second Deploy", 
              description: "Spin up GPU instances instantly with pre-configured PyTorch, TensorFlow, and JAX environments.",
              highlight: "No setup required"
            },
            { 
              icon: Globe2, 
              title: "Global Edge Network", 
              description: "32+ data centers across APAC, NA, and EU. Deploy closer to your users.",
              highlight: "< 25ms latency"
            },
            { 
              icon: ShieldCheck, 
              title: "Enterprise Security", 
              description: "SOC 2 Type II certified. Dedicated VPCs, SSO, and end-to-end encryption.",
              highlight: "HIPAA Ready"
            },
            { 
              icon: Gauge, 
              title: "Pay Per Second", 
              description: "No long-term commitments. Only pay for compute you actually use.",
              highlight: "Save 40% vs AWS"
            },
          ].map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group p-6 sm:p-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-default h-full"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-pink-500/20 mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 text-success-foreground text-xs font-medium">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {feature.highlight}
                </span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials Section - Revolut-style carousel with auto-scroll */}
      <TestimonialsCarousel />

      {/* Infrastructure Gallery - Real datacenter photos */}
      <InfrastructureGallery />

      {/* Customer Logos Section - Revolut-style with animated marquee */}
      <section className="py-16 sm:py-20 border-t border-border/50 overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-3"
            >
              Trusted by 2,500+ AI teams worldwide
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              Powering the AI Revolution
            </motion.h2>
          </div>
          
          {/* Animated logo marquee */}
          <div className="relative">
            {/* Gradient overlays for smooth fade */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex items-center gap-12 md:gap-16"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {/* Double the logos for seamless loop */}
              {[...customerLogos, ...customerLogos].map((customer, index) => (
                <div
                  key={`${customer.name}-${index}`}
                  className="flex items-center gap-3 shrink-0 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors cursor-default group"
                >
                  <span className="text-3xl sm:text-4xl opacity-60 group-hover:opacity-100 transition-opacity">{customer.logo}</span>
                  <span className="font-semibold text-lg sm:text-xl text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">{customer.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Live stats bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { value: "8,420+", label: "GPUs Active Now", trend: "+127 today" },
              { value: "156M", label: "GPU Hours Served", trend: "+2.3M this week" },
              { value: "99.99%", label: "Uptime This Quarter", trend: "0 incidents" },
              { value: "$47M", label: "Saved vs AWS/GCP", trend: "40% avg savings" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-card/50 border border-border/50"
              >
                <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-[10px] text-success-foreground font-medium">{stat.trend}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GPU Comparison Table */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">GPU Comparison</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the right GPU for your workload. Compare specifications and pricing at a glance.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-semibold">GPU Model</th>
                <th className="text-center py-4 px-4 font-semibold">VRAM</th>
                <th className="text-center py-4 px-4 font-semibold hidden sm:table-cell">Tensor Cores</th>
                <th className="text-center py-4 px-4 font-semibold hidden md:table-cell">Memory BW</th>
                <th className="text-center py-4 px-4 font-semibold">Tier</th>
                <th className="text-center py-4 px-4 font-semibold">Price</th>
                <th className="text-center py-4 px-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {gpuComparison.map((gpu, index) => (
                <motion.tr 
                  key={gpu.model}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-primary" />
                      <span className="font-medium">{gpu.model}</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4 text-primary font-semibold">{gpu.vram}</td>
                  <td className="text-center py-4 px-4 hidden sm:table-cell">{gpu.tensorCores}</td>
                  <td className="text-center py-4 px-4 hidden md:table-cell">{gpu.memBandwidth}</td>
                  <td className="text-center py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      gpu.tier === "Flagship" ? "bg-gradient-to-r from-primary to-pink-500 text-white" :
                      gpu.tier === "Enterprise" ? "bg-primary/20 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {gpu.tier}
                    </span>
                  </td>
                  <td className="text-center py-4 px-4 font-bold text-success-foreground">{gpu.price}</td>
                  <td className="text-center py-4 px-4">
                    <button className="inline-flex items-center justify-center rounded-md text-xs font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3">
                      Deploy
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Global Data Center Map */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Global Infrastructure</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            10+ data centers across 3 continents. Deploy closer to your users for minimal latency.
          </p>
        </div>
        <div className="relative rounded-2xl border border-border bg-card overflow-hidden p-6 sm:p-8">
          {/* World Map SVG Background */}
          <div className="relative w-full h-64 sm:h-80 md:h-96">
            <svg viewBox="0 0 1000 500" className="w-full h-full opacity-30">
              {/* Simplified world map outline */}
              <path d="M 200 150 Q 250 100 300 120 Q 350 80 400 100 Q 450 90 500 110 Q 550 100 600 130 Q 650 120 700 150 Q 750 140 800 180 L 800 300 Q 750 320 700 310 Q 650 330 600 300 Q 550 320 500 290 Q 450 310 400 280 Q 350 300 300 270 Q 250 290 200 250 Z" 
                    fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
              {/* Europe */}
              <ellipse cx="480" cy="160" rx="60" ry="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
              {/* Asia */}
              <ellipse cx="700" cy="180" rx="100" ry="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
              {/* North America */}
              <ellipse cx="250" cy="180" rx="80" ry="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            </svg>
            
            {/* Data Center Markers */}
            {dataCenterLocations.map((dc, index) => {
              // Approximate positions on the SVG viewBox
              const positions: Record<string, { x: number; y: number }> = {
                hk: { x: 75, y: 45 },
                sg: { x: 70, y: 55 },
                jp: { x: 82, y: 38 },
                kr: { x: 78, y: 36 },
                sf: { x: 15, y: 42 },
                ny: { x: 28, y: 40 },
                chi: { x: 23, y: 38 },
                fra: { x: 50, y: 35 },
                lon: { x: 47, y: 33 },
                ams: { x: 49, y: 32 },
              };
              const pos = positions[dc.id] || { x: 50, y: 50 };
              return (
                <motion.div
                  key={dc.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="absolute group cursor-pointer"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Pulse ring */}
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30 animate-ping" />
                  {/* Marker dot */}
                  <div className="relative w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg" />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-card border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    <p className="font-semibold text-sm">{dc.name}</p>
                    <p className="text-xs text-muted-foreground">{dc.gpuCount}+ GPUs Available</p>
                    <div className="flex items-center gap-1 text-xs text-success-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-success-foreground animate-pulse" />
                      Operational
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Region Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { region: "APAC", locations: 4, gpus: "3,000+", latency: "<25ms" },
              { region: "North America", locations: 3, gpus: "3,000+", latency: "<50ms" },
              { region: "Europe", locations: 3, gpus: "2,000+", latency: "<40ms" },
            ].map((region) => (
              <div key={region.region} className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="font-semibold mb-1">{region.region}</p>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="text-muted-foreground">{region.locations} DCs</span>
                  <span className="text-primary font-medium">{region.gpus} GPUs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Code Examples */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Developer-First API</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deploy GPU instances with just a few lines of code. Full API documentation available.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {Object.entries(codeExamples).map(([lang, code]) => (
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <div className="px-4 py-2 border-b border-border bg-muted/50 flex items-center justify-between">
                <span className="font-medium text-sm capitalize">{lang}</span>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Copy
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-xs sm:text-sm">
                <code className="text-muted-foreground">{code}</code>
              </pre>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/docs" className="inline-flex items-center text-primary hover:underline font-medium">
            View Full API Documentation
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Pricing Calculator */}
      <PricingCalculator />

      {/* Managed Inference Section - Crusoe-inspired */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm mb-4">
              <Zap className="h-4 w-4 mr-2" />
              New: Managed Inference
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Deploy AI Models in Minutes</h2>
            <p className="text-muted-foreground mb-6">
              Our managed inference platform handles scaling, load balancing, and optimization automatically. 
              Deploy popular open-source models or bring your own with zero infrastructure management.
            </p>
            <div className="space-y-4 mb-6">
              {[
                { title: "One-Click Deployment", desc: "Deploy Llama 3.1, Mistral, SDXL, and more instantly" },
                { title: "Auto-Scaling", desc: "Scale from 0 to 1000+ requests/sec automatically" },
                { title: "Cost Optimization", desc: "Pay only for actual compute time, not idle instances" },
                { title: "Low Latency", desc: "Sub-100ms response times with global edge routing" },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6">
                Try Managed Inference
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6">
                View Supported Models
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="font-semibold mb-4">Supported Models</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Llama 3.1 405B", category: "LLM", hot: true },
                { name: "Mistral Large", category: "LLM", hot: false },
                { name: "SDXL Turbo", category: "Image", hot: true },
                { name: "Whisper Large v3", category: "Audio", hot: false },
                { name: "DeepSeek Coder", category: "Code", hot: true },
                { name: "Qwen 2.5 72B", category: "LLM", hot: false },
                { name: "FLUX.1 Pro", category: "Image", hot: true },
                { name: "Gemma 2 27B", category: "LLM", hot: false },
              ].map((model, index) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-3 rounded-lg border border-border bg-muted/50 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{model.category}</span>
                    {model.hot && <span className="text-xs">🔥</span>}
                  </div>
                  <p className="font-medium text-sm">{model.name}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              + 50 more models available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 bg-muted/30 rounded-3xl my-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Built for Every AI Use Case</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From training foundation models to running real-time inference at scale
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🧠",
              title: "LLM Training",
              description: "Train custom language models with distributed multi-node setups. Support for DeepSpeed, FSDP, and Megatron.",
              features: ["Multi-node training", "Checkpointing", "Gradient accumulation"],
              color: "from-purple-500/20 to-pink-500/20"
            },
            {
              icon: "🎨",
              title: "Image Generation",
              description: "Run Stable Diffusion, FLUX, and Midjourney-style models at scale with optimized inference.",
              features: ["Batch processing", "ControlNet support", "LoRA fine-tuning"],
              color: "from-blue-500/20 to-cyan-500/20"
            },
            {
              icon: "🎬",
              title: "Video AI",
              description: "Generate and process video with state-of-the-art models like Runway, Sora alternatives.",
              features: ["Frame interpolation", "Video-to-video", "Real-time processing"],
              color: "from-green-500/20 to-emerald-500/20"
            },
            {
              icon: "🔊",
              title: "Audio & Speech",
              description: "Transcription, TTS, voice cloning, and music generation with low-latency streaming.",
              features: ["Real-time STT", "Multi-speaker", "Custom voices"],
              color: "from-orange-500/20 to-amber-500/20"
            },
            {
              icon: "🤖",
              title: "Agent Systems",
              description: "Build autonomous AI agents with tool use, RAG, and long-context processing.",
              features: ["128K+ context", "Function calling", "Memory systems"],
              color: "from-red-500/20 to-rose-500/20"
            },
            {
              icon: "📊",
              title: "ML Research",
              description: "Accelerate research with Jupyter notebooks, experiment tracking, and collaboration tools.",
              features: ["W&B integration", "Git versioning", "Team sharing"],
              color: "from-indigo-500/20 to-violet-500/20"
            },
          ].map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-xl border border-border bg-gradient-to-br ${useCase.color} backdrop-blur`}
            >
              <span className="text-4xl mb-4 block">{useCase.icon}</span>
              <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
              <div className="flex flex-wrap gap-2">
                {useCase.features.map((feature) => (
                  <span key={feature} className="px-2 py-1 rounded-full bg-background/50 text-xs font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Kubernetes & Orchestration Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm mb-4">
                Enterprise
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Managed Kubernetes for AI</h2>
              <p className="text-muted-foreground mb-6">
                Deploy GPU workloads on managed Kubernetes with auto-scaling, spot instance integration, 
                and native support for popular ML frameworks.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Slurm Support", icon: "⚡" },
                  { label: "Ray Clusters", icon: "🔮" },
                  { label: "KubeFlow", icon: "🌊" },
                  { label: "MLflow", icon: "📈" },
                  { label: "Spark", icon: "✨" },
                  { label: "Dask", icon: "🔥" },
                ].map((tool) => (
                  <div key={tool.label} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <span>{tool.icon}</span>
                    <span className="font-medium text-sm">{tool.label}</span>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6">
                Learn About K8s for AI
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="bg-muted/50 p-8 lg:p-12 flex items-center justify-center">
              <div className="w-full max-w-sm">
                <div className="text-center mb-6">
                  <Server className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg">AutoClusters</h3>
                  <p className="text-sm text-muted-foreground">Automatically scale your GPU fleet</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Active Nodes", value: "156", trend: "+12" },
                    { label: "Pending Jobs", value: "23", trend: "-5" },
                    { label: "GPU Utilization", value: "94%", trend: "+2%" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{stat.value}</span>
                        <span className="text-xs text-success-foreground">{stat.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section - Revolut-style with connected steps */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Start Training in 5 Minutes
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Three simple steps from sign-up to your first GPU workload
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-24 h-0.5 bg-gradient-to-r from-primary via-pink-500 to-primary" style={{ left: '16.67%', right: '16.67%' }} />
            
            {[
              {
                step: "01",
                title: "Create Account",
                description: "Sign up with email or GitHub. Instantly receive $100 in free credits to get started.",
                icon: Users,
                cta: "Sign Up Free",
                highlight: "Takes 30 seconds"
              },
              {
                step: "02",
                title: "Choose Your GPU",
                description: "Select from RTX 4090 to B200 SuperPods. Configure vCPU, RAM, and storage.",
                icon: Cpu,
                cta: "View GPUs",
                highlight: "6 GPU types available"
              },
              {
                step: "03",
                title: "Deploy & Scale",
                description: "Connect via SSH, Jupyter, or API. Auto-scale from 1 to 1000+ GPUs on demand.",
                icon: Zap,
                cta: "Read Docs",
                highlight: "< 60s deploy time"
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -4 }}
                className="relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all text-center group"
              >
                {/* Step number */}
                <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-pink-500 text-white font-bold text-xl mb-6 shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                
                {/* Highlight badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 text-success-foreground text-xs font-medium mb-4">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {item.highlight}
                </span>
                
                <div>
                  <button className="text-sm text-primary hover:text-primary/80 font-semibold inline-flex items-center group-hover:gap-2 gap-1 transition-all">
                    {item.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest updates on new GPU availability, pricing changes, and AI infrastructure tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-11 rounded-md border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-6"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-3">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Cost Savings Comparison - Revolut-style before/after */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success-foreground text-sm font-medium mb-4"
            >
              <Wallet className="h-4 w-4" />
              Save Money
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            >
              Stop Overpaying for GPUs
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              See how much you could save by switching to Lumin House AI
            </motion.p>
          </div>
          
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* Before Card - AWS/GCP */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative p-6 sm:p-8 rounded-2xl border border-destructive/30 bg-gradient-to-br from-card to-destructive/5"
            >
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-semibold">
                Before: AWS/GCP
              </div>
              <div className="mt-4">
                <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                  $4,800<span className="text-lg font-normal text-muted-foreground">/mo</span>
                </div>
                <p className="text-muted-foreground mb-6">8× A100 GPUs on AWS</p>
                <ul className="space-y-3 text-sm">
                  {[
                    "Long quota approval wait times",
                    "Complex pricing and hidden fees",
                    "Limited GPU availability",
                    "No spot instance guarantees"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* After Card - Lumin House AI */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative p-6 sm:p-8 rounded-2xl border-2 border-success/50 bg-gradient-to-br from-card to-success/5 shadow-xl shadow-success/10"
            >
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-success text-white text-xs font-semibold">
                After: Lumin House AI
              </div>
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white text-xs font-semibold">
                Save 40%
              </div>
              <div className="mt-4">
                <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                  $2,880<span className="text-lg font-normal text-muted-foreground">/mo</span>
                </div>
                <p className="text-muted-foreground mb-6">8× H100 GPUs on Lumin</p>
                <ul className="space-y-3 text-sm">
                  {[
                    "Deploy in 60 seconds",
                    "Simple per-second billing",
                    "Always-available inventory",
                    "70% off with spot instances"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success-foreground shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
          
          {/* Savings Calculator CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-muted-foreground mb-4">
              Average customer saves <span className="text-success-foreground font-bold">$18,000/year</span>
            </p>
            <button className="inline-flex items-center justify-center rounded-xl text-base font-semibold bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 h-14 px-8 transition-all hover:scale-105">
              Calculate Your Savings
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Security Certifications Banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 p-6 rounded-xl border border-border bg-muted/30">
          {[
            { name: "SOC 2 Type II", icon: "🛡️" },
            { name: "GDPR Compliant", icon: "🇪🇺" },
            { name: "ISO 27001", icon: "📋" },
            { name: "HIPAA Ready", icon: "🏥" },
            { name: "PCI DSS", icon: "💳" },
          ].map((cert) => (
            <div key={cert.name} className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xl">{cert.icon}</span>
              <span className="font-medium text-sm">{cert.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Revolut-style with strong visual impact */}
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <ScaleOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-pink-600 p-8 sm:p-12 md:p-16 text-center">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to 10x your<br className="hidden sm:block" /> AI training speed?
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join 2,500+ teams who have already made the switch. Get <span className="font-bold text-white">$100 in free credits</span> to start.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-xl text-base font-semibold bg-white text-primary shadow-xl h-14 px-10 transition-colors"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-xl text-base font-semibold border-2 border-white/30 text-white h-14 px-10 transition-colors"
                >
                  Talk to Sales
                </motion.button>
              </div>
              
              <p className="mt-6 text-sm text-white/60">
                No credit card required • Deploy in 60 seconds • Cancel anytime
              </p>
            </div>
          </div>
        </ScaleOnScroll>
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
