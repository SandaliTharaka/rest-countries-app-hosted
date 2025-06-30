const BASE_URL = "https://restcountries.com/v3.1";

//  FIXED: Added required ?fields=... to avoid 400 error
export const getAllCountries = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/all?fields=name,flags,region,languages,cca3`,
      {
        headers: {
          Accept: "application/json",
        },
        mode: "cors",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch countries");
    return await res.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

// Optional: Add .ok check here too
export const getCountryByName = async (name) => {
  const res = await fetch(
    `${BASE_URL}/name/${name}?fields=name,flags,region,languages,cca3`
  );
  if (!res.ok) throw new Error("Failed to fetch country by name");
  return await res.json();
};

export const getCountriesByRegion = async (region) => {
  const res = await fetch(
    `${BASE_URL}/region/${region}?fields=name,flags,region,languages,cca3`
  );
  if (!res.ok) throw new Error("Failed to fetch countries by region");
  return await res.json();
};

export const getCountryByCode = async (code) => {
  const res = await fetch(
    `${BASE_URL}/alpha/${code}?fields=name,flags,region,languages,cca3`
  );
  if (!res.ok) throw new Error("Failed to fetch country by code");
  return await res.json();
};
