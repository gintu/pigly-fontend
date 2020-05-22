const initialState = {};

const userReducer = (state = initialState, actions) => {
  if (actions.type === "SET_USER") {
    return {
      ...actions.payload
    };
  } else {
    return state;
  }
};

export default userReducer;
