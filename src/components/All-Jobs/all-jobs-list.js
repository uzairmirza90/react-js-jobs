import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Form } from "react-router-dom";
import { Button, Dialog } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Firebase-config";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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

  const [notesList, setNotesList] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  const notes = collection(db, "notes");

  useEffect(() => {
    const getNotesList = async () => {
      try {
        const data = await getDocs(notes);
        const addedNotes = data.docs.map((note) => ({
          ...note.data(),
        }));
        console.log(addedNotes);
        setNotesList(addedNotes);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNotesList();
  }, []);
  const handleSeeMore = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

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
            {notesList.map((notes) => (
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
                    <Typography
                      variant="p"
                      color="#9e9e9e"
                      sx={{ marginBottom: 1 }}
                    >
                      Title
                    </Typography>
                    <Typography
                      variant="h6"
                      // color="#9e9e9e"
                      sx={{ marginBottom: 1 }}
                    >
                      {notes.noteTitle}
                    </Typography>
                    <Divider style={{ width: "auto", marginBottom: 10 }} />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="p"
                        color="#9e9e9e"
                        sx={{ marginBottom: 1 }}
                      >
                        Description
                      </Typography>
                      <Box
                        marginBottom={1}
                        sx={{
                          position: "relative",
                          "& .MuiTextField-root": {
                            "& .MuiInputBase-root": {
                              "&::before, &::after": {
                                borderBottom: "none",
                              },
                            },
                            "& .MuiInputBase-input": {
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "pre-wrap",
                              maxHeight: "calc(1em * 6)",
                            },
                          },
                        }}
                      >
                        <TextField
                          multiline
                          rows={4}
                          maxRows={4}
                          value={notes.noteDescription}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                          }}
                        />
                        {notes.noteDescription.split("\n").length > 4 && (
                          <Button
                            onClick={handleSeeMore}
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                            }}
                          >
                            See more
                          </Button>
                        )}
                      </Box>
                      <Dialog
                        open={showOverlay}
                        onClose={handleCloseOverlay}
                        fullScreen={isMobileSize}
                      >
                        <DialogTitle sx={{ paddingRight: 0 }}>
                          <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleCloseOverlay}
                            aria-label="close"
                          >
                            <CloseIcon />
                          </IconButton>
                        </DialogTitle>
                        <Box
                          sx={{
                            marginTop: 0,
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: "wrap",
                            maxWidth: "1150px",
                            backgroundColor: "#ffffff",
                            padding: "33px",
                            borderRadius: "8px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              paddingTop: "25px",
                            }}
                          >
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Typography
                                    variant="p"
                                    color="#9e9e9e"
                                    sx={{ marginBottom: 1 }}
                                  >
                                    Title
                                  </Typography>
                                  <Typography
                                    variant="h6"
                                    // color="#9e9e9e"
                                    sx={{ marginBottom: 1 }}
                                  >
                                    {notes.noteTitle}
                                  </Typography>
                                  <Divider
                                    style={{ width: "auto", marginBottom: 10 }}
                                  />
                                  <Typography
                                    variant="p"
                                    color="#9e9e9e"
                                    sx={{ marginBottom: 1 }}
                                  >
                                    Description
                                  </Typography>
                                  <TextField
                                    value={notes.noteDescription}
                                    multiline
                                  ></TextField>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Dialog>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
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
                  </Box>
                </Box>
              </Grid>
            ))}
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
                  borderColor: "primary.main",
                  backgroundColor: "#bbdefb",
                  color: "primary.main",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  borderColor: "primary.main ",
                  backgroundColor: "primary.main",
                  color: "white",
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
