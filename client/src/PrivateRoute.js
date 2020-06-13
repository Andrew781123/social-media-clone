import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuth, loading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth === false && loading === false ? (
          <Redirect to='/auth/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
