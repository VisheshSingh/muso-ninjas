<template>
  <div class="user-playlists">
    <h2>My playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create Playlist</router-link
    >
  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView';

export default {
  name: 'UserPlaylists',
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: playlists } = getCollection('playlist', [
      'userId',
      '==',
      user.value.uid,
    ]);

    return { playlists };
  },
};
</script>

<style></style>
