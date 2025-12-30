import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const apiProxyTarget = process.env.API_PROXY_TARGET;

const nextConfig: NextConfig = {
  // 프로덕션에서만 정적 내보내기 (Cloudflare Pages 배포용)
  ...(isProduction && { output: "export" }),
  productionBrowserSourceMaps: false,
  // 정적 내보내기에서는 이미지 최적화 비활성화 필요
  images: {
    unoptimized: true,
  },
  // 개발 환경에서만 프록시 활성화
  async rewrites() {
    if (isProduction || !apiProxyTarget) {
      return [];
    }
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
