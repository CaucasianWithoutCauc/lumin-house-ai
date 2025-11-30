"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, ArrowLeft, Check, Copy, Clock, AlertCircle, Loader2,
  Bitcoin, Wallet, CreditCard, ChevronRight, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const creditPackages = [
  { amount: 50, bonus: 0 },
  { amount: 100, bonus: 10 },
  { amount: 250, bonus: 35 },
  { amount: 500, bonus: 100 },
  { amount: 1000, bonus: 250 },
  { amount: 5000, bonus: 1500 },
];

// Note: These are placeholder addresses for demonstration purposes.
// In production, use environment variables (process.env.NEXT_PUBLIC_*) 
// and generate unique addresses per transaction via a payment gateway API.
const cryptoOptions = [
  { id: "wallet-connect", name: "Connect Wallet", symbol: "Web3", icon: "🦊", color: "text-orange-400", address: "", isWalletConnect: true },
  { id: "btc", name: "Bitcoin", symbol: "BTC", icon: "₿", color: "text-orange-500", address: process.env.NEXT_PUBLIC_BTC_ADDRESS || "bc1q...demo" },
  { id: "eth", name: "Ethereum", symbol: "ETH", icon: "Ξ", color: "text-blue-500", address: process.env.NEXT_PUBLIC_ETH_ADDRESS || "0x...demo" },
  { id: "usdt", name: "Tether", symbol: "USDT", icon: "₮", color: "text-green-500", address: process.env.NEXT_PUBLIC_USDT_ADDRESS || "0x...demo" },
  { id: "usdc", name: "USD Coin", symbol: "USDC", icon: "$", color: "text-blue-400", address: process.env.NEXT_PUBLIC_USDC_ADDRESS || "0x...demo" },
];

// Note: In production, fetch real-time exchange rates from an API (e.g., CoinGecko, CoinMarketCap)
const EXCHANGE_RATES = {
  BTC: 43000, // USD per BTC
  ETH: 2200,  // USD per ETH
  USDT: 1,    // Stablecoin 1:1
  USDC: 1,    // Stablecoin 1:1
};

