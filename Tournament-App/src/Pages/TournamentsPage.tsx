import { useState, useEffect } from "react";
import styles from "../CSS/GuestDashboard.module.css";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

interface Tournament {
  tr_id: number;
  tr_name: string;
}

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("tournament")
        .select("tr_id, tr_name")
        .order("tr_id");

      if (error) {
        setErrorMsg(error.message);
      } else {
        setTournaments(data as Tournament[]);
      }

      setLoading(false);
    };

    fetchTournaments();
  }, []);

  return (
    <div className={styles.listContainer}>
      <div className={styles.listDashboard}>
        <div className={styles.box}>
          <h2>Tournaments</h2>
          <button className={styles.backbtn} onClick={() => navigate("/")}>
            Back
          </button>
          <div className={styles.scrollContainer}>
            {tournaments.map((t) => (
              <div
                key={t.tr_id}
                onClick={() => navigate(`/matches/${t.tr_id}`)}
                className={styles.card}
              >
                {t.tr_name}
              </div>
            ))}
          </div>
        </div>
        {loading && <p>Loading tournaments...</p>}
        {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
      </div>
    </div>
  );
};

export default TournamentsPage;
