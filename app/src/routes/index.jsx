import IsLoggedIn from "@/components/Authentication/IsLoggedIn";
import authRoutes from "./auth";

import { Home } from "@/pages/Home";

import { NotFound } from "@/pages/status";

const index = [
  {
    path: "/",
    element: <IsLoggedIn view={Home} />,
  },

  //All app routes
  ...authRoutes,

  //Not found route
  {
    path: "*",
    element: <NotFound />,
  },
];

export default index;
