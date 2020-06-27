import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import {
  getPost,
  incLike,
  decLike,
  addComment,
  editPost
} from "../../Redux/actions/postActions";

const Posts = ({
  post,
  auth,
  getPost,
  incLike,
  decLike,
  addComment,
  editPost
}) => {
  const { posts, loading, loadingNewPost } = post;
  const { user } = auth;
  const { _id } = user;

  useEffect(() => {
    getPost();
    //  eslint-disable-next-line
  }, []);

  return (
    <div className='posts-container'>
      {loadingNewPost && <h2 className='loading-message'>Posting...</h2>}
      {loading === false ? (
        posts.map(post => (
          <PostItem
            key={post._id.toString()}
            post={post}
            currentUserId={_id.toString()}
            incLike={incLike}
            decLike={decLike}
            user={user}
            editPost={editPost}
          />
        ))
      ) : (
        <h2 className='loading-message'>Loading...</h2>
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
  decLike: (currentUserId, postId, post) =>
    dispatch(decLike(currentUserId, postId, post)),
  addComment: (username, postId, comment) =>
    dispatch(addComment(username, postId, comment)),
  editPost: (postId, newPost) => dispatch(editPost(postId, newPost))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
