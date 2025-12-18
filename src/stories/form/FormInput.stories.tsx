import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";

// react-hook-form을 사용하는 래퍼 컴포넌트
type DemoForm = {
  email: string;
  password: string;
  username: string;
};

const FormInputWrapper = ({
  type,
  name,
  placeholder,
  label,
  error,
  required,
}: {
  type: "email" | "text" | "password";
  name: keyof DemoForm;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
}) => {
  const { register } = useForm<DemoForm>();

  return (
    <FormInput
      type={type}
      name={name}
      register={register}
      placeholder={placeholder}
      label={label}
      error={error}
      required={required}
    />
  );
};

const meta = {
  title: "Form/FormInput",
  component: FormInputWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password"],
    },
    name: {
      control: "select",
      options: ["email", "password", "username"],
    },
  },
} satisfies Meta<typeof FormInputWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본
export const Default: Story = {
  args: {
    type: "text",
    name: "username",
    placeholder: "입력하세요",
  },
};

// 라벨 포함
export const WithLabel: Story = {
  args: {
    type: "text",
    name: "username",
    label: "사용자명",
    placeholder: "사용자명을 입력하세요",
  },
};

// 필수 입력
export const Required: Story = {
  args: {
    type: "email",
    name: "email",
    label: "이메일",
    placeholder: "이메일을 입력하세요",
    required: true,
  },
};

// 에러 상태
export const WithError: Story = {
  args: {
    type: "email",
    name: "email",
    label: "이메일",
    placeholder: "이메일을 입력하세요",
    error: "올바른 이메일 형식이 아닙니다",
    required: true,
  },
};

// 비밀번호
export const Password: Story = {
  args: {
    type: "password",
    name: "password",
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    required: true,
  },
};
