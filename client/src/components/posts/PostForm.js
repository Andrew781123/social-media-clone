import React, { useState } from "react";
import { connect } from "react-redux";
import UserIcon from "../user/UserIcon";
import { createPost } from "../../Redux/actions/postActions";

const PostForm = ({ auth, createPost }) => {
  const {
    user: { username }
  } = auth;

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
    createPost(post, username);
  };

  return (
    <div className='post-form-container'>
      <div className='welcome-container'>
        <UserIcon />
        <div className='welcome-message'>
          <span className='welcome'>
            Welcome Back <span className='username'>Andrew</span>
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          name='content'
          value={post.content}
          onChange={handleChange}
          placeholder='Write somethins to share'
        ></textarea>
        <div>
          <select name='isPublic' onChange={handleSelect}>
            <option value='public'>Public</option>
            <option value='private'>Private</option>
          </select>
          <button className='post-submit' type='submit'>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  createPost: (post, username) => dispatch(createPost(post, username))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
