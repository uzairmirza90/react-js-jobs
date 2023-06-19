import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Form } from "react-router-dom";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import Layout from "../Layout/Layout";
const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});
const StatsData = function () {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Container component="section">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              maxWidth: "1150px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={isMobileSize ? 12 : 6} md={4} lg={4}>
                {" "}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#ffffff",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    padding: "33px",
                    marginTop: 2,
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    borderBottom: "5px solid #ffcc80",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{ marginBottom: 3, color: "#ffcc80" }}
                    >
                      15
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: 1 }}>
                      Pending Applications
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={isMobileSize ? 12 : 6} md={4} lg={4}>
                {" "}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#ffffff",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    padding: "33px",
                    marginTop: 2,
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    borderBottom: "5px solid #3f51b5",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{ marginBottom: 3, color: "#3f51b5" }}
                    >
                      20
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: 1 }}>
                      Interviews Scheduled
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={isMobileSize ? 12 : 6} md={4} lg={4}>
                {" "}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#ffffff",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    padding: "33px",
                    marginTop: 2,
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    borderBottom: "5px solid #f44336",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{ marginBottom: 3, color: "#f44336" }}
                    >
                      25
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: 1 }}>
                      Jobs Declined
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default StatsData;
