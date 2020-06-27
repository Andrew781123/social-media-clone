import React, { useState, useEffect } from "react";
import UserIcon from "../user/UserIcon";
import PostCommentForm from "./PostCommentForm";
import PostComments from "./PostComments";
import CreatedTime from "./CreatedTime";
import axios from "axios";

const PostItem = ({ post, currentUserId, incLike, decLike }) => {
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    console.log("postItem rendered");
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

  const handleLike = async () => {
    if (isLiked === true) {
      decLike(currentUserId, post._id.toString(), post);
      try {
        await axios({
          method: "POST",
          url: `/api/posts/${post._id.toString()}/likes/?type=decrement`,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            userId: currentUserId
          }
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      incLike(currentUserId, post._id.toString());
      try {
        await axios({
          method: "POST",
          url: `/api/posts/${post._id.toString()}/likes/?type=increment`,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            userId: currentUserId
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className='post-item-container'>
      <div className='user-info'>
        <UserIcon
          size='3.2em'
          headColor={post.user.icon.headColor}
          bodyColor={post.user.icon.bodyColor}
        />
        <div className='username-and-time'>
          <p className='post-item-username'>{post.user.username}</p>
          <CreatedTime createdAt={post.formattedCreatedAt} />
        </div>
      </div>
      <p>{post.content}</p>
      <div className='like-button-and-count'>
        <button
          className={`like-button ${isLiked && "liked"}`}
          onClick={handleLike}
        >
          Like
        </button>
        <small className='like-count'>
          {post.likeCount === 0
            ? "陰公冇人like :("
            : post.likeCount === 1 && isLiked === true
            ? "得自己like"
            : post.likeCount === 1 &&
              post.likes[0].toString() === post.user._id.toString()
            ? "得佢自己like"
            : post.likeCount === 1 && isLiked === false
            ? `${post.likeCount} person liked`
            : post.likeCount > 1 && `${post.likeCount} people liked`}
        </small>
      </div>
      <div className='post-comment'>
        <PostComments postId={post._id.toString()} />
        <PostCommentForm postId={post._id.toString()} />
      </div>
    </div>
  );
};

export default PostItem;
