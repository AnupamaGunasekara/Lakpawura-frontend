import {
  CameraOutlined,
  HomeOutlined,
  PlayCircleOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Form, Input, Menu, Modal, Rate, Upload, message } from 'antd';
import { Picker } from 'emoji-mart';
import VirtualList from 'rc-virtual-list';
import React, { useState } from 'react';
import './Projects.css'; // Import your custom styles

const Project = () => {
  const [posts, setPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [form] = Form.useForm();

  const ContainerHeight = 650; // Adjust as needed

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setShowEmojiPicker(false);
    setUploadedImage(null);
  };

  const handleFinish = (values) => {
    const newPost = {
      id: posts.length + 1,
      ...values,
      creator: 'Anupama', // Static value for the creator
      comments: [],
      rating: 0,
      image: uploadedImage,
    };
    setPosts([...posts, newPost]);
    form.resetFields();
    setIsModalVisible(false);
    setShowEmojiPicker(false);
    setUploadedImage(null);
    message.success('Post created successfully!');
  };

  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEmojiSelect = (emoji) => {
    const currentText = form.getFieldValue('description') || '';
    form.setFieldsValue({ description: currentText + emoji.native });
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      message.info('Reached bottom');
    }
  };

  const addComment = (postId, comment) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
    );
    setPosts(updatedPosts);
  };

  const addReply = (postId, commentId, reply) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) =>
          comment.id === commentId ? { ...comment, replies: [...comment.replies, reply] } : comment
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const rateComment = (postId, commentId, rating) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) =>
          comment.id === commentId ? { ...comment, rating } : comment
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const rateReply = (postId, commentId, replyId, rating) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) => {
          if (comment.id === commentId) {
            const updatedReplies = comment.replies.map((reply) =>
              reply.id === replyId ? { ...reply, rating } : reply
            );
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className='container-1'>
      <div className="navbar-post">
        <div className="menu">
          <Menu mode="vertical">
            <Menu.Item key="search" style={{ marginBottom: '10px' }}>
              <Input.Search placeholder="Search posts" onSearch={(value) => console.log(value)} enterButton />
            </Menu.Item>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="video" icon={<PlayCircleOutlined />}>
              Watch
            </Menu.Item>
            <Menu.Item key="market" icon={<ShoppingCartOutlined />}>
              Marketplace
            </Menu.Item>
            <Menu.Item key="group" icon={<UserOutlined />}>
              Groups
            </Menu.Item>
          </Menu>
        </div>
      </div>
      <div className='container-post'>
        <Button type="primary" onClick={showModal}>
          Create Post
        </Button>
        <Modal
          title="Create Post"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          className="create-post-modal"
        >
          <Form className='create-post-form' form={form} layout="vertical" onFinish={handleFinish}>
            <div className="post-creator">
              <Avatar size="large" icon={<UserOutlined />} />
              <span className="post-creator-name">What's on your mind, Anupama?</span>
            </div>
            <Form.Item name="description">
              <Input.TextArea rows={5} placeholder="Write something..." />
            </Form.Item>
            {uploadedImage && (
              <div className="uploaded-image">
                <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '100%' }} />
              </div>
            )}
            <div className="post-actions">
              <Upload
                beforeUpload={(file) => {
                  handleUpload({ file });
                  return false;
                }}
                showUploadList={false}
              >
                <Button icon={<CameraOutlined style={{ color: '#c19a6b' }} />} />
              </Upload>
              <Button
                icon={<SmileOutlined style={{ color: '#c19a6b' }} />}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
              {showEmojiPicker && (
                <div className="emoji-picker">
                  <Picker onSelect={handleEmojiSelect} />
                </div>
              )}
            </div>
            <Button type="primary" htmlType="submit">
              Post
            </Button>
          </Form>
        </Modal>
        <VirtualList data={posts} height={ContainerHeight} itemHeight={100} itemKey="id" onScroll={handleScroll}>
          {(post) => (
            <div key={post.id} className="post">
              <p style={{ fontSize: "12px" }}><Avatar size="small" icon={<UserOutlined />} /> {post.creator}</p>
              <p>{post.description}</p>
              <div classname="post-image-discription" style={{display:"flex", gap:"15px",}}>
                 <div style={{width:"50%"}}> {post.image && (
                          <div className="post-image">
                            <img src={post.image} alt="Post" style={{ maxWidth: '100%' }} />
                          </div>
                        )}
                  </div>
              </div>
              
              <Rate
                onChange={(value) => {
                  const updatedPosts = posts.map((p) =>
                    p.id === post.id ? { ...p, rating: value } : p
                  );
                  setPosts(updatedPosts);
                }}
                value={post.rating}
              />
              <div className="comments-section">
                <CommentForm postId={post.id} addComment={addComment} />
                {post.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    postId={post.id}
                    comment={comment}
                    addReply={addReply}
                    rateComment={rateComment}
                    rateReply={rateReply}
                  />
                ))}
              </div>
            </div>
          )}
        </VirtualList>
      </div>
    </div>
  );
};



const Comment = ({ postId, comment, addReply, rateComment, rateReply }) => {
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        text: replyText,
        creator: 'User', // Static value for the reply creator
        rating: 0,
      };
      addReply(postId, comment.id, newReply);
      setReplyText('');
      setShowReplyForm(false);
    } else {
      message.error('Reply cannot be empty!');
    }
  };

  return (
    <div className="comment">
      <p style={{ fontSize: "12px" }}><Avatar size="small" icon={<UserOutlined />} /> {comment.creator}</p>
      <p>{comment.text}</p>
      <Rate
        onChange={(value) => rateComment(postId, comment.id, value)}
        value={comment.rating}
      />
      <Button type="link" onClick={() => setShowReplyForm(!showReplyForm)}>
        Reply
      </Button>
      {showReplyForm && (
        <div className="reply-form">
          <div style={{width:"70%"}}>
            <Input.TextArea
              rows={2}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
            />
          </div>
          <div style={{width:"20%"}}>
          <Button type="primary" onClick={handleReplySubmit}>
            Reply
          </Button>
          </div>
        </div>
      )}
      {comment.replies.map((reply) => (
        <div style={{marginLeft:"40px"}} key={reply.id} className="reply">
          <p style={{ fontSize: "12px" }}><Avatar size="small" icon={<UserOutlined />} /> {reply.creator}</p>
          <p >{reply.text}</p>
          <Rate
            onChange={(value) => rateReply(postId, comment.id, reply.id, value)}
            value={reply.rating}
          />
        </div>
      ))}
    </div>
  );
};

const CommentForm = ({ postId, addComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        text: commentText,
        creator: 'User', // Static value for the comment creator
        rating: 0,
        replies: [],
      };
      addComment(postId, newComment);
      setCommentText('');
    } else {
      message.error('Comment cannot be empty!');
    }
  };

  return (
    <div className="comment-form">
     <div classname="comment-input" style={{width:"70%"}}> 
          <Input.TextArea
            rows={2}
            colomn
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..." />
      </div>
      <div  classname="comment-button" style={{width:"20%"}}>
          <Button type="primary" onClick={handleSubmit}>
            Comment
          </Button>
      </div>
    </div>
  );
};

export default Project;
