import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import styles from "../CSS/GuestDashboard.module.css";

interface Member {
  member_id: number;
  member_name: string;
  role: string; // e.g., Player, Coach, Manager, Captain
}

const TeamRosterPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoster = async () => {
      setLoading(true);

      const { data, error } = await supabase.rpc("get_allteam_roster", {
        _team_id: Number(teamId),
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setMembers(data as Member[]);
      }

      setLoading(false);
    };

    fetchRoster();
  }, [teamId]);

  return (
    <div className={styles.listContainer}>
      <div className={styles.listDashboard}>
        <h2>Team Roster (Team {teamId})</h2>
        <div className={styles.box}>
          <button className={styles.backbtn} onClick={() => navigate(-1)}>
            Back
          </button>

          {loading && <p>Loading team members...</p>}
          {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
          <div className={styles.scrollContainer}>
            {members.map((member) => (
              <div key={member.member_id} className={styles.card}>
                <p>
                  ID:{member.member_id} Name:{member.member_name} Role:
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRosterPage;
