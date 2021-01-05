<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a new song</h4>
      <input type="text" placeholder="Song title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <button>Add song</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import useDocument from '@/composables/useDocument';

export default {
  name: 'AddSong',
  props: ['playlist'],
  setup(props) {
    const title = ref('');
    const artist = ref('');
    const showForm = ref(false);
    const { updateDoc } = useDocument('playlist', props.playlist.id);

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 100000),
      };
      await updateDoc({
        songs: [...props.playlist.songs, newSong],
      });

      title.value = '';
      artist.value = '';
    };

    return { title, artist, showForm, handleSubmit };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}

form {
  text-align: left;
  max-width: 100%;
}
</style>
