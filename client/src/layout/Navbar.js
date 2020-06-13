import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const handleLogout = () => {
  window.open("http://localhost:5000/api/auth/logout", "_self");
};

const Navbar = ({ auth }) => {
  const { loading, isAuth, user } = auth;

  return (
    <header>
      <h1>Snooker Community</h1>

      <nav>
        <ul>
          <li>
            <Link to='/' style={navLinksStyle}>
              Home
            </Link>
          </li>

          {!loading && isAuth ? (
            <li className='login-out'>
              <span className='logged-in-user'>
                Logged in as {user.username}
              </span>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            loading === false &&
            isAuth === false && (
              <li className='login-out'>
                <Link to='/auth/login' style={navLinksStyle}>
                  Login
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
};

const navLinksStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "1em"
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
