import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://103.144.209.106:3000/api/:path*", // Proxy to your backend
      },
    ];
  },
};

export default nextConfig;
