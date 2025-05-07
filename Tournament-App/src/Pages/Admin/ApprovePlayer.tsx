import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllRequests,addPlayerToTeam, removeRequest} from '../../backend/adminMethod'; // Make sure this exists and is correctly imported

interface PlayerRequest {
  player_id: number;
  player_name: string;
  team_id: number;       
  team_name: string;
  tr_id: number;
  request_time: string;
}


function ApprovePlayerPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<PlayerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllRequests();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching player requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (playerId: number, teamId: number, trId: number) => {
    try {
      await addPlayerToTeam(playerId, teamId, trId);
      await removeRequest(playerId, trId);
      setRequests(prev => prev.filter(req => req.player_id !== playerId));
      console.log(`Accepted player ${playerId}`);
    } catch (error) {
      console.error('Error accepting player:', error);
      alert('Failed to accept player. Please try again.');
    }
  };
  
  const handleReject = async (playerId: number, trId: number) => {
    try {
      await removeRequest(playerId, trId);
      setRequests(prev => prev.filter(req => req.player_id !== playerId));
      console.log(`Rejected player ${playerId}`);
    } catch (error) {
      console.error('Error rejecting player:', error);
      alert('Failed to reject player. Please try again.');
    }
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Approve Player Requests</h1>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p style={styles.noRequests}>No pending requests</p>
      ) : (
        requests.map((req, index) => (
          <div key={index} style={styles.card}>
            <p><strong>Player Name:</strong> {req.player_name}</p>
            <p><strong>Player ID:</strong> {req.player_id}</p>
            <p><strong>Team:</strong> {req.team_name} (ID: {req.team_id})</p>
            <p><strong>Tournament ID:</strong> {req.tr_id}</p>
            <p><strong>Requested At:</strong> {new Date(req.request_time).toLocaleString()}</p>
            <div style={styles.buttonGroup}>
            <button onClick={() => handleAccept(req.player_id, req.team_id, req.tr_id)} style={styles.acceptBtn}>Accept</button>
            <button onClick={() => handleReject(req.player_id, req.tr_id)} style={styles.rejectBtn}>Reject</button>

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
