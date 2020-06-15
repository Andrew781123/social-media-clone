const initialState = {
  posts: [],
  comments: [],
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
    case "INC_LIKE": {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id.toString() === action.payload._id.toString())
            return action.payload;
          else return post;
        })
      };
    }
    case "DEC_LIKE": {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id.toString() === action.payload._id.toString())
            return action.payload;
          else return post;
        })
      };
    }
    case "GET_COMMENTS": {
      return {
        ...state,
        comments: action.payload
      };
    }
    case "ADD_COMMENT": {
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    }
    default:
      return state;
  }
};

export default postReducer;
