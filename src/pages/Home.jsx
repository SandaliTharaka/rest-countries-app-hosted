import { useEffect, useState } from 'react';
import { getAllCountries } from '../api/countries';
import CountryCard from '../components/CountryCard';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    getAllCountries()
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch(err => console.error('Error fetching countries', err));
  }, []);

  useEffect(() => {
    let filtered = countries;

    if (search) {
      filtered = filtered.filter(c =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter(c => c.region === region);
    }

    if (language) {
      filtered = filtered.filter(c =>
        c.languages && Object.values(c.languages).includes(language)
      );
    }

    setFilteredCountries(filtered);
  }, [search, region, language, countries,]);

  const allLanguages = Array.from(
    new Set(
      countries.flatMap(c => (c.languages ? Object.values(c.languages) : []))
    )
  ).sort();

  return (
    <div className="space-y-6">
      {/* Filter Panel */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search by Country</label>
          <input
            type="text"
            placeholder="e.g. Sri Lanka"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Languages</option>
            {allLanguages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Country Cards Grid */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No countries found.</p>
      )}
    </div>
  );
}
