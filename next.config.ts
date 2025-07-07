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
  // Add polyfills for older browsers
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add polyfills for client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Set minimum browser support
  transpilePackages: ['@radix-ui/react-icons', 'lucide-react'],
};

export default nextConfig;
