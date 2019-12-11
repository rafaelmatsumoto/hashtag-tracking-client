<template>
  <div>
    <div
      class="d-flex flex-wrap"
      color="grey lighten-2"
      align="center"
      justify="center"
      flat
      tile
    >
      <v-card
        class="mx-auto"
        max-width="344"
        outlined
        v-for="hashtag in hashtags"
        :key="hashtag.id"
      >
        <p class="display-1 text--primary">
         {{ hashtag.name }}
        </p>
      </v-card>
    </div>
    <span>Hello World</span>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../api/RepositoryFactory';

const HashtagsRepository = RepositoryFactory.get('hashtags');

export default {
  name: 'List',
  data: () => ({
    hashtags: [],
  }),
  async mounted() {
    this.fetchHashtags();
  },
  methods: {
    async fetchHashtags() {
      const { response } = await HashtagsRepository.get();
      this.hashtags = response;
    },
  },
};
</script>

<style>

</style>
