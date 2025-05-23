/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.dummyjson.com", "iip-thumb.smk.dk", "api.smk.dk", "iip.smk.dk"],
  },
  transpilePackages: ["@clerk/nextjs"],
};

export default nextConfig;
