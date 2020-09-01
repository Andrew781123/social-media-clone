import { default as axios } from "../../api/proxy";

export const getPost = () => async dispatch => {
  dispatch({ type: "SET_POST_LOADING" });
  try {
    const res = await axios({
      method: "GET",
      url: "/api/posts"
    });
    dispatch({ type: "GET_POST", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const removePreviousNewPosts = () => {
  return {
    type: "REMOVE_PREVIOUS_NEW_POSTS"
  };
};

export const createPost = (post, user) => async dispatch => {
  dispatch({ type: "SET_NEWPOST_LOADING" });
  const { content, type } = post;
  let isPublic;
  if (type === "public") isPublic = true;
  else isPublic = false;

  try {
    const res = await axios({
      method: "POST",
      url: "/api/posts",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        user,
        content,
        isPublic
      }
    });

    dispatch({ type: "CREATE_POST", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const editPost = (postId, newPost) => async dispatch => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `/api/posts/${postId}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: newPost
    });

    dispatch({ type: "EDIT_POST", payload: { postId, newPost: res.data } });
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = postId => async dispatch => {
  try {
    await axios({
      method: "DELETE",
      url: `/api/posts/${postId}`
    });

    dispatch({ type: "DELETE_POST", payload: postId });
  } catch (err) {
    console.log(err);
  }
};

export const incLike = (currentUserId, postId) => {
  return { type: "INC_LIKE", payload: { postId, userId: currentUserId } };
};

export const decLike = (currentUserId, postId, post) => {
  const newLikes = post.likes.filter(id => id !== currentUserId);
  return {
    type: "DEC_LIKE",
    payload: { postId, newLikes }
  };
};

export const getComments = (postId, skip, commentNum) => async dispatch => {
  dispatch({ type: "SET_COMMENT_LOADING" });
  try {
    const res = await axios({
      method: "GET",
      url: `/api/posts/${postId}/comments?skip=${skip}&num=${commentNum}`,
      headers: {
        "Content-Type": "application/json"
      }
    });
    dispatch({
      type: "GET_COMMENTS",
      payload: { comments: res.data, postId }
    });
  } catch (err) {
    console.error(err);
  }
};

export const addComment = (user, postId, comment) => async dispatch => {
  dispatch({ type: "SET_NEW_COMMENT_LOADING" });
  try {
    const res = await axios({
      method: "POST",
      url: `/api/posts/${postId}/comments`,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        user,
        content: comment
      }
    });
    dispatch({ type: "ADD_COMMENT", payload: { comment: res.data, postId } });
  } catch (err) {
    console.error(err);
  }
};
