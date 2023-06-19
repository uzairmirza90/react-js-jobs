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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});

const AllJobList = function () {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="section">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            maxWidth: "1150px",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
            List
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={isMobileSize ? 12 : 6} md={6}>
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
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    Position
                  </Typography>
                  <Typography
                    variant="p"
                    color="#9e9e9e"
                    sx={{ marginBottom: 1 }}
                  >
                    Name
                  </Typography>
                  <Divider style={{ width: "auto", marginBottom: 30 }} />
                  <Box
                    sx={{
                      display: "flex",

                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="p" sx={{ marginBottom: 1 }}>
                          Location
                        </Typography>
                        <Typography variant="p" sx={{ marginBottom: 3 }}>
                          Type
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{
                              ml: 1,
                              backgroundColor: "#81c784",
                              "&:hover": {
                                backgroundColor: "#4caf50",
                              },
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              ml: 1,
                              backgroundColor: "#ef9a9a",
                              "&:hover": {
                                backgroundColor: "#c62828",
                              },
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="p" sx={{ marginBottom: 1 }}>
                          Date
                        </Typography>
                        <Button variant="contained">Status</Button>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={isMobileSize ? 12 : 6} md={6}>
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
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    Position
                  </Typography>
                  <Typography
                    variant="p"
                    color="#9e9e9e"
                    sx={{ marginBottom: 1 }}
                  >
                    Name
                  </Typography>
                  <Divider style={{ width: "auto", marginBottom: 30 }} />
                  <Box
                    sx={{
                      display: "flex",

                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="p" sx={{ marginBottom: 1 }}>
                          Location
                        </Typography>
                        <Typography variant="p" sx={{ marginBottom: 3 }}>
                          Type
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{
                              ml: 1,
                              backgroundColor: "#81c784",
                              "&:hover": {
                                backgroundColor: "#4caf50",
                              },
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              ml: 1,
                              backgroundColor: "#ef9a9a",
                              "&:hover": {
                                backgroundColor: "#c62828",
                              },
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="p" sx={{ marginBottom: 1 }}>
                          Date
                        </Typography>
                        <Button variant="contained">Status</Button>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Pagination
              size="large"
              color="primary"
              count={5}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: "bold",
                  borderColor: "primary.main", // Set border color to primary
                  backgroundColor: "#bbdefb",
                  color: "primary.main", // Set background color to primary
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  borderColor: "primary.main ", // Set border color to primary dark when selected
                  backgroundColor: "primary.main",
                  color: "white", // Set background color to primary dark when selected
                },
              }}
            />
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default AllJobList;
