import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from 'react';
import { Button, Form, Modal, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import './LandingPage.css';
import logo from '../../assets/logo.png';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminname, setAdminname] = useState('');
  const [loginError, setLoginError] = useState(false);
  const base_url = import.meta.env.VITE_APP_BACKEND_URL;

  const cookieValue = Cookies.get('token');

  


  useEffect(() => {
    if (cookieValue) {
        const decodedToken = jwtDecode(cookieValue);
        userId = decodedToken.id;
        const name = decodedToken.name;
        console.log(userId, name);
    } else {
        console.log("No token found");
    }
}, [cookieValue]);

  const handleUserLogin = async () => {
    try {
      const res = await axios.post(`${base_url}/api/user/login`, {
        email: username,
        password: password
      });
      if (res.data.Status === "Success") {
        navigate("/projectsUser");
      } else {
        alert("Login Failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSettingNavigate =  () => {
    console.log("ooooooooooo")
    if (cookieValue) {
        navigate('/accountuser');
    } else {
      message.error("Please login to access account settings!");
    }
  };

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(`${base_url}/api/admin/login`, {
        userName: adminname,
        password: password
      });
      if (res.data.Status === "Success") {
        navigate("/projects");
      } else {
        alert("Login Failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAdmin = async () => {
    try {
      const res = await axios.post(`${base_url}/api/admin/create`, {
        email: adminname,
        password: password
      });
      if (res.data.Status === "Success") {
        message.success("Admin account created successfully!");
        setShowCreateAdmin(false);
      } else {
        message.error("Failed to create admin account!");
      }
    } catch (error) {
      console.log(error);
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
            <Nav.Link onClick={() => handleSettingNavigate()}>My Account</Nav.Link>
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
          <p className="landing-subtitle">ලක්පවුර සංවිධානය</p>
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
                <Button variant="link" style={{color:"#c19a6b"}} onClick={() => navigate("/forgot-password")}>Forgot password?</Button>
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
            </Form.Group>
            <Form.Group controlId="formAdminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <div className="text-center">
              <Button variant="dark" onClick={handleAdminLogin}>
                Login
              </Button>
              <p>
                <Button variant="link" style={{color:"white"}} onClick={() => navigate("/forgot-password-admin")}>Forgot password?</Button>
              </p>
              <p>
                <Button variant="link" style={{color:"#c19a6b"}} onClick={() => navigate("/addfirstadmin")}>Create First Admin</Button>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Creating First Admin */}
      <Modal show={showCreateAdmin} onHide={() => setShowCreateAdmin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCreateAdminEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={adminname} onChange={e => setAdminname(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formCreateAdminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <div className="text-center">
              <Button variant="dark" onClick={handleCreateAdmin}>
                Create Admin
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LandingPage;
