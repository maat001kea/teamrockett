// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       "cdn.dummyjson.com",
//       "iip-thumb.smk.dk",
//       "api.smk.dk",
//       "iip.smk.dk",
//       "laqizwqplonobdzjohhg.supabase.co", // Tilføjet Supabase domæne
//     ],
//   },
//   transpilePackages: ["@clerk/nextjs"],
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["laqizwqplonobdzjohhg.supabase.co", "cdn.dummyjson.com", "iip-thumb.smk.dk", "api.smk.dk", "iip.smk.dk"],
  },
};

export default nextConfig;
