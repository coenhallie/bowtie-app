<template>
  <div>
    <dashboardWrapper />
  </div>
</template>

<script>
import DashboardWrapper from '@/components/DashboardWrapper'
import Dashboard from '@/components/Dashboard'

export default {
  name: 'Home',
  components: {
    DashboardWrapper,
    Dashboard
  },
}
</script>

<style scoped>
.zoom-area {
  height: 1000px;
  width: 1000px;
}
</style>
