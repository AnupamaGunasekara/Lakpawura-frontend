import React from 'react';
import { Button, Row, Col, Card } from 'antd';
import './AboutUs.css';
import logo from '../../../assets/logo.png'



const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="about-us-header">
        <img src={logo} alt="Your Logo" className="logo" />
        <h1 className="highlighted">About Us</h1>
        
      </header>

      <section className="company-info section">
        <img src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Company" className="section-img" />
        <div className="section-content">
          <h2>Our Company</h2>
          <p>
            Welcome to LAKPAWRA, where we specialize in providing exceptional services. 
            Our mission is to deliver top-quality products and services to our clients. 
            We pride ourselves on our commitment to excellence and customer satisfaction.
          </p>
        </div>
      </section>

      <section className="team-members section">
        <h2>Meet Our Team</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="John Doe" src="https://via.placeholder.com/300x200" />}
            >
              <Card.Meta title="John Doe" description="CEO & Founder" />
              <p>John is the visionary behind LAKPAWRA with over 20 years of experience in the industry.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Jane Smith" src="https://via.placeholder.com/300x200" />}
            >
              <Card.Meta title="Jane Smith" description="Chief Operating Officer" />
              <p>Jane oversees all operations, ensuring everything runs smoothly and efficiently.</p>
            </Card>
          </Col>
          {/* Add more team members as needed */}
        </Row>
      </section>

      <section className="services section">
        <h2>Our Services</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Service 1" src="https://via.placeholder.com/300x200" />}
            >
              <Card.Meta title="Website & SEO" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Service 2" src="https://via.placeholder.com/300x200" />}
            >
              <Card.Meta title="UI/UX" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Service 3" src="https://via.placeholder.com/300x200" />}
            >
              <Card.Meta title="Logo Design" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </Card>
          </Col>
        </Row>
      </section>

      <footer className="about-us-footer section">
        <Button type="primary" size="large">Contact Us</Button>
      </footer>
    </div>
  );
};

export default AboutUs;
