import { combineReducers } from 'redux';

import currentUserReducer from './current-user/current-user.reducer';
import userListReducer from './users-list/users-list.reducer';
import currentChatReducer from './current-chat/current-chat.reducer';

const rootReducer = combineReducers({
  user: currentUserReducer,
  list: userListReducer,
  chat: currentChatReducer
});

export default rootReducer;
