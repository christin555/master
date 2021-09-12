import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_HOST}/api`;
const baseQuery = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const API = {
  post: (address, body) => baseQuery.post(address, body).then(({data}) => data),
  get: (address) => baseQuery.get(address).then(({data}) => data)
};

export default API;
