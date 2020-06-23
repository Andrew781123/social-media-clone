import React, { useEffect, useState } from "react";
import PostCommentItem from "./PostCommentItem";

let commentNum = 3;

const PostComments = ({ getComments, postId, commentCount, post }) => {
  const { comments } = post;

  const [commentShown, setcommentShown] = useState(commentNum);
  const [isMoreComments, setIsMoreComments] = useState(null);

  useEffect(() => {
    // getComments(postId, commentShown);
    if (commentCount <= commentShown) setIsMoreComments(false);
    else setIsMoreComments(true);
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    let skip = commentCount - commentShown - commentNum;
    if (skip <= 0) {
      skip = 0;
      commentNum = commentCount - commentShown;
    }
    getComments(postId, skip, commentNum);
    if (commentCount <= commentShown + commentNum) {
      setIsMoreComments(false);
    }
    setcommentShown(num => num + commentNum);
  };

  return (
    <div>
      {isMoreComments && (
        <p className='show-comments' onClick={handleClick}>
          View more {`(${commentCount - commentShown})`}
        </p>
      )}
      {comments.map(comment => (
        <PostCommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default PostComments;
