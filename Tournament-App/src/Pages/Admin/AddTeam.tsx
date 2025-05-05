import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  teamId: string;
  teamName: string;
  coachId: string;
  captainId: string;
}

function AddTeam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    teamId: '',
    teamName: '',
    coachId: '',
    captainId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Team added:', formData);
    alert('Team added successfully!');
    setFormData({ teamId: '', teamName: '', coachId: '', captainId: '' });
  };

  return (
    <div style={styles.container}>
      <h2>Add Team to Tournament</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="teamId"
          type="text"
          placeholder="Enter Team ID"
          value={formData.teamId}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="teamName"
          type="text"
          placeholder="Enter Team Name"
          value={formData.teamName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="coachId"
          type="text"
          placeholder="Enter Coach ID"
          value={formData.coachId}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="captainId"
          type="text"
          placeholder="Enter Captain ID"
          value={formData.captainId}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>Add Team</button>
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

export default AddTeam;