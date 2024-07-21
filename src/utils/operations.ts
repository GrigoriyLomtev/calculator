export const operators: { [key: string]: number } = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "%": 2,
  "√": 3,
};

export const isOperator = (char: string): boolean => /[+\-*/%√]/.test(char);
