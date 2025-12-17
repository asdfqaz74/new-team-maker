// 응답 구조
export interface ResponseStructure<T> {
  success: boolean;
  data?: T;
  message: string;
}
