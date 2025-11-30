"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, User, Bell, Shield, Globe, Palette, CreditCard,
  RefreshCw, Check, AlertTriangle, Smartphone, Mail,
  Key, Lock, Eye, EyeOff, Moon, Sun, Languages
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  // Profile settings
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    billing: true,
    usage: true,
    security: true,
    marketing: false,
  });
  
  // Security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Appearance settings
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  
  // State
  const [activeSection, setActiveSection] = useState("profile");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (user) {
      setDisplayName(user.name);
      setEmail(user.email);
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

  const saveSettings = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

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
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 max-w-2xl">
              {/* Profile Section */}
              {activeSection === "profile" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                    
                    <div className="flex items-center gap-6 mb-6">
                      <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <button className="px-4 py-2 rounded-lg border border-input hover:bg-accent text-sm">
                          Upload Photo
                        </button>
                        <p className="text-sm text-muted-foreground mt-2">
                          JPG, PNG, or GIF. Max 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Display Name</label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Changing email requires verification
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Account ID</label>
                        <input
                          type="text"
                          value="acc_xk82jd91"
                          disabled
                          className="w-full px-4 py-2 rounded-lg border border-input bg-muted text-muted-foreground"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={saveSettings}
                    disabled={saveStatus === "saving"}
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {saveStatus === "saving" ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : saveStatus === "saved" ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : null}
                    {saveStatus === "saved" ? "Saved!" : "Save Changes"}
                  </button>
                </motion.div>
              )}

              {/* Notifications Section */}
              {activeSection === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">Email Notifications</h2>
                    
                    <div className="space-y-4">
                      {[
                        { id: "billing", label: "Billing Alerts", description: "Low balance warnings and payment confirmations" },
                        { id: "usage", label: "Usage Reports", description: "Weekly usage summaries and cost projections" },
                        { id: "security", label: "Security Alerts", description: "Login attempts and account changes" },
                        { id: "marketing", label: "Product Updates", description: "New features and promotional offers" },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className="flex items-start justify-between p-4 rounded-lg border border-input hover:border-primary/50 cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="font-medium">{item.label}</p>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={emailNotifications[item.id as keyof typeof emailNotifications]}
                            onChange={(e) => setEmailNotifications({
                              ...emailNotifications,
                              [item.id]: e.target.checked,
                            })}
                            className="h-5 w-5"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">Push Notifications</h2>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-muted-foreground">Download our app for push notifications</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
                        Get App
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={saveSettings}
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                </motion.div>
              )}

              {/* Security Section */}
              {activeSection === "security" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">Two-Factor Authentication</h2>
                    
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Shield className={`h-5 w-5 mt-0.5 ${twoFactorEnabled ? "text-success-foreground" : "text-muted-foreground"}`} />
                        <div>
                          <p className="font-medium">2FA is {twoFactorEnabled ? "enabled" : "disabled"}</p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          twoFactorEnabled
                            ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <label className="block text-sm font-medium mb-2">Current Password</label>
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-2 pr-10 rounded-lg border border-input bg-background"
                        />
                        <button
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-9"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-2 pr-10 rounded-lg border border-input bg-background"
                        />
                        <button
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-9"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                        />
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">API Keys</h2>
                    <p className="text-muted-foreground mb-4">
                      Manage API keys for programmatic access
                    </p>
                    <Link
                      href="/api-keys"
                      className="inline-flex items-center px-4 py-2 rounded-lg border border-input hover:bg-accent"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Manage API Keys
                    </Link>
                  </div>

                  <div className="p-6 rounded-xl border border-destructive/50 bg-destructive/5">
                    <h2 className="text-xl font-semibold text-destructive mb-4">Danger Zone</h2>
                    <p className="text-muted-foreground mb-4">
                      Permanently delete your account and all associated data
                    </p>
                    <button className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete Account
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Appearance Section */}
              {activeSection === "appearance" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">Theme</h2>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: "light", label: "Light", icon: Sun },
                        { id: "dark", label: "Dark", icon: Moon },
                        { id: "system", label: "System", icon: Smartphone },
                      ].map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.id}
                            onClick={() => setTheme(option.id)}
                            className={`p-4 rounded-lg border text-center transition-colors ${
                              theme === option.id
                                ? "border-primary bg-primary/10"
                                : "border-input hover:border-primary/50"
                            }`}
                          >
                            <Icon className={`h-6 w-6 mx-auto mb-2 ${theme === option.id ? "text-primary" : "text-muted-foreground"}`} />
                            <span className="text-sm">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">Language</h2>
                    
                    <div className="flex items-center gap-4">
                      <Languages className="h-5 w-5 text-muted-foreground" />
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
                      >
                        <option value="en">English</option>
                        <option value="zh-CN">简体中文</option>
                        <option value="zh-TW">繁體中文</option>
                        <option value="ja">日本語</option>
                        <option value="ko">한국어</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={saveSettings}
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                </motion.div>
              )}

              {/* Billing Section */}
              {activeSection === "billing" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">Current Balance</h2>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold">${user.balance.toFixed(2)}</span>
                      <span className="text-muted-foreground">USD</span>
                    </div>
                    <div className="flex gap-4">
                      <Link
                        href="/checkout"
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Add Credits
                      </Link>
                      <Link
                        href="/billing-history"
                        className="inline-flex items-center px-4 py-2 rounded-lg border border-input hover:bg-accent"
                      >
                        View History
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">Auto-Reload</h2>
                    <p className="text-muted-foreground mb-4">
                      Automatically add credits when your balance falls below a threshold
                    </p>
                    <div className="p-4 rounded-lg bg-muted flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-reload is disabled</p>
                        <p className="text-sm text-muted-foreground">Enable to never run out of credits</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
                        Enable
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h2 className="text-xl font-semibold mb-6">Spending Limits</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Monthly Spending Limit</label>
                        <div className="flex gap-4">
                          <input
                            type="number"
                            placeholder="No limit"
                            className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
                          />
                          <span className="px-4 py-2 text-muted-foreground">USD</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Receive an alert when you reach this limit
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
