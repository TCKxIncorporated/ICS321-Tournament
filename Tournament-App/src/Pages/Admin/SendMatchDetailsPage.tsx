import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUpcomingMatches,
  getEmailsForMatch,
} from "../../backend/adminMethod";
import sendEmail from "../../backend/sendEmail";

interface MatchInfo {
  match_no: number;
  team_id1: number;
  team1_name: string;
  team_id2: number;
  team2_name: string;
  play_date: string;
}

function SendMatchDetailsPage() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<MatchInfo[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchInfo | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const list = await getUpcomingMatches();
        setMatches(list);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleMatchSelect = async (matchNo: number) => {
    const match = matches.find((m) => m.match_no === matchNo) || null;
    setSelectedMatch(match);
    setEmails([]);
    setStatusMessage(null);

    if (match) {
      try {
        const emailList = await getEmailsForMatch(match.match_no);
        setEmails(emailList);
      } catch (err) {
        console.error("Couldn't load emails for match", err);
      }
    }
  };

  const handleSend = async () => {
    if (!selectedMatch || emails.length === 0) return;

    setSending(true);
    setStatusMessage(null);

    try {
      for (const email of emails) {
        await sendEmail(email, {
          subject: `Match #${selectedMatch.match_no} Reminder`,
          message: `Reminder: Match #${selectedMatch.match_no} - ${selectedMatch.team1_name} vs ${selectedMatch.team2_name} on ${selectedMatch.play_date}.`,
        });
      }
      setStatusMessage("Emails sent.");
    } catch (err) {
      alert(JSON.stringify(err));
      console.error("Failed to send emails:", err);
      setStatusMessage("Failed to send emails.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading matches...</p>;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2 style={{ fontWeight: "bold" }}>Send Match Details</h2>

      {matches.length === 0 ? (
        <p>No upcoming matches found.</p>
      ) : (
        <>
          <select
            onChange={(e) => handleMatchSelect(Number(e.target.value))}
            defaultValue=""
            style={{
              padding: "10px",
              fontSize: "16px",
              margin: "20px 0",
              width: "300px",
            }}
          >
            <option value="" disabled>
              Select a match
            </option>
            {matches.map((match) => (
              <option key={match.match_no} value={match.match_no}>
                Match #{match.match_no}: {match.team1_name} vs{" "}
                {match.team2_name} on {match.play_date}
              </option>
            ))}
          </select>

          {selectedMatch && (
            <div>
              <p>
                Match #{selectedMatch.match_no}: {selectedMatch.team1_name} vs{" "}
                {selectedMatch.team2_name}
                <br />
                Date: {selectedMatch.play_date}
              </p>

              {emails.length > 0 ? (
                <div style={{ marginTop: "10px" }}>
                  <p>Recipients: {emails.length}</p>
                  <button
                    onClick={handleSend}
                    disabled={sending}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {sending ? "Sending..." : "Send Emails"}
                  </button>
                </div>
              ) : (
                <p>No emails found for this match.</p>
              )}
            </div>
          )}
        </>
      )}

      {statusMessage && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>{statusMessage}</p>
      )}

      <button
        onClick={() => navigate("/admin")}
        style={{
          marginTop: "30px",
          backgroundColor: "#ccc",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default SendMatchDetailsPage;
