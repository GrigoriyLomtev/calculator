import { memo, useCallback, useEffect, useState } from "react";
import styles from "./Calculator.module.css";
import { classNames } from "../../utils/classNames/classNames";
import { Button } from "../Button/Button";
import { calculateExpression } from "../../utils/calculator/calculator";
import { isOperator } from "../../utils/operations";

interface CalculatorProps {
  className?: string;
}

export const Calculator = memo((props: CalculatorProps) => {
  const { className } = props;

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = useCallback(
    (value: string) => {
      if (expression === "" && isOperator(value)) {
        return;
      }

      const lastChar = expression.slice(-1);
      if (isOperator(lastChar) && isOperator(value)) {
        return;
      }

      setExpression((prev) => prev + value);
    },
    [expression],
  );

  const handleClear = useCallback(() => {
    setExpression("");
    setResult("");
  }, []);

  const handleSquareRoot = useCallback(() => {
    try {
      const res = calculateExpression(expression);
      const sqrtResult = Math.sqrt(parseFloat(res)).toString();
      setResult(sqrtResult);
      setExpression(sqrtResult);
    } catch (error) {
      setResult("Error");
      setExpression("");
    }
  }, [expression]);

  const handleCalculate = useCallback(() => {
    if (expression === "" || isOperator(expression.slice(-1))) {
      return;
    }
    try {
      const res = calculateExpression(expression);
      setResult(res);
    } catch (error) {
      setResult("Error");
    }
  }, [expression]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      if (key >= "0" && key <= "9") {
        handleButtonClick(key);
      } else if (isOperator(key)) {
        handleButtonClick(key);
      } else if (key === "Enter") {
        handleCalculate();
      } else if (key === "Backspace" || key === "Escape") {
        handleClear();
      } else if (key === ".") {
        handleButtonClick(key);
      }
    },
    [handleButtonClick, handleCalculate, handleClear],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.block, {}, [className])}>
        <div className={styles.display}>
          <div className={styles.expression}>{expression}</div>
          <div className={styles.result}>{result}</div>
        </div>
        <div className={styles.buttons}>
          <Button onClick={handleClear}>C</Button>
          <Button onClick={handleSquareRoot}>√</Button>
          <Button onClick={() => handleButtonClick("%")}>%</Button>
          <Button onClick={() => handleButtonClick("/")}>/</Button>
          <Button onClick={() => handleButtonClick("7")}>7</Button>
          <Button onClick={() => handleButtonClick("8")}>8</Button>
          <Button onClick={() => handleButtonClick("9")}>9</Button>
          <Button onClick={() => handleButtonClick("*")}>*</Button>
          <Button onClick={() => handleButtonClick("4")}>4</Button>
          <Button onClick={() => handleButtonClick("5")}>5</Button>
          <Button onClick={() => handleButtonClick("6")}>6</Button>
          <Button onClick={() => handleButtonClick("-")}>-</Button>
          <Button onClick={() => handleButtonClick("1")}>1</Button>
          <Button onClick={() => handleButtonClick("2")}>2</Button>
          <Button onClick={() => handleButtonClick("3")}>3</Button>
          <Button onClick={() => handleButtonClick("+")}>+</Button>
          <Button onClick={() => handleButtonClick("00")}>00</Button>
          <Button onClick={() => handleButtonClick("0")}>0</Button>
          <Button onClick={() => handleButtonClick(".")}>.</Button>
          <Button variant={"background"} onClick={handleCalculate}>
            =
          </Button>
        </div>
      </div>
    </div>
  );
});
