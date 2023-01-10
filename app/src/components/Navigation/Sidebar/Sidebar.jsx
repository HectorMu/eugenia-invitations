import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ setIsActive, isActive }) => {
  //const { user } = useSession();

  //   if (user === null) {
  //     return <></>;
  //   }

  return (
    <aside className={`sidebar ${isActive ? `active` : ``}`}>
      <nav className="menu ">
        <NavLink to="/" className="menu-item">
          <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
          <span className="">Dashboard</span>
        </NavLink>
        <hr className="c-sidebar-divider" />
        <div className="heading">
          <p>Usuarios</p>
        </div>
        <NavLink to="/accounts" className="menu-item">
          <i className="fas fa-users"></i> <span>Cuentas</span>
        </NavLink>
        <NavLink to="/companies" className="menu-item">
          <i className="fas fa-building"></i> <span>Empresas</span>
        </NavLink>
        <NavLink to="/graduates" className="menu-item">
          <i className="fas fa-user-graduate"></i> <span>Egresados</span>
        </NavLink>
        <hr className="c-sidebar-divider" />
        <div className="heading">
          <p>Bolsa de trabajo</p>
        </div>
        <NavLink to="/jobbank" className="menu-item">
          <i className="fas fa-envelope"></i> <span>Postulaciones</span>
        </NavLink>{" "}
        <hr className="c-sidebar-divider" />
        <div className="heading">
          <p>Encuestas</p>
        </div>
        <NavLink to="/surveys/reports/" className="menu-item">
          <i className="fas fa-print"></i> <span>Reportes</span>
        </NavLink>
        <hr className="c-sidebar-divider" />
      </nav>
    </aside>
  );
};

export default Sidebar;
