import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-11/12 sm:10/12 md:6/12 lg:w-3/12 mx-auto mt-16 a">
      {children}
    </div>
  );
};

export default AuthLayout;
