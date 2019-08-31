import UsersListActionTypes from './users-list.types';

export const loadingUsersListStart = () => ({
  type: UsersListActionTypes.LOADING_USERS_LIST_START
});

export const loadingUsersListSuccess = usersList => ({
  type: UsersListActionTypes.LOADING_USERS_LIST_SUCCESS,
  payload: usersList
});

export const loadingUsersListFailure = errorMessage => ({
  type: UsersListActionTypes.LOADING_USERS_LIST_FAILURE,
  payload: errorMessage
});

export const setSelectedUser = user => ({
  type: UsersListActionTypes.SET_SELECTED_USER,
  payload: user
});
