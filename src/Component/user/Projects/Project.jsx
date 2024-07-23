import {
  CameraOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ProfileOutlined,
  HomeOutlined,
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Pagination,
  Rate,
  Select,
  Upload,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Projects.css";
import logo from '../../../assets/logo.png';
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const base_url = import.meta.env.VITE_APP_BACKEND_URL;

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

const Project = () => {
  const [posts, setPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [form] = Form.useForm();
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
      case '10':
        handleLogout();
        break;
      default:
        console.log('Menu item:', e.key);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUploadedImage(null);
    setIsEditMode(false);
    setCurrentPost(null);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("discription", values.discription);
    formData.append("author", "Lakpawura");
    formData.append("date", new Date());
    formData.append("comments", JSON.stringify([]));
    formData.append("rating", isEditMode ? currentPost.rating : 0);
    if (uploadedImage) {
      formData.append("image", uploadedImage.originFileObj);
    }

    try {
      console.log(values);
      console.log(formData);
      const response = isEditMode
        ? await axios.put(`${base_url}/api/test/${currentPost.id}`, formData)
        : await axios.post(`${base_url}/api/test`, formData);

      if (response.status === 200) {
        const newPost = response.data;
        if (isEditMode) {
          const updatedPosts = posts.map((post) =>
            post.id === currentPost.id ? newPost : post
          );
          setPosts(updatedPosts);
          message.success("Post updated successfully!");
          window.location.reload();
        } else {
          setPosts([...posts, newPost]);
          message.success("Post created successfully!");
          window.location.reload();
        }

        form.resetFields();
        setIsModalVisible(false);
        setUploadedImage(null);
        setIsEditMode(false);
        setCurrentPost(null);
      } else {
        message.error("Failed to save the post!");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      message.error("Failed to save the post!");
    }
  };

  const handleUpload = (info) => {
    let fileList = [...info.fileList];
    console.log("---------------");
    console.log(fileList);
    // Limit to one file
    fileList = fileList.slice(-1);

    // Update state with the fileList
    setUploadedImage(fileList[0]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (post) => {
    setIsEditMode(true);
    setCurrentPost(post);
    setUploadedImage(post.image);
    form.setFieldsValue({
      title: post.title,
      category: post.category,
      discription: post.discription,
    });
    showModal();
  };

  const handleDelete = async (post) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this post?',
      onOk: async () => {
        try {
          const response = await axios.delete(`${base_url}/api/admin/removepost/${post.id}`);
          if (response.status === 200) {
            const updatedPosts = posts.filter((p) => p.id !== post.id);
            setPosts(updatedPosts);
            message.success("Post deleted successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            message.error("Failed to delete the post!");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        } catch (error) {
          console.error("Error deleting post:", error);
          message.error("Failed to delete the post!");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      },
    });
  };
  

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
        <Button
          className="create-post-button"
          type="primary"
          onClick={showModal}
        >
          Create Post
        </Button>
        <Modal
          title={isEditMode ? "Edit Post" : "Create Post"}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          className="create-post-modal"
        >
          <Form
            className="create-post-form"
            form={form}
            layout="vertical"
            onFinish={handleFinish}
          >
            <div className="post-creator">
              <Avatar src={logo} style={{ width: "60px", height: "55px", padding: "10px" }} />
              <span className="post-creator-name">
                What's on your mind, Lakpawura?
              </span>
            </div>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input placeholder="Enter the title of the post" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select placeholder="Select a category">
                <Option value="category1">Category 1</Option>
                <Option value="category2">Category 2</Option>
                <Option value="category3">Category 3</Option>
                <Option value="category4">Category 4</Option>
                <Option value="category5">Category 5</Option>
              </Select>
            </Form.Item>
            <Form.Item name="discription" label="Discription">
              <Input.TextArea rows={5} placeholder="Write something..." />
            </Form.Item>
            {uploadedImage && (
              <div className="uploaded-image">
                <img src="" alt="Uploaded" style={{ maxWidth: "100%" }} />
              </div>
            )}
            <div className="post-actions">
              <Upload
                beforeUpload={() => false} // Returning false prevents upload (handled in handleUpload)
                fileList={uploadedImage ? [uploadedImage] : []}
                onChange={handleUpload}
                showUploadList={false} // Hide the default file list
              >
                <Button icon={<UploadOutlined />} />
              </Upload>
            </div>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Update" : "Post"}
            </Button>
          </Form>
        </Modal>
        <div className="posts-container">
          {paginatedPosts.map((post) => (
            <div key={post.id} className="post black-font">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar src={logo} style={{ width: "60px", height: "55px", padding: "10px" }} />
                <div style={{ paddingLeft: "15px", paddingTop: "20px" }}>
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
                <Button type="primary" onClick={() => handleEdit(post)} style={{ marginLeft: "10px" }}>
                  Edit Post
                </Button>
                <Button type="primary" danger onClick={() => handleDelete(post)} style={{ marginLeft: "10px" }}>
                  Remove Post
                </Button>
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
                style={{ padding: "25px" }}
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
                  style={{ color: "#c19a6b" }}
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
