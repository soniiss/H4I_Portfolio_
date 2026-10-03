import type { ButtonHTMLAttributes } from "react";
import styles from "../styles/Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // primary = solid green, secondary = outlined, round = circle for an icon like +
  variant?: "primary" | "secondary" | "round";
};

// reusable button so all our buttons look the same, just import it and pick a variant
// heads up: it's a plain button by default so it won't accidentally submit a form,
// pass type="submit" if you want it to submit
export default function Button({ variant = "primary", type = "button", className, ...props }: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  return <button type={type} className={classes} {...props} />;
}
