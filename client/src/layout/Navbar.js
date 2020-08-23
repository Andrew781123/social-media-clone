import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import UserIcon from "../components/user/UserIcon";
import UserIconDropdown from "../components/user/UserIconDropdown";

const handleLogout = () => {
  // window.open("http://localhost:5000/api/auth/logout", "_self");
  // window.open("https://fakes-book.herokuapp.com/api/auth/logout", "_self");
  window.open(
    "ec2-54-67-80-77.us-west-1.compute.amazonaws.com/api/auth/google",
    "_self"
  );
};

const handleUserIconClick = (showDropdown, setShowDropdown) => {
  setShowDropdown(!showDropdown);
};

const Navbar = ({ auth }) => {
  const { loading, isAuth, user } = auth;

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header>
      <h1>FakesBook</h1>

      <nav>
        <ul>
          <li>
            <Link to='/' style={navLinksStyle}>
              Home
            </Link>
          </li>

          {!loading && isAuth ? (
            <Fragment>
              <li className='login-out'>
                <UserIcon
                  size={"2.5rem"}
                  headColor={user.icon ? user.icon.headColor : "white"}
                  bodyColor={user.icon ? user.icon.bodyColor : "purple"}
                  handleClick={() =>
                    handleUserIconClick(showDropdown, setShowDropdown)
                  }
                />
                {showDropdown && (
                  <UserIconDropdown
                    handleLogout={handleLogout}
                    userId={user._id.toString()}
                    setShowDropdown={setShowDropdown}
                  />
                )}
              </li>
            </Fragment>
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
