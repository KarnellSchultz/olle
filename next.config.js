/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.graphassets.com'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
