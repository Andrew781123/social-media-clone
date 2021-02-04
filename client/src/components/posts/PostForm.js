import React, { useRef } from "react";
import PostContentInput from "./PostContentInput";
import { AiOutlinePicture } from "react-icons/ai";
import { IconContext } from "react-icons";

const PostForm = props => {
  const {
    handleSubmit,
    content,
    handleSelect,
    handleChange,
    handleImageSelect,
    imagePreviewURL,
    isGuess
  } = props;

  const imageUploadButton = useRef(null);

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
          <option value='public'>Public</option>
          <option value='private'>Private</option>
        </select>
        <input
          type='file'
          style={{ display: "none" }}
          ref={imageUploadButton}
          onChange={handleImageSelect}
        />
        <IconContext.Provider value={{ className: "upload-picture-button" }}>
          <AiOutlinePicture onClick={() => imageUploadButton.current.click()} />
        </IconContext.Provider>
        <button
          className={`post-submit ${isGuess && "disabled"}`}
          type='submit'
          disabled={isGuess && "disabled"}
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
