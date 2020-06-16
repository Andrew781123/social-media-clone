import React, { useState } from "react";
import { connect } from "react-redux";
import UserIcon from "./UserIcon";
import Customize from "./Customize";

const NewUser = props => {
  const { user } = props;

  const [newUser, setUser] = useState({
    username: ""
  });

  const handleChange = e => {
    setUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
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

export default connect(mapStateToProps)(NewUser);
