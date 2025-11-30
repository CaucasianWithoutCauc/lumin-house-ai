"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  TrendingUp, FileText, Calendar, Users, ChevronRight,
  Download, ExternalLink, BarChart3, DollarSign, Globe2
} from "lucide-react";
import { motion } from "framer-motion";

const stockInfo = {
  ticker: "LMNH",
  exchange: "NASDAQ",
  price: "$42.87",
  change: "+2.34 (5.77%)",
  marketCap: "$2.3B",
  volume: "1.2M",
};

const financialHighlights = [
  { label: "Revenue (TTM)", value: "$180M", change: "+45% YoY" },
  { label: "Gross Margin", value: "68%", change: "+5pp YoY" },
  { label: "Operating Cash Flow", value: "$42M", change: "+62% YoY" },
  { label: "Active Customers", value: "12,500+", change: "+35% YoY" },
];

const pressReleases = [
  {
    date: "Jan 28, 2024",
    title: "Lumin House AI Reports Record Q4 2023 Results",
    type: "Earnings",
  },
  {
    date: "Jan 15, 2024",
    title: "Lumin House AI Expands to New Data Center in Frankfurt",
    type: "Operations",
  },
  {
    date: "Jan 5, 2024",
    title: "Lumin House AI Announces Support for NVIDIA B200 GPUs",
    type: "Product",
  },
  {
    date: "Dec 20, 2023",
    title: "Lumin House AI Achieves SOC 2 Type II Certification",
    type: "Compliance",
  },
];

const upcomingEvents = [
  {
    date: "Feb 15, 2024",
    event: "Q4 2023 Earnings Call",
    time: "4:30 PM ET",
  },
  {
    date: "Mar 5, 2024",
    event: "Morgan Stanley Technology Conference",
    time: "2:00 PM ET",
  },
  {
    date: "Mar 20, 2024",
    event: "Annual Shareholder Meeting",
    time: "10:00 AM SGT",
  },
];

const resources = [
  { name: "Annual Report 2023", type: "PDF", size: "4.2 MB" },
  { name: "Q4 2023 Earnings Presentation", type: "PDF", size: "2.8 MB" },
  { name: "Investor Fact Sheet", type: "PDF", size: "1.1 MB" },
  { name: "Corporate Governance Guidelines", type: "PDF", size: "856 KB" },
];

export default function InvestorRelationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Investor Relations</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transparent, timely information for our shareholders and the investment community
          </p>
        </motion.div>
      </section>

      {/* Stock Info */}
      <section className="container mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold">{stockInfo.ticker}</span>
                <span className="px-2 py-1 rounded bg-muted text-sm">{stockInfo.exchange}</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">{stockInfo.price}</span>
                <span className="text-success-foreground font-medium">{stockInfo.change}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 text-center md:text-right">
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="text-xl font-semibold">{stockInfo.marketCap}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="text-xl font-semibold">{stockInfo.volume}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Stock data is delayed by 15 minutes. For real-time quotes, please visit NASDAQ.com.
          </p>
        </motion.div>
      </section>

      {/* Financial Highlights */}
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-3xl font-bold mb-8 text-center">Financial Highlights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {financialHighlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card text-center"
            >
              <p className="text-sm text-muted-foreground mb-2">{item.label}</p>
              <p className="text-3xl font-bold mb-1">{item.value}</p>
              <p className="text-sm text-success-foreground">{item.change}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Press Releases & Events */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Press Releases */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FileText className="h-6 w-6 text-primary mr-2" />
              Latest News
            </h2>
            <div className="space-y-4">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={release.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href="#"
                    className="block p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{release.date}</p>
                        <h3 className="font-medium">{release.title}</h3>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-muted text-xs shrink-0">
                        {release.type}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
              <Link
                href="#"
                className="inline-flex items-center text-primary hover:underline mt-4"
              >
                View All News
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Calendar className="h-6 w-6 text-primary mr-2" />
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.event}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl border border-border bg-card"
                >
                  <p className="text-sm text-muted-foreground mb-1">{event.date}</p>
                  <h3 className="font-medium mb-1">{event.event}</h3>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </motion.div>
              ))}
              <a
                href="#"
                className="inline-flex items-center text-primary hover:underline mt-4"
              >
                Add to Calendar
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-2xl font-bold mb-8 text-center">Investor Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.name}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors flex items-center gap-3"
            >
              <Download className="h-8 w-8 text-primary shrink-0" />
              <div>
                <p className="font-medium text-sm">{resource.name}</p>
                <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="#"
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <BarChart3 className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">SEC Filings</h3>
            <p className="text-sm text-muted-foreground">
              Access 10-K, 10-Q, 8-K and other SEC filings
            </p>
          </Link>
          <Link
            href="#"
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <Users className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Corporate Governance</h3>
            <p className="text-sm text-muted-foreground">
              Board of Directors, committees, and governance documents
            </p>
          </Link>
          <Link
            href="#"
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
          >
            <DollarSign className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Stock Information</h3>
            <p className="text-sm text-muted-foreground">
              Historical prices, dividends, and analyst coverage
            </p>
          </Link>
        </div>
      </section>

      {/* Contact IR */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Investor Contact</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            For investor inquiries, please contact our Investor Relations team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:ir@luminhouse.ai"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Email IR Team
              <ChevronRight className="h-4 w-4 ml-2" />
            </a>
            <a
              href="tel:+65-6123-4567"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input hover:bg-accent"
            >
              +65 6123 4567
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Lumin House AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
