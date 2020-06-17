import React, { useEffect, useState } from "react";
import PostCommentItem from "./PostCommentItem";

const PostComments = ({ getComments, postId, commentCount, post }) => {
  const { comments } = post;

  const [commentShown, setcommentShown] = useState(3);
  const [isMoreComments, setIsMoreComments] = useState(null);

  useEffect(() => {
    getComments(postId, commentShown);
    if (commentCount <= commentShown) setIsMoreComments(false);
    else setIsMoreComments(true);
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    getComments(postId, commentShown + 5);
    if (commentCount <= commentShown + 5) {
      setIsMoreComments(false);
    }
    setcommentShown(num => num + 5);
  };

  return (
    <div>
      {isMoreComments && (
        <p className='show-comments' onClick={handleClick}>
          View more
        </p>
      )}
      {comments.map(comment => (
        <PostCommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default PostComments;
