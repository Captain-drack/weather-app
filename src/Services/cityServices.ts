import axios from "axios";

const fetchCitySuggestions = async (cityName: string) => {
  const API_KEY = process.env.REACT_APP_RAPID_API_KEY;
  const RAPIDAPI_HOST = process.env.REACT_APP_RAPIDAPI_HOST;
  const BASE_URL = `https://${RAPIDAPI_HOST}/v1/geo/cities`;

  try {
    const response = await axios.get(BASE_URL, {
      params: { namePrefix: cityName, minPopulation: 10000 }, 
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export { fetchCitySuggestions };
