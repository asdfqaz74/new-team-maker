"use client";

import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { signup } from "@/api/user.api";

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

  const onSubmit = async (data: SignUpForm) => {
    console.log("회원가입 데이터:", data);

    try {
      const response = await signup(data);
      console.log("회원가입 성공:", response);
      alert("회원가입 성공!");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패! 콘솔을 확인하세요.");
    }
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

        <div className="flex gap-2 flex-col md:flex-row md:justify-between">
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
        <div className="flex gap-2 flex-col md:flex-row md:justify-between">
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
                value === getValues("password") ||
                "비밀번호가 일치하지 않습니다",
            }}
          />
        </div>
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
