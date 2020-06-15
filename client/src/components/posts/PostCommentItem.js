import React from "react";
import UserIcon from "../user/UserIcon";

const PostCommentItem = ({ comment }) => {
  const { username, content } = comment;

  return (
    <div>
      <UserIcon />
      {username}
      {content}
    </div>
  );
};

export default PostCommentItem;
