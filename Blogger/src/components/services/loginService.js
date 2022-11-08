import axios from "axios";
import { api } from "../../api/apiconfig";

export const loginUserService = (request) => {
  console.log("request , ", request);
  const LOGIN_API = `${api}/login`;

  const parameters = {
    data: request.payload,
  };

  return axios
    .post(LOGIN_API, parameters)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
