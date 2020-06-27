import React, { useEffect, useState } from "react";
import PostCommentItem from "./PostCommentItem";
import { connect } from "react-redux";
import { getComments } from "../../Redux/actions/postActions";

let commentNum = 3;

const PostComments = ({
  postId,

  getComments,
  commentCount,
  comments,
  loadingComments
}) => {
  const [commentShown, setcommentShown] = useState(commentNum);
  const [isMoreComments, setIsMoreComments] = useState(null);

  useEffect(() => {
    // console.log(moreComments);
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
      {loadingComments && <h2 style={{ color: "white" }}>Loading...</h2>}
      {comments &&
        comments.map(comment => (
          <PostCommentItem key={comment._id} comment={comment} />
        ))}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  return {
    comments: state.post.posts.find(post => post._id.toString() === postId)
      .comments,
    commentCount: state.post.posts.find(post => post._id.toString() === postId)
      .commentCount,
    loadingComments: state.post.loadingComments
  };
};

const mapDispatchToProps = dispatch => ({
  getComments: (postId, skip, commentNum) =>
    dispatch(getComments(postId, skip, commentNum))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostComments);
