import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import CountryCard from '../CountryCard';

const mockCountry = {
  name: { common: 'France' },
  flags: { svg: 'https://flagcdn.com/fr.svg' },
  region: 'Europe',
  population: 67391582,
  cca3: 'FRA'
};

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('CountryCard Component', () => {
  it('renders country name, region, and population', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);

    expect(screen.getByText(/France/)).toBeInTheDocument();
    expect(screen.getByText(/Europe/)).toBeInTheDocument();
    expect(screen.getByText(/67,391,582/)).toBeInTheDocument();
  });

  it('renders flag image with correct alt text', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);

    const img = screen.getByAltText(/Flag of France/);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockCountry.flags.svg);
  });

  it('renders the "Click for more details" link with correct href', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);

    const link = screen.getByRole('link', { name: /Click for more details/i });
    expect(link).toHaveAttribute('href', '/country/FRA');
  });
});
