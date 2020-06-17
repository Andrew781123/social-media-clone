import React, { useState } from "react";
import { connect } from "react-redux";
import UserIcon from "../user/UserIcon";
import { createPost } from "../../Redux/actions/postActions";

const PostForm = ({ auth, createPost }) => {
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
      <form onSubmit={handleSubmit}>
        <textarea
          name='content'
          value={post.content}
          onChange={handleChange}
          placeholder='Write somethings to share'
        ></textarea>
        <div>
          <select name='isPublic' onChange={handleSelect}>
            <option value='meaningless'>
              為了看起來多一點功能而存在的選項
            </option>
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
