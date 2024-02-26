import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface CustomTextFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ value, onChange, label = 'Enter city name' }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      size="small"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LocationOnIcon />
          </InputAdornment>
        ),
        style: {
          borderRadius: 50,
        },
      }}
      sx={{
        ".MuiOutlinedInput-root": {
          borderRadius: "50px",
          borderColor: "#ffffff90",
          "& fieldset": {
            borderColor: "#ffffff90",
            borderWidth: 2,
          },
          "&:hover fieldset": {
            borderColor: "#ffffff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ffffff",
          },
        },
        ".MuiOutlinedInput-input": {
          color: "#fff",
        },
        ".MuiInputLabel-root": {
          color: "#ffffff",
          "&.Mui-focused": {
            color: "#ffffff",
          },
        },
        ".MuiSvgIcon-root": {
          color: "#ffffff90",
        },
      }}
    />
  );
};

export default CustomTextField;