import { HttpClient } from "./HttpClient";

const API = process.env.REACT_APP_SERVER;

const CLARIFAI_API = `${API}/api/clarifai`;

const getFaceLocations = (data) => {
  return HttpClient.post(`${CLARIFAI_API}/facedetection`, data);
};

export const ClarifaiApi = {
  getFaceLocations
};
