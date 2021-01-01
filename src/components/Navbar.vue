<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" alt="logo" />
      <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <div v-if="user">
          <button class="btn" @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'Signup' }" class="btn">Signup</router-link>
          <router-link :to="{ name: 'Login' }" class="btn">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout';
import getUser from '@/composables/getUser';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const { logout } = useLogout();
    const { user } = getUser();

    const handleLogout = async () => {
      await logout();
      console.log('logout success');
      router.push('/login');
    };

    return { handleLogout, user };
  },
};
</script>

<style>
.navbar {
  background: #fff;
  margin-bottom: 60px;
  padding: 16px 10px;
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

nav h1 {
  margin-left: 20px;
}

nav .links {
  margin-left: auto;
}

nav .links a,
nav button {
  margin-left: 16px;
  font-size: 14px;
}

nav img {
  max-width: 60px;
}
</style>
