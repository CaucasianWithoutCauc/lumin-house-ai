// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.nvidia.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;