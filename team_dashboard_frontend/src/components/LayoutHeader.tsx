import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "./LayoutHeader.css";

const LayoutHeader: React.FC = () => {
  const { user, role, logout } = useAuth();

  return (
    <header className="header">
      <span className="logo">
        <span className="logo-dot" /> Team Dashboard
      </span>
      {user && (
        <div className="user-menu">
          <span className="user-info">{user.email} ({role || "unknown"})</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default LayoutHeader;
