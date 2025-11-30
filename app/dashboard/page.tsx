"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, Server, CreditCard, Settings, LogOut, Plus, Play, Square, Trash2,
  Clock, Cpu, HardDrive, Activity, DollarSign, ChevronRight, Bell, User,
  BarChart3, Wallet, RefreshCw, Key, Terminal, BookOpen, Copy, Check,
  ExternalLink, RotateCcw, FileCode2, HelpCircle, Camera, Layers, Network,
  Gift, Users
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface Instance {
  id: string;
  name: string;
  gpu: string;
  status: "running" | "stopped" | "starting";
  region: string;
  hourlyRate: number;
  uptime: string;
  createdAt: string;
  sshHost?: string;
  jupyterUrl?: string;
}

interface SSHKey {
  id: string;
  name: string;
  fingerprint: string;
  createdAt: string;
}

// Mock instances data
const mockInstances: Instance[] = [
  {
    id: "inst_1",
    name: "training-node-01",
    gpu: "RTX 4090 24GB × 8",
    status: "running",
    region: "Hong Kong",
    hourlyRate: 1.60,
    uptime: "12h 34m",
    createdAt: "2024-01-15",
    sshHost: "ssh root@hk1.lumin.ai -p 22001",
    jupyterUrl: "https://jupyter-inst1.lumin.ai",
  },
  {
    id: "inst_2",
    name: "inference-server",
    gpu: "H100 80GB × 8",
    status: "stopped",
    region: "Singapore",
    hourlyRate: 14.72,
    uptime: "0h 0m",
    createdAt: "2024-01-10",
    sshHost: "ssh root@sg1.lumin.ai -p 22002",
    jupyterUrl: "https://jupyter-inst2.lumin.ai",
  },
];

