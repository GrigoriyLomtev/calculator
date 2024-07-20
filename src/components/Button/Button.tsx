import { ButtonHTMLAttributes, memo, ReactNode } from "react";
import styles from "./Button.module.css";
import { classNames } from "../../utils/classNames/classNames";

export type ButtonVariant = "primary" | "background";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  children: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const { className, children, variant = "primary", ...otherProps } = props;

  return (
    <button
      {...otherProps}
      className={classNames(styles.block, {}, [className, styles[variant]])}
    >
      {children}
    </button>
  );
});
