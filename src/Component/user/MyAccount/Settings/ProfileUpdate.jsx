import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';

export default function ProfileUpdate() {
    const [form] = Form.useForm();
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (values) => {
        try {

            if (response.ok) {
                setSuccessMessage('Profile updated successfully');
                message.success('Profile updated successfully');
                form.resetFields();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                message.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ backgroundColor: 'black', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid gray' }}>
            <div style={{ backgroundColor: 'gray', borderRadius: '8px', padding: '1rem', border: '1px solid gray', width: '100%', textAlign: 'center' }}>
                <span style={{ fontSize: '24px', color: 'white' }}>Profile</span>
            </div>

            <div style={{ backgroundColor: 'black', height: '80px', padding: '1rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid gray', width: '100%', textAlign: 'center' }}>
                <span style={{ color: 'white' }}>Update your personal information here</span>
            </div>

            <div style={{ backgroundColor: 'black', padding: '1rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid gray', width: '100%' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{ width: '100%' }}
                >
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input placeholder="Full Name" style={{ backgroundColor: 'black', color: 'white', borderBottom: '2px solid gray' }} />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone number"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input placeholder="Phone number" style={{ backgroundColor: 'black', color: 'white', borderBottom: '2px solid gray' }} />
                    </Form.Item>

                    <Form.Item
                        name="companyId"
                        label="Company ID (Ex. 467231258AD)"
                        rules={[{ required: true, message: 'Please input your company ID!' }]}
                    >
                        <Input placeholder="Company ID (Ex. 467231258AD)" style={{ backgroundColor: 'black', color: 'white', borderBottom: '2px solid gray' }} />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input placeholder="Address" style={{ backgroundColor: 'black', color: 'white', borderBottom: '2px solid gray' }} />
                    </Form.Item>

                    <Form.Item
                        name="district"
                        label="District"
                        rules={[{ required: true, message: 'Please input your district!' }]}
                    >
                        <Input placeholder="District" style={{ backgroundColor: 'black', color: 'white', borderBottom: '2px solid gray' }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}>
                            Save
                        </Button>
                    </Form.Item>

                    {successMessage && (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'green', color: 'white', borderRadius: '8px' }}>
                            {successMessage}
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
}
