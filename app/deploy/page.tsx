"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, ArrowLeft, ArrowRight, Server, Cpu, MapPin, Clock, 
  Check, ChevronRight, Info, Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

// GPU configurations from user's inventory
const gpuConfigs = [
  {
    id: "rtx-4090-24gb",
    name: "RTX 4090 24GB",
    vram: "24GB GDDR6X",
    gpuCount: 8,
    hourlyPrice: 0.20,
    specs: {
      cpu: "2× Intel Xeon Gold 6330/6530",
      memory: "512GB DDR5",
      storage: "3.84TB NVMe × 2",
      network: "25 GbE dual-port",
    },
    configs: ["Config A", "Config B"],
  },
  {
    id: "rtx-4090-48gb",
    name: "RTX 4090 48GB",
    vram: "48GB GDDR6X",
    gpuCount: 8,
    hourlyPrice: 0.29,
    specs: {
      cpu: "2× Intel Xeon Gold 8570/6530",
      memory: "512GB DDR5-5600",
      storage: "3.84TB NVMe",
      network: "25 GbE dual-port × 2",
    },
    configs: ["Config C", "Config D"],
  },
  {
    id: "rtx-5090-32gb",
    name: "RTX 5090 32GB",
    vram: "32GB GDDR7",
    gpuCount: 8,
    hourlyPrice: 0.34,
    specs: {
      cpu: "2× Intel Xeon Gold 6530 (32C/64T)",
      memory: "1TB DDR5-4800",
      storage: "3.84TB NVMe U.2 × 2",
      network: "25 GbE × 2 + 100 GbE RDMA",
    },
    configs: ["Config E", "Config F"],
  },
  {
    id: "h100-80gb",
    name: "NVIDIA H100 80GB",
    vram: "80GB HBM3",
    gpuCount: 8,
    hourlyPrice: 1.84,
    specs: {
      cpu: "2× Intel 8558/8468 (48C)",
      memory: "2TB DDR5-5600",
      storage: "7.68TB NVMe × 2-4",
      network: "400 GbE × 8 + 200 GbE IB",
    },
    configs: ["Config G", "Config H"],
  },
  {
    id: "h200-141gb",
    name: "NVIDIA H200 141GB",
    vram: "141GB HBM3e",
    gpuCount: 8,
    hourlyPrice: 2.28,
    specs: {
      cpu: "2× Intel Xeon Platinum 8558/8468",
      memory: "2TB DDR5",
      storage: "3.84TB U.2 NVMe × 4",
      network: "400 GbE/NDR × 8 + 200 GbE",
    },
    configs: ["Config I", "Config J"],
  },
  {
    id: "b200-180gb",
    name: "NVIDIA B200 180GB",
    vram: "180GB HBM3e",
    gpuCount: 8,
    hourlyPrice: 3.38,
    specs: {
      cpu: "2× Intel 6960P (72C, 2.7GHz)",
      memory: "2.25TB DDR5-6400",
      storage: "7.68TB NVMe × 8",
      network: "400 GbE × 8",
    },
    configs: ["Config K"],
  },
];

const regions = [
  { id: "hk", name: "Hong Kong", flag: "🇭🇰", latency: "12ms" },
  { id: "sg", name: "Singapore", flag: "🇸🇬", latency: "18ms" },
  { id: "jp", name: "Tokyo", flag: "🇯🇵", latency: "25ms" },
  { id: "us", name: "San Francisco", flag: "🇺🇸", latency: "120ms" },
];

const billingOptions = [
  { id: "hourly", name: "Pay As You Go", description: "Billed per hour", discount: 0 },
  { id: "monthly", name: "Monthly", description: "Billed monthly", discount: 15 },
  { id: "yearly", name: "1 Year", description: "Billed yearly", discount: 25 },
  { id: "3year", name: "3 Years", description: "Billed every 3 years", discount: 35 },
];

