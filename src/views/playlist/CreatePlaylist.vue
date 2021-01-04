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
    <button v-if="!isPending">Create</button>
    <button v-else>Saving...</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useStorage from '@/composables/useStorage';
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/getUser';
import { timestamp } from '@/firebase/config';

export default {
  name: 'CreatePlaylist',
  setup() {
    const { url, filePath, uploadImage } = useStorage();
    const { error, addDoc } = useCollection('playlist');
    const { user } = getUser();

    const title = ref('');
    const description = ref('');
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          console.log('playlist added!');
        }
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

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      fileError,
      isPending,
    };
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
