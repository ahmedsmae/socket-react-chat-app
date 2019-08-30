import { all, call } from 'redux-saga/effects';

// import contactsSagas from './contacts/contacts.sagas';
// import userSagas from './user/user.sagas';

export default function* rootSaga() {
  yield all([
    // call(contactsSagas),
    // call(userSagas)
  ]);
}
