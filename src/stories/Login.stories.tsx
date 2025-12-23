import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import Login from "../components/menu/desktop/Login";
import { userInfoAtom } from "@/store/user.store";
import { LoginInfoItem } from "@/types/user";

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
  title: "Components/Login",
  component: Login,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

// 로그아웃 상태
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

// 로그인 상태
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
