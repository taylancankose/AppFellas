import axios from "axios";
import { getFromLocalStorage, Keys } from "../utils/localStorage";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const client = axios.create({
  baseURL: baseURL,
});

export const getClient = async (headers) => {
  const token = getFromLocalStorage(Keys.AUTH_TOKEN);

  if (!token) return axios.create({ baseURL });

  const defaultHeaders = {
    Authorization: "Bearer " + token,
    ...headers,
  };

  return axios.create({ baseURL, headers: defaultHeaders });
};

export default client;
