"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, Receipt, Download, Filter, Search, Calendar,
  RefreshCw, ArrowUpRight, ArrowDownLeft, CreditCard,
  FileText, DollarSign, TrendingUp, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface Transaction {
  id: string;
  type: "credit" | "debit" | "refund";
  description: string;
  amount: number;
  balance: number;
  date: string;
  status: "completed" | "pending" | "failed";
  invoiceId?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "txn_1",
    type: "debit",
    description: "RTX 4090 24GB × 8 - training-node-01",
    amount: -38.40,
    balance: 961.60,
    date: "2024-01-28 14:30",
    status: "completed",
  },
  {
    id: "txn_2",
    type: "credit",
    description: "USDT Deposit",
    amount: 500.00,
    balance: 1000.00,
    date: "2024-01-28 10:00",
    status: "completed",
    invoiceId: "INV-2024-0128",
  },
  {
    id: "txn_3",
    type: "debit",
    description: "H100 80GB × 8 - inference-server",
    amount: -117.76,
    balance: 500.00,
    date: "2024-01-27 16:45",
    status: "completed",
  },
  {
    id: "txn_4",
    type: "credit",
    description: "New User Welcome Credit",
    amount: 100.00,
    balance: 617.76,
    date: "2024-01-25 09:00",
    status: "completed",
  },
  {
    id: "txn_5",
    type: "credit",
    description: "BTC Deposit (+10% Bonus)",
    amount: 550.00,
    balance: 517.76,
    date: "2024-01-20 11:30",
    status: "completed",
    invoiceId: "INV-2024-0120",
  },
  {
    id: "txn_6",
    type: "debit",
    description: "RTX 5090 32GB × 8 - llm-training",
    amount: -21.76,
    balance: -32.24,
    date: "2024-01-18 08:15",
    status: "completed",
  },
  {
    id: "txn_7",
    type: "refund",
    description: "Instance termination refund",
    amount: 15.00,
    balance: -10.48,
    date: "2024-01-17 22:00",
    status: "completed",
  },
];

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  items: string[];
}

const mockInvoices: Invoice[] = [
  {
    id: "INV-2024-0128",
    date: "2024-01-28",
    amount: 500.00,
    status: "paid",
    items: ["USDT Deposit"],
  },
  {
    id: "INV-2024-0120",
    date: "2024-01-20",
    amount: 550.00,
    status: "paid",
    items: ["BTC Deposit", "10% Bonus Credit"],
  },
  {
    id: "INV-2024-0115",
    date: "2024-01-15",
    amount: 200.00,
    status: "paid",
    items: ["ETH Deposit"],
  },
];

export default function BillingHistoryPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [activeTab, setActiveTab] = useState<"transactions" | "invoices">("transactions");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState("30d");

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

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || txn.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalCredits = transactions
    .filter(t => t.type === "credit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebits = transactions
    .filter(t => t.type === "debit" && t.status === "completed")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "credit":
        return <ArrowDownLeft className="h-4 w-4 text-success-foreground" />;
      case "debit":
        return <ArrowUpRight className="h-4 w-4 text-destructive" />;
      case "refund":
        return <RefreshCw className="h-4 w-4 text-blue-400" />;
    }
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
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Billing & Transactions</h1>
              <p className="text-muted-foreground">
                View your payment history and download invoices
              </p>
            </div>
            <Link
              href="/checkout"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Add Credits
            </Link>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="text-2xl font-bold text-primary">${user.balance.toFixed(2)}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Deposits (30d)</p>
                  <p className="text-2xl font-bold text-success-foreground">${totalCredits.toFixed(2)}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <ArrowDownLeft className="h-5 w-5 text-success-foreground" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent (30d)</p>
                  <p className="text-2xl font-bold text-destructive">${totalDebits.toFixed(2)}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-destructive" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Est. Monthly</p>
                  <p className="text-2xl font-bold">${(totalDebits * 1.2).toFixed(2)}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-border mb-6">
            <button
              onClick={() => setActiveTab("transactions")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "transactions"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Receipt className="h-4 w-4 inline mr-2" />
              Transactions
            </button>
            <button
              onClick={() => setActiveTab("invoices")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "invoices"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Invoices
            </button>
          </div>

          {activeTab === "transactions" && (
            <>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="all">All Types</option>
                  <option value="credit">Credits</option>
                  <option value="debit">Debits</option>
                  <option value="refund">Refunds</option>
                </select>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="all">All time</option>
                </select>
                <button className="inline-flex items-center px-4 py-2 rounded-lg border border-input hover:bg-accent">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
              </div>

              {/* Transactions List */}
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Description</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Balance</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredTransactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-muted/30">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getTransactionIcon(txn.type)}
                            <span className="capitalize text-sm">{txn.type}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm">{txn.description}</p>
                          {txn.invoiceId && (
                            <p className="text-xs text-muted-foreground">{txn.invoiceId}</p>
                          )}
                        </td>
                        <td className={`p-4 text-right font-medium ${
                          txn.amount > 0 ? "text-success-foreground" : "text-destructive"
                        }`}>
                          {txn.amount > 0 ? "+" : ""}${Math.abs(txn.amount).toFixed(2)}
                        </td>
                        <td className="p-4 text-right text-muted-foreground hidden sm:table-cell">
                          ${txn.balance.toFixed(2)}
                        </td>
                        <td className="p-4 text-right text-sm text-muted-foreground">
                          {txn.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "invoices" && (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl border border-border bg-card flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{invoice.id}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{invoice.date}</span>
                        <span>•</span>
                        <span>{invoice.items.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold text-lg">${invoice.amount.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                        invoice.status === "paid" 
                          ? "bg-success/10 text-success-foreground"
                          : invoice.status === "pending"
                          ? "bg-warning/10 text-warning-foreground"
                          : "bg-destructive/10 text-destructive"
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-accent">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
