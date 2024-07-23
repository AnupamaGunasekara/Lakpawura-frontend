import {
    HomeOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    ProfileOutlined,
    MessageOutlined,
    UnorderedListOutlined,
    SettingOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Menu,
    message,
    Pagination,
    Rate,
    Select
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';
import "./Projects.css";
  
  const { Option } = Select;
  const base_url = import.meta.env.VITE_APP_BACKEND_URL;
  
  const items = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '2',
      icon: <MessageOutlined />,
      label: 'Contact Lakpawura',
    },
    {
      key: '3',
      icon: <PlusOutlined />,
      label: 'Add Administrator',
    },
    {
      key: 'sub1',
      label: 'Catogeries',
      icon: <UnorderedListOutlined />,
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
  
  const Project = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 1; // Display one post per page
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate(); // Initialize navigate hook
  
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
  
    const handleMenuClick = (e) => {
      // Handling navigation based on key
      switch (e.key) {
        case '1':
          navigate('/projectsUser');
          break;
        case '2':
          navigate('/contact'); // Navigate to messages page
          break;
        case '3':
          navigate('/addadmin');
          break;
        case '9':
            navigate('/account-user');
            break;
        case '10':
            navigate('/log out');
            break;
        default:
          console.log('Menu item:', e.key);
      }
    };
  
    useEffect(() => {
      getPosts();
    }, []);
  
    const getPosts = async () => {
      try {
        const response = await axios.get(`${base_url}/api/user/getPosts`);
        if (response.status === 200) {
          setPosts(response.data.data);
          console.log(response.data.data);
        } else {
          message.error("Failed to fetch posts!");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        message.error("Failed to fetch posts!");
      }
    };
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const formatDate = (date) => {
      const now = new Date();
      const postDate = new Date(date);
      const isToday = now.toDateString() === postDate.toDateString();
      const isThisYear = now.getFullYear() === postDate.getFullYear();
  
      if (isToday) {
        return postDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else if (isThisYear) {
        return `${postDate.getDate()}th ${postDate.toLocaleString("default", {
          month: "long",
        })}, ${postDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      } else {
        return `${postDate.getDate()}th ${postDate.toLocaleString("default", {
          month: "long",
        })} ${postDate.getFullYear()}, ${postDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      }
    };
  
    const paginatedPosts = posts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  
    return (
      <div className="container-1">
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
        <div className="container-post">
          <div className="posts-container">
            {paginatedPosts.map((post) => (
              <div key={post.id} className="post black-font">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={logo} style={{width:"60px", height:"55px", padding:"10px"}} />
                  <div style={{ paddingLeft: "15px", paddingTop:"20px" }}>
                    <div>{post.author}</div>
                    <div>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "gray",
                          display: "block",
                        }}
                      >
                        {formatDate(post.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <h3>{post.title}</h3>
                <h6 style={{ color: "gray" }}>
                  {post.category &&
                    post.category.replace("category", "Category ")}
                </h6>
                <p>{post.discription}</p>
  
                {post.images && post.images.length > 0 && (
                  <div className="uploaded-image">
                    <img
                      src={post.images[0].path}
                      alt="Post"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                )}
                <Rate
                  style={{padding:"25px"}}
                  onChange={(value) => {
                    const updatedPosts = posts.map((p) =>
                      p.id === post.id ? { ...p, rating: value } : p
                    );
                    setPosts(updatedPosts);
                  }}
                  value={post.rating}
                />
  
                <div className="pagination-container">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={posts.length}
                    onChange={handlePageChange}
                    className="pagination"
                    style={{color:"#c19a6b"}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Project;
  