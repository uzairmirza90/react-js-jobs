import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState } from "react";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

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
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderTop: "3px solid #1976d2",
            height: 480,
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 7, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
