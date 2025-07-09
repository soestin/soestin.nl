import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: '*.scdn.co',
        pathname: '/image/**',
      },
    ],
  },
  
  // Enable webpack optimization
  webpack: (config, { isServer }) => {
    // Optimize for smaller bundles
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Disable source maps in production to reduce size
  productionBrowserSourceMaps: false,
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
