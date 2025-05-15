# Country Explorer
A responsive React application that allows users to explore country data using the REST Countries
API.
## Features
- View all countries with flags, region, and population
- Search countries by name
- Filter by region and language
- View detailed info for each country
- Login/Logout functionality (simulated)
- Responsive layout with Tailwind CSS
- Unit & integration tests
## Project Structure
- src/pages/ - Home, Login, CountryDetail pages
- src/components/ - Navbar, CountryCard
- src/api/ - API functions (getAllCountries, getCountryByCode)
- src/context/ - UserContext for managing login state
## Running Tests
npm run test
Includes full test coverage for all major components using React Testing Library.
## Installation & Setup
git clone <repo-url>
cd country-explorer
npm install
npm run dev
Then navigate to http://localhost:5173
## Login Info
No backend is used. Any username + password logs in.
## API Used
This application uses the REST Countries API v3.1 (https://restcountries.com/) to fetch real-time
country data including:
- Country names & flags
- Population & region
- Languages & capital cities
## License
For educational use only.
