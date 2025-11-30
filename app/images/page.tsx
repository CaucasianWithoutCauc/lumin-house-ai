"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, Layers, Plus, Trash2, Upload, Server, HardDrive,
  ArrowLeft, Clock, Check, AlertCircle, Box, Star
} from "lucide-react";
import { motion } from "framer-motion";

interface Image {
  id: string;
  name: string;
  description: string;
  size: string;
  os: string;
  version: string;
  type: "base" | "custom" | "marketplace";
  status: "ready" | "building" | "failed";
  createdAt: string;
  starred: boolean;
}

const mockImages: Image[] = [
  {
    id: "img_1",
    name: "Ubuntu 22.04 + CUDA 12.2 + PyTorch 2.1",
    description: "Official base image with latest ML stack",
    size: "45 GB",
    os: "Ubuntu 22.04 LTS",
    version: "2024.01",
    type: "base",
    status: "ready",
    createdAt: "2024-01-01",
    starred: true,
  },
  {
    id: "img_2",
    name: "Ubuntu 22.04 + CUDA 12.2 + TensorFlow 2.15",
    description: "TensorFlow optimized environment",
    size: "48 GB",
    os: "Ubuntu 22.04 LTS",
    version: "2024.01",
    type: "base",
    status: "ready",
    createdAt: "2024-01-01",
    starred: false,
  },
  {
    id: "img_3",
    name: "LLM Training Stack",
    description: "Custom image with DeepSpeed, transformers, and vLLM",
    size: "72 GB",
    os: "Ubuntu 22.04 LTS",
    version: "1.0.0",
    type: "custom",
    status: "ready",
    createdAt: "2024-01-15",
    starred: true,
  },
  {
    id: "img_4",
    name: "Stable Diffusion WebUI",
    description: "Pre-configured AUTOMATIC1111 WebUI",
    size: "35 GB",
    os: "Ubuntu 22.04 LTS",
    version: "1.8.0",
    type: "marketplace",
    status: "ready",
    createdAt: "2024-01-10",
    starred: false,
  },
  {
    id: "img_5",
    name: "My Fine-tuning Environment",
    description: "Building from Dockerfile...",
    size: "-",
    os: "Ubuntu 22.04 LTS",
    version: "dev",
    type: "custom",
    status: "building",
    createdAt: "2024-01-22",
    starred: false,
  },
];

export default function ImagesPage() {
  const [images, setImages] = useState<Image[]>(mockImages);
  const [showUpload, setShowUpload] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "base" | "custom" | "marketplace">("all");
  const [newImageName, setNewImageName] = useState("");
  const [newImageDesc, setNewImageDesc] = useState("");

  const filteredImages = images.filter(
    (img) => activeTab === "all" || img.type === activeTab
  );

  const toggleStar = (id: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, starred: !img.starred } : img))
    );
  };

  const deleteImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const uploadImage = () => {
    if (newImageName) {
      const newImage: Image = {
        id: `img_${Date.now()}`,
        name: newImageName,
        description: newImageDesc || "Custom uploaded image",
        size: "Building...",
        os: "Ubuntu 22.04 LTS",
        version: "1.0.0",
        type: "custom",
        status: "building",
        createdAt: new Date().toISOString().split("T")[0],
        starred: false,
      };
      setImages([newImage, ...images]);
      setNewImageName("");
      setNewImageDesc("");
      setShowUpload(false);

      // Simulate build
      setTimeout(() => {
        setImages((prev) =>
          prev.map((img) =>
            img.id === newImage.id ? { ...img, status: "ready" as const, size: "52 GB" } : img
          )
        );
      }, 5000);
    }
  };

  const getStatusBadge = (status: Image["status"]) => {
    switch (status) {
      case "ready":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-success/20 text-success-foreground">
            <Check className="h-3 w-3" />
            Ready
          </span>
        );
      case "building":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
            <Layers className="h-3 w-3 animate-pulse" />
            Building
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-destructive/20 text-destructive">
            <AlertCircle className="h-3 w-3" />
            Failed
          </span>
        );
    }
  };

  const getTypeBadge = (type: Image["type"]) => {
    switch (type) {
      case "base":
        return (
          <span className="px-2 py-1 rounded text-xs bg-primary/20 text-primary">
            Official
          </span>
        );
      case "custom":
        return (
          <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">
            Custom
          </span>
        );
      case "marketplace":
        return (
          <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400">
            Marketplace
          </span>
        );
    }
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
                <span className="font-bold text-lg">Images</span>
              </div>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Upload className="h-4 w-4" />
              Upload Image
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {[
            { id: "all", label: "All Images" },
            { id: "base", label: "Base Images" },
            { id: "custom", label: "Custom Images" },
            { id: "marketplace", label: "Marketplace" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Images</p>
                <p className="text-3xl font-bold">{images.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Box className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Custom Images</p>
                <p className="text-3xl font-bold">
                  {images.filter((i) => i.type === "custom").length}
                </p>
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
              <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-warning-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Starred</p>
                <p className="text-3xl font-bold">
                  {images.filter((i) => i.starred).length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-primary bg-card"
          >
            <h2 className="text-lg font-semibold mb-4">Upload Custom Image</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image Name</label>
                <input
                  type="text"
                  value={newImageName}
                  onChange={(e) => setNewImageName(e.target.value)}
                  placeholder="e.g., my-training-env"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newImageDesc}
                  onChange={(e) => setNewImageDesc(e.target.value)}
                  placeholder="Describe your image..."
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div className="p-4 rounded-lg bg-muted border-2 border-dashed border-border text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drop your Dockerfile or Docker image here, or{" "}
                  <span className="text-primary cursor-pointer">browse</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports Dockerfile, .tar.gz images, or Docker Hub references
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowUpload(false)}
                  className="px-4 py-2 rounded-lg border border-input hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  onClick={uploadImage}
                  disabled={!newImageName}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  Build Image
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Images Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Layers className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{image.name}</h3>
                    <p className="text-xs text-muted-foreground">{image.os}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleStar(image.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    image.starred
                      ? "text-warning-foreground"
                      : "text-muted-foreground hover:text-warning-foreground"
                  }`}
                >
                  <Star className={`h-4 w-4 ${image.starred ? "fill-current" : ""}`} />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {image.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeBadge(image.type)}
                  {getStatusBadge(image.status)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{image.size}</span>
                  {image.type === "custom" && (
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {image.status === "ready" && (
                <Link
                  href={`/deploy?image=${image.id}`}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium"
                >
                  <Server className="h-4 w-4" />
                  Deploy with this Image
                </Link>
              )}
            </div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <Layers className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No images found</h3>
            <p className="text-muted-foreground">
              {activeTab === "custom"
                ? "Upload a custom image to get started"
                : "No images available in this category"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
