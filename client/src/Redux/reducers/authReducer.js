const initialState = {
  isAuth: null,
  loading: null,
  user: { username: null }
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
    case "LOAD_USER_FAIL": {
      return {
        ...state,
        isAuth: false,
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
