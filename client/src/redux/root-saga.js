import { all, call } from 'redux-saga/effects';

import currentUserSagas from './current-user/current-user.sagas';

export default function* rootSaga() {
  yield all([
    // call(contactsSagas),
    call(currentUserSagas)
  ]);
}
