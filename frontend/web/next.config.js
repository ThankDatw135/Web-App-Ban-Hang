/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'firebasestorage.googleapis.com'],
    formats: ['image/webp'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
