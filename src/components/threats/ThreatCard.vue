<template>
  <div class="flex float-right">
    <div @click="openThreatConfigurationModal(threat)" class="m-6 p-6 h-40 w-80 group hover:bg-white hover:shadow-lg hover:border-transparent transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div class="text-xl font-medium text-black">{{ threat.threatName }}</div>
        <p class="text-gray-500">{{ threat.body }}</p>
        <p :class="getThreatClass">Risk: <b>{{ threat.threatLevel }}</b></p>
      </div>
      <!-- <button @click="emit('threat', threat)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="gray">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button> -->
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
import { computed } from 'vue'

export default {
  name: 'ThreatCard',
  setup(props, { emit }) {

    const getThreatClass = computed(() => {
      return props.threat.threatLevel === 'Medium'
        ? 'my-6 rounded-md max-w-xs bg-yellow-500 text-white'
        : props.threat.threatLevel === 'High'
        ? 'my-6 rounded-md	bg-red-500 text-white'
        : props.threat.threatLevel === 'Low'
        ? 'my-6 rounded-md	bg-yellow-300 text-white'
        : 'my-6 rounded-md	bg-white'
    })

    const openThreatConfigurationModal = (threat) => {
      console.log('tetsets', threat)
    }
    return {
      emit,
      computed,
      getThreatClass,
      openThreatConfigurationModal,
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
