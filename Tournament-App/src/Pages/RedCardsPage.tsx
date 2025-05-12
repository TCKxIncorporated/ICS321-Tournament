import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import styles from "../CSS/GuestDashboard.module.css";

interface Player {
  player_id: number;
  name: string;
  team_name: string;
  booking_time: string;
  match_no: number;
}

const RedCardsPage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.rpc("get_players_with_red_cards");

      if (error) {
        setErrorMsg(error.message);
      } else {
        setPlayers(data as Player[]);
      }
    };

    fetchPlayers();
  });

  return (
    <div className={styles.listContainer}>
      <div className={styles.listDashboard}>
        <h2>Players who received red cards.</h2>
        <div className={styles.box}>
          <button className={styles.backbtn} onClick={() => navigate(-1)}>
            Back
          </button>
          {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
          <div className={styles.scrollContainer}>
            {players.map((player) => (
              <div key={player.player_id} className={styles.card}>
                <p>
                  ID:{player.player_id} Name:{player.name}
                  <br />
                  Team Name:{player.team_name}
                  <br />
                  Match Number:{player.match_no} Time Received:
                  {player.booking_time}m
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedCardsPage;
