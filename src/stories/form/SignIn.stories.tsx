import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SignIn from "@/components/form/SignIn";

const meta = {
  title: "Form/SignIn",
  component: SignIn,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a2e" },
        {
          name: "gradient",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
      ],
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/signin",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SignIn>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 로그인 폼
export const Default: Story = {};

// 모바일 뷰
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-w-[300px] p-4">
        <Story />
      </div>
    ),
  ],
};

// 태블릿 뷰
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-w-[500px]">
        <Story />
      </div>
    ),
  ],
};

// 다크 배경에서의 글래스모피즘 효과
export const GlassmorphismEffect: Story = {
  decorators: [
    (Story) => (
      <div
        className="min-w-[400px] p-8 rounded-xl"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
