import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const { user, role } = useAuth();

  if (!user || !role) return null;

  return (
    <aside className="sidebar">
      <nav>
        {role === "admin" && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? "active-link" : "" }>
            Admin Dashboard
          </NavLink>
        )}
        {(role === "user" || role === "admin") && (
          <NavLink to="/user" className={({ isActive }) => isActive ? "active-link" : "" }>
            User Dashboard
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
