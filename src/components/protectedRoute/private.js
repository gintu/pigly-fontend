import { Route, Redirect } from "react-router";
import React from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem("tokenId");
  console.log(token);
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
