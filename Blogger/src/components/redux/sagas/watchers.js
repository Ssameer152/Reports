import { takeLatest } from "redux-saga/effects";
import * as types from "../actions";
import { loginSaga } from "./loginSaga";

export default function* watchUserAuthentication() {
  yield takeLatest(types.LOGIN_USER, loginSaga);
}
