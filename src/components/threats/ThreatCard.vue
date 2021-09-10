<template>
  <div class="flex float-right">
    <div @click="emit('openThreatConfigurationModal', threat)" class="threats border border-gray-500 border-opacity-50 z-10 m-6 h-60 w-96 cursor-pointer group hover:bg-white hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white rounded shadow-md flex items-center">
      <div class="min-w-full min-h-full">
        <div class="p-3 text-left">
          <div class="p-3 text-xl font-black text-indigo-600">{{ threat.threatActor }}</div>
          <div class="p-3 text-gray-500"><p>{{ threat.threatDescription }}</p></div>
        </div>
        <div class="grid grid-flow-col grid-cols-2 gap-4 p-2 items-center justify-between bg-gray-50 absolute inset-x-0 bottom-0 border-t border-blue-300 border-opacity-40">
          <div>
            <p class="text-sm text-gray-600 font-medium">Addressed Risks</p>
            <b>10 / {{ totalRiskNumber }}</b>
          </div>
          <div>
            <p class="text-sm text-gray-600 font-medium">Risk</p>
            <p :class="getThreatClass" class="text-lg font-bold">{{ threat.threatLevel }}</p>
          </div>
        </div>
      </div>
    </div>
    <div @click="emit('emitSelectedBarrier', threat.barriers[index])" v-for="(barrier, index) in threat.barriers" :key="index" :class="[riskColor[totalRiskNumber], threat.threatLevel]" class="threats z-10 m-6 h-60 w-96 bg-white border-4 cursor-pointer group hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 rounded shadow-md flex items-center">
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
  },
  setup(props, { emit }) {
    const getThreatClass = computed(() => {
      return props.threat.threatLevel === 'Medium'
        ? 'text-yellow-500'
        : props.threat.threatLevel === 'High'
        ? 'text-red-500'
        : props.threat.threatLevel === 'Low'
        ? 'text-yellow-300'
        : 'text-gray-700'
    })

    const getSelectedBarrier = () => {
      return emit('emitSelectedBarrier', props.threat.barriers)
    }

    const riskColor = [
      'border-yellow-400 text-gray-700',
      'border-yellow-900 text-gray-700',
      'border-yellow-800 text-gray-700',
      'border-yellow-700 text-gray-700',
      'border-yellow-600 text-gray-700',
      'border-yellow-500 text-gray-700',
      'border-yellow-400 text-gray-700',
      'border-yellow-300 text-gray-700',
      'border-yellow-200 text-gray-700',
      'border-yellow-100 text-gray-700',
      'border-yellow-50 text-gray-700'
    ]

    const totalRiskNumber = computed(() => {
      return props.threat.barriers
        .map((item) => item.riskNumber)
        .reduce((prev, next) => prev + next)
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
  position: absolute;
  left: 97%;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  clear: both;
  transform: rotate(270deg);
}
.High:after {
  border-top: 20px solid #000;
}
.Medium:after {
  border-top: 20px solid #fcd34d;
}
.Low:after {
  border-top: 20px solid #fde68a;
}

:after {
  left: 100.5%;
}
:before {
  right: 100%;
}

.threats:first-of-type:before,
.threats:last-of-type:after {
  display: none;
}
</style>
