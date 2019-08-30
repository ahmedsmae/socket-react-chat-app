import CurrentUserActionTypes from './current-user.types';

export const loadingCurrentUserStart = () => ({
  type: CurrentUserActionTypes.LOADING_CURRENT_USER_START
});

export const loadingCurrentUserSuccess = user => ({
  type: CurrentUserActionTypes.LOADING_CURRENT_USER_SUCCESS,
  payload: user
});

export const loadingCurrentUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.LOADING_CURRENT_USER_FAILURE,
  payload: errorMessage
});

export const signUpUserStart = userCredentials => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_START,
  payload: userCredentials
});

export const signUpUserSuccess = user => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_SUCCESS,
  payload: user
});

export const signUpUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_FAILURE,
  payload: errorMessage
});

export const signInUserStart = userCredentials => ({
  type: CurrentUserActionTypes.SIGN_IN_USER_START,
  payload: userCredentials
});

export const signInUserSuccess = user => ({
  type: CurrentUserActionTypes.SIGN_IN_USER_SUCCESS,
  payload: user
});

export const signInUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_IN_USER_FAILURE,
  payload: errorMessage
});

export const signOutUserStart = () => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess = () => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_SUCCESS
});

export const signOutUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_FAILURE,
  payload: errorMessage
});
