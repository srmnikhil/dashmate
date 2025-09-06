import React from "react";

const Button = ({ label, onClick, className = "", disabled = false }) => {
  return (
    <button
      disabled={disabled}
      className={`px-4 py-2 rounded-lg mt-5 text-white 
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
        } 
        ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
