import React, { useState, useEffect } from 'react';
import {
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ProfileOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Button, Menu, List } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Ensure axios is imported

export default function Messages() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook
  const [messages, setMessages] = useState([]);

  const base_url = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await axios.get(`${base_url}/api/admin/getmessages`);
        setMessages(res.data); // Assuming the API returns an array of messages
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllMessages();
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    switch (e.key) {
      case '1':
        navigate('/account');
        break;
      case '2':
        navigate('/messages'); // Navigate to messages page
        break;
      case '3':
        navigate('/add-admin');
        break;
      default:
        console.log('Menu item:', e.key);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 256 }}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['2']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={[
            {
              key: '1',
              icon: <SettingOutlined />,
              label: 'Account Settings',
            },
            {
              key: '2',
              icon: <MailOutlined />,
              label: 'Messages',
            },
            {
              key: '3',
              icon: <PlusOutlined />,
              label: 'Add Administrator',
            },
            {
              key: 'sub1',
              label: 'Admin Panel',
              icon: <ProfileOutlined />,
              children: [
                {
                  key: '5',
                  label: 'Admin 1',
                },
                {
                  key: '6',
                  label: 'Admin 2',
                },
                {
                  key: '7',
                  label: 'Admin 3',
                },
                {
                  key: '8',
                  label: 'Admin 4',
                },
              ],
            },
          ]}
          onClick={handleMenuClick}
        />
      </div>
      <div style={{ width: "70%", height: "100vh", overflow: "auto" }}>
        <List
          style={{ margin: "10px", color: "white" }}
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              actions={[<Button type="primary" onClick={() => console.log("Replying to:", item.email)}>Reply</Button>]}
            >
              <List.Item.Meta
                title={<h4 style={{color:"white"}}>{`${item.firstName} ${item.lastName}`}</h4>}
                description={
                  <>
                    <p style={{color:"white"}}>{`Email: ${item.email}`}</p>
                    <p style={{color:"white"}}>{`Phone: ${item.phone}`}</p>
                    <p style={{color:"white"}}>{`Message: ${item.message}`}</p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
