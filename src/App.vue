<template>
  <div id="nav">
    <div class="grid grid-flow-col">
      <div>
        <h1 class="float-left font-bold text-xl">Risk Analysis</h1>
      </div>
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/pricing">Pricing</router-link> |
        <router-link to="/devs">Developers</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
  </div>
  <projects />
  <div id="router-view">
    <router-view />
  </div>
</template>

<script>
import Projects from './components/Projects'

export default {
  setup() {
    return {}
  },
  components: {
    Projects,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background: white;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#router-view {
  background: #f5f7fd;
  overflow: hidden;
}
</style>
