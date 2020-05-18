import React from "react";
import "./styles.css";
import { BrowserRouter, Route } from "react-router-dom";
import Join from "./components/join/join";
import Chat from "./components/chat/chat";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </BrowserRouter>
    );
  }
}
