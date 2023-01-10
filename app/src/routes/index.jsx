import IsLoggedIn from "@/components/Authentication/IsLoggedIn";
import authRoutes from "./auth";

import Index from "@/pages/Index";
import Home from "@/pages/Home";
import About from "@/pages/About";

import NotFound from "@/pages/status/NotFound";

const index = {
  dev: [
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/dashboard",
      element: <Home />,
    },
    {
      path: "/About",
      element: <About />,
    },
    //all app routes
    ...authRoutes.dev,

    //not found
    {
      path: "*",
      element: <NotFound />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/",
      element: <IsLoggedIn view={Index} />,
    },
    {
      path: "/dashboard",
      element: <IsLoggedIn view={Home} />,
    },
    {
      path: "/about",
      element: <IsLoggedIn view={About} />,
    },
    //All app routes
    ...authRoutes.production,

    //Not found route
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default index;
