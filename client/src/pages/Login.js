import React from "react";
import GoogleButton from "react-google-button";

const handleAuth = async props => {
  window.open("http://localhost:5000/api/auth/google", "_self");
};

const Login = () => {
  return (
    <div className='login-container'>
      <h2>Login</h2>
      <GoogleButton onClick={handleAuth} />
    </div>
  );
};

export default Login;
