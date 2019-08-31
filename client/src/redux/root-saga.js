import { all, call } from 'redux-saga/effects';

import currentUserSagas from './current-user/current-user.sagas';
import usersListSagas from './users-list/users-list.sagas';
import currentChatSagas from './current-chat/current-chat.sagas';

export default function* rootSaga() {
  yield all([
    call(currentUserSagas),
    call(usersListSagas),
    call(currentChatSagas)
  ]);
}
