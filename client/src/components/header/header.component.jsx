import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import UserImage from '../user-image/user-image.component';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.scss';

const Header = ({ currentUser, signoutUserStart }) => (
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
          <Link className='option' to='/' onClick={() => signoutUserStart()}>
            SIGN OUT
          </Link>
          <UserImage src={currentUser.avatar} />
        </Fragment>
      ) : null}
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = createStructuredSelector({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
