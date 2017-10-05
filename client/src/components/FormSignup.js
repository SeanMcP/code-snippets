import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postSignup } from '../actions';
import { bindActionCreators } from 'redux';


class FormSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  handleEmail = e => {
    this.setState({ email: e.target.value });
  }
  handlePassword = e => {
    this.setState({ password: e.target.value });
  }
  handleSubmit = e => {
    this.props.postSignup();
    this.setState({ email: '', password: '' });
  }
  render() {
    return (
      <form className="card p-3 m-3" id="signupForm" onSubmit={this.props.postSignup}>
        <h2 className="display-4">Create an account</h2>
        <p className="lead">Signup to start sharing your own code snippets</p>
        <div className="form-group row">
          <label htmlFor="signup-email-input" className="col-2 col-form-label">Email</label>
          <div className="col-10">
            <input className="form-control" value={this.state.email} onChange={this.handleEmail} type="email" name="email" placeholder="your.email@example.com" id="signup-email-input"/>
          </div>
        </div>
        <div class="form-group row">
          <label for="signup-password-input" class="col-2 col-form-label">Password</label>
          <div class="col-10">
            <input class="form-control" value={this.state.password} onChange={this.handlePassword} type="password" name="password" placeholder="Your super secure password" id="signup-password-input"/>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Signup</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  console.log('state on FormSignup:', state);
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postSignup: postSignup
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSignup);
