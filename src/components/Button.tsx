import React from "react";
import styles from "../styles/components/Button.module.css";

const Button = (props: {
  isWide?: boolean;
  isSmall?: boolean;
  isGradient?: boolean;
  func: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  const buttonClasses = `${styles["button"]} ${props.isWide ? styles["button--wide"] : ""}`;
  return (
    <button
      className={buttonClasses}
      onClick={props.func}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
