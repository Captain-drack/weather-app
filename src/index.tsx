import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Box } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Box
      sx={{
        maxWidth: "100%",
        minHeight: "100vh",
        padding: { xs: "15px", md: "40px", lg: "50px" },
        boxSizing: "border-box",
        backgroundColor: "#00000090",
      }}
    >
      {/* Inner Box for content */}
      <Box>
        <App />
      </Box>
    </Box>
  </React.StrictMode>
);
