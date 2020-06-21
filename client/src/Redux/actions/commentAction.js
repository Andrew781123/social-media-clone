import axios from "axios";

export const getComments = (
  postId,
  commentsToFetch,
  commentShown
) => async dispatch => {
  dispatch({ type: "SET_COMMENT_LOADING" });
  try {
    const res = await axios({
      method: "GET",
      url: `/api/posts/${postId}/comments?num=${commentsToFetch}&shown=${commentShown}`,
      headers: {
        "Content-Type": "application/json"
      }
    });

    setTimeout(() => {
      dispatch({
        type: "GET_COMMENTS",
        payload: { ...res.data, commentsToFetch }
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
