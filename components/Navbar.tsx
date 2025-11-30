"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Zap, Menu, X, ChevronDown, Cpu, Server, HardDrive, Database, Headphones, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const products = [
  { name: "Cloud GPU", href: "#gpu", icon: Cpu, description: "NVIDIA H100, A100, RTX 4090" },
  { name: "Cloud Compute", href: "#compute", icon: Server, description: "Scalable virtual machines" },
  { name: "Bare Metal", href: "#bare-metal", icon: HardDrive, description: "Dedicated servers" },
  { name: "Storage", href: "#storage", icon: Database, description: "Block & Object storage" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
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
                <div className="absolute top-full left-0 mt-1 w-64 rounded-lg border border-border bg-background shadow-lg py-2">
                  {products.map((product) => {
                    const Icon = product.icon;
                    return (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="flex items-start px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <Icon className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.description}</div>
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
              href="/docs"
              className="px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground/70"
            >
              Docs
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
                  href="/docs"
                  className="text-foreground/80 hover:text-foreground py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Documentation
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
