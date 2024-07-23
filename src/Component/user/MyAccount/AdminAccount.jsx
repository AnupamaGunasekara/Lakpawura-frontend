import React, { useState } from 'react';
import {
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ProfileOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const items = [
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
];

export default function AdminAccount() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    // Handling navigation based on key
    console.log(e)
    switch (e.key) {
      case '1':
        navigate('/account');
        break;
      case '2':
        navigate('/messages'); // Navigate to messages page
        break;
      case '3':
        navigate('/addadmin');
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
        defaultSelectedKeys={['1']}
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
