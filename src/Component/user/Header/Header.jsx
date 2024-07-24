import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/logo.png'
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';

export default function Header() {
    const navigate = useNavigate();
    const base_url = import.meta.env.VITE_APP_BACKEND_URL;
    const cookieValue = Cookies.get('token');

    useEffect(() => {
        if (cookieValue) {
            const decodedToken = jwtDecode(cookieValue);
            const userId = decodedToken.id;
            const name = decodedToken.name;
            console.log(userId, name);
        } else {
            console.log("No token found");
        }
    }, [cookieValue]);

    return (
        <div>
            <Navbar className="navigation-bar" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                        <Nav.Link onClick={() => navigate("/about")}>About Us</Nav.Link>
                        <Nav.Link onClick={() => navigate("/projectsUser")}>Projects</Nav.Link>
                        <Nav.Link onClick={() => navigate("/contact")}>Contact</Nav.Link>
                        <Nav.Link onClick={() => navigate("/accountUser")}>My Account</Nav.Link>
                        
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
