<template>
  <div class="grid grid-cols-3 gap-4">
    <router-link :to="threat.threatName">
      <div class=" group hover:bg-white hover:shadow-lg hover:border-transparent p-6 m-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div>
          <div class="text-xl font-medium text-black">{{ threat.threatName }}</div>
          <p class="text-gray-500">{{ threat.body }}</p>
          <p class="text-gray-500">{{ threat.threatLevel }}</p>
        </div>
      </div>
    </router-link>
      <div v-for="(barrier, index) in threat.barriers" :key="index" class="p-6 m-6 max-w-sm mx-auto bg-blue-200 rounded-xl shadow-md flex items-center space-x-4">
        <barrier-card :barrier="barrier" />
      </div>
  </div>
</template>

<script>
import BarrierCard from '@/components/threats/BarrierCard'

export default {
  name: 'ThreatCard',
  components: {
    BarrierCard,
  },
  props: {
    threat: {
      type: Object,
      required: true,
    },
  },
}
</script>
