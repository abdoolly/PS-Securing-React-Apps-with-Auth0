import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import Nav from '../Components/Nav';
import Auth from '../Services/Auth';
import Callback from '../Pages/Callback';
import Public from '../Components/Public';
import Private from '../Components/Private';
import { SecureRoute } from '../Components/SecureRoute';

class App extends Component {

  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Nav auth={this.auth} {...this.props} />
        <div className="body">
          <Route exact path='/' render={this.getRenderComponent(Home)} />
          <SecureRoute path='/profile' auth={this.auth} component={Profile} />
          <Route exact path='/callback' render={this.getRenderComponent(Callback)} />
          <Route path='/public' component={Public} />
          <SecureRoute path='/private' auth={this.auth} component={Private} />
        </div>
      </>
    );
  }

  getRenderComponent(Component, onlyAuthenticated) {
    return (props) => {
      if ((this.auth.isAuthenticated() && onlyAuthenticated) || !onlyAuthenticated)
        return (<Component auth={this.auth} {...props} />);

      this.auth.login();
      return null;
    };
  }

}

export default App;
