import { connect } from "react-redux";
import React from "react";
import GoogleButton from "react-google-button";
import {guestLogin} from '../Redux/actions/authActions';

const handleAuth = async () => {
  window.open(`${process.env.REACT_APP_SERVER_URL}/api/auth/google`, "_self");
};


const Login = ({guestLogin, history}) => {
  const handleGuestLogin = () => {
    guestLogin();
    history.push('/');
  }


  return (
    <div className='container'>
      <div className='login-container'>
        <h2>Login</h2>
        <GoogleButton onClick={handleAuth} />
        <button id="guest-log-in-button" onClick={handleGuestLogin}>Guest</button>
      </div>
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
  guestLogin: () => dispatch(guestLogin()),
});

export default connect(null, mapDispatchToProps)(Login);
