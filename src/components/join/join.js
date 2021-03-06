import React from "react";
import { connect } from "react-redux";
import { setUser, initiateSaveUserData } from "../../redux/actions";

class Join extends React.Component {
  state = {
    name: "",
    knowMe: "RIT"
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    // this.props.setUser(this.state);
    // this.props.history.push("/chat");

    let data = {
      formData: { ...this.state },
      to: this.props.history
    };

    this.props.saveUserData(data);
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
          name="knowMe"
          onChange={this.handleChange}
          value={this.state.knowMe}
        >
          <option value="De Paul">De Paul</option>
          <option value="RIT">RIT</option>
          <option value="Family">Family</option>
          <option value="Trips">Trips</option>
          <option value="Neigbourhood">Neigbourhood</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={this.handleSubmit}>finish</button>
        {this.props.user.error && <p>{this.props.user.error}</p>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserData: payload => dispatch(initiateSaveUserData(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
