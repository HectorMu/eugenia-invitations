import IsAlreadyLogged from "@/components/Authentication/IsAlreadyLogged";
import AccountRecover from "@/pages/AccountRecover/AccountRecover";
import Login from "@/pages/Login/Login";
import PasswordReset from "@/pages/PasswordReset/PasswordReset";
import Signup from "@/pages/Signup/Signup";

const routes = [
  {
    path: "/signup",
    element: <IsAlreadyLogged view={Signup} />,
  },
  {
    path: "/login",
    element: <IsAlreadyLogged view={Login} />,
  },
  {
    path: "/recover",
    element: <IsAlreadyLogged view={AccountRecover} />,
  },
  {
    path: "/reset/:token/",
    element: <IsAlreadyLogged view={PasswordReset} />,
  },
];

export default routes;
