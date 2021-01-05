<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }">
      <div class="single">
        <div class="thumbnail">
          <img :src="playlist.coverUrl" :alt="playlist.title" />
        </div>
        <div class="info">
          <h2>{{ playlist.title }}</h2>
          <p>Created by {{ playlist.userName }}</p>
        </div>
        <div class="song-number">
          <p>{{ playlist.songs.length }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: ['playlists'],
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 16px 0;
  transition: all ease 0.2s;
}

.single:hover {
  box-shadow: 1px 3px 5px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
  cursor: pointer;
}

.thumbnail {
  max-width: 100px;
  max-height: 100px;
  border-radius: 10px;
  overflow: hidden;
}

.thumbnail img {
  width: 100%;
  display: block;
}

.info {
  margin: 0 30px;
}

.song-number {
  margin-left: auto;
}
</style>
