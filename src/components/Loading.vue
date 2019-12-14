<template>
  <v-dialog v-model="open" persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        Loading...
        <v-progress-linear indeterminate color="white" class="mb-0" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  methods: {
    openDialog() {
      this.open = true;
    },
    closeDialog() {
      this.open = false;
    },
    async fetchPromises(promises) {
      this.openDialog();
      try {
        return await Promise.all(promises);
      } catch (e) {
        throw e;
      } finally {
        this.closeDialog();
      }
    }
  }
};
</script>
