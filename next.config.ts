import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   unoptimized: true,
  // },
  // trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/images/**',
        port: '5059',
      },
    ],
  },
  // Browser compatibility settings
  experimental: {
    // Enable modern JavaScript features with fallbacks
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  // Turbopack configuration (moved from experimental.turbo)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Set minimum browser support
  transpilePackages: ['@radix-ui/react-icons', 'lucide-react'],
};

export default nextConfig;
