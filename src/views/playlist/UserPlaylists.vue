<template>
  <div class="user-playlists"><h2>My playlists</h2></div>
</template>

<script>
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';

export default {
  name: 'UserPlaylists',
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