// Mock SSH keys
const mockSSHKeys: SSHKey[] = [
  {
    id: "key_1",
    name: "MacBook Pro",
    fingerprint: "SHA256:abc123...xyz",
    createdAt: "2024-01-01",
  },
];

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [instances, setInstances] = useState<Instance[]>(mockInstances);
  const [sshKeys, setSSHKeys] = useState<SSHKey[]>(mockSSHKeys);
  const [activeTab, setActiveTab] = useState("instances");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showAddKey, setShowAddKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyContent, setNewKeyContent] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const toggleInstance = (id: string) => {
    setInstances(instances.map(inst => {
      if (inst.id === id) {
        return {
          ...inst,
          status: inst.status === "running" ? "stopped" : "starting"
        };
      }
      return inst;
    }));

    // Simulate starting delay
    setTimeout(() => {
      setInstances(prev => prev.map(inst => {
        if (inst.id === id && inst.status === "starting") {
          return { ...inst, status: "running" };
        }
        return inst;
      }));
    }, 2000);
  };

  const deleteInstance = (id: string) => {
    setInstances(instances.filter(inst => inst.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const addSSHKey = () => {
    if (newKeyName && newKeyContent) {
      const newKey: SSHKey = {
        id: `key_${Date.now()}`,
        name: newKeyName,
        fingerprint: `SHA256:${Math.random().toString(36).substr(2, 9)}...`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setSSHKeys([...sshKeys, newKey]);
      setNewKeyName("");
      setNewKeyContent("");
      setShowAddKey(false);
    }
  };

  const deleteSSHKey = (id: string) => {
    setSSHKeys(sshKeys.filter(key => key.id !== id));
  };

  const reinstallInstance = (id: string) => {
    // Simulate reinstall
    setInstances(instances.map(inst => {
      if (inst.id === id) {
        return { ...inst, status: "starting" as const };
      }
      return inst;
    }));
    setTimeout(() => {
      setInstances(prev => prev.map(inst => {
        if (inst.id === id) {
          return { ...inst, status: "running" as const };
        }
        return inst;
      }));
    }, 3000);
  };

  const runningInstances = instances.filter(i => i.status === "running").length;
  const totalHourlySpend = instances
    .filter(i => i.status === "running")
    .reduce((acc, i) => acc + i.hourlyRate, 0);

  const sidebarItems = [
    { id: "instances", label: "Instances", icon: Server },
    { id: "ssh-keys", label: "SSH Keys", icon: Key },
    { id: "snapshots", label: "Snapshots", icon: Camera, href: "/snapshots" },
    { id: "images", label: "Images", icon: Layers, href: "/images" },
    { id: "network", label: "Network & VPC", icon: Network, href: "/network" },
    { id: "monitoring", label: "Monitoring", icon: Activity, href: "/monitoring" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
    { id: "billing", label: "Billing", icon: CreditCard, href: "/billing-history" },
    { id: "api-keys", label: "API Keys", icon: Key, href: "/api-keys" },
    { id: "team", label: "Team", icon: Users, href: "/team" },
    { id: "referrals", label: "Referrals", icon: Gift, href: "/referrals" },
    { id: "support", label: "Support", icon: HelpCircle, href: "/support" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r border-border">
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Lumin House AI</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            }
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border border-input text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-card border border-border">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">${user.balance.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Credits</span>
            </Link>
            <button className="p-2 rounded-lg hover:bg-accent">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "instances" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Instances</p>
                      <p className="text-2xl font-bold">{runningInstances}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Server className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Hourly Spend</p>
                      <p className="text-2xl font-bold">${totalHourlySpend.toFixed(2)}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-warning-foreground" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total GPUs</p>
                      <p className="text-2xl font-bold">{instances.length * 8}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                      <Cpu className="h-5 w-5 text-success-foreground" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="text-2xl font-bold">${user.balance.toFixed(2)}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Deploy Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Your Instances</h2>
                <Link
                  href="/deploy"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Deploy New Instance
                </Link>
              </div>

              {/* Instances List */}
              {instances.length === 0 ? (
                <div className="text-center py-12 rounded-xl border border-dashed border-border">
                  <Server className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No instances yet</h3>
                  <p className="text-muted-foreground mb-4">Deploy your first GPU instance to get started</p>
                  <Link
                    href="/deploy"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Deploy Instance
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {instances.map((instance) => (
                    <motion.div
                      key={instance.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl border border-border bg-card"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`h-3 w-3 rounded-full ${
                            instance.status === "running" ? "bg-success-foreground animate-pulse" :
                            instance.status === "starting" ? "bg-warning-foreground animate-pulse" :
                            "bg-muted-foreground"
                          }`} />
                          <div>
                            <h3 className="font-medium">{instance.name}</h3>
                            <p className="text-sm text-muted-foreground">{instance.gpu}</p>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center space-x-6 text-sm">
                          <div>
                            <p className="text-muted-foreground">Region</p>
                            <p className="font-medium">{instance.region}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Uptime</p>
                            <p className="font-medium">{instance.uptime}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Cost/hr</p>
                            <p className="font-medium text-success-foreground">${instance.hourlyRate.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleInstance(instance.id)}
                            className={`p-2 rounded-lg ${
                              instance.status === "running"
                                ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
                                : "bg-success/20 text-success-foreground hover:bg-success/30"
                            }`}
                            title={instance.status === "running" ? "Stop" : "Start"}
                          >
                            {instance.status === "running" ? (
                              <Square className="h-4 w-4" />
                            ) : instance.status === "starting" ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => reinstallInstance(instance.id)}
                            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                            title="Reinstall OS"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteInstance(instance.id)}
                            className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      {instance.status === "running" && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                          {/* SSH Access */}
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                            <Terminal className="h-4 w-4 text-muted-foreground" />
                            <code className="text-xs font-mono">{instance.sshHost}</code>
                            <button
                              onClick={() => copyToClipboard(instance.sshHost || "")}
                              className="p-1 rounded hover:bg-accent"
                            >
                              {copiedText === instance.sshHost ? (
                                <Check className="h-3 w-3 text-success-foreground" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>

                          {/* Jupyter Notebook */}
                          <a
                            href={instance.jupyterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                          >
                            <BookOpen className="h-4 w-4" />
                            <span className="text-sm font-medium">Jupyter</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>

                          {/* VS Code */}
                          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                            <FileCode2 className="h-4 w-4" />
                            <span className="text-sm font-medium">VS Code</span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "ssh-keys" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">SSH Keys</h2>
                  <p className="text-sm text-muted-foreground">Manage SSH keys for accessing your instances</p>
                </div>
                <button
                  onClick={() => setShowAddKey(true)}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add SSH Key
                </button>
              </div>

              {showAddKey && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl border border-primary bg-card"
                >
                  <h3 className="text-lg font-semibold mb-4">Add New SSH Key</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Key Name</label>
                      <input
                        type="text"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="e.g., MacBook Pro"
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Public Key</label>
                      <textarea
                        value={newKeyContent}
                        onChange={(e) => setNewKeyContent(e.target.value)}
                        placeholder="ssh-rsa AAAA... or ssh-ed25519 AAAA..."
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background font-mono text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowAddKey(false)}
                        className="px-4 py-2 rounded-lg border border-input hover:bg-accent"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addSSHKey}
                        disabled={!newKeyName || !newKeyContent}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                      >
                        Add Key
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {sshKeys.length === 0 ? (
                <div className="text-center py-12 rounded-xl border border-dashed border-border">
                  <Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No SSH keys</h3>
                  <p className="text-muted-foreground mb-4">Add an SSH key to access your instances</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sshKeys.map((key) => (
                    <div
                      key={key.id}
                      className="p-4 rounded-xl border border-border bg-card flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <Key className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium">{key.name}</h3>
                          <p className="text-sm text-muted-foreground font-mono">{key.fingerprint}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Added {key.createdAt}</span>
                        <button
                          onClick={() => deleteSSHKey(key.id)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-semibold mb-4">Account Balance</h3>
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-4xl font-bold">${user.balance.toFixed(2)}</span>
                  <span className="text-muted-foreground">USD</span>
                </div>
                <Link
                  href="/checkout"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Add Credits
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                <p className="text-muted-foreground mb-4">We accept cryptocurrency payments:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {["BTC", "ETH", "USDT", "USDC"].map((crypto) => (
                    <div key={crypto} className="p-4 rounded-lg border border-border text-center">
                      <span className="font-medium">{crypto}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <Activity className="h-8 w-8 mr-2" />
                Usage charts coming soon
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Display Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full max-w-md px-4 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full max-w-md px-4 py-2 rounded-lg border border-input bg-background"
                      disabled
                    />
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
