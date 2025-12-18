import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Nav from "../components/layout/Nav";
import { useHydrateAtoms } from "jotai/utils";
import { userInfoAtom } from "@/store/user.store";
import { LoginInfoItem } from "@/types/user";
import { Provider } from "jotai";

// Jotai 초기값 주입을 위한 래퍼 컴포넌트
const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: [[typeof userInfoAtom, LoginInfoItem | null]];
  children: React.ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

const meta = {
  title: "Components/Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 로그아웃: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms initialValues={[[userInfoAtom, null]]}>
          <Story />
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const 로그인: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [
              userInfoAtom,
              {
                _id: "123",
                realName: "홍길동",
                userId: "hong123",
                email: "hong@example.com",
              },
            ],
          ]}
        >
          <Story />
        </HydrateAtoms>
      </Provider>
    ),
  ],
};
