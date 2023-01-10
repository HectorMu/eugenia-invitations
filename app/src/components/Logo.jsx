import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <h3
      className={` bg-slate-200 rounded-full w-fit mx-auto text-6xl p-3 mb-5 transform -rotate-6 flex hover:rotate-0 transition-all ${className}`}
    >
      <span className="font-bold ">E</span>
      <small className="font-thin">u</small>
    </h3>
  );
};

export default Logo;
