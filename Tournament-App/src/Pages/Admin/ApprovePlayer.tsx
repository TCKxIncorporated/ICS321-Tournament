import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface PlayerRequest {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
}

function ApprovePlayerPage() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<PlayerRequest[]>([
    {
      playerId: 'P123',
      playerName: 'Ahmed Ali',
      teamId: 'T001',
      teamName: 'Desert Falcons'
    },
    {
      playerId: 'P124',
      playerName: 'Sara Mahmoud',
      teamId: 'T002',
      teamName: 'Red Storm'
    },
    // add the data here from the database
  ]);

  const handleAccept = (playerId: string) => {
    console.log(`Accepted player ${playerId}`);
    setRequests(prev => prev.filter(req => req.playerId !== playerId));
  };

  const handleReject = (playerId: string) => {
    console.log(`Rejected player ${playerId}`);
    setRequests(prev => prev.filter(req => req.playerId !== playerId));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Approve Player Requests</h1>

      {requests.length === 0 ? (
        <p style={styles.noRequests}>No pending requests</p>
      ) : (
        requests.map((req, index) => (
          <div key={index} style={styles.card}>
            <p><strong>Player Name:</strong> {req.playerName}</p>
            <p><strong>Player ID:</strong> {req.playerId}</p>
            <p><strong>Team Name:</strong> {req.teamName}</p>
            <p><strong>Team ID:</strong> {req.teamId}</p>
            <div style={styles.buttonGroup}>
              <button onClick={() => handleAccept(req.playerId)} style={styles.acceptBtn}>Accept</button>
              <button onClick={() => handleReject(req.playerId)} style={styles.rejectBtn}>Reject</button>
            </div>
          </div>
        ))
      )}

      <button onClick={() => navigate('/admin')} style={styles.backBtn}>
        Back to Dashboard
      </button>

    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '30px',
    textAlign: 'center'
  },
  title: {
    fontSize: '28px',
    marginBottom: '30px'
  },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    marginInline: 'auto',
    textAlign: 'left'
  },
  buttonGroup: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  acceptBtn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  rejectBtn: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  backBtn: {
    marginTop: '40px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  noRequests: {
    fontStyle: 'italic',
    color: '#888'
  }
};

export default ApprovePlayerPage;