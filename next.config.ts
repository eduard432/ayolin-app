import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // For image testing:
  images: {
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
