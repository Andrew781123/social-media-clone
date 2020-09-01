import React from "react";

const PostContentInput = props => {
  const { handleChange, content, placeholder } = props;

  return (
    <textarea
      className='post-content-input'
      name='content'
      value={content}
      onChange={e => handleChange(e)}
      placeholder={placeholder}
      required
    ></textarea>
  );
};

export default PostContentInput;
