<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center homepage">
        <h2 @click="redirectToMainPage">Hashtag Tracking</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view :key="$route.path"></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),

  methods: {
    async redirectToMainPage() {
      await this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped>
.homepage {
  cursor: pointer;
}
</style>
