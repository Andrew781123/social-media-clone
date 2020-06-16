import react, { useReducer } from "react";
import userContext from "./userContext";

const initialState = {
  username: ""
};

const userProvider = props => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  return <userContext.Provider>{props.children}</userContext.Provider>;
};
