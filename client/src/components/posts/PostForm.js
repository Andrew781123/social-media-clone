import React, { useState } from "react";
import PostContentInput from "./PostContentInput";

const PostForm = props => {
  const { handleSubmit, content, handleSelect, handleChange } = props;

  const [postContentInput, setPostContentInput] = useState("");

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <PostContentInput
        content={content}
        handleChange={handleChange}
        placeholder='Write somethings to share'
      />
      <div>
        <select name='isPublic' onChange={() => handleSelect()}>
          <option value='meaningless'>為了看起來多一點功能而存在的選項</option>
          <option value='public'>Public</option>
          <option value='private'>Private</option>
        </select>
        <button className='post-submit' type='submit'>
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
