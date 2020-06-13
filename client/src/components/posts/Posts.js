import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import { getPost } from "../../Redux/actions/postActions";

const Posts = ({ post, getPost }) => {
  const { posts, loading } = post;
  if (posts.length > 0) console.log(posts[0]);

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {loading === false ? (
        posts.map(post => <PostItem key={post._id.toString()} post={post} />)
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = dispatch => ({
  getPost: () => dispatch(getPost())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
