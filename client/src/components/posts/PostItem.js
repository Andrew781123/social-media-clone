import React, { useState, useEffect } from "react";
import UserIcon from "../user/UserIcon";
import PostCommentForm from "./PostCommentForm";

const PostItem = ({ post, currentUserId, incLike, decLike }) => {
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    let liked = false;
    for (let _id of post.likes) {
      if (_id.toString() === currentUserId) {
        liked = true;
        break;
      }
    }
    if (liked) setIsLiked(true);
    else setIsLiked(false);
  }, [post, currentUserId]);

  const handleLike = () => {
    if (isLiked === true) decLike(currentUserId, post._id.toString());
    else incLike(currentUserId, post._id.toString());
  };

  return (
    <div className='post-item-container'>
      <div className='user-info'>
        <UserIcon />
        <div className='username-and-time'>
          <p className='post-item-username'>{post.username}</p>
          <p className='post-item-data'>{post.createdAt}</p>
        </div>
      </div>
      <p>{post.content}</p>
      <div className='buttons'>
        <button
          className={`like-button ${isLiked && "liked"}`}
          onClick={handleLike}
        >
          Like
        </button>
        <button className='comment-button'>Comment</button>
      </div>
      <div className='post-comment'>
        <PostCommentForm />
      </div>
    </div>
  );
};

export default PostItem;
