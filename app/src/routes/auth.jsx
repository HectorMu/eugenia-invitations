import IsAlreadyLogged from "@/components/Authentication/IsAlreadyLogged";

import Login from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";

const auth = {
  dev: [
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/signup",
      element: <IsAlreadyLogged view={Signup} />,
    },
    {
      path: "/login",
      element: <IsAlreadyLogged view={Login} />,
    },
  ],
};

export default auth;
