import {
  CameraOutlined,
  HomeOutlined,
  PlayCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
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

const { Option } = Select;
const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const Project = () => {
  const [posts, setPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Display one post per page

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
    formData.append("author", "Anupama");
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
      <div className="navbar-post">
        <div className="menu-div">
          <Menu
            mode="vertical"
            style={{ height: "100%" }}
            items={[
              {
                key: "search",
                label: (
                  <Input.Search
                    placeholder="Search posts"
                    onSearch={(value) => console.log(value)}
                    enterButton
                  />
                ),
              },
              {
                key: "home",
                icon: <HomeOutlined />,
                label: "Home",
              },
              {
                key: "video",
                icon: <PlayCircleOutlined />,
                label: "Watch",
              },
              {
                key: "market",
                icon: <ShoppingCartOutlined />,
                label: "Marketplace",
              },
              {
                key: "group",
                icon: <UserOutlined />,
                label: "Groups",
              },
            ]}
          />
        </div>
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
              <Avatar size="large" icon={<UserOutlined />} />
              <span className="post-creator-name">
                What's on your mind, Anupama?
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
            <Form.Item name="discription">
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
                <Button icon={<CameraOutlined />} />
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
                <Avatar size="medium" icon={<UserOutlined />} />
                <div style={{ paddingLeft: "5px" }}>
                  <div>{post.author}</div>
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
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
                onChange={(value) => {
                  const updatedPosts = posts.map((p) =>
                    p.id === post.id ? { ...p, rating: value } : p
                  );
                  setPosts(updatedPosts);
                }}
                value={post.rating}
              />
              <Button type="link" onClick={() => handleEdit(post)}>
                Edit Post
              </Button>
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

export default Project;
