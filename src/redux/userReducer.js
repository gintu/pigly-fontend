const initialState = {
  userId: null,
  name: "",
  knowMe: "",
  room: "",
  error: null,
  loading: false
};

const userReducer = (state = initialState, actions) => {
  if (actions.type === "COMMIT_USER_DATA") {
    return {
      ...actions.payload
    };
  } else if (actions.type === "USER_DATA_FETCH_FAIL") {
  } else {
    return state;
  }

  switch (actions.type) {
    case "INITIATE_SAVE_USER_DATA": {
      return {
        ...state,
        loading: true
      };
    }
    case "SET_ROOM": {
      return {
        ...state,
        room: actions.payload
      };
    }

    case "COMMIT_USER_DATA": {
      return {
        ...actions.payload,
        loading: false,
        error: null
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
