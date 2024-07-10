import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import contactImg from '../../../assets/contact-img.svg';
import './Contact.css'; // Ensure you have a CSS file to style your component

const Contact = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formDetails);
        // Example status update
        setStatus({ success: true, message: 'Message sent successfully!' });
    };

    return (
        <section className="contact" id="contact">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt="Contact Us" />
                    </Col>
                    <Col md={6}>
                        <h2>Get In Touch</h2>
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
                                {
                                    status.message &&
                                    <Col>
                                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;
