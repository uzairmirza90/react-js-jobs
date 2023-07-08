import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Menu,
  MenuItem,
  TextField,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { toast } from "react-toastify";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase-config";
import { serverTimestamp } from "firebase/firestore";

const NoteHandler = ({
  titleText,
  noteHandler,
  setNoteHandler,
  editNoteData,
}) => {
  const maxWidth750 = useMediaQuery("(max-width:750px)");
  const maxWidth715 = useMediaQuery("(max-width:715px)");
  const maxWidth700 = useMediaQuery("(max-width:700px)");
  const maxWidth685 = useMediaQuery("(max-width:685px)");
  const maxWidth650 = useMediaQuery("(max-width:650px)");
  const maxWidth625 = useMediaQuery("(max-width:625px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState(editNoteData?.noteTitle || "");
  const [description, setDescription] = useState(
    editNoteData?.noteDescription || ""
  );
  const [noteSubmissionLoading, setNoteSubmissionLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    editNoteData?.noteType || "Random"
  );

  const titleRef = useRef();

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

  const menuItemHandler = async (event) => {
    const selectedItem = event.target.textContent;
    setSelectedItem(selectedItem);

    handleClose();
  };
  const buttonColor =
    selectedItem === "Important"
      ? "#fbc02d"
      : selectedItem === "Work"
      ? "#9c27b0"
      : selectedItem === "Study"
      ? "#673ab7"
      : selectedItem === "Personal"
      ? "#e53935"
      : selectedItem === "Random"
      ? "primary.main"
      : "";

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNoteSubmissionLoading(true);
    if (editNoteData) {
      try {
        await updateDoc(doc(db, "notes", editNoteData.id), {
          noteTitle: title,
          noteDescription: description,
          noteType: selectedItem,
          createdAt: serverTimestamp(),
        })
          .then(() => {
            setNoteSubmissionLoading(false);
            toast("Note Updated Successfully");
            setNoteHandler("");
            console.log("update doc handler");
          })
          .catch((error) => {
            console.log("Something went wrong");
            toast("Something went wrong!");
          });
      } catch (error) {
        setNoteSubmissionLoading(false);
        console.log("error");
      }
    } else {
      try {
        await addDoc(collection(db, "notes"), {
          noteTitle: title,
          noteDescription: description,
          noteType: selectedItem,
          createdAt: serverTimestamp(),
        })
          .then(() => {
            toast("Note submitted successfully!");
            setNoteSubmissionLoading(false);
            setTitle("");
            setDescription("");
            console.log("addd doc handler");
          })
          .catch((error) => {
            setNoteSubmissionLoading(false);
            toast("Something went wrong!");
          });
      } catch (error) {
        setNoteSubmissionLoading(false);
        console.log(error);
      }
    }
  };

  return (
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
            <Typography sx={{ fontSize: "25px" }}>{titleText}</Typography>

            <>
              <Button
                variant="contained"
                color={"primary"}
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
                sx={{
                  width: "auto",
                  fontSize: { xs: "10px", sm: "13px" },
                  backgroundColor: buttonColor,
                  "&:hover": {
                    backgroundColor: buttonColor,
                  },
                }}
              >
                {selectedItem}
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={menuItemHandler}>Important</MenuItem>
                <MenuItem onClick={menuItemHandler}>Work</MenuItem>
                <MenuItem onClick={menuItemHandler}>Study</MenuItem>
                <MenuItem onClick={menuItemHandler}>Personal</MenuItem>
                <MenuItem onClick={menuItemHandler}>Random</MenuItem>
              </Menu>
            </>
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="p" sx={{ marginBottom: 1 }}>
                  Title*
                </Typography>
                <TextField
                  required
                  onChange={titleHandler}
                  value={title}
                  inputRef={titleRef}
                  variant="outlined"
                  id="title-field"
                  size="small"
                  InputProps={{
                    sx: {
                      backgroundColor: "#f8f8ff",
                      fontSize: "20px",
                    },
                    inputProps: {
                      maxLength: 88,
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="p" sx={{ marginBottom: 1 }}>
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
              <Box sx={{ display: "flex", flexDirection: "row", mt: 4 }}>
                {noteHandler === "add" && (
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
                )}

                {noteHandler === "edit" && (
                  <Button
                    onClick={() => {
                      setNoteHandler("");
                    }}
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
                    Cancel
                  </Button>
                )}

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
                  ) : noteHandler === "edit" ? (
                    "Update"
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
  );
};

export default NoteHandler;
