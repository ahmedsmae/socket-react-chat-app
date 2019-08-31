import { all, put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import CurrentChatActionTypes from './current-chat.types';
import setAuthToken from '../utils/setAuthToken';
import {
  loadingCurrentChatSuccess,
  loadingCurrentChatFailure
} from './current-chat.actions';

function* loadingChatAsync({ payload }) {
  try {
    yield setAuthToken();
    const response = yield call(axios, {
      method: 'get',
      url: `/api/chats/open/${payload}`
    });

    yield put(loadingCurrentChatSuccess(response.data));
  } catch (error) {
    yield put(loadingCurrentChatFailure(error.message));
  }
}

function* loadingChatStart() {
  yield takeLatest(
    CurrentChatActionTypes.LOADING_CUURENT_CHAT_START,
    loadingChatAsync
  );
}

export default function* currentChatSagas() {
  yield all([call(loadingChatStart)]);
}
