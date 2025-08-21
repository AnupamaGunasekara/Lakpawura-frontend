import { Avatar, Rate, Button, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import "./Projects.css";

// Assuming VITE_APP_BACKEND_URL is available in the environment
const base_url = import.meta.env.VITE_APP_BACKEND_URL;

const ProjectCard = () => {
  // State for all fetched posts and the currently displayed posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get posts from the API
  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/api/user/getPosts`);
      if (response.status === 200) {
        // We only need to display a fixed number of posts, so we can limit the array.
        // The request was for 8 cards.
        // Add a new 'isExpanded' property to each post to manage the description toggle.
        const postsWithState = response.data.data.slice(0, 8).map((post) => ({
          ...post,
          isExpanded: false,
        }));
        setPosts(postsWithState);
      } else {
        message.error("Failed to fetch posts!");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      message.error("Failed to fetch posts!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    getPosts();
  }, []);

  // Function to format the post date
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

  // Function to toggle the full description for a specific post
  const toggleDescription = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, isExpanded: !post.isExpanded } : post
      )
    );
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
  if (posts.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "white" }}>
        No posts found.
      </div>
    );
  }

  return (
    <div className="posts-container-grid d-flex flex-column gap-4 align-items-center ">
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-card black-font w-75"
          style={{
            border: "2px solid rgb(197, 154, 110)",

            borderRadius: "18px", // optional for rounded corners
            padding: "15px", // optional for spacing inside
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={logo}
              style={{ width: "60px", height: "55px", padding: "10px" }}
            />
            <div style={{ paddingLeft: "15px", paddingTop: "20px" }}>
              <div style={{ color: "white" }}>{post.author}</div>
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
          <h6 style={{ color: "wheat" }}>
            {post.category && post.category.replace("category", "Category ")}
          </h6>
          <p style={{ color: "white" }}>
            {post.isExpanded
              ? post.discription
              : `${post.discription.slice(0, 500)}...`}
          </p>
          {post.images && post.images.length > 0 && (
            <div className="uploaded-image">
              <img
                src={post.images[0].path}
                alt="Post"
                style={{ maxWidth: "35%" }}
              />
            </div>
          )}
          <Rate style={{ padding: "25px" }} value={post.rating} />
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <Button
              className="text-white"
              type="link"
              onClick={() => toggleDescription(post.id)}
            >
              {post.isExpanded ? "See Less" : "See More"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
