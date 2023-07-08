import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ notesList }) => {
  const [notesData, setNotesData] = useState({});

  useEffect(() => {
    console.log("notesList:", notesList);

    if (notesList && notesList.length > 0) {
      const notesByMonth = notesList.map((note) => {
        const timestamp = note.createdAt; // Assuming it's in the format { seconds: ..., nanoseconds: ... }
        const date = new Date(timestamp.seconds * 1000); // Convert to JavaScript Date object
        return date.getMonth(); // Get the month (0-11)
      });

      console.log("notesByMonth:", notesByMonth);

      // Step 2: Create an array to store count of notes for each month
      const monthlyCounts = Array(12).fill(0);

      // Step 3: Count notes for each month
      notesByMonth.forEach((month) => {
        monthlyCounts[month] += 1;
      });

      console.log("monthlyCounts:", monthlyCounts);

      const chartData = {
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
            backgroundColor: "rgba(75, 192, 192, 0.6)", // Adjust as needed
            borderColor: "rgba(75, 192, 192, 1)", // Adjust as needed
            borderWidth: 1,
          },
        ],
      };

      console.log("chartData:", chartData);

      setNotesData(chartData);
    }
  }, [notesList]);

  console.log("notesData:", notesData);

  if (!notesList || notesList.length === 0) {
    return null; // Render nothing if notesList is empty
  }

  return <Bar data={notesData} />;
};

export default BarChart;
