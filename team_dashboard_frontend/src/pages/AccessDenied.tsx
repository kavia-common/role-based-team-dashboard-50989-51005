import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccessDenied.css";

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="access-denied-container">
      <h1>Access Denied</h1>
      <p>
        Sorry, you do not have access to this page.
      </p>
      <button className="back-btn" onClick={() => navigate("/login")}>
        Go to Login
      </button>
    </div>
  );
};

export default AccessDenied;
