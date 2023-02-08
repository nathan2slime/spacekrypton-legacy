const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV != 'production',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: config => ({
    ...config,
    experiments: { ...config.experiments, topLevelAwait: true },
  }),
  experimental: {
    transpilePackages: ['@kry/react', '@kry/core'],
  },
};

module.exports = withPWA(nextConfig);
