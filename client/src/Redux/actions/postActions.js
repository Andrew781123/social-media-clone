import axios from "axios";

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

export const createPost = (post, user) => async dispatch => {
  dispatch({ type: "SET_POST_LOADING" });
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

export const incLike = (currentUserId, postId) => async dispatch => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/posts/${postId}/likes/increment`,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        userId: currentUserId
      }
    });
    dispatch({ type: "INC_LIKE", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const decLike = (currentUserId, postId) => async dispatch => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/posts/${postId}/likes/decrement`,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        userId: currentUserId
      }
    });

    dispatch({ type: "DEC_LIKE", payload: res.data });
  } catch (err) {
    console.error(err);
  }
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