export default function CheckoutPage() {
  const { user, isLoading, updateBalance } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("usdt");
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "confirming" | "completed">("pending");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (step === 3 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
  const selectedPackage = creditPackages.find(p => p.amount === selectedAmount);
  const bonus = selectedPackage?.bonus || 0;
  const totalCredits = finalAmount + bonus;
  const selectedCryptoOption = cryptoOptions.find(c => c.id === selectedCrypto);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const copyAddress = () => {
    if (selectedCryptoOption) {
      navigator.clipboard.writeText(selectedCryptoOption.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const connectWallet = async () => {
    // Simulate wallet connection (in production, use ethers.js or wagmi)
    setPaymentStatus("confirming");
    setTimeout(() => {
      setWalletConnected(true);
      setWalletAddress("0x742d...8f3e");
      setPaymentStatus("pending");
    }, 1500);
  };

  const payWithWallet = async () => {
    setPaymentStatus("confirming");
    // Simulate Web3 transaction
    setTimeout(() => {
      setPaymentStatus("completed");
      updateBalance(totalCredits);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 2000);
  };

  const simulatePayment = () => {
    setPaymentStatus("confirming");
    setTimeout(() => {
      setPaymentStatus("completed");
      updateBalance(totalCredits);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="p-2 rounded-lg hover:bg-accent">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Lumin House AI</span>
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            Current Balance: <span className="font-medium text-foreground">${user.balance.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                  s < step ? "bg-primary text-primary-foreground" :
                  s === step ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {s < step ? <Check className="h-4 w-4" /> : s}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${
                  s <= step ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {s === 1 ? "Amount" : s === 2 ? "Payment" : "Complete"}
                </span>
                {s < 3 && <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Step 1: Select Amount */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Select Amount</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {creditPackages.map((pkg) => (
                <button
                  key={pkg.amount}
                  onClick={() => {
                    setSelectedAmount(pkg.amount);
                    setCustomAmount("");
                  }}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedAmount === pkg.amount && !customAmount
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-2xl font-bold">${pkg.amount}</div>
                  {pkg.bonus > 0 && (
                    <div className="text-sm text-success-foreground">+${pkg.bonus} bonus</div>
                  )}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Or enter custom amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="10"
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-input bg-background"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">${finalAmount.toFixed(2)}</span>
              </div>
              {bonus > 0 && (
                <div className="flex justify-between mb-2 text-success-foreground">
                  <span>Bonus Credits</span>
                  <span>+${bonus.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-border text-lg">
                <span className="font-medium">Total Credits</span>
                <span className="font-bold">${totalCredits.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
            
            {/* Recommended: Wallet Connect */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Recommended - Instant payment</p>
              <button
                onClick={() => setSelectedCrypto("wallet-connect")}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedCrypto === "wallet-connect"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 flex items-center justify-center text-xl">
                    🦊
                  </div>
                  <div>
                    <h3 className="font-semibold">Connect Wallet</h3>
                    <p className="text-sm text-muted-foreground">MetaMask, WalletConnect, Coinbase</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full bg-success/20 text-success-foreground text-xs font-medium">
                    Instant
                  </span>
                  {selectedCrypto === "wallet-connect" && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-3">Or pay with manual transfer</p>
            <div className="space-y-3">
              {cryptoOptions.filter(c => c.id !== "wallet-connect").map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => setSelectedCrypto(crypto.id)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedCrypto === crypto.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xl ${crypto.color}`}>
                      {crypto.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{crypto.name}</h3>
                      <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                    </div>
                  </div>
                  {selectedCrypto === crypto.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-warning/10 border border-warning/20 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-warning-foreground mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">
                  {selectedCrypto === "wallet-connect" 
                    ? "Connect your wallet for instant payment"
                    : "Manual payment must be completed within 6 hours"
                  }
                </p>
                <p className="text-muted-foreground">
                  {selectedCrypto === "wallet-connect"
                    ? "Transactions are confirmed instantly on-chain. No waiting required."
                    : "After 6 hours, the payment will expire and you will need to create a new order."
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Complete Payment */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            {paymentStatus === "completed" ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-success-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-muted-foreground mb-6">
                  ${totalCredits.toFixed(2)} credits have been added to your account.
                </p>
                <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
              </div>
            ) : selectedCrypto === "wallet-connect" ? (
              /* Web3 Wallet Connect Flow */
              <>
                <h2 className="text-2xl font-bold mb-6">Connect Your Wallet</h2>

                <div className="p-6 rounded-xl border border-border bg-card mb-6">
                  {!walletConnected ? (
                    <div className="text-center py-8">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 flex items-center justify-center text-3xl mx-auto mb-4">
                        🦊
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Connect Your Web3 Wallet</h3>
                      <p className="text-muted-foreground mb-6">
                        Connect MetaMask, WalletConnect, or any compatible wallet to pay instantly.
                      </p>
                      <button
                        onClick={connectWallet}
                        disabled={paymentStatus === "confirming"}
                        className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-purple-600 text-white font-medium hover:opacity-90 disabled:opacity-50"
                      >
                        {paymentStatus === "confirming" ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <Wallet className="h-5 w-5 mr-2" />
                            Connect Wallet
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                            <Check className="h-5 w-5 text-success-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">Wallet Connected</p>
                            <p className="text-sm text-muted-foreground font-mono">{walletAddress}</p>
                          </div>
                        </div>
                        <button className="text-sm text-muted-foreground hover:text-foreground">
                          Disconnect
                        </button>
                      </div>

                      <div className="p-4 rounded-lg bg-muted mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Amount</span>
                          <span className="font-medium">${finalAmount.toFixed(2)} USDT</span>
                        </div>
                        {bonus > 0 && (
                          <div className="flex justify-between mb-2 text-success-foreground">
                            <span>Bonus Credits</span>
                            <span>+${bonus.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-border text-lg">
                          <span className="font-medium">Total Credits</span>
                          <span className="font-bold text-success-foreground">${totalCredits.toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        onClick={payWithWallet}
                        disabled={paymentStatus === "confirming"}
                        className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50"
                      >
                        {paymentStatus === "confirming" ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            Confirming Transaction...
                          </>
                        ) : (
                          <>
                            Pay ${finalAmount.toFixed(2)} USDT
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Instant Confirmation</p>
                    <p className="text-muted-foreground">
                      Web3 wallet payments are confirmed instantly. No waiting for blockchain confirmations.
                    </p>
                  </div>
                </div>
              </>
            ) : selectedCryptoOption ? (
              /* Manual Crypto Transfer Flow */
              <>
                <h2 className="text-2xl font-bold mb-6">Complete Payment</h2>

                <div className="p-6 rounded-xl border border-border bg-card mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xl ${selectedCryptoOption.color}`}>
                        {selectedCryptoOption.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">Send {selectedCryptoOption.symbol}</h3>
                        <p className="text-sm text-muted-foreground">Network: {selectedCryptoOption.id === "btc" ? "Bitcoin" : "ERC-20"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-warning-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="font-mono">{formatTime(timeLeft)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Time remaining</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Amount to send</p>
                    <p className="text-2xl font-bold font-mono">
                      {selectedCryptoOption.id === "btc" 
                        ? (finalAmount / EXCHANGE_RATES.BTC).toFixed(8) 
                        : selectedCryptoOption.id === "eth"
                        ? (finalAmount / EXCHANGE_RATES.ETH).toFixed(6)
                        : finalAmount.toFixed(2)
                      } {selectedCryptoOption.symbol}
                    </p>
                    <p className="text-sm text-muted-foreground">≈ ${finalAmount.toFixed(2)} USD</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Send to this address:</p>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 p-3 rounded-lg bg-muted font-mono text-sm break-all">
                        {selectedCryptoOption.address}
                      </code>
                      <button
                        onClick={copyAddress}
                        className="p-3 rounded-lg bg-muted hover:bg-accent"
                      >
                        {copied ? <Check className="h-5 w-5 text-success-foreground" /> : <Copy className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {paymentStatus === "confirming" && (
                    <div className="flex items-center justify-center p-4 rounded-lg bg-primary/10">
                      <Loader2 className="h-5 w-5 animate-spin mr-2 text-primary" />
                      <span className="text-primary">Confirming payment on blockchain...</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={simulatePayment}
                    disabled={paymentStatus !== "pending"}
                    className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50"
                  >
                    {paymentStatus === "confirming" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Confirming...
                      </>
                    ) : (
                      "I have sent the payment"
                    )}
                  </button>
                  <p className="text-center text-sm text-muted-foreground">
                    Payment will be automatically detected once confirmed on the blockchain
                  </p>
                </div>
              </>
            ) : null}
          </motion.div>
        )}

        {/* Navigation */}
        {step < 3 && (
          <div className="max-w-2xl mx-auto mt-8 flex justify-between">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className="flex items-center px-4 py-2 rounded-lg border border-input hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
            
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && finalAmount < 10}
              className="flex items-center px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
