// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="country/:code" element={<CountryDetail />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
