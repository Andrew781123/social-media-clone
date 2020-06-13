import React from "react";
import { connect } from "react-redux";
import { loadUser } from "../Redux/actions/authActions";

const Home = ({ auth }) => {
  const { isAuth } = auth;

  return (
    <div className='container'>
      <h1>Home Page</h1>
      {isAuth && <h3>LoggedIn</h3>}
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
