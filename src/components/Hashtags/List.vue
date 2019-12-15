<template>
  <div>
    <Loading ref="loading"/>
    <HashtagForm @created="fetchHashtags"/>
    <div class="d-flex flex-column mb-6">
      <v-card width="300"
        v-for="hashtag in hashtags"
        :key="hashtag.id">
        <a class="display-1" @click="openHashtagTweets(hashtag.id)">
          {{ hashtag.name }}
        </a>
        <v-card-actions>
          <v-btn color="red" @click="deleteHashtag(hashtag.id)">Remover</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import Loading from '../Loading.vue';
import HashtagForm from './Form.vue';
import { RepositoryFactory } from '../../api/RepositoryFactory';

const HashtagsRepository = RepositoryFactory.get('hashtags');

export default {
  name: 'List',
  data: () => ({
    hashtags: [],
  }),
  components: {
    Loading,
    HashtagForm,
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
    async deleteHashtag(id) {
      await this.$refs.loading.fetchPromises([HashtagsRepository.deleteHashtag(id)]);
      await this.fetchHashtags();
    },
  },
};
</script>

<style></style>
