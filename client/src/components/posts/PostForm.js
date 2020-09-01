import React, { useState, useRef } from "react";
import PostContentInput from "./PostContentInput";
import { AiOutlinePicture } from "react-icons/ai";
import { IconContext } from "react-icons";

const PostForm = props => {
  const {
    handleSubmit,
    content,
    handleSelect,
    handleChange,
    handleImageSelect
  } = props;

  const [imagePreviewURL, setImagePreviewURL] = useState(null);
  const imageUploadButton = useRef(null);

  const imageSelect = e => {
    const objectURL = URL.createObjectURL(e.target.files[0]);
    setImagePreviewURL(objectURL);
    handleImageSelect(objectURL);
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <PostContentInput
        content={content}
        handleChange={handleChange}
        placeholder='Write somethings to share'
      />
      {imagePreviewURL && (
        <div className='image-uplaod-preview-cover'>
          <img
            className='upload-image-preview'
            src={imagePreviewURL}
            alt='preview'
          />
        </div>
      )}
      <div className='form-options'>
        <select name='isPublic' onChange={() => handleSelect()}>
          <option value='meaningless'>為了看起來多一點功能而存在的選項</option>
          <option value='public'>Public</option>
          <option value='private'>Private</option>
        </select>
        <input
          type='file'
          style={{ display: "none" }}
          ref={imageUploadButton}
          onChange={imageSelect}
        />
        <IconContext.Provider value={{ className: "upload-picture-button" }}>
          <AiOutlinePicture onClick={() => imageUploadButton.current.click()} />
        </IconContext.Provider>
        <button className='post-submit' type='submit'>
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
