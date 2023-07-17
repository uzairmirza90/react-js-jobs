import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Divider, Typography, CircularProgress} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Button, Dialog} from "@mui/material";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {getDocs, collection, query, orderBy, where} from "firebase/firestore";
import {db} from "../../Firebase-config";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useState, useEffect, useRef} from "react";
import {deleteDoc, doc} from "firebase/firestore";
import NoteHandler from "../notehandler/NoteHandler";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import {auth} from "../../Firebase-config";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});

const AllNotesList = function ({searchQuery, typeFilter, sortFilter}) {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("md"));

  const [notesList, setNotesList] = useState([]);
  const [noteHandler, setNoteHandler] = useState("");
  const [editNoteData, setEditNoteData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [isDescriptionOverflow, setDescriptionOverflow] = useState(false);
  const textFieldRef = useRef(null);
  const [isDescriptionFocused, setDescriptionFocused] = useState(false);

  const getNotesList = async () => {
    try {
      const user = auth.currentUser;
      const notesRef = collection(db, "notes");
      let userNotesQuery = query(notesRef, where("userId", "==", user.uid));

      const data = await getDocs(userNotesQuery);
      const notesArray = data.docs.map((note) => ({
        ...note.data(),
        id: note.id,
      }));
      if (sortFilter === "oldest") {
        notesArray.sort((a, b) => a.createdAt - b.createdAt);
      } else {
        notesArray.sort((a, b) => b.createdAt - a.createdAt);
      }
      setNotesList(notesArray);
      setLoadingNotes(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingNotes(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getNotesList(user.uid);
      } else {
        setNotesList([]);
        setLoadingNotes(false);
      }
    });

    return () => unsubscribe();
  }, [sortFilter]);

  const deleteHandler = async (noteId) => {
    try {
      const updatedNotesList = notesList.map((note) => {
        if (note.id === noteId) {
          return {...note, deleting: true};
        }
        return note;
      });

      setNotesList(updatedNotesList);

      await deleteDoc(doc(db, "notes", noteId));

      toast("Note deleted successfully");

      setNotesList((prevNotesList) =>
        prevNotesList.filter((note) => note.id !== noteId)
      );
    } catch (error) {
      toast("Something went wrong");
      console.log(error.message);
    }
  };

  const editNoteHandler = (noteData, type) => {
    if (type && type === "see-more") {
      setNoteHandler(type);
      setEditNoteData(noteData);
    } else {
      setNoteHandler("edit");
      setEditNoteData(noteData);
    }
  };

  const notesPerPage = 10;
  const totalNotes = notesList.length;
  const totalPages = Math.ceil(totalNotes / notesPerPage);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const buttonColor = (noteType) => {
    return noteType === "Important"
      ? "#fbc02d"
      : noteType === "Work"
      ? "#9c27b0"
      : noteType === "Study"
      ? "#673ab7"
      : noteType === "Personal"
      ? "#e53935"
      : noteType === "Random"
      ? "primary.main"
      : "";
  };

  const filteredNotes = notesList.filter(
    (note) =>
      note.noteTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (typeFilter.toLowerCase() === "all" ||
        note.noteType.toLowerCase() === typeFilter.toLowerCase())
  );

  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  const paginatedNotes = filteredNotes.slice(startIndex, endIndex);

  const formatDate = paginatedNotes.map((note) => {
    const timestamp = note.createdAt;
    const date = new Date(
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
    );
    const dateString = date.toLocaleDateString();
    return {
      ...note,
      createdAt: dateString,
    };
  });
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="section">
        <CssBaseline />
        {noteHandler === "see-more" && (
          <NoteHandler
            titleText={"Note Details"}
            noteHandler={noteHandler}
            setNoteHandler={setNoteHandler}
            editNoteData={editNoteData}
            setEditNoteData={setEditNoteData}
            onUpdate={getNotesList}
          />
        )}

        {noteHandler === "edit" ? (
          <NoteHandler
            titleText={"Edit Note"}
            noteHandler={noteHandler}
            setNoteHandler={setNoteHandler}
            editNoteData={editNoteData}
            setEditNoteData={setEditNoteData}
            onUpdate={getNotesList}
          />
        ) : (
          noteHandler !== "see-more" && (
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                maxWidth: "1150px",
              }}
            >
              <Typography sx={{fontWeight: "bold", fontSize: "25px"}}>
                List {notesList.length === 0 ? "" : notesList.length}
              </Typography>

              <Grid container spacing={2}>
                {loadingNotes ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "100%",
                      p: 10,
                    }}
                  >
                    <CircularProgress color="inherit" size={30} />
                  </Box>
                ) : notesList.length === 0 ? (
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "100%",
                      p: 10,
                    }}
                  >
                    Not Found!
                  </Typography>
                ) : (
                  paginatedNotes.map((notes) => (
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
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="p"
                              color="#9e9e9e"
                              sx={{marginBottom: 1}}
                            >
                              Title
                            </Typography>
                            <Chip
                              label={notes.noteType}
                              sx={{
                                backgroundColor: buttonColor(notes.noteType),
                                color: "white",
                              }}
                            />
                          </Box>

                          <Box sx={{wordWrap: "break-word"}}>
                            <Typography>
                              {notes.noteTitle.length > 30
                                ? notes.noteTitle.substring(0, 30) + "..."
                                : notes.noteTitle}
                              {notes.noteTitle.length > 30 && (
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "#1976d2",
                                  }}
                                  onClick={() =>
                                    editNoteHandler(notes, "see-more")
                                  }
                                >
                                  See more
                                </button>
                              )}
                            </Typography>
                          </Box>

                          {/* <Box
                            marginBottom={1}
                            sx={{
                              position: "relative",
                            }}
                          >
                            <TextField
                              multiline
                              rows={1}
                              fullWidth
                              value={notes.noteTitle}
                              variant="standard"
                              InputProps={{
                                readOnly: true,
                                disableUnderline: true,
                              }}
                              inputProps={{
                                style: {
                                  display: "-webkit-box",
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: "vertical",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                },
                              }}
                            />
                          </Box> */}

                          <Divider style={{width: "auto", marginBottom: 10}} />

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
                              sx={{marginBottom: 1}}
                            >
                              Description
                            </Typography>
                            <Box sx={{wordWrap: "break-word", height: 110}}>
                              <Typography>
                                {notes.noteDescription.length > 220
                                  ? notes.noteDescription.substring(0, 150) +
                                    "..."
                                  : notes.noteDescription}
                                {notes.noteDescription.length > 220 && (
                                  <button
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: "#1976d2",
                                    }}
                                    onClick={() =>
                                      editNoteHandler(notes, "see-more")
                                    }
                                  >
                                    See more
                                  </button>
                                )}
                              </Typography>
                            </Box>

                            {/* <Box
                              marginBottom={1}
                              sx={{
                                position: "relative",
                              }}
                            >
                              <TextField
                                multiline
                                rows={4}
                                fullWidth
                                value={notes.noteDescription}
                                variant="standard"
                                InputProps={{
                                  readOnly: true,
                                  disableUnderline: true,
                                }}
                                inputProps={{
                                  style: {
                                    display: "-webkit-box",
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: "vertical",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                  },
                                }}
                              />
                              {notes.noteDescription.length > 180 && (
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "#1976d2",
                                  }}
                                  onClick={() =>
                                    editNoteHandler(notes, "see-more")
                                  }
                                  InputProps={{
                                    readOnly: true,
                                    disableUnderline: true,
                                    onFocus: () => setDescriptionFocused(false),
                                    onBlur: () => setDescriptionFocused(false),
                                  }}
                                  inputProps={{
                                    style: {
                                      display: "-webkit-box",
                                      WebkitLineClamp: 4,
                                      WebkitBoxOrient: "vertical",
                                      textOverflow: "ellipsis",
                                      overflow: "hidden",
                                      cursor:
                                        notes.noteDescription.split("\n")
                                          .length > 4
                                          ? "pointer"
                                          : "auto",
                                    },
                                  }}
                                />
                                {notes.noteDescription.length > 180 && (
                                  <button
                                    style={{
                                      background: "none",
                                      border: "none",
                                      color: "#1976d2",
                                    }}
                                    onClick={() =>
                                      editNoteHandler(notes, "see-more")
                                    }
                                  >
                                    See more
                                  </button>
                                )}
                              </Tooltip>
                            </Box> */}

                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Box sx={{display: "flex", gap: 1}}>
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#81c784",
                                    "&:hover": {
                                      backgroundColor: "#4caf50",
                                    },
                                  }}
                                  onClick={() => editNoteHandler(notes)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  onClick={() => deleteHandler(notes.id)}
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#ef9a9a",
                                    "&:hover": {
                                      backgroundColor: "#c62828",
                                    },
                                  }}
                                  disabled={notes.deleting}
                                >
                                  {notes.deleting ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={25}
                                    />
                                  ) : (
                                    "Delete"
                                  )}
                                </Button>
                              </Box>
                              <Box sx={{marginLeft: "auto"}}>
                                <Typography key={notes.id} color="#9e9e9e">
                                  {
                                    formatDate.find(
                                      (date) => date.id === notes.id
                                    )?.createdAt
                                  }
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))
                )}
              </Grid>
              {filteredNotes.length < 11 || (
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
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChangePage}
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
              )}
            </Box>
          )
        )}
      </Container>
    </ThemeProvider>
  );
};
export default AllNotesList;
