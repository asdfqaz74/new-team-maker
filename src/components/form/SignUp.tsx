"use client";

import { useForm } from "react-hook-form";
import FormInput from "./FormInput";

type SignUpForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  userId: string;
  realName: string;
};

// Validation 정규식
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
const userIdRegex = /^[a-zA-Z0-9]{8,}$/;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = (data: SignUpForm) => {
    console.log("회원가입 데이터:", data);
    // TODO: 회원가입 API 호출
  };

  return (
    <div className="flex flex-col gap-6 p-8 rounded-4xl shadow-2xl w-xl bg-white/10">
      <h2 className="text-xl font-bold text-white text-center">
        팀메이커에 오신 것을 환영합니다!
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
        <FormInput
          type="password"
          name="password"
          register={register}
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          error={errors.password?.message}
          desc="8자 이상, 문자와 숫자를 포함해야 합니다."
          rules={{
            required: "비밀번호를 입력해주세요",
            pattern: {
              value: passwordRegex,
              message: "비밀번호는 8자 이상, 문자+숫자 조합이어야 합니다",
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
              value === getValues("password") || "비밀번호가 일치하지 않습니다",
          }}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors cursor-pointer"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
