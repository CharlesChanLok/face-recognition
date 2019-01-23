import { HttpClient } from "./HttpClient";

const API = process.env.REACT_APP_SERVER;

const USER_API = `${API}/users`;

const signInUser = (data) => {
  return HttpClient.post(`${USER_API}/signin`, data);
};

const signOutUser = (data) => {
  return HttpClient.get(`${USER_API}/signout`, data);
};

const registerUser = (data) => {
  return HttpClient.post(`${USER_API}/signup`, data);
};

const imageUploadForDetection = (data) => {
  return HttpClient.put(`${USER_API}/image`, data);
};

export const UserApi = {
  signInUser,
  signOutUser,
  registerUser,
  imageUploadForDetection
};
