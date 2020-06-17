import React, { useState, useEffect } from "react";
import UserIcon from "../user/UserIcon";
import PostCommentForm from "./PostCommentForm";
import PostComments from "./PostComments";
import CreatedTime from "./CreatedTime";

const PostItem = ({
  post,
  currentUserId,
  incLike,
  decLike,
  addComment,
  user,
  comments,
  getComments
}) => {
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
        <UserIcon
          size='3.2em'
          headColor={post.user.headColor}
          bodyColor={post.user.bodyColor}
        />
        <div className='username-and-time'>
          <p className='post-item-username'>{post.user.username}</p>
          <CreatedTime createdAt={post.createdAt} />
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
          {post.likeCount} {post.likeCount === 1 ? "person" : "people"} liked
        </small>
      </div>
      <div className='post-comment'>
        <PostComments
          comments={comments}
          getComments={getComments}
          postId={post._id.toString()}
          commentCount={post.commentCount}
          post={post}
        />
        <PostCommentForm
          addComment={addComment}
          postId={post._id.toString()}
          user={user}
        />
      </div>
    </div>
  );
};

export default PostItem;
