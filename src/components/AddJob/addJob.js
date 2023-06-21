import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Layout from "../Layout/Layout";
import {useState, useRef} from "react";
import {useMediaQuery} from "@mui/material";
import Menu from "@mui/material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../Firebase-config";
import CircularProgress from "@mui/material/CircularProgress";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});

const AddJob = function () {
  const titleRef = useRef();
  const maxWidth750 = useMediaQuery("(max-width:750px)");
  const maxWidth715 = useMediaQuery("(max-width:715px)");
  const maxWidth700 = useMediaQuery("(max-width:700px)");
  const maxWidth685 = useMediaQuery("(max-width:685px)");
  const maxWidth650 = useMediaQuery("(max-width:650px)");
  const maxWidth625 = useMediaQuery("(max-width:625px)");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [noteSubmissionLoading, setNoteSubmissionLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNoteSubmissionLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        noteTitle: title,
        noteDescription: description,
      })
        .then(() => {
          toast("Note submitted successfully!");
          setNoteSubmissionLoading(false);
          setTitle("");
          setDescription("");
        })
        .catch((error) => {
          setNoteSubmissionLoading(false);
          toast("Something went wrong!");
        });
    } catch (error) {
      setNoteSubmissionLoading(false);
      console.log(error);
    }
  };

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const clearHandler = (event) => {
    event.preventDefault();
    setTitle("");
    setDescription("");
    titleRef.current.focus();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };
  const menuItemHandler = async () => {
    setAnchorEl(null);
  };

  return (
    <Layout>
      <ToastContainer />
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {" "}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{fontSize: "25px"}}>Add Note</Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                      width: "auto",
                      fontSize: {xs: "10px", sm: "13px"},
                    }}
                  >
                    Mark
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={menuItemHandler}>important</MenuItem>
                    <MenuItem onClick={menuItemHandler}>random</MenuItem>
                    <MenuItem onClick={menuItemHandler}>personal</MenuItem>
                  </Menu>
                </Box>
              </Grid>
            </Grid>

            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  paddingTop: "25px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={
                      maxWidth750
                        ? maxWidth715
                          ? maxWidth700
                            ? maxWidth685
                              ? maxWidth625
                                ? 7.5
                                : 8.5
                              : 9.5
                            : 10.5
                          : 11.5
                        : 12
                    }
                    md={12}
                    lg={12}
                  >
                    {" "}
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                      <Typography variant="p" sx={{marginBottom: 1}}>
                        Title*
                      </Typography>
                      <TextField
                        required
                        onChange={titleHandler}
                        value={title}
                        inputRef={titleRef}
                        variant="outlined"
                        fullWidth
                        id="title-field"
                        size="small"
                        InputProps={{
                          sx: {
                            backgroundColor: "#f8f8ff",
                            fontSize: "20px",
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={
                      maxWidth750
                        ? maxWidth715
                          ? maxWidth700
                            ? maxWidth685
                              ? maxWidth625
                                ? 7.5
                                : 8.5
                              : 9.5
                            : 10.5
                          : 11.5
                        : 12
                    }
                    md={12}
                    lg={12}
                  >
                    {" "}
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                      <Typography variant="p" sx={{marginBottom: 1}}>
                        Description
                      </Typography>
                      <TextField
                        variant="outlined"
                        onChange={descriptionHandler}
                        value={description}
                        fullWidth
                        multiline
                        size="small"
                        minRows={6}
                        sx={{
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
                    <Box sx={{display: "flex", flexDirection: "row", mt: 4}}>
                      <Button
                        onClick={clearHandler}
                        variant="contained"
                        sx={{
                          mr: 6,
                          height: "38px",
                          width: "153px",
                          backgroundColor: "#9e9e9e",
                          "&:hover": {
                            backgroundColor: "#757575",
                          },
                        }}
                      >
                        Clear
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          height: "38px",
                          width: "153px",
                        }}
                      >
                        {noteSubmissionLoading ? (
                          <CircularProgress color="inherit" size={25} />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Container>{" "}
      </ThemeProvider>
    </Layout>
  );
};
export default AddJob;
