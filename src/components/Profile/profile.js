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
import { useState, useEffect } from "react";
import {
  getAuth,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { AppContext } from "../../context/context";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});
const Profile = function () {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const { setRefetchName } = React.useContext(AppContext);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleNameChange = (event) => {
    setUpdatedName(event.target.value);
  };
  const handleCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUpdatedPassword(event.target.value);
  };

  const handleSaveChanges = () => {
    if (updatedName) {
      updateProfile(auth.currentUser, {
        displayName: updatedName,
      })
        .then(() => {
          localStorage.setItem(
            "notes-land-user",
            JSON.stringify({
              name: updatedName,
              email: user.email,
              uid: user.uid,
            })
          );
          setRefetchName(true);
          console.log("name updated successfully");
        })
        .catch((error) => {
          console.log("Error updating name:", error);
        });
    }
    if (currentPassword) {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      reauthenticateWithCredential(user, credential)
        .then(() => {
          console.log("re auth successfull");
          if (updatedPassword) {
            updatePassword(user, updatedPassword)
              .then(() => {
                console.log("Password updated successfully!");
              })
              .catch((error) => {
                console.log("Error updating password:", error);
              });
          }
        })
        .catch((error) => {
          console.log("Error re-authenticating user:", error);
        });
    } else {
      console.log("Please enter the current password for re-authentication.");
    }
  };

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
            <Typography sx={{ fontSize: "25px" }}>Profile</Typography>
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
                      Name
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      onChange={handleNameChange}
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
                      Current Password
                    </Typography>
                    <TextField
                      type="password"
                      variant="outlined"
                      onChange={handleCurrentPassword}
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
                      New Password
                    </Typography>
                    <TextField
                      type="password"
                      variant="outlined"
                      onChange={handlePasswordChange}
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
                  <Button
                    variant="contained"
                    onClick={handleSaveChanges}
                    sx={{
                      mt: "33px",
                      height: "38px",
                      width: "100%",
                    }}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>{" "}
      </ThemeProvider>
    </Layout>
  );
};
export default Profile;
