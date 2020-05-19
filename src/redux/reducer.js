const initialState = {};

const reducer = (state = initialState, actions) => {
  if (actions.type === "SET_USER") {
    console.log(actions.payload + "in reducer");
    return {
      ...actions.payload
    };
  } else {
    return state;
  }
};

export default reducer;
