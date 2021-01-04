<template>
  <form @submit.prevent="handleSubmit">
    <h2>Signup</h2>
    <input
      type="text"
      required
      placeholder="Display name"
      v-model="displayName"
    />
    <input type="email" required placeholder="Email" v-model="email" />
    <input type="password" required placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Signup</button>
    <button v-if="isPending">Loading...</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const { signup, error, isPending } = useSignup();
    const router = useRouter();

    const displayName = ref('');
    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        router.push({ name: 'Home' });
      }
      console.log(res);
    };

    return { displayName, email, password, error, handleSubmit, isPending };
  },
};
</script>

<style></style>
