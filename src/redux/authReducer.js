const initialState = {
  loading: false,
  token: null,
  error: null
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
        error: actions.payload.error
      };
    }
    default: {
      return state;
    }
  }
};
export default authReducer;
