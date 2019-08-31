import { createSelector } from 'reselect';

const selectChat = state => state.chat;

export const selectCurrentChatId = createSelector(
  [selectChat],
  chat => chat.currentChatId
);
