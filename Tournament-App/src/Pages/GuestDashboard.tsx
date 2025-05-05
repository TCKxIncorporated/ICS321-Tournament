import React from 'react';
import styles from '../CSS/GuestDashboard.module.css';
import { useNavigate } from 'react-router-dom';


const GuestDashboard: React.FC = () => {
    const navigate = useNavigate();
    const handleAdminLogin = () => {navigate('/login')}
    return (
        <div className={styles.container}>
        <div className={styles.dashboard}>
            <button className={styles.button}>Browse Tournament Matches</button>
            <button className={styles.button}>Browse Teams</button>
            <button className={styles.button}>Browse The player with highest goals scored</button>
            <button className={styles.button}>Browse Players who received red cards</button>
            <button className={styles.button}>Apply to Join a team</button>
            <button className={styles.button} onClick={handleAdminLogin}>Login as admin</button>
            
        </div>
        </div>
    );
};

export default GuestDashboard;