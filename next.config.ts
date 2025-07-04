import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // For image testing:
  images: {
    domains: ['avatars.githubusercontent.com', 'raw.githubusercontent.com', "github.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
