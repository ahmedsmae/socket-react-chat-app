import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadingCurrentUserStart } from './redux/current-user/current-user.actions';

import { selectCurrentUser } from './redux/current-user/current-user.selectors';

import Header from './components/header/header.component';
import ErrorBoundry from './components/error-boundry/error-boundry.component';
import Spinner from './components/spinner/spinner.component';

import './App.scss';

const SignIn = lazy(() => import('./pages/sign-in/sign-in.component'));
const SignUp = lazy(() => import('./pages/sign-up/sign-up.component'));
const Users = lazy(() => import('./pages/users/users.component'));
const Chat = lazy(() => import('./pages/chat/chat.component'));

const App = ({ currentUser, loadingCurrentUserStart }) => {
  useEffect(() => {
    loadingCurrentUserStart();
  }, [loadingCurrentUserStart]);

  return (
    <div className='app'>
      <Header />
      <Switch>
        <ErrorBoundry>
          <Suspense fallback={<Spinner />}>
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
          </Suspense>
        </ErrorBoundry>
      </Switch>
    </div>
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
