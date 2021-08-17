<template>
  <div class="min-w-full">
    <div class="text-xl font-medium text-black">{{ barrier.barrierName }}</div>
    <p class="text-gray-500">{{ barrier.barrierDescription }}</p>
    <p class="text-gray-500">Risk number: {{ barrier.riskNumber }}</p>
  </div>
</template>

<script>
export default {
  name: 'BarrierCard',
  props: {
    barrier: {
      type: Object,
      required: true,
    },
  },
}
</script>
