import React from "react";
import { connect } from "react-redux";
import { authStart } from "../../redux/actions";

class Auth extends React.Component {
  state = {
    formData: {
      password: "",
      email: ""
    },
    login: false
  };

  handleChange = e => {
    let temp = { ...this.state.formData, [e.target.name]: e.target.value };
    this.setState({ formData: temp });
  };

  toggle = () => {
    this.setState({ login: !this.state.login });
  };

  handleSubmit = e => {
    console.log(this.state);
    this.props.authenticate({formData:this.state.formData,login:this.state.login});
  };

  render() {
    return (
      <div>
        <h1>{this.state.login ? "Login" : "SignUp"}</h1>

        <input
          type="text"
          name="email"
          value={this.state.formData.username}
          onChange={this.handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.formData.password}
          onChange={this.handleChange}
        />
        <br />
        <button type="submit" onClick={this.handleSubmit}>
          {this.state.login ? "Login" : "Signup"}
        </button>
        <br />
        <button type="submit" onClick={this.toggle}>
          Switch to {this.state.login ? "Signup" : "Login"}
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authenticate: data => dispatch(authStart(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
