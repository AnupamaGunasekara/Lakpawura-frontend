import { FacebookOutlined, GlobalOutlined, InstagramOutlined, PhoneOutlined, TwitterOutlined } from '@ant-design/icons';
import axios from 'axios'; // Import Axios
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {message as antdMessage } from 'antd';
import contactImg from '../../../assets/contact-img.svg';
import './Contact.css';

const Contact = () => {
    const base_url = import.meta.env.VITE_APP_BACKEND_URL;
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    };

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText('Sending...'); // Update button text to indicate loading state

        try {
            console.log(formDetails)
            const response = await axios.post(`${base_url}/api/user/contactUs`, formDetails);
            console.log(response.data);
            setStatus({ success: true, message: 'Message sent successfully!' });
            antdMessage.success("Message sent successfully!");
        } catch (error) {
            console.error('Sending message failed: ', error);
            setStatus({ success: false, message: 'Failed to send message.' });
            antdMessage.error("Message sent unsuccessfull!");
        } finally {
            setButtonText('Send'); // Reset button text
            setFormDetails(formInitialDetails);
        }
    };

    return (
        <>
            <section className="contact" id="contact">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <img src={contactImg} alt="Contact Us" />
                        </Col>
                        <Col md={6}>
                            <header>
                                <h2>Get In Touch</h2>
                            </header>
                            <form onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm={6} className="px-1">
                                        <input 
                                            type="text" 
                                            value={formDetails.firstName} 
                                            placeholder="First Name" 
                                            onChange={(e) => onFormUpdate('firstName', e.target.value)} 
                                        />
                                    </Col>
                                    <Col sm={6} className="px-1">
                                        <input 
                                            type="text" 
                                            value={formDetails.lastName} 
                                            placeholder="Last Name" 
                                            onChange={(e) => onFormUpdate('lastName', e.target.value)} 
                                        />
                                    </Col>
                                    <Col sm={6} className="px-1">
                                        <input 
                                            type="email" 
                                            value={formDetails.email} 
                                            placeholder="Email Address" 
                                            onChange={(e) => onFormUpdate('email', e.target.value)} 
                                        />
                                    </Col>
                                    <Col sm={6} className="px-1">
                                        <input 
                                            type="tel" 
                                            value={formDetails.phone} 
                                            placeholder="Phone No." 
                                            onChange={(e) => onFormUpdate('phone', e.target.value)} 
                                        />
                                    </Col>
                                    <Col>
                                        <textarea 
                                            rows="6" 
                                            value={formDetails.message} 
                                            placeholder="Message" 
                                            onChange={(e) => onFormUpdate('message', e.target.value)} 
                                        ></textarea>
                                        <button type="submit"><span>{buttonText}</span></button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
            <footer className="about-us-footer section">
                <Container>
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
                        <Col span={4}>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <TwitterOutlined style={{ fontSize: '24px', color: '#1DA1F2' }} />
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
                </Container>
            </footer>
        </>
    );
};

export default Contact;
