// import { useState } from 'react';
// import api from '../api';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       const role = res.data.user.role;
//       if (role === 'admin') navigate('/admin');
//       else if (role === 'supplier') navigate('/supplier');
//       else navigate('/customer');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <form className="login-form" onSubmit={handleSubmit}>
//   <h2>Login</h2>
//   <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//   <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//   <button type="submit">Login</button>
  
// </form>

//   );
// }


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const res = await api.post('/auth/login', { email, password });
    const { role, isApproved } = res.data.user;

    if (role === 'supplier' && !isApproved) {
      alert('Your account is pending admin approval.');
      return;
    }

    if (role === 'admin') navigate('/admin/users');
    else if (role === 'supplier') navigate('/supplier');
    else navigate('/customer');
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};



  return (
   <div className="login-container">
  <form className="login-form" onSubmit={handleSubmit}>
    <h1>Animal Food Marketplace</h1>
    <h2>Welcome Back!</h2>

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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <button type="submit">
      <span role="img" aria-label="paw">🐾</span> Login
    </button>

    <p className="signup-link">
      Don't have an account? <Link to="/signup">Sign Up</Link>
    </p>
  </form>
</div>
  );
}
