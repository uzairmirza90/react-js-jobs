import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import Layout from "../Layout/Layout";
import { db } from "../../Firebase-config";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import BarChart from "./BarChart";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#f8f8ff",
    },
  },
});
const StatsData = function () {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [notesList, setNotesList] = useState([]);

  const [noteTypeCounts, setNoteTypeCounts] = useState({});
  const [loadingNotes, setLoadingNotes] = useState(true);

  const getNotesList = async () => {
    try {
      const notes = query(collection(db, "notes"));
      const data = await getDocs(notes);
      const notesArray = data.docs.map((note) => ({
        ...note.data(),
        id: note.id,
      }));
      setNotesList(notesArray);
      setLoadingNotes(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getNotesList();
  }, []);

  useEffect(() => {
    const counts = {};
    notesList.forEach((note) => {
      counts[note.noteType] = (counts[note.noteType] || 0) + 1;
    });
    setNoteTypeCounts(counts);
  }, [notesList]);

  const typeColors = {
    Random: "#1976d2",
    Study: "#673ab7",
    Work: "#9c27b0",
    Personal: "#e53935",
    Important: "#fbc02d",
  };

  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Container component="section">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              maxWidth: "1150px",
            }}
          >
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
                Object.entries(noteTypeCounts).map(([type, count]) => (
                  <Grid
                    item
                    xs={12}
                    sm={isMobileSize ? 12 : 6}
                    md={6}
                    lg={(() => {
                      switch (Object.keys(noteTypeCounts).length) {
                        case 1:
                          return 12;
                        case 2:
                          return 6;
                        case 3:
                          return 4;
                        case 4:
                          return 3;
                        case 5:
                          return 2.4;
                        default:
                          return "";
                      }
                    })()}
                  >
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
                        borderBottom: `5px solid ${typeColors[type]}`,
                        width:
                          Object.keys(noteTypeCounts).length === 1
                            ? "50%"
                            : "auto",
                        margin:
                          Object.keys(noteTypeCounts).length === 1
                            ? "0 auto"
                            : "",
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
                          variant="h3"
                          sx={{ marginBottom: 5, color: typeColors[type] }}
                        >
                          {count}
                        </Typography>
                        <Typography variant="h5" sx={{ marginBottom: 1 }}>
                          {type}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))
              )}
            </Grid>
            <Box>
              <BarChart notesList={notesList} />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default StatsData;
