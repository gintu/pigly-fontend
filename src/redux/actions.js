export const setUser = payload => {
  return {
    type: "SET_USER",
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
  console.log(payload);
  payload.to.push("/join");
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
