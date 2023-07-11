import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import LandingPage from "./views/LandingPage/landingPage";
import StatsData from "../src/components/Stats/statsData";
import AddNote from "./components/AddNote/addNote";
import Profile from "../src/components/Profile/profile";
import AllNotes from "./components/All-notes/all-notes";
import { AppContextProvider } from "./context/context";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/stats" element={<StatsData />} />
          <Route path="/all-notes" element={<AllNotes />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/add-note" element={<AddNote />} />

          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
