import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    navigate('/'); // Adjust this route if needed
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/admin/add-tournament')} style={styles.button}>
          Add New Tournament
        </button>
        <button onClick={() => navigate('/admin/add-team')} style={styles.button}>
          Add Team to Tournament
        </button>
        <button onClick={() => navigate('/admin/select-captain')} style={styles.button}>
          Select Team Captain
        </button>

        <button onClick={() => navigate('/admin/approve-player')} style={styles.button}>
          Approve Player
        </button>
        <button onClick={() => navigate('/admin/delete-tournament')} style={styles.button}>
          Delete Tournament
        </button>
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '30px',
    paddingBottom: '60px',
    minHeight: '100vh'
  },
  title: {
    fontSize: '32px',
    marginBottom: '40px',
    textAlign: 'center'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    width: '300px',
    padding: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px'
  },
  logoutButton: {
    marginTop: '50px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default AdminDashboard;