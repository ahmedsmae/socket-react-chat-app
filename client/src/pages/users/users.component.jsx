import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadingUsersListStart } from '../../redux/users-list/users-list.actions';

import { selectUsersList } from '../../redux/users-list/users-list.selectors';

import UsersList from '../../components/users-list/users-list.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import './users.styles.scss';

const UsersListWithSpinner = WithSpinner(UsersList);

const Users = ({ loadingUsersListStart, usersList }) => {
  useEffect(() => {
    loadingUsersListStart();
  }, [loadingUsersListStart]);

  return (
    <div>
      <UsersListWithSpinner
        isLoading={usersList.length ? false : true}
        usersList={usersList}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  usersList: selectUsersList
});

const mapDispatchToProps = dispatch => ({
  loadingUsersListStart: () => dispatch(loadingUsersListStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
