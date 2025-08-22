import { Avatar, Rate, Button, message, Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Projects.css";

// Assuming VITE_APP_BACKEND_URL is available in the environment
const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const POSTS_PER_PAGE = 4;

const ProjectCard = () => {
  // State for all fetched posts
  const [posts, setPosts] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State to manage the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Function to get posts from the API
  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/api/user/getPosts`);
      if (response.status === 200) {
        // Add the 'isExpanded' property to each post for managing the description toggle
        const postsWithState = response.data.data.map((post) => ({
          ...post,
          isExpanded: false,
        }));
        setPosts(postsWithState);
      } else {
        message.error("Failed to fetch posts!");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      message.error("An error occurred while fetching posts.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    getPosts();
  }, []);

  // Function to format the post date
  const formatDate = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const startOfNow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfPostDate = new Date(
      postDate.getFullYear(),
      postDate.getMonth(),
      postDate.getDate()
    );
    const diffTime = startOfNow - startOfPostDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (now.getFullYear() === postDate.getFullYear()) {
      return postDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    return postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to toggle the full description for a specific post
  const toggleDescription = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, isExpanded: !post.isExpanded } : post
      )
    );
  };

  // Handler for changing the page
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Optional: scroll to top when page changes
  };

  // If data is still loading, show a loading message
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "white" }}>
        Loading posts...
      </div>
    );
  }

  // If there are no posts after loading, show a message
  if (!posts || posts.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "white" }}>
        No posts found.
      </div>
    );
  }

  // Calculate the posts to display on the current page
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="posts-container-grid row gap-5 d-flex justify-content-center">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="post-card black-font col-12 col-lg-5"
            style={{
              border: "2px solid rgb(197, 154, 110)",
              borderRadius: "18px",
              padding: "15px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ paddingLeft: "15px", paddingTop: "20px" }}>
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
            <h3 className="text-white">{post.title}</h3>
            <div className="p-5">
              <p style={{ color: "white" }}>
                {post.discription.length <= 500
                  ? post.discription
                  : post.isExpanded
                  ? post.discription
                  : `${post.discription.slice(0, 500)}...`}
              </p>
            </div>
            {post.images && post.images.length > 0 && (
              <div className="uploaded-image">
                <img
                  src={post.images[0].path}
                  alt="Post"
                  style={{ maxWidth: "55%" }}
                />
              </div>
            )}
            <Rate
              style={{ padding: "25px" }}
              value={post.rating}
              allowHalf
              disabled
            />
            <div style={{ textAlign: "right", marginTop: "10px" }}>
              {post.discription.length > 500 && (
                <Button
                  className="text-white"
                  type="link"
                  onClick={() => toggleDescription(post.id)}
                >
                  {post.isExpanded ? "See Less" : "See More"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <Pagination
          current={currentPage}
          total={posts.length}
          pageSize={POSTS_PER_PAGE}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default ProjectCard;
