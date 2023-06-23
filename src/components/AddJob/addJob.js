import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Layout from "../Layout/Layout";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoteHandler from "../notehandler/NoteHandler";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});

const AddJob = function () {
  return (
    <Layout>
      <ToastContainer />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <CssBaseline />
          <NoteHandler titleText={"Add Note"} noteHandler={"add"} />
        </Container>{" "}
      </ThemeProvider>
    </Layout>
  );
};
export default AddJob;
