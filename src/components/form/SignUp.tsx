"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import FormInput from "./FormInput";
import { signup } from "@/api/user.api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/useSnackbar";
import PrivacyConsentModal from "@/components/modal/PrivacyConsentModal";

/* -------------------------------------------- */
/*                  상수 및 타입 정의                  */
/* -------------------------------------------- */

type SignUpForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  userId: string;
  realName: string;
};

// Validation 정규식
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
const userIdRegex = /^[a-zA-Z0-9]{8,}$/;

const SignUp = () => {
  /* -------------------------------------------- */
  /*                     상태관리                     */
  /* -------------------------------------------- */
  const [isOpen, setIsOpen] = useState(false); // 개인정보 수집 동의 모달 상태
  const [hasConsented, setHasConsented] = useState(false);
  const { success, error: showError } = useSnackbar();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>();

  /* -------------------------------------------- */
  /*                    이벤트 핸들러                   */
  /* -------------------------------------------- */

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signup(data);
      success("회원가입이 완료되었습니다!");
      router.back();
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error(error.response?.data.error.code);
      showError(
        error.response?.data?.error?.message || "회원가입에 실패했습니다."
      );
    }
  };

  const handleCheckbox = () => {
    setHasConsented(!hasConsented);
  };

  return (
    <div className="flex flex-col gap-4 p-8 bg-white/50 border border-white/20 rounded-4xl shadow-2xl backdrop-blur-2xl text-black">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
        팀메이커에 오신 것을 <br className="md:hidden" /> 환영합니다!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <FormInput
          type="email"
          name="email"
          register={register}
          label="이메일"
          placeholder="이메일을 입력하세요"
          error={errors.email?.message}
          rules={{
            required: "이메일을 입력해주세요",
            pattern: {
              value: emailRegex,
              message: "올바른 이메일 형식이 아닙니다",
            },
          }}
        />

        <div className="flex gap-8 flex-col md:flex-row md:justify-between">
          <FormInput
            type="text"
            name="realName"
            register={register}
            label="이름"
            placeholder="이름을 입력하세요"
            error={errors.realName?.message}
            rules={{
              required: "이름을 입력해주세요",
            }}
          />
          <FormInput
            type="text"
            name="userId"
            register={register}
            label="아이디"
            placeholder="아이디를 입력하세요"
            error={errors.userId?.message}
            rules={{
              required: "아이디를 입력해주세요",
              pattern: {
                value: userIdRegex,
                message: "아이디는 8자 이상 영문/숫자만 가능합니다",
              },
            }}
          />
        </div>
        <div className="flex gap-8 flex-col md:flex-row md:justify-between">
          <FormInput
            type="password"
            name="password"
            register={register}
            label="비밀번호"
            placeholder="문자+숫자 조합 8자 이상"
            error={errors.password?.message}
            rules={{
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: passwordRegex,
                message:
                  "비밀번호는 최소 8자, 최대 15자이며, 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함해야 합니다.",
              },
            }}
          />
          <FormInput
            type="password"
            name="passwordConfirm"
            register={register}
            label="비밀번호 확인"
            placeholder="비밀번호를 입력하세요"
            error={errors.passwordConfirm?.message}
            rules={{
              required: "비밀번호 확인을 입력해주세요",
              validate: (value) =>
                value === getValues("password") ||
                "비밀번호가 일치하지 않습니다",
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600 text-center">
            입력하신 정보는 회원가입 및 계정 관리 목적으로만 사용됩니다.
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="privacyConsent"
                id="privacyConsent"
                checked={hasConsented}
                onChange={handleCheckbox}
              />
              <label htmlFor="privacyConsent" className="text-sm text-gray-600">
                개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>
            <button
              className="text-sm text-blue-600 cursor-pointer text-center hover:underline"
              onClick={() => setIsOpen(true)}
              type="button"
            >
              [자세히보기]
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={`mt-2 px-4 py-2 text-white font-bold rounded-lg transition-colors ${
            hasConsented
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!hasConsented}
        >
          회원가입
        </button>
      </form>
      <PrivacyConsentModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        setAgree={() => setHasConsented(true)}
      />
    </div>
  );
};

export default SignUp;
