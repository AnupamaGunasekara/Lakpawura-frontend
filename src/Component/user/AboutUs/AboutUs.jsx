import React from 'react';
import { Button, Row, Col, Card } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import './AboutUs.css';
import logo from '../../../assets/logo.png';
import background from '../../../assets/banner-bg.png';

const AboutUs = () => {
  return (
    <div className="about-us">
     <section className="company-overview-section" >
      <div className="overlay">
        <header className="about-us-header">
          <img src={logo} alt="Your Logo" className="logo" />
          <h1 className="highlighted">About Us</h1>
        </header>
        <div className="company-info">
          <h2>Our Company</h2>
          <p>
            Welcome to LAKPAWRA, where we specialize in providing exceptional services.
            Our mission is to deliver top-quality products and services to our clients.
            We pride ourselves on our commitment to excellence and customer satisfaction.
          </p>
        </div>
      </div>
     </section>
      
      <section className="team-members section">
        <h2>Meet Our Team</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="John Doe" src="https://images.pexels.com/photos/926390/pexels-photo-926390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />}
            >
              <Card.Meta title="John Doe" description="CEO & Founder" />
              <p>John is the visionary behind LAKPAWRA with over 20 years of experience in the industry.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Jane Smith" src="https://images.pexels.com/photos/3307862/pexels-photo-3307862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />}
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
              cover={<img alt="Service 1" src="https://images.pexels.com/photos/135020/pexels-photo-135020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />}
            >
              <Card.Meta title="Website & SEO" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Service 2" src="https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1://images.pexels.com/photos/13392275/pexels-photo-13392275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />}
            >
              <Card.Meta title="UI/UX" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Service 3" src="https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />}
            >
              <Card.Meta title="Logo Design" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </Card>
          </Col>
        </Row>
      </section>

      <footer className="about-us-footer section">
        <Row gutter={16} justify="center">
          <Col span={4}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={{ fontSize: '24px', color: '#3b5998' }} />
            </a>
          </Col>
          <Col span={4}>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: '24px', color: '#1DA1F2' }} />
            </a>
          </Col>
          <Col span={4}>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ fontSize: '24px', color: '#E1306C' }} />
            </a>
          </Col>
        </Row>
        <Row gutter={16} justify="center" style={{ marginTop: '20px' }}>
          <Col span={6}>
            <PhoneOutlined style={{ marginRight: '10px' }} />
            +1 (123) 456-7890
          </Col>
          <Col span={6}>
            <GlobalOutlined style={{ marginRight: '10px' }} />
            www.lakpawra.com
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Button type="primary" size="large">Contact Us</Button>
        </Row>
      </footer>
    </div>
  );
};

export default AboutUs;
