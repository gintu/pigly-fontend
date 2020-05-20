const initialState = {};

const reducer = (state = initialState, actions) => {
  if (actions.type === "SET_USER") {
    return {
      ...actions.payload
    };
  } else {
    return state;
  }
};

export default reducer;
