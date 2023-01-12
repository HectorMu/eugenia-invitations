import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/store/slices/SessionSlice";
import "./Sidebar.css";

const Sidebar = ({ isActive }) => {
  const dispatch = useDispatch();
  return (
    <aside
      className={`sidebar bg-slate-900 text-white ${isActive ? `active` : ``}`}
    >
      <nav className="menu ">
        <div className="heading">
          <p>Menu</p>
        </div>
        <NavLink to="/" className="menu-item">
          <AiOutlineSend className="text-white" color="white" />{" "}
          <span>Home</span>
        </NavLink>

        <button
          onClick={() => dispatch(logoutAction())}
          className="menu-item top-[100%]"
        >
          <BiExit /> <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
