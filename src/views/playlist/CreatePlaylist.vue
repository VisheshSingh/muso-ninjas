<template>
  <form @submit.prevent="handleSubmit">
    <h1>Create playlist</h1>
    <input type="text" placeholder="Playlist title" v-model="title" required />
    <textarea
      required
      placeholder="Playlist description"
      v-model="description"
    ></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" />
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'CreatePlaylist',
  setup() {
    const title = ref('');
    const description = ref('');

    const handleSubmit = () => {
      console.log(title.value, description.value);
    };

    return { title, description, handleSubmit };
  },
};
</script>

<style>
input[type='file'] {
  margin: 0;
  padding: 0;
}

label {
  font-size: 12px;
  display: block;
  margin-bottom: 20px;
}

button {
  margin-top: 20px;
}
</style>
