const initialState = {
  isAuth: null,
  loading: null,
  user: { username: null, icon: { headColor: "white", bodyColor: "blue" } }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_USER_SUCCESS": {
      return {
        ...state,
        isAuth: true,
        user: { ...state.user, ...action.payload },
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
    case "UPDATE_BODY_COLOR": {
      return {
        ...state,
        user: {
          ...state.user,
          icon: { ...state.user.icon, bodyColor: action.payload }
        }
      };
    }
    case "UPDATE_HEAD_COLOR": {
      return {
        ...state,
        user: {
          ...state.user,
          icon: { ...state.user.icon, headColor: action.payload }
        }
      };
    }
    case "EDIT_USER": {
      return {
        ...state,
        loading: false,
        user: { ...state.user, ...action.payload }
      };
    }
    case "CREATE_USER": {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    }
    case "CANCEL_EDIT_ICON": {
      return {
        ...state,
        user: { ...state.user, icon: action.payload }
      };
    }
    default:
      return state;
  }
};

export default authReducer;
