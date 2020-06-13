import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const handleLogout = () => {
  window.open("http://localhost:5000/api/auth/logout", "_self");
};

const Navbar = ({ auth }) => {
  const { loading, isAuth, user } = auth;

  return (
    <nav>
      <ul>
        {!loading && !isAuth && (
          <li>
            <button>
              <Link to='/auth/login'>Login</Link>
            </button>
          </li>
        )}
        {!loading && isAuth && (
          <li>
            <button onClick={handleLogout}>Logout</button>
            <span>Logged in as {user.username}</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
