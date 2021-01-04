<template>
  <div class="home">
    <div class="error" v-if="error">{{ error }}</div>
    <ListView :playlists="documents" />
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import ListView from '../components/ListView';

export default {
  name: 'Home',
  components: {
    ListView,
  },
  setup() {
    const { documents, error } = getCollection('playlist');

    return { documents, error };
  },
};
</script>
