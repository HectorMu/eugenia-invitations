import { useSession } from "@/hooks/useSession";
import { HiBars3 } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Navbar = ({ isActive, toggleSideBar }) => {
  const user = useSession();
  return (
    <nav className="w-full z-50 py-2 fixed bg-gray-600 dark:bg-gray-900 text-white shadow-sm">
      <div className="flex justify-between w-11/12 mx-auto items-center">
        <Link to={"/"} className="flex items-center gap-2 hover:cursor-pointer">
          <Logo className="text-black  mb-0 p-[5px] text-[19px]" />
          <h3>Eugenia</h3>
        </Link>

        {user && (
          <ul className="flex gap-5 items-center justify-center h-full">
            <li className="block">
              <button className="p-1 bg-slate-600 rounded-md px-2 flex gap-1 items-center hover:bg-slate-400 transition-colors">
                <AiOutlinePlus />
                New invitation
              </button>
            </li>
            <li className=" block">
              <div className="relative w-full">
                <img
                  className="rounded-full "
                  height={28}
                  width={28}
                  src={`https://ui-avatars.com/api/?name=${user?.name}`}
                />
              </div>
            </li>
            <li className="block">
              <button
                onClick={toggleSideBar}
                className="bg-slate-600 p-1 rounded-sm hover:bg-slate-400 transition-colors h-full w-full"
              >
                <HiBars3 size={23} />
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
