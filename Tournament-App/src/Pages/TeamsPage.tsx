import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import styles from "../CSS/GuestDashboard.module.css";

interface Team {
  team_id: number;
  team_name: string;
}

const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("team")
        .select("team_id, team_name")
        .order("team_id");

      if (error) {
        setErrorMsg(error.message);
      } else {
        setTeams(data as Team[]);
      }

      setLoading(false);
    };

    fetchTeams();
  }, []);

  return (
    <div className={styles.listContainer}>
      <div className={styles.listDashboard}>
        <h2>Teams</h2>
        <div className={styles.box}>
          <button className={styles.backbtn} onClick={() => navigate("/")}>
            Back
          </button>

          {loading && <p>Loading teams...</p>}
          {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
          <div className={styles.scrollContainer}>
            {teams.map((team) => (
              <div
                key={team.team_id}
                className={styles.card}
                onClick={() => navigate(`/teams/${team.team_id}`)}
              >
                <p>
                  Team: {team.team_name} ID: {team.team_id}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
