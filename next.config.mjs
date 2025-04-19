/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // If client-side, don't polyfill Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        http: false,
        https: false,
        url: false,
        path: false,
        stream: false,
        crypto: false,
        zlib: false,
        'node:fs': false,
        'node:fs/promises': false,
        'node:path': false,
        'node:stream': false,
        'node:crypto': false,
        'node:http': false,
        'node:https': false,
        'node:url': false,
      };
    }
    
    return config;
  },
  // Prevent importing node modules in client components
  serverExternalPackages: ['pdf-parse', '@langchain/community'],
};

export default nextConfig;
