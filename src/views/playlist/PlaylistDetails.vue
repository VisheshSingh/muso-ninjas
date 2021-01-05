<template>
  <div v-if="error" class="class">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2 class="title">{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
    </div>

    <div class="song-list">
      <p>songs here</p>
    </div>
  </div>
</template>

<script>
import getDocument from '@/composables/getDocument';

export default {
  name: 'PlaylistDetails',
  props: ['id'],
  setup(props) {
    const { error, document: playlist } = getDocument('playlist', props.id);

    return { error, playlist };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 80px;
}

.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  height: 320px;
}

.cover img {
  width: 320px;
}

.playlist-info {
  text-align: center;
}

.playlist-info h2 {
  text-transform: uppercase;
  margin-top: 20px;
  font-size: 28px;
}

.playlist-info p {
  margin-bottom: 20px;
}

.username {
  color: #999;
}
</style>
