import { cookies } from "next/headers";
import { LoginInfoItem } from "@/types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// 서버 사이드에서 인증 확인
export async function getServerAuth(): Promise<LoginInfoItem | null> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    if (!cookieHeader) {
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}
