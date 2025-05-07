import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTournament } from '../../backend/adminMethod'; // your existing RPC
import supabase from '../../supabaseClient'; // direct Supabase query

interface Tournament {
  tr_id: number;
  tr_name: string;
}

const DeleteTournament: React.FC = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTrId, setSelectedTrId] = useState<string>('');

  useEffect(() => {
    const fetchTournaments = async () => {
      const { data, error } = await supabase
        .from('tournament')
        .select('tr_id, tr_name');

      if (error) {
        console.error('Failed to fetch tournaments:', error.message);
      } else {
        setTournaments(data);
      }
    };

    fetchTournaments();
  }, []);

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteTournament(parseInt(selectedTrId));
      alert(`Tournament ${selectedTrId} deleted!`);
      setSelectedTrId('');
      setTournaments(prev => prev.filter(t => t.tr_id !== parseInt(selectedTrId)));
    } catch (err) {
      console.error('Error deleting tournament:', err);
      alert('Failed to delete tournament.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Delete Tournament</h2>
      <form onSubmit={handleDelete} style={styles.form}>
        <select
          value={selectedTrId}
          onChange={(e) => setSelectedTrId(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select Tournament</option>
          {tournaments.map(t => (
            <option key={t.tr_id} value={t.tr_id}>
              {t.tr_id} - {t.tr_name}
            </option>
          ))}
        </select>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.deleteButton}>Delete Tournament</button>
          <button type="button" onClick={() => navigate('/admin')} style={styles.backButton}>Back</button>
        </div>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
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
  deleteButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#e74c3c',
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

export default DeleteTournament;
