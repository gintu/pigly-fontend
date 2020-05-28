import React from "react";
import { connect } from "react-redux";
import { initiateLogout, setRoom } from "../../redux/actions";

class ChatList extends React.Component {
  handleClick = room => {
    console.log("in handle click");
    console.log(room);
    this.props.setRoom(room);
    this.props.history.push("/chat");
  };
  render() {
    const groups = ["Toast Me", "Roast Me", "Random"];
    return (
      <div>
        <button onClick={this.props.logout}>Logout</button>
        {groups.map((item, i) => {
          return (
            <div key={i} onClick={() => this.handleClick(item)}>
              {item}
            </div>
          );
        })}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(initiateLogout()),
    setRoom: payload => dispatch(setRoom(payload))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ChatList);
