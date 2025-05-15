import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';
import PrivateRoute from './routes/PrivateRoute';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />}>
            {/* Protect Home */}
            <Route
              index
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            {/* Protect Country Detail */}
            <Route
              path="country/:code"
              element={
                <PrivateRoute>
                  <CountryDetail />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
