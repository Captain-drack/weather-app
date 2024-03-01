import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import CustomTextField from "./CustomComponents/CustomTextField"; // Adjust the import path as necessary
import { Search } from "@mui/icons-material";

const StyledButton = styled(Button)`
  background-color: #ffffff99;
  color: #000000;
  font-weight: bold;
  outline: none;
  border-radius: 50px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #ffffff;
  }
`;

interface SearchBarProps {
  city: string;
  suggestions: any[]; 
  onCityChange: (value: string) => void; 
  onSearch: () => void;
  onSelectSuggestion: (cityName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  city,
  suggestions,
  onCityChange,
  onSearch,
  onSelectSuggestion,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    onCityChange(capitalizedValue);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CustomTextField value={city} onChange={handleChange} />
        <StyledButton
          variant="contained"
          onClick={onSearch}
        >
          <Search fontSize="small" />
        </StyledButton>
      </Box>
      <List
        component="nav"
        sx={{
          borderRadius: "5px",
        }}
      >
        {suggestions.map((suggestion, index) => (
          <ListItem
            key={index}
            onClick={() => onSelectSuggestion(suggestion.name)}
            sx={{
              backgroundColor: "#ffffff",
              '&:hover': {
                backgroundColor: "#f0f0f0",
              },
              cursor: "pointer",
            }}
          >
            <ListItemText
              primary={suggestion.name}
              sx={{ color: "#000", cursor: "pointer" }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchBar;
