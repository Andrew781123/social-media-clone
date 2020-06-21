import axios from "axios";

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: "SET_LOADING" });
    const res = await axios.get("/api/auth");
    dispatch({ type: "LOAD_USER_SUCCESS", payload: res.data.user });
  } catch (err) {
    dispatch({ type: "LOAD_USER_FAIL" });
    console.error(err);
  }
};

export const updateHeadColor = headColor => {
  console.log(headColor);
  return {
    type: "UPDATE_HEAD_COLOR",
    payload: headColor
  };
};

export const updateBodyColor = bodyColor => {
  return {
    type: "UPDATE_BODY_COLOR",
    payload: bodyColor
  };
};

export const updateUser = user => async dispatch => {
  try {
    dispatch({ type: "SET_LOADING" });
    const res = await axios({
      method: "PATCH",
      url: `/api/users/${user.userId}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: user
    });

    dispatch({ type: "UPDATE_USER", payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getComments = (postId, commentNum) => async dispatch => {
  dispatch({ type: "SET_COMMENT_LOADING" });
  try {
    const res = await axios({
      method: "GET",
      url: `/api/posts/${postId}/comments?num=${commentNum}`,
      headers: {
        "Content-Type": "application/json"
      }
    });
    setTimeout(() => {
      dispatch({
        type: "GET_COMMENTS",
        payload: { comments: res.data[0].recentComments, postId }
      });
    }, 1000);
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
