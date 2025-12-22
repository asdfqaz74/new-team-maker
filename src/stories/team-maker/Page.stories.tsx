import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TeamMaker from "@/app/team-maker/page";

const meta = {
  title: "Page/TeamMaker",
  component: TeamMaker,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TeamMaker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
