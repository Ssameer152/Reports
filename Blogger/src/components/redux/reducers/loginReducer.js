import { createReducer } from "@reduxjs/toolkit";
import * as types from "../actions";

const initialState = {
  isLoggedin: false,
  redirect: false,
};
export default function (state = initialState, action) {
  const newState = { ...state };
  const response = action.response;

  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return { newState, isLoggedin: true, response };
    case types.LOGIN_USER_ERROR:
      return { newState, isLoggedin: false, response };
    default:
      return newState;
  }
}

/*export default createReducer(initialState, (builder) =>
  builder.addCase(types.LOGIN_USER_SUCCESS, (state) => {
    state.isLoggedin = true;
  })
)*/
