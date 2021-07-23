<template>
  <Suspense>
    <template #default>
      <dashboard />
      <add-threat-modal />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script>
import Dashboard from '@/components/Dashboard'
import AddThreatModal from './threats/AddThreatModal.vue'

export default {
  name: 'DashboardWrapper',
  components: {
    Dashboard
  },
}
</script>