import React from "react";
import { connect } from "react-redux";
class Chat extends React.Component {
  render() {
    return <div>chat</div>;
  }
}
const mapStateToProps = state => {
  return { loginData: state };
};
export default connect(mapStateToProps)(Chat);
