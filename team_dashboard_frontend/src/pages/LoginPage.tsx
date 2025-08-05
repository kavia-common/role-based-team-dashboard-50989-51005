import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const { login, loading, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (role === "admin") navigate("/admin", { replace: true });
    else if (role === "user") navigate("/user", { replace: true });
    // Don't automatically redirect guests here
  }, [role, navigate]);

  // PUBLIC_INTERFACE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await login(email, password);
    if (!error) {
      // Role will be picked up by effect above and redirect
      return;
    }
    setError(error);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Team Dashboard</h2>
        <label>
          Email
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            autoComplete="username"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Your password"
            value={password}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="login-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
