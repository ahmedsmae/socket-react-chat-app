import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setSelectedUser } from '../../redux/users-list/users-list.actions';

import UserCard from '../user-card/user-card.component';

import './users-list.styles.scss';

const UsersList = ({ usersList, setSelectedUser, history }) => (
  <div className='users-list-container'>
    {usersList.map(user => (
      <UserCard
        onClick={() => {
          history.push('/chat');
          setSelectedUser(user);
        }}
        key={user._id}
        user={user}
      />
    ))}
  </div>
);

const mapDispatchToProps = dispatch => ({
  setSelectedUser: user => dispatch(setSelectedUser(user))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(UsersList)
);
