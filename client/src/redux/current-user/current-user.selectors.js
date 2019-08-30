import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectIsFetching = createSelector(
  [selectUser],
  user => user.isFetching
);

export const selectErrorMessage = createSelector(
  [selectUser],
  user => user.errorMessage
);
