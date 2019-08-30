import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import CurrentUserActionTypes from './current-user.types';
import setAuthToken from '../utils/setAuthToken';
import {
  loadingCurrentUserSuccess,
  loadingCurrentUserFailure,
  signInUserSuccess,
  signInUserFailure,
  signUpUserSuccess,
  signUpUserFailure,
  signOutUserSuccess,
  signOutUserFailure
} from './current-user.actions';

function* loadingUserAsync() {
  try {
    yield setAuthToken();
    const response = yield call(axios, {
      method: 'get',
      url: '/api/users/auth'
    });

    // set avatar url
    response.data.avatar = `api/users/avatar/${response.data._id}`;

    yield put(loadingCurrentUserSuccess(response.data));
  } catch (error) {
    yield put(loadingCurrentUserFailure(error.message));
  }
}

function* signInUserAsync({ payload }) {
  try {
    const response = yield call(axios, {
      method: 'post',
      url: 'api/users/login',
      data: { ...payload }
    });

    // set avatar url
    response.data.user.avatar = `api/users/avatar/${response.data.user._id}`;

    yield put(signInUserSuccess(response.data.user));
    yield localStorage.setItem('token', response.data.token);
  } catch (error) {
    yield put(signInUserFailure(error.message));
  }
}

function* signUpUserAsync({
  payload: {
    photo: { photoFileName, photoObject },
    ...userCredentials
  }
}) {
  try {
    let response = yield call(axios, {
      method: 'post',
      url: 'api/users/register',
      data: { ...userCredentials }
    });

    const token = response.data.token;

    const formData = new FormData();
    formData.append('avatar', photoObject, photoFileName);

    response = yield call(
      axios.post,
      `api/users/avatar/${response.data.user._id}`,
      formData
    );

    // set avatar url
    response.data.avatar = `api/users/avatar/${response.data._id}`;

    yield put(signUpUserSuccess(response.data));
    yield localStorage.setItem('token', token);
  } catch (error) {
    yield put(signUpUserFailure(error.message));
  }
}

function* signOutUserAsync() {
  try {
    yield setAuthToken();
    yield call(axios, {
      method: 'post',
      url: '/api/users/logout'
    });

    yield put(signOutUserSuccess());
    yield localStorage.removeItem('token');
  } catch (error) {
    yield put(signOutUserFailure(error.message));
  }
}

function* loadingUserStart() {
  yield takeLatest(
    CurrentUserActionTypes.LOADING_CURRENT_USER_START,
    loadingUserAsync
  );
}

function* signInUserStart() {
  yield takeLatest(CurrentUserActionTypes.SIGN_IN_USER_START, signInUserAsync);
}

function* signUpUserStart() {
  yield takeLatest(CurrentUserActionTypes.SIGN_UP_USER_START, signUpUserAsync);
}

function* signOueUserStart() {
  yield takeLatest(
    CurrentUserActionTypes.SIGN_OUT_USER_START,
    signOutUserAsync
  );
}

export default function* currentUserSagas() {
  yield all([
    call(loadingUserStart),
    call(signInUserStart),
    call(signUpUserStart),
    call(signOueUserStart)
  ]);
}
