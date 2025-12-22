import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SelectStep2 from "@/app/team-maker/select/step2/page";

const meta = {
  title: "Page/TeamMaker/Select/Step2",
  component: SelectStep2,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SelectStep2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      if (typeof window !== "undefined") {
        // 초기 상태 설정이 필요하다면 여기서 localStorage 조작
        // 예: localStorage.setItem("players", JSON.stringify(["Player 1"]));
      }
      return <Story />;
    },
  ],
};
