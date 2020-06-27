import React from "react";
import TagUserItem from "./TagUserItem";

const TagUsers = ({ users, addTag, setTagUser }) => {
  return (
    <div className='tag-users-container'>
      {users.map(user => (
        <TagUserItem
          key={user._id.toString()}
          user={user}
          addTag={addTag}
          setTagUser={setTagUser}
        />
      ))}
    </div>
  );
};

export default TagUsers;
