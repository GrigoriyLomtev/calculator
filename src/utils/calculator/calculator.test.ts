import { infixToPostfix } from "./calculator";
import { parseExpression } from "../parser/parser";
import { calculateExpression } from "./calculator";

describe("infixToPostfix", () => {
  test("should convert simple expression", () => {
    const infix = parseExpression("3 + 4 * 2");
    const postfix = infixToPostfix(infix);
    expect(postfix).toEqual(["3", "4", "2", "*", "+"]);
  });

  test("should handle expressions with square root", () => {
    const infix = parseExpression("√ 9 + 2");
    const postfix = infixToPostfix(infix);
    expect(postfix).toEqual(["9", "√", "2", "+"]);
  });

  test("should handle expressions with percentage", () => {
    const infix = parseExpression("50 % 2 + 3");
    const postfix = infixToPostfix(infix);
    expect(postfix).toEqual(["50", "2", "%", "3", "+"]);
  });

  test("should handle complex expressions", () => {
    const infix = parseExpression("3 + 4 * 2 + √ 9");
    const postfix = infixToPostfix(infix);
    expect(postfix).toEqual(["3", "4", "2", "*", "+", "9", "√", "+"]);
  });
});

describe("calculateExpression", () => {
  test("should calculate simple expression", () => {
    expect(calculateExpression("3 + 4 * 2")).toBe("11");
  });

  test("should calculate expression with square root", () => {
    expect(calculateExpression("√ 9 + 2")).toBe("5");
  });

  test("should calculate expression with percentage", () => {
    expect(calculateExpression("50 % 2 + 3")).toBe("4");
  });

  test("should calculate complex expression", () => {
    expect(calculateExpression("3 + 4 * 2 + √ 9")).toBe("14");
  });
});
