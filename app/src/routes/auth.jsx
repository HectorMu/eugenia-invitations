import IsAlreadyLogged from "@/components/Authentication/IsAlreadyLogged";

import Login from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";

const routes = [
  {
    path: "/signup",
    element: <IsAlreadyLogged view={Signup} />,
  },
  {
    path: "/login",
    element: <IsAlreadyLogged view={Login} />,
  },
];

export default routes;
