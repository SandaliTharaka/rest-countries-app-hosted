// src/components/-tests-/Navbar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { UserProvider } from '../../context/UserContext';
import * as UserContext from '../../context/UserContext';
import { vi } from "vitest";

describe('Navbar Component', () => {
  const mockLogin = vi.fn();
  const mockLogout = vi.fn();

  const customRender = (user = null) => {
    // Mock the useUser hook
    vi.spyOn(UserContext, 'useUser').mockReturnValue({
      user,
      login: mockLogin,
      logout: mockLogout,
    });

    render(
      <BrowserRouter>
        <UserProvider>
          <Navbar />
        </UserProvider>
      </BrowserRouter>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders the application title', () => {
    customRender();
    expect(screen.getByText(/country explorer/i)).toBeInTheDocument();
  });

  test('displays the Login button when no user is logged in', () => {
    customRender(null);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('displays welcome message and Logout button when user is logged in', () => {
    customRender({ username: 'Alice' });
    expect(screen.getByText(/welcome, alice/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('calls logout function when Logout is clicked', () => {
    customRender({ username: 'Alice' });
    fireEvent.click(screen.getByText(/logout/i));
    expect(mockLogout).toHaveBeenCalled();
  });
});
