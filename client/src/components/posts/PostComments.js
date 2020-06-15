import React, { useEffect, useState } from "react";
import PostCommentItem from "./PostCommentItem";

const PostComments = ({ comments, getComments, postId, commentCount }) => {
  const [commentNum, setCommentNum] = useState(3);
  const [isMoreComments, setIsMoreComments] = useState(null);

  useEffect(() => {
    getComments(postId, commentNum);
    if (commentCount <= commentNum) setIsMoreComments(false);
    else setIsMoreComments(true);
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    getComments(postId, commentNum + 5);
    if (commentCount <= commentNum + 5) setIsMoreComments(false);
    if (commentCount <= commentNum + 5) setCommentNum(num => num + 5);
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
