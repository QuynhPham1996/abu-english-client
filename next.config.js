/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  images: {
    domains: ['localhost', 'api.abuenglish.com'],
  },
};

module.exports = nextConfig;
