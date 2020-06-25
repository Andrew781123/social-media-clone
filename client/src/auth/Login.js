import React from "react";
import GoogleButton from "react-google-button";

const handleAuth = async () => {
  if (process.env.NODE_ENV)
    window.open("https://fakes-book.herokuapp.com/api/auth/google", "_self");
};

const Login = () => {
  return (
    <div className='container'>
      <div className='login-container'>
        <h2>Login</h2>
        <GoogleButton onClick={handleAuth} />
      </div>
    </div>
  );
};

export default Login;
