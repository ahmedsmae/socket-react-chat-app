import { createSelector } from 'reselect';

const selectList = state => state.list;

export const selectUsersList = createSelector(
  [selectList],
  list => list.usersList
);

export const selectSelectedUser = createSelector(
  [selectList],
  list => list.selectedUser
);