export default function DeployPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedGpu, setSelectedGpu] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("hk");
  const [selectedBilling, setSelectedBilling] = useState("hourly");
  const [instanceName, setInstanceName] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const selectedGpuConfig = gpuConfigs.find(g => g.id === selectedGpu);
  const selectedBillingOption = billingOptions.find(b => b.id === selectedBilling);

  const calculatePrice = () => {
    if (!selectedGpuConfig || !selectedBillingOption) return 0;
    const basePrice = selectedGpuConfig.hourlyPrice * selectedGpuConfig.gpuCount;
    const discount = selectedBillingOption.discount / 100;
    return basePrice * (1 - discount);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="p-2 rounded-lg hover:bg-accent">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Lumin House AI</span>
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            Balance: <span className="font-medium text-foreground">${user.balance.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                  s < step ? "bg-primary text-primary-foreground" :
                  s === step ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {s < step ? <Check className="h-4 w-4" /> : s}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${
                  s <= step ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {s === 1 ? "Select GPU" : s === 2 ? "Region" : s === 3 ? "Billing" : "Deploy"}
                </span>
                {s < 4 && <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Step 1: Select GPU */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Select GPU Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gpuConfigs.map((gpu) => (
                <button
                  key={gpu.id}
                  onClick={() => setSelectedGpu(gpu.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedGpu === gpu.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{gpu.name}</h3>
                      <p className="text-sm text-muted-foreground">{gpu.vram} × {gpu.gpuCount} GPUs</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success-foreground">${gpu.hourlyPrice.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">/GPU/hr</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">CPU:</span> {gpu.specs.cpu}</p>
                    <p><span className="text-muted-foreground">RAM:</span> {gpu.specs.memory}</p>
                    <p><span className="text-muted-foreground">Storage:</span> {gpu.specs.storage}</p>
                  </div>
                  {selectedGpu === gpu.id && (
                    <div className="mt-3 flex items-center text-primary">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-sm">Selected</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Region */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Select Region</h2>
            <div className="space-y-3">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedRegion === region.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <h3 className="font-semibold">{region.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {region.latency} latency
                      </p>
                    </div>
                  </div>
                  {selectedRegion === region.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Billing */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Select Billing Plan</h2>
            <div className="space-y-3">
              {billingOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedBilling(option.id)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedBilling === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div>
                    <h3 className="font-semibold">{option.name}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {option.discount > 0 && (
                      <span className="px-2 py-1 rounded-full bg-success/20 text-success-foreground text-xs font-medium">
                        Save {option.discount}%
                      </span>
                    )}
                    {selectedBilling === option.id && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Review & Deploy */}
        {step === 4 && selectedGpuConfig && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Review & Deploy</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Instance Name</label>
                <input
                  type="text"
                  value={instanceName}
                  onChange={(e) => setInstanceName(e.target.value)}
                  placeholder="my-training-node"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                />
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-4">Configuration Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GPU</span>
                    <span className="font-medium">{selectedGpuConfig.name} × {selectedGpuConfig.gpuCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VRAM</span>
                    <span className="font-medium">{selectedGpuConfig.vram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="font-medium">{selectedGpuConfig.specs.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Memory</span>
                    <span className="font-medium">{selectedGpuConfig.specs.memory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-medium">{selectedGpuConfig.specs.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network</span>
                    <span className="font-medium">{selectedGpuConfig.specs.network}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region</span>
                    <span className="font-medium">{regions.find(r => r.id === selectedRegion)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing</span>
                    <span className="font-medium">{selectedBillingOption?.name}</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-success-foreground">
                        ${calculatePrice().toFixed(2)}/hr
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-start space-x-3">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Deployment takes less than 60 seconds</p>
                  <p className="text-muted-foreground">Your instance will be ready for SSH access immediately after deployment.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8 flex justify-between">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="flex items-center px-4 py-2 rounded-lg border border-input hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !selectedGpu}
              className="flex items-center px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleDeploy}
              disabled={isDeploying || !instanceName}
              className="flex items-center px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  Deploy Instance
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
