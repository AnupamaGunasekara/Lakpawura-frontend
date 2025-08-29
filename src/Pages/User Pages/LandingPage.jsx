import React from "react";
import AboutUs from "../../Component/user/AboutUs/AboutUs";
import { Form, Modal, Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/logo.png";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Card } from "antd";
import ProjectCard from "../../Component/user/Projects/ProjectCard";
import Footer from "../../Component/user/Footer/Footer";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <style>
        {`
   .team-members .ant-row {
  justify-content: center;
}
 
/* This rule centers the last card when it is alone in a row */
@media (max-width: 991px) { /* Applies to md and sm breakpoints */
  .ant-row > .ant-col:last-of-type:nth-child(odd) {
    margin-left: auto;
    margin-right: auto;
  }
}
      `}
      </style>
      <Navbar className="navigation-bar" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>About Us</Nav.Link>
            <Nav.Link onClick={() => navigate("/projectsUser")}>
              Projects
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")}>Contact</Nav.Link>
            <Nav.Link onClick={() => handleSettingNavigate()}>
              My Account
            </Nav.Link>
            <div className="brand-container">
              <img className="logo-png" src={logo} alt="Logo" />
              <h4 className="name">Lakpawura</h4>
            </div>
          </Nav>
        </Navbar.Collapse>
        <div
          className="signup-button"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            className="btn text-black"
            style={{
              fontSize: "18px",
              padding: "10px 24px",
              lineHeight: "1.5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(220, 173, 124)",
              border: "none", // optional: removes Bootstrap's default border
              color: "#fff", // optional: ensures text is readable on the new background
            }}
            onClick={() => navigate("/signin")}
          >
            Login
          </Button>
        </div>
      </Navbar>
      <div className="text-section text-center mt-5">
        <header className="about-us-header">
          <img src={logo} alt="Your Logo" className="logo" />
        </header>
        <h1 className="landing-title">Welcome to Lakpawura</h1>
        <p className="landing-subtitle fs-3">ලක්පවුර සංවිධානය</p>
      </div>
      <div>
        <div className="about-us">
          <div>
            <ProjectCard />
          </div>

          <section className="company-overview-section mt-5">
            <div className="overlay">
              <header className="about-us-header">
                {/* <img src={logo} alt="Your Logo" className="logo" /> */}
                <h1 className="highlighted">
                  <span class="word-about">About</span>
                  <span class="word-us"> Us</span>
                </h1>
              </header>
              <div className="company-info">
                <h2>Our Company</h2>
                <p>
                  නායකත්ව හා පෞරුෂත්ව සංවර්ධනය. විවිධ අධ්‍යාපනික වැඩසටහන්
                  සැලසුම් කිරීම, නිර්මාණය කිරීම, ක‍්‍රියාත්මක කිරීම හා අගැයීම.
                  ක‍්‍රීඩා ක්‍ෂේත‍්‍රය සංවර්ධනය කිරීම හා අගැයීම. ස්වාභාවික
                  අනතුරු හෝ වසංගත රෝගවලින් විපතට/බලපෑමට ලක්වන ශ‍්‍රී ලාංකික මානව
                  ප‍්‍රජාව අරබයා සහන වැඩසටහන්/මෙහෙයුම් ක‍්‍රියාත්මක කිරීම.
                  සාම්ප‍්‍රදායික දේශීය කර්මාන්ත යළි නඟා සිටුවීම. නගරය කේන්ද්‍ර
                  කර ගත් වෙළඳපොළ ක‍්‍රමයට සමගාමීව ග‍්‍ර‍්‍රාමීය වෙළඳපොළ ක‍්‍රමය
                  තුළින් නව රැකියා උත්පාදනය. සෞඛ්‍ය, ආහාර හා පෝෂණ වැඩසටහන්
                  කි‍්‍රියාත්මක කිරීම. විශේෂ අවශ්‍යතා සහිත වැඩිහිටි පුරවැසියන්,
                  කාන්තාවන් හා ළමුන් වෙනුවෙන් විවිධ සමාජ සේවා වැඩසටහන්
                  ක‍්‍රියාත්මක කිරීම. තරුණ, වැඩිහිටි, කාන්තා හා ළමා යන සමාජ
                  කණ්ඩායම්හි කාලීන ගැටලූ හා අවශ්‍යතා හඳුනාගෙන ඒ සඳහා වන විවිධ
                  වැඩසටහන් හා ව්‍යාපෘති කි‍්‍රියාත්මක කිරීම හා අගැයීම. සමාජ
                  විරෝධී ක‍්‍රියා තුළින් ළමා හා තරුණ පරපුර මුදවා ගැනීමේ වැඩසටහන්
                  හඳුනා ගැනීම, සැලසුම් කිරීම, කි‍්‍රියාත්මක කිරීම, අගැයීම හා ඒ
                  සඳහා වූූ රාජ්‍ය යාන්ත‍්‍රණයට සහාය වීම. මූූලික මානව අයිතීන්
                  පිළිබඳ ශ‍්‍රී ලාංකික මානව ප‍්‍රජාව දැනුවත් කිරීම. අල්ලස් හෝ
                  දූෂණ ක‍්‍රියා අවම කිරීම සඳහා වන සමාජ දැනුවත් කිරීමේ වැඩසටහන්
                  පැවැත්වීම හා ඒ සඳහා වූ රාජ්‍ය යාන්ත‍්‍රණයට සහාය වීම. ජාතීන්
                  අතර සංහිඳියාව හා ශ‍්‍රී ලාංකික ජාතිකත්වය වර්ධනය වන විවිධ
                  සංස්කෘතික වැඩසටහන් හඳුනා ගැනීම, සැලසුම් කිරීම, කි‍්‍රියාත්මක
                  කිරීම හා අගැයීම. නව සොයා ගැනීම් හෝ නව නිපැයුම් වෙනුවෙන් තරුණ
                  ව්‍යවසායකයින් දිරි ගැන්වීම.
                </p>
              </div>
            </div>
          </section>
          <section className="team-members section">
            <h2>Meet Our Team</h2>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="W.A.S. THILAKARATHNE"
                      src="/images/person-1.jpg"
                    />
                  }
                >
                  <Card.Meta
                    title="W.A.S. THILAKARATHNE"
                    description="President"
                  />
                  <p>  thilakarathnawas@gmail.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img alt="G. DISSANAYAKE" src="/images/person-2.jpg" />
                  }
                >
                  <Card.Meta title="G. DISSANAYAKE" description="Secretary" />
                  <p>dissadissa1955/@ gmail.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={<img alt="S. UDAYANGA" src="/images/person-3.jpg" />}
                >
                  <Card.Meta title="S. UDAYANGA" description="Treasurer" />
                  <p>sudayanga2000@gmail.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="T.A.C. DESHAPRIYA
            SAMPATH"
                      src="/images/person-4.jpg"
                    />
                  }
                >
                  <Card.Meta
                    title="T.A.C. DESHAPRIYA
            SAMPATH"
                    description="Chief Organizer"
                  />
                  <p>chanaka@chanuwta.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="P.G.M.N.
            WICKRAMATHILAKA"
                      src="/images/person-5.jpg"
                    />
                  }
                >
                  <Card.Meta
                    title="P.G.M.N.
            WICKRAMATHILAKA"
                    description="Vice President"
                  />
                  <p>nishantha600k@gmail.com </p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img alt="K.I. DARSHANEE" src="/images/person-6.jpg" />
                  }
                >
                  <Card.Meta
                    title="K.I. DARSHANEE"
                    description="Vice Secretary"
                  />
                  <p>darshaniiresha@.gmail.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img alt="E.K.S. EDIRISINGHE" src="/images/person-7.jpg" />
                  }
                >
                  <Card.Meta
                    title="E.K.S. EDIRISINGHE"
                    description="Vice Treasurer"
                  />
                  <p>11shvama73@gmail.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="SARATH
            KAHADAADRACHCHI"
                      src="/images/person-8.jpg"
                    />
                  }
                >
                  <Card.Meta
                    title="SARATH
            KAHADAADRACHCHI"
                    description="Organizer"
                  />
                  <p>sarath@rodrigoenterprises.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img alt="B.M.P. BASNAYAKA" src="/images/person-9.jpg" />
                  }
                >
                  <Card.Meta title="B.M.P. BASNAYAKA" description="Organizer" />
                  <p>bmpbasnayaka1970@gmail.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="S.A.C.K DHAMAYANTHI"
                      src="/images/person-10.jpg"
                    />
                  }
                >
                  <Card.Meta
                    title="S.A.C.K DHAMAYANTHI"
                    description="Orgunizer"
                  />
                  <p>Lakpawura@gmail.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img alt="K.L. GUNARATHNE" src="/images/person-11.jpg" />
                  }
                >
                  <Card.Meta title="K.L. GUNARATHNE" description="Orgunizer" />
                  <p>npdfg@yahoo.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img alt="S.A.C. SENADEERA" src="/images/person-12.jpg" />
                  }
                >
                  <Card.Meta title="S.A.C. SENADEERA" description="Orgunizer" />
                  <p>chandsenadeera@gmail.com</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="B.M. SALIYA SRIYANTHA"
                      src="/images/person-13.jpg"
                    />
                  }
                >
                  <Card.Meta
                    title="B.M. SALIYA SRIYANTHA"
                    description="E Member"
                  />
                  <p>saliyasriyantha92@gmail.com</p>
                </Card>
              </Col>
            </Row>
          </section>

          {/* <section className="services section">
            <h2>Our Services</h2>
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="Service 1"
                      src="https://images.pexels.com/photos/135020/pexels-photo-135020.jpeg"
                    />
                  }
                >
                  <Card.Meta
                    title="නායකත්ව හා පෞරුෂත්ව සංවර්ධනය."
                    description="Lorem ipsum dolor sit amet."
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="Service 2"
                      src="https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg"
                    />
                  }
                >
                  <Card.Meta
                    title="ආර්ථික වර්ධනය හා සංවර්ධනය"
                    description="Lorem ipsum dolor sit amet."
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="Service 3"
                      src="https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg"
                    />
                  }
                >
                  <Card.Meta
                    title="සමාජ, සංස්කෘතික හා අධ්‍යාත්මික සංවර්ධනය."
                    description="Lorem ipsum dolor sit amet."
                  />
                </Card>
              </Col>
            </Row>
          </section> */}

          {/* <footer className="about-us-footer section">
            <Row gutter={16} justify="center">
              <Col span={4}>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookOutlined
                    style={{ fontSize: "24px", color: "#3b5998" }}
                  />
                </a>
              </Col>
              <Col span={4}>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterOutlined
                    style={{ fontSize: "24px", color: "#1DA1F2" }}
                  />
                </a>
              </Col>
              <Col span={4}>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramOutlined
                    style={{ fontSize: "24px", color: "#E1306C" }}
                  />
                </a>
              </Col>
            </Row>
            <Row gutter={16} justify="center" style={{ marginTop: "20px" }}>
              <Col span={12} xs={24} sm={12} md={6}>
                <PhoneOutlined style={{ marginRight: "10px" }} />
                +1 (123) 456-7890
              </Col>
              <Col span={12} xs={24} sm={12} md={6}>
                <GlobalOutlined style={{ marginRight: "10px" }} />
                www.lakpawra.com
              </Col>
            </Row>
            <Row justify="center" style={{ marginTop: "20px" }}>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Button>
            </Row>
          </footer> */}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LandingPage;
