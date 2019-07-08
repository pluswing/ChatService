import axios from 'axios';

let operatorToken = '';

const initApi = (token: string) => {
  operatorToken = token;
};
const post = async (
  path: string,
  params: { [key: string]: any }): Promise<any> => {

    const endpoint = process.env.VUE_APP_API_ENDPOINT;
    const options: { [key: string]: any } = {};
    if (operatorToken) {
      options.headers = {
        Authorization: `Bearer ${operatorToken}`,
      };
    }
    const res = await axios.post(`${endpoint}${path}`, params, options);
    return res.data;
};

export {
  post,
  initApi,
};
