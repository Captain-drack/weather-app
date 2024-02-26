import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CustomCard from "./CustomComponents/CustomCard";

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

interface ForecastProps {
  forecast: {
    list: ForecastItem[];
  };
}

const WeatherForecast: React.FC<ForecastProps> = ({ forecast }) => {
  return (
    <div>
      <Typography variant="h6" style={{ marginTop: "20px" }} color="#fff">
        3 Hour forecast data for 5 days
      </Typography>
      <Box sx={{ maxHeight: "500px", overflow: "auto", marginTop: "10px" }}>
        {forecast.list.map((item, index) => (
          <CustomCard
            key={index}
            style={{ backgroundColor: "#ffffff50", color: "#fff" }}
          >
            <Grid container>
              <Grid item xs={4}>
                <Typography>
                  {new Date(item.dt * 1000).toLocaleString("en-US", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </Typography>
                <Typography>
                  <strong>
                    {" "}
                    {new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                {item.weather[0].icon && (
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="Weather icon"
                    style={{ width: "50px" }}
                  />
                )}
                <Box ml="5px">
                  <Typography>{item.main.temp}°</Typography>
                  <Typography>{item.weather[0].description}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CustomCard>
        ))}
      </Box>
    </div>
  );
};

export default WeatherForecast;
