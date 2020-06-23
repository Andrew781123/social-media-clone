import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import {
  getPost,
  incLike,
  decLike,
  addComment,
  getComments
} from "../../Redux/actions/postActions";

const Posts = ({
  post,
  auth,
  getPost,
  incLike,
  decLike,
  addComment,
  getComments
}) => {
  const { posts, loading, comments } = post;
  const { user } = auth;
  const { _id } = user;

  useEffect(() => {
    getPost();
    //  eslint-disable-next-line
  }, []);

  return (
    <div className='posts-container'>
      {loading === false ? (
        posts.map(post => (
          <PostItem
            key={post._id.toString()}
            post={post}
            currentUserId={_id.toString()}
            incLike={incLike}
            decLike={decLike}
            addComment={addComment}
            user={user}
            comments={comments}
            getComments={getComments}
          />
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getPost: () => dispatch(getPost()),
  incLike: (currentUserId, postId) => dispatch(incLike(currentUserId, postId)),
  decLike: (currentUserId, postId) => dispatch(decLike(currentUserId, postId)),
  addComment: (username, postId, comment) =>
    dispatch(addComment(username, postId, comment)),
  getComments: (postId, skip, commentNum) =>
    dispatch(getComments(postId, skip, commentNum))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
