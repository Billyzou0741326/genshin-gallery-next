/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['img.minamiktr.com'],
  },
  serverRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL || '',
  },
}
