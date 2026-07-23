import React from "react";
import "./common.css";

function Button({
  text,
  icon,
  onClick,
  className = "btn btn-primary",
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="me-2">{icon}</span>}
      {text}
    </button>
  );
}

export default Button;