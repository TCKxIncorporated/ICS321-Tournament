import React from "react";
import styles from "../CSS/GuestDashboard.module.css";
import { useNavigate } from "react-router-dom";

const GuestDashboard: React.FC = () => {
  const navigate = useNavigate();
  const handleAdminLogin = () => {
    navigate("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <button
          className={styles.button}
          onClick={() => navigate("/tournamentspage")}
        >
          Browse Tournaments
        </button>
        <button className={styles.button} onClick={() => navigate("/teams")}>
          Browse Teams
        </button>
        <button
          className={styles.button}
          onClick={() => navigate("/highestscorer")}
        >
          Browse The player with highest goals scored
        </button>
        <button className={styles.button} onClick={() => navigate("/redcards")}>
          Browse Players who received red cards
        </button>
        <button className={styles.button} onClick={() => navigate("/join")}>
          Apply to Join a team
        </button>
        <button className={styles.button} onClick={handleAdminLogin}>
          Login as admin
        </button>
      </div>
    </div>
  );
};

export default GuestDashboard;
