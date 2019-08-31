import UsersListActionTypes from './users-list.types';

const INITIAL_STATE = {
  usersList: [],
  selectedUser: null,
  isFetching: false,
  errorMessage: ''
};

const userListReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UsersListActionTypes.LOADING_USERS_LIST_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: ''
      };

    case UsersListActionTypes.LOADING_USERS_LIST_SUCCESS:
      return {
        ...state,
        usersList: payload,
        isFetching: false,
        errorMessage: ''
      };

    case UsersListActionTypes.LOADING_USERS_LIST_FAILURE:
      return {
        ...state,
        usersList: [],
        isFetching: false,
        errorMessage: payload
      };

    case UsersListActionTypes.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: payload
      };

    default:
      return state;
  }
};

export default userListReducer;
