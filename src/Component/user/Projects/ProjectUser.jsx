import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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
import logo from "../../../assets/logo.png";
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
  key: 'sub1',
  label: 'Categories',
  icon: <UnorderedListOutlined />,
  children: [
    {
      key: '5',
      label: 'Upcoming',
    },
    {
      key: '6',
      label: 'Completed',
    },
    {
      key: '7',
      label: 'On Going',
    },
    {
      key: '8',
      label: 'Top Rated',
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
const [filteredPosts, setFilteredPosts] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 1; // Display one post per page
const [collapsed, setCollapsed] = useState(false);
const navigate = useNavigate(); // Initialize navigate hook

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
  switch (e.key) {
    case '1':
      setFilteredPosts(posts); // Show all posts on Home
      break;
    case '2':
      navigate('/contact'); // Navigate to contact page
      break;
    case '5':
      filterPostsByCategory('Upcoming');
      break;
    case '6':
      filterPostsByCategory('Completed');
      break;
    case '7':
      filterPostsByCategory('On going');
      break;
    case '8':
      filterPostsByCategory('Top Rated');
      break;
    case '9':
      navigate('/accountUser');
      break;
    case '10':
      handleLogout();
      break;
    default:
      console.log('Menu item:', e.key);
  }
};

const filterPostsByCategory = (category) => {
  const filtered = posts.filter(post => post.category && post.category == category);
  console.log(filtered);
  setFilteredPosts(filtered);
  setCurrentPage(1); // Reset to the first page after filtering
};

useEffect(() => {
  getPosts();
}, []);

const getPosts = async () => {
  try {
    const response = await axios.get(`${base_url}/api/user/getPosts`);
    if (response.status === 200) {
      setPosts(response.data.data);
      setFilteredPosts(response.data.data); // Initialize filtered posts with all posts
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

const paginatedPosts = filteredPosts.slice(
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
                <div style={{color: "white"}}>{post.author}</div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "wheat",
                      display: "block",
                    }}
                  >
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            <h3>{post.title}</h3>
            <h6 style={{ color:"wheat"}}>
              {post.category &&
                post.category.replace("category", "Category ")}
            </h6>
            <p style={{ color:"white"}}>{post.discription}</p>
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
                total={filteredPosts.length}
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
