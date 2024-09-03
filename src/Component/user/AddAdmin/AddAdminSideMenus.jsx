import React, { useState } from 'react';
import {
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ProfileOutlined,
  SettingOutlined,
  HomeOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios  from 'axios';



const items = [
    {
        key: '1',
        icon: <HomeOutlined />,
        label: 'Projects',
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
      {
        key: '9',
        icon: <SettingOutlined />,
        label: 'Account Settings',
      },
      {
        key: '10',
        icon: <LogoutOutlined />,
        label: 'Logout',
      },
];

export default function AddAdminSidemenu() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const base_url = import.meta.env.VITE_APP_BACKEND_URL;
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };


  const handleLogout = async (event) => {
    try {
      const res = await axios.get(`${base_url}/api/user/logout`);
      navigate("/");
      // location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuClick = (e) => {
    // Handling navigation based on key
    console.log(e)
    switch (e.key) {
      case '1':
        navigate('/projects');
        break;
      case '2':
        navigate('/messages');
        break;
      case '3':
        navigate('/addadmin');
        break;
      case '9':
        navigate('/account');
        break;
      case 'sub1':
        navigate('/adminList');
        break;
      case '10':
        handleLogout();
        break;
      default:
        console.log('Menu item:', e.key);
    }
  };

  return (
    <div style={{ width: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['3']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick} // Add onClick handler to Menu
      />
    </div>
  );
}
