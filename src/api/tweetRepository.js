import Repository from './Repository';

const resource = '/hashtags';
export default {
  get(id) {
    return Repository.get(`${resource}/${id}/tweets`);
  },
};
