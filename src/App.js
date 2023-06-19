import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import LandingPage from "./views/LandingPage/landingPage";
import StatsData from "../src/components/Stats/statsData";
import AddJob from "../src/components/AddJob/addJob";
import Profile from "../src/components/Profile/profile";
import AllJobs from "../src/components/All-Jobs/all-jobs";
import { useEffect, useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stats" element={<StatsData />} />
        <Route path="/all-jobs" element={<AllJobs />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/add-job" element={<AddJob />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// error={
//   firebaseError &&
//   (firebaseError.includes("auth/email-already-in-use") ||
//     firebaseError.includes("auth/invalid-email"))
// }
// helperText={
//   firebaseError &&
//   firebaseError.includes("auth/email-already-in-use")
//     ? "Email already in use"
//     : firebaseError &&
//       firebaseError.includes("auth/invalid-email")
//     ? "Invalid email"
//     : ""
// }
// error={
//   firebaseError &&
//   (firebaseError.includes(
//     " Password should be at least 6 characters (auth/weak-password)"
//   ) ||
//     firebaseError.includes("auth/missing-password"))
// }
// helperText={
//   firebaseError &&
//   (firebaseError.includes(
//     " Password should be at least 6 characters (auth/weak-password)"
//   )
//     ? "Password should be at least 6 characters"
//     : firebaseError.includes("auth/missing-password")
//     ? "Missing Password"
//     : "")
// }
