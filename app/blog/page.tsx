"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Calendar, Clock, ChevronRight, Tag, User, Search, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  "All",
  "Product Updates",
  "Tutorials",
  "Company News",
  "Industry Insights",
  "Case Studies",
];

const posts = [
  {
    id: 1,
    title: "Introducing NVIDIA B200 Support: 3x Faster AI Training",
    excerpt: "We're excited to announce support for the latest NVIDIA B200 GPUs, delivering unprecedented performance for large language model training.",
    category: "Product Updates",
    author: "David Chen",
    date: "2024-01-28",
    readTime: "5 min read",
    featured: true,
    image: "https://via.placeholder.com/600x300",
  },
  {
    id: 2,
    title: "How to Fine-tune LLaMA 3 on Lumin House AI",
    excerpt: "A step-by-step guide to fine-tuning Meta's LLaMA 3 model using our GPU infrastructure with distributed training.",
    category: "Tutorials",
    author: "Emily Park",
    date: "2024-01-25",
    readTime: "12 min read",
    featured: false,
    image: "https://via.placeholder.com/600x300",
  },
  {
    id: 3,
    title: "Lumin House AI Raises $50M Series B",
    excerpt: "We're thrilled to announce our Series B funding round to accelerate global expansion and product development.",
    category: "Company News",
    author: "Sarah Kim",
    date: "2024-01-20",
    readTime: "3 min read",
    featured: false,
    image: "https://via.placeholder.com/600x300",
  },
  {
    id: 4,
    title: "The State of GPU Cloud Computing in 2024",
    excerpt: "An analysis of the GPU cloud market, trends in AI infrastructure, and what to expect in the coming year.",
    category: "Industry Insights",
    author: "Michael Zhang",
    date: "2024-01-15",
    readTime: "8 min read",
    featured: false,
    image: "https://via.placeholder.com/600x300",
  },
  {
    id: 5,
    title: "How DataFlow Reduced AI Training Costs by 40%",
    excerpt: "Learn how DataFlow, a leading AI startup, optimized their ML pipeline and cut costs using Lumin House AI.",
    category: "Case Studies",
    author: "Emily Park",
    date: "2024-01-10",
    readTime: "6 min read",
    featured: false,
    image: "https://via.placeholder.com/600x300",
  },
  {
    id: 6,
    title: "Multi-GPU Training Best Practices",
    excerpt: "Tips and techniques for efficient distributed training across multiple GPUs and nodes.",
    category: "Tutorials",
    author: "David Chen",
    date: "2024-01-05",
    readTime: "10 min read",
    featured: false,
    image: "https://via.placeholder.com/600x300",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find((p) => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Blog & News</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest product updates, tutorials, and industry insights
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href={`/blog/${featuredPost.id}`}
              className="block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-primary/20 via-pink-500/20 to-red-500/20" />
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm w-fit mb-4">
                    Featured
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </section>

      {/* Search and Categories */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 py-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No articles found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.filter(p => !p.featured).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors h-full"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/10 via-pink-500/10 to-red-500/10" />
                  <div className="p-6">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs mb-3">
                      <Tag className="h-3 w-3 mr-1" />
                      {post.category}
                    </span>
                    <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 rounded-lg border border-input hover:bg-accent">
            Load More Articles
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest updates on product releases, tutorials, and industry insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
            />
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
              Subscribe
            </button>
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
