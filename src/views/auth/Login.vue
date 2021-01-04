<template>
  <form @submit.prevent="handleSubmit">
    <h2>Login</h2>
    <input type="email" required placeholder="Email" v-model="email" />
    <input type="password" required placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button v-if="isPending">Loading...</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const { login, error, isPending } = useLogin();
    const router = useRouter();

    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: 'Home' });
      }
      console.log(res);
    };

    return { email, password, error, handleSubmit, isPending };
  },
};
</script>

<style></style>
