import React from "react";

const Input = (props) => {
  return (
    <input
      {...props}
      className="rounded-md w-full outline-none border-[1px] border-transparent  focus:border-slate-300 p-3 transition-all"
    />
  );
};

export default Input;
