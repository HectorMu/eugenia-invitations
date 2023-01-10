import { useSession } from "@/hooks/useSession";
import { useDispatch } from "react-redux";
import Logo from "../Logo";

const Navbar = ({ isActive, toggleSidebar }) => {
  const dispatch = useDispatch();
  const user = useSession();
  return (
    <nav className="w-full z-50 py-2 fixed bg-gray-600 dark:bg-gray-900 text-white shadow-sm">
      <div className="flex justify-between w-11/12 mx-auto items-center">
        <div className="flex items-center gap-2">
          <Logo className="text-black  mb-0 p-[5px] text-[19px]" />
          <h3>Eugenia</h3>
        </div>

        {user && (
          <ul className="flex gap-5">
            <li className="block">
              <button>New invitation</button>
            </li>
            <li className="block">
              <button>Profile</button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
