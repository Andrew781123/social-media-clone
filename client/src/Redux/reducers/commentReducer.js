const initialState = {
  commentShown: 0,
  comments: [],
  commentCount: 0,
  loadingComments: null
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMMENT_LOADING": {
      return {
        ...state,
        loading: true
      };
    }
    case "GET_COMMENTS": {
      return {
        ...state,
        commentShown: state.commentShown + action.payload.commentsToFetch,
        recentComments: [
          ...state.recentComments,
          ...action.payload.recentComments
        ],
        commentCount: action.payload.commentCount,
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

export default commentReducer;
