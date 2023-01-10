import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isActive, toggleSideBar }) => {
  return (
    <aside className={`sidebar ${isActive ? `active` : ``}`}>
      <nav className="menu ">
        <NavLink to="/" className="menu-item">
          <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
          <span className="">Dashboard</span>
        </NavLink>
        <hr className="c-sidebar-divider" />
        <div className="heading">
          <p>Item 1</p>
        </div>
        <NavLink to="/accounts" className="menu-item">
          <i className="fas fa-users"></i> <span>Sub item 1</span>
        </NavLink>
        <NavLink to="/companies" className="menu-item">
          <i className="fas fa-building"></i> <span>Sub item 2</span>
        </NavLink>
        <NavLink to="/graduates" className="menu-item">
          <i className="fas fa-user-graduate"></i> <span>Sub item 3</span>
        </NavLink>
        <hr className="c-sidebar-divider" />
      </nav>
    </aside>
  );
};

export default Sidebar;
