import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { signOutUserStart } from '../../redux/current-user/current-user.actions';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';

import UserImage from '../user-image/user-image.component';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.scss';

const Header = ({ currentUser, signOutUserStart }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo />
    </Link>

    <div className='options'>
      <Link className='option' to='/about'>
        ABOUT
      </Link>
      {currentUser ? (
        <Fragment>
          <Link className='option' to='/' onClick={() => signOutUserStart()}>
            SIGN OUT
          </Link>
          <UserImage src={currentUser.avatar} icon />
        </Fragment>
      ) : null}
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  signOutUserStart: () => dispatch(signOutUserStart())
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
