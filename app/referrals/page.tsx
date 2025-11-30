"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, Gift, Users, DollarSign, Copy, Check, Share2,
  Twitter, Linkedin, Mail, ArrowLeft, TrendingUp, UserPlus
} from "lucide-react";
import { motion } from "framer-motion";

interface Referral {
  id: string;
  email: string;
  status: "pending" | "signed_up" | "paid";
  earnings: number;
  date: string;
}

const mockReferrals: Referral[] = [
  { id: "1", email: "alice@example.com", status: "paid", earnings: 50, date: "2024-01-15" },
  { id: "2", email: "bob@startup.io", status: "signed_up", earnings: 0, date: "2024-01-18" },
  { id: "3", email: "charlie@tech.co", status: "pending", earnings: 0, date: "2024-01-20" },
];

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "LH-2024-ABC123";
  const referralLink = `https://lumin.ai/ref/${referralCode}`;

  const totalEarnings = mockReferrals.reduce((acc, r) => acc + r.earnings, 0);
  const totalReferrals = mockReferrals.length;
  const paidReferrals = mockReferrals.filter(r => r.status === "paid").length;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Get $100 free credits on Lumin House AI - Enterprise GPU Cloud! Use my referral link: ${referralLink}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(referralLink);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent("Get $100 free credits on Lumin House AI");
    const body = encodeURIComponent(`Check out Lumin House AI for enterprise GPU cloud computing!\n\nUse my referral link to get $100 free credits: ${referralLink}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
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
                <span className="font-bold text-lg">Referral Program</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 px-6 rounded-2xl bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/10 border border-primary/20"
        >
          <Gift className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-2">Earn $50 for Every Referral</h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Share Lumin House AI with friends and colleagues. They get $100 free credits, 
            and you earn $50 for each person who makes their first payment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground">Your friend gets</p>
              <p className="text-2xl font-bold text-success-foreground">$100</p>
            </div>
            <div className="px-6 py-3 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground">You earn</p>
              <p className="text-2xl font-bold text-primary">$50</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-3xl font-bold">{totalReferrals}</p>
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
              <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-success-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Successful Conversions</p>
                <p className="text-3xl font-bold">{paidReferrals}</p>
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
              <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-warning-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-3xl font-bold">${totalEarnings}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Referral Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <h2 className="text-lg font-semibold mb-4">Your Referral Link</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg bg-muted font-mono text-sm">
              <span className="truncate">{referralLink}</span>
            </div>
            <button
              onClick={() => copyToClipboard(referralLink)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Share via</p>
            <div className="flex gap-3">
              <button
                onClick={shareOnTwitter}
                className="p-3 rounded-lg bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-3 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button
                onClick={shareViaEmail}
                className="p-3 rounded-lg bg-muted text-muted-foreground hover:bg-accent"
              >
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Referral History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <h2 className="text-lg font-semibold mb-4">Referral History</h2>
          
          {mockReferrals.length === 0 ? (
            <div className="text-center py-12">
              <Share2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No referrals yet. Share your link to start earning!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockReferrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{referral.email}</p>
                      <p className="text-sm text-muted-foreground">Referred on {referral.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      referral.status === "paid" 
                        ? "bg-success/20 text-success-foreground"
                        : referral.status === "signed_up"
                        ? "bg-warning/20 text-warning-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {referral.status === "paid" ? "Paid" : referral.status === "signed_up" ? "Signed Up" : "Pending"}
                    </span>
                    {referral.earnings > 0 && (
                      <span className="font-medium text-success-foreground">+${referral.earnings}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <h2 className="text-lg font-semibold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Share2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1. Share Your Link</h3>
              <p className="text-sm text-muted-foreground">
                Share your unique referral link with friends and colleagues
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">2. They Sign Up</h3>
              <p className="text-sm text-muted-foreground">
                They create an account and receive $100 free credits
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">3. You Earn $50</h3>
              <p className="text-sm text-muted-foreground">
                When they make their first payment, you get $50 credited to your account
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
