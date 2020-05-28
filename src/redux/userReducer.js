const initialState = {
  userId: null,
  name: "",
  knowMe: "",
  room: "",
  error: null,
  loading: false
};

const userReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "INITIATE_SAVE_USER_DATA": {
      return {
        ...state,
        loading: true
      };
    }
    case "SET_ROOM": {
      console.log("in set room " + actions.payload);
      return {
        ...state,
        room: actions.payload
      };
    }

    case "COMMIT_USER_DATA": {
      return {
        ...actions.payload,
        loading: false,
        error: null,
        room: ""
      };
    }
    case "USER_DATA_FETCH_FAIL": {
      return {
        ...state,
        loading: false,
        error: actions.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
