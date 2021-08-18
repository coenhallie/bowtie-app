<template>
  <div class="min-w-full">
    <div class="text-xl font-bold">{{ barrier.barrierName }}</div>
    <p>{{ barrier.barrierDescription }}</p>
    <p>Risk number: {{ barrier.riskNumber }}</p>
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
