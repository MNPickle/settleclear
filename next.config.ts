import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML for Bluehost / any static host (no Node runtime).
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
