import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "collapse.by",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
