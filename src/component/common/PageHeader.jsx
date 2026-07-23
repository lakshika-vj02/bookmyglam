import React from "react";
import Button from "./Button";
import "./common.css";

function PageHeader({
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onButtonClick,
  showButton = true,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 className="fw-bold mb-1">{title}</h2>
        <p className="text-muted mb-0">{subtitle}</p>
      </div>

      {showButton && (
  <Button
    text={buttonText}
    icon={buttonIcon}
    onClick={onButtonClick}
    className="back-btn"
  />
)}
    </div>
  );
}

export default PageHeader;