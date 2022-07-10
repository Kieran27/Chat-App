import React from "react";
import "./error-popup.css";

const ErrorPopup = ({ message }) => {
  return <div className="error-popup">{message}</div>;
};

export default ErrorPopup;
