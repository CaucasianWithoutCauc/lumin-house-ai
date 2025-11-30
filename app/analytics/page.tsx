"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, BarChart3, TrendingUp, TrendingDown, DollarSign, Cpu, Clock,
  ArrowLeft, Calendar, Download, Filter, ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";

interface UsageData {
  date: string;
  gpuHours: number;
  cost: number;
  instances: number;
}

interface GPUBreakdown {
  gpu: string;
  hours: number;
  cost: number;
  percentage: number;
}

const mockDailyUsage: UsageData[] = [
  { date: "Jan 15", gpuHours: 192, cost: 38.40, instances: 1 },
  { date: "Jan 16", gpuHours: 384, cost: 76.80, instances: 2 },
  { date: "Jan 17", gpuHours: 576, cost: 115.20, instances: 3 },
  { date: "Jan 18", gpuHours: 480, cost: 96.00, instances: 2 },
  { date: "Jan 19", gpuHours: 288, cost: 57.60, instances: 1 },
  { date: "Jan 20", gpuHours: 672, cost: 134.40, instances: 3 },
  { date: "Jan 21", gpuHours: 768, cost: 153.60, instances: 4 },
];

const mockGPUBreakdown: GPUBreakdown[] = [
  { gpu: "RTX 4090 24GB", hours: 1920, cost: 384.00, percentage: 45 },
  { gpu: "H100 80GB", hours: 480, cost: 883.20, percentage: 35 },
  { gpu: "RTX 5090 32GB", hours: 960, cost: 326.40, percentage: 20 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState<"cost" | "hours">("cost");

  const totalCost = mockDailyUsage.reduce((acc, d) => acc + d.cost, 0);
  const totalHours = mockDailyUsage.reduce((acc, d) => acc + d.gpuHours, 0);
  const avgDaily = totalCost / mockDailyUsage.length;
  const projectedMonthly = avgDaily * 30;

  // Calculate trend (compare last 3 days to previous 3)
  const recentAvg = mockDailyUsage.slice(-3).reduce((acc, d) => acc + d.cost, 0) / 3;
  const previousAvg = mockDailyUsage.slice(-6, -3).reduce((acc, d) => acc + d.cost, 0) / 3;
  const trendPercentage = ((recentAvg - previousAvg) / previousAvg) * 100;

  // Find max value for chart scaling
  const maxValue = Math.max(...mockDailyUsage.map(d => selectedMetric === "cost" ? d.cost : d.gpuHours));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="p-2 rounded-lg hover:bg-accent">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Usage Analytics</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-input bg-background text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input hover:bg-accent text-sm">
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spend</p>
                <p className="text-3xl font-bold">${totalCost.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-1">Last 7 days</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">GPU Hours</p>
                <p className="text-3xl font-bold">{totalHours.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">Last 7 days</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-success-foreground" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Average</p>
                <p className="text-3xl font-bold">${avgDaily.toFixed(2)}</p>
                <div className={`flex items-center gap-1 text-sm mt-1 ${
                  trendPercentage >= 0 ? "text-destructive" : "text-success-foreground"
                }`}>
                  {trendPercentage >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {Math.abs(trendPercentage).toFixed(1)}% vs prev
                </div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-warning-foreground" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projected Monthly</p>
                <p className="text-3xl font-bold">${projectedMonthly.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground mt-1">Based on current usage</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Daily Usage</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric("cost")}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  selectedMetric === "cost"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                Cost ($)
              </button>
              <button
                onClick={() => setSelectedMetric("hours")}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  selectedMetric === "hours"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                GPU Hours
              </button>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="h-64 flex items-end gap-2">
            {mockDailyUsage.map((day, index) => {
              const value = selectedMetric === "cost" ? day.cost : day.gpuHours;
              const height = (value / maxValue) * 100;
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="w-full bg-primary rounded-t-lg relative group cursor-pointer"
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-card border border-border text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {selectedMetric === "cost" ? `$${value.toFixed(2)}` : `${value} hours`}
                    </div>
                  </motion.div>
                  <span className="text-xs text-muted-foreground">{day.date}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* GPU Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <h2 className="text-lg font-semibold mb-6">Usage by GPU Type</h2>
          <div className="space-y-6">
            {mockGPUBreakdown.map((gpu, index) => (
              <div key={gpu.gpu}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Cpu className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{gpu.gpu}</p>
                      <p className="text-sm text-muted-foreground">{gpu.hours} hours</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${gpu.cost.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{gpu.percentage}%</p>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${gpu.percentage}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cost Optimization Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <h2 className="text-lg font-semibold mb-4">💡 Cost Optimization Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-medium mb-2">Use Spot Instances</h3>
              <p className="text-sm text-muted-foreground">
                Save up to 70% on fault-tolerant workloads by using spot instances for training jobs.
              </p>
              <p className="text-sm text-primary mt-2">Potential savings: $${(totalCost * 0.4).toFixed(0)}/week</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-medium mb-2">Reserved Instances</h3>
              <p className="text-sm text-muted-foreground">
                Commit to 1-year or 3-year terms for up to 40% discount on predictable workloads.
              </p>
              <p className="text-sm text-primary mt-2">Potential savings: $${(totalCost * 0.25).toFixed(0)}/week</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <h3 className="font-medium mb-2">Auto-stop Idle Instances</h3>
              <p className="text-sm text-muted-foreground">
                Enable auto-stop for instances idle more than 30 minutes to avoid wasted compute.
              </p>
              <p className="text-sm text-primary mt-2">Enable in Settings →</p>
            </div>
          </div>
        </motion.div>

        {/* Detailed Usage Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-semibold">Detailed Usage</h2>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-input hover:bg-accent text-sm">
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Instances</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">GPU Hours</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockDailyUsage.map((day) => (
                  <tr key={day.date} className="hover:bg-muted/50">
                    <td className="p-4 font-medium">{day.date}, 2024</td>
                    <td className="p-4">{day.instances} active</td>
                    <td className="p-4">{day.gpuHours} hours</td>
                    <td className="p-4 text-right font-medium">${day.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/50 font-semibold">
                <tr>
                  <td className="p-4">Total</td>
                  <td className="p-4">-</td>
                  <td className="p-4">{totalHours.toLocaleString()} hours</td>
                  <td className="p-4 text-right">${totalCost.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
