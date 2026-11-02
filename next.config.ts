import type { NextConfig } from "next";

// Set when hosting from a sub-folder, e.g. GitHub Pages serves this site at
// /blackline-barbers. Leave unset for Vercel, Netlify or a custom domain.
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static export: the site is a single page and can be hosted anywhere.
  output: "export",
  images: { unoptimized: true },
  basePath,
  trailingSlash: true,
};

export default nextConfig;
