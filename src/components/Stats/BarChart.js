import "chart.js/auto";
import React, {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";
import {CircularProgress, Box} from "@mui/material";

const BarChart = ({notesList, loadingNotes}) => {
  const [monthlyCounts, setMonthlyCounts] = useState();

  const renderChart = () => {
    if (notesList.length && !loadingNotes) {
      const notesByMonth = notesList.map((note) => {
        const timestamp = note.createdAt;
        const date = new Date(timestamp.seconds * 1000);
        return date.getMonth();
      });

      if (notesByMonth) {
        let counts = Array(12).fill(0);
        notesByMonth?.forEach((month) => {
          counts[month] += 1;
          setMonthlyCounts(counts);
        });
      }
    }
  };

  useEffect(() => {
    renderChart();
  }, [notesList]);

  return (
    <>
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
      ) : (
        <Bar
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: "Notes Created",
                data: monthlyCounts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default BarChart;
