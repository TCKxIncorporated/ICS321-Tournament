import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTeamToTournament } from '../../backend/adminMethod';
import supabase from '../../supabaseClient';

interface Team {
  team_id: number;
  team_name: string;
}

interface Tournament {
  tr_id: number;
  tr_name: string;
}

function AddTeam() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [joinedTrIds, setJoinedTrIds] = useState<number[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedTrId, setSelectedTrId] = useState('');
  const [teamGroup, setTeamGroup] = useState('');

  useEffect(() => {
    const fetchTeamsAndTournaments = async () => {
      const { data: teamData } = await supabase.from('team').select('team_id, team_name');
      const { data: trData } = await supabase.from('tournament').select('tr_id, tr_name');
      if (teamData) setTeams(teamData);
      if (trData) setTournaments(trData);
    };

    fetchTeamsAndTournaments();
  }, []);

  useEffect(() => {
    const fetchJoinedTournaments = async () => {
      if (!selectedTeamId) return;
      const { data, error } = await supabase
        .from('tournament_team')
        .select('tr_id')
        .eq('team_id', parseInt(selectedTeamId));
      if (error) console.error('Error fetching joined tournaments:', error);
      else setJoinedTrIds(data.map((item) => item.tr_id));
    };

    fetchJoinedTournaments();
  }, [selectedTeamId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addTeamToTournament(selectedTrId, selectedTeamId, teamGroup);
      alert('Team added successfully!');
      setSelectedTeamId('');
      setSelectedTrId('');
      setTeamGroup('');
    } catch (error) {
      console.error('Error adding team:', error);
      alert('Failed to add team. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Team to Tournament</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          value={selectedTeamId}
          onChange={(e) => setSelectedTeamId(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.team_id} value={team.team_id}>
              {team.team_id} - {team.team_name}
            </option>
          ))}
        </select>

        <select
          value={selectedTrId}
          onChange={(e) => setSelectedTrId(e.target.value)}
          required
          style={styles.input}
          disabled={!selectedTeamId} // this disabled the select tournment untill pick a team 
        >
          <option value="">Select Tournament</option>
          {tournaments.map((tr) => (
            <option key={tr.tr_id} value={tr.tr_id}>
              {tr.tr_id} - {tr.tr_name}
              {joinedTrIds.includes(tr.tr_id) ? ' || Already Joined' : ''}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Team Group"
          value={teamGroup}
          onChange={(e) => setTeamGroup(e.target.value)}
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
