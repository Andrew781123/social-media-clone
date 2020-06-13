const initialState = {
  posts: [],
  loading: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_POST": {
      return {
        ...state,
        posts: [...state.posts, action.payload],
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

export default postReducer;
