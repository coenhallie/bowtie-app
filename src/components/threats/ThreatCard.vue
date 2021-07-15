<template>
  <div class="flex float-right">
      <div class="m-6 p-6 h-40 w-80 group hover:bg-white hover:shadow-lg hover:border-transparent transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div>
          <div class="text-xl font-medium text-black">{{ threat.threatName }}</div>
          <p class="text-gray-500">{{ threat.body }}</p>
          <p class="text-gray-500">{{ threat.threatLevel }}</p>
        </div>
        <button @click="emit('threat', threat)">Delete Threat</button>
      </div>
    <router-link v-if="threat.barriers" :to="threat.threatName" class="flex">
    <div v-for="(barrier, index) in threat.barriers" :key="index" class="m-6 p-6 h-40 w-80 group hover:bg-blue-200 hover:shadow-lg hover:border-transparent transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-blue-100 rounded-xl shadow-md flex items-center space-x-4">
      <barrier-card :barrier="barrier" />
    </div>
    </router-link>
  </div>
</template>

<script>
import BarrierCard from '@/components/threats/BarrierCard'

export default {
  name: 'ThreatCard',
  setup(props, { emit }) {
    return {
      emit,
    }
  },
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
