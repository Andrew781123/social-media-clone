import React from "react";
import { connect } from "react-redux";
import { loadUser } from "../Redux/actions/authActions";
import WelcomeBlock from "../components/posts/WelcomeBlock";
import Posts from "../components/posts/Posts";

const Home = () => {
  return (
    <div className='container'>
      <WelcomeBlock />
      <Posts />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
