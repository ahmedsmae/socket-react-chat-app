import { combineReducers } from 'redux';

import currentUserReducer from './current-user/current-user.reducer';
// import contactsReducer from './contacts/contacts.reducer';
// import messageReducer from './message/message.reducer';

const rootReducer = combineReducers({
  user: currentUserReducer
  // contacts: contactsReducer,
  // message: messageReducer
});

export default rootReducer;
