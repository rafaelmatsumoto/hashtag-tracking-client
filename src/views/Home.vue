<template>
  <div class="home">
    <HashtagsList />
  </div>
</template>

<script>
import HashtagsList from '../components/Hashtags/List.vue';

export default {
  name: 'home',
  components: {
    HashtagsList,
  },
};
</script>
