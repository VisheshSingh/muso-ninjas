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
      <p>songs here</p>
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
    const { error: deleteError, deleteDoc } = useDocument('playlist', props.id);
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

    return { error, playlist, ownership, deleteError, handleDelete };
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
