import React, { useEffect, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SignIn from './pages/sign-in/sign-in.component';
import Users from './pages/users/users.component';
import Chat from './pages/chat/chat.component';
import Header from './components/header/header.component';
import ErrorBoundry from './components/error-boundry/error-boundry.component';
import Spinner from './components/spinner/spinner.component';

import './App.scss';

const App = ({ currentUser }) => {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Header />
      <Switch>
        <ErrorBoundry>
          <Route
            exact
            path='/'
            render={props =>
              currentUser ? <Redirect to='/users' /> : <SignIn {...props} />
            }
          />
          <Route
            exact
            path='/users'
            render={props =>
              currentUser ? <Users {...props} /> : <Redirect to='/' />
            }
          />
          <Route
            exact
            path='/chat'
            render={props =>
              currentUser ? <Chat {...props} /> : <Redirect to='/' />
            }
          />
        </ErrorBoundry>
      </Switch>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = createStructuredSelector({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
