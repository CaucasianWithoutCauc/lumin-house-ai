"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, Activity, Cpu, HardDrive, Thermometer, Clock,
  RefreshCw, ArrowUp, ArrowDown, Server, Gauge, MemoryStick
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface MetricData {
  timestamp: string;
  value: number;
}

interface InstanceMetrics {
  id: string;
  name: string;
  gpu: string;
  region: string;
  gpuUtilization: MetricData[];
  gpuMemory: MetricData[];
  gpuTemp: MetricData[];
  cpuUtilization: MetricData[];
  networkIn: MetricData[];
  networkOut: MetricData[];
  diskUsage: number;
}

// Generate mock time series data
const generateMetrics = (baseValue: number, variance: number, count: number): MetricData[] => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const time = new Date(now.getTime() - (count - i - 1) * 30000);
    return {
      timestamp: time.toLocaleTimeString(),
      value: Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * variance * 2)),
    };
  });
};

const mockInstanceMetrics: InstanceMetrics[] = [
  {
    id: "inst_1",
    name: "training-node-01",
    gpu: "RTX 4090 24GB × 8",
    region: "Hong Kong",
    gpuUtilization: generateMetrics(85, 10, 60),
    gpuMemory: generateMetrics(72, 5, 60),
    gpuTemp: generateMetrics(68, 8, 60),
    cpuUtilization: generateMetrics(45, 15, 60),
    networkIn: generateMetrics(450, 100, 60),
    networkOut: generateMetrics(120, 50, 60),
    diskUsage: 67,
  },
  {
    id: "inst_2",
    name: "inference-prod",
    gpu: "H100 80GB × 8",
    region: "Singapore",
    gpuUtilization: generateMetrics(45, 20, 60),
    gpuMemory: generateMetrics(38, 10, 60),
    gpuTemp: generateMetrics(55, 5, 60),
    cpuUtilization: generateMetrics(22, 10, 60),
    networkIn: generateMetrics(850, 150, 60),
    networkOut: generateMetrics(320, 80, 60),
    diskUsage: 42,
  },
];

// Simple sparkline chart component
function SparklineChart({ data, color, height = 40 }: { data: MetricData[]; color: string; height?: number }) {
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height, width: '100%' }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// Mini bar chart for GPU utilization
function BarChart({ data, color }: { data: MetricData[]; color: string }) {
  const recentData = data.slice(-20);
  
  return (
    <div className="flex items-end gap-0.5 h-12">
      {recentData.map((d, i) => (
        <div
          key={i}
          className="flex-1 rounded-t"
          style={{
            height: `${d.value}%`,
            backgroundColor: color,
            opacity: 0.3 + (i / recentData.length) * 0.7,
          }}
        />
      ))}
    </div>
  );
}

