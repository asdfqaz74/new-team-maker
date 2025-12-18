import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Counter from "../components/Counter";

const meta = {
  title: "Components/Counter",
  component: Counter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {};
