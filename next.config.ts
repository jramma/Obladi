import type { NextConfig } from "next";
const withPWA = require("next-pwa");

const nextConfig: NextConfig = {
  pwa: {
    dest: "public", 
    disable: process.env.NODE_ENV === "development", 
  },
};

export default nextConfig;
