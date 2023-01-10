import { useCallback, useState } from "react";
import { useSession } from "@/hooks/useSession";

import Navbar from "@/components/Navigation/Navbar";
import Sidebar from "@/components/Navigation/Sidebar";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleSideBar = useCallback(() => setIsActive((prev) => !prev), []);

  const user = useSession();

  return (
    <>
      <Navbar isActive={isActive} toggleSideBar={toggleSideBar} />
      <div className="wrapper">
        {user && <Sidebar isActive={isActive} toggleSideBar={toggleSideBar} />}

        <div className="content">{children}</div>
      </div>
      <Toaster />
    </>
  );
};
