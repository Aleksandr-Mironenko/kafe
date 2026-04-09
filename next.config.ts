import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,

  images: {
    domains: ['uraaejrhmdwfoahggnzg.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pyzpdyaqsrbgstfdlycz.supabase.co',
        pathname: '/storage/**',
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],

  },
  turbopack: {
    root: './',
  },
};

export default nextConfig;
