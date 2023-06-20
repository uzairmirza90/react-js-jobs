import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Form } from "react-router-dom";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Layout from "../Layout/Layout";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});
const statusOptions = [
  {
    value: "interview",
    label: "interview",
  },
  {
    value: "declined",
    label: "declined",
  },
  { value: "pending", label: "pending" },
];
const jobTypeOptions = [
  {
    value: "full-time",
    label: "full-time",
  },
  {
    value: "part-time",
    label: "part-time",
  },
  { value: "remote", label: "remote" },
  { value: "internship", label: "internship" },
];
const AddJob = function () {
  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
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
            <Typography sx={{ fontSize: "25px" }}>Add Job</Typography>
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
                      Position
                    </Typography>
                    <TextField
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
                      Company
                    </Typography>
                    <TextField
                      variant="outlined"
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
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  {" "}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="p" sx={{ marginBottom: 1 }}>
                      Job location
                    </Typography>
                    <TextField
                      variant="outlined"
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
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  {" "}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="p" sx={{ marginBottom: 1 }}>
                      Status
                    </Typography>
                    <TextField
                      variant="outlined"
                      select
                      defaultValue="pending"
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
                      {statusOptions.map((options) => (
                        <MenuItem key={options.value} value={options.value}>
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
                      Job Type
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      select
                      defaultValue="full-time"
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
                      {jobTypeOptions.map((options) => (
                        <MenuItem key={options.value} value={options.value}>
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
                      variant="contained"
                      sx={{
                        mr: 6,
                        height: "38px",
                        width: "153px",
                        backgroundColor: "#9e9e9e",
                        "&:hover": {
                          backgroundColor: "#757575",
                        },
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        height: "38px",
                        width: "153px",
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>{" "}
      </ThemeProvider>
    </Layout>
  );
};
export default AddJob;
