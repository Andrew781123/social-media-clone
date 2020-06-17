import React from "react";
import { Link } from "react-router-dom";

const UserIconDropdown = props => {
  const { handleLogout, userId } = props;

  return (
    <div className='user-icon-dropdown'>
      <ul className='dropdown-links'>
        <Link to='/users/:id' className='dropdown-link'>
          View
        </Link>
        <Link to={`/users/${userId}/edit`} className='dropdown-link'>
          Edit
        </Link>
        <Link to='' className='dropdown-link' onClick={handleLogout}>
          Logout
        </Link>
      </ul>
    </div>
  );
};

export default UserIconDropdown;
