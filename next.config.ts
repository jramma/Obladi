import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ob-ladi-images-jramma.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
