


import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import "./index.css";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
