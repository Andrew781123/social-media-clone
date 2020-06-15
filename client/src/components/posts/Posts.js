import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import { getPost, incLike, decLike } from "../../Redux/actions/postActions";

const Posts = ({ post, auth, getPost, incLike, decLike }) => {
  const { posts, loading } = post;
  const {
    user: { _id }
  } = auth;

  useEffect(() => {
    getPost();
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
  decLike: (currentUserId, postId) => dispatch(decLike(currentUserId, postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
