const BASE_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
    const res = await fetch('https://restcountries.com/v3.1/all');
    if (!res.ok) throw new Error('Failed to fetch countries');
    return await res.json();
  };
  

export const getCountryByName = (name) => fetch(`${BASE_URL}/name/${name}`).then(res => res.json());

export const getCountriesByRegion = (region) => fetch(`${BASE_URL}/region/${region}`).then(res => res.json());


export const getCountryByCode = async (code) => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!res.ok) throw new Error('Failed to fetch country by code');
    return await res.json();
  };
  