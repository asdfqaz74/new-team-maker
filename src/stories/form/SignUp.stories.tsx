import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SignUp from "@/components/form/SignUp";

const meta = {
  title: "Form/SignUp",
  component: SignUp,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/signup",
      },
    },
  },
} satisfies Meta<typeof SignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 로그인 폼
export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};
