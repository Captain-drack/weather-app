import React, { useState, useEffect } from "react";
import {
  fetchForecastData,
  fetchWeatherData,
  ForecastResponse,
} from "../Services/weatherServices";
import { fetchCitySuggestions } from "../Services/cityServices";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import SearchBar from "./SearchBar";
import { Box, Grid, Typography } from "@mui/material";
import WeatherNews from "./WeatherNews";
import styled, { keyframes } from "styled-components";

// Define the keyframes for the animations
const typewriter = keyframes`
  from { width: 0; }
  to { width: 55%; }
`;

const blinkTextCursor = keyframes`
  from { border-right-color: hsl(0, 0%, 80%); }
  to { border-right-color: transparent; }
`;

// Create a styled component for the Typography
const StyledTypography = styled(Typography)`
  color: #fff;
  font-weight: bold !important;
  letter-spacing: 5px !important;
  overflow: hidden;
  font-size: 30px !important;
  border-right: 2px solid hsl(0, 0%, 80%);
  white-space: nowrap;
  animation: ${typewriter} 4s steps(44) 1s 1 normal both,
    ${blinkTextCursor} 500ms steps(44) infinite;
`;

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);

  const handleSearch = async (searchCity: string = city) => {
    if (!searchCity) return;
    try {
      // Fetch current weather
      const weatherData = await fetchWeatherData(searchCity);
      setWeather(weatherData);
      // Fetch forecast
      const forecastData = await fetchForecastData(searchCity);
      setForecast(forecastData);
      // Reset UI
      setCity(searchCity); // Optionally, update the input field to show the searched city
      setSuggestions([]); // Clear suggestions if any
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (city.length < 3) {
      setSuggestions([]);
      return;
    }

    const debounce = setTimeout(() => {
      fetchCitySuggestions(city).then(setSuggestions).catch(console.error);
    }, 300);
    return () => clearTimeout(debounce); // Cleanup function to cancel the timeout if the component unmounts
  }, [city]);

  return (
    <div style={{ margin: "20px" }}>
      <SearchBar
        city={city}
        suggestions={suggestions}
        onCityChange={setCity}
        onSearch={() => handleSearch(city)}
        onSelectSuggestion={(cityName: string) => {
          setCity(cityName);
          handleSearch(cityName);
        }}
      />
      {!weather && !forecast ? (
        <Box
          sx={{
            padding: 0,
            margin: 0,
            display: {xs: "none", lg: "flex"},
            alignItems: "center",
            justifyContent: "center",
            height: "20vh",
          }}
        >
          {/* Apply the styled component */}
          <StyledTypography>Hello there! Search your city</StyledTypography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {weather && <CurrentWeather weather={weather} />}
          </Grid>
          <Grid item xs={12} md={4}>
            {forecast && <WeatherForecast forecast={forecast} />}
          </Grid>
        </Grid>
      )}
      <WeatherNews />
    </div>
  );
};

export default Weather;
