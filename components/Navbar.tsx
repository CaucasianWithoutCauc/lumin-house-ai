"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  Zap, Menu, X, ChevronDown, Cpu, Server, HardDrive, Database, 
  Headphones, User, LogOut, Cloud, Layers, Book, FileText, 
  MessageSquare, HelpCircle, Building2, Users, Briefcase, 
  Mail, Globe2, Shield, TrendingUp, ChevronRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// GPU products with images for mega menu (Crusoe-style)
const gpuProducts = [
  {
    id: "rtx-4090",
    name: "RTX 4090",
    vram: "24GB / 48GB",
    badge: "Popular",
    badgeColor: "bg-green-500/20 text-green-400",
    description: "Cost-effective AI training and inference. Perfect for startups and researchers.",
    price: "From $0.20/hr",
    imageUrl: "/images/gpu/rtx-4090.svg",
    features: ["Ada Lovelace", "512 Tensor Cores", "1008 GB/s"],
  },
  {
    id: "rtx-5090",
    name: "RTX 5090",
    vram: "32GB GDDR7",
    badge: "New",
    badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    description: "Next-gen Blackwell architecture. 2x faster than RTX 4090 for AI workloads.",
    price: "From $0.34/hr",
    imageUrl: "/images/gpu/rtx-5090.svg",
    features: ["Blackwell", "680 Tensor Cores", "1792 GB/s"],
  },
  {
    id: "h100",
    name: "NVIDIA H100",
    vram: "80GB HBM3",
    badge: "Enterprise",
    badgeColor: "bg-primary/20 text-primary",
    description: "Industry standard for LLM training. NVLink for multi-GPU scaling.",
    price: "From $1.84/hr",
    imageUrl: "/images/gpu/h100.svg",
    features: ["Hopper", "640 Tensor Cores", "3350 GB/s"],
  },
  {
    id: "h200",
    name: "NVIDIA H200",
    vram: "141GB HBM3e",
    badge: "Enterprise",
    badgeColor: "bg-primary/20 text-primary",
    description: "76% more memory than H100. Train 70B+ models with larger batch sizes.",
    price: "From $2.28/hr",
    imageUrl: "/images/gpu/h200.svg",
    features: ["Hopper Enhanced", "640 Tensor Cores", "4800 GB/s"],
  },
  {
    id: "b200",
    name: "NVIDIA B200",
    vram: "180GB HBM3e",
    badge: "Flagship",
    badgeColor: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
    description: "The ultimate AI supercomputer. 5x faster than H100 for LLM inference.",
    price: "From $3.38/hr",
    imageUrl: "/images/gpu/b200.svg",
    features: ["Blackwell", "896 Tensor Cores", "8000 GB/s"],
  },
];

// Bare Metal products
const bareMetalProducts = [
  {
    id: "bm-rtx-4090",
    name: "8× RTX 4090 Server",
    specs: "Xeon Gold, 512GB DDR5",
    badge: "Best Value",
    badgeColor: "bg-green-500/20 text-green-400",
    description: "Dedicated 8-GPU server for development and fine-tuning workloads.",
    price: "From $1,200/mo",
    imageUrl: "/images/gpu/server-4090.svg",
    features: ["8× RTX 4090", "3.84TB NVMe", "25GbE"],
  },
  {
    id: "bm-h100",
    name: "8× H100 SXM Cluster",
    specs: "Xeon Platinum, 2TB DDR5",
    badge: "Enterprise",
    badgeColor: "bg-primary/20 text-primary",
    description: "Enterprise-grade DGX-style cluster with NVLink interconnect.",
    price: "From $10,600/mo",
    imageUrl: "/images/gpu/server-h100.svg",
    features: ["8× H100 SXM", "NVLink 4.0", "400GbE InfiniBand"],
  },
  {
    id: "bm-b200",
    name: "GB200 NVL72 SuperPod",
    specs: "Custom Config",
    badge: "Flagship",
    badgeColor: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
    description: "NVIDIA's flagship supercomputer configuration for frontier AI.",
    price: "Contact Sales",
    imageUrl: "/images/gpu/server-b200.svg",
    features: ["72× B200", "NVLink 5.0", "1.8TB/s Interconnect"],
  },
];

const products = [
  { 
    name: "Cloud GPU", 
    href: "/pricing", 
    icon: Cpu, 
    description: "NVIDIA H100, H200, B200, RTX 4090",
    hasMegaMenu: true,
    megaMenuType: "gpu",
  },
  { name: "AI Studio", href: "/ai-studio", icon: Layers, description: "Collaborative AI development platform" },
  { name: "Serverless GPU", href: "/serverless", icon: Cloud, description: "Auto-scaling GPU functions" },
  { 
    name: "Bare Metal", 
    href: "/pricing", 
    icon: HardDrive, 
    description: "Dedicated GPU servers",
    hasMegaMenu: true,
    megaMenuType: "bareMetal",
  },
  { name: "Storage", href: "/pricing", icon: Database, description: "Block & Object storage" },
];

