import React, { useEffect, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadingCurrentUserStart } from './redux/current-user/current-user.actions';

import { selectCurrentUser } from './redux/current-user/current-user.selectors';

import SignIn from './pages/sign-in/sign-in.component';
import SignUp from './pages/sign-up/sign-up.component';
import Users from './pages/users/users.component';
import Chat from './pages/chat/chat.component';
import Header from './components/header/header.component';
import ErrorBoundry from './components/error-boundry/error-boundry.component';

import './App.scss';

const App = ({ currentUser, loadingCurrentUserStart }) => {
  useEffect(() => {
    loadingCurrentUserStart();
  }, [loadingCurrentUserStart]);

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
            path='/register'
            render={props =>
              currentUser ? <Redirect to='/users' /> : <SignUp {...props} />
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

const mapDispatchToProps = dispatch => ({
  loadingCurrentUserStart: () => dispatch(loadingCurrentUserStart())
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
