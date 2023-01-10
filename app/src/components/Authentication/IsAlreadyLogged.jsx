import { useSession } from "@/hooks/useSession";
import { Navigate } from "react-router-dom";

const IsAlreadyLogged = ({ view: View }) => {
  const user = useSession();
  if (user !== null) return <Navigate to="/" replace={true} />;
  return <View />;
};

export default IsAlreadyLogged;
