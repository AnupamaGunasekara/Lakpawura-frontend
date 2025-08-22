import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import logo from "../../../assets/logo.png"; // Adjust path to your logo
import "./Footer.css"; // We will use this for custom styling

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        {/* --- UPDATE: Added 'gx-5' class to increase horizontal spacing --- */}
        <Row className="justify-content-between gx-5">
          {/* Column 1: Brand Info */}
          <Col xs={12} md={4} className="footer-col text-center">
            <div className="footer-brand">
              <img src={logo} alt="Lakpawura Logo" className="footer-logo" />
              <h4 className="footer-title">Lakpawura</h4>
              <p className="footer-text">
                Leading community development and cultural preservation in Sri
                Lanka.
              </p>
            </div>
          </Col>

          {/* Column 2: Quick Links */}
          <Col xs={12} md={4} className="footer-col text-center">
            <h4 className="footer-title">Quick Links</h4>
            <Nav className="flex-column footer-links">
              <Nav.Link href="/" className="footer-link">
                Home
              </Nav.Link>
              <Nav.Link href="/about" className="footer-link">
                About Us
              </Nav.Link>
              <Nav.Link href="/projectsUser" className="footer-link">
                Projects
              </Nav.Link>
              <Nav.Link href="/contact" className="footer-link">
                Contact
              </Nav.Link>
            </Nav>
          </Col>

          {/* Column 3: Contact & Social */}
          <Col xs={12} md={4} className="footer-col text-center">
            <h4 className="footer-title">Connect With Us</h4>
            <div className="contact-info">
              <p className="footer-text">
                <i className="bi bi-telephone-fill"></i> +1 (123) 456-7890
              </p>
              <p className="footer-text">
                <i className="bi bi-globe"></i> www.lakpawra.com
              </p>
            </div>
            <h5 className="footer-title mt-4">Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center footer-bottom">
            <p className="footer-text mb-0">
              © {new Date().getFullYear()} Lakpawura. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
