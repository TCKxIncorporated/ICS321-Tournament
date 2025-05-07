import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectCaptainForTeam } from '../../backend/adminMethod'; // adjust if needed

function SelectCaptain() {
  const navigate = useNavigate();

  const [matchNo, setMatchNo] = useState('');
  const [teamId, setTeamId] = useState('');
  const [playerCaptain, setPlayerCaptain] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await selectCaptainForTeam(Number(matchNo), Number(teamId), Number(playerCaptain));
      alert('Captain selected successfully!');
      setMatchNo('');
      setTeamId('');
      setPlayerCaptain('');
    } catch (error) {
      console.error('Error selecting captain:', error);
      alert('Failed to select captain. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Select Team Captain</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="Match Number"
          value={matchNo}
          onChange={(e) => setMatchNo(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Team ID"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Player ID (Captain)"
          value={playerCaptain}
          onChange={(e) => setPlayerCaptain(e.target.value)}
          required
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>Select Captain</button>
          <button type="button" onClick={() => navigate('/admin')} style={styles.backButton}>Back</button>
        </div>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    fontSize: '16px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#ccc',
    color: 'black',
    border: 'none',
    cursor: 'pointer'
  }
};

export default SelectCaptain;
