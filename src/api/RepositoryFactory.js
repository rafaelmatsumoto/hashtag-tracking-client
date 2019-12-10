import HashtagsRepository from './hashtagRepository';

const repositories = {
  hashtags: HashtagsRepository,
};

// eslint-disable-next-line import/prefer-default-export
export const RepositoryFactory = {
  get: name => repositories[name],
};
