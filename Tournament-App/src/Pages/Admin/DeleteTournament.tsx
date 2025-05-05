import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  tournamentId: string;
  name: string;
  startDate: string;
  endDate: string;
}

const DeleteTournament: React.FC = () => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    tournamentId: '',
    name: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleDelete = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Deleting tournament:', formData);
    alert(`Tournament ${formData.tournamentId} deleted!`);
    setFormData({ tournamentId: '', name: '', startDate: '', endDate: '' });
  };

  return (
    <div style={styles.container}>
      <h2>Delete Tournament</h2>
      <form onSubmit={handleDelete} style={styles.form}>
        <input
          name="tournamentId"
          type="text"
          placeholder="Enter Tournament ID"
          value={formData.tournamentId}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="name"
          type="text"
          placeholder="Enter Tournament Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
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
    cursor:'pointer'
   },
   backButton:{
     padding:'10px', 
     fontSize:'16px', 
     backgroundColor:'#ccc', 
     color:'black', 
     border:'none', 
     cursor:'pointer'
   }
};

export default DeleteTournament;