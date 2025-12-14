import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Base path for serving under /roi-calculator on the main ActARion website
  basePath: "/roi-calculator",
  
  // Ensure assets are served correctly when accessed via the main site
  assetPrefix: "/roi-calculator",
};

export default nextConfig;
