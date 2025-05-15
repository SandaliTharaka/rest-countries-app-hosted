// src/pages/__tests__/Home.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../../pages/Home';
import { BrowserRouter } from 'react-router-dom';
import * as api from '../../api/countries';
import { vi } from 'vitest';

// Mock countries data
const mockCountries = [
  {
    name: { common: 'Germany' },
    region: 'Europe',
    population: 83000000,
    flags: { svg: 'https://flagcdn.com/de.svg' },
    cca3: 'DEU',
    languages: { deu: 'German' }
  },
  {
    name: { common: 'Japan' },
    region: 'Asia',
    population: 125800000,
    flags: { svg: 'https://flagcdn.com/jp.svg' },
    cca3: 'JPN',
    languages: { jpn: 'Japanese' }
  }
];

// Mock API
vi.mock('../../api/countries', () => ({
  getAllCountries: vi.fn(() => Promise.resolve(mockCountries)),
}));

describe('Home Page', () => {
  beforeEach(async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('Germany'));
  });

  it('renders country cards correctly', () => {
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('filters countries by search input', async () => {
    const searchInput = screen.getByPlaceholderText(/e\.g\. sri lanka/i);
    fireEvent.change(searchInput, { target: { value: 'Jap' } });

    await waitFor(() => {
      expect(screen.getByText('Japan')).toBeInTheDocument();
      expect(screen.queryByText('Germany')).not.toBeInTheDocument();
    });
  });

  it('filters countries by region', async () => {
    // Find the label and get the select element near it
    const regionLabel = screen.getByText(/filter by region/i);
    const regionSelect = regionLabel.closest('label')?.nextElementSibling;
    fireEvent.change(regionSelect, { target: { value: 'Europe' } });

    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
      expect(screen.queryByText('Japan')).not.toBeInTheDocument();
    });
  });

  it('filters countries by language', async () => {
    const languageLabel = screen.getByText(/filter by language/i);
    const languageSelect = languageLabel.closest('label')?.nextElementSibling;
    fireEvent.change(languageSelect, { target: { value: 'Japanese' } });

    await waitFor(() => {
      expect(screen.getByText('Japan')).toBeInTheDocument();
      expect(screen.queryByText('Germany')).not.toBeInTheDocument();
    });
  });

  it('shows "No countries found" when no matches', async () => {
    const searchInput = screen.getByPlaceholderText(/e\.g\. sri lanka/i);
    fireEvent.change(searchInput, { target: { value: 'Atlantis' } });

    await waitFor(() => {
      expect(screen.getByText(/no countries found/i)).toBeInTheDocument();
    });
  });
});
