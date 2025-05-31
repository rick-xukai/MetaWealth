import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 在构建期间忽略ESLint错误
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
