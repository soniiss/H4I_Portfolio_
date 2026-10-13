"use client";

import type { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import styles from "../styles/DeleteButton.module.css";

type DeleteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  itemName: string;
};

export default function DeleteButton({
  itemName,
  type = "button",
  className,
  "aria-label": ariaLabel,
  ...props
}: DeleteButtonProps) {
  const classes = [styles.button, className].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      className={classes}
      aria-label={ariaLabel ?? `Delete ${itemName}`}
      title={props.title ?? `Delete ${itemName}`}
      {...props}
    >
      <Image src="/red-trash-can-icon.webp" alt="" width={20} height={20} />
    </button>
  );
}
