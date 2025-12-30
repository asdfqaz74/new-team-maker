import { LoginRequest, LoginResponse, SignUpRequest } from "@/types/user";
import { api } from "./index";
import { WaitingListResponse } from "@/types/team-maker";

/* -------------------------------------------- */
/*                      로그인                     */
/* -------------------------------------------- */
export const login = (data: LoginRequest) =>
  api.post<LoginResponse>("/users/login", data);

/* -------------------------------------------- */
/*                     로그아웃                     */
/* -------------------------------------------- */
export const logout = () => api.post("/users/logout");

/* -------------------------------------------- */
/*                     로그인확인                    */
/* -------------------------------------------- */
export const me = () => api.get<LoginResponse>("/users/me");

/* -------------------------------------------- */
/*                     회원가입                     */
/* -------------------------------------------- */
export const signup = (data: SignUpRequest) =>
  api.post("/users/register", data);

/* -------------------------------------------- */
/*                   대기명단 불러오기                  */
/* -------------------------------------------- */
export const getWaitingList = () =>
  api.get<WaitingListResponse>("/users/wait-players");
