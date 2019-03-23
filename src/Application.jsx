import React from 'react';
import {BrowserRouter, Route, Redirect, Switch, NavLink} from 'react-router-dom';
import App from './App';

const Home = () => 'Home';
const Login = () => 'Login';

class PrivateRoute extends React.Component {
  canEnter = () => {
    return this.props.token;
  };

  render() {
    if (!this.canEnter()) {
      return <Redirect to="/login" />;
    } else {
      return (
        <Route
          exact={this.props.exact}
          path={this.props.path}
          component={this.props.component}
        />
      );
    }
  }
}

class Application extends React.Component {
  state = {
    token: null,
    loading: true
  };

  login = token => {
    localStorage.setItem('token', token);
    this.setState({token});
  };

  componentDidMount() {
    let token = localStorage.getItem('token');
    if (token) {
      this.setState({token, loading: false});
      console.log('token', token);
    }
    this.setState({loading: false})
  }

  render() {
    return(
      !this.state.loading && (
      <BrowserRouter>
      <NavLink to="/" > a </NavLink>
        <Switch>
          <PrivateRoute
            token={this.state.token}
            exact
            path="/"
            component={Home}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <App
                token={this.state.token}
                onLogin={token => this.login(token)}
              />
            )}
          />
          <Route exact path="/reister" component={Login} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>)
    );
  }
}

export default Application;
