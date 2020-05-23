import React from "react";
import { connect } from "react-redux";
import { setUser, initiateLogout } from "../../redux/actions";

class Join extends React.Component {
  state = {
    name: "",
    room: "toast me"
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    this.props.setUser(this.state);
    this.props.history.push("/chat");
  };

  render() {
    return (
      <div>
        <h1>join</h1>
        <button onClick={this.props.logout}>Logout</button>
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <select
          type="text"
          name="room"
          onChange={this.handleChange}
          value={this.state.room}
        >
          <option value="toast me">Toast me</option>
          <option value="roast me">Roast me</option>
          <option value="random">Random</option>
        </select>
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: payload => dispatch(setUser(payload)),
    logout: () => dispatch(initiateLogout())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Join);
