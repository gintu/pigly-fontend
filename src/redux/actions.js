export const setRoom = payload => {
  console.log("inside set room");
  return {
    type: "SET_ROOM",
    payload
  };
};

export const authStart = payload => {
  return {
    type: "AUTH_START",
    payload
  };
};

export const authSuccess = payload => {
  return {
    type: "AUTH_SUCCESS",
    payload
  };
};

export const authFail = payload => {
  return {
    type: "AUTH_FAIL",
    payload
  };
};

export const initiateLogout = () => {
  return {
    type: "INITIATE_LOGOUT"
  };
};

export const commitLogout = () => {
  return {
    type: "COMMIT_LOGOUT"
  };
};

export const checkAuthStatus = () => {
  return {
    type: "CHECK_AUTH_STATUS"
  };
};

export const initiateSaveUserData = payload => {
  return {
    type: "INITIATE_SAVE_USER_DATA",
    payload
  };
};

export const commitUserData = payload => {
  return {
    type: "COMMIT_USER_DATA",
    payload
  };
};

export const userDataFetchFail = payload => {
  return {
    type: "USER_DATA_FETCH_FAIL",
    payload
  };
};

// export const fetchedUserData = payload =>{
//   return {
//     type:'FETCHED_USER_DATA',
//     payload
//   }
// }
