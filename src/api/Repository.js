import axios from 'axios';

const baseDomain = process.env.VUE_APP_PATH_BACKEND;
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL,
});
