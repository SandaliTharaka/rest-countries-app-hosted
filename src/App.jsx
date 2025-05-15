// src/App.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
