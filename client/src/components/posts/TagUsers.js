import React from "react";
import TagUserItem from "./TagUserItem";

const TagUsers = ({ users, addTag }) => {
  return (
    <div className='tag-users-container'>
      {users.map(user => (
        <TagUserItem key={user._id.toString()} user={user} addTag={addTag} />
      ))}
    </div>
  );
};

export default TagUsers;
