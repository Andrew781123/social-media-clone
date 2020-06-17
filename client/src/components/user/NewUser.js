import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import UserIcon from "./UserIcon";
import Customize from "./Customize";
import { updateUser } from "../../Redux/actions/authActions";

const NewUser = props => {
  const { user, updateUser } = props;

  useEffect(() => {
    if (user.username) setUser({ ...newUser, username: user.username });
  }, [user.username]);

  const [newUser, setUser] = useState({
    username: ""
  });

  const handleChange = e => {
    setUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const saveUser = {
      userId: user._id.toString(),
      username: newUser.username,
      headColor: user.headColor,
      bodyColor: user.bodyColor
    };
    updateUser(saveUser);
    props.history.push("/");
  };

  return (
    <div className='new-user-form-container'>
      <form onSubmit={handleSubmit}>
        <h1>Welcome</h1>
        <div className='edit-user-icon'>
          <UserIcon
            size={"10rem"}
            headColor={user.headColor}
            bodyColor={user.bodyColor}
          />
          <div className='form-input'>
            <label htmlFor='username'>Username: </label>
            <input
              required
              type='text'
              name='username'
              value={newUser.username}
              onChange={handleChange}
            />
          </div>
          <Customize />
        </div>

        <button type='submit'>Next</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
