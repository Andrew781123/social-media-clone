const initialState = {
  posts: [],
  loading: null,
  loadingComments: null
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
        posts: [action.payload, ...state.posts],
        loading: false
      };
    }
    case "SET_POST_LOADING": {
      return {
        ...state,
        loading: true
      };
    }
    case "SET_COMMENT_LOADING": {
      return {
        ...state,
        loadingComments: true
      };
    }
    case "INC_LIKE": {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id.toString() === action.payload._id.toString())
            return { ...post, ...action.payload };
          else return post;
        })
      };
    }
    case "DEC_LIKE": {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id.toString() === action.payload._id.toString())
            return { ...post, ...action.payload };
          else return post;
        })
      };
    }
    case "GET_COMMENTS": {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id.toString() === action.payload.postId)
            return { ...post, comments: action.payload.comments };
          else return post;
        }),
        loadingComments: false
      };
    }
    case "ADD_COMMENT": {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id.toString() === action.payload.postId)
            return {
              ...post,
              comments: [...post.comments, action.payload.comment]
            };
          else return post;
        })
      };
    }
    default:
      return state;
  }
};

export default postReducer;
