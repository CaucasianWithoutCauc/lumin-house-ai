"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, Users, UserPlus, Shield, Settings, Trash2, Mail,
  ArrowLeft, Crown, Eye, Edit, Check, X, MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member" | "billing";
  status: "active" | "pending";
  joinedAt: string;
  avatar?: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "owner",
    status: "active",
    joinedAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@company.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-01-05",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@company.com",
    role: "member",
    status: "active",
    joinedAt: "2024-01-10",
  },
  {
    id: "4",
    name: "Emily Park",
    email: "emily@company.com",
    role: "billing",
    status: "pending",
    joinedAt: "2024-01-20",
  },
];

const roles = [
  { id: "admin", name: "Admin", description: "Full access to all resources and settings" },
  { id: "member", name: "Member", description: "Can create and manage own instances" },
  { id: "billing", name: "Billing", description: "Can view and manage billing only" },
  { id: "viewer", name: "Viewer", description: "Read-only access to resources" },
];

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [editingMember, setEditingMember] = useState<string | null>(null);

  const inviteMember = () => {
    if (inviteEmail) {
      const newMember: TeamMember = {
        id: `member_${Date.now()}`,
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: inviteRole as TeamMember["role"],
        status: "pending",
        joinedAt: new Date().toISOString().split("T")[0],
      };
      setMembers([...members, newMember]);
      setInviteEmail("");
      setInviteRole("member");
      setShowInvite(false);
    }
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const updateRole = (id: string, newRole: TeamMember["role"]) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, role: newRole } : m)));
    setEditingMember(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-primary/20 text-primary";
      case "admin":
        return "bg-blue-500/20 text-blue-400";
      case "member":
        return "bg-success/20 text-success-foreground";
      case "billing":
        return "bg-warning/20 text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return Crown;
      case "admin":
        return Shield;
      case "member":
        return Users;
      case "billing":
        return Eye;
      default:
        return Users;
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
                <span className="font-bold text-lg">Team Management</span>
              </div>
            </div>
            <button
              onClick={() => setShowInvite(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <UserPlus className="h-4 w-4" />
              Invite Member
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-3xl font-bold">{members.length}</p>
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
                <Check className="h-6 w-6 text-success-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-3xl font-bold">
                  {members.filter((m) => m.status === "active").length}
                </p>
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
                <Mail className="h-6 w-6 text-warning-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Invites</p>
                <p className="text-3xl font-bold">
                  {members.filter((m) => m.status === "pending").length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admins</p>
                <p className="text-3xl font-bold">
                  {members.filter((m) => m.role === "admin" || m.role === "owner").length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Invite Modal */}
        {showInvite && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-primary bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Invite Team Member</h2>
              <button
                onClick={() => setShowInvite(false)}
                className="p-2 rounded-lg hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name} - {role.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowInvite(false)}
                  className="px-4 py-2 rounded-lg border border-input hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  onClick={inviteMember}
                  disabled={!inviteEmail}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Team Members List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Team Members</h2>
          </div>
          <div className="divide-y divide-border">
            {members.map((member) => {
              const RoleIcon = getRoleIcon(member.role);
              return (
                <div
                  key={member.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-medium text-primary">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.status === "pending" && (
                          <span className="px-2 py-0.5 rounded text-xs bg-warning/20 text-warning-foreground">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {editingMember === member.id ? (
                      <select
                        value={member.role}
                        onChange={(e) => updateRole(member.id, e.target.value as TeamMember["role"])}
                        className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm"
                        autoFocus
                        onBlur={() => setEditingMember(null)}
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        onClick={() => member.role !== "owner" && setEditingMember(member.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${getRoleColor(
                          member.role
                        )} ${member.role !== "owner" ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
                      >
                        <RoleIcon className="h-4 w-4" />
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </button>
                    )}

                    <span className="text-sm text-muted-foreground hidden sm:block">
                      Joined {member.joinedAt}
                    </span>

                    {member.role !== "owner" && (
                      <button
                        onClick={() => removeMember(member.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Role Permissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <h2 className="text-lg font-semibold mb-6">Role Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                role: "Owner",
                icon: Crown,
                color: "text-primary",
                permissions: ["All permissions", "Transfer ownership", "Delete organization"],
              },
              {
                role: "Admin",
                icon: Shield,
                color: "text-blue-400",
                permissions: ["Manage team", "Manage billing", "Create instances", "View all resources"],
              },
              {
                role: "Member",
                icon: Users,
                color: "text-success-foreground",
                permissions: ["Create own instances", "View own resources", "Add SSH keys"],
              },
              {
                role: "Billing",
                icon: Eye,
                color: "text-warning-foreground",
                permissions: ["View billing", "Add payment methods", "Download invoices"],
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.role} className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`h-5 w-5 ${item.color}`} />
                    <h3 className="font-semibold">{item.role}</h3>
                  </div>
                  <ul className="space-y-1">
                    {item.permissions.map((perm) => (
                      <li key={perm} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Check className="h-3 w-3 text-success-foreground" />
                        {perm}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
