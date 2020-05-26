import React from "react";
import { connect } from "react-redux";
import { setUser, initiateLogout } from "../../redux/actions";

class Join extends React.Component {
  state = {
    name: "",
    knowMe: "school"
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
        name
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
        />{" "}
        you know me from
        <select
          type="text"
          name="room"
          onChange={this.handleChange}
          value={this.state.room}
        >
          <option value="De Paul">De Paul</option>
          <option value="RIT">RIT</option>
          <option value="Family">Family</option>
          <option value="Trips">Trips</option>
          <option value="Neigbourhood">Neigbourhood</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={this.handleSubmit}>finish</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: payload => dispatch(setUser(payload))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Join);
