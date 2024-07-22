import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Form, Modal, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import logo from '../../assets/logo.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminId, setAdminId] = useState('');
  const [adminname, setAdminname] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleUserLogin = () => {
    if (username === "example@example.com" && password === "password") {
      navigate("/projectsUser");
    } else {
      setLoginError(true);
      alert("Your login details are incorrect.");
    }
  };

  const handleAdminLogin = () => {
    if (adminname === "example@example.com" && adminId === "admin123" && password === "adminpass") {
      navigate("/projects");
    } else {
      setLoginError(true);
      alert("Admin ID or password incorrect.");
    }
  };

  return (
    <div className="landing-page">
      <div className="background-image"></div>
      <Navbar className="navigation-bar" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>About Us</Nav.Link>
            <Nav.Link onClick={() => navigate("/projectsUser")}>Projects</Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")}>Contact</Nav.Link>
            <Nav.Link onClick={() => navigate("/accountUser")}>My Account</Nav.Link>
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
          <Button variant="dark" size="lg" block onClick={() => setShowUserLogin(true)}>
            Login as Registered User
          </Button>
          <Button variant="dark" size="lg" block onClick={() => setShowAdminLogin(true)}>
            Login as Administrator
          </Button>
        </div>
      </div>

      {/* Modal for Registered User Login */}
      <Modal show={showUserLogin} onHide={() => setShowUserLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <div className="text-center">
              <Button variant="dark" onClick={handleUserLogin}>
                Login
              </Button>
              <p className="mt-2">
                Not registered? <span className="signup-link" onClick={() => navigate("/signup")}>Sign up here</span>
              </p>
              <p>
                <Button variant="link" onClick={() => navigate("/forgot-password")}>Forgot password?</Button>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Administrator Login */}
      <Modal show={showAdminLogin} onHide={() => setShowAdminLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAdminId">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={adminname} onChange={e => setAdminname(e.target.value)} />
              <Form.Label>Admin ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Admin ID" value={adminId} onChange={e => setAdminId(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formAdminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <div className="text-center">
              <Button variant="dark" onClick={handleAdminLogin}>
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LandingPage;
