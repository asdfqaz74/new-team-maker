import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { useSnackbar } from "@/hooks/useSnackbar";
import { login } from "@/api/user.api";
import { AxiosError } from "axios";

type SignInForm = {
  userId: string;
  password: string;
};

const SignIn = () => {
  const { success, error: showError } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInForm>({ mode: "onChange" });

  const onSubmit = async (data: SignInForm) => {
    try {
      await login(data);
      success("로그인에 성공했습니다!");
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
          disabled={!isValid}
          className={`mt-2 px-4 py-2 text-white font-bold rounded-lg transition-colors  ${
            !isValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default SignIn;
