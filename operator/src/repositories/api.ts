import axios from 'axios';

const post = async (path: string, params: { [key: string]: any }, token?: string): Promise<any> => {
    const endpoint = process.env.VUE_APP_API_ENDPOINT;
    const options: { [key: string]: any } = {};
    if (token) {
        options.headers = {
            Authorization: `Bearer ${token}`,
        };
    }
    const res = await axios.post(
        `${endpoint}${path}`, params, options);
    return res.data;
};

export default post;
