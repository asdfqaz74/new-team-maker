import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Axios 인스턴스 생성
// Next.js rewrites를 통해 /api -> EC2 서버로 프록시됨 (CORS 우회)
const apiClient: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 요청에 자동으로 포함
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // withCredentials: true 설정으로 쿠키(accessToken, refreshToken)가 자동으로 전송됨
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // 에러 핸들링
    if (error.response) {
      // 서버 응답이 있는 경우
      const { status } = error.response;
      if (status === 401) {
        // 인증 에러 처리
        console.error("권한이 없습니다.");
      } else if (status === 403) {
        // 권한 에러 처리
        console.error("접근이 금지되었습니다.");
      } else if (status === 500) {
        // 서버 에러 처리
        console.error("서버 오류가 발생했습니다.");
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      console.error("네트워크 오류가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);

// API 메서드 헬퍼
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;
