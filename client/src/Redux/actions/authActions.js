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
