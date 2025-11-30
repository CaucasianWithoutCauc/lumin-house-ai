"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, Camera, Plus, Trash2, RotateCcw, Server, HardDrive,
  ArrowLeft, Clock, Download, Upload, Check, AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface Snapshot {
  id: string;
  name: string;
  instanceId: string;
  instanceName: string;
  size: string;
  status: "ready" | "creating" | "restoring" | "failed";
  createdAt: string;
  region: string;
}

const mockSnapshots: Snapshot[] = [
  {
    id: "snap_1",
    name: "llama2-finetuned-v1",
    instanceId: "inst_1",
    instanceName: "training-node-01",
    size: "128 GB",
    status: "ready",
    createdAt: "2024-01-20 14:30",
    region: "Hong Kong",
  },
  {
    id: "snap_2",
    name: "base-pytorch-setup",
    instanceId: "inst_1",
    instanceName: "training-node-01",
    size: "64 GB",
    status: "ready",
    createdAt: "2024-01-15 10:15",
    region: "Hong Kong",
  },
  {
    id: "snap_3",
    name: "pre-training-checkpoint",
    instanceId: "inst_2",
    instanceName: "inference-server",
    size: "256 GB",
    status: "creating",
    createdAt: "2024-01-22 09:00",
    region: "Singapore",
  },
];

export default function SnapshotsPage() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>(mockSnapshots);
  const [showCreate, setShowCreate] = useState(false);
  const [newSnapshotName, setNewSnapshotName] = useState("");
  const [selectedInstance, setSelectedInstance] = useState("");
  const [restoringSnapshot, setRestoringSnapshot] = useState<string | null>(null);

  const instances = [
    { id: "inst_1", name: "training-node-01" },
    { id: "inst_2", name: "inference-server" },
  ];

  const createSnapshot = () => {
    if (newSnapshotName && selectedInstance) {
      const instance = instances.find((i) => i.id === selectedInstance);
      const newSnapshot: Snapshot = {
        id: `snap_${Date.now()}`,
        name: newSnapshotName,
        instanceId: selectedInstance,
        instanceName: instance?.name || "",
        size: "Creating...",
        status: "creating",
        createdAt: new Date().toLocaleString(),
        region: "Hong Kong",
      };
      setSnapshots([newSnapshot, ...snapshots]);
      setNewSnapshotName("");
      setSelectedInstance("");
      setShowCreate(false);

      // Simulate snapshot creation
      setTimeout(() => {
        setSnapshots((prev) =>
          prev.map((s) =>
            s.id === newSnapshot.id ? { ...s, status: "ready" as const, size: "64 GB" } : s
          )
        );
      }, 5000);
    }
  };

  const deleteSnapshot = (id: string) => {
    setSnapshots(snapshots.filter((s) => s.id !== id));
  };

  const restoreSnapshot = (id: string) => {
    setRestoringSnapshot(id);
    setSnapshots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "restoring" as const } : s))
    );

    // Simulate restore
    setTimeout(() => {
      setSnapshots((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "ready" as const } : s))
      );
      setRestoringSnapshot(null);
    }, 3000);
  };

  const getStatusBadge = (status: Snapshot["status"]) => {
    switch (status) {
      case "ready":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-success/20 text-success-foreground">
            <Check className="h-3 w-3" />
            Ready
          </span>
        );
      case "creating":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
            <Camera className="h-3 w-3 animate-pulse" />
            Creating
          </span>
        );
      case "restoring":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-warning/20 text-warning-foreground">
            <RotateCcw className="h-3 w-3 animate-spin" />
            Restoring
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-destructive/20 text-destructive">
            <AlertCircle className="h-3 w-3" />
            Failed
          </span>
        );
    }
  };

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
                <span className="font-bold text-lg">Snapshots</span>
              </div>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Camera className="h-4 w-4" />
              Create Snapshot
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Snapshots</p>
                <p className="text-3xl font-bold">{snapshots.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                <HardDrive className="h-6 w-6 text-success-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Storage</p>
                <p className="text-3xl font-bold">448 GB</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Cost</p>
                <p className="text-3xl font-bold">$8.96</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Create Snapshot Modal */}
        {showCreate && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-primary bg-card"
          >
            <h2 className="text-lg font-semibold mb-4">Create New Snapshot</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Snapshot Name</label>
                <input
                  type="text"
                  value={newSnapshotName}
                  onChange={(e) => setNewSnapshotName(e.target.value)}
                  placeholder="e.g., llama2-checkpoint-v1"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Select Instance</label>
                <select
                  value={selectedInstance}
                  onChange={(e) => setSelectedInstance(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="">Choose an instance...</option>
                  {instances.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">
                  📸 Snapshots capture the complete state of your instance, including all data and configurations. 
                  Storage is billed at <strong>$0.02/GB/month</strong>.
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 rounded-lg border border-input hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  onClick={createSnapshot}
                  disabled={!newSnapshotName || !selectedInstance}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  Create Snapshot
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Snapshots List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">All Snapshots</h2>
          </div>

          {snapshots.length === 0 ? (
            <div className="p-12 text-center">
              <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No snapshots yet</h3>
              <p className="text-muted-foreground mb-4">
                Create a snapshot to save your instance state
              </p>
              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Camera className="h-4 w-4" />
                Create Snapshot
              </button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {snapshots.map((snapshot) => (
                <div
                  key={snapshot.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                      <Camera className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{snapshot.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        From {snapshot.instanceName} • {snapshot.region}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Created {snapshot.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-right">
                      <p className="font-medium">{snapshot.size}</p>
                      {getStatusBadge(snapshot.status)}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => restoreSnapshot(snapshot.id)}
                        disabled={snapshot.status !== "ready"}
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Restore to new instance"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteSnapshot(snapshot.id)}
                        disabled={snapshot.status === "creating" || snapshot.status === "restoring"}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Pricing Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <h2 className="text-lg font-semibold mb-4">Snapshot Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-muted">
              <HardDrive className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">$0.02</p>
              <p className="text-sm text-muted-foreground">per GB / month</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <Upload className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">Free</p>
              <p className="text-sm text-muted-foreground">Snapshot creation</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <RotateCcw className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">Free</p>
              <p className="text-sm text-muted-foreground">Restore to instance</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
