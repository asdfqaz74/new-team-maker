"use client";

import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useResetGameState } from "@/hooks/useResetGameState";
import { login } from "@/api/user.api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSetAtom } from "jotai";
import { userInfoAtom, isAuthLoadingAtom } from "@/store/user.store";

type SignInForm = {
  userId: string;
  password: string;
};

const SignIn = () => {
  /* -------------------------------------------- */
  /*                     상태관리                     */
  /* -------------------------------------------- */
  const setUserInfo = useSetAtom(userInfoAtom);
  const setAuthLoading = useSetAtom(isAuthLoadingAtom);

  /* -------------------------------------------- */
  /*                    커스텀훅 사용                   */
  /* -------------------------------------------- */
  const { success, error: showError } = useSnackbar();
  const { resetGameState } = useResetGameState();

  /* -------------------------------------------- */
  /*                     기본설정                     */
  /* -------------------------------------------- */
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInForm>({ mode: "onChange" });
  /* -------------------------------------------- */
  /*                    이벤트 핸들러                   */
  /* -------------------------------------------- */
  const onSubmit = async (data: SignInForm) => {
    try {
      const response = await login(data);
      const userInfo = response.data;

      if (userInfo) {
        resetGameState(); // 기존 게임 상태 초기화
        setUserInfo(userInfo);
        setAuthLoading(false); // 인증 완료 표시
        success("로그인에 성공했습니다!");
        router.push("/");
      } else {
        showError("로그인 응답에 사용자 정보가 없습니다.");
      }
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error(error.response?.data.error.code);
      showError(
        error.response?.data?.error?.message || "로그인에 실패했습니다."
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 p-8 bg-white/50 border border-white/20 rounded-4xl shadow-2xl backdrop-blur-2xl text-black">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4">로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <FormInput
          type="text"
          name="userId"
          register={register}
          label="아이디"
          placeholder="아이디를 입력하세요"
          error={errors.userId?.message}
          rules={{ required: "아이디를 입력해주세요" }}
        />
        <FormInput
          type="password"
          name="password"
          register={register}
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          error={errors.password?.message}
          rules={{ required: "비밀번호를 입력해주세요" }}
        />
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`mt-2 px-4 py-2 text-white font-bold rounded-lg transition-colors ${
            !isValid || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>
      <div className="flex justify-end gap-2">
        <span>회원이 아니신가요?</span>
        <Link
          href="/signup"
          className="underline decoration-blue-600 underline-offset-4 font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
