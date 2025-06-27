import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-gradient-to-r from-sky-400 to-blue-500 text-white px-6 py-4 flex justify-between items-center rounded-b-xl transition-shadow ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <Link to="/" className="text-2xl font-bold tracking-wide hover:opacity-90 transition">
        🌍 Country Explorer
      </Link>
      <div className="flex items-center gap-4 text-sm font-medium">
        {user ? (
          <>
            <span className="hidden sm:inline">Welcome, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-1.5 rounded-full shadow-sm hover:bg-blue-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-1.5 rounded-full shadow-sm hover:bg-blue-100 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
