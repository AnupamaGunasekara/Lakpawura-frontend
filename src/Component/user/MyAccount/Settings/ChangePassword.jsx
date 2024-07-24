import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';

export default function ChangePassword() {
    const [form] = Form.useForm();
    const [status, setStatus] = useState('');

    const handleSubmit = async (values) => {
        if (values.newPassword !== values.confirmPassword) {
            setStatus('New password and confirm password do not match.');
            message.error('New password and confirm password do not match.');
            return;
        }

        const formDataObj = new FormData();
        for (const key in values) {
            formDataObj.append(key, values[key]);
        }

        try {
            const response = await fetch('/api/change-password', {
                method: 'POST',
                body: formDataObj
            });

            if (response.ok) {
                setStatus('Password updated successfully!');
                message.success('Password updated successfully!');
                form.resetFields();
            } else {
                setStatus('Failed to update password.');
                message.error('Failed to update password.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setStatus('An error occurred. Please try again.');
            message.error('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ backgroundColor: 'black', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid gray' }}>
            <div style={{ backgroundColor: 'blue', borderRadius: '8px', padding: '1rem', border: '1px solid gray', width: '100%', textAlign: 'center' }}>
                <span style={{ fontSize: '24px', color: 'white' }}>Change Password</span>
            </div>

            <div style={{ backgroundColor: 'black', height: '80px', padding: '1rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid gray', width: '100%', textAlign: 'center' }}>
                <span style={{ color: 'white' }}>Update your Password</span>
            </div>

            <div style={{ backgroundColor: 'black', padding: '1rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid gray', width: '100%' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{ width: '100%' }}
                >
                    <Form.Item
                        name="password"
                        label="Current Password"
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                    >
                        <Input.Password placeholder="Current Password" style={{ backgroundColor: 'black', color: 'white', borderBottom: '2px solid gray' }} />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password placeholder="New Password" style={{ backgroundColor: 'black', color: 'white', borderBottom: '2px solid gray' }} />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        rules={[{ required: true, message: 'Please confirm your new password!' }]}
                    >
                        <Input.Password placeholder="Confirm Password" style={{ backgroundColor: 'black', color: 'white', borderBottom: '2px solid gray' }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}>
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {status && <p style={{ marginTop: '1rem', color: 'red' }}>{status}</p>}
        </div>
    );
}
