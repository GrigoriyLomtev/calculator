import { parseExpression } from "../parser/parser";

export const infixToPostfix = (tokens: string[]): string[] => {
  const precedence: { [key: string]: number } = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
    "√": 3,
    "(": 0,
    ")": 0,
  };
  const outputQueue: string[] = [];
  const operatorStack: string[] = [];

  tokens.forEach((token) => {
    if (!isNaN(parseFloat(token)) || token === ".") {
      outputQueue.push(token);
    } else if (/[+\-*/%√]/.test(token)) {
      while (
        operatorStack.length &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (operatorStack[operatorStack.length - 1] !== "(") {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.pop();
    }
  });

  while (operatorStack.length) {
    outputQueue.push(operatorStack.pop()!);
  }

  return outputQueue;
};

const evaluatePostfix = (tokens: string[]): number => {
  const stack: number[] = [];

  tokens.forEach((token) => {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else if (token === "√") {
      const a = stack.pop()!;
      stack.push(Math.sqrt(a));
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "%":
          stack.push((a * b) / 100);
          break;
        default:
          throw new Error(`Unsupported operator: ${token}`);
      }
    }
  });

  return stack[0];
};

export const calculateExpression = (expression: string): string => {
  const tokens = parseExpression(expression);
  const postfixTokens = infixToPostfix(tokens);
  const result = evaluatePostfix(postfixTokens);
  return result.toString();
};
