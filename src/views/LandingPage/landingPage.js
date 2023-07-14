import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Grid } from "@mui/material";
import logoImage from "../../assets/logo.jpg";
import landingImage from "../../assets/landingImage.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});

const LandingPage = function () {
  const isSmallScreen = useMediaQuery("(max-width:920px)");
  let navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("jobs-land-user");

    if (storedUser) {
      navigate("/stats");
    }
  }, []);

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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <img src={logoImage} alt="Avatar" width={70} height={60} />
                <Typography
                  variant="h3"
                  component="h1"
                  color="primary"
                  sx={{ fontWeight: "bold", fontSize: "32px", mt: 2 }}
                >
                  NotesLand
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 22,
                  display: "flex",
                  alignItems: "flex-start",
                }}
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
                  <span style={{ color: "black" }}>Note </span>
                  Taking
                  <span style={{ color: "black" }}> App </span>
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2.5,
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="p">
                  This is our note taking app, you can add or delete your note
                  here and catagorise your notes as well.
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2.5,
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Link to="/Login">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      fontSize: "20px",
                      height: "33px",
                    }}
                  >
                    Login/Register
                  </Button>
                </Link>
              </Box>
            </Grid>
            {!isSmallScreen && (
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: "center", mt: 14 }}>
                  <img src={landingImage} alt="landingImage" width={520} />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;
