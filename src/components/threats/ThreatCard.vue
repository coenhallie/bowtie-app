<template>
  <div class="flex float-right">
    <div @click="emit('openThreatConfigurationModal', threat)" class="threats z-10 m-6 p-6 h-40 w-80 cursor-pointer group hover:bg-white hover:shadow-lg hover:border-transparent transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white rounded-xl shadow-md flex justify-center items-center">
      <div class="min-w-full">
        <div class="text-xl font-medium text-black">{{ threat.threatActor }}</div>
        <p class="text-gray-500">{{ threat.threatDescription }}</p>
        <p :class="getThreatClass">Risk: <b>{{ threat.threatLevel }}</b></p>
      </div>
    </div>
    <div @click="emit('emitSelectedBarrier', 'test')" v-for="(barrier, index) in threat.barriers" :key="index" :class="riskColor[totalRiskNumber]" class="threats z-10 m-6 p-6 h-40 w-80 cursor-pointer group hover:bg-blue-200 hover:shadow-lg hover:border-transparent transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 rounded-xl shadow-md flex items-center">
      <barrier-card :barrier="barrier" />
    </div>
  </div>
</template>

<script>
import BarrierCard from '@/components/barriers/BarrierCard'
import { computed } from 'vue'

export default {
  name: 'ThreatCard',
  emits: ['openThreatConfigurationModal', 'emitSelectedBarrier'],
  props: {
    threat: {
      type: Object,
      required: true,
    },
    barrier: {
      type: Object,
      reqired: true,
    }
  },
  setup(props, { emit }) {
    const getThreatClass = computed(() => {
      return props.threat.threatLevel === 'Medium'
        ? 'my-6 rounded-md max-w-xs bg-yellow-500 text-white min-w-min'
        : props.threat.threatLevel === 'High'
        ? 'my-6 rounded-md	bg-red-500 text-white'
        : props.threat.threatLevel === 'Low'
        ? 'my-6 rounded-md	bg-yellow-300 text-white'
        : 'my-6 rounded-md	bg-white'
    })

    const getSelectedBarrier = () => {
      return emit('emitSelectedBarrier', props.threat.barriers)
    }

    const riskColor = [
      'bg-blue-400 text-gray-700',
      'bg-yellow-900 text-white',
      'bg-yellow-800 text-white',
      'bg-yellow-700 text-white',
      'bg-yellow-600 text-white',
      'bg-yellow-500 text-white',
      'bg-yellow-400 text-gray-700',
      'bg-yellow-300 text-gray-700',
      'bg-yellow-200 text-gray-700',
      'bg-yellow-100 text-gray-700']

    const totalRiskNumber = computed(() => {
      return props.threat.barriers.map((item) => item.riskNumber).reduce((prev, next) => prev + next)
    })

    return {
      emit,
      computed,
      getThreatClass,
      getSelectedBarrier,
      totalRiskNumber,
      riskColor,
    }
  },
  components: {
    BarrierCard,
  },
}
</script>

<style scoped>
.threats:nth-child(1n):after {
  content: '';
  width: 3em;
  border-bottom: 5px solid #ddd;
  position: absolute;
  top: 50%;
  z-index: 1;
}
:after {
  left: 100%;
}
:before {
  right: 100%;
}

.threats:first-of-type:before,
.threats:last-of-type:after {
  display: none;
}
</style>
