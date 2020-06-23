import React, { useState, useEffect } from "react";
import Customize from "./Customize";
import UserIcon from "./UserIcon";

const UserForm = props => {
  const {
    headColor,
    bodyColor,
    username,
    action,
    title,
    history,
    userId,
    isCancel,
    handleCancel
  } = props;

  const [newUser, setUser] = useState({
    username: ""
  });

  useEffect(() => {
    if (username) setUser({ ...newUser, username: username });
    // eslint-disable-next-line
  }, [username]);

  const handleChange = e => {
    setUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    //get query string
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let tempUserId = params.get("id");
    const userToSave = {
      userId: tempUserId || userId,
      username: newUser.username,
      icon: {
        headColor: headColor,
        bodyColor: bodyColor
      }
    };
    action(userToSave);
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      <div className='edit-user-icon'>
        <UserIcon size={"10rem"} headColor={headColor} bodyColor={bodyColor} />
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

      <div className='buttons'>
        {isCancel && (
          <button className='cancel-button' onClick={() => handleCancel()}>
            Cancel
          </button>
        )}

        <button className='submit-button' type='submit'>
          Next
        </button>
      </div>
    </form>
  );
};

export default UserForm;
