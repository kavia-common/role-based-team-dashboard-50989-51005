import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, <b>{user?.email || "Admin"}</b>. You have full privileges.</p>
      <section className="panel">
        <h2>Team Management</h2>
        <ul>
          <li>View All Users (coming soon...)</li>
          <li>Edit Roles (coming soon...)</li>
          <li>System Insights (coming soon...)</li>
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
