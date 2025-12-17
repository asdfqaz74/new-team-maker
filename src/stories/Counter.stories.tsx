import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Counter from "../components/Counter";

const meta: Meta<typeof Counter> = {
  title: "Components/Counter",
  component: Counter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

// 기본 스토리
export const Default: Story = {};
