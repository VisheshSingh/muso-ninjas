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
    <input type="file" @change="handleChange" />
    <div class="error" v-if="fileError">{{ fileError }}</div>
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
    const file = ref(null);
    const fileError = ref(null);

    const handleSubmit = () => {
      if (file.value) {
        console.log(title.value, description.value, file.value);
      }
    };

    const handleChange = (e) => {
      const selected = e.target.files[0];
      console.log(selected);
      const types = ['image/png', 'image/jpeg'];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = 'Please select an image file (png/jpeg)';
      }
    };

    return { title, description, handleSubmit, handleChange, fileError };
  },
};
</script>

<style>
input[type='file'] {
  margin: 0;
  padding: 0;
  border: 0;
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
