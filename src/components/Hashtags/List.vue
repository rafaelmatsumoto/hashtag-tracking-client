<template>
  <div>
    <Loading ref="loading"/>
    <v-card v-for="hashtag in hashtags" :key="hashtag.id" @click="openHashtagTweets(hashtag.id)">
        <a class="display-1 text--primary">
          {{ hashtag.name }}
        </a>
      </v-card>
  </div>
</template>

<script>
import Loading from '../Loading.vue';
import { RepositoryFactory } from '../../api/RepositoryFactory';

const HashtagsRepository = RepositoryFactory.get('hashtags');

export default {
  name: 'List',
  data: () => ({
    hashtags: [],
  }),
  components: {
    Loading,
  },
  async mounted() {
    this.fetchHashtags();
  },
  methods: {
    async fetchHashtags() {
      [this.hashtags] = (await this.$refs.loading.fetchPromises([HashtagsRepository.get()]))
        .map(r => r.data);
    },
    async openHashtagTweets(id) {
      await this.$router.push({ name: 'tweets', params: { id } });
    },
  },
};
</script>

<style></style>
