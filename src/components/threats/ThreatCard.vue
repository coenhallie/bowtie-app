<template>
  <div class="flex float-right">
    <div @click="emit('openThreatConfigurationModal', threat)" class="m-6 p-6 h-40 w-80 cursor-pointer group hover:bg-white hover:shadow-lg hover:border-transparent transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div class="text-xl font-medium text-black">{{ threat.threatName }}</div>
        <p class="text-gray-500">{{ threat.threatDescription }}</p>
        <p :class="getThreatClass">Risk: <b>{{ threat.threatLevel }}</b></p>
      </div>
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
import { computed, ref } from 'vue'

export default {
  name: 'ThreatCard',
  props: {
    threat: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const openThreatConfigurationModal = ref(false)

    const getThreatClass = computed(() => {
      return props.threat.threatLevel === 'Medium'
        ? 'my-6 rounded-md max-w-xs bg-yellow-500 text-white'
        : props.threat.threatLevel === 'High'
        ? 'my-6 rounded-md	bg-red-500 text-white'
        : props.threat.threatLevel === 'Low'
        ? 'my-6 rounded-md	bg-yellow-300 text-white'
        : 'my-6 rounded-md	bg-white'
    })

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
}
</script>
