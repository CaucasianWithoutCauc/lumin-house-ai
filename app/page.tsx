"use client";

import { Navbar } from "@/components/Navbar";
import { CheckCircle2, Zap, Globe2, ShieldCheck, Server, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// GPU inventory data
const inventory = [
  {
    id: "h100-sxm5",
    name: "NVIDIA H100 SXM5",
    vram: "80GB",
    clusterSize: "16x / 32x Node",
    interconnect: "3.2 Tbps IB",
    region: "APAC-East (HK/SG)",
    price: "$1.95",
    status: "Available",
  },
  {
    id: "h800-sxm",
    name: "NVIDIA H800 SXM",
    vram: "80GB",
    clusterSize: "8x Node",
    interconnect: "NVLink",
    region: "APAC-South",
    price: "$1.65",
    status: "Low Stock",
  },
  {
    id: "rtx-4090",
    name: "RTX 4090 Cluster",
    vram: "24GB",
    clusterSize: "4x / 8x Node",
    interconnect: "PCIe Gen4",
    region: "Global",
    price: "$0.35",
    status: "Available",
  }
];

// Status styling helper
const getStatusStyles = (status: string) => {
  const styles = {
    Available: "bg-success/20 text-success-foreground",
    "Low Stock": "bg-warning/20 text-warning-foreground",
  };
  return styles[status as keyof typeof styles] || "bg-muted text-muted-foreground";
};

export default function Home() {
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
              View Pricing
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 sm:p-6 rounded-lg border border-border bg-card"
          >
            <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-primary mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Deploy GPU instances in under 60 seconds with our optimized infrastructure.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-5 sm:p-6 rounded-lg border border-border bg-card"
          >
            <Globe2 className="h-8 w-8 sm:h-10 sm:w-10 text-primary mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">Global Network</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Data centers across APAC, NA, and EU for low-latency access worldwide.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-5 sm:p-6 rounded-lg border border-border bg-card sm:col-span-2 lg:col-span-1"
          >
            <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-primary mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">Enterprise Security</h3>
            <p className="text-sm sm:text-base text-muted-foreground">SOC 2 compliant with end-to-end encryption and dedicated VPCs.</p>
          </motion.div>
        </div>
      </section>

      {/* GPU Inventory Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Available GPU Instances</h2>
        
        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden lg:block rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">GPU Model</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">VRAM</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Cluster</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Interconnect</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Region</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Price/hr</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((gpu) => (
                <motion.tr
                  key={gpu.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Server className="h-5 w-5 text-primary mr-3" />
                      <span className="font-medium">{gpu.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{gpu.vram}</td>
                  <td className="px-6 py-4 text-muted-foreground">{gpu.clusterSize}</td>
                  <td className="px-6 py-4 text-muted-foreground">{gpu.interconnect}</td>
                  <td className="px-6 py-4 text-muted-foreground">{gpu.region}</td>
                  <td className="px-6 py-4 font-semibold text-success-foreground">{gpu.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(gpu.status)}`}>
                      {gpu.status === "Available" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {gpu.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-4">
                      Deploy
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards - Hidden on desktop */}
        <div className="lg:hidden space-y-4">
          {inventory.map((gpu) => (
            <motion.div
              key={gpu.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card p-4 sm:p-5"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Server className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">{gpu.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{gpu.vram} VRAM</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(gpu.status)}`}>
                  {gpu.status === "Available" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                  {gpu.status}
                </span>
              </div>

              {/* Card Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Cluster</p>
                  <p className="font-medium">{gpu.clusterSize}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Interconnect</p>
                  <p className="font-medium">{gpu.interconnect}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Region</p>
                  <p className="font-medium">{gpu.region}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Price/hr</p>
                  <p className="font-semibold text-success-foreground">{gpu.price}</p>
                </div>
              </div>

              {/* Card Action */}
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 w-full">
                Deploy Instance
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-8 sm:mt-16 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm sm:text-base">
          <p>© 2024 Lumin House AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
