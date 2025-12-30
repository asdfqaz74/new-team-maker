import { LoginRequest, LoginResponse, SignUpRequest } from "@/types/user";
import { api } from "./index";
import { WaitingListResponse } from "@/types/team-maker";

/* -------------------------------------------- */
/*                      로그인                     */
/* -------------------------------------------- */
export const login = (data: LoginRequest) =>
  api.post<LoginResponse>("/api/users/login", data);

/* -------------------------------------------- */
/*                     로그아웃                     */
/* -------------------------------------------- */
export const logout = () => api.post("/api/users/logout");

/* -------------------------------------------- */
/*                     로그인확인                    */
/* -------------------------------------------- */
export const me = () => api.get<LoginResponse>("/api/users/me");

/* -------------------------------------------- */
/*                     회원가입                     */
/* -------------------------------------------- */
export const signup = (data: SignUpRequest) =>
  api.post("/api/users/register", data);

/* -------------------------------------------- */
/*                   대기명단 불러오기                  */
/* -------------------------------------------- */
export const getWaitingList = () =>
  api.get<WaitingListResponse>("/api/users/wait-players");
