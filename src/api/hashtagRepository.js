import Repository from './Repository';

const resource = '/hashtags';
export default {
  get() {
    return Repository.get(`${resource}`);
  },

  createHashtag(payload) {
    return Repository.post(`${resource}`, payload);
  },

  deleteHashtag(id) {
    return Repository.delete(`${resource}/${id}`);
  },
};
