import React from "react";
import UserIcon from "../user/UserIcon";
import CreatedTime from "./CreatedTime";

const PostCommentItem = ({ comment }) => {
  const { username, content } = comment;

  return (
    <div className='comment-item-container'>
      <div className='comment-item-user-info'>
        <UserIcon size='1.7em' headColor={"white"} bodyColor={"blue"} />
        <span className='comment-item-username'>{username}</span>
        <CreatedTime createdAt={comment.createdAt} />
      </div>
      <p className='comment-item-content'>{content}</p>
    </div>
  );
};

export default PostCommentItem;
