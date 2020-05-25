import React from "react";
import "./styles.css";
import { BrowserRouter, Route } from "react-router-dom";
import Join from "./components/join/join";
import Chat from "./components/chat/chat";
import Auth from "./components/auth/auth";
import PrivateRoute from "./components/protectedRoute/private";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Auth} />
        <PrivateRoute path="/join" component={Join} />
        {/* <Route path="/join" component={Join} /> */}

        <PrivateRoute path="/chat" component={Chat} />
      </BrowserRouter>
    );
  }
}
