"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, Key, Plus, Copy, Check, Trash2, Eye, EyeOff,
  RefreshCw, AlertTriangle, Shield, Calendar, Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface APIKey {
  id: string;
  name: string;
  key: string;
  prefix: string;
  permissions: string[];
  createdAt: string;
  lastUsed: string | null;
  usageCount: number;
}

const mockAPIKeys: APIKey[] = [
  {
    id: "key_1",
    name: "Production API",
    key: "lum_prod_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    prefix: "lum_prod_***",
    permissions: ["instances:read", "instances:write", "billing:read"],
    createdAt: "2024-01-15",
    lastUsed: "2024-01-28",
    usageCount: 1247,
  },
  {
    id: "key_2",
    name: "Development",
    key: "lum_dev_x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4",
    prefix: "lum_dev_***",
    permissions: ["instances:read"],
    createdAt: "2024-01-20",
    lastUsed: "2024-01-27",
    usageCount: 89,
  },
];

const availablePermissions = [
  { id: "instances:read", label: "Read Instances", description: "List and view instance details" },
  { id: "instances:write", label: "Manage Instances", description: "Create, start, stop, delete instances" },
  { id: "billing:read", label: "Read Billing", description: "View balance and transactions" },
  { id: "billing:write", label: "Manage Billing", description: "Add credits and manage payments" },
  { id: "ssh-keys:read", label: "Read SSH Keys", description: "List SSH keys" },
  { id: "ssh-keys:write", label: "Manage SSH Keys", description: "Add and remove SSH keys" },
];

export default function APIKeysPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>(["instances:read"]);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const createNewKey = () => {
    const newKey: APIKey = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      key: `lum_${Date.now()}_${Math.random().toString(36).substr(2, 32)}`,
      prefix: `lum_***`,
      permissions: newKeyPermissions,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: null,
      usageCount: 0,
    };
    setCreatedKey(newKey.key);
    setApiKeys([...apiKeys, newKey]);
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const togglePermission = (perm: string) => {
    setNewKeyPermissions(prev => {
      if (prev.includes(perm)) {
        return prev.filter(p => p !== perm);
      } else {
        return [...prev, perm];
      }
    });
  };

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
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">API Keys</h1>
              <p className="text-muted-foreground">
                Manage API keys for programmatic access to Lumin House AI
              </p>
            </div>
            <button
              onClick={() => {
                setShowCreateModal(true);
                setNewKeyName("");
                setNewKeyPermissions(["instances:read"]);
                setCreatedKey(null);
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create API Key
            </button>
          </div>

          {/* Security Notice */}
          <div className="mb-6 p-4 rounded-lg bg-warning/10 border border-warning/30 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning-foreground mt-0.5" />
            <div>
              <p className="font-medium text-warning-foreground">Security Notice</p>
              <p className="text-sm text-muted-foreground">
                API keys provide full access to your account based on their permissions. 
                Keep them secure and never share them publicly. Rotate keys regularly.
              </p>
            </div>
          </div>

          {/* API Keys List */}
          {apiKeys.length === 0 ? (
            <div className="text-center py-16 rounded-xl border border-dashed border-border">
              <Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No API keys yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first API key to start using the Lumin API
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create API Key
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <motion.div
                  key={apiKey.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Key className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{apiKey.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-sm font-mono text-muted-foreground">
                            {visibleKeys.has(apiKey.id) ? apiKey.key : apiKey.prefix}
                          </code>
                          <button
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                            className="p-1 rounded hover:bg-accent"
                          >
                            {visibleKeys.has(apiKey.id) ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                          <button
                            onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                            className="p-1 rounded hover:bg-accent"
                          >
                            {copiedKey === apiKey.id ? (
                              <Check className="h-4 w-4 text-success-foreground" />
                            ) : (
                              <Copy className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteKey(apiKey.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Permissions */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Permissions</p>
                    <div className="flex flex-wrap gap-2">
                      {apiKey.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Created {apiKey.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Activity className="h-4 w-4" />
                      <span>
                        {apiKey.lastUsed ? `Last used ${apiKey.lastUsed}` : "Never used"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>{apiKey.usageCount.toLocaleString()} requests</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* API Documentation Link */}
          <div className="mt-8 p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-2">API Documentation</h3>
            <p className="text-muted-foreground mb-4">
              Learn how to use the Lumin API to manage instances programmatically
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/docs#api"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-input hover:bg-accent"
              >
                View API Docs
              </Link>
              <a
                href="https://github.com/luminhouse/api-examples"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-input hover:bg-accent"
              >
                Example Code
              </a>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-lg"
          >
            {createdKey ? (
              <>
                <div className="text-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-success-foreground" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">API Key Created!</h2>
                  <p className="text-muted-foreground">
                    Make sure to copy your API key now. You won&apos;t be able to see it again.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted mb-6">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono break-all">{createdKey}</code>
                    <button
                      onClick={() => copyToClipboard(createdKey, "new")}
                      className="ml-2 p-2 rounded hover:bg-accent flex-shrink-0"
                    >
                      {copiedKey === "new" ? (
                        <Check className="h-4 w-4 text-success-foreground" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setCreatedKey(null);
                  }}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-6">Create New API Key</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Key Name</label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production API"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Permissions</label>
                    <div className="space-y-2">
                      {availablePermissions.map((perm) => (
                        <label
                          key={perm.id}
                          className="flex items-start gap-3 p-3 rounded-lg border border-input hover:border-primary/50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={newKeyPermissions.includes(perm.id)}
                            onChange={() => togglePermission(perm.id)}
                            className="mt-1"
                          />
                          <div>
                            <p className="font-medium">{perm.label}</p>
                            <p className="text-sm text-muted-foreground">{perm.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 py-3 rounded-lg border border-input hover:bg-accent"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createNewKey}
                      disabled={!newKeyName || newKeyPermissions.length === 0}
                      className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    >
                      Create Key
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
