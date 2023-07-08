import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import AllNotesList from "./all-notes-list";
import Layout from "../Layout/Layout";
import { useState, useEffect } from "react";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});

const typeOptions = [
  { value: "all", label: "all" },
  {
    value: "important",
    label: "important",
  },
  {
    value: "random",
    label: "random",
  },
  { value: "personal", label: "personal" },
  { value: "study", label: "study" },

  { value: "work", label: "work" },
];
const sortOptions = [
  { value: "latest", label: "latest" },
  {
    value: "oldest",
    label: "oldest",
  },
];
const AddNote = function () {
  const [searchNote, setSearchNote] = useState("");
  const [typeSearch, setTypeSearch] = useState("all");
  const [sortSearch, setSortSearch] = useState("latest");
  const [isSearchChanged, setIsSearchChanged] = useState(false);
  const [isTypeChanged, setIsTypeChanged] = useState(false);
  const [isSortChanged, setIsSortChanged] = useState(false);
  const [clearButtonChanged, setClearButtonChanged] = useState(false);

  const handleSearch = (event) => {
    setSearchNote(event.target.value);
    setIsSearchChanged(event.target.value !== "");
  };
  const typeSearchHandler = (event) => {
    setTypeSearch(event.target.textContent);
    setIsTypeChanged(event.target.textContent !== "all");
  };
  const sortSearchHandler = (event) => {
    setSortSearch(event.target.textContent);
    setIsSortChanged(event.target.textContent !== "latest");
  };
  useEffect(() => {
    setClearButtonChanged(isSearchChanged || isTypeChanged || isSortChanged);
  }, [isSearchChanged, isTypeChanged, isSortChanged]);
  const clearFilterHandler = () => {
    setSearchNote("");
    const defaultTypeOption = typeOptions.find(
      (option) => option.label === "all"
    );
    setTypeSearch(defaultTypeOption.value);
    const defaultSortOption = sortOptions.find(
      (option) => option.label === "latest"
    );
    setSortSearch(defaultSortOption.value);
    setIsSearchChanged(false);
    setIsTypeChanged(false);
    setIsSortChanged(false);
    setClearButtonChanged(false);
  };

  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 9,
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              maxWidth: "1150px",
              backgroundColor: "#ffffff",
              padding: "33px",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              borderTop: "5px solid #1976d2",
            }}
          >
            <Typography sx={{ fontSize: "25px" }}>Search Form</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingTop: "25px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  {" "}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="p" sx={{ marginBottom: 1 }}>
                      Search
                    </Typography>
                    <TextField
                      onChange={handleSearch}
                      value={searchNote}
                      placeholder="Enter Title"
                      variant="outlined"
                      size="small"
                      sx={{
                        marginBottom: 1,
                        width: "100%",
                        "& .MuiInputBase-input": {},
                      }}
                      InputProps={{
                        sx: {
                          backgroundColor: "#f8f8ff",
                        },
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4}>
                  {" "}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="p" sx={{ marginBottom: 1 }}>
                      Type
                    </Typography>
                    <TextField
                      variant="outlined"
                      select
                      value={typeSearch}
                      size="small"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {},
                      }}
                      InputProps={{
                        sx: {
                          backgroundColor: "#f8f8ff",
                        },
                      }}
                    >
                      {typeOptions.map((options) => (
                        <MenuItem
                          onClick={typeSearchHandler}
                          key={options.value}
                          value={options.value}
                        >
                          {options.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  {" "}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="p" sx={{ marginBottom: 1 }}>
                      Sort
                    </Typography>
                    <TextField
                      variant="outlined"
                      select
                      value={sortSearch}
                      size="small"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {},
                      }}
                      InputProps={{
                        sx: {
                          backgroundColor: "#f8f8ff",
                        },
                      }}
                    >
                      {sortOptions.map((options) => (
                        <MenuItem
                          onClick={sortSearchHandler}
                          key={options.value}
                          value={options.value}
                        >
                          {options.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4}>
                  {" "}
                  <Box sx={{ display: "flex", flexDirection: "row", mt: 4 }}>
                    <Button
                      onClick={clearFilterHandler}
                      variant="contained"
                      sx={{
                        height: "38px",
                        width: "100%",
                        backgroundColor: clearButtonChanged
                          ? "#c62828"
                          : "#ef9a9a",
                        "&:hover": {
                          backgroundColor: "#c62828",
                        },
                      }}
                    >
                      Clear Filters
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>{" "}
        <AllNotesList
          searchQuery={searchNote}
          typeFilter={typeSearch}
          sortFilter={sortSearch}
        />
      </ThemeProvider>
    </Layout>
  );
};
export default AddNote;
