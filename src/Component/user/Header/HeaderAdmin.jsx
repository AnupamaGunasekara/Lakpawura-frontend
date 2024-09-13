import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/logo.png'

export default function HeaderAdmin() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar className="navigation-bar" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                        <Nav.Link onClick={() => navigate("/projects")}>Projects</Nav.Link>
                        <Nav.Link onClick={() => navigate("/account")}>My Account</Nav.Link>
                        
                    </Nav>
                    <div className="brand-container">
                        <img className='logo-png' src={logo} alt="Logo" />
                        <h4 className='name'>Lakpawura</h4>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
