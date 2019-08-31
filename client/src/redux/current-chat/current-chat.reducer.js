import CurrentChatActionTypes from './current-chat.types';

const INITIAL_STATE = {
  currentChatId: '',
  isFetching: false,
  errorMessage: ''
};

const currentChatReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CurrentChatActionTypes.LOADING_CUURENT_CHAT_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: ''
      };

    case CurrentChatActionTypes.LOADING_CUURENT_CHAT_SUCCESS:
      return {
        ...state,
        currentChatId: payload,
        isFetching: false,
        errorMessage: ''
      };

    case CurrentChatActionTypes.LOADING_CUURENT_CHAT_FAILURE:
      return {
        ...state,
        currentChatId: null,
        isFetching: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default currentChatReducer;
