import React, { useState } from "react";
import { connect } from "react-redux";
import UserIcon from "../user/UserIcon";

const PostForm = ({ auth }) => {
  const {
    user: { username }
  } = auth;

  const [post, setPost] = useState({
    content: "",
    type: true
  });

  const handleChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSelect = e => {
    setPost({ ...post, type: e.target.value });
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
      <form className=''>
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

export default connect(mapStateToProps)(PostForm);
