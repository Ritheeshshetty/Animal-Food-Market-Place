import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function CustomerDashboard() {
      const navigate = useNavigate();
     const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      alert('Logged out successfully');
      navigate('/login');
    } catch (err) {
      alert('Logout failed');
    }
  };
  return (
    <div>CustomerDashboard<button
        onClick={handleLogout}
        style={{
          marginLeft: 'auto',
          background: '#d63031',
          color: 'white',
          border: 'none',
          padding: '0.4rem 0.8rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button></div>
    
  )
}

export default CustomerDashboard