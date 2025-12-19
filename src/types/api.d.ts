// API 에러 응답 타입
type ApiErrorResponse = {
  error: {
    message: string;
    code: string;
  };
  success: boolean;
};

// API 성공 응답 구조 (공통)
type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};
