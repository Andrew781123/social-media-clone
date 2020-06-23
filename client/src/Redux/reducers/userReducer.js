const initialState = {
  user: {
    username: "",
    icon: {
      headColor: null,
      bodyColor: null
    },
    googleId: null,
    joined: null
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default userReducer;
