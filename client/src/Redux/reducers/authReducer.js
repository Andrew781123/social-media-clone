const initialState = {
  isAuth: false,
  loading: false,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_USER_SUCCESS": {
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        loading: false
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        loading: true
      };
    }
    default:
      return state;
  }
};

export default authReducer;
