import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Ensure webpack resolves modules from the project root directory first
    const projectRoot = path.resolve(__dirname);
    config.resolve.modules = [
      path.join(projectRoot, "node_modules"),
      ...(config.resolve.modules || []),
    ];
    
    // Also set the root to ensure proper resolution
    config.resolve.roots = [projectRoot];
    
    return config;
  },
};

export default nextConfig;
