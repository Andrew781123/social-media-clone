import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUser } from "../Redux/actions/authActions";

const LoginSuccess = props => {
  const { loadUser } = props;
  const [count, setCount] = useState(3);

  useEffect(() => {
    loadUser();
    setTimeout(() => {
      props.history.push("/");
    }, 3000);
    const interval = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container'>
      <h2>Login success, redirecting...</h2>
      <h4>{count}</h4>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser())
});

export default connect(null, mapDispatchToProps)(LoginSuccess);
