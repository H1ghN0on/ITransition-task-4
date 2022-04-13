import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = () => {
  const token = Cookies.get("token");
  const Axios = axios.create({
    baseURL: "https://it-task-four-server.herokuapp.com",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return Axios;
};

export default AxiosInstance;
