import React, { useState } from "react";

const PostCommentForm = () => {
  const [input, setInput] = useState("");

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <form>
      <input
        type='text'
        placeholder='Write a comment'
        className='post-comment-input'
        value={input}
        onChange={handleChange}
      />
    </form>
  );
};

export default PostCommentForm;
