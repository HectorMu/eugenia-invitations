import React from "react";

const Button = ({ children, variant, className = "", ...restOfProps }) => {
  return (
    <button
      {...restOfProps}
      className={`bg-slate-700 p-1 rounded-xl text-white ${className} hover:bg-opacity-80 disabled:bg-opacity-75`}
    >
      {children}
    </button>
  );
};

export default Button;