export default function MonitoringPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [instances, setInstances] = useState<InstanceMetrics[]>(mockInstanceMetrics);
  const [selectedInstance, setSelectedInstance] = useState<InstanceMetrics>(mockInstanceMetrics[0]);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setInstances(prev => prev.map(inst => ({
        ...inst,
        gpuUtilization: [...inst.gpuUtilization.slice(1), {
          timestamp: new Date().toLocaleTimeString(),
          value: Math.max(0, Math.min(100, inst.gpuUtilization[inst.gpuUtilization.length - 1].value + (Math.random() - 0.5) * 10)),
        }],
        gpuMemory: [...inst.gpuMemory.slice(1), {
          timestamp: new Date().toLocaleTimeString(),
          value: Math.max(0, Math.min(100, inst.gpuMemory[inst.gpuMemory.length - 1].value + (Math.random() - 0.5) * 5)),
        }],
        gpuTemp: [...inst.gpuTemp.slice(1), {
          timestamp: new Date().toLocaleTimeString(),
          value: Math.max(40, Math.min(90, inst.gpuTemp[inst.gpuTemp.length - 1].value + (Math.random() - 0.5) * 4)),
        }],
        cpuUtilization: [...inst.cpuUtilization.slice(1), {
          timestamp: new Date().toLocaleTimeString(),
          value: Math.max(0, Math.min(100, inst.cpuUtilization[inst.cpuUtilization.length - 1].value + (Math.random() - 0.5) * 8)),
        }],
      })));
      setLastUpdate(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Update selected instance when instances update
  useEffect(() => {
    const updated = instances.find(i => i.id === selectedInstance.id);
    if (updated) {
      setSelectedInstance(updated);
    }
  }, [instances, selectedInstance.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const currentGpuUtil = selectedInstance.gpuUtilization[selectedInstance.gpuUtilization.length - 1].value;
  const currentGpuMem = selectedInstance.gpuMemory[selectedInstance.gpuMemory.length - 1].value;
  const currentGpuTemp = selectedInstance.gpuTemp[selectedInstance.gpuTemp.length - 1].value;
  const currentCpuUtil = selectedInstance.cpuUtilization[selectedInstance.cpuUtilization.length - 1].value;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Lumin House AI</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Real-Time Monitoring</h1>
              <p className="text-muted-foreground">
                GPU performance metrics with 30-second granularity
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
              </div>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm"
              >
                <option value={30}>30s refresh</option>
                <option value={60}>1m refresh</option>
                <option value={300}>5m refresh</option>
              </select>
            </div>
          </div>

          {/* Instance Selector */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {instances.map((inst) => (
              <button
                key={inst.id}
                onClick={() => setSelectedInstance(inst)}
                className={`flex-shrink-0 p-4 rounded-xl border transition-colors ${
                  selectedInstance.id === inst.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Server className="h-5 w-5 text-primary" />
                  <span className="font-medium">{inst.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{inst.gpu}</p>
                <p className="text-xs text-muted-foreground">{inst.region}</p>
              </button>
            ))}
          </div>

          {/* Real-time Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">GPU Util</span>
                </div>
                <span className={`text-2xl font-bold ${
                  currentGpuUtil > 90 ? "text-success-foreground" : 
                  currentGpuUtil > 50 ? "text-primary" : "text-muted-foreground"
                }`}>
                  {currentGpuUtil.toFixed(1)}%
                </span>
              </div>
              <BarChart data={selectedInstance.gpuUtilization} color="hsl(263, 70%, 50%)" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MemoryStick className="h-5 w-5 text-blue-400" />
                  <span className="text-sm text-muted-foreground">GPU Mem</span>
                </div>
                <span className={`text-2xl font-bold ${
                  currentGpuMem > 90 ? "text-destructive" : 
                  currentGpuMem > 70 ? "text-warning-foreground" : "text-blue-400"
                }`}>
                  {currentGpuMem.toFixed(1)}%
                </span>
              </div>
              <BarChart data={selectedInstance.gpuMemory} color="hsl(217, 91%, 60%)" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-orange-400" />
                  <span className="text-sm text-muted-foreground">GPU Temp</span>
                </div>
                <span className={`text-2xl font-bold ${
                  currentGpuTemp > 80 ? "text-destructive" : 
                  currentGpuTemp > 70 ? "text-warning-foreground" : "text-success-foreground"
                }`}>
                  {currentGpuTemp.toFixed(0)}°C
                </span>
              </div>
              <BarChart data={selectedInstance.gpuTemp} color="hsl(25, 95%, 53%)" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-success-foreground" />
                  <span className="text-sm text-muted-foreground">CPU Util</span>
                </div>
                <span className="text-2xl font-bold text-success-foreground">
                  {currentCpuUtil.toFixed(1)}%
                </span>
              </div>
              <BarChart data={selectedInstance.cpuUtilization} color="hsl(142, 71%, 45%)" />
            </motion.div>
          </div>

          {/* Detailed Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* GPU Utilization Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">GPU Utilization (30min)</h3>
                <span className="text-sm text-muted-foreground">
                  Avg: {(selectedInstance.gpuUtilization.reduce((a, b) => a + b.value, 0) / selectedInstance.gpuUtilization.length).toFixed(1)}%
                </span>
              </div>
              <div className="h-40">
                <SparklineChart data={selectedInstance.gpuUtilization} color="hsl(263, 70%, 50%)" height={160} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{selectedInstance.gpuUtilization[0]?.timestamp}</span>
                <span>{selectedInstance.gpuUtilization[selectedInstance.gpuUtilization.length - 1]?.timestamp}</span>
              </div>
            </motion.div>

            {/* GPU Memory Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">GPU Memory Usage (30min)</h3>
                <span className="text-sm text-muted-foreground">
                  Avg: {(selectedInstance.gpuMemory.reduce((a, b) => a + b.value, 0) / selectedInstance.gpuMemory.length).toFixed(1)}%
                </span>
              </div>
              <div className="h-40">
                <SparklineChart data={selectedInstance.gpuMemory} color="hsl(217, 91%, 60%)" height={160} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{selectedInstance.gpuMemory[0]?.timestamp}</span>
                <span>{selectedInstance.gpuMemory[selectedInstance.gpuMemory.length - 1]?.timestamp}</span>
              </div>
            </motion.div>

            {/* Temperature Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">GPU Temperature (30min)</h3>
                <span className="text-sm text-muted-foreground">
                  Max: {Math.max(...selectedInstance.gpuTemp.map(d => d.value)).toFixed(0)}°C
                </span>
              </div>
              <div className="h-40">
                <SparklineChart data={selectedInstance.gpuTemp} color="hsl(25, 95%, 53%)" height={160} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{selectedInstance.gpuTemp[0]?.timestamp}</span>
                <span>{selectedInstance.gpuTemp[selectedInstance.gpuTemp.length - 1]?.timestamp}</span>
              </div>
            </motion.div>

            {/* Network I/O */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Network I/O</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowDown className="h-4 w-4 text-success-foreground" />
                    <span className="text-sm text-muted-foreground">Inbound</span>
                  </div>
                  <p className="text-xl font-bold text-success-foreground">
                    {selectedInstance.networkIn[selectedInstance.networkIn.length - 1].value.toFixed(0)} MB/s
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowUp className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-muted-foreground">Outbound</span>
                  </div>
                  <p className="text-xl font-bold text-blue-400">
                    {selectedInstance.networkOut[selectedInstance.networkOut.length - 1].value.toFixed(0)} MB/s
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Disk Usage</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${selectedInstance.diskUsage}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{selectedInstance.diskUsage}% used</p>
              </div>
            </motion.div>
          </div>

          {/* GPU Per-Card Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <h3 className="font-semibold mb-4">Individual GPU Status</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted text-center">
                  <p className="text-xs text-muted-foreground mb-1">GPU {i}</p>
                  <p className="font-bold text-lg">{(currentGpuUtil + (Math.random() - 0.5) * 10).toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">{(currentGpuTemp + (Math.random() - 0.5) * 5).toFixed(0)}°C</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
