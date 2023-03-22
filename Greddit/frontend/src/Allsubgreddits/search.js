// this search bar takes the input and return the input to the handleSearch function in allsubgreddits.js file
import React from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";
import allsubgreddits from "./allsubgreddits";

const SearchBar = ({ handleSearch }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <TextField
      margin="normal"
        id="search"
        label="Search"
        variant="outlined"
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
export default SearchBar;
