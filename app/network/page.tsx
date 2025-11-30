"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, Network, Plus, Trash2, Shield, Server, Globe,
  ArrowLeft, Check, AlertCircle, Lock, Unlock, Edit2, X
} from "lucide-react";
import { motion } from "framer-motion";

interface VPC {
  id: string;
  name: string;
  cidr: string;
  region: string;
  instanceCount: number;
  status: "active" | "creating";
  createdAt: string;
}

interface FirewallRule {
  id: string;
  vpcId: string;
  type: "inbound" | "outbound";
  protocol: "TCP" | "UDP" | "ICMP" | "All";
  portRange: string;
  source: string;
  description: string;
}

const mockVPCs: VPC[] = [
  {
    id: "vpc_1",
    name: "Production VPC",
    cidr: "10.0.0.0/16",
    region: "Hong Kong",
    instanceCount: 3,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "vpc_2",
    name: "Development VPC",
    cidr: "10.1.0.0/16",
    region: "Singapore",
    instanceCount: 1,
    status: "active",
    createdAt: "2024-01-15",
  },
];

const mockFirewallRules: FirewallRule[] = [
  {
    id: "fw_1",
    vpcId: "vpc_1",
    type: "inbound",
    protocol: "TCP",
    portRange: "22",
    source: "0.0.0.0/0",
    description: "SSH Access",
  },
  {
    id: "fw_2",
    vpcId: "vpc_1",
    type: "inbound",
    protocol: "TCP",
    portRange: "443",
    source: "0.0.0.0/0",
    description: "HTTPS",
  },
  {
    id: "fw_3",
    vpcId: "vpc_1",
    type: "inbound",
    protocol: "TCP",
    portRange: "8888",
    source: "0.0.0.0/0",
    description: "Jupyter Notebook",
  },
  {
    id: "fw_4",
    vpcId: "vpc_1",
    type: "outbound",
    protocol: "All",
    portRange: "All",
    source: "0.0.0.0/0",
    description: "Allow all outbound",
  },
];

