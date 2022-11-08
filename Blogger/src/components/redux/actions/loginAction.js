import * as types from "./index";

export const loginUser = (user) => {
  return {
    type: types.LOGIN_USER,
    user,
  };
};
