import { useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../supabaseClient";
import styles from "../CSS/GuestDashboard.module.css";

const JoinRequestPage = () => {
  const navigate = useNavigate();
  const [id, setID] = useState("");
  const [teamID, setTeamID] = useState("");
  const [trID, setTournamentID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const apply = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const playerId = Number(id);
    const teamId = Number(teamID);
    const trId = Number(trID);

    // Validate player
    const { data: player, error: playerError } = await supabase
      .from("player")
      .select("player_id")
      .eq("player_id", playerId)
      .single();

    if (playerError || !player) {
      setError(`Player with ID ${id} does not exist.`);
      setLoading(false);
      return;
    }

    // Validate team
    const { data: team, error: teamError } = await supabase
      .from("team")
      .select("team_id")
      .eq("team_id", teamId)
      .single();

    if (teamError || !team) {
      setError(`Team with ID ${teamID} does not exist.`);
      setLoading(false);
      return;
    }

    // Validate tournament
    const { data: tournament, error: tournamentError } = await supabase
      .from("tournament")
      .select("tr_id")
      .eq("tr_id", trId)
      .single();

    if (tournamentError || !tournament) {
      setError(`Tournament with ID ${trID} does not exist.`);
      setLoading(false);
      return;
    }

    // All valid → Insert
    const { error: insertError } = await supabase.from("request").insert([
      {
        player_id: playerId,
        team_id: teamId,
        tr_id: trId,
      },
    ]);

    if (insertError) {
      setError(`Failed to submit request: ${insertError.message}`);
    } else {
      setSuccessMsg("Request submitted successfully!");
      setID("");
      setTeamID("");
      setTournamentID("");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <form onSubmit={apply} className={styles.form}>
          <h2>Apply to join</h2>

          <label>KFUPM ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setID(e.target.value)}
            required
          />

          <label>Team ID</label>
          <input
            type="text"
            value={teamID}
            onChange={(e) => setTeamID(e.target.value)}
            required
          />

          <label>Tournament ID</label>
          <input
            type="text"
            value={trID}
            onChange={(e) => setTournamentID(e.target.value)}
            required
          />

          <div>
            <button type="button" onClick={() => navigate(-1)}>
              Back
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}
          {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default JoinRequestPage;
