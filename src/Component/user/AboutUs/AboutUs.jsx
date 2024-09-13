import React from 'react';
import { Button, Row, Col, Card } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import './AboutUs.css';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="about-us">
      <section className="company-overview-section">
        <div className="overlay">
          <header className="about-us-header">
            <img src={logo} alt="Your Logo" className="logo" />
            <h1 className="highlighted">About Us</h1>
          </header>
          <div className="company-info">
            <h2>Our Company</h2>
            <p>
            නායකත්ව හා පෞරුෂත්ව සංවර්ධනය. විවිධ අධ්‍යාපනික වැඩසටහන් සැලසුම් කිරීම, නිර්මාණය කිරීම, ක‍්‍රියාත්මක කිරීම හා අගැයීම. ක‍්‍රීඩා ක්‍ෂේත‍්‍රය සංවර්ධනය කිරීම හා අගැයීම. ස්වාභාවික අනතුරු හෝ වසංගත රෝගවලින් විපතට/බලපෑමට ලක්වන ශ‍්‍රී ලාංකික මානව ප‍්‍රජාව අරබයා සහන වැඩසටහන්/මෙහෙයුම් ක‍්‍රියාත්මක කිරීම. සාම්ප‍්‍රදායික දේශීය කර්මාන්ත යළි නඟා සිටුවීම. නගරය කේන්ද්‍ර කර ගත් වෙළඳපොළ ක‍්‍රමයට සමගාමීව ග‍්‍ර‍්‍රාමීය වෙළඳපොළ ක‍්‍රමය තුළින් නව රැකියා උත්පාදනය. සෞඛ්‍ය, ආහාර හා පෝෂණ වැඩසටහන් කි‍්‍රියාත්මක කිරීම. විශේෂ අවශ්‍යතා සහිත වැඩිහිටි පුරවැසියන්, කාන්තාවන් හා ළමුන් වෙනුවෙන් විවිධ සමාජ සේවා වැඩසටහන් ක‍්‍රියාත්මක කිරීම. තරුණ, වැඩිහිටි, කාන්තා හා ළමා යන සමාජ කණ්ඩායම්හි කාලීන ගැටලූ හා අවශ්‍යතා හඳුනාගෙන ඒ සඳහා වන විවිධ වැඩසටහන් හා ව්‍යාපෘති කි‍්‍රියාත්මක කිරීම හා අගැයීම. සමාජ විරෝධී ක‍්‍රියා තුළින් ළමා හා තරුණ පරපුර මුදවා ගැනීමේ වැඩසටහන් හඳුනා ගැනීම, සැලසුම් කිරීම, කි‍්‍රියාත්මක කිරීම, අගැයීම හා ඒ සඳහා වූූ රාජ්‍ය යාන්ත‍්‍රණයට සහාය වීම. මූූලික මානව අයිතීන් පිළිබඳ ශ‍්‍රී ලාංකික මානව ප‍්‍රජාව දැනුවත් කිරීම. අල්ලස් හෝ දූෂණ ක‍්‍රියා අවම කිරීම සඳහා වන සමාජ දැනුවත් කිරීමේ වැඩසටහන් පැවැත්වීම හා ඒ සඳහා වූ රාජ්‍ය යාන්ත‍්‍රණයට සහාය වීම. ජාතීන් අතර සංහිඳියාව හා ශ‍්‍රී ලාංකික ජාතිකත්වය වර්ධනය වන විවිධ සංස්කෘතික වැඩසටහන් හඳුනා ගැනීම, සැලසුම් කිරීම, කි‍්‍රියාත්මක කිරීම හා අගැයීම. නව සොයා ගැනීම් හෝ නව නිපැයුම් වෙනුවෙන් තරුණ ව්‍යවසායකයින් දිරි ගැන්වීම. 
 
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
              cover={<img alt="John Doe" src="https://images.pexels.com/photos/926390/pexels-photo-926390.jpeg" />}
            >
              <Card.Meta title="John Doe" description="CEO & Founder" />
              <p>John is the visionary behind LAKPAWRA with over 20 years of experience in the industry.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Jane Smith" src="https://images.pexels.com/photos/3307862/pexels-photo-3307862.jpeg" />}
            >
              <Card.Meta title="Jane Smith" description="Chief Operating Officer" />
              <p>Jane oversees all operations, ensuring everything runs smoothly and efficiently.</p>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="services section">
        <h2>Our Services</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Service 1" src="https://images.pexels.com/photos/135020/pexels-photo-135020.jpeg" />}
            >
              <Card.Meta title="නායකත්ව හා පෞරුෂත්ව සංවර්ධනය." description="Lorem ipsum dolor sit amet." />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Service 2" src="https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg" />}
            >
              <Card.Meta title="ආර්ථික වර්ධනය හා සංවර්ධනය" description="Lorem ipsum dolor sit amet." />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Service 3" src="https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg" />}
            >
              <Card.Meta title="සමාජ, සංස්කෘතික හා අධ්‍යාත්මික සංවර්ධනය." description="Lorem ipsum dolor sit amet." />
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
          <Col span={12} xs={24} sm={12} md={6}>
            <PhoneOutlined style={{ marginRight: '10px' }} />
            +1 (123) 456-7890
          </Col>
          <Col span={12} xs={24} sm={12} md={6}>
            <GlobalOutlined style={{ marginRight: '10px' }} />
            www.lakpawra.com
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Button type="primary" size="large" onClick={() => navigate("/contact")}>Contact Us</Button>
        </Row>
      </footer>
    </div>
  );
};

export default AboutUs;