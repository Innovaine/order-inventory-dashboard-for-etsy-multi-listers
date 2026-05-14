/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Disable telemetry to speed up builds
  experimental: {
    instrumentationHook: false,
  },
}

module.exports = nextConfig
