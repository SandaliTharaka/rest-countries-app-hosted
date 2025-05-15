// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Login.css'; // Import custom styles

export default function Login() {
  const [username, setUsername] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) return;
    login(username);
    navigate('/');
  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Login</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-300 hover:bg-blue-500 text-white font-semibold py-2 rounded transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
