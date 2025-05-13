/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.dummyjson.com"],
    domains: ["iip-thumb.smk.dk", "api.smk.dk", "iip.smk.dk"],
  },
  experimental: {
    appDir: true,
  },
  transpilePackages: ["@clerk/nextjs"],
};

export default nextConfig;
