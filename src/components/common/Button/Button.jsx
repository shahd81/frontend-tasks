import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";
import { motion as Motion } from "framer-motion";
export default function Button({
  children,
  onClick,
  to,
  type = "button",
   disabled = false ,
  className
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Motion.button
      type={type}
      onClick={handleClick}
      disabled ={disabled}
      className={`${styles.btn} ${className || ""}`}
        initial={{ opacity: 0, y: 20 ,x:-200 }}
            animate={{ opacity: 1, y: 0,x:0 }}
            transition={{ delay:0.5}}
    >
      {children}
    </Motion.button>
  );
}
