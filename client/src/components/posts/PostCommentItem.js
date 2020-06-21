import React from "react";
import UserIcon from "../user/UserIcon";
import CreatedTime from "./CreatedTime";

const PostCommentItem = ({ comment }) => {
  return (
    <div className='comment-item-container'>
      <div className='comment-item-user-info'>
        <UserIcon
          size='1.7em'
          headColor={comment.user.headColor}
          bodyColor={comment.user.bodyColor}
        />
        <span className='comment-item-username'>{comment.user.username}</span>
        <CreatedTime createdAt={comment.createdAt} />
      </div>
      <p className='comment-item-content'>{comment.content}</p>
    </div>
  );
};

export default PostCommentItem;
