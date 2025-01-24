import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false,
  compiler: { styledComponents: true },
  images: { remotePatterns: [{ hostname: "res.cloudinary.com" }] },
};

export default nextConfig;
