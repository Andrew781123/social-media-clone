import React, { useState, useEffect } from "react";
import UserIcon from "../user/UserIcon";
import PostForm from "./PostForm";
import PostCommentForm from "./PostCommentForm";
import PostComments from "./PostComments";
import CreatedTime from "./CreatedTime";
import axios from "axios";
import { IconContext } from "react-icons/lib";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";

const PostItem = ({
  post,
  currentUserId,
  incLike,
  decLike,
  editPost,
  deletePost
}) => {
  const [isLiked, setIsLiked] = useState(null);
  const [edit, setEdit] = useState({
    isEdit: false,
    newPost: {
      content: ""
    }
  });

  useEffect(() => {
    console.log(`imageURL: ${post.imageURL}`);
    let liked = false;
    for (let _id of post.likes) {
      if (_id.toString() === currentUserId) {
        liked = true;
        break;
      }
    }
    if (liked) setIsLiked(true);
    else setIsLiked(false);
  }, [post, currentUserId]);

  const handleLike = async () => {
    if (isLiked === true) {
      decLike(currentUserId, post._id.toString(), post);
      try {
        await axios({
          method: "POST",
          url: `/api/posts/${post._id.toString()}/likes/?type=decrement`,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            userId: currentUserId
          }
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      incLike(currentUserId, post._id.toString());
      try {
        await axios({
          method: "POST",
          url: `/api/posts/${post._id.toString()}/likes/?type=increment`,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            userId: currentUserId
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = () => {
    setEdit(edit => {
      return {
        ...edit,
        isEdit: true,
        newPost: { ...edit.newPost, content: post.content }
      };
    });
  };

  const handleDelete = () => {
    deletePost(post._id.toString());
  };

  const handlePostContentChange = e => {
    const { value } = e.target;

    setEdit(edit => {
      return {
        ...edit,
        newPost: { ...edit.newPost, content: value }
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setEdit(edit => {
      return {
        ...edit,
        isEdit: false
      };
    });

    const edittedPost = {
      content: edit.newPost.content
    };

    editPost(post._id.toString(), edittedPost);
  };

  return (
    <div className='post-item-container'>
      <div className='post-item-top'>
        <div className='user-info'>
          <UserIcon
            size='3.2em'
            headColor={post.user.icon.headColor}
            bodyColor={post.user.icon.bodyColor}
          />
          <div className='username-and-time'>
            <p className='post-item-username'>{post.user.username}</p>
            <CreatedTime createdAt={post.formattedCreatedAt} />
          </div>
        </div>
        <div className='post-item-option-buttons'>
          {post.user._id.toString() === currentUserId && (
            <>
              <IconContext.Provider
                value={{ className: "post-item-edit-button" }}
              >
                <AiOutlineEdit onClick={handleEdit} />
              </IconContext.Provider>
              <IconContext.Provider
                value={{ className: "post-item-delete-button" }}
              >
                <HiOutlineTrash onClick={handleDelete} />
              </IconContext.Provider>
            </>
          )}
        </div>
      </div>
      <div className='post-main-content'>
        {edit.isEdit ? (
          <PostForm
            content={edit.newPost.content}
            handleChange={handlePostContentChange}
            handleSubmit={handleSubmit}
            placeholder='Write somethings to share'
          />
        ) : (
          <p className='post-description'>{post.content}</p>
        )}
        {post.imageURL && (
          <div className='post-image-container'>
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/${post.imageURL}`}
              alt='post'
              className='post-image'
            />
          </div>
        )}
      </div>

      <div className='like-button-and-count'>
        <button
          className={`like-button ${isLiked && "liked"}`}
          onClick={handleLike}
        >
          Like
        </button>
        <small className='like-count'>
          {post.likeCount === 0
            ? "陰公冇人like :("
            : post.likeCount === 1 && isLiked === true
            ? "得自己like"
            : post.likeCount === 1 &&
              post.likes[0].toString() === post.user._id.toString()
            ? "得佢自己like"
            : post.likeCount === 1 && isLiked === false
            ? `${post.likeCount} person liked`
            : post.likeCount > 1 && `${post.likeCount} people liked`}
        </small>
      </div>
      <div className='post-comment'>
        <PostComments postId={post._id.toString()} />
        <PostCommentForm postId={post._id.toString()} />
      </div>
    </div>
  );
};

export default PostItem;
