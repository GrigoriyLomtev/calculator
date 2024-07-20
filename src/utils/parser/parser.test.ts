import { parseExpression } from "./parser";

describe("parseExpression", () => {
  test("should parse a simple expression", () => {
    expect(parseExpression("3 + 4")).toEqual(["3", "+", "4"]);
  });

  test("should parse an expression with multiple operators", () => {
    expect(parseExpression("3 + 4 * 2")).toEqual(["3", "+", "4", "*", "2"]);
  });

  test("should parse an expression with square root", () => {
    expect(parseExpression("√9 + 2")).toEqual(["√", "9", "+", "2"]);
  });

  test("should parse an expression with percentage", () => {
    expect(parseExpression("50 % 2")).toEqual(["50", "%", "2"]);
  });

  test("should throw error on invalid character", () => {
    expect(() => parseExpression("3 + 4 & 2")).toThrow(
      "Invalid character encountered: &",
    );
  });
});
