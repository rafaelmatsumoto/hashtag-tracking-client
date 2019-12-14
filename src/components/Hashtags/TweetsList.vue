<template>
  <div>
    <Loading ref="loading"/>
    <v-card v-for="tweet in tweets" :key="tweet.id" class="mt-3">
        <a class="display-1 text--primary">
          {{ tweet.text }}
        </a>
        <p>
          {{ tweet.name }}
        </p>
        <p>
          @{{ tweet.username }}
        </p>
        <p>
          {{ formatDate(tweet.published_date) }}
        </p>
      </v-card>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Loading from '../Loading.vue';
import { RepositoryFactory } from '../../api/RepositoryFactory';

const TweetsRepository = RepositoryFactory.get('tweets');

export default {
  name: 'TweetsList',
  data: () => ({
    tweets: [],
  }),
  components: {
    Loading,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async mounted() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      [this.tweets] = (await this.$refs.loading.fetchPromises([TweetsRepository.get(this.id)]))
        .map(r => r.data);
    },
    formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss');
    },
  },
};
</script>
