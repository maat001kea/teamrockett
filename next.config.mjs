/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.dummyjson.com"],
  },
  experimental: {
    appDir: true,
  },
  transpilePackages: ["@clerk/nextjs"],
};

export default nextConfig;
