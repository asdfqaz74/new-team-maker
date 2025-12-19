import { describe, it, expect } from "vitest";

// SignUp 컴포넌트에서 사용하는 validation 정규식 테스트
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
const userIdRegex = /^[a-zA-Z0-9]{8,}$/;

describe("SignUp Validation", () => {
  describe("이메일 유효성 검사", () => {
    it("올바른 이메일 형식을 통과해야 한다", () => {
      expect(emailRegex.test("test@example.com")).toBe(true);
      expect(emailRegex.test("user.name@domain.co.kr")).toBe(true);
      expect(emailRegex.test("user+tag@example.org")).toBe(true);
    });

    it("잘못된 이메일 형식은 실패해야 한다", () => {
      expect(emailRegex.test("invalid-email")).toBe(false);
      expect(emailRegex.test("@domain.com")).toBe(false);
      expect(emailRegex.test("user@")).toBe(false);
      expect(emailRegex.test("user@domain")).toBe(false);
      expect(emailRegex.test("")).toBe(false);
    });
  });

  describe("비밀번호 유효성 검사", () => {
    it("올바른 비밀번호 형식을 통과해야 한다", () => {
      // 대문자, 소문자, 숫자, 특수문자 포함, 8-15자
      expect(passwordRegex.test("Test1234!")).toBe(true);
      expect(passwordRegex.test("Password1@")).toBe(true);
      expect(passwordRegex.test("MyPass123#")).toBe(true);
    });

    it("대문자가 없으면 실패해야 한다", () => {
      expect(passwordRegex.test("test1234!")).toBe(false);
    });

    it("소문자가 없으면 실패해야 한다", () => {
      expect(passwordRegex.test("TEST1234!")).toBe(false);
    });

    it("숫자가 없으면 실패해야 한다", () => {
      expect(passwordRegex.test("TestTest!")).toBe(false);
    });

    it("특수문자가 없으면 실패해야 한다", () => {
      expect(passwordRegex.test("Test12345")).toBe(false);
    });

    it("8자 미만이면 실패해야 한다", () => {
      expect(passwordRegex.test("Test1!")).toBe(false);
    });

    it("15자 초과면 실패해야 한다", () => {
      expect(passwordRegex.test("Test1234567890!@")).toBe(false);
    });
  });

  describe("아이디 유효성 검사", () => {
    it("올바른 아이디 형식을 통과해야 한다", () => {
      expect(userIdRegex.test("testuser")).toBe(true);
      expect(userIdRegex.test("user1234")).toBe(true);
      expect(userIdRegex.test("Test1234")).toBe(true);
      expect(userIdRegex.test("12345678")).toBe(true);
    });

    it("8자 미만이면 실패해야 한다", () => {
      expect(userIdRegex.test("test")).toBe(false);
      expect(userIdRegex.test("user123")).toBe(false);
    });

    it("특수문자가 포함되면 실패해야 한다", () => {
      expect(userIdRegex.test("test@user")).toBe(false);
      expect(userIdRegex.test("test_user")).toBe(false);
      expect(userIdRegex.test("test-user")).toBe(false);
    });

    it("공백이 포함되면 실패해야 한다", () => {
      expect(userIdRegex.test("test user")).toBe(false);
    });
  });
});
