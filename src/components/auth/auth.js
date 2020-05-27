import React from "react";
import { connect } from "react-redux";
import { authStart } from "../../redux/actions";
// import { Redirect } from "react-router";

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
    console.log(this.props.history);
    this.props.authenticate({
      formData: this.state.formData,
      login: this.state.login,
      to: this.props.history
    });
  };

  render() {
    return (
      <div>
        {/* {this.props.auth.token && <Redirect to="/join" />} */}
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

        {this.props.auth.error && <p>{this.props.auth.error}</p>}
        {this.props.user.error && <p>{this.props.user.error}</p>}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authenticate: data => dispatch(authStart(data))
  };
};

const mapStateToProps = state => {
  return { auth: state.auth, user: state.user };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
