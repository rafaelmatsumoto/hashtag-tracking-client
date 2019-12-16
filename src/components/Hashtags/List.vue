<template>
  <div>
    <Loading ref="loading"/>
    <v-container fluid>
      <HashtagForm @created="fetchHashtags()"/>
      <v-flex>
        <v-container>
          <v-row align="center" justify="start">
            <v-card
              v-for="hashtag in hashtags"
              :key="hashtag.id"
              class="mr-4">
              <v-card-text>
                <v-row no-gutters>
                  <a class="display-1" @click="openHashtagTweets(hashtag.id)">
                    {{ hashtag.name }}
                  </a>
                  <v-icon
                    @click="deleteHashtag(hashtag.id)"
                    flat
                    dark
                    color="red"
                    class="ml-4">
                      mdi-window-close
                  </v-icon>
                </v-row>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-flex>
    </v-container>
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
    await this.fetchHashtags();
  },
  methods: {
    async fetchHashtags() {
      this.hashtags = (await this.$refs.loading.fetchPromises(HashtagsRepository.get()))
        .data;
    },
    async openHashtagTweets(id) {
      await this.$router.push({ name: 'tweets', params: { id } });
    },
    async deleteHashtag(id) {
      await this.$refs.loading.fetchPromises(HashtagsRepository.deleteHashtag(id));
      await this.fetchHashtags();
    },
  },
};
</script>
