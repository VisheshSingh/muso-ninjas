<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2 class="title">{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button @click="handleDelete">Delete playlist</button>
    </div>

    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs added to this playlist yet.
      </div>
      <div class="single-song" v-for="song in playlist.songs" :key="song.id">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleSongDelete(song.id)">
          delete
        </button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import useStorage from '@/composables/useStorage';
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AddSong from '@/components/AddSong';

export default {
  name: 'PlaylistDetails',
  props: ['id'],
  components: { AddSong },
  setup(props) {
    const { error, document: playlist } = getDocument('playlist', props.id);
    const { user } = getUser();
    const { error: deleteError, deleteDoc, updateDoc } = useDocument(
      'playlist',
      props.id
    );
    const router = useRouter();
    const { deleteImage } = useStorage();

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid === playlist.value.userId
      );
    });

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: 'Home' });
    };

    const handleSongDelete = async (id) => {
      await updateDoc({
        songs: playlist.value.songs.filter((song) => song.id !== id),
      });
    };

    return {
      error,
      playlist,
      ownership,
      deleteError,
      handleDelete,
      handleSongDelete,
    };
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

.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
</style>
