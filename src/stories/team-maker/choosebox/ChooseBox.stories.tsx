import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ChooseBox from "@/components/team-maker/choosebox/ChooseBox";

const meta = {
  title: "TeamMaker/ChooseBox",
  component: ChooseBox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["select", "ai"],
    },
  },
} satisfies Meta<typeof ChooseBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Select: Story = {
  args: {
    type: "select",
  },
};

export const AI: Story = {
  args: {
    type: "ai",
  },
};
