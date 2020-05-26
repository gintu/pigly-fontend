import React from "react";
import { connect } from "react-redux";
import { initiateLogout } from "../../redux/actions";

class ChatList extends React.Component {
  render() {
    const groups = ["Toast Me", "Roast Me", "Random"];
    return (
      <div>
        <button onClick={this.props.logout}>Logout</button>
        {groups.map((item, i) => {
          return <div key={i}>{item}</div>;
        })}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(initiateLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ChatList);
