import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is a single page and can be hosted anywhere
  // (Vercel, Netlify, S3, an agency's own server).
  output: "export",
  images: { unoptimized: true },
  // Optional relative asset paths for hosting from a sub-folder.
  assetPrefix: process.env.ASSET_PREFIX || undefined,
};

export default nextConfig;
