import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import LandingPage from "./views/LandingPage/landingPage";
import Header from "./components/Dadshboard/Header";
function App() {
  return (
    <Header />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
