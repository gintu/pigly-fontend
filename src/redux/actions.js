export const setUser = payload => {
  console.log("action dispatched");
  return {
    type: "SET_USER",
    payload
  };
};
