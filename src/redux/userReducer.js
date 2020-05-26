const initialState = {
  userId: null,
  name: "",
  knowMe: ""
};

const userReducer = (state = initialState, actions) => {
  if (actions.type === "COMMIT_USER_DATA") {
    return {
      ...actions.payload
    };
  } else {
    return state;
  }
};

export default userReducer;
