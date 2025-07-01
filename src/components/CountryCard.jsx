import { Link } from 'react-router-dom';

export default function CountryCard({ country }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-[1.02] hover:shadow-lg">
      <img
        src={country.flags?.svg || '/fallback.png'}
        alt={`Flag of ${country.name?.common || 'Unknown'}`}
        className="w-full h-44 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {country.name?.common || 'Unknown Country'}
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium">Region:</span> {country.region || 'N/A'}
          </p>
          <p>
            <span className="font-medium">Population:</span> {country.population?.toLocaleString() || 'N/A'}
          </p>
        </div>
        <Link
          to={`/country/${country.cca3}`}
          className="inline-block mt-4 text-sm text-blue-400 font-semibold hover:underline transition"
        >
          Click for more details
        </Link>
      </div>
    </div>
  );
}