const resources = [
  { name: "Documentation", href: "/docs", icon: Book, description: "API reference and guides" },
  { name: "Help Center", href: "/help-center", icon: HelpCircle, description: "Knowledge base and tutorials" },
  { name: "FAQ", href: "/faq", icon: MessageSquare, description: "Frequently asked questions" },
  { name: "Blog", href: "/blog", icon: FileText, description: "Latest news and updates" },
];

const company = [
  { name: "About Us", href: "/about", icon: Building2, description: "Our story and mission" },
  { name: "Careers", href: "/careers", icon: Briefcase, description: "Join our team" },
  { name: "Partners", href: "/partners", icon: Users, description: "Partnership programs" },
  { name: "Investor Relations", href: "/investor-relations", icon: TrendingUp, description: "For shareholders" },
  { name: "Contact", href: "/contact", icon: Mail, description: "Get in touch" },
];

// GPU Product Card Component for Mega Menu
function GPUProductCard({ product, isSelected, onSelect }: { 
  product: typeof gpuProducts[0]; 
  isSelected: boolean; 
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
        isSelected 
          ? 'bg-primary/10 border border-primary/30' 
          : 'hover:bg-accent border border-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">{product.name}</span>
        </div>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${product.badgeColor}`}>
          {product.badge}
        </span>
      </div>
      <div className="text-xs text-muted-foreground mt-0.5 ml-6">{product.vram}</div>
    </button>
  );
}

// Bare Metal Product Card Component
function BareMetalProductCard({ product, isSelected, onSelect }: { 
  product: typeof bareMetalProducts[0]; 
  isSelected: boolean; 
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
        isSelected 
          ? 'bg-primary/10 border border-primary/30' 
          : 'hover:bg-accent border border-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">{product.name}</span>
        </div>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${product.badgeColor}`}>
          {product.badge}
        </span>
      </div>
      <div className="text-xs text-muted-foreground mt-0.5 ml-6">{product.specs}</div>
    </button>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [activeProductMenu, setActiveProductMenu] = useState<string | null>(null);
  const [selectedGpuProduct, setSelectedGpuProduct] = useState<typeof gpuProducts[0] | null>(gpuProducts[0]);
  const [selectedBareMetalProduct, setSelectedBareMetalProduct] = useState<typeof bareMetalProducts[0] | null>(bareMetalProducts[0]);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleProductHover = (menuType: string | undefined) => {
    if (menuType === "gpu" || menuType === "bareMetal") {
      setActiveProductMenu(menuType);
    } else {
      setActiveProductMenu(null);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg sm:text-xl">Lumin House AI</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-1">
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {/* Products Dropdown with Crusoe-style Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => {
                setIsProductsOpen(false);
                setActiveProductMenu(null);
              }}
            >
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                onFocus={() => setIsProductsOpen(true)}
                className="inline-flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
              >
                Products
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-1 rounded-xl border border-border bg-background shadow-2xl overflow-hidden">
                  <div className="flex">
                    {/* Left sidebar - Product categories */}
                    <div className="w-64 border-r border-border bg-muted/30 py-3">
                      <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Products
                      </div>
                      {products.map((product) => {
                        const Icon = product.icon;
                        const isActive = activeProductMenu === product.megaMenuType;
                        return (
                          <div 
                            key={product.name}
                            onMouseEnter={() => handleProductHover(product.megaMenuType)}
                          >
                            <Link
                              href={product.href}
                              className={`flex items-center justify-between px-4 py-3 transition-colors ${
                                isActive ? 'bg-primary/10 text-foreground' : 'hover:bg-accent text-foreground/80'
                              }`}
                            >
                              <div className="flex items-center">
                                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                <div>
                                  <div className="font-medium text-sm">{product.name}</div>
                                  <div className="text-xs text-muted-foreground">{product.description}</div>
                                </div>
                              </div>
                              {product.hasMegaMenu && (
                                <ChevronRight className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                              )}
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Right panel - GPU/Bare Metal Mega Menu (Crusoe-style) */}
                    {activeProductMenu === "gpu" && (
                      <div className="flex">
                        {/* GPU List */}
                        <div className="w-56 py-3 px-2 border-r border-border">
                          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Select GPU
                          </div>
                          <div className="space-y-1">
                            {gpuProducts.map((gpu) => (
                              <GPUProductCard
                                key={gpu.id}
                                product={gpu}
                                isSelected={selectedGpuProduct?.id === gpu.id}
                                onSelect={() => setSelectedGpuProduct(gpu)}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* GPU Detail Panel with Image */}
                        {selectedGpuProduct && (
                          <div className="w-80 p-4 bg-gradient-to-br from-background to-muted/30">
                            {/* GPU Image */}
                            <div className="relative h-40 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border border-primary/20">
                              {/* SVG GPU Illustration */}
                              <svg viewBox="0 0 200 120" className="w-full h-full p-4">
                                {/* GPU Card Body */}
                                <rect x="20" y="20" width="160" height="80" rx="8" fill="url(#gpuGradient)" stroke="url(#borderGradient)" strokeWidth="2"/>
                                
                                {/* Fan circles */}
                                <circle cx="60" cy="60" r="25" fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="2"/>
                                <circle cx="60" cy="60" r="18" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
                                <circle cx="60" cy="60" r="5" fill="rgba(139,92,246,0.8)"/>
                                
                                <circle cx="140" cy="60" r="25" fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="2"/>
                                <circle cx="140" cy="60" r="18" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
                                <circle cx="140" cy="60" r="5" fill="rgba(139,92,246,0.8)"/>
                                
                                {/* Heatsink lines */}
                                <line x1="85" y1="30" x2="85" y2="90" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
                                <line x1="95" y1="30" x2="95" y2="90" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
                                <line x1="105" y1="30" x2="105" y2="90" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
                                <line x1="115" y1="30" x2="115" y2="90" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
                                
                                {/* Power connectors */}
                                <rect x="165" y="35" width="12" height="20" rx="2" fill="rgba(139,92,246,0.4)"/>
                                <rect x="165" y="65" width="12" height="20" rx="2" fill="rgba(139,92,246,0.4)"/>
                                
                                {/* Glow effect */}
                                <ellipse cx="100" cy="60" rx="70" ry="30" fill="url(#glowGradient)" opacity="0.3"/>
                                
                                <defs>
                                  <linearGradient id="gpuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(30,30,40,1)"/>
                                    <stop offset="100%" stopColor="rgba(20,20,30,1)"/>
                                  </linearGradient>
                                  <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(139,92,246,0.6)"/>
                                    <stop offset="100%" stopColor="rgba(236,72,153,0.6)"/>
                                  </linearGradient>
                                  <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="rgba(139,92,246,0.8)"/>
                                    <stop offset="100%" stopColor="rgba(139,92,246,0)"/>
                                  </radialGradient>
                                </defs>
                              </svg>
                              
                              {/* Overlay badges */}
                              <div className="absolute top-2 left-2">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${selectedGpuProduct.badgeColor}`}>
                                  {selectedGpuProduct.badge}
                                </span>
                              </div>
                              <div className="absolute bottom-2 right-2">
                                <span className="px-2 py-1 rounded bg-black/60 text-white text-xs font-medium">
                                  {selectedGpuProduct.vram}
                                </span>
                              </div>
                            </div>
                            
                            {/* GPU Info */}
                            <h3 className="text-lg font-bold mb-1">{selectedGpuProduct.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{selectedGpuProduct.description}</p>
                            
                            {/* Features */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {selectedGpuProduct.features.map((feature, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                                  {feature}
                                </span>
                              ))}
                            </div>
                            
                            {/* Price and CTA */}
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-primary">{selectedGpuProduct.price}</span>
                              <Link
                                href="/pricing"
                                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                              >
                                Deploy Now
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Bare Metal Mega Menu */}
                    {activeProductMenu === "bareMetal" && (
                      <div className="flex">
                        {/* Server List */}
                        <div className="w-64 py-3 px-2 border-r border-border">
                          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Select Configuration
                          </div>
                          <div className="space-y-1">
                            {bareMetalProducts.map((server) => (
                              <BareMetalProductCard
                                key={server.id}
                                product={server}
                                isSelected={selectedBareMetalProduct?.id === server.id}
                                onSelect={() => setSelectedBareMetalProduct(server)}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Server Detail Panel with Image */}
                        {selectedBareMetalProduct && (
                          <div className="w-80 p-4 bg-gradient-to-br from-background to-muted/30">
                            {/* Server Image */}
                            <div className="relative h-40 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border border-primary/20">
                              {/* SVG Server Illustration */}
                              <svg viewBox="0 0 200 120" className="w-full h-full p-4">
                                {/* Server Rack */}
                                <rect x="30" y="15" width="140" height="90" rx="4" fill="url(#serverGradient)" stroke="url(#serverBorder)" strokeWidth="2"/>
                                
                                {/* Server Units */}
                                <rect x="40" y="22" width="120" height="18" rx="2" fill="rgba(30,30,40,0.8)" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
                                <rect x="40" y="44" width="120" height="18" rx="2" fill="rgba(30,30,40,0.8)" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
                                <rect x="40" y="66" width="120" height="18" rx="2" fill="rgba(30,30,40,0.8)" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
                                
                                {/* LED indicators */}
                                <circle cx="50" cy="31" r="3" fill="#22c55e"/>
                                <circle cx="60" cy="31" r="3" fill="#22c55e"/>
                                <circle cx="50" cy="53" r="3" fill="#22c55e"/>
                                <circle cx="60" cy="53" r="3" fill="rgba(139,92,246,0.8)"/>
                                <circle cx="50" cy="75" r="3" fill="#22c55e"/>
                                <circle cx="60" cy="75" r="3" fill="#22c55e"/>
                                
                                {/* Drive bays */}
                                <rect x="75" y="25" width="75" height="12" rx="1" fill="rgba(50,50,60,0.5)"/>
                                <rect x="75" y="47" width="75" height="12" rx="1" fill="rgba(50,50,60,0.5)"/>
                                <rect x="75" y="69" width="75" height="12" rx="1" fill="rgba(50,50,60,0.5)"/>
                                
                                {/* Ventilation slots */}
                                <line x1="78" y1="31" x2="145" y2="31" stroke="rgba(139,92,246,0.2)" strokeWidth="1"/>
                                <line x1="78" y1="53" x2="145" y2="53" stroke="rgba(139,92,246,0.2)" strokeWidth="1"/>
                                <line x1="78" y1="75" x2="145" y2="75" stroke="rgba(139,92,246,0.2)" strokeWidth="1"/>
                                
                                {/* Glow */}
                                <ellipse cx="100" cy="60" rx="60" ry="35" fill="url(#serverGlow)" opacity="0.2"/>
                                
                                <defs>
                                  <linearGradient id="serverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(40,40,50,1)"/>
                                    <stop offset="100%" stopColor="rgba(25,25,35,1)"/>
                                  </linearGradient>
                                  <linearGradient id="serverBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(139,92,246,0.5)"/>
                                    <stop offset="100%" stopColor="rgba(139,92,246,0.2)"/>
                                  </linearGradient>
                                  <radialGradient id="serverGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="rgba(139,92,246,1)"/>
                                    <stop offset="100%" stopColor="rgba(139,92,246,0)"/>
                                  </radialGradient>
                                </defs>
                              </svg>
                              
                              {/* Overlay badges */}
                              <div className="absolute top-2 left-2">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${selectedBareMetalProduct.badgeColor}`}>
                                  {selectedBareMetalProduct.badge}
                                </span>
                              </div>
                            </div>
                            
                            {/* Server Info */}
                            <h3 className="text-lg font-bold mb-1">{selectedBareMetalProduct.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{selectedBareMetalProduct.description}</p>
                            
                            {/* Features */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {selectedBareMetalProduct.features.map((feature, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                                  {feature}
                                </span>
                              ))}
                            </div>
                            
                            {/* Price and CTA */}
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-primary">{selectedBareMetalProduct.price}</span>
                              <Link
                                href="/pricing"
                                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                              >
                                Configure
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                onFocus={() => setIsResourcesOpen(true)}
                className="inline-flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
              >
                Resources
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 rounded-lg border border-border bg-background shadow-lg py-2">
                  {resources.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <Icon className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button
                onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                onFocus={() => setIsCompanyOpen(true)}
                className="inline-flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
              >
                Company
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCompanyOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 rounded-lg border border-border bg-background shadow-lg py-2">
                  {company.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <Icon className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
            >
              Pricing
            </Link>
            <Link
              href="/support"
              className="px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
            >
              <span className="flex items-center">
                <Headphones className="h-4 w-4 mr-1" />
                Support
              </span>
            </Link>
          </nav>
          <div className="flex items-center space-x-2 ml-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-muted-foreground hover:text-foreground hover:bg-accent h-9 px-3 py-2"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden flex-1 justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container px-4 py-4 space-y-4">
            {/* Mobile Products Section */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Products</p>
              {products.map((product) => {
                const Icon = product.icon;
                return (
                  <Link
                    key={product.name}
                    href={product.href}
                    className="flex items-center py-2 text-foreground/80 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Resources Section */}
            <div className="space-y-2 border-t border-border/40 pt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resources</p>
              {resources.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center py-2 text-foreground/80 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Company Section */}
            <div className="space-y-2 border-t border-border/40 pt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</p>
              {company.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center py-2 text-foreground/80 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-border/40 pt-4">
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/pricing"
                  className="text-foreground/80 hover:text-foreground py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/support"
                  className="text-foreground/80 hover:text-foreground py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  Support
                </Link>
              </nav>
            </div>

            <div className="flex flex-col space-y-2 pt-2 border-t border-border/40">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
