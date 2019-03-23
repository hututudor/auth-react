import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class App extends Component {
  state = {
    emailVal: '',
    passwordVal: '',
    firstNameVal: '',
    lastNameVal: '',

    errors: {
      email: false,
      password: false,
      passwordNotLong: false,
      firstName: false,
      lastName: false,
    },
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  setError = (name, val) => {
    this.setState(prevState => {
      return {
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: val,
        },
      };
    });
  };

  validatePassword = () => {
    const {emailVal, passwordVal, firstNameVal, lastNameVal} = this.state;
    if (!passwordVal) {
      this.setError('password', true);
    } else if(passwordVal.length < 8) {
      this.setError('password', false);
      this.setError('passwordNotLong', true);
    } else {
      this.setError('passwordNotLong', false);
    }
  }

  validateFirstName = () => {
    const {emailVal, passwordVal, firstNameVal, lastNameVal} = this.state;
    if (!firstNameVal) {
      this.setError('firstName', true);
    } else {
      this.setError('firstName', false);
    }
  }

  validateLastName = () => {
    const {emailVal, passwordVal, firstNameVal, lastNameVal} = this.state;
    if (!lastNameVal) {
      this.setError('lastName', true);
    } else {
      this.setError('lastName', false);
    }
  }

  validateEmail = () => {
    const {emailVal, passwordVal, firstNameVal, lastNameVal} = this.state;
    if (!emailVal) {
      this.setError('email', true);
    } else {
      this.setError('email', false);
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const {emailVal, passwordVal, firstNameVal, lastNameVal} = this.state;
    
    this.validateEmail();
    this.validatePassword();
    this.validateLastName();
    this.validateFirstName();
    
    setTimeout(() => {
      let vals = Object.values(this.state.errors);
      let hasError = vals.some(val => val);

      if (!hasError) {
        axios.post('https://d5b14d6a.ngrok.io/api/login').then(res => {
          this.props.onLogin(res.data.token)
          this.props.history.push('/');
        })
      } else {
        alert('Error');
      }
    }, 0);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          value={this.state.emailVal}
          onChange={e => {
            this.handleChange(e);
            this.validateEmail();
          }}
          name="emailVal"
        />
        {this.state.errors.email && <span>You must put your email</span>}
        <br />
        <label htmlFor="first">First name: </label>
        <input
          id="first"
          value={this.state.firstNameVal}
          onChange={this.handleChange}
          name="firstNameVal"
        />
        {this.state.errors.firstName && (
          <span>You must put your first name</span>
        )}
        <br />
        <label htmlFor="last">Last name: </label>
        <input
          id="last"
          value={this.state.lastNameVal}
          onChange={this.handleChange}
          name="lastNameVal"
        />
        {this.state.errors.lastName && <span>You must put your last name</span>}
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={this.state.passwordVal}
          onChange={this.handleChange}
          name="passwordVal"
        />
        {this.state.errors.password && <span>You must put your password </span>}
        {this.state.errors.passwordNotLong && <span>Your password must be 8 chars or longer</span>}
        <br />
        <button>Sign Up</button>
      </form>
    );
  }
}

export default withRouter(App);
