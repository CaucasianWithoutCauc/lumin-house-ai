"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  Briefcase, MapPin, Clock, ChevronRight, Search,
  Heart, Zap, Users, Globe2, GraduationCap, Coffee,
  Plane, HeartPulse, Baby, Building2, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const departments = [
  "All Departments",
  "Engineering",
  "Product",
  "Data Science",
  "Operations",
  "Sales",
  "Marketing",
  "HR",
  "Finance",
];

const locations = [
  "All Locations",
  "Singapore",
  "San Francisco",
  "Hong Kong",
  "London",
  "Remote",
];

const jobs = [
  {
    id: 1,
    title: "Senior GPU Systems Engineer",
    department: "Engineering",
    location: "Singapore",
    type: "Full-time",
    posted: "2 days ago",
    description: "Design and optimize GPU cluster architectures for high-performance AI workloads.",
  },
  {
    id: 2,
    title: "AI/ML Platform Engineer",
    department: "Engineering",
    location: "San Francisco",
    type: "Full-time",
    posted: "3 days ago",
    description: "Build and maintain our AI training and inference platform infrastructure.",
  },
  {
    id: 3,
    title: "Research Scientist - LLM",
    department: "Data Science",
    location: "Remote",
    type: "Full-time",
    posted: "1 week ago",
    description: "Lead research on large language model optimization and deployment strategies.",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Hong Kong",
    type: "Full-time",
    posted: "1 week ago",
    description: "Manage cloud infrastructure and CI/CD pipelines for our global platform.",
  },
  {
    id: 5,
    title: "Product Manager - AI Cloud",
    department: "Product",
    location: "Singapore",
    type: "Full-time",
    posted: "2 weeks ago",
    description: "Define and drive the roadmap for our AI cloud products.",
  },
  {
    id: 6,
    title: "Data Center Operations Manager",
    department: "Operations",
    location: "Dallas",
    type: "Full-time",
    posted: "2 weeks ago",
    description: "Oversee daily operations of our GPU data center facility.",
  },
  {
    id: 7,
    title: "Enterprise Sales Representative",
    department: "Sales",
    location: "London",
    type: "Full-time",
    posted: "3 weeks ago",
    description: "Drive enterprise sales and build relationships with key accounts in EMEA.",
  },
  {
    id: 8,
    title: "Graduate Talent Program",
    department: "Engineering",
    location: "Singapore",
    type: "Full-time",
    posted: "1 month ago",
    description: "2-year rotational program for fresh graduates to explore different engineering roles.",
  },
];

const benefits = [
  { icon: HeartPulse, title: "Health Insurance", description: "Comprehensive medical, dental, and vision coverage" },
  { icon: Plane, title: "Unlimited PTO", description: "Take the time you need to recharge" },
  { icon: Coffee, title: "Remote Friendly", description: "Work from anywhere with flexible hours" },
  { icon: GraduationCap, title: "Learning Budget", description: "$5,000 annual budget for courses and conferences" },
  { icon: Baby, title: "Parental Leave", description: "16 weeks paid leave for new parents" },
  { icon: Building2, title: "Office Perks", description: "Free meals, snacks, and wellness programs" },
];

const values = [
  {
    icon: Zap,
    title: "Move Fast",
    description: "We ship quickly and iterate based on feedback. Speed is our competitive advantage.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "We work as one team across departments and time zones to solve hard problems.",
  },
  {
    icon: Heart,
    title: "Care Deeply",
    description: "We genuinely care about our users, teammates, and the impact of our work.",
  },
  {
    icon: Globe2,
    title: "Think Global",
    description: "We build for users worldwide and embrace diverse perspectives.",
  },
];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "All Departments" || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === "All Locations" || job.location === selectedLocation;
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Help us build the future of AI infrastructure. We&apos;re looking for passionate 
            individuals who want to make GPU computing accessible to everyone.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#openings"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View Open Positions
              <ChevronRight className="h-4 w-4 ml-2" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Culture */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Culture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Benefits & Perks</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          We take care of our team so they can focus on doing their best work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <Icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 rounded-lg border border-input bg-background"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 rounded-lg border border-input bg-background"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Jobs List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No jobs match your search criteria. Try adjusting your filters.
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/careers/${job.id}`}
                  className="block p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.posted}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground hidden md:block" />
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-pink-500/20 to-red-500/20 border border-primary/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Don&apos;t see the right role?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We&apos;re always looking for talented people. Send us your resume and we&apos;ll 
            reach out when we have a role that matches your skills.
          </p>
          <a
            href="mailto:careers@luminhouse.ai"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Send Your Resume
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
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
