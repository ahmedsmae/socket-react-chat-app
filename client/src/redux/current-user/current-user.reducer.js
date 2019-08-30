import CurrentUserActionTypes from './current-user.types';

const INITIAL_STATE = {
  currentUser: null,
  isFetching: false,
  errorMessage: ''
};

const currentUserReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CurrentUserActionTypes.LOADING_CURRENT_USER_START:
    case CurrentUserActionTypes.SIGN_IN_USER_START:
    case CurrentUserActionTypes.SIGN_UP_USER_START:
    case CurrentUserActionTypes.SIGN_OUT_USER_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: ''
      };

    case CurrentUserActionTypes.LOADING_CURRENT_USER_SUCCESS:
    case CurrentUserActionTypes.SIGN_IN_USER_SUCCESS:
    case CurrentUserActionTypes.SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isFetching: false,
        errorMessage: ''
      };

    case CurrentUserActionTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isFetching: false,
        errorMessage: ''
      };

    case CurrentUserActionTypes.LOADING_CURRENT_USER_FAILURE:
    case CurrentUserActionTypes.SIGN_IN_USER_FAILURE:
    case CurrentUserActionTypes.SIGN_UP_USER_FAILURE:
    case CurrentUserActionTypes.SIGN_OUT_USER_FAILURE:
      return {
        ...state,
        currentUser: null,
        isFetching: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default currentUserReducer;
