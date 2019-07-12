import Axios, { AxiosInstance } from 'axios';

let axios: AxiosInstance = Axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
});

const initApi = (token: string, onError: (error: Error) => void) => {
  axios = Axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  axios.interceptors.response.use((resp) => resp, (error) => onError(error));
};

const post = async (
  path: string,
  params: { [key: string]: any }): Promise<any> => {

    const options: { [key: string]: any } = {};
    const res = await axios.post(path, params, options);
    return res.data;
};

export {
  post,
  initApi,
};
