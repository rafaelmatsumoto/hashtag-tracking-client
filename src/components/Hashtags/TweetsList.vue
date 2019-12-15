<template>
  <div>
    <Loading ref="loading"/>
    <v-text-field
      v-model.trim="search"
    ></v-text-field>
    <v-btn
      @click="queryTweets()"
      color="primary">
      Pesquisar
    </v-btn>
    <span v-if="tweets.length == 0">Tweets não encontrados</span>
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
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="Math.ceil(total/perPage)"
        @input="fetchTweets"
      ></v-pagination>
    </div>
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
    search: '',
    page: 1,
    total: null,
    perPage: null,
  }),
  components: {
    Loading,
  },
  props: {
    id: {
      required: true,
    },
  },
  async mounted() {
    await this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      await this.makeApiCall(`page=${this.page}&has_text=${this.search}`);
    },
    async queryTweets() {
      this.resetPagination();
      await this.fetchTweets();
    },
    async makeApiCall(queryParams) {
      const response = await this.$refs.loading.fetchPromises(TweetsRepository.query(
        this.id, queryParams,
      ));
      this.handleApiResponse(response);
    },
    resetPagination() {
      this.page = 1;
    },
    formatDate(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss');
    },
    handleApiResponse(response) {
      this.tweets = response.data;
      this.perPage = response.headers['per-page'];
      this.total = response.headers.total;
    },
  },
};
</script>
