import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  loadingUsersListStart,
  setSelectedUser
} from '../../redux/users-list/users-list.actions';

import { selectUsersList } from '../../redux/users-list/users-list.selectors';

import UserCard from '../../components/user-card/user-card.component';

import './users.styles.scss';

const Users = ({
  loadingUsersListStart,
  usersList,
  history,
  setSelectedUser
}) => {
  useEffect(() => {
    loadingUsersListStart();
  }, [loadingUsersListStart]);

  return (
    <div>
      {usersList &&
        usersList.map(user => (
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
};

const mapStateToProps = createStructuredSelector({
  usersList: selectUsersList
});

const mapDispatchToProps = dispatch => ({
  loadingUsersListStart: () => dispatch(loadingUsersListStart()),
  setSelectedUser: user => dispatch(setSelectedUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
