import React, { useEffect } from "react";
import PostCommentItem from "./PostCommentItem";

const PostComments = ({ comments, getComments, postId }) => {
  useEffect(() => {
    getComments(postId);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {comments.map(comment => (
        <PostCommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default PostComments;
