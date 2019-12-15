<template>
  <v-form ref="form">
    <Loading ref="loading"/>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="name"
            label="Hashtag"
            prefix="#"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-btn color="primary" @click="createHashtag()">Criar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import Loading from '../Loading.vue';
import { RepositoryFactory } from '../../api/RepositoryFactory';

const HashtagsRepository = RepositoryFactory.get('hashtags');

export default {
  name: 'HashtagForm',
  data: () => ({
    name: null,
    nameRules: [
      v => !!v || 'Name is required',
    ],
  }),
  components: {
    Loading,
  },
  methods: {
    async createHashtag() {
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.$refs.loading.fetchPromises([HashtagsRepository.createHashtag(
        {
          name: `#${this.name}`,
        },
      )]);
      this.$emit('created');
      this.$refs.form.reset();
    },
  },
};
</script>
