const initialState = {
  posts: [],
  loading: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POST": {
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    }
    case "CREATE_POST": {
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false
      };
    }
    case "SET_POST_LOADING": {
      return {
        ...state,
        loading: true
      };
    }
    default:
      return state;
  }
};

export default postReducer;
