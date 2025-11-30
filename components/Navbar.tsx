"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  Zap, Menu, X, ChevronDown, Cpu, Server, HardDrive, Database, 
  Headphones, User, LogOut, Cloud, Layers, Book, FileText, 
  MessageSquare, HelpCircle, Building2, Users, Briefcase, 
  Mail, Globe2, Shield, TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const products = [
  { 
    name: "Cloud GPU", 
    href: "/pricing", 
    icon: Cpu, 
    description: "NVIDIA H100, H200, B200, RTX 4090",
    subItems: [
      { name: "H200 / H100", badge: "Enterprise", badgeColor: "bg-primary/20 text-primary" },
      { name: "B200", badge: "New", badgeColor: "bg-gradient-to-r from-primary to-pink-500 text-white" },
      { name: "RTX 5090 / 4090", badge: "Popular", badgeColor: "bg-success/20 text-success-foreground" },
    ]
  },
  { name: "AI Studio", href: "/ai-studio", icon: Layers, description: "Collaborative AI development platform" },
  { name: "Serverless GPU", href: "/serverless", icon: Cloud, description: "Auto-scaling GPU functions" },
  { name: "Bare Metal", href: "/pricing", icon: HardDrive, description: "Dedicated GPU servers" },
  { name: "Storage", href: "/pricing", icon: Database, description: "Block & Object storage" },
];

const resources = [
  { name: "Documentation", href: "/docs", icon: Book, description: "API reference and guides" },
  { name: "Help Center", href: "/help-center", icon: HelpCircle, description: "Knowledge base and tutorials" },
  { name: "FAQ", href: "/faq", icon: MessageSquare, description: "Frequently asked questions" },
  { name: "Blog", href: "/blog", icon: FileText, description: "Latest news and updates" },
];

const company = [
  { name: "About Us", href: "/about", icon: Building2, description: "Our story and mission" },
  { name: "Careers", href: "/careers", icon: Briefcase, description: "Join our team" },
  { name: "Partners", href: "/partners", icon: Users, description: "Partnership programs" },
  { name: "Investor Relations", href: "/investor-relations", icon: TrendingUp, description: "For shareholders" },
  { name: "Contact", href: "/contact", icon: Mail, description: "Get in touch" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg sm:text-xl">Lumin House AI</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-1">
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                onFocus={() => setIsProductsOpen(true)}
                className="inline-flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
              >
                Products
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 rounded-lg border border-border bg-background shadow-lg py-2">
                  {products.map((product) => {
                    const Icon = product.icon;
                    return (
                      <div key={product.name}>
                        <Link
                          href={product.href}
                          className="flex items-start px-4 py-3 hover:bg-accent transition-colors"
                        >
                          <Icon className="h-5 w-5 text-primary mr-3 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{product.name}</div>
                            <div className="text-xs text-muted-foreground">{product.description}</div>
                          </div>
                        </Link>
                        {/* GPU Sub-items with badges */}
                        {product.subItems && (
                          <div className="ml-12 mr-4 mb-2 space-y-1">
                            {product.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href="/pricing"
                                className="flex items-center justify-between px-3 py-1.5 rounded-md text-xs hover:bg-accent transition-colors"
                              >
                                <span className="text-muted-foreground hover:text-foreground">
                                  {subItem.name}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${subItem.badgeColor}`}>
                                  {subItem.badge}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                onFocus={() => setIsResourcesOpen(true)}
                className="inline-flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
              >
                Resources
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 rounded-lg border border-border bg-background shadow-lg py-2">
                  {resources.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <Icon className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button
                onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                onFocus={() => setIsCompanyOpen(true)}
                className="inline-flex items-center px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
              >
                Company
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCompanyOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 rounded-lg border border-border bg-background shadow-lg py-2">
                  {company.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <Icon className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
            >
              Pricing
            </Link>
            <Link
              href="/support"
              className="px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
            >
              <span className="flex items-center">
                <Headphones className="h-4 w-4 mr-1" />
                Support
              </span>
            </Link>
          </nav>
          <div className="flex items-center space-x-2 ml-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-muted-foreground hover:text-foreground hover:bg-accent h-9 px-3 py-2"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden flex-1 justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container px-4 py-4 space-y-4">
            {/* Mobile Products Section */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Products</p>
              {products.map((product) => {
                const Icon = product.icon;
                return (
                  <Link
                    key={product.name}
                    href={product.href}
                    className="flex items-center py-2 text-foreground/80 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Resources Section */}
            <div className="space-y-2 border-t border-border/40 pt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resources</p>
              {resources.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center py-2 text-foreground/80 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Company Section */}
            <div className="space-y-2 border-t border-border/40 pt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</p>
              {company.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center py-2 text-foreground/80 hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-border/40 pt-4">
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/pricing"
                  className="text-foreground/80 hover:text-foreground py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/support"
                  className="text-foreground/80 hover:text-foreground py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  Support
                </Link>
              </nav>
            </div>

            <div className="flex flex-col space-y-2 pt-2 border-t border-border/40">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
