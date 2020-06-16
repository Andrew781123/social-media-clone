import React, { useState } from "react";

const PostCommentForm = ({ addComment, postId, user }) => {
  const [input, setInput] = useState("");

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setInput("");

    addComment(user, postId, input);
  };

  return (
    <form onSubmit={handleSubmit}>
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