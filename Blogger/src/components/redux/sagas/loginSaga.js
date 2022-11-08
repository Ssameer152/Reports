import { put, call } from "redux-saga/effects";
import { loginUserService } from "../../services/loginService";

import * as types from "../actions";

export function* loginSaga(payload) {
  console.log("payload, ", payload);
  try {
    const response = yield call(loginUserService, payload);
    yield [put({ type: types.LOGIN_USER_SUCCESS, response })];
    console.log("response ,", response);
  } catch (error) {
    yield put({ tyep: types.LOGIN_USER_ERROR, error });
  }
}
