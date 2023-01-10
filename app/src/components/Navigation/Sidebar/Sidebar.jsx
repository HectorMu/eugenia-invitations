import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import "./Sidebar.css";

const Sidebar = ({ isActive, toggleSideBar }) => {
  return (
    <aside
      className={`sidebar bg-slate-900 text-white ${isActive ? `active` : ``}`}
    >
      <nav className="menu ">
        <div className="heading">
          <p>Menu</p>
        </div>
        <NavLink to="/accounts" className="menu-item">
          <AiOutlineSend className="text-white" color="white" />{" "}
          <span>Home</span>
        </NavLink>
        <NavLink to="/companies" className="menu-item">
          <AiOutlineSend /> <span>Sended invitations</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
