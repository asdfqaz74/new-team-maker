import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 HTML로 내보내기
  productionBrowserSourceMaps: false,
  // 정적 내보내기에서는 rewrites 사용 불가
  // API는 클라이언트에서 직접 호출하거나 환경 변수로 설정
};

export default nextConfig;
