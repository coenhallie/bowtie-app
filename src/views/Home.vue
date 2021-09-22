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
  <projects @selectProject="selectProject" />
  <Suspense>
    <template #default>
      <dashboard :selectProject="selectProject" />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script>
import Dashboard from '@/components/Dashboard'
import Projects from '@/components/Projects'
import { ref } from 'vue'

export default {
  setup() {
    const selectProjectref = ref()
    const selectProject = (project) => {
      selectProjectref.value = project
    }
    return {
      selectProject,
    }
  },
  name: 'Home',
  components: {
    Dashboard,
    Projects,
  },
}
</script>

<style scoped>
.zoom-area {
  height: 1000px;
  width: 1000px;
}
</style>
