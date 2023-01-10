import { useSelector } from "react-redux";

export const useSession = () => useSelector((state) => state.session.user);
