const initialState = {
  posts: [],
  loading: null,
  loadingNewPost: null,
  loadingComments: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POST": {
      console.log("getting posts");
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    }
    // case "CREATE_POST": {
    //   const pinnedPosts = state.posts.filter(post => post.priority > 0);
    //   const notPinnedPosts = state.posts.filter(post => post.priority === 0);
    //   return {
    //     ...state,
    //     posts: [...pinnedPosts, action.payload, ...notPinnedPosts],
    //     loading: false
    //   };
    // }
    case "CREATE_POST": {
      return {
        ...state,
        loadingNewPost: false,
        posts: [action.payload, ...state.posts]
      };
    }
    case "REMOVE_PREVIOUS_NEW_POSTS": {
      return {
        ...state,
        newPosts: {}
      };
    }
    case "SET_NEWPOST_LOADING": {
      return {
        ...state,
        loadingNewPost: true
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
          if (post._id.toString() === action.payload.postId) {
            return {
              ...post,
              likeCount: post.likes.length + 1,
              likes: [...post.likes, action.payload.userId]
            };
          } else return post;
        })
      };
    }

    case "DEC_LIKE": {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id.toString() === action.payload.postId) {
            return {
              ...post,
              likeCount: post.likes.length - 1,
              likes: action.payload.newLikes
            };
          } else return post;
        })
      };
    }

    case "GET_COMMENTS": {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id.toString() === action.payload.postId)
            return {
              ...post,
              comments: [...action.payload.comments, ...post.comments]
            };
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
