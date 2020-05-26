const initialState = {
  loading: false,
  token: null,
  error: null,
  userId: null
};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "AUTH_START": {
      return {
        ...state,
        loading: true
      };
    }
    case "AUTH_SUCCESS": {
      return {
        ...state,
        loading: false,
        token: actions.payload.token,
        userId: actions.payload.userId,
        error: null
      };
    }
    case "AUTH_FAIL": {
      return {
        ...state,
        loading: false,
        error: actions.payload.error,
        token: null,
        userId: null
      };
    }
    case "COMMIT_LOGOUT": {
      return {
        ...state,
        token: null,
        userId: null,
        error: null
      };
    }
    default: {
      return state;
    }
  }
};
export default authReducer;
