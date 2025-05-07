import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import styles from "../CSS/GuestDashboard.module.css";

interface Match {
  match_no: number;
  venue_name: string;
  play_date: string;
  team_id1: number;
  team_id2: number;
}

const MatchesPage = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);

      const { data, error } = await supabase.rpc("get_tournament_matches", {
        _tr_id: Number(tournamentId),
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setMatches(data as Match[]);
      }

      setLoading(false);
    };

    fetchMatches();
  }, [tournamentId]);

  return (
    <div className={styles.listContainer}>
      <div className={styles.listDashboard}>
        <h2>Matches for Tournament {tournamentId}</h2>
        <div className={styles.box}>
          <button className={styles.backbtn} onClick={() => navigate(-1)}>
            Back
          </button>

          {loading && <p>Loading matches...</p>}
          {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
          <div className={styles.scrollContainer}>
            {matches.map((m) => (
              <div key={m.match_no} className={styles.card}>
                <p>
                  Stage: {m.venue_name} Date: {m.play_date} Team 1 ID:{" "}
                  {m.team_id1} Team 2 ID: {m.team_id2}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;
