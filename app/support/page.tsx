"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, MessageSquare, Plus, Clock, CheckCircle2, AlertCircle,
  RefreshCw, Send, Paperclip, ChevronRight, Search, Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: "open" | "pending" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    author: string;
    isStaff: boolean;
    content: string;
    createdAt: string;
  }[];
}

const mockTickets: Ticket[] = [
  {
    id: "ticket_1",
    subject: "Cannot connect to instance via SSH",
    category: "Technical",
    status: "pending",
    priority: "high",
    createdAt: "2024-01-28 10:30",
    updatedAt: "2024-01-28 14:15",
    messages: [
      {
        id: "msg_1",
        author: "You",
        isStaff: false,
        content: "I'm unable to connect to my H100 instance. SSH connection times out. Instance ID: inst_abc123",
        createdAt: "2024-01-28 10:30",
      },
      {
        id: "msg_2",
        author: "Support Team",
        isStaff: true,
        content: "Hi! Thank you for reaching out. We've checked your instance and noticed the security group rules may be blocking SSH. Could you verify that port 22 is allowed in your firewall settings?",
        createdAt: "2024-01-28 14:15",
      },
    ],
  },
  {
    id: "ticket_2",
    subject: "Billing question about reserved instances",
    category: "Billing",
    status: "resolved",
    priority: "low",
    createdAt: "2024-01-25 09:00",
    updatedAt: "2024-01-26 11:30",
    messages: [
      {
        id: "msg_3",
        author: "You",
        isStaff: false,
        content: "I'd like to understand the pricing difference between on-demand and reserved instances for H100.",
        createdAt: "2024-01-25 09:00",
      },
      {
        id: "msg_4",
        author: "Support Team",
        isStaff: true,
        content: "Great question! Reserved instances offer significant discounts: 1-year commitment saves 20%, and 3-year commitment saves up to 35%. I'll send you a detailed pricing breakdown via email.",
        createdAt: "2024-01-26 11:30",
      },
    ],
  },
];

const categories = [
  { id: "technical", label: "Technical Issue" },
  { id: "billing", label: "Billing & Payments" },
  { id: "account", label: "Account & Access" },
  { id: "feature", label: "Feature Request" },
  { id: "other", label: "Other" },
];

const priorities = [
  { id: "low", label: "Low", color: "text-muted-foreground" },
  { id: "medium", label: "Medium", color: "text-blue-400" },
  { id: "high", label: "High", color: "text-warning-foreground" },
  { id: "urgent", label: "Urgent", color: "text-destructive" },
];

export default function SupportPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // New ticket form
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("technical");
  const [newPriority, setNewPriority] = useState("medium");
  const [newContent, setNewContent] = useState("");

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

  const getStatusIcon = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-blue-400" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning-foreground" />;
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-success-foreground" />;
      case "closed":
        return <CheckCircle2 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return "bg-blue-400/10 text-blue-400";
      case "pending":
        return "bg-warning/10 text-warning-foreground";
      case "resolved":
        return "bg-success/10 text-success-foreground";
      case "closed":
        return "bg-muted text-muted-foreground";
    }
  };

  const createTicket = () => {
    const newTicket: Ticket = {
      id: `ticket_${Date.now()}`,
      subject: newSubject,
      category: newCategory,
      status: "open",
      priority: newPriority as Ticket["priority"],
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      messages: [
        {
          id: `msg_${Date.now()}`,
          author: "You",
          isStaff: false,
          content: newContent,
          createdAt: new Date().toLocaleString(),
        },
      ],
    };
    setTickets([newTicket, ...tickets]);
    setShowCreateModal(false);
    setSelectedTicket(newTicket);
    setNewSubject("");
    setNewCategory("technical");
    setNewPriority("medium");
    setNewContent("");
  };

  const sendMessage = () => {
    if (!selectedTicket || !newMessage.trim()) return;
    
    const updatedTicket = {
      ...selectedTicket,
      updatedAt: new Date().toLocaleString(),
      messages: [
        ...selectedTicket.messages,
        {
          id: `msg_${Date.now()}`,
          author: "You",
          isStaff: false,
          content: newMessage,
          createdAt: new Date().toLocaleString(),
        },
      ],
    };
    
    setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
    setSelectedTicket(updatedTicket);
    setNewMessage("");
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        <div className="flex gap-6">
          {/* Tickets List */}
          <div className={`${selectedTicket ? "hidden lg:block lg:w-1/3" : "w-full"}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Support Center</h1>
                  <p className="text-muted-foreground">We&apos;re here to help 24/7</p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Tickets */}
              {filteredTickets.length === 0 ? (
                <div className="text-center py-16 rounded-xl border border-dashed border-border">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No tickets found</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a support ticket to get help from our team
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTickets.map((ticket) => (
                    <motion.button
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`w-full p-4 rounded-xl border text-left transition-colors ${
                        selectedTicket?.id === ticket.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium line-clamp-1">{ticket.subject}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="capitalize">{ticket.category}</span>
                        <span>•</span>
                        <span>{ticket.updatedAt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Quick Help */}
              <div className="mt-8 p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-4">Quick Help</h3>
                <div className="space-y-3">
                  <Link
                    href="/docs"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent"
                  >
                    <span>Documentation</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="mailto:support@luminhouse.ai"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent"
                  >
                    <span>Email Support</span>
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <a
                    href="https://discord.gg/luminhouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent"
                  >
                    <span>Join Discord</span>
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Ticket Detail */}
          {selectedTicket && (
            <div className="flex-1 lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border border-border bg-card h-[calc(100vh-12rem)] flex flex-col"
              >
                {/* Ticket Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setSelectedTicket(null)}
                      className="lg:hidden text-muted-foreground hover:text-foreground"
                    >
                      ← Back
                    </button>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedTicket.status)}
                      <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{selectedTicket.subject}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="capitalize">{selectedTicket.category}</span>
                    <span>•</span>
                    <span>Created {selectedTicket.createdAt}</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto p-6 space-y-6">
                  {selectedTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isStaff ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-xl ${
                          message.isStaff
                            ? "bg-muted"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">{message.author}</span>
                          <span className="text-xs opacity-70">{message.createdAt}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                {selectedTicket.status !== "closed" && (
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-3">
                      <button className="p-2 rounded-lg text-muted-foreground hover:bg-accent">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </main>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold mb-6">Create Support Ticket</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  >
                    {priorities.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-lg border border-input hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  onClick={createTicket}
                  disabled={!newSubject || !newContent}
                  className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  Create Ticket
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
