import { ResponseStructure } from "./common";

/* -------------------------------------------- */
/*                      로그인                     */
/* -------------------------------------------- */
export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginInfoItem {
  _id: string;
  realName: string;
  userId: string;
  email: string;
  subAccount?: {
    isEnabled: boolean;
  };
}

// 실제 API 응답 구조: { success, message, data: { ...user정보 } }
export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginInfoItem;
}

/* -------------------------------------------- */
/*                     회원가입                     */
/* -------------------------------------------- */
export interface SignUpRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  realName: string;
  userId: string;
}

export type SignUpResponse = ResponseStructure<null>;

/* -------------------------------------------- */
/*                     로그아웃                     */
/* -------------------------------------------- */
export type LogoutResponse = ResponseStructure<null>;
