<template>
  <div id="nav-header">
    <div id="nav">
      <router-link to="/">Home - [WITH-DATA] change---as here</router-link> |
      <router-link to="/test">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="css">
#nav-header {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>