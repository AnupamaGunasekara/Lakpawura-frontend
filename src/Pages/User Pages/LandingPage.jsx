import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';                                                                            
import logo from '../../assets/logo.png'                                                      

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="background-image"></div>
      <Navbar className="navigation-bar" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>About Us</Nav.Link>
            <Nav.Link onClick={() => navigate("/projects")}>Projects</Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")}>Contact</Nav.Link>
            <Nav.Link onClick={() => navigate("/account")}>My Account</Nav.Link>
            <div className="brand-container">
                        <img className='logo-png' src={logo} alt="Logo" />
                        <h4 className='name'>Lakpawura</h4>
            </div>
          </Nav>
        </Navbar.Collapse>
        <div className="signup-button">
          <Button variant="brown" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </Navbar>
      <div className="landing-content">
        <div className="text-section">
          <h1 className="landing-title">Welcome to Lakpawura</h1>
          <p className="landing-subtitle">Your gateway to a world of possibilities.</p>
        </div>
        <div className="button-section">
          <Button variant="dark" size="lg" block onClick={() => navigate("/login-user")}>
            Login as Registered User
          </Button>
          <Button variant="dark" size="lg" block onClick={() => navigate("/login-admin")}>
            Login as Administrator
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
