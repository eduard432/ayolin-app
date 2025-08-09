import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // For image testing:
  images: {
    domains: ['avatars.githubusercontent.com', 'raw.githubusercontent.com', "github.com", "jiaq9ymgisc0ie2r.public.blob.vercel-storage.com"],
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
