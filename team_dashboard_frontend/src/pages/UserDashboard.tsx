import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <p>Welcome, <b>{user?.email || "User"}</b>. You have basic access.</p>
      <section className="panel">
        <h2>My Tasks</h2>
        <ul>
          <li>Track your assignments (coming soon...)</li>
          <li>See shared documents (coming soon...)</li>
        </ul>
      </section>
    </div>
  );
};

export default UserDashboard;
