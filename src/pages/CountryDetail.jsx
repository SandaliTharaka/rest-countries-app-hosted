import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCountryByCode } from '../api/countries';

export default function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCountryByCode(code)
      .then((data) => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading country', err);
        setLoading(false);
      });
  }, [code]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!country) return <p className="text-center mt-10 text-red-500">Country not found</p>;

  return (
    <div className="bg-white rounded-lg p-6 shadow max-w-3xl mx-auto mt-10">
      <button
        onClick={() => navigate('/')}
        className="mb-4 px-4 py-2 bg-blue-300 text-white rounded hover:text-blue-300 transition"
      >
        ← Back to Home
      </button>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h2 className="text-3xl font-bold mb-4">{country.name.common}</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>Official Name:</strong> {country.name.official}</p>
        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
      </div>
    </div>
  );
}
