import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

interface Weather {
  main: string;
  description: string;
  icon: string;
}

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: Weather[];
}

export interface ForecastResponse {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: Weather[];
  }[];
}

export const fetchWeatherData = async (
  city: string
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    console.log(response.data, "weather data");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};


export const fetchForecastData = async (
  city: string
): Promise<ForecastResponse> => {
  try {
    const response = await axios.get<ForecastResponse>(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    console.log(response.data, "forcast data");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};


