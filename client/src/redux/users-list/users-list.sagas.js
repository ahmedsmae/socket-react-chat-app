import { all, put, call, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

import UsersListActionTypes from './users-list.types';
import {
  loadingUsersListSuccess,
  loadingUsersListFailure
} from './users-list.actions';

import setAuthToken from '../utils/setAuthToken';

function* loadingUsersAsync() {
  try {
    yield setAuthToken();
    const response = yield call(Axios, {
      method: 'get',
      url: '/api/users/allUsers'
    });

    // inject avatar in the users
    const usersList = yield response.data.users.map(
      ({ _id, ...otherProps }) => ({
        _id,
        ...otherProps,
        avatar: `api/users/avatar/${_id}`
      })
    );

    yield put(loadingUsersListSuccess(usersList));
  } catch (error) {
    yield put(loadingUsersListFailure(error.message));
  }
}

function* loadingUsersStart() {
  yield takeLatest(
    UsersListActionTypes.LOADING_USERS_LIST_START,
    loadingUsersAsync
  );
}

export default function* usersListSagas() {
  yield all([call(loadingUsersStart)]);
}
