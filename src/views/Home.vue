<template>
  <div>
    <Suspense>
      <template #default>
        <Dashboard />
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard'

export default {
  name: 'Home',
  components: {
    Dashboard,
  },
}
</script>

<style scoped>
.zoom-area {
  height: 1000px;
  width: 1000px;
}
</style>
