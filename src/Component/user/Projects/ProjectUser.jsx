import {
    HomeOutlined,
    PlayCircleOutlined,
    ShoppingCartOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import { Avatar, Button, Form, Input, Menu, message, Modal, Pagination, Rate, Select, Upload } from 'antd';
  import React, { useState } from 'react';
  import './Projects.css';
  
  const { Option } = Select;
  
  const ProjectUser = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 1; // Display one post per page
  

  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
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
  
    const paginatedPosts = posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
    return (
      <div className='container-1'>
        <div className="navbar-post">
          <div className="menu-div">
            <Menu mode="vertical" style={{ height: "100%" }} items={[
              {
                key: 'search',
                label: (
                  <Input.Search placeholder="Search posts" onSearch={(value) => console.log(value)} enterButton />
                ),
              },
              {
                key: 'home',
                icon: <HomeOutlined />,
                label: 'Home',
              },
              {
                key: 'video',
                icon: <PlayCircleOutlined />,
                label: 'Watch',
              },
              {
                key: 'market',
                icon: <ShoppingCartOutlined />,
                label: 'Marketplace',
              },
              {
                key: 'group',
                icon: <UserOutlined />,
                label: 'Groups',
              },
            ]} />
          </div>
        </div>
        <div className='container-post'>
          <div className="posts-container">
            {paginatedPosts.map((post) => (
              <div key={post.id} className="post black-font">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar size="medium" icon={<UserOutlined />} />
                  <div style={{ paddingLeft: "5px" }}>
                    <div>{post.creator}</div>
                    <div><p style={{ fontSize: "10px", color: "gray", display: "block" }}>{formatDate(post.date)}</p></div>
                  </div>
                </div>
                <h3>{post.title}</h3>
                <h6 style={{ color: "gray" }}>{post.category.replace('category', 'Category ')}</h6>
                <p>{post.description}</p>
                {post.image && (
                  <div className="uploaded-image">
                    <img src={post.image} alt="Post" style={{ maxWidth: '100%' }} />
                  </div>
                )}
                <Rate
                  onChange={(value) => {
                    const updatedPosts = posts.map((p) =>
                      p.id === post.id ? { ...p, rating: value } : p
                    );
                    setPosts(updatedPosts);
                  }}
                  value={post.rating}
                />
              </div>
            ))}
          </div>
          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={posts.length}
              onChange={handlePageChange}
              className="pagination"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default ProjectUser;
  