<template>
  <div class="navbar">
    <nav>
      <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <button class="btn">Logout</button>
        <router-link :to="{ name: 'Signup' }" class="btn">Signup</router-link>
        <router-link :to="{ name: 'Login' }" class="btn">Login</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
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
  align-content: center;
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
</style>
