import { HttpClient } from "./HttpClient";

const API = process.env.REACT_APP_SERVER;

const PROFILE_API = `${API}/profile`;

const getProfile = (userId) => {
  return HttpClient.get(`${PROFILE_API}/${userId}`);
};

const updateProfile = (userId, data) => {
  return HttpClient.put(`${PROFILE_API}/${userId}`, data);
};

export const ProfileApi = {
  getProfile,
  updateProfile
};
