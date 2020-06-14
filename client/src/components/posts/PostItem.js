import React from "react";
import UserIcon from "../user/UserIcon";

const PostItem = ({ post }) => {
  return (
    <div className='post-item-container'>
      <div className='user-info'>
        <UserIcon />
        <div className='username-and-time'>
          <p className='post-item-username'>Andrew</p>
          <p className='post-item-data'>8 Jan</p>
        </div>
      </div>
      <p>{post.content}</p>
      <div className='buttons'>
        <button className='like-button'>Like</button>
        <button className='comment-button'>Comment</button>
      </div>
    </div>
  );
};

export default PostItem;
