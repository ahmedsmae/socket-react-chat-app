import CurrentChatActionTypes from './current-chat.types';

export const loadingCurrentChatStart = selectedUserId => ({
  type: CurrentChatActionTypes.LOADING_CUURENT_CHAT_START,
  payload: selectedUserId
});

export const loadingCurrentChatSuccess = chatId => ({
  type: CurrentChatActionTypes.LOADING_CUURENT_CHAT_SUCCESS,
  payload: chatId
});

export const loadingCurrentChatFailure = errorMessage => ({
  type: CurrentChatActionTypes.LOADING_CUURENT_CHAT_FAILURE,
  payload: errorMessage
});
