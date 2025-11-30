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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Enterprise GPU Cloud
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access high-performance NVIDIA GPUs for AI/ML workloads. 
            Deploy in seconds, scale without limits.
          </p>
          <div className="flex justify-center gap-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8">
              View Pricing
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-lg border border-border bg-card"
          >
            <Zap className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">Deploy GPU instances in under 60 seconds with our optimized infrastructure.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-lg border border-border bg-card"
          >
            <Globe2 className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Global Network</h3>
            <p className="text-muted-foreground">Data centers across APAC, NA, and EU for low-latency access worldwide.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-lg border border-border bg-card"
          >
            <ShieldCheck className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
            <p className="text-muted-foreground">SOC 2 compliant with end-to-end encryption and dedicated VPCs.</p>
          </motion.div>
        </div>
      </section>

      {/* GPU Inventory Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Available GPU Instances</h2>
        <div className="rounded-lg border border-border overflow-hidden">
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      gpu.status === "Available" 
                        ? "bg-success/20 text-success-foreground" 
                        : "bg-warning/20 text-warning-foreground"
                    }`}>
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
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Lumin House AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
