// import { useState } from 'react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';

// export default function Signup() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('customer'); // default role
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/auth/register', { name, email, password, role });
//       alert('Registration successful! Please login.');
//       navigate('/login');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <form className="login-form" onSubmit={handleSubmit}>
//       <h2>Signup</h2>
//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <input
//         placeholder="Email"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         placeholder="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         minLength={6}
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)} required>
//         <option value="customer">Customer</option>
//         <option value="supplier">Supplier</option>
//       </select>
//       <button type="submit">Signup</button>
//     </form>
//   );
// }

// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      alert("All fields are required.");
      return;
    }

    try {
      await api.post("/auth/signup", { name, email, password, role });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
   <div className="signup-container">
  <form className="signup-form" onSubmit={handleSubmit}>
    <h1>Animal Food Marketplace</h1>
    <h2>Join Our Pack!</h2>

    <div className="input-group">
      <span className="input-icon">👤</span>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>

    <div className="input-group">
      <span className="input-icon">✉️</span>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div className="input-group">
      <span className="input-icon">🔒</span>
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
    </div>

    <div className="input-group">
      <span className="input-icon">🏷️</span>
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)} 
        required
      >
        <option value="customer">Customer</option>
        <option value="supplier">Supplier</option>
      </select>
    </div>

    <p className="role-description">
      {role === 'customer' 
        ? "As a customer, you can browse and purchase pet food products." 
        : "As a supplier, you can list and manage your pet food products."}
    </p>

    <button type="submit">
      <span role="img" aria-label="paw">🐾</span> Create Account
    </button>

    <p className="login-link">
      Already part of our pack? <Link to="/login">Login</Link>
    </p>
  </form>
</div>
  );
}
