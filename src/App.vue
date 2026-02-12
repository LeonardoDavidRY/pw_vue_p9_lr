<template>
  <nav>
    <router-link to="/token">Token</router-link> |
    <router-link to="/vehiculo">Vehículo</router-link>
  </nav>
  <router-view/>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f8f9fa;
  min-height: 100vh;
}

nav {
  padding: 20px 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav a {
  font-weight: bold;
  color: #003d82;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #0babeb;
}

nav a.router-link-exact-active {
  color: #0babeb;
  border-bottom: 3px solid #0babeb;
  padding-bottom: 5px;
}
</style>
