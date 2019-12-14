import HashtagsRepository from './hashtagRepository';
import TweetsRepository from './tweetRepository';

const repositories = {
  hashtags: HashtagsRepository,
  tweets: TweetsRepository,
};

// eslint-disable-next-line import/prefer-default-export
export const RepositoryFactory = {
  get: name => repositories[name],
};
