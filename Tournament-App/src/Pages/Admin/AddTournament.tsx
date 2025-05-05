import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  tournamentId: string;
  name: string;
  startDate: string;
  endDate: string;
}

function AddTournament() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    tournamentId: '',
    name: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, just log the data
    console.log('Tournament added:', formData);
    alert('Tournament added successfully!');
    // Reset form
    setFormData({ tournamentId: '', name: '', startDate: '', endDate: '' });
  };

  return (
    <div style={styles.container}>
      <h2>Add Tournament</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="tournamentId"
          placeholder="Enter Tournament ID"
          value={formData.tournamentId}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="name"
          placeholder="Enter Tournament Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>Add Tournament</button>
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

export default AddTournament;