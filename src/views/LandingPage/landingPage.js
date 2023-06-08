import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { CssBaseline, Link } from "@mui/material";
import logoImage from "../../assets/logo.jpg";
import landingImage from "../../assets/landingImage.jpg";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});

const landingPage = function () {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            alignItems: "left",
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <img src={logoImage} alt="Avatar" width={70} height={60} />
            <Typography
              variant="h3"
              component="h1"
              color="primary"
              sx={{ fontWeight: "bold", fontSize: "32px", mt: 2, ml: -1 }}
            >
              JobsLand
            </Typography>
          </Box>
          <Box
            sx={{ ml: 2, mt: 22, display: "flex", alignItems: "flex-start" }}
          >
            <Typography
              variant="h3"
              component="h1"
              color="primary"
              sx={{
                fontWeight: "bold",
                fontSize: "48px",
              }}
            >
              <span style={{ color: "black" }}>Job </span>
              Tracking
              <span style={{ color: "black" }}> App </span>
            </Typography>
          </Box>
          <Box sx={{ ml: 80, mt: -20 }}>
            <img src={landingImage} alt="landingImage" width={530} />
          </Box>
          <Box
            sx={{ mt: -33, ml: 2, display: "flex", alignItems: "flex-start" }}
          >
            <Typography variant="p">
              This is our job tracking app, you can search your kind of
              <br /> job here and post for a job also.
            </Typography>
          </Box>
          <Box sx={{ mt: 2, ml: 2, display: "flex", alignItems: "flex-start" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", fontSize: "20px", height: "33px" }}
            >
              Login/Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default landingPage;
