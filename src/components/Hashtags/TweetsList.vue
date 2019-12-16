<template>
  <v-container>
    <Loading ref="loading"/>
    <v-row no-gutters>
      <v-text-field max-width="300"
        v-model.trim="search"
        label="Pesquisar"
      ></v-text-field>
      <v-btn
        @click="queryTweets()"
        color="primary">
        Pesquisar
      </v-btn>
    </v-row>
    <span v-if="tweets.length == 0">Tweets não encontrados</span>
    <v-card
      v-for="tweet in tweets"
      :key="tweet.id"
      class="ma-2"
      color="#26c6da"
      dark>
       <v-card-title>
          <v-icon
            large
            left
          >
            mdi-twitter
          </v-icon>
        </v-card-title>
        <v-card-text class="headline font-weight-bold">
          {{ tweet.text }}
        </v-card-text>
        <v-card-actions>
          <v-flex>
            <span>
              Autor: {{ tweet.name }} - @{{ tweet.username }}
            </span>
            <span>
              Data de publicação: {{ formatDate(tweet.published_date) }}
            </span>
          </v-flex>
        </v-card-actions>
    </v-card>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="Math.ceil(total/perPage)"
        @input="fetchTweets"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
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
      return dayjs(date).locale('pt-br').format('DD-MM-YYYY HH:mm:ss');
    },
    handleApiResponse(response) {
      this.tweets = response.data;
      this.perPage = response.headers['per-page'];
      this.total = response.headers.total;
    },
  },
};
</script>
