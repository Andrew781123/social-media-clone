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
  currentUsername,
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
        <UserIcon size='3.2em' />
        <div className='username-and-time'>
          <p className='post-item-username'>{post.username}</p>
          <CreatedTime createdAt={post.createdAt} />
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
        <PostComments
          comments={comments}
          getComments={getComments}
          postId={post._id.toString()}
          commentCount={post.commentCount}
        />
        <PostCommentForm
          addComment={addComment}
          postId={post._id.toString()}
          currentUsername={currentUsername}
        />
      </div>
    </div>
  );
};

export default PostItem;
