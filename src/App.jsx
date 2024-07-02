


import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/User Pages/LandingPage.jsx";
import ProjectsPage from "./Pages/User Pages/ProjectsPage.jsx";
import SignupPage from "./Pages/User Pages/SignupPage.jsx";
import "./index.css";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/projects" element={<ProjectsPage/>}></Route>

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
