import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ParticipantPlayer from "@/components/team-maker/ParticipantPlayer";

const meta = {
  title: "TeamMaker/ParticipantPlayer",
  component: ParticipantPlayer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ParticipantPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      return <Story />;
      // if (typeof window !== "undefined") {
      //   localStorage.setItem(
      //     "players",
      //     JSON.stringify(["홍길동", "김철수", "이영희"])
      //   );
      // }
      // return <Story />;
    },
  ],
};

// export const Empty: Story = {
//   decorators: [
//     (Story) => {
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("players");
//       }
//       return <Story />;
//     },
//   ],
// };
