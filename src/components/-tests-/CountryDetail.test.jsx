import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CountryDetail from '../../pages/CountryDetail';
import * as api from '../../api/countries';
import { vi } from 'vitest';

vi.mock('../../api/countries');

const mockCountry = {
  name: {
    common: 'Japan',
    official: 'Japan',
  },
  flags: {
    svg: 'https://flagcdn.com/jp.svg',
  },
  capital: ['Tokyo'],
  region: 'Asia',
  population: 125800000,
  languages: {
    jpn: 'Japanese',
  },
};

describe('CountryDetail Page', () => {
  it('renders loading state initially', () => {
    api.getCountryByCode.mockReturnValue(new Promise(() => {})); // never resolves
    render(
      <MemoryRouter initialEntries={['/country/JPN']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders country details after successful fetch', async () => {
    api.getCountryByCode.mockResolvedValue([mockCountry]);

    render(
      <MemoryRouter initialEntries={['/country/JPN']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // More specific queries to avoid ambiguity
      expect(screen.getByRole('heading', { name: /japan/i })).toBeInTheDocument();
      expect(screen.getByText(/Official Name:/i)).toBeInTheDocument();
      expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();
      expect(screen.getByText(/Asia/i)).toBeInTheDocument();
      expect(screen.getByText(/Japanese/i)).toBeInTheDocument();
    });
  });

  it('renders error state if country not found', async () => {
    api.getCountryByCode.mockResolvedValue([]);

    render(
      <MemoryRouter initialEntries={['/country/INVALID']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Country not found/i)).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    api.getCountryByCode.mockRejectedValue(new Error('API error'));

    render(
      <MemoryRouter initialEntries={['/country/JPN']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Country not found/i)).toBeInTheDocument();
    });
  });
});
