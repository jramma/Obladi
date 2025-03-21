import type { NextConfig } from "next";
const withPWA = require("next-pwa");

const nextConfig: NextConfig = {
  pwa: {
    dest: "public", // Esta es la carpeta donde se guardará el service worker y otros archivos estáticos
    disable: process.env.NODE_ENV === "development", // Deshabilitar PWA en desarrollo
  },
};

export default nextConfig;
