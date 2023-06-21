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
