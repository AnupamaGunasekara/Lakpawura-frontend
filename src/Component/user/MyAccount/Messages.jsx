import React, { useState, useEffect } from 'react';
import { MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, ProfileOutlined, SettingOutlined, HomeOutlined,LogoutOutlined } from '@ant-design/icons';
import { Button, Menu, List, Modal, Input, message as antdMessage } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Messages() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [reply, setReply] = useState("");
  
  const base_url = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await axios.get(`${base_url}/api/admin/getmessages`);
        console.log(res)
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllMessages();
  }, []);

  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const isToday = now.toDateString() === postDate.toDateString();
    const isThisYear = now.getFullYear() === postDate.getFullYear();

    if (isToday) {
      return postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isThisYear) {
      return `${postDate.getDate()}th ${postDate.toLocaleString('default', { month: 'long' })}, ${postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${postDate.getDate()}th ${postDate.toLocaleString('default', { month: 'long' })} ${postDate.getFullYear()}, ${postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    // Handling navigation based on key
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

  const handleSeeMore = (message) => {
    setCurrentMessage(message);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setReplyModalVisible(false);
  };

  const handleReplyClick = (message) => {
    setCurrentMessage(message);
    setReplyModalVisible(true);
  };

  const handleSendReply = async () => {
    try {
      const res = await axios.post(`${base_url}/api/admin/sendreply`, {
        email: currentMessage.email,
        reply
      });
      console.log("Sending reply:", res);
      setReply("");
      setReplyModalVisible(false);
      antdMessage.success("Message sent successfully!");
    } catch (err) {
      console.error(err);
      antdMessage.error("Failed to send message.");
    }
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
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={[
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
          ]}
          onClick={handleMenuClick}
        />
      </div>
      <div style={{ width: "70%", height: "100vh" }}>
        <List
          style={{ margin: "40px", color: "white" }}
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              actions={[<Button type="primary" onClick={() => handleReplyClick(item)}>Reply</Button>]}
            >
              <List.Item.Meta
                title={<div style={{ display: "flex" }}><h4 style={{ color: "white" }}>{`${item.firstName} ${item.lastName}`}</h4></div>}
                description={
                  <>
                    <h6 style={{ color: "gray" }}>{`${formatDate(item.createdAt)}`}</h6>
                    <div style={{ display: "flex" }}>
                      <p style={{ color: "#c19a6b", marginRight: "20px" }}>{`${item.email}`}</p>
                      <p style={{ color: "#c19a6b" }}>{`${item.phone}`}</p>
                    </div>
                    <p style={{ color: "white", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {`${item.message}`}
                    </p>
                    <a onClick={() => handleSeeMore(item.message)} style={{ color: "gray", fontSize: "smaller" }}>See More</a>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <Modal title="Full Message" visible={isModalVisible} onOk={handleModalClose} onCancel={handleModalClose} footer={[
        <Button key="back" onClick={handleModalClose}>
          Close
        </Button>
      ]}>
        <p>{currentMessage}</p>
      </Modal>
      <Modal title={`Reply to ${currentMessage.firstName} ${currentMessage.lastName}`} visible={replyModalVisible} onOk={handleSendReply} onCancel={handleModalClose} footer={[
        <Button key="back" onClick={handleModalClose}>Close</Button>,
        <Button key="submit" type="primary" onClick={handleSendReply}>
          Send
        </Button>
      ]}>
        <Input.TextArea rows={4} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply here..." />
      </Modal>
    </div>
  );
}
