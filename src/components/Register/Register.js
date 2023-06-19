import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logoImage from "../../assets/logo.jpg";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase-config";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [isWrongPass, setIsWrongPass] = useState(false);
  const [nameChange, setNameChange] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isWrongName, setIsWrongName] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("jobs-land-user");

    if (storedUser) {
      navigate("/stats");
    }
  }, []);

  const register = async () => {
    try {
      if (!isNameValid) {
        setIsWrongName(true);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await updateProfile(user, {
        displayName: nameChange,
      });
      console.log(user);
      localStorage.setItem(
        "jobs-land-user",
        JSON.stringify({
          email: user.email,
          uid: user.uid,
          name: user.displayName,
        })
      );
      navigate("/stats");
    } catch (error) {
      console.log(error.message);
      setFirebaseError(error.message);
    }
  };

  const nameChangeHandler = async (event) => {
    setNameChange(event.target.value);
    setIsWrongName(false);
  };
  const emailHandler = async function (event) {
    setEmail(event.target.value);
    setFirebaseError("");
  };
  const passHandler = async (event) => {
    setPassword(event.target.value);
    setFirebaseError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsNameValid(nameChange.trim().length > 0);

    await register();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 11,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: "33px",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderTop: "5px solid #1976d2",
            // height: 520,
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Box
            sx={{
              marginTop: -1,
              display: "flex",
              alignItems: "center",
              mb: 1,
            }}
          >
            <img src={logoImage} alt="Avatar" width={70} />

            <Typography
              component="h1"
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold", fontSize: "28px", mt: 1, ml: -1 }}
            >
              JobsLand
            </Typography>
          </Box>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 2, fontWeight: "normal" }}
          >
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box>
              <Typography variant="p">Name</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                id="name"
                name="name"
                autoComplete="name"
                onChange={nameChangeHandler}
                error={!isNameValid && isWrongName}
                helperText={
                  !isNameValid && isWrongName ? "please enter you name" : ""
                }
                sx={{
                  mt: 1,
                  mb: 3,
                  "& .MuiInputBase-input": {
                    height: "10px",
                  },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: "#f8f8ff",
                  },
                }}
              />
            </Box>

            <Typography variant="p">Email</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              onChange={emailHandler}
              error={
                firebaseError &&
                (firebaseError.includes("auth/email-already-in-use") ||
                  firebaseError.includes("auth/invalid-email"))
              }
              helperText={
                firebaseError &&
                firebaseError.includes("auth/email-already-in-use")
                  ? "Email already in use"
                  : firebaseError &&
                    firebaseError.includes("auth/invalid-email")
                  ? "Invalid email"
                  : ""
              }
              sx={{
                mt: 1,
                mb: 3,
                "& .MuiInputBase-input": {
                  height: "10px",
                },
              }}
              InputProps={{
                sx: {
                  backgroundColor: "#f8f8ff",
                },
              }}
            />
            <Typography variant="p">Password</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              // label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passHandler}
              error={
                firebaseError &&
                (firebaseError.includes(
                  " Password should be at least 6 characters (auth/weak-password)"
                ) ||
                  firebaseError.includes("auth/missing-password"))
              }
              helperText={
                firebaseError &&
                (firebaseError.includes(
                  " Password should be at least 6 characters (auth/weak-password)"
                )
                  ? "Password should be at least 6 characters"
                  : firebaseError.includes("auth/missing-password")
                  ? "Missing Password"
                  : "")
              }
              sx={{
                mt: 1,
                "& .MuiInputBase-input": {
                  height: "10px",
                },
              }}
              InputProps={{
                sx: {
                  backgroundColor: "#f8f8ff",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 4, textTransform: "none" }}
            >
              Submit
            </Button>

            <Typography variant="p" sx={{ ml: 8 }}>
              Already a member?
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#1565c0" }}
              >
                {" "}
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
