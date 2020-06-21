import React, { useEffect } from "react";
import PostCommentItem from "./PostCommentItem";
import { getComments } from "../../Redux/actions/commentAction";
import { connect } from "react-redux";

const PostComments = props => {
  const {
    recentComments,
    commentCount,
    loadingComments,
    postId,
    getComments,
    commentShown
  } = props;

  useEffect(() => {
    getComments(postId, 3, commentShown);
  }, []);

  const handleClick = async () => {
    getComments(postId, 3, commentShown);
  };

  return (
    <div>
      {loadingComments === true || loadingComments === null ? (
        <p className='show-comments'>Loading...</p>
      ) : (
        commentCount > commentShown && (
          <p className='show-comments' onClick={handleClick}>
            View more
          </p>
        )
      )}
      {recentComments.map((comment, index) => {
        // if (index < commentShown)
        return <PostCommentItem key={comment._id} comment={comment} />;
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  recentComments: state.comment.recentComments,
  commentCount: state.comment.commentCount,
  loadingComments: state.comment.loadingComments,
  commentShown: state.comment.commentShown
});

const mapDispatchToProps = dispatch => ({
  getComments: (postId, commentsToFetch, commonShown) =>
    dispatch(getComments(postId, commentsToFetch, commonShown))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostComments);
