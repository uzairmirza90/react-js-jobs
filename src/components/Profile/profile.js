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
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase-config";

import {
  getAuth,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { AppContext } from "../../context/context";
import { FirebaseError } from "@firebase/util";

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
  const [firebaseError, setFirebaseError] = useState("");

  const { setRefetchName } = React.useContext(AppContext);
  let navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const handleNameChange = (event) => {
    setUpdatedName(event.target.value);
    setFirebaseError("");
  };
  const handleCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
    setFirebaseError("");
  };

  const handlePasswordChange = (event) => {
    setUpdatedPassword(event.target.value);
    setFirebaseError("");
  };

  const handleSaveChanges = () => {
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
                      setUpdatedName("");
                      setUpdatedPassword("");
                      setCurrentPassword("");
                    })
                    .catch((error) => {
                      console.log("Error updating name:", error);
                    });
                }
              })
              .catch((error) => {
                console.log("Error updating password:", error);
                setFirebaseError(error.message);
              });
          }
        })
        .catch((error) => {
          console.log("Error re-authenticating user:", error);
          setFirebaseError(error.message);
        });
    } else {
      console.log("Please enter the current password for re-authentication.");
      setFirebaseError(
        "Please enter the current password for re-authentication."
      );
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
                      value={updatedName}
                      error={
                        firebaseError &&
                        firebaseError.includes(
                          "Please enter the current password for re-authentication."
                        )
                      }
                      helperText={
                        firebaseError &&
                        firebaseError.includes(
                          "Please enter the current password for re-authentication."
                        )
                          ? "Enter your current password to change your  name"
                          : ""
                      }
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
                      value={currentPassword}
                      error={
                        firebaseError &&
                        firebaseError.includes("auth/wrong-password")
                      }
                      helperText={
                        firebaseError &&
                        firebaseError.includes("auth/wrong-password")
                          ? "Wrong password"
                          : ""
                      }
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
                      value={updatedPassword}
                      error={
                        firebaseError &&
                        firebaseError.includes("auth/weak-password")
                      }
                      helperText={
                        firebaseError &&
                        firebaseError.includes("auth/weak-password")
                          ? "Password should be atleast 6 characters"
                          : ""
                      }
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
