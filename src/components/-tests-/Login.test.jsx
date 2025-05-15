import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import { UserProvider } from '../../context/UserContext';

const renderWithProviders = () => {
  return render(
    <BrowserRouter>
      <UserProvider>
        <Login />
      </UserProvider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    localStorage.clear(); 
  });

  it('renders input and login button', () => {
    renderWithProviders();
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('calls login function with username', () => {
    renderWithProviders();
    const input = screen.getByPlaceholderText(/Enter username/i);
    const button = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);

    const stored = JSON.parse(localStorage.getItem('user'));
    expect(stored.username).toBe('testuser');
  });

  it('does not call login if username is empty', () => {
    renderWithProviders();
    const button = screen.getByRole('button', { name: /Login/i });

    fireEvent.click(button);

    const stored = localStorage.getItem('user');
    expect(stored).toBeNull();
  });
});
