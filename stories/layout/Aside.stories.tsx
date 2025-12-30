import type { Meta, StoryObj } from "@storybook/react";
import Aside from "@/components/layout/Aside";

const meta: Meta<typeof Aside> = {
  title: "Layout/Aside",
  component: Aside,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Aside>;

export const Default: Story = {};
