export const parseExpression = (expression: string): string[] => {
  const tokens: string[] = [];
  let numberBuffer: string[] = [];

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (/\d/.test(char) || char === ".") {
      numberBuffer.push(char);
    } else if (/[+\-*/()%√]/.test(char)) {
      if (numberBuffer.length) {
        tokens.push(numberBuffer.join(""));
        numberBuffer = [];
      }
      tokens.push(char);
    } else if (char === " ") {
      continue;
    } else {
      throw new Error(`Invalid character encountered: ${char}`);
    }
  }

  if (numberBuffer.length) {
    tokens.push(numberBuffer.join(""));
  }

  return tokens;
};
