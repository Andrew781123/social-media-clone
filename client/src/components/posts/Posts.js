import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import {
  getPost,
  incLike,
  decLike,
  addComment,
  getComments,
  removePreviousNewPosts
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
  const { posts, loading, comments, newPosts, loadingNewPost } = post;
  const { user } = auth;
  const { _id } = user;

  useEffect(() => {
    getPost();
    removePreviousNewPosts();
    //  eslint-disable-next-line
  }, []);

  return (
    <div className='posts-container'>
      {newPosts.length > 0 &&
        loadingNewPost === false &&
        newPosts.map(post => (
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
        ))}
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
  decLike: (currentUserId, postId, post) =>
    dispatch(decLike(currentUserId, postId, post)),
  addComment: (username, postId, comment) =>
    dispatch(addComment(username, postId, comment)),
  getComments: (postId, skip, commentNum) =>
    dispatch(getComments(postId, skip, commentNum)),
  removePreviousNewPosts: () => dispatch(removePreviousNewPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
