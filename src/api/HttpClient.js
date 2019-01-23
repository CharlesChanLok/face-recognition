const validateToken = () => {
  return window.sessionStorage.getItem("token")
    ? window.sessionStorage.getItem("token")
    : "";
};

const get = async (url = "") => {
  return await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: validateToken()
    }
  });
};

const post = async (url = "", data = {}) => {
  return await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: validateToken()
    },
    body: JSON.stringify(data)
  });
};

const put = async (url = "", data = {}) => {
  return await fetch(url, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: validateToken()
    },
    body: JSON.stringify(data)
  });
};

export const HttpClient = {
  get,
  post,
  put
};
