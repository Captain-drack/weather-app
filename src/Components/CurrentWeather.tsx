import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Avatar,
} from "@mui/material";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import CustomCard from "./CustomComponents/CustomCard"; // Ensure correct import path
import {
  AccessTime,
  Thermostat,
  WaterDrop,
  Speed,
  Compress,
  Visibility,
  Public,
} from "@mui/icons-material";

interface WeatherType {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
  visibility: number;
  weather: Array<{
    main: string;
    icon: string;
  }>;
}

const WeatherDetail = ({
  Icon,
  title,
  detail,
}: {
  Icon: any;
  title: string;
  detail: string | number;
}) => (
  <Grid item xs={12} sm={12} md={6}>
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff40",
        color: "white",
        padding: "5px",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "transparent" }}>
        <Icon />
      </Avatar>
      <Box display="flex">
        <Typography variant="subtitle1" mr={.5}>{title}: </Typography>
        <Typography variant="subtitle1">{detail}</Typography>
      </Box>
    </Card>
  </Grid>
);

const CurrentWeather = ({ weather }: { weather: WeatherType }) => {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const weatherDetails = [
    {
      title: "Feels Like",
      detail: `${Math.round(weather.main.feels_like)}°C`,
      Icon: Thermostat,
    },
    { title: "Humidity", detail: `${weather.main.humidity}%`, Icon: WaterDrop },
    { title: "Wind Speed", detail: `${weather.wind.speed} m/s`, Icon: Speed },
    {
      title: "Pressure",
      detail: `${weather.main.pressure} mb`,
      Icon: Compress,
    },
    {
      title: "Visibility",
      detail: `${weather.visibility / 1000} km`,
      Icon: Visibility,
    },
    { title: "Country", detail: weather.sys.country, Icon: Public },
  ];

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        style={{ marginTop: "20px" }}
        color="#fff"
      >
        <NearMeOutlinedIcon />
        <Typography variant="h5" component="h2" marginLeft="5px">
          {weather.name}
        </Typography>
      </Box>
      <CustomCard style={{ backgroundColor: "#ffffff50" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <NearMeOutlinedIcon sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ ml: 1, color: "white" }}>
            Current Weather
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <AccessTime sx={{ color: "white" }} />
            <Typography sx={{ ml: 1, color: "white" }}>
              {currentTime}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h1" sx={{ textAlign: "center", color: "white" }}>
          {Math.round(weather.main.temp)}°
        </Typography>
        {weather.weather[0].icon && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: -2, mb: 2 }}>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
              style={{ width: "50px" }}
            />
            <Typography sx={{ ml: .5, alignSelf: "center", color: "white" }}>
              {weather.weather[0].main}
            </Typography>
          </Box>
        )}
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {weatherDetails.map((detail, index) => (
            <WeatherDetail
              key={index}
              Icon={detail.Icon}
              title={detail.title}
              detail={detail.detail}
            />
          ))}
        </Grid>
      </CustomCard>
    </Box>
  );
};

export default CurrentWeather;
