import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AddPlayer from "@/components/team-maker/AddPlayer";

const meta = {
  title: "TeamMaker/AddPlayer",
  component: AddPlayer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AddPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
