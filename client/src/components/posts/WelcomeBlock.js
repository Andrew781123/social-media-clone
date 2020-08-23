import React, { useState } from "react";
import { connect } from "react-redux";
import UserIcon from "../user/UserIcon";
import PostContentInput from "./PostContentInput";
import PostForm from "./PostForm";
import { createPost } from "../../Redux/actions/postActions";

const WelcomeBlock = ({ auth, createPost }) => {
  const { user } = auth;

  const [post, setPost] = useState({
    content: "",
    type: "Public"
  });

  const handleChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSelect = e => {
    setPost({ ...post, type: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setPost({
      content: "",
      type: "Public"
    });
    createPost(post, user);
  };

  return (
    <div className='post-form-container'>
      <div className='welcome-container'>
        <UserIcon />
        <div className='welcome-message'>
          <span className='welcome'>
            Welcome Back <span className='username'>{user.username}</span>
          </span>
        </div>
      </div>
      <PostForm
        handleSubmit={handleSubmit}
        content={post.content}
        handleSelect={handleSelect}
        handleChange={handleChange}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  createPost: (post, username) => dispatch(createPost(post, username))
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBlock);