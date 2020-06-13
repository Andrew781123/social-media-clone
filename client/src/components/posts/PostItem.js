import React from "react";

const PostItem = ({ post }) => {
  return (
    <div>
      <h3>{post.content}</h3>
      <h4>{post.isPublic}</h4>
    </div>
  );
};

export default PostItem;
