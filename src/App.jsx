


import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/User Pages/LandingPage.jsx";
import ProjectsPage from "./Pages/User Pages/ProjectsPage.jsx";
import SignupPage from "./Pages/User Pages/SignupPage.jsx";
import AboutUsPage from "./Pages/User Pages/AboutUsPage.jsx";
import ContactPage from "./Pages/User Pages/ContactPage.jsx";
import "./index.css";
import UserProjectsPage from "./Pages/User Pages/UserProjectsPage.jsx";
import AdminAccountpage from "./Pages/User Pages/AdminAccountpage.jsx";
import AdminMessagesPage from "./Pages/User Pages/AdminMessagesPage.jsx";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/projects" element={<ProjectsPage/>}></Route>
      <Route path="/about" element={<AboutUsPage/>}></Route>
      <Route path="/contact" element={<ContactPage/>}></Route>
      <Route path="/projectsUser" element={<UserProjectsPage/>}></Route>
      <Route path="/account" element={<AdminAccountpage/>}></Route>
      <Route path="/messages" element={<AdminMessagesPage/>}></Route>


        
      </Routes>
    </BrowserRouter>
  )
}

export default App
