import React, { useState } from "react";
import supabase from "../supabaseClient";
import styles from "../CSS/GuestDashboard.module.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/"); // this goes to the homepage
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("username", username)
      .single();

    if (error) {
      setError("User not found.");
      setLoading(false);
      return;
    }

    if (data.password !== password) {
      setError("Incorrect password.");
      setLoading(false);
      return;
    }
    navigate("/admin");
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <form onSubmit={handleLogin} className={styles.form}>
          <h2>Admin Login</h2>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <button onClick={handleBackClick}>Back</button>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className={styles.errorMessage}>
            {error && <p className={styles.errormessage}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
