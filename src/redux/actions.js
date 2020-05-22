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