export default function NetworkPage() {
  const [vpcs, setVPCs] = useState<VPC[]>(mockVPCs);
  const [firewallRules, setFirewallRules] = useState<FirewallRule[]>(mockFirewallRules);
  const [selectedVPC, setSelectedVPC] = useState<string | null>(vpcs[0]?.id || null);
  const [showCreateVPC, setShowCreateVPC] = useState(false);
  const [showAddRule, setShowAddRule] = useState(false);
  const [newVPCName, setNewVPCName] = useState("");
  const [newVPCRegion, setNewVPCRegion] = useState("Hong Kong");
  const [newRule, setNewRule] = useState({
    type: "inbound" as "inbound" | "outbound",
    protocol: "TCP" as "TCP" | "UDP" | "ICMP" | "All",
    portRange: "",
    source: "0.0.0.0/0",
    description: "",
  });

  const regions = ["Hong Kong", "Singapore", "Tokyo", "San Francisco"];

  const createVPC = () => {
    if (newVPCName) {
      const newVPC: VPC = {
        id: `vpc_${Date.now()}`,
        name: newVPCName,
        cidr: `10.${vpcs.length + 2}.0.0/16`,
        region: newVPCRegion,
        instanceCount: 0,
        status: "creating",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setVPCs([...vpcs, newVPC]);
      setNewVPCName("");
      setShowCreateVPC(false);

      setTimeout(() => {
        setVPCs((prev) =>
          prev.map((v) => (v.id === newVPC.id ? { ...v, status: "active" as const } : v))
        );
      }, 2000);
    }
  };

  const deleteVPC = (id: string) => {
    setVPCs(vpcs.filter((v) => v.id !== id));
    setFirewallRules(firewallRules.filter((r) => r.vpcId !== id));
    if (selectedVPC === id) {
      setSelectedVPC(vpcs[0]?.id || null);
    }
  };

  const addFirewallRule = () => {
    if (selectedVPC && newRule.portRange && newRule.description) {
      const rule: FirewallRule = {
        id: `fw_${Date.now()}`,
        vpcId: selectedVPC,
        ...newRule,
      };
      setFirewallRules([...firewallRules, rule]);
      setNewRule({
        type: "inbound",
        protocol: "TCP",
        portRange: "",
        source: "0.0.0.0/0",
        description: "",
      });
      setShowAddRule(false);
    }
  };

  const deleteFirewallRule = (id: string) => {
    setFirewallRules(firewallRules.filter((r) => r.id !== id));
  };

  const selectedVPCData = vpcs.find((v) => v.id === selectedVPC);
  const selectedVPCRules = firewallRules.filter((r) => r.vpcId === selectedVPC);

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
                <span className="font-bold text-lg">Network & VPC</span>
              </div>
            </div>
            <button
              onClick={() => setShowCreateVPC(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Create VPC
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Create VPC Modal */}
        {showCreateVPC && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-primary bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create Virtual Private Cloud</h2>
              <button onClick={() => setShowCreateVPC(false)} className="p-2 rounded-lg hover:bg-accent">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">VPC Name</label>
                <input
                  type="text"
                  value={newVPCName}
                  onChange={(e) => setNewVPCName(e.target.value)}
                  placeholder="e.g., Production VPC"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Region</label>
                <select
                  value={newVPCRegion}
                  onChange={(e) => setNewVPCRegion(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">
                  🔒 A VPC provides isolated network for your instances. All instances within a VPC can 
                  communicate with each other over a private network with 10 Gbps bandwidth.
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateVPC(false)}
                  className="px-4 py-2 rounded-lg border border-input hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  onClick={createVPC}
                  disabled={!newVPCName}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  Create VPC
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* VPC List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold">Your VPCs</h2>
            {vpcs.length === 0 ? (
              <div className="p-6 rounded-xl border border-dashed border-border text-center">
                <Network className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm">No VPCs yet</p>
              </div>
            ) : (
              vpcs.map((vpc) => (
                <div
                  key={vpc.id}
                  onClick={() => setSelectedVPC(vpc.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                    selectedVPC === vpc.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{vpc.name}</h3>
                      <p className="text-sm text-muted-foreground">{vpc.cidr}</p>
                    </div>
                    {vpc.status === "creating" ? (
                      <span className="px-2 py-1 rounded text-xs bg-primary/20 text-primary">
                        Creating...
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs bg-success/20 text-success-foreground">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      <Globe className="h-4 w-4 inline mr-1" />
                      {vpc.region}
                    </span>
                    <span className="text-muted-foreground">
                      <Server className="h-4 w-4 inline mr-1" />
                      {vpc.instanceCount} instances
                    </span>
                  </div>
                </div>
              ))
            )}
          </motion.div>

          {/* Firewall Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Firewall Rules {selectedVPCData && `- ${selectedVPCData.name}`}
              </h2>
              {selectedVPC && (
                <button
                  onClick={() => setShowAddRule(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Rule
                </button>
              )}
            </div>

            {/* Add Rule Modal */}
            {showAddRule && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-primary bg-card"
              >
                <h3 className="text-sm font-semibold mb-3">New Firewall Rule</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <select
                    value={newRule.type}
                    onChange={(e) => setNewRule({ ...newRule, type: e.target.value as "inbound" | "outbound" })}
                    className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  >
                    <option value="inbound">Inbound</option>
                    <option value="outbound">Outbound</option>
                  </select>
                  <select
                    value={newRule.protocol}
                    onChange={(e) => setNewRule({ ...newRule, protocol: e.target.value as "TCP" | "UDP" | "ICMP" | "All" })}
                    className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  >
                    <option value="TCP">TCP</option>
                    <option value="UDP">UDP</option>
                    <option value="ICMP">ICMP</option>
                    <option value="All">All</option>
                  </select>
                  <input
                    type="text"
                    value={newRule.portRange}
                    onChange={(e) => setNewRule({ ...newRule, portRange: e.target.value })}
                    placeholder="Port (e.g., 22)"
                    className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                  <input
                    type="text"
                    value={newRule.source}
                    onChange={(e) => setNewRule({ ...newRule, source: e.target.value })}
                    placeholder="Source CIDR"
                    className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                  <input
                    type="text"
                    value={newRule.description}
                    onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                    placeholder="Description"
                    className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => setShowAddRule(false)}
                    className="px-3 py-1.5 rounded-lg border border-input hover:bg-accent text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addFirewallRule}
                    className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
                  >
                    Add Rule
                  </button>
                </div>
              </motion.div>
            )}

            {/* Rules Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/50">
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground">
                  <span>Direction</span>
                  <span>Protocol</span>
                  <span>Port</span>
                  <span>Source/Dest</span>
                  <span>Description</span>
                  <span></span>
                </div>
              </div>
              {selectedVPCRules.length === 0 ? (
                <div className="p-8 text-center">
                  <Shield className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground text-sm">No firewall rules configured</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {selectedVPCRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="p-4 grid grid-cols-6 gap-4 items-center text-sm hover:bg-muted/50"
                    >
                      <span className={`inline-flex items-center gap-1 ${
                        rule.type === "inbound" ? "text-success-foreground" : "text-blue-400"
                      }`}>
                        {rule.type === "inbound" ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                        {rule.type}
                      </span>
                      <span>{rule.protocol}</span>
                      <span className="font-mono">{rule.portRange}</span>
                      <span className="font-mono text-xs">{rule.source}</span>
                      <span className="text-muted-foreground">{rule.description}</span>
                      <button
                        onClick={() => deleteFirewallRule(rule.id)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 justify-self-end"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* VPC Info */}
            {selectedVPCData && (
              <div className="p-4 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-3">VPC Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">CIDR Block</p>
                    <p className="font-mono">{selectedVPCData.cidr}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Region</p>
                    <p>{selectedVPCData.region}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Instances</p>
                    <p>{selectedVPCData.instanceCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p>{selectedVPCData.createdAt}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <button
                    onClick={() => deleteVPC(selectedVPCData.id)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-destructive hover:bg-destructive/10 text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete VPC
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
