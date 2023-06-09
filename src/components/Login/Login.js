import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logoImage from "../../assets/logo.jpg";
import { useState } from "react";

import { Link } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

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

  const emailHandler = function (event) {
    setEmail(event.target.value);
    setIsWrongEmail(false);
  };
  const passHandler = (event) => {
    setPassword(event.target.value);
    setIsWrongPass(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsWrongEmail(true);
    setIsWrongPass(true);

    const isEmailValid =
      /^[^A-Z]*$/.test(email.trim()) &&
      email.trim().includes("@") &&
      email.length !== 0;

    const isPassValid =
      password.length > 6 &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*]/.test(password);

    setIsValidEmail(isEmailValid);
    setIsValidPass(isPassValid);
    console.log(email, password);
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography variant="p">Email</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={emailHandler}
              error={!isValidEmail && isWrongEmail}
              helperText={
                isWrongEmail
                  ? !isValidEmail
                    ? email === ""
                      ? "enter your email"
                      : "Invalid Email"
                    : ""
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
              error={!isValidPass && isWrongPass}
              helperText={
                isWrongPass
                  ? !isValidPass
                    ? password === ""
                      ? "enter your password"
                      : "password must be greater than 6 digits and must include one capital and special character"
                    : ""
                  : ""
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
              Sumbit
            </Button>
            <Typography variant="p" sx={{ ml: 8 }}>
              Not a member yet?
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#1565c0" }}
              >
                {" "}
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
