import React from "react";
import UserIcon from "../user/UserIcon";

const TagUserItem = ({ user, addTag }) => {
  const handleClick = () => addTag(user.username);

  return (
    <div className='tag-users-item' onClick={handleClick}>
      <UserIcon
        size='1.7rem'
        bodyColor={user.icon.bodyColor}
        headColor={user.icon.headColor}
      />
      <span className='tag-users-item-username'>{user.username}</span>
    </div>
  );
};

export default TagUserItem;
